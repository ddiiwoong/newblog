---
layout: single
title: "LLM 게이트웨이 계층 세 갈래를 AWS에서 재보기"
comments: true
classes: wide
description: "vllm-router, Agent Router(구 Envoy AI Gateway), llm-d를 같은 GPU와 모델에 올려 프리픽스 캐시 라우팅 효과를 측정하고, 이상적 파티셔닝 대비 남은 이득과 설치 과정에서 부딪힌 호환성 벽을 기록"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: aws/llm-gateway-three-layers
date: 2026-09-19
categories:
  - AWS
tags:
  - LLM
  - vLLM
  - Kubernetes
  - Envoy
  - llm-d
  - GAIE
  - AWS
  - GPU
---

> 해당 포스팅은 현재 재직 중인 회사와 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

# LLM 게이트웨이 계층 세 갈래를 AWS에서 재보기

> 측정 환경: AWS EC2 g6.12xlarge (NVIDIA L4 24GB × 4, NVLink 없음) · K3s v1.36.4 · vLLM 0.11.0 · Qwen3-0.6B-FP8 × 2 (각 GPU 1장) · vllm-router 0.1.15 · Envoy Gateway v1.9.1 · Agent Router (Envoy AI Gateway) v1.1.0 · GAIE v1.0.1

vLLM 앞에 둘 수 있는 세 구현체를 검토했다. 대상은 vLLM 앞단에 두는 별도 패키지 `vllm-router`, Envoy 기반 Agent Router(구 Envoy AI Gateway), llm-d였다. 다만 세 구현체를 모두 성능 측정에 넣지는 못했다. Agent Router는 Envoy Gateway와 InferencePool의 호환성 문제로 라우팅 성능을 측정하지 못했고, llm-d는 standalone Envoy 경로에 GAIE EPP를 연결해 approximate 프리픽스 라우팅만 측정했다. 설치와 연동 과정은 8절에 따로 기록했다.

성능 측정에는 K8s Service 대조군을 포함해 다음 다섯 구성을 사용했다.

| 경로 | 구성 | 파드 선택 방식 |
| :--- | :--- | :--- |
| K8s Service | `kube-proxy` | 연결 단위 분배 |
| `vllm-router` | `round_robin` | 두 파드에 번갈아 분배 |
| `vllm-router` | `cache_aware` 기본 설정 | 라우터가 추적한 프리픽스 기준 |
| `vllm-router` | `cache_aware` + 균형 임계값 4096/100 | 프리픽스 우선 선택이 부하 균형 판단에 덮이지 않도록 임계값 조정 |
| llm-d standalone Envoy 경로 + GAIE EPP | `prefix-cache-scorer` | EPP가 추정한 프리픽스 캐시 점수 기준 |

다섯 구성을 같은 GPU와 모델에 올리고 동일한 부하를 걸었다. 처리량 자체보다 "**게이트웨이가 달라지면 어떤 차이를 보이는가**"를 확인하려는 시험이었다. 그러나 다섯 구성의 처리량과 지연은 사실상 같았다. 이에 워크로드가 도달할 수 있는 상한을 별도로 측정한 뒤 실제 구성과의 차이를 계산했다.

이 워크로드에서 게이트웨이 계층이 활용할 수 있었던 성능 차이는 캐시 히트율 34.7포인트, 처리량 13.6%, p99 TTFT 56%였다. 성능을 측정한 다섯 구성은 이 차이를 실제 성능으로 바꾸지 못했다.

<!--truncate-->

***

## 1. 왜 게이트웨이 계층이 필요할까?

vLLM 인스턴스가 하나라면 게이트웨이는 필요 없다. 게이트웨이가 필요한 경우는 크게 두 가지로 볼 수 있는데 이 글에서는 두 번째 경우인 동일 모델의 복제본을 여러 곳에서 서빙할 때를 기준으로 측정했다.

### 조건 하나 - 모델이 여러 개가 된다

처음에는 모델 제공업체 하나만 사용하다가 용량 제한 때문에 두 번째 업체를 추가한다. 팀원이 늘면 Key가 여러 곳에 복사되고 재시도 로직도 팀마다 따로 작성한다. 계산서가 도착해도 팀별 사용량을 구분하기 어렵고, 한 업체에서 장애가 발생하면 전체 서비스도 영향을 받는다.

여러 백엔드를 운영하는 상황에서 같은 문제가 반복됐고, 이를 해결하려고 API 게이트웨이가 등장했다. AI 게이트웨이는 관리 대상을 백엔드에서 모델로 바꾼 형태이며 담당 기능도 서로 대응한다.

| 역할          | 내용                            |
| :---------- | :---------------------------- |
| Unified API | 업체마다 다른 요청·응답 형식을 하나로         |
| 키 보관        | 앱에는 교환용 키만 주고 실제 키는 게이트웨이가 쥔다 |
| 재시도·페일오버    | 업체 장애 시 다른 곳으로                |
| 사용량 추적      | 토큰 단위로 세어 예산을 관리              |
| 관측성·가드레일    | 지연·오류·지출을 한곳에서, 우회 경로는 차단     |

이 기능들은 모두 **모델을 애플리케이션에서 분리해야 한다는 요구**에서 출발한다. 앱이 특정 모델 엔드포인트를 직접 호출하면 모델을 교체하기 어렵고, 요청 본문을 수정하거나 팀별 사용량을 구분할 계층도 없다. 게이트웨이가 이 역할을 맡는다.

### 조건 둘 - 같은 모델의 복제본이 여러 개가 된다

이 글은 이 두 번째 경우를 측정한다. 모델 하나를 여러 파드에 복제하면 요청을 분산해야 하는데 **LLM 트래픽은 일반 HTTP 트래픽과 성질이 다르다.**

| <br /> | 일반 HTTP     | LLM 추론                   |
| :----------------------------- | :---------- | :----------------------- |
| 라우팅 근거                         | 헤더          | 본문 내용 (모델명, 프롬프트)        |
| 요청 비용                          | 대체로 균일      | 프롬프트 길이에 따라 수십 배 차이      |
| 서버 상태                          | 연결 수로 근사 가능 | 큐 깊이, KV 캐시 점유, 캐시된 프리픽스 |
| 응답                             | 짧게 끝난다      | 스트리밍으로 길게 열려 있다          |

K8s Service의 기본 로드밸런싱은 L4에서 연결 단위로 요청을 무작위 배정한다. 어느 파드가 바쁜지, 프롬프트의 프리픽스가 어느 파드에 캐시돼 있는지는 고려하지 않는다. 큰 요청이 쌓인 파드에 요청을 더 보내면 지연이 늘고, 캐시가 없는 파드로 보내면 Prefill을 처음부터 다시 처리한다.

Kubernetes의 **Gateway API Inference Extension(GAIE)은** `InferencePool`로 파드 묶음을 표현한다. **EPP**(Endpoint Picker)는 실시간 상태를 바탕으로 요청을 보낼 파드를 고르고, Envoy는 `ext_proc`으로 이 결정을 EPP에 위임한다.

프리픽스가 겹치는 트래픽에 복제본 두 개를 두고 라우팅 방식만 바꾸면서, EPP의 결정이 캐시 히트율과 지연에 미치는 영향을 측정했다.

### 이기종 GPU에서 더 커지는 문제

복제본을 성능이 다른 GPU에 배치하면 라우팅 판단이 더 중요해진다. 온프레미스 GPU 서버와 클라우드 GPU 인스턴스를 한 클러스터로 묶고, 용량이 필요할 때만 클라우드를 추가하는 구성이 한 예다. EKS Hybrid Nodes를 사용하면 온프레미스 노드를 관리형 컨트롤 플레인에 편입할 수도 있다.

클러스터를 하나로 구성하는 작업과 요청을 보낼 GPU를 고르는 작업은 별개다. GPU마다 성능과 캐시 상태가 다르면 무작위 배정으로 생기는 손해가 동종 GPU 구성보다 커질 수밖에 없다. 이 글은 요청마다 적절한 GPU를 선택하는 라우팅 계층을 다룬다.

***

## 용어 사전

| 용어             | 의미                                                          |
| :------------- | :---------------------------------------------------------- |
| 프리픽스 캐시        | 프롬프트 앞부분의 KV를 재사용해 Prefill을 건너뛴다                            |
| working set    | 서로 다른 프리픽스 전체가 차지하는 토큰 수. 캐시보다 크면 기존 프리픽스가 캐시에서 밀려난다                  |
| ext\_proc      | Envoy가 요청 처리를 외부 gRPC 서버에 위임하는 필터                           |
| EPP            | Endpoint Picker. 요청마다 어느 파드로 보낼지 결정하는 서비스                   |
| InferencePool  | 같은 모델을 서빙하는 파드 묶음을 표현하는 K8s 리소스 (GAIE 표준)                   |
| GAIE           | Gateway API Inference Extension. InferencePool·EPP 프로토콜의 표준 |
| `ORIGINAL_DST` | 고정 엔드포인트 목록 없이 헤더 값대로 목적지를 정하는 Envoy 클러스터                   |
| kube-proxy     | K8s Service의 기본 로드밸런싱. L4이고 연결 단위로 무작위 배정한다                 |

***

## 2. EKS vs EC2

비교할 변수는 네트워크 토폴로지가 아니라 **라우팅 결정**이다. 세 구현체를 같은 노드와 GPU에서 실행해야 노드 간 지연의 영향을 받지 않는 동일한 조건에서 EPP 스코어링의 차이를 측정할 수 있다. 공개된 예제도 각각 kind와 K3s 단일 노드를 쓴다.

| <br /> | EC2 + K3s   | EKS           |
| :----------------------------- | :---------- | :------------ |
| 클러스터 생성                        | 30초         | 25분           |
| 삭제                             | 인스턴스 종료와 동시 | 15분           |
| GPU 노드                         | 같은 인스턴스     | 별도 노드그룹 필요    |
| 관리형 컨트롤 플레인                    | 없음          | 있음 ($0.10/hr) |
| 노드 간 KV 전송 관측                  | 불가          | 가능            |
| AWS LB Controller              | 불가          | 가능            |

측정 조합 여덟 개를 실행하면서 매번 파드를 재생성하면 이 40분의 차이가 계속 누적된다. 이런 이유로 실습 환경은 EC2 + K3s로 구성했다.

EC2 + K3s 구성에서는 노드 간 KV 캐시 전송, 실제 다중 AZ 페일오버, Karpenter 기반 노드 스케일링을 측정할 수 없다. 노드가 여러 대이고 온프레미스 GPU까지 편입하는 운영 환경에는 관리형 컨트롤 플레인을 제공하는 EKS가 적합하다. 이 글의 측정 결과는 EKS 위에 구성할 라우팅 계층을 고르는 데 활용할 수 있다.

인스턴스는 `g6.12xlarge`(L4 24GB × 4)를 골랐다. 두 개의 vLLM 파드를 **서로 다른 물리 GPU**에 올려야 라우팅 효과가 GPU 경합에 섞이지 않는다. L4 한 장을 HAMi로 쪼개는 방법도 있지만 두 파드가 같은 SM을 다투게 되어 부하 인식 라우팅의 효과를 가린다.

```
      GPU0  GPU1  GPU2  GPU3
GPU0    X   NODE  NODE  NODE
GPU1  NODE    X   NODE  NODE
GPU2  NODE  NODE    X   NODE
GPU3  NODE  NODE  NODE    X
```

`X`는 같은 GPU를 가리킨다. 서로 다른 GPU 사이의 `NODE`는 NVLink로 직접 연결되지 않고 같은 NUMA 노드 안의 PCIe 호스트 브리지를 거쳐 통신한다는 뜻이다. 따라서 이 인스턴스의 GPU 간 통신에는 NVLink가 아니라 PCIe가 사용된다.

***

## 3. 측정 설계 - 캐시 압력을 일부러 만든다

첫 측정은 프리픽스 8종 × 512토큰으로 구성했다.

양쪽 파드의 히트율이 모두 75\~77%였는데, 프리픽스 전체는 4,096토큰이고 파드당 KV 캐시는 163,472토큰이라 캐시에서 밀려난 프리픽스가 하나도 없었다. 양쪽 파드가 8종을 모두 캐싱할 수 있으므로 라우팅 방식이 달라도 차이가 나지 않는 조건이었다.

```
파드당 KV 캐시           163,472 토큰
프리픽스 8종 × 512 tok  =   4,096 토큰   → 모두 캐시에 유지, 라우팅 무관
```

기존 프리픽스가 캐시에서 밀려나도록 working set을 다시 구성했다.

```
프리픽스 128종 × 2,048 tok = 262,144 토큰 > 163,472

무작위 분배  → 양쪽 파드가 128종을 다 보려 한다 → 일부가 캐시에서 밀려남
완벽 파티셔닝 → 파드당 64종 × 2,048 = 131,072 토큰 → 캐시에 들어간다
```

요청은 1,024개, 프리픽스당 8회 반복, 동시성 32, 요청 속도 무제한이다. 대조군으로 ShareGPT를 함께 돌렸다. 프리픽스가 겹치지 않는 트래픽에서 역전이 나는지 보려는 목적이다.

성능 변화의 원인을 확인할 지표로 **파드별** `vllm:prefix_cache_hits_total` / `queries_total`을 사용했다. TPS만으로는 성능이 달라진 이유를 확인할 수 없다. 파드별 히트율을 함께 보면 같은 프리픽스가 실제로 한 파드에 계속 배정됐는지 알 수 있다.

> **`--disable-log-stats`를 주면 이 증거가 사라진다**: 이 플래그는 주기적 로그만 끄는 게 아니라 Prometheus 메트릭 자체를 끈다. `/metrics`에 `vllm:` 항목 330개가 통째로 없어지고 python·http 지표만 남는다. `--disable-log-requests`의 대체로 이 플래그를 썼는데 역할이 다르다.
>
> ```
> # 플래그 있을 때
> curl .../metrics | grep -c '^vllm:'   → 0
> # 제거 후
> curl .../metrics | grep -c '^vllm:'   → 330
> ```

***

## 4. 상한 측정

같은 워크로드를 다섯 구성에서 실행한 결과 파드별 캐시 히트율은 모두 41% 안팎이었다. 그러나 이 결과만으로는 라우터가 같은 프리픽스를 한 파드에 모으지 못한 것인지, 프리픽스 반복 횟수와 KV 캐시 용량 때문에 원래 그 이상 나오지 않는 것인지 알 수 없었다. 두 원인을 구분하려고 라우팅을 제외한 단일 파드에서 워크로드의 실측 상한을 구했다.

파드 1대에 직접 걸어 프리픽스 수만 바꿨다. 라우팅이 변수에서 빠진다.

| working set | 프리픽스 | 실측 히트율    | 이론 상한 | Total TPS | Mean TTFT | ITL     |
| :---------- | :--- | :-------- | :---- | :-------- | :-------- | :------ |
| 262,144 tok | 128종 | **44.4%** | 82.0% | 12,929    | 215.7ms   | 42.82ms |
| 131,072 tok | 64종  | **77.6%** | 81.9% | 15,078    | 207.9ms   | 36.77ms |
| 32,768 tok  | 16종  | 90.9%     | 90.7% | 20,564    | 185.4ms   | 27.07ms |
| 16,384 tok  | 8종   | 92.3%     | 92.1% | 24,396    | 231.4ms   | 22.09ms |

이론 상한은 이렇게 계산했다. 프리픽스당 첫 요청은 프리픽스 부분이 미스이고 나머지 반복은 히트다. 요청당 조회가 2,186토큰(프리픽스 2,048 + 접미사 128 + 채팅 템플릿)이니 8회 반복이면 `7/8 × 2048 / 2186 = 82.0%`다.

working set이 캐시보다 작아진 131,072토큰(64종)에서는 실측 히트율이 77.6%로 이론값 81.9%와 4포인트 차이까지 좁혀졌다. 반면 262,144토큰(128종)에서는 이론값의 절반 수준인 44.4%에 머물렀다. 일부 프리픽스가 실제로 캐시에서 밀려난다는 사실을 확인했으므로 워크로드 설계는 의도대로 작동했다.

2파드 구성에서 라우팅이 프리픽스를 반씩 나눴다면 각 파드는 64종만 처리하므로 히트율이 77.6%에 가까워야 한다. 하지만 다섯 구성은 모두 41%대였다. 41%는 "파드 하나가 128종을 다 보는" 값인 44.4%에 가깝다.

***

## 5. 이상적 파티셔닝을 손으로 만들어 본다

2파드 토폴로지에서도 같은 상한이 나오는지 확인하려고 라우터를 제외한 채 요청을 직접 나눴다. 두 파드에는 서로 다른 프리픽스를 64종씩 동시에 보냈다.

```bash
# pod1 에 seed 42 로 64종, pod2 에 seed 4242 로 64종 - 동시 실행
vllm bench serve --base-url http://<pod1>:8000 \
  --dataset-name prefix_repetition --num-prompts 512 \
  --prefix-repetition-num-prefixes 64 --max-concurrency 16 --seed 42
vllm bench serve --base-url http://<pod2>:8000 ... --seed 4242
```

두 파드를 합치면 앞선 측정 조합과 같은 요청 1,024개, 동시성 32, 서로 다른 프리픽스 128종이다.

| <br /> | 히트율       | Total TPS  | Mean TTFT   | p99 TTFT    | ITL        |
| :----------------------------- | :-------- | :--------- | :---------- | :---------- | :--------- |
| pod1                           | 77.4%     | 12,197     | 112.5ms     | 731.4ms     | 22.74ms    |
| pod2                           | 77.6%     | 12,169     | 126.2ms     | 639.7ms     | 22.68ms    |
| **합계**                         | **77.5%** | **24,366** | **\~119ms** | **\~690ms** | **22.7ms** |

2파드 토폴로지에서도 프리픽스를 나눠 보내자 히트율이 77.5%로 재현됐고, 처리량은 단일 파드의 15,078보다 1.62배 높았다.

이 결과를 라우팅 계층이 도달할 수 있는 비교 기준선으로 삼았다.

***

## 6. 라우팅 구성별 측정 결과

같은 부하를 다섯 가지 구성으로 흘렸다.

| 구성                               | 파드 분배     | 캐시 히트            | Total TPS  | Mean TTFT   | p99 TTFT    | ITL        |
| :------------------------------- | :-------- | :--------------- | :--------- | :---------- | :---------- | :--------- |
| K8s Service (kube-proxy)         | 499 / 526 | 40.8 / 41.9%     | 21,399     | 202.1ms     | 1,719ms     | 25.17ms    |
| `vllm-router` `round_robin`      | 513 / 512 | 41.8 / 42.9%     | 21,451     | **137.6ms** | **1,584ms** | 25.58ms    |
| `vllm-router` `cache_aware`      | 520 / 505 | 42.2 / 39.4%     | 21,421     | 226.9ms     | 1,876ms     | 25.00ms    |
| 같음 + 균형임계 4096/100               | 513 / 512 | 41.0 / 40.2%     | 21,442     | 209.1ms     | 1,623ms     | 25.22ms    |
| GAIE EPP (`prefix-cache-scorer`) | 533 / 492 | 42.4 / 42.6%     | 21,095     | 162.3ms     | 1,786ms     | 25.98ms    |
| **손으로 파티셔닝 (5절)**                | 513 / 513 | **77.4 / 77.6%** | **24,366** | **\~119ms** | **\~690ms** | **22.7ms** |

다섯 구성의 결과는 측정값만으로 구분하기 어려웠다. TPS는 21,095\~21,451로 1.7% 범위에 있었고 캐시 히트율은 39.4\~42.9%였다. 동시성을 4와 8로 낮춰 다시 측정해도 40.5\~43.0%로 비슷했다.

| 동시성 | kube-proxy   | `cache_aware` |
| :-- | :----------- | :------------ |
| 32  | 40.8 / 41.9% | 42.2 / 39.4%  |
| 8   | 41.4 / 40.5% | 41.0 / 40.7%  |
| 4   | 41.3 / 43.0% | 42.4 / 41.1%  |

프리픽스가 겹치지 않는 ShareGPT에서도 같다. 여기서는 애초에 캐시 재사용 여지가 없으니 예상된 결과다.

| 구성            | Total TPS | Output TPS | Mean TTFT | ITL    |
| :------------ | :-------- | :--------- | :-------- | :----- |
| kube-proxy    | 6,252     | 3,053      | 55.0ms    | 9.51ms |
| `round_robin` | 6,216     | 3,035      | 71.4ms    | 9.67ms |
| `cache_aware` | 6,291     | 3,062      | 73.2ms    | 9.36ms |
| GAIE EPP      | 6,170     | 3,015      | 59.6ms    | 9.85ms |

### 남겨진 이득

이상적 파티셔닝과 최선의 실측을 나란히 놓으면 이렇다.

| 지표           | 실측 최선       | 이상적 파티셔닝    | 차이           |
| :----------- | :---------- | :---------- | :----------- |
| 캐시 히트율       | 42.9%       | 77.6%       | **+34.7포인트** |
| Total TPS    | 21,451      | 24,366      | **+13.6%**   |
| Mean TTFT    | 137.6ms     | \~119ms     | −13.5%       |
| **p99 TTFT** | **1,584ms** | **\~690ms** | **−56.4%**   |
| ITL          | 25.00ms     | 22.7ms      | −9.2%        |

p99 TTFT의 차이가 가장 컸으며 이상적 파티셔닝에서는 절반 이하로 줄었다. 평균은 13% 차이였지만 p99는 56% 차이였으므로 요청에 필요한 프리픽스가 이미 캐시에서 밀려난 경우 긴 꼬리 지연이 발생한 것으로 해석할 수 있다. SLA를 p99 기준으로 관리하는 서비스에서는 평균 처리량보다 이 차이가 더 중요하다.

***

## 7. `cache_aware`는 왜 안 됐나

라우터 로그에 정책 설정이 그대로 찍힌다.

```
policy: CacheAware {
  cache_threshold: 0.3,
  balance_abs_threshold: 64,
  balance_rel_threshold: 1.5,
  eviction_interval_secs: 120,
  max_tree_size: 67108864
}
```

`balance_abs_threshold: 64`를 부하 불균형이 임계값을 넘으면 캐시 친화성보다 부하 분산을 우선하는 설정으로 해석했다.

동시성 32에서는 임계값을 곧 넘을 수 있다고 보고 4096 / 100으로 높여 다시 측정했지만 결과는 **41.0 / 40.2%로 같았다.** 이 값은 원인이 아니었다.

캐시 친화성이 실제로 작동하는지 확인하려고 서로 다른 프리픽스 A와 B를 부하 없이 각각 20회씩 순차 전송했다. 캐시 친화성이 있다면 A와 B가 서로 다른 파드로 나뉘거나 적어도 같은 프리픽스는 일관된 파드에 배정돼야 한다.

```
policy=cache_aware
  프리픽스 A 20회 -> pod1(+20)  pod2(+0)
  프리픽스 B 20회 -> pod1(+20)  pod2(+0)

policy=round_robin
  프리픽스 A 20회 -> pod1(+10)  pod2(+10)
  프리픽스 B 20회 -> pod1(+10)  pod2(+10)
```

서로 다른 프리픽스가 모두 pod1로 배정됐다. 부하가 없는 순차 요청에서는 가장 덜 바쁜 워커를 고르는 폴백이 작동한 뒤 인덱스 순서로 동률을 처리한 것으로 보인다. 프리픽스별 친화성은 관측되지 않았다.

처음에는 A를 20회 보냈을 때 20/0이 나와 친화성이 작동한다고 판단했다. 그러나 B도 20/0으로 배정되면서 이 결과가 친화성이 아니라 타이브레이킹 때문일 수 있다는 점이 드러났다. 두 동작을 구분하려면 서로 다른 프리픽스를 사용한 대조 측정이 필요하다.

근본 원인은 특정하지 못했다. 라우터의 radix tree가 `/v1/chat/completions`의 `messages` 배열을 파싱하지 못했거나, `--mini-lb` 또는 `--enable-igw` 같은 별도 스위치가 필요하거나, 확인하지 못한 설정이 있을 수 있다. 여기서는 관측된 동작만 결과로 남긴다.

> **PyPI `vllm-router`는 production-stack의 `vllm_router` 모듈과 다른 프로젝트다**: 0.1.15의 인자는 `--worker-urls a b --policy round_robin`이다. production-stack README의 `--static-backends a,b --routing-logic roundrobin`을 쓰면 즉시 죽는다. 다만 0.1.15에는 `--prefill-selector`, `--decode-selector`, `--kv-connector {nixl,mooncake,moriio}`, `--vllm-pd-disaggregation`이 새로 생겼다. P/D 분리까지 커버 범위가 넓어졌다.

***

## 8. Agent Router와 llm-d - 벽에 부딪힌 지점

설치와 연동 확인에 가장 많은 시간이 들었다. 여러 경로가 실제로 동작하지 않았으며, 이 과정에서 확인한 호환성 조건도 함께 기록한다.

### 공개된 설치 절차가 더 이상 유효하지 않다

설치는 Phase 1\~3으로 계획했다. Envoy Gateway를 깔고, Agent Router CRD와 컨트롤러를 얹고, GAIE CRD를 넣은 뒤 **Envoy Gateway에 InferencePool 기능을 활성화하는 패치**를 적용한다.

```bash
kubectl apply -f https://raw.githubusercontent.com/theagentrouter/agent-router/main/examples/inference-pool/config.yaml
```

이 URL은 404를 반환했다. `envoyproxy/ai-gateway`, `release/v1.1` 브랜치와 여러 경로를 포함해 네 곳을 확인했지만 모두 마찬가지였다. Envoy AI Gateway가 2025-08-25에 Linux Foundation에 기증된 뒤 Agentic AI Foundation으로 이동하고 Agent Router로 이름을 바꾸는 과정에서 저장소 구조가 변경된 것으로 보인다.

Phase 1·2는 그대로 됐다.

```
Gateway API v1.3.0 CRD    5종 created
Envoy Gateway v1.9.1      envoy-gateway 1/1 Running
Agent Router v1.1.0       ai-gateway-controller 1/1 Running
  CRD: aigatewayroutes, aiservicebackends, backendsecuritypolicies,
       gatewayconfigs, mcproutes, quotapolicies
GAIE v1.0.1               inferencepools (inference.networking.k8s.io/v1)
```

### Envoy Gateway v1.9.1은 InferencePool을 backendRef로 받지 않는다

패치 없이 HTTPRoute를 만들어 봤다.

```yaml
backendRefs:
- group: inference.networking.k8s.io
  kind: InferencePool
  name: qwen3-pool
```

```
Accepted=True       reason=Accepted   msg=Route is accepted
ResolvedRefs=False  reason=InvalidKind
  msg=Failed to process route rule 0 backendRef 0: Group is invalid,
      only the core API group (specified by omitting the group field or
      setting it to an empty string), multicluster.x-k8s.io and
      gateway.envoyproxy.io are supported.
```

**지원 그룹이 명시적으로 열거된다.** `inference.networking.k8s.io`가 없다. `extensionApis.enableBackend: true`와 `enableEnvoyPatchPolicy: true`를 켜고 재기동해도 같았다. v1.10 이후 차트는 아직 없다(`helm show chart` 실패).

Agent Router의 `AIServiceBackend.backendRef`에는 `group`과 `kind` 필드가 있어 InferencePool을 지정할 수 있다. 하지만 backendRef를 최종 해석하는 주체는 Envoy Gateway이므로 같은 `InvalidKind` 오류가 발생했다. CRD 스키마에서도 inference나 endpointPicker 관련 필드를 찾지 못했다.

| CRD                 | inference / endpointPicker 필드 |
| :------------------ | :---------------------------- |
| `aigatewayroutes`   | 없음                            |
| `aiservicebackends` | 없음                            |
| `gatewayconfigs`    | 없음                            |

### llm-d의 standalone 경로로 우회했다

llm-d는 Gateway API 없이 Envoy와 EPP를 한 쌍으로 구성하는 standalone 모드를 제공한다. 이 모드를 사용하면 게이트웨이 구현체의 호환성 문제와 무관하게 EPP 자체의 동작만 확인할 수 있다. 공개된 `envoy.yaml`은 다음 두 설정으로 구성된다.

```yaml
# ① 매 요청을 EPP 에 위임
http_filters:
- name: envoy.filters.http.ext_proc
  typed_config:
    grpc_service: {envoy_grpc: {cluster_name: ext_proc}}
    processing_mode:
      request_body_mode: FULL_DUPLEX_STREAMED   # SSE 스트리밍을 깨지 않는다
      response_body_mode: FULL_DUPLEX_STREAMED
    message_timeout: 1000s                      # 긴 생성 스트림 고려

# ② EPP 가 심어 준 헤더대로 직접 프록시
clusters:
- name: original_destination_cluster
  type: ORIGINAL_DST
  lb_policy: CLUSTER_PROVIDED
  original_dst_lb_config:
    use_http_header: true
    http_header_name: x-gateway-destination-endpoint
```

`ORIGINAL_DST`는 고정 엔드포인트 목록을 사용하지 않는다. EPP가 헤더에 파드 주소를 넣으면 Envoy가 해당 주소로 직접 연결하므로 로드밸런싱 결정은 100% EPP가 담당한다. 이 구조에서는 kube-proxy의 "연결 단위 배정 후 keep-alive로 고착" 문제가 발생하지 않는다.

EPP는 GAIE 공식 차트로 올렸다. 기본 플러그인 구성이 이 측정에 필요한 구성과 일치했다.

```yaml
plugins:
- type: queue-scorer
- type: kv-cache-utilization-scorer
- type: prefix-cache-scorer      # 이것이 arm C1 의 대상
schedulingProfiles:
- name: default
  plugins: [queue-scorer, kv-cache-utilization-scorer, prefix-cache-scorer]
```

구성 과정에서는 두 가지 문제가 발생했다.

EPP는 설정 파일 없이 기동하지 않는다. Deployment를 직접 만들었을 때 다음 오류로 종료됐다.

```
ERROR setup failed to create scheduler
  {"error": "scheduler config must be set either by config api or through code"}
```

GAIE v1.0.1의 EPP는 `--config-file`이나 `--config-text`를 반드시 요구한다. 차트를 쓰면 ConfigMap이 함께 생성돼 해결된다.

EPP는 기본적으로 TLS gRPC를 사용한다. Envoy의 ext\_proc 클러스터를 평문으로 연결하자 헬스체크가 실패했다.

```
ext_proc::10.43.99.88:9002::health_flags::/failed_active_hc
cluster.ext_proc.health_check.network_failure: 1
```

EPP 플래그에 `"secure-serving": true`가 찍혀 있었다. llm-d의 standalone 주석이 "Envoy와 EPP가 같은 호스트에 있으므로 TLS를 생략한다"고 적은 이유가 여기다. `--secure-serving=false`를 주고, 헬스체크도 함께 고쳐야 했다. **EPP의 gRPC 헬스는 9003이고 ext-proc은 9002다.** 9002에 gRPC 헬스체크를 걸면 영원히 실패한다.

```
ext_proc::10.43.99.88:9002::health_flags::healthy
호출 1 -> HTTP=200
```

이 설정으로 데이터 경로가 동작했다. 이때 EPP의 `prefix-cache-scorer`로 측정한 히트율이 6절의 42.4 / 42.6%다.

### 정밀 KV 인식은 실행하지 못했다

llm-d는 approximate 방식 외에 **정밀** KV 인식도 지원한다. vLLM이 KV 블록 이벤트를 ZMQ로 발행하면 EPP가 이를 구독해 블록 해시 인덱스를 만든다. `precise-prefix-cache-routing` 가이드에서 필요한 설정을 확인했다.

```yaml
- type: precise-prefix-cache-producer
  parameters:
    tokenProcessorConfig: {blockSizeTokens: 64}
    speculativeIndexing: true
    kvEventsConfig:
      topicFilter: "kv@"
      discoverPods: true
      podDiscoveryConfig: {socketPort: 5556, replaySocketPort: 5559}
- type: prefix-cache-affinity-filter
  parameters:
    prefixMatchInfoProducerName: precise-prefix-cache-producer
    peakPrefillThroughput: 15926   # H100 80GB TP=2 기준. 하드웨어별 재측정 필요
- type: token-load-scorer
```

하지만 필요한 이미지를 받을 수 없었다. `ghcr.io/llm-d/llm-d-router`와 `llm-d-inference-scheduler`는 익명 pull을 거부했고(403), 공개된 이미지는 `llm-d-kv-cache-manager`뿐이었다. Helm 차트의 OCI 경로도 403을 반환했다.

설령 이미지가 있었어도 내 설정으로는 안 됐다. 가이드 요건과 네 곳이 어긋난다.

| 항목             | 가이드 요건                             | 내 설정                 |
| :------------- | :--------------------------------- | :------------------- |
| `--block-size` | **64** (`blockSizeTokens`와 일치 필수)  | 16                   |
| KV 이벤트 포트      | 5556 (리플레이 5559)                   | 5557                 |
| 이벤트 토픽         | `kv@$(POD_IP):$(POD_PORT)@<model>` | `kv@$(POD_NAME)@...` |
| vLLM 버전        | 0.26.0+ (리플레이 버퍼)                  | 0.11.0               |

`peakPrefillThroughput: 15926`도 그대로 쓸 값이 아니다. H100 80GB에 Qwen3-32B TP=2로 캘리브레이션한 수치다. 가이드가 하드웨어별 재측정을 명시한다. L4에 0.6B 모델이면 전혀 다른 값이다.

***

## 9. 매니페스트 - 무엇을 어떻게 설정했나

측정에 사용한 설정과 각 필드의 선택 근거를 함께 적었다. 일부 설정은 측정 결과에 직접 영향을 미쳤다.

### 9.1 vLLM - 서버 두 대

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: {name: qwen3, namespace: vllm, labels: {app: qwen3}}
spec:
  replicas: 2
  selector: {matchLabels: {app: qwen3}}
  template:
    metadata: {labels: {app: qwen3}}
    spec:
      runtimeClassName: nvidia          # ① 없으면 컨테이너가 GPU 를 못 본다
      containers:
      - name: vllm
        image: vllm/vllm-openai:v0.11.0
        args:
        - --model=Qwen/Qwen3-0.6B-FP8
        - --served-model-name=qwen3     # ② 벤치의 --served-model-name 과 일치해야 한다
        - --host=0.0.0.0
        - --port=8000
        - --max-model-len=8192
        - --gpu-memory-utilization=0.85
        - --enable-prefix-caching       # ③ 이 실습의 전제. 없으면 측정 자체가 성립하지 않는다
        - --block-size=16
        # --disable-log-stats 를 주지 않는다 → 3절 참고
        env:
        - {name: HF_HOME, value: /models}
        ports: [{name: http, containerPort: 8000}]
        resources:
          limits: {nvidia.com/gpu: 1}   # ④ 1장씩 요청 → 두 파드가 서로 다른 물리 GPU 에 뜬다
        volumeMounts:
        - {name: models, mountPath: /models}
        - {name: shm, mountPath: /dev/shm}
        readinessProbe:
          httpGet: {path: /health, port: 8000}
          initialDelaySeconds: 30
          periodSeconds: 10
          failureThreshold: 60          # ⑤ 모델 로드 + 엔진 초기화에 60초 넘게 걸린다
      volumes:
      - {name: models, hostPath: {path: /home/ubuntu/hfcache, type: DirectoryOrCreate}}
      - {name: shm, emptyDir: {medium: Memory, sizeLimit: 4Gi}}
---
apiVersion: v1
kind: Service
metadata: {name: qwen3, namespace: vllm}
spec:
  type: NodePort
  selector: {app: qwen3}
  ports: [{name: http, port: 8000, targetPort: 8000, nodePort: 30800}]
```

**① `runtimeClassName: nvidia`는** 실습 과정에서 빠뜨리기 쉬운 항목이었다. K3s는 호스트에 `nvidia-container-runtime` 바이너리가 있으면 RuntimeClass를 자동 등록하지만, 파드에서 이를 명시하지 않으면 `limits`로 GPU를 요청해도 장치가 주입되지 않는다.

**④ `nvidia.com/gpu: 1`을 파드당 1장으로 두는 것이 측정 설계의 일부다.** 2절에서 적은 대로, 두 파드를 같은 GPU에 얹으면 SM 경합이 라우팅 효과를 가린다. 이 설정과 4-GPU 인스턴스 조합으로 두 파드가 각각 다른 물리 GPU를 잡는다. 실제로 확인하면 UUID가 갈린다.

```
qwen3-...-65lcw -> GPU-73d99bf5-aa3e-f56e-49bf-8e44d5598ddc
qwen3-...-fbn9f -> GPU-db283fbb-7bba-0374-4a93-c6fcedc24afd
```

두 파드가 같은 모델을 사용하므로 HF 캐시는 hostPath로 공유했다. 파드마다 emptyDir을 사용하면 같은 가중치를 두 번 내려받아야 하고, 파드를 재생성하며 측정 조합을 바꿀 때마다 다운로드가 반복된다.

기동 로그에서 두 줄을 확인해야 다음 단계로 갈 수 있다.

```
GPU KV cache size: 163,472 tokens
Maximum concurrency for 8,192 tokens per request: 19.96x
```

3절의 워크로드는 이 163,472토큰을 기준으로 설계했다. working set이 이 값보다 커야 기존 프리픽스가 캐시에서 밀려나고 라우팅 방식도 결과에 영향을 미친다.

### 9.2 `vllm-router`

PyPI 패키지라 전용 이미지가 없다. `pip install`로 올렸다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: {name: vllm-router, namespace: vllm}
spec:
  replicas: 1
  selector: {matchLabels: {app: vllm-router}}
  template:
    metadata: {labels: {app: vllm-router}}
    spec:
      containers:
      - name: router
        image: python:3.12-slim
        command: ["/bin/sh","-c"]
        args:
        - |
          set -e
          pip install --no-cache-dir -q vllm-router==0.1.15
          exec vllm-router --host 0.0.0.0 --port 8000 \
            --policy "$POLICY" --worker-urls $WORKERS
        env:
        - {name: POLICY,  value: "round_robin"}   # ① 정책만 바꿔 arm 을 갈아탄다
        - {name: WORKERS, value: "PLACEHOLDER"}   # ② 파드 IP 목록. 공백 구분
        ports: [{containerPort: 8000}]
        readinessProbe:
          tcpSocket: {port: 8000}                 # ③ /health 가 없다. TCP 로 본다
          initialDelaySeconds: 20
          periodSeconds: 5
          failureThreshold: 40
---
apiVersion: v1
kind: Service
metadata: {name: vllm-router, namespace: vllm}
spec:
  type: NodePort
  selector: {app: vllm-router}
  ports: [{port: 8000, targetPort: 8000, nodePort: 30810}]
```

`round_robin`과 `cache_aware`는 정책 문자열만 다르므로 **① 정책을 env로 분리했다.** `kubectl set env`로 값을 바꾸면 매니페스트를 다시 적용하지 않아도 된다.

```bash
kubectl -n vllm set env deploy/vllm-router POLICY=cache_aware
```

**② `WORKERS`에 파드 IP를 직접 넣을 때는 갱신 시점에 주의해야 한다.** 9.8절처럼 프리픽스 캐시를 초기화하려고 측정 조합마다 파드를 재생성하면 파드 IP도 바뀐다. 라우터의 URL을 그대로 두면 모든 요청이 실패하므로 측정을 시작하기 전에 IP를 다시 읽어 갱신해야 한다.

```bash
IPS=$(kubectl -n vllm get pod -l app=qwen3 \
  -o jsonpath="{range .items[*]}http://{.status.podIP}:8000 {end}")
kubectl -n vllm set env deploy/vllm-router WORKERS="$IPS"
```

Service를 쓰면 이 문제가 없다. 다만 라우터가 kube-proxy를 한 번 더 거쳐 자기 라우팅 결정이 무의미해진다. **라우터는 파드를 직접 가리켜야 한다.**

기동 로그에 정책 파라미터가 그대로 찍힌다. 7절에서 이 값을 읽고 가설을 세웠다.

```
policy: CacheAware {
  cache_threshold: 0.3, balance_abs_threshold: 64,
  balance_rel_threshold: 1.5, eviction_interval_secs: 120,
  max_tree_size: 67108864
}
```

임계를 바꾸려면 CLI 플래그로 준다. 7절에서 임계값을 높여 다시 측정한 구성이 이것이다.

```
--cache-threshold 0.3 --balance-abs-threshold 4096 \
--balance-rel-threshold 100 --eviction-interval-secs 3600
```

### 9.3 InferencePool - GAIE 표준 리소스

`inference.networking.k8s.io/v1`이다. 알파도 베타도 아니다.

```yaml
apiVersion: inference.networking.k8s.io/v1
kind: InferencePool
metadata: {name: qwen3-pool, namespace: vllm}
spec:
  selector:
    matchLabels: {app: qwen3}   # ① 라벨로 파드를 찾는다. 스케일 인/아웃을 자동 추적
  targetPorts:
  - number: 8000                # ② 추론 트래픽이 나가는 포트
  endpointPickerRef:
    name: epp                   # ③ 어느 EPP 에 물어볼지
    port: {number: 9002}
    failureMode: FailClose      # ④ EPP 가 죽으면 요청을 막는다
```

이 리소스는 EPP에 "후보가 누구인가"를 알려 주고(①②), 게이트웨이에는 "누구에게 물어볼 것인가"를 지정한다(③). 파드 목록을 라벨로 선택하므로 스케일링에 따라 후보도 자동으로 바뀐다.

**④ `failureMode`는 가용성 정책에 따라 선택한다.** `FailClose`는 EPP 장애 시 요청을 거절하고 `FailOpen`은 EPP를 건너뛰어 요청을 전달한다. EPP가 없어도 캐시 효율만 낮아질 뿐 추론 서비스는 동작하므로, 가용성을 우선하는 환경에는 `FailOpen`이 적합하다. 이 실습에서는 EPP가 데이터 경로에 포함됐는지 확인하려고 `FailClose`를 사용했다.

적용 후 `kubectl describe`로 확인하면 `endpointPickerRef`의 `kind`가 `Service`로 기본값이 채워진다.

```
Spec:
  Endpoint Picker Ref:
    Failure Mode:  FailClose
    Kind:          Service
    Name:          epp
    Port:
      Number:  9002
  Selector:
    Match Labels:
      App:  qwen3
  Target Ports:
    Number:  8000
```

### 9.4 EPP - 공식 차트를 쓴다

처음에 Deployment를 손으로 썼다가 실패했다.

```
ERROR setup failed to create scheduler
  {"error": "scheduler config must be set either by config api or through code"}
```

**GAIE v1.0.1의 EPP는 `--config-file` 또는 `--config-text`를 반드시 지정해야 한다.** 스케줄러 플러그인 구성이 없으면 기동하지 않으며, 차트를 사용하면 필요한 ConfigMap이 함께 생성된다.

```bash
helm upgrade -i qwen3-pool \
  oci://registry.k8s.io/gateway-api-inference-extension/charts/inferencepool \
  --version v1.0.1 -n vllm -f gaie-values.yaml
```

```yaml
# gaie-values.yaml
inferencePool:
  targetPortNumber: 8000
  modelServerType: vllm
  modelServers:
    matchLabels:
      app: qwen3      # ① 9.3 의 selector 와 같아야 한다
provider:
  name: none          # ② 클라우드 게이트웨이 연동을 쓰지 않는다
```

차트가 생성한 ConfigMap에는 **GAIE EPP 측정에 사용한 설정**이 들어 있다.

```yaml
# ConfigMap qwen3-pool-epp / default-plugins.yaml
apiVersion: inference.networking.x-k8s.io/v1alpha1
kind: EndpointPickerConfig
plugins:
- type: queue-scorer                  # 큐 깊이
- type: kv-cache-utilization-scorer   # KV 캐시 점유율
- type: prefix-cache-scorer           # 프리픽스 캐시 (근사)
schedulingProfiles:
- name: default
  plugins:
  - pluginRef: queue-scorer
  - pluginRef: kv-cache-utilization-scorer
  - pluginRef: prefix-cache-scorer
```

EPP 로그에 파싱 결과가 찍힌다. 기본값으로 `single-profile-handler`와 `max-score-picker`가 채워진다.

```
Profiles: map[default:{
  Filters: [],
  Scorers: [queue-scorer: 1, kv-cache-utilization-scorer: 1, prefix-cache-scorer: 1],
  Picker: max-score-picker
}]
```

**세 스코어러의 가중치가 전부 1이다.** 프리픽스 캐시 점수가 큐·KV 점수와 동등하게 섞인다. 이 가중치 구성은 6절에서 캐시 히트율이 오르지 않은 이유의 후보 중 하나다. 가중치를 조정하려면 `pluginsCustomConfig`로 직접 쓴다.

두 번째로 확인할 항목은 TLS 설정이다. EPP는 `"secure-serving": true`를 기본값으로 사용한다.

```bash
kubectl -n vllm patch deploy qwen3-pool-epp --type=json \
  -p '[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--secure-serving=false"}]'
```

EPP에는 파드와 엔드포인트를 감시하고 InferencePool 상태를 갱신할 RBAC 권한도 필요하다. 차트는 이 권한을 함께 생성한다. 매니페스트를 직접 작성할 때는 메트릭 엔드포인트 인증에 필요한 `tokenreviews`와 `subjectaccessreviews` 권한을 빠뜨리기 쉽다.

```yaml
rules:
- apiGroups: [""]
  resources: [pods, services, endpoints, nodes]
  verbs: [get, list, watch]
- apiGroups: ["discovery.k8s.io"]
  resources: [endpointslices]
  verbs: [get, list, watch]
- apiGroups: ["inference.networking.k8s.io","inference.networking.x-k8s.io"]
  resources: ["*"]
  verbs: [get, list, watch, patch, update]
- apiGroups: ["authentication.k8s.io"]
  resources: [tokenreviews]
  verbs: [create]
- apiGroups: ["authorization.k8s.io"]
  resources: [subjectaccessreviews]
  verbs: [create]
```

### 9.5 Envoy - ext\_proc과 ORIGINAL\_DST

8절에서 Envoy Gateway가 InferencePool을 받지 않아 우회한 경로다. llm-d의 standalone 구성을 K8s 파드로 옮겼다. **이 설정이 EPP 위임의 핵심이라 전문을 옮긴다.**

```yaml
admin:
  address:
    socket_address: {address: 0.0.0.0, port_value: 19000}
static_resources:
  listeners:
  - name: main
    address:
      socket_address: {address: 0.0.0.0, port_value: 8081}
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: all
              domains: ["*"]
              routes:
              - match: {prefix: "/"}
                route:
                  cluster: original_destination_cluster
                  timeout: 300s          # ① 긴 생성을 끊지 않는다
          http_filters:
          - name: envoy.filters.http.ext_proc
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
              grpc_service:
                envoy_grpc: {cluster_name: ext_proc}
                timeout: 10s
              processing_mode:
                request_header_mode: SEND
                response_header_mode: SEND
                request_body_mode: FULL_DUPLEX_STREAMED    # ② 본문을 봐야 라우팅한다
                response_body_mode: FULL_DUPLEX_STREAMED
                request_trailer_mode: SEND
                response_trailer_mode: SEND
              message_timeout: 1000s     # ③ EPP 응답을 최대 1000초 기다린다
              failure_mode_allow: false  # ④ EPP 실패 시 통과시키지 않는다
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
  clusters:
  - name: original_destination_cluster
    type: ORIGINAL_DST                   # ⑤ 고정 엔드포인트 목록이 없다
    lb_policy: CLUSTER_PROVIDED
    connect_timeout: 6s
    original_dst_lb_config:
      use_http_header: true
      http_header_name: x-gateway-destination-endpoint   # ⑥ EPP 가 심는 헤더
    circuit_breakers:
      thresholds:
      - max_connections: 40000           # ⑦ 스트리밍 연결이 오래 열려 있다
        max_pending_requests: 40000
        max_requests: 40000
        max_retries: 1024
  - name: ext_proc
    type: STRICT_DNS                     # ⑧ Service DNS 로 EPP 를 찾는다
    lb_policy: LEAST_REQUEST
    connect_timeout: 6s
    typed_extension_protocol_options:
      envoy.extensions.upstreams.http.v3.HttpProtocolOptions:
        "@type": type.googleapis.com/envoy.extensions.upstreams.http.v3.HttpProtocolOptions
        explicit_http_config:
          http2_protocol_options:        # ⑨ gRPC 이므로 HTTP/2 필수
            initial_stream_window_size: 65536
            initial_connection_window_size: 1048576
    load_assignment:
      cluster_name: ext_proc
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: qwen3-pool-epp.vllm.svc.cluster.local
                port_value: 9002
```

**⑤⑥은 EPP가 선택한 파드로 요청을 전달하는 설정이다.** `ORIGINAL_DST`는 엔드포인트 목록을 따로 두지 않는다. EPP가 ext\_proc 단계에서 `x-gateway-destination-endpoint: <파드IP>:<포트>` 헤더를 추가하면 Envoy가 해당 주소로 직접 연결한다. 로드밸런싱 결정은 100% EPP가 담당하며, 요청마다 목적지를 헤더로 지정하므로 kube-proxy의 "연결 단위 배정 후 keep-alive 고착" 문제가 발생하지 않는다.

**② `FULL_DUPLEX_STREAMED`는 LLM 요청 본문과 SSE 스트리밍을 함께 처리하는 데 필요하다.** 1절에서 설명했듯 라우팅 정보가 본문에 있으므로 EPP가 본문을 읽어야 하지만, 응답 전체를 버퍼링하면 SSE 스트리밍이 중단된다. 이 모드는 양방향 스트리밍을 유지하면서 EPP가 데이터를 확인할 수 있게 한다.

**③ `message_timeout: 1000s`는** 긴 생성을 고려한 값이다. 기본값으로 두면 응답이 긴 요청에서 ext\_proc이 타임아웃된다.

**⑧ `STRICT_DNS`는 llm-d가 공개한 설정과 다른 부분이다.** 공개 설정은 Envoy와 EPP가 같은 호스트에서 실행된다고 보고 `STATIC`으로 `127.0.0.1:9002`를 사용한다. 이 구성에서는 EPP가 별도 파드에 있으므로 Service DNS로 찾아야 했다.

이 구성에서도 두 가지를 수정했다. 첫째, 공개 설정의 gRPC 액티브 헬스체크를 그대로 사용할 수 없었다.

```yaml
# 이렇게 두면 영원히 실패한다
health_checks:
- grpc_health_check: {service_name: "envoy.service.ext_proc.v3.ExternalProcessor"}
```

**EPP의 gRPC 헬스는 9003이고 ext-proc 서비스는 9002다.** 9002에 헬스체크를 걸면 다른 서비스라 응답하지 않는다.

```
ext_proc::10.43.99.88:9002::health_flags::/failed_active_hc
cluster.ext_proc.health_check.network_failure: 1
```

둘째, EPP가 TLS를 기본으로 쓴다. 헬스체크를 제거하고 9.4의 `--secure-serving=false`를 함께 적용하면 붙는다.

```
ext_proc::10.43.99.88:9002::health_flags::healthy
```

Deployment는 단순하다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: {name: envoy-epp, namespace: vllm}
spec:
  replicas: 1
  selector: {matchLabels: {app: envoy-epp}}
  template:
    metadata: {labels: {app: envoy-epp}}
    spec:
      containers:
      - name: envoy
        image: envoyproxy/envoy:v1.35-latest
        args: ["-c","/etc/envoy/envoy.yaml","--service-node","envoy-standalone",
               "--log-level","warn","--concurrency","8"]
        # ① log-level trace 는 부하에서 CPU 를 크게 먹는다
        # ② concurrency 를 안 주면 hardware_concurrency() 만큼 워커를 띄워
        #    cgroup CPU 슬라이스를 초과 구독한다
        ports:
        - {name: http, containerPort: 8081}
        - {name: admin, containerPort: 19000}
        volumeMounts: [{name: cfg, mountPath: /etc/envoy}]
        readinessProbe:
          httpGet: {path: /ready, port: 19000}
          initialDelaySeconds: 5
          periodSeconds: 5
          failureThreshold: 30
        resources:
          requests: {cpu: "4", memory: 2Gi}
      volumes:
      - {name: cfg, configMap: {name: envoy-epp-config}}
---
apiVersion: v1
kind: Service
metadata: {name: envoy-epp, namespace: vllm}
spec:
  type: NodePort
  selector: {app: envoy-epp}
  ports:
  - {name: http,  port: 8081,  targetPort: 8081,  nodePort: 30820}
  - {name: admin, port: 19000, targetPort: 19000, nodePort: 30821}
```

ext\_proc 연결 상태를 확인하려고 admin 포트를 노출했다. 이 포트에서 클러스터 상태를 조회할 수 있다.

```bash
curl -s http://$NODE:30821/clusters | grep -E 'ext_proc.*health_flags'
curl -s http://$NODE:30821/stats    | grep -E 'cluster.ext_proc.(membership_healthy|upstream_rq_total)'
```

### 9.6 되지 않은 설정 - Gateway API 경로

8절의 벽을 매니페스트로 남겨 둔다. 같은 시도를 하는 사람이 빨리 판별할 수 있게 하려는 목적이다.

```yaml
# GatewayClass - Envoy Gateway 는 기본 제공하지 않는다. 직접 만들어야 한다
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata: {name: eg}
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata: {name: inference-gw, namespace: vllm}
spec:
  gatewayClassName: eg
  listeners:
  - {name: http, protocol: HTTP, port: 80, allowedRoutes: {namespaces: {from: Same}}}
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata: {name: qwen3-route, namespace: vllm}
spec:
  parentRefs: [{name: inference-gw}]
  rules:
  - matches: [{path: {type: PathPrefix, value: /}}]
    backendRefs:
    - group: inference.networking.k8s.io   # ← 여기서 막힌다
      kind: InferencePool
      name: qwen3-pool
    timeouts: {request: "300s"}
```

`extensionApis`를 켜도 통과하지 않는다. 활성화 파일 URL이 404여서 EnvoyGateway ConfigMap을 직접 고쳤다.

```yaml
# ConfigMap envoy-gateway-config / envoy-gateway.yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyGateway
extensionApis:
  enableBackend: true            # 기본값은 extensionApis: {}
  enableEnvoyPatchPolicy: true
gateway:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
```

적용하고 컨트롤러를 재기동해도 결과가 같다.

```
Accepted=True       reason=Accepted   msg=Route is accepted
ResolvedRefs=False  reason=InvalidKind
  msg=Group is invalid, only the core API group, multicluster.x-k8s.io
      and gateway.envoyproxy.io are supported.
```

HTTPRoute 적용 결과는 `Accepted`와 `ResolvedRefs`를 함께 확인해야 한다. `Accepted`가 `True`여도 `ResolvedRefs`에서 backendRef 해석 실패가 나타날 수 있다.

```bash
kubectl -n vllm get httproute qwen3-route -o json | python3 -c "
import sys,json
for p in json.load(sys.stdin)['status']['parents']:
    for c in p['conditions']:
        print(f\"{c['type']}={c['status']} reason={c.get('reason')}\")"
```

### 9.7 벤치마크 Job

측정 클라이언트도 파드로 돌렸다. Docker를 K3s와 충돌하지 않게 내려 뒀기 때문이다.

```yaml
apiVersion: batch/v1
kind: Job
metadata: {name: bench-prefix, namespace: vllm}
spec:
  backoffLimit: 0                  # ① 재시도하면 캐시 상태가 오염된다
  template:
    spec:
      restartPolicy: Never
      runtimeClassName: nvidia     # ② 클라이언트인데도 GPU 가 보여야 한다
      containers:
      - name: bench
        image: vllm/vllm-openai:v0.11.0
        imagePullPolicy: IfNotPresent
        command: ["vllm","bench","serve"]
        args:
        - "--backend=openai-chat"
        - "--base-url=http://<대상>:<포트>"
        - "--endpoint=/v1/chat/completions"
        - "--model=Qwen/Qwen3-0.6B-FP8"
        - "--served-model-name=qwen3"
        - "--tokenizer=Qwen/Qwen3-0.6B-FP8"
        - "--dataset-name=prefix_repetition"
        - "--num-prompts=1024"
        - "--prefix-repetition-prefix-len=2048"    # ③ 3절 설계값
        - "--prefix-repetition-suffix-len=128"
        - "--prefix-repetition-num-prefixes=128"
        - "--prefix-repetition-output-len=128"
        - "--max-concurrency=32"
        - "--request-rate=inf"
        - "--seed=42"
        - "--percentile-metrics=ttft,tpot,itl,e2el"
        - "--save-result"
        - "--result-dir=/out"
        - "--result-filename=arm-prefix.json"
        env:
        - {name: HF_HOME, value: /models}
        - {name: NVIDIA_VISIBLE_DEVICES, value: all}          # ②
        - {name: NVIDIA_DRIVER_CAPABILITIES, value: compute,utility}
        volumeMounts:
        - {name: models, mountPath: /models}
        - {name: out, mountPath: /out}
        resources:
          requests: {cpu: "2", memory: 4Gi}
          limits: {memory: 12Gi}                   # ④ 토크나이저 + 데이터셋 파싱
      volumes:
      - {name: models, hostPath: {path: /home/ubuntu/hfcache, type: Directory}}
      - {name: out, hostPath: {path: /home/ubuntu/lab7w/results, type: Directory}}
```

**② 벤치마크 클라이언트에도 GPU가 보여야 했다.** `vllm bench serve`는 HTTP 클라이언트지만 CLI 파서가 엔진 설정 전체를 만들면서 device를 감지한다. GPU를 찾지 못하면 다음 오류로 종료된다.

```
RuntimeError: Failed to infer device type
```

`nvidia.com/gpu`를 **요청하지 않고** `runtimeClassName`과 `NVIDIA_VISIBLE_DEVICES=all`만 지정했다. 클라이언트는 VRAM을 사용하지 않으므로 서버 파드 두 개에 할당된 GPU 자원 계산에는 영향을 주지 않는다.

**① `backoffLimit: 0`은** 측정 무결성 때문이다. Job이 재시도하면 두 번째 실행이 첫 번째가 남긴 프리픽스 캐시를 만나 히트율이 부풀려진다.

### 9.8 프리픽스 캐시 초기화

측정 조합 사이에 캐시 상태가 이어지면 히트율 비교가 오염된다. vLLM 0.11.0에는 리셋 엔드포인트가 없다.

```bash
curl -X POST http://$POD:8000/reset_prefix_cache   # → 404
curl -s http://$POD:8000/openapi.json | jq '[.paths|keys[]|select(contains("reset"))]'
# → []
```

파드를 지워 재생성한다. `rollout restart`보다 빠르다. 순차 종료를 기다리지 않기 때문이다.

```bash
kubectl -n vllm delete pod -l app=qwen3 --wait=false
sleep 8
kubectl -n vllm rollout status deploy/qwen3 --timeout=8m
# Ready 이후에도 엔진 초기화에 여유를 둔다
sleep 20
```

readinessProbe가 `/health`를 통과한 직후에는 엔진 초기화가 끝나지 않았을 수 있다. 이 상태에서 곧바로 측정하면 첫 요청의 지연이 비정상적으로 커지므로 Ready 이후에도 대기 시간을 뒀다.

### 9.9 측정 증거를 읽는 쿼리

TPS만으로는 왜 빨라졌는지 밝힐 수 없다. 파드별 카운터가 근거다.

```bash
for IP in $(kubectl -n vllm get pod -l app=qwen3 -o jsonpath='{.items[*].status.podIP}'); do
  M=$(curl -s "http://$IP:8000/metrics")
  Q=$(echo "$M" | grep '^vllm:prefix_cache_queries_total' | awk '{s+=$2} END {print s}')
  H=$(echo "$M" | grep '^vllm:prefix_cache_hits_total'    | awk '{s+=$2} END {print s}')
  S=$(echo "$M" | grep '^vllm:request_success_total'      | awk '{s+=$2} END {print s}')
  echo "$IP  요청=$S  히트율=$H/$Q"
done
```

첫 번째 카운터는 요청 분배를, 나머지 두 카운터는 캐시 효과를 나타낸다. 6절에서는 요청이 513/512로 고르게 분배됐지만 히트율은 41%에 머물렀다. 요청 수가 균등하다고 해서 프리픽스도 파티셔닝됐다고 볼 수 없으므로 두 종류의 카운터를 함께 확인해야 한다.

***

## 10. 세 갈래를 어떻게 갈라 보는가

측정 결과와 설치 과정에서 확인한 차이는 다음과 같다.

| <br /> | `vllm-router` 0.1.15       | Agent Router 1.1.0         | llm-d                  |
| :----------------------------- | :------------------------- | :------------------------- | :--------------------- |
| 위치                             | vLLM 앞단 단독 프로세스            | Envoy Gateway 확장           | InferencePool + EPP    |
| K8s 필요                         | 없음                         | 필수                         | 사실상 필수 (standalone 예외) |
| 설치 난이도                         | `pip install` 한 줄          | CRD 6종 + 컨트롤러              | 차트·이미지 접근 제약           |
| 프리픽스 인식                        | `cache_aware` (이 실습에서 미작동) | 없음 (게이트웨이 관심사)             | 핵심 기능                  |
| 외부 provider 통합                 | 없음                         | **16개 provider, 요청/응답 변환** | 없음                     |
| 토큰 기반 rate limit               | 없음                         | **있음 (4종)**                | 없음                     |
| provider 페일오버                  | 없음                         | **있음**                     | 없음                     |
| PII 마스킹 자리                     | 없음                         | **ext\_proc**              | ext\_proc (라우팅 용도)     |
| MCP 게이트웨이                      | 없음                         | **있음**                     | 없음                     |
| P/D 분리                         | `--vllm-pd-disaggregation` | 없음                         | 핵심 기능                  |
| 이 실습 측정값                       | 대조군(kube-proxy)과 동일        | 라우팅 미측정                    | 대조군과 동일 (approximate)  |

세 구현체는 담당하는 계층이 다르다. 1절에서 설명한 두 조건에 따라 배치 위치도 나뉜다.

```
애플리케이션
   │
   ├─ Agent Router ─── 조건 하나: 어느 모델·어느 provider 인가
   │                   통합 API · 토큰 예산 · 페일오버 · 본문 변환
   ▼
   ├─ llm-d / vllm-router ─── 조건 둘: 같은 모델 복제본 중 어느 파드인가
   │                          KV 캐시 위치 · 큐 깊이 · P/D 분리
   ▼
   vLLM (엔진)
```

Agent Router는 **엔드포인트 수준**에서 요청을 나누고 llm-d는 **풀 내부**의 파드를 선택하므로 역할이 겹치지 않는다. Agent Router를 데이터플레인으로 두고 llm-d의 InferencePool을 연결하는 구성도 제안돼 있다. 다만 8절에서 확인했듯 현재 버전에서는 두 구현체를 연결할 수 없었다.

### 무엇을 먼저 고를까

| 상황                            | 선택                                   |
| :---------------------------- | :----------------------------------- |
| 여러 provider·모델을 앱과 분리해야 한다    | **Agent Router.** 대체재가 없다            |
| 요청 본문을 검사·변환해야 한다 (마스킹, 가드레일) | **Agent Router** ext\_proc           |
| MCP 도구를 중앙에서 인가·필터링해야 한다      | **Agent Router** MCP Gateway         |
| 같은 모델 복제본이 여러 개고 프리픽스가 겹친다    | **llm-d.** 단, 정밀 KV 인식까지 설정해야 효과가 나온다 |
| 복제본 배분만 필요하고 K8s를 안 쓴다        | `vllm-router` `round_robin`          |
| 프리픽스가 안 겹치는 트래픽               | **아무거나.** 6절 ShareGPT에서 차이가 없었다      |

프리픽스 재사용이 없는 트래픽에서는 라우팅 계층을 바꿔도 성능이 달라지지 않았다. 도입 여부를 결정하기 전에 실제 트래픽의 프리픽스 중복도를 측정해야 한다.

***

## 11. 실습 시 유의사항

### 완료 마커를 조건 없이 찍지 않는다

벤치마크 스크립트 끝에 `echo BENCH_OK`를 무조건 뒀다. 벤치가 통째로 실패했는데도 마커가 찍혀 성공으로 읽었다.

```bash
# 위험 - 실패해도 찍힌다
run_benchmark
echo "BENCH_OK_$ARM"

# 안전 - 결과 파일이 실제로 생겼을 때만
OK=1
for W in prefix sharegpt; do [ -s "$R/$ARM-$W.json" ] || OK=0; done
[ "$OK" = 1 ] && echo "BENCH_OK_$ARM" || echo "BENCH_FAIL_$ARM"
```

`grep -c`로 완료를 판정하는 방식도 같은 계열이다. 0건일 때 종료 코드 1을 내므로 `|| echo 0`을 붙이면 출력이 `00`이 되고 `"00" != "0"`이 참이 되어 완료로 오판한다. 카운트를 쓰지 말고 `grep -q`로 고정 토큰만 본다.

### K8s Job 완료 판정을 conditions 하나로 하지 않는다

```bash
# 놓친다 - 새 Job API 에서 conditions[0] 이 기대한 값이 아니다
C=$(kubectl get job $J -o jsonpath='{.status.conditions[0].type}')

# 안전 - succeeded/failed 카운트를 함께 본다
S=$(kubectl get job $J -o jsonpath='{.status.succeeded}')
F=$(kubectl get job $J -o jsonpath='{.status.failed}')
```

Job이 14분 전에 이미 Failed였는데 대기 루프가 계속 돌았다.

### `vllm bench serve`는 GPU가 보여야 뜬다

Docker를 K3s와 충돌하지 않게 내려 두고 벤치를 K8s Job으로 옮겼더니 이렇게 죽었다.

```
RuntimeError: Failed to infer device type
```

벤치는 클라이언트인데 CLI 파서가 엔진 설정 전체를 만들면서 device를 감지한다. GPU를 예약하지 않고 보이게만 하면 된다.

```yaml
runtimeClassName: nvidia
env:
- {name: NVIDIA_VISIBLE_DEVICES, value: all}
- {name: NVIDIA_DRIVER_CAPABILITIES, value: compute,utility}
# nvidia.com/gpu 는 요청하지 않는다 - 서버용 2장의 회계가 그대로 유지된다
```

### 프리픽스 캐시는 arm 사이에 초기화한다

vLLM 0.11.0에는 `/reset_prefix_cache` 엔드포인트가 없다(OpenAPI 경로 목록에 없음). 파드를 지워 재생성하는 편이 `rollout restart`보다 빠르다. 순차 종료를 기다리지 않는다.

```bash
kubectl -n vllm delete pod -l app=qwen3 --wait=false
sleep 8 && kubectl -n vllm rollout status deploy/qwen3
```

이때 파드 IP가 바뀐다. 라우터에 워커 URL을 박아 뒀다면 매번 갱신해야 한다.

### 워크로드가 결론을 정한다

3절에서 프리픽스 8종으로 시작했을 때 히트율이 75~77%였다. 그 조건에서는 **어떤 라우팅도 개선할 여지가 없다.** working set이 캐시보다 작으면 모든 프리픽스가 캐시에 남아 있으므로 라우팅 결정이 결과를 바꾸지 않는다.

```
working set = 프리픽스 종류 × 프리픽스 길이
비교하려면  working set > 파드당 KV 캐시
```

4·5절처럼 워크로드의 상한도 별도로 측정해야 한다. 41%를 놓고 "라우팅이 실패했다"고 판단할 수 있었던 근거는 "완벽 파티셔닝이면 77.5%"라는 대조 결과였다. 이 값이 없으면 41%가 워크로드의 상한인지 라우팅 실패인지 구분할 수 없다.

### 가설을 하나의 테스트로 확정하지 않는다

`cache_aware`에 프리픽스 A를 20회 보내 20/0을 얻고 "친화성이 작동한다"고 판단했다. B도 20/0이라는 두 번째 테스트가 그 해석을 뒤집었다. **대조군 없는 단일 관측은 타이브레이킹과 친화성을 구분하지 못한다.**

`balance_abs_threshold` 가설도 그렇다. 로그에 찍힌 값이 그럴듯해서 원인으로 지목했다. 64배로 올려 재보니 아무 변화가 없었다. 그럴듯함이 근거가 되지 못한다.

### GPU 인스턴스 용량과 계정별 정책

2회차 기동에서 us-west-2a와 2b가 `InsufficientInstanceCapacity`였고 2c에서 떴다. AZ를 순회하는 스크립트가 없으면 여기서 시간을 버린다.

계정에 SSM Patch Policy가 걸려 있으면 내가 만든 IAM 롤에 정책이 자동으로 붙는다. 정리할 때 이것을 먼저 떼지 않으면 롤 삭제가 막힌다.

```bash
# 자동 부착분까지 훑어야 한다
for P in $(aws iam list-role-policies --role-name $ROLE --query 'PolicyNames[]' --output text); do
  aws iam delete-role-policy --role-name $ROLE --policy-name "$P"
done
for A in $(aws iam list-attached-role-policies --role-name $ROLE --query 'AttachedPolicies[].PolicyArn' --output text); do
  aws iam detach-role-policy --role-name $ROLE --policy-arn "$A"
done
```

내 런처는 `AmazonSSMManagedInstanceCore` 하나만 붙였는데 `AmazonSSMPatchAssociation`과 인라인 정책 `pr1c-patchpolicy-s3`가 함께 나왔다.

***

## 12. 마무리

게이트웨이 계층이 활용할 수 있었던 성능 차이는 캐시 히트율 34.7포인트, 처리량 13.6%, p99 TTFT 56%였다. 4절에서는 파드 1대의 working set을 바꿔 상한을 측정했고, 5절에서는 수동 파티셔닝으로 같은 결과를 2파드 토폴로지에서 재현했다.

그러나 성능을 측정한 다섯 구성은 이 차이를 활용하지 못했다. kube-proxy, `vllm-router`의 `round_robin`과 `cache_aware`, GAIE EPP의 `prefix-cache-scorer`는 모두 39.4\~42.9%였고 동시성을 4까지 낮춰도 결과는 같았다.

구현체별 원인을 모두 특정하지는 못했다. `vllm-router`의 `cache_aware`는 서로 다른 프리픽스를 같은 파드로 보냈고, Envoy Gateway v1.9.1은 InferencePool을 backendRef로 받지 않았으며, llm-d의 정밀 KV 인식은 이미지 접근 제한 때문에 실행하지 못했다.

GAIE는 InferencePool과 EPP 프로토콜을 정의하며, Envoy의 `ext_proc`과 `ORIGINAL_DST`로 데이터 경로를 구성하는 방법도 문서화돼 있다. 이 경로를 직접 구성했을 때는 정상 동작했다. 하지만 InferencePool 활성화 파일 URL은 현재 404를 반환하고, 게이트웨이 구현체는 표준 리소스를 받지 않으며, 일부 필요한 이미지도 공개되지 않았다. 표준과 개별 구현체 사이의 연동은 아직 완성되지 않은 상태다.

도입 검토는 실제 트래픽의 프리픽스 중복도를 측정하는 작업부터 시작한다. 중복이 없으면 6절의 ShareGPT 결과처럼 라우팅 계층에 따른 차이가 없다. 중복이 있다면 working set과 파드당 KV 캐시를 비교한다. 3절의 첫 설계처럼 working set이 캐시보다 작으면 성능 차이가 생기지 않는다. 두 조건을 모두 충족할 때 이 글에서 측정한 34.7포인트 규모의 개선 여지가 생기며, 이후에 구현체를 선택하면 된다.

Agent Router는 16개 provider 통합, 토큰 기반 rate limit, provider 페일오버, MCP 게이트웨이, ext\_proc 기반 본문 변환을 제공한다. 이 기능들은 1절의 첫 번째 조건인 모델과 애플리케이션의 분리에 해당한다. 모델이나 provider를 교체해야 하는 환경에서는 Agent Router를 먼저 검토할 수 있다.

이기종 GPU 클러스터에서는 파드마다 처리 속도와 캐시 상태가 달라 라우팅의 영향이 더 커진다. 요청을 무작위로 배분하면 프리픽스가 캐시된 파드를 사용하지 못해 Prefill을 다시 처리한다. 노드 간 대역폭까지 영향을 주면 이 글에서 측정한 p99 56%보다 차이가 커질 수도 있다. 여러 종류의 GPU를 한 클러스터로 구성할 수는 있지만, 각 요청을 어느 GPU로 보낼지는 여전히 별도의 라우팅 계층에서 결정해야 한다.

실습 시간의 대부분은 측정보다 설치와 우회 경로를 확인하는 데 들어갔다. 404, `InvalidKind`, TLS 불일치, 헬스체크 포트, 이미지 403 오류는 8절에 정리했다. 빠르게 바뀌는 프로젝트가 많아 이 목록 중 일부는 반년 뒤에는 유효하지 않을 수 있으며, 현재로서는 버전별 호환성을 직접 확인해야 한다.

***

## 13. 참고 자료

* [Agent Router (구 Envoy AI Gateway)](https://theagentrouter.ai/docs/) · [아키텍처](https://theagentrouter.ai/docs/concepts/architecture/) · [1.0 릴리스](https://theagentrouter.ai/blog/v1.0-release-announcement)
* [Agentic AI Foundation](https://aaif.io/) - Agent Router의 현재 거버넌스
* [Envoy: External Processing (ext\_proc)](https://gateway.envoyproxy.io/docs/tasks/extensibility/ext-proc/) - AI 로직을 Envoy 코어 밖에 두는 확장점
* [Envoy Gateway](https://gateway.envoyproxy.io/) - v1.9.1 기준 backendRef 지원 그룹
* [Gateway API Inference Extension](https://gateway-api-inference-extension.sigs.k8s.io/) · [저장소](https://github.com/kubernetes-sigs/gateway-api-inference-extension) - InferencePool, EPP 프로토콜
* [llm-d](https://llm-d.ai/docs) · [아키텍처](https://llm-d.ai/docs/architecture) · [EPP](https://llm-d.ai/docs/architecture/core/router/epp)
* [llm-d: precise-prefix-cache-routing 가이드](https://github.com/llm-d/llm-d/tree/main/guides/precise-prefix-cache-routing) - 플러그인 설정과 캘리브레이션
* [llm-d: Kubernetes 없이 실행](https://llm-d.ai/blog/running-llm-d-without-kubernetes) · [standalone envoy.yaml](https://github.com/llm-d/llm-d/blob/main/guides/no-kubernetes-deployment/router/envoy/envoy.yaml)
* [llm-d: KV-Cache Wins You Can See](https://llm-d.ai/blog/kvcache-wins-you-can-see) - 프리픽스 캐싱에서 분산 스케줄링으로
* [vllm-router (PyPI)](https://pypi.org/project/vllm-router/) - 0.1.15, 정책 5종
* [vLLM: Benchmark CLI](https://docs.vllm.ai/en/latest/contributing/benchmarks/) - `prefix_repetition` 데이터셋
* [vLLM: Automatic Prefix Caching](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/)
* [vLLM KV cache events](https://github.com/vllm-project/vllm/issues/16669) - ZMQ 이벤트 발행
* [EKS Hybrid Nodes](https://docs.aws.amazon.com/eks/latest/userguide/hybrid-nodes-overview.html) - 온프레미스 노드를 관리형 컨트롤 플레인에 편입
* [NVIDIA L4](https://www.nvidia.com/en-us/data-center/l4/)
