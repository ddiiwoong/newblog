---
layout: single
title: "LLM 최적화 실전 프로젝트 — 단일 인스턴스 처리량 최대화"
comments: true
classes: wide
description: "Qwen3-14B을 L40S 한 장에 올리고 하드웨어 확인부터 트래픽 설계, 기준선, AWQ 양자화, 추가 튜닝까지 순서대로 얹어 처리량을 끌어올린 기록. GPU 두 장을 TP로 묶는 것과 replica 두 대로 나누는 것도 직접 비교"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: deep-learning/llm-optimization-capstone
date: 2026-09-06
categories:
  - Deep Learning
tags:
  - LLM
  - vLLM
  - Quantization
  - AWQ
  - Tensor Parallelism
  - Benchmark
  - AWS
  - GPU
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

# LLM 최적화 실전 프로젝트 — 단일 인스턴스 처리량 최대화

> 원본 학습 자료: O'Reilly *Hands-On LLM Serving and Optimization* (Chi Wang, Peiheng Hu) 9장 · 실습 코드 [orca3/llm-model-inference/ch09](https://github.com/orca3/llm-model-inference/tree/main/ch09)
>
> 측정 환경: AWS EC2 g6e.2xlarge (NVIDIA L40S 46GB, compute capability 8.9) · g6.12xlarge (L4 24GB x4, NVLink 없음, 도전과제) · vLLM 0.28.0 · Qwen3-14B / Qwen3-14B-AWQ

8장까지는 기법을 하나씩 떼어 봤다. 이 장은 그것들을 한 모델에 순서대로 얹어 보는 자리다. 목표는 단일 인스턴스의 토큰 처리량을 최대로 끌어올리는 것이고 순서는 하드웨어 확인 → 트래픽 설계 → 지표 정의 → 기준선 측정 → 양자화 → 추가 튜닝이다.

측정하면서 자료와 어긋난 지점이 두 곳 나왔다. 양자화는 자료가 예상한 것보다 ITL을 훨씬 크게 개선했고 반대로 자료가 권한 fine-tuned 설정은 성능을 떨어뜨렸다. 두 지점의 원인은 같았다.

마지막에 자료가 인용만 하고 직접 재지 않은 질문 하나를 따로 측정했다. GPU 두 장이 있을 때 TP로 쪼개는 것과 독립 인스턴스 두 대로 나누는 것 중 무엇이 나은가.

<!--truncate-->

---

## 용어 사전

| 용어 | 의미 |
|---|---|
| Total TPS | 초당 처리한 총 토큰 수. 입력과 출력을 합친다 |
| Output TPS | 초당 생성한 출력 토큰 수. 디코딩 성능을 본다 |
| TTFT | Time To First Token. 요청부터 첫 토큰까지. Prefill 효율을 반영한다 |
| ITL | Inter-Token Latency. 토큰 간 생성 간격. 스트리밍 체감 속도다 |
| AWQ | Activation-aware Weight Quantization. 4비트 가중치 양자화 방식 |
| ShareGPT | 실제 사용자 대화 데이터셋. 프롬프트 길이와 스타일이 다양하다 |
| Prefix Repetition | 반복 프리픽스 + 고유 접미사로 만든 합성 데이터셋. 캐시 효과를 본다 |
| 최대 동시성 | vLLM 기동 로그의 `Maximum concurrency`. 요청당 컨텍스트 기준으로 몇 개를 동시에 담는지 |
| TP / PP | Tensor / Pipeline Parallelism. 각각 행렬을 쪼개거나 레이어를 나눈다 |
| replica | 모델 전체를 복제한 독립 서버. 요청을 라우터가 나눈다 |

---

## 1. Step 1: 하드웨어 확인

먼저 이 GPU가 어떤 모델을 감당할 수 있는지 확인한다.

```bash
nvidia-smi --query-gpu=name,compute_cap,memory.free,memory.used,memory.total \
    --format=csv
```

```
index, name, compute_cap, memory.free, memory.used, memory.total, driver_version
0, NVIDIA L40S, 8.9, 45460 MiB, 0 MiB, 46068 MiB, 595.91.07
```

총 메모리는 모델과 KV 캐시를 함께 담을 수 있는지를 결정한다. FP8 같은 기능을 쓸 수 있는지는 compute capability로 정해진다. Performance State가 서빙 중에도 idle이면 병목이 GPU 밖에 있다는 뜻이다. 활용률은 서빙 중 97% 이상을 목표로 본다. NVLink 유무는 GPU가 여러 장일 때만 의미가 있는데 없으면 분산 서빙의 성격이 완전히 달라진다.

L40S 46GB는 FP16 원본과 양자화판을 나란히 올려 비교하려고 골랐다. 이 비교를 포기하면 훨씬 작은 GPU로도 핵심 실습이 된다.

| GPU | VRAM | 가능한 범위 |
|---|---|---|
| RTX 4070 | 16GB | Qwen3-4B BF16 → AWQ 비교 |
| T4 (Colab) | 16GB | Qwen3-4B AWQ, 추측 디코딩 |
| A10G (g5.xlarge) | 24GB | Qwen3-14B AWQ 전 구간 |
| **L40S (g6e.2xlarge)** | **46GB** | **14B FP16 원본 + AWQ 대조** |

모델 크기를 줄여도 절차는 같다. 기준선을 잡고 양자화를 얹어 배수를 재는 흐름은 4B에서도 똑같이 성립한다. FP16 원본을 함께 올려야 할 때만 46GB가 필요하다.

---

## 2. Step 2: 벤치마크 트래픽 설계

같은 최적화라도 트래픽 패턴이 다르면 효과가 거꾸로 나기도 한다. 긴 입력이 많은 워크로드와 긴 출력이 많은 워크로드는 병목이 다른 곳에 있으니 손댈 지점도 다르다. 그래서 성격이 다른 두 데이터셋을 쓴다.

| 데이터셋 | 성격 | 무엇을 보는가 |
|---|---|---|
| ShareGPT | 실제 대화. 입력·출력 길이가 균형 | 일반적인 서비스 성능 |
| Prefix Repetition | 프리픽스 10종을 돌려 쓰는 합성 데이터 | 프리픽스 캐시 재사용 |

### 벤치마크 전에 길이 분포를 본다

고른 데이터가 어떤 길이 분포를 갖는지 모르면 측정값을 해석할 수 없다. 실습 코드의 `inspect_dataset.py`가 이 일을 한다.

```bash
python3 inspect_dataset.py \
  --dataset-name sharegpt \
  --dataset-path ShareGPT_V3_unfiltered_cleaned_split.json \
  --model Qwen/Qwen3-14B --num-prompts 100 --save-samples
```

```
=== Prompt Length Distribution ===
Min: 5,  Max: 817,  Mean: 232.60,  Median: 141.50

=== Output Length Distribution ===
Min: 4,  Max: 771,  Mean: 220.61,  Median: 164.50
```

입력과 출력이 비슷하다. 대화형 워크로드의 특성이다. Prefill과 Decode가 비슷한 비중으로 섞인다. 만약 입력이 출력의 열 배였다면 Prefill 쪽 기법(프리픽스 캐싱, LMCache)을 먼저 봐야 하고 반대였다면 Decode 쪽(추측 디코딩)을 봐야 한다.

Max가 817 토큰이라는 사실이 6절에서 `--max-model-len 1024`가 왜 통과했는지를 설명하고 입출력 균형이 ITL 해석의 전제가 된다.

### 부하를 거는 명령

분포를 확인했으면 실제로 트래픽을 보낸다. 두 데이터셋 모두 요청 속도를 제한해 SLA 관점에서 쟀고 결과는 JSON으로 남겼다.

```bash
# ShareGPT — 2,000 프롬프트, 10 req/s, 최대 동시성 10
vllm bench serve --backend vllm --base-url http://localhost:8000 \
  --model Qwen/Qwen3-14B \
  --dataset-name sharegpt \
  --dataset-path ShareGPT_V3_unfiltered_cleaned_split.json \
  --num-prompts 2000 --request-rate 10 --burstiness 1.0 \
  --max-concurrency 10 --seed 42 \
  --save-result --result-filename result.json

# Prefix Repetition — 1,000 프롬프트, 5 req/s
vllm bench serve --backend vllm --base-url http://localhost:8000 \
  --model Qwen/Qwen3-14B \
  --dataset-name prefix_repetition \
  --num-prompts 1000 --request-rate 5 \
  --prefix-repetition-prefix-len 256 \
  --prefix-repetition-suffix-len 256 \
  --prefix-repetition-num-prefixes 10 \
  --prefix-repetition-output-len 128 \
  --max-concurrency 10 --seed 42 \
  --save-result --result-filename result.json
```

> **버전 확인이 먼저다**: vLLM 0.28.0에서 `--disable-log-requests`가 사라졌다. 예제를 그대로 따라가면 서버가 `unrecognized arguments`로 즉시 죽는다. `--disable-log-stats`가 대체 플래그다. 쓰려는 플래그는 측정 전에 `vllm serve --help=all`로 한 번 훑어 둔다. 0.28.0은 도움말이 그룹으로 나뉘어서 `--help`만으로는 개별 플래그가 보이지 않는다.

---

## 3. Step 3: 지표 정의

| 축 | 지표 | 읽는 법 |
|---|---|---|
| 처리량 | Total TPS | 시스템 전체 효율. 비용과 직결된다 |
| 처리량 | Output TPS | 디코딩 성능만 떼어 본다 |
| 지연 | Mean TTFT | 사용자가 느끼는 시작 속도 |
| 지연 | Mean ITL | 타이핑되는 속도 |
| 리소스 | GPU 활용률, 메모리 | 낮으면 배치나 스케줄링이 비효율 |

처리량과 지연은 한쪽을 얻으면 다른 쪽을 내주는 관계다. 배치를 키우면 처리량은 오르고 개별 요청은 기다린다. 그래서 실무에서는 지연을 허용 범위에 묶어 둔 채 처리량을 올린다.

---

## 4. Step 4~5: 기준선 (FP16)

```bash
vllm serve Qwen/Qwen3-14B --disable-log-stats
```

기동 로그에서 세 줄을 본다.

```
Model loading took 27.52 GiB and 6.27 seconds
Available KV cache memory: 11.57 GiB
GPU KV cache size: 75,824 tokens
Maximum concurrency for 40,960 tokens per request: 1.85x
```

| 항목 | 값 | 뜻 |
|---|---|---|
| 모델 | 27.52 GiB | 46GB 중 60%를 가중치가 차지한다 |
| KV 캐시 | 11.57 GiB (75,824 토큰) | 남은 25%가 KV 몫이다 |
| 최대 동시성 | 1.85x | 40,960 토큰 요청 기준으로 두 개를 못 담는다 |

이 기준선 구성이 곧 병목이다. 가중치가 메모리를 대부분 차지해서 동시에 처리할 요청 수가 두 개도 안 된다. 벤치마크가 동시성 10으로 요청을 밀어 넣으면 나머지는 큐에서 기다린다.

**기준선 측정 결과**

| 데이터셋 | Total TPS | Output TPS | TTFT | p99 TTFT | ITL | p99 ITL | 소요 |
|---|---|---|---|---|---|---|---|
| ShareGPT | 477.0 | 228.1 | 146.9 ms | 237.6 ms | 43.1 ms | 72.3 ms | 1,813초 |
| Prefix Repetition | 1,131.2 | 223.7 | 144.1 ms | 186.0 ms | 43.7 ms | 57.1 ms | 564초 |

> **실제 확인**: 원본 자료의 474 TPS / 228 Output TPS / ITL 43ms와 각각 0.6%, 0.05%, 0.2% 안에서 일치한다. Prefix Repetition의 1,131.2도 자료의 1,123과 맞는다. 같은 데이터셋에서 처리량만 2.37배 차이 나는 것은 프리픽스가 겹쳐 vLLM의 자동 프리픽스 캐싱이 Prefill을 건너뛰기 때문이다. TTFT·ITL이 두 데이터셋에서 거의 같다는 사실도 이 설명과 맞는다.

---

## 5. Step 6: 양자화 (AWQ INT4)

모델 이름 뒤에 `-AWQ`를 붙이는 것이 전부다.

```bash
vllm serve Qwen/Qwen3-14B-AWQ --disable-log-stats
```

**메모리가 재배치된다**

| | FP16 | AWQ INT4 | 변화 |
|---|---|---|---|
| 모델 | 27.52 GiB | 9.44 GiB | 66% 감소 |
| KV 캐시 | 11.57 GiB (75,824 tok) | 29.63 GiB (194,192 tok) | 2.56배 |
| 최대 동시성 | 1.85x | 4.74x | 2.56배 |

가중치에서 덜어낸 18.08 GiB가 그대로 KV로 넘어갔다. 그만큼 더 큰 배치를 담는다.

**벤치마크 결과**

| 데이터셋 | Total TPS | Output TPS | TTFT | ITL | 소요 |
|---|---|---|---|---|---|
| ShareGPT | 1,305.6 | 625.2 | 74.7 ms | 15.6 ms | 663초 |
| Prefix Repetition | 2,839.5 | 562.5 | 83.1 ms | 17.1 ms | 225초 |

**기준선 대비**

| 지표 | FP16 | AWQ | 변화 | 원본 자료 |
|---|---|---|---|---|
| Total TPS | 477.0 | 1,305.6 | **2.74배** | 2.7배 |
| Output TPS | 228.1 | 625.2 | 2.74배 | — |
| Mean TTFT | 146.9 ms | 74.7 ms | **49% 감소** | 42% 감소 |
| Mean ITL | 43.1 ms | 15.6 ms | **64% 감소** | 약간 개선 |
| Prefix Rep TPS | 1,131.2 | 2,839.5 | 2.51배 | 약 2.5배 |

설정 한 줄로 처리량이 2.74배가 됐다. 자료의 2.7배와 맞는다. TTFT가 절반으로 줄어든 것도 방향이 같다. Prefill에서 읽어야 할 가중치가 3분의 1이 되니 메모리 대역폭 병목이 풀린다.

### ITL은 자료와 어긋났다

자료는 ITL 개선이 미미할 것이라고 봤고 근거도 타당하다. Decode 단계에서 병목은 연산이 아니라 KV 캐시 읽기이므로 가중치를 양자화해도 이득이 작다. 그런데 측정값은 43.1ms에서 15.6ms로 64% 줄었다.

원인은 큐 대기다. FP16 기준선의 최대 동시성은 1.85x였고 벤치마크는 동시성 10으로 밀어 넣었다. 대기하는 요청의 토큰 간 간격에는 실제 생성 시간이 아니라 스케줄러에서 기다린 시간이 섞인다. AWQ에서 최대 동시성이 4.74x로 올라가자 그 대기가 사라졌다.

자료의 설명은 원리로는 맞다. 다만 메모리가 빡빡해서 배치가 제한된 구성에서는 큐 대기가 섞여 원리대로 측정되지 않는다. 자료의 실험은 A100 80GB에 Qwen3-32B였고 이 실습은 L40S 46GB에 14B였다. 같은 ITL 값도 arm의 최대 동시성이 다르면 다른 뜻이다.

### 빨라진 것은 연산이 아니다

양자화가 처리량을 올린 경로는 4비트로 계산하니 연산이 빨라졌다는 직관과 다르다.

```
AWQ INT4 적용
  → 가중치 27.52 GiB → 9.44 GiB
  → KV 캐시 11.57 → 29.63 GiB
  → 최대 동시성 1.85x → 4.74x
  → 배치가 촘촘해진다
  → GPU가 다음 배치를 기다리는 시간이 준다
  → 처리량 ↑
```

Nsight로 커널 단위를 보면 양자화 전후의 GEMM 커널 실행 시간은 거의 같고 줄어든 것은 `cudaEventSynchronize` 대기, 곧 GPU가 스케줄러에서 다음 일감을 받기까지 노는 시간이다.

양자화가 연산을 빠르게 한다고 믿으면 GPU 메모리가 넉넉한 환경에서도 같은 2.7배를 기대하게 된다. 하지만 메모리에 이미 여유가 있어 배치가 꽉 차 있다면 얻을 것이 거의 없다. 양자화의 효과 크기는 양자화 전에 배치가 얼마나 모자랐는지에 비례한다.

---

## 6. Step 7: 추가 튜닝

자료가 제시한 fine-tuned 설정을 그대로 적용했다.

```bash
vllm serve Qwen/Qwen3-14B-AWQ --disable-log-stats \
  --gpu-memory-utilization 0.95 \
  --max-model-len 1024 \
  --block-size 16 \
  --enable-prefix-caching \
  --max-num-seqs 8 \
  --max-num-batched-tokens 8192
```

기동 로그의 숫자는 좋아 보인다.

| | AWQ 기본 | AWQ tuned |
|---|---|---|
| KV 캐시 | 29.63 GiB (194,192 tok) | 31.02 GiB (203,264 tok) |
| 최대 동시성 | 4.74x | **198.50x** |

최대 동시성이 42배로 뛰었는데 실제 측정값은 반대였다.

| 지표 | AWQ 기본 | AWQ tuned | 변화 |
|---|---|---|---|
| Total TPS | 1,305.6 | 1,114.3 | **15% 감소** |
| Output TPS | 625.2 | 532.1 | 15% 감소 |
| Mean TTFT | 74.7 ms | **772.1 ms** | **10.3배 악화** |
| p99 TTFT | 180.6 ms | 2,587.6 ms | 14.3배 악화 |
| Mean ITL | 15.6 ms | 14.8 ms | 5% 개선 |
| Prefix Rep TPS | 2,839.5 | 2,445.8 | 14% 감소 |

`--max-num-seqs 8`이 원인이었다. 벤치마크가 동시성 10으로 요청을 보내는데 서버가 한 배치에 8개만 받으니 두 개는 매번 큐에서 기다린다. TTFT가 10배 나빠진 것이 그 대기다.

최대 동시성 198.50x는 착시다. 이 값은 `KV 토큰 수 ÷ 요청당 최대 컨텍스트`로 계산되는데 `--max-model-len 1024`가 분모를 40,960에서 1,024로 40배 줄였다. 담을 수 있는 요청 수가 늘어난 것은 사실이지만 실제로 한 번에 처리하는 요청 수는 `max-num-seqs`가 8로 묶는다. 기동 로그의 숫자는 실효 배치 폭과 다르다.

ITL만 5% 좋아진 것은 트레이드오프의 다른 쪽이다. 배치가 작으면 토큰당 생성은 빨라지고 대기와 처리량을 잃는다.

> **자료의 경고가 그대로 재현됐다**: 자료는 "특정 GPU와 워크로드에 완벽히 맞춘 설정은 다른 환경에서 오히려 성능이 떨어질 수 있다"고 적었다. `--max-num-seqs 8`은 부하가 8 이하인 환경에서 튜닝된 값으로 보이고 동시성 10 트래픽에서는 병목 그 자체가 됐다. `--max-model-len 1024`도 ShareGPT의 최대 프롬프트가 817 토큰이라 통과했을 뿐이다. 입력이 조금만 길어지면 요청이 거부된다.

이 실습에서 가장 좋은 구성은 AWQ 기본 설정이었고 설정을 더 얹은 쪽이 처리량에서 손해였다.

---

## 7. 도전과제: GPU 두 장을 어떻게 쓰는가

자료 9.4절은 수직 확장과 수평 확장을 비교하며 "p4d에서 4-GPU TP가 3,926 TPS, 4개 독립 인스턴스가 약 9,816 TPS"라는 숫자를 인용한다. 직접 재지는 않았다. 그래서 GPU 네 장 인스턴스에서 두 장만 써서 같은 질문을 측정했다.

### 측정 설계

모델은 `Qwen3-14B-AWQ`를 쓴다. 9.44 GiB이므로 L4 한 장(22 GiB 가용)에 올라가는데 이것이 replica 방식이 성립하는 전제다. 한 장에 안 들어가면 독립 서버를 둘 세울 수 없다.

| arm | 구성 | GPU | 무엇을 얻는가 |
|---|---|---|---|
| `single` | 1장 | 0 | 기준점 |
| `tp2` | `--tensor-parallel-size 2` | 0,1 | 지연 |
| `pp2` | `--pipeline-parallel-size 2` | 0,1 | 통신 절약 |
| `replica2_direct` | 독립 서버 2개, 라우터 없음 | 0 / 1 | 수평 확장 상한 |
| `replica2_rr` | 독립 서버 2개 + 라우터 round_robin | 0 / 1 | 라우터 경유 비용 |
| `replica2_cache` | 독립 서버 2개 + 라우터 cache_aware | 0 / 1 | 프리픽스 인식 이득 |

동시성 1·10·32에서 포화 부하(`--request-rate inf`)로 쟀고 Prefix Repetition은 동시성 10에서 한 번 더 봤다. Step 5·6은 SLA 관점이라 요청 속도를 제한했지만 여기서는 용량 상한이 질문이므로 제한을 걸지 않았다.

> **실제 확인**: g6.12xlarge의 GPU 네 장은 전부 `NODE`로 나온다. NVLink를 뜻하는 `NV#`가 없다. `NODE`는 PCIe 호스트 브리지 사이의 인터커넥트까지 거친다는 뜻으로, All-Reduce가 PCIe를 탄다. 이 전제에서 TP는 불리해야 한다.

```
        GPU0  GPU1  GPU2  GPU3
GPU0     X    NODE  NODE  NODE
GPU1    NODE   X    NODE  NODE
GPU2    NODE  NODE   X    NODE
GPU3    NODE  NODE  NODE   X

NODE = Connection traversing PCIe as well as the interconnect between PCIe Host Bridges within a NUMA node
```

### 결과

**Total TPS**

| arm | cc=1 | cc=10 | cc=32 | Prefix Rep cc=10 |
|---|---|---|---|---|
| `single` | 57.0 | 437.5 | 808.6 | 944.2 |
| `tp2` | 99.5 | **642.6** | **1,356.5** | **1,392.5** |
| `pp2` | 58.1 | 413.4 | 1,052.4 | 936.2 |
| `replica2_direct` | 125.8 | 490.5 | 1,198.0 | — |
| `replica2_rr` | 57.4 | 487.8 | 1,191.9 | 1,137.6 |
| `replica2_cache` | 57.1 | 454.9 | 1,000.0 | 1,121.5 |

**Mean TTFT (ms) / Mean ITL (ms)**

| arm | cc=10 | cc=32 |
|---|---|---|
| `single` | 235.0 / 42.9 | 514.7 / 68.9 |
| `tp2` | **160.8 / 29.5** | 175.7 / **41.6** |
| `pp2` | 176.8 / 46.1 | 176.8 / 56.6 |
| `replica2_direct` | 209.7 / 37.9 | 270.0 / 46.0 |
| `replica2_rr` | 213.4 / 38.2 | **228.1** / 45.3 |
| `replica2_cache` | 216.7 / 41.0 | 441.2 / 54.2 |

**KV 배치**

| arm | KV | 요청당 최대 동시성 |
|---|---|---|
| `single` | 9.10 GiB (59,632 tok) | 1.46x |
| `tp2` | 14.38 GiB (188,512 tok) | 4.60x |
| `pp2` | 14.04 GiB (184,000 tok) | 4.49x |
| `replica2_*` | 10.33 GiB × 2 (67,696 tok × 2) | 1.65x **각각** |

> **cc=1 두 값은 비교 대상이 아니다**: `replica2_direct`의 125.8은 두 엔드포인트에 각각 동시성 1로 부하를 걸어 합산한 값이라 실제로는 동시 요청 두 개다. 다른 arm의 cc=1은 한 개다. cc=10과 cc=32는 각 replica에 5와 16을 나눠 합계가 맞으므로 유효하다.

### TP가 전 구간에서 이겼다

NVLink가 없어 All-Reduce가 PCIe를 타므로 동시성이 오르면 통신이 아예 없는 replica 방식이 TP를 역전하는 지점이 있을 것으로 봤다.

교차점은 없었고 cc=32에서도 `tp2`가 1,356.5로 `replica2_rr` 1,191.9보다 14% 앞선다.

`tp2`는 두 장의 KV를 한 풀로 합쳐 14.38 GiB, 요청당 4.60x를 만든다. replica 방식은 KV 총량이 20.66 GiB로 더 크지만 요청 하나가 쓸 수 있는 것은 replica 한 몫인 10.33 GiB, 1.65x에 묶인다. ShareGPT처럼 긴 요청이 섞인 트래픽에서는 이 차이가 PCIe 통신 비용보다 크다.

Ch.7 5절에서 "저동시성 환경에서 TP의 실질적 최대 수확은 FLOPs가 아니라 KV 캐시 여유"라고 정리했는데 여기서 그 관찰이 더 분명하게 나왔다.

### 라우터 경유 비용은 1% 미만이다

| | cc=10 | cc=32 |
|---|---|---|
| `replica2_direct` | 490.5 | 1,198.0 |
| `replica2_rr` | 487.8 | 1,191.9 |
| 차이 | −0.6% | −0.5% |

프록시 한 단이 붙으면 TTFT가 눈에 띄게 늘 것으로 봤는데 그렇지 않았다. ITL도 37.9에서 38.2ms로 사실상 같다.

cc=32에서는 라우터를 거친 쪽이 오히려 나았다. TTFT가 270.0에서 228.1ms로 16% 낮다. replica 두 대의 KV가 균등하지 않았다. 서버 두 개를 순차로 띄우면 먼저 올라간 쪽이 메모리를 잡고 나중 쪽이 남은 것을 프로파일링해서 회차에 따라 9.10 GiB와 10.33 GiB로 나뉘는 일이 있었다. 라우터 없이 두 벤치 프로세스가 각자 고정된 replica에 절반씩 보내면 작은 쪽이 먼저 막히는데 round_robin은 요청 단위로 번갈아 보내니 부하가 자연히 섞인다.

### cache_aware는 오히려 나빴다

| | `round_robin` | `cache_aware` |
|---|---|---|
| cc=32 TPS | 1,191.9 | 1,000.0 (−16%) |
| cc=32 TTFT | 228.1 ms | 441.2 ms (+93%) |
| Prefix Rep TPS | 1,137.6 | 1,121.5 (−1.4%) |

프리픽스를 인식해 같은 프리픽스를 같은 replica로 보내면 그쪽 KV 캐시가 재사용되니 이득을 기대했지만 측정값은 나빠졌다. Prefix Repetition에서도 차이가 1.4%뿐이고 ShareGPT 고동시성에서는 크게 손해다.

replica당 요청 여유가 1.65x뿐인 것이 원인으로 보인다. 프리픽스 10종을 특정 replica로 몰면 그 replica가 곧 과부하가 되는데 캐시 히트로 버는 Prefill 시간보다 부하 편중으로 잃는 대기 시간이 크다. 캐시 인식 라우팅은 replica 각자에 여유가 충분할 때 값이 있다.

### PP는 예상대로였다

`pp2`는 cc=1에서 58.1로 `single` 57.0과 같다. 파이프라인 버블 때문에 GPU 두 장이 순차로 놀 뿐이다. ITL도 전 구간에서 가장 나쁘다(46.1 / 56.6 ms). Ch.7 5절의 "TP는 지연을 줄이고 PP는 못 줄인다"가 그대로 재확인됐다.

다만 cc=32에서는 1,052.4로 `single`의 1.30배가 나온다. 배치가 차면 버블이 메워지기 때문이다. PP는 한 장에 안 들어가는 모델을 올릴 때 쓴다.

### 선택 기준

| 상황 | 선택 |
|---|---|
| 모델이 한 장에 들어가고 GPU가 두 장 있다 | **TP=2.** 처리량과 지연 모두 최선 |
| 장애 격리나 독립 배포가 필요하다 | replica + round_robin. TP 대비 14% 손해가 대가 |
| 라우팅 정책을 고른다 | round_robin. cache_aware는 replica 여유가 클 때만 |
| 모델이 한 장에 안 들어간다 | TP를 먼저 보고, 노드를 넘어가야 하면 PP |

### 자료와 정반대로 나온 이유

자료는 이 대목을 "분산 서빙의 역설"이라 부르며 복제가 TP보다 처리량에서 세 배 가까이 유리할 수 있다고 정리한다. 근거는 p4d에서 4-GPU TP가 3,926 TPS인데 4개 독립 인스턴스가 약 9,816 TPS라는 비교인데 이 실습의 측정 결과는 반대였다.

| | 자료 (p4d) | 이 실습 (g6.12xlarge) |
|---|---|---|
| GPU | A100 8장 중 4장 | L4 4장 중 2장 |
| 인터커넥트 | NVLink | 없음 (PCIe / `NODE`) |
| 모델 | 1장에 넉넉히 | 1장에 빡빡하게 (KV 10.33 GiB) |
| 결론 | 복제 우세 | **TP 우세** |

인터커넥트 차이보다 모델이 GPU 한 장을 얼마나 채우는지가 결과를 좌우했다. 자료의 조건에서는 replica 하나가 이미 충분한 KV를 확보한다. 그러면 TP의 KV 통합 이득이 작고 All-Reduce 비용만 남으니 복제가 이긴다. 이 실습에서는 replica 하나의 요청당 여유가 1.65x뿐이라 KV를 합치는 것 자체가 가장 큰 소득이 됐다.

먼저 replica 하나가 목표 동시성을 감당하는지 본다. 감당한다면 복제가 유리하다. 감당하지 못한다면 KV를 합쳐야 하므로 TP가 유리하다. NVLink 유무는 그다음 문제다. "수평 확장이 대체로 유리하다"는 문장을 조건 없이 옮기면 이 실습 같은 구성에서 14%를 잃는다.

---

## 8. 실습 시 유의사항

### 플래그는 측정 전에 검증한다

vLLM 0.28.0에서 `--disable-log-requests`가 제거됐다. 이를 모르고 벤치마크를 걸면 세 arm이 전부 `unrecognized arguments`로 기동 직후 종료된다.

```bash
vllm serve --help=all > /tmp/h.txt
for F in disable-log-stats enable-prefix-caching max-num-seqs tensor-parallel-size; do
  printf '%-28s ' "--$F"; grep -q -- "--$F" /tmp/h.txt && echo OK || echo '없음'
done
```

0.28.0은 `--help`가 그룹 목록만 보여 준다. 개별 플래그를 확인하려면 `--help=all`이 필요하다.

### 결과 회수 경로를 먼저 확인한다

SSH 없이 SSM Session Manager만 쓰면 `send-command`의 출력이 24,000자에서 잘린다. 결과를 base64로 감싸 받으면 80KB tarball도 넘기지 못하고 잘린 자리의 문자 때문에 로컬에서 `Illegal character '-'`로 디코딩이 깨진다.

인스턴스 역할에 S3 쓰기 권한을 붙여 버킷을 경유하면 이 한계가 사라진다. 이번 실습은 119KB와 98KB tarball을 문제없이 받았다.

```bash
# 측정 전에 더미 파일로 왕복을 확인한다
head -c 300000 /dev/urandom | base64 > /tmp/probe.txt
aws s3 cp /tmp/probe.txt s3://<버킷>/probe.txt      # 인스턴스에서
aws s3 cp s3://<버킷>/probe.txt ./probe.txt          # 로컬에서
```

측정을 마지막까지 성공해도 회수가 깨지면 결과는 없다. 회수를 마지막 단계에 몰지 말고 arm 하나가 끝날 때마다 증분으로 상태를 기록하는 편이 안전하다.

### 완료 판정에 grep -c를 쓰지 않는다

`grep -c '마커' log` 는 0건일 때 종료 코드 1을 낸다. `|| echo 0`을 붙여 두면 grep이 찍은 `0`과 echo의 `0`이 겹쳐 출력이 `00`이 된다. `"00" != "0"`이 참이 되어 완료로 오판한다. 이 때문에 setup이 45초 만에 끝난 것으로 착각하고 아직 만들어지지 않은 venv로 벤치마크를 띄웠다.

```bash
# 위험
DONE=$(grep -c '준비 완료' setup.log 2>/dev/null || echo 0)

# 안전 — 카운트를 쓰지 않고 고정 토큰만 본다
if grep -q '준비 완료' setup.log; then ... ; fi
```

마커를 `tail -N`으로 찾는 것도 위험하다. 완료 마커 뒤에 여러 줄 JSON이 출력되면 마커가 밀려 영원히 발견되지 않는다. 파일 전체를 본다.

### 라이브러리 이름이 같아도 같은 프로젝트가 아니다

PyPI의 `vllm-router`는 vLLM production-stack 저장소의 `vllm_router` 모듈과 다른 프로젝트다. production-stack README를 읽고 그 인자를 PyPI 패키지에 쓰면 라우터가 즉시 죽는다.

| 항목 | production-stack 모듈 | PyPI `vllm-router` 0.1.15 |
|---|---|---|
| 백엔드 지정 | `--static-backends a,b` (쉼표) | `--worker-urls a b` (공백) |
| 정책 | `--routing-logic roundrobin` | `--policy round_robin` |
| 서비스 디스커버리 | `--service-discovery static` | 값을 받지 않는 boolean |

PyPI 쪽은 `random`·`round_robin`·`cache_aware`·`power_of_two`·`consistent_hash` 다섯 정책을 제공한다. 인자를 맞추면 K8s 없이 EC2 한 대에서 돌아가고 기동에 4초가 걸린다.

### GPU 인스턴스 용량은 시시각각 변한다

같은 타입을 두 시간 간격으로 띄웠는데 첫 회차는 us-east-2a에서 떴고 두 번째는 2a와 2b가 막혀 2c로 갔다. AZ를 순회하는 기동 스크립트가 있으면 이런 상황에서 시간을 버리지 않는다.

### 서버를 순차로 띄우면 replica 두 대의 KV 크기가 달라진다

회차에 따라 KV가 9.10 GiB와 10.33 GiB로 나뉘었다. 수평 확장에서 replica 용량이 다르면 균등 분배를 해도 작은 쪽이 먼저 막힌다. `--gpu-memory-utilization`을 명시해 양쪽을 맞춘다.

---

## 9. 마무리

**양자화가 가장 값싼 최적화였다.** 모델 이름에 `-AWQ`를 붙이는 것만으로 처리량이 2.74배가 됐다. 가중치가 3분의 1로 줄고 그만큼이 KV로 넘어가 배치가 커진 결과다.

자료가 제시한 fine-tuned 조합은 처리량을 15% 떨어뜨리고 TTFT를 10배 악화시켰다. `--max-num-seqs 8`이 동시성 10 트래픽에서 병목이 됐다. 기동 로그의 최대 동시성 198.50x는 `--max-model-len`이 분모를 줄여 만든 착시였고 실효 배치 폭은 8로 묶여 있었다.

지표는 병목과 함께 읽어야 한다. ITL이 64% 개선된 것은 큐 대기가 사라진 결과다. Decode 자체는 빨라지지 않았다. 최대 동시성이 1.85x인 arm에서 동시성 10으로 부하를 주면 지연 지표에 스케줄러 대기가 섞인다. 자료의 "ITL은 미미하게 개선"이라는 서술은 배치에 여유가 있는 조건을 전제한 것이었다.

**GPU 두 장은 TP로 묶는 쪽이 빨랐다.** NVLink가 없으니 불리할 것으로 봤는데 전 구간에서 이겼다. 두 장의 KV를 한 풀로 합치는 것이 PCIe 통신 비용보다 컸다. 수평 확장은 KV 총량이 더 크지만 요청 하나가 replica 한 몫에 갇힌다. 라우터 경유 비용은 1% 미만이라 걱정할 것이 아니었고 정작 손해를 낸 것은 캐시 인식 라우팅이었다.

시간의 상당 부분은 최적화가 아니라 도구 문제에 썼다. 8절에 그 목록을 적어 뒀다.

---

## 10. 참고 자료

- [Hands-On LLM Serving and Optimization](https://www.oreilly.com/library/view/hands-on-llm-serving/9798341621480/) — 9장
- [실습 코드 orca3/llm-model-inference/ch09](https://github.com/orca3/llm-model-inference/tree/main/ch09) — `inspect_dataset.py`, 노트북
- [vLLM: Benchmark CLI](https://docs.vllm.ai/en/latest/contributing/benchmarks/) — `vllm bench serve` 옵션
- [vLLM: Quantization AWQ](https://docs.vllm.ai/en/latest/features/quantization/auto_awq/) — AWQ 지원 범위
- [vLLM: Parallelism and Scaling](https://docs.vllm.ai/en/latest/serving/parallelism_scaling/) — TP/PP 조합
- [vLLM: Automatic Prefix Caching](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/) — 프리픽스 캐시 동작
- [vLLM production-stack](https://github.com/vllm-project/production-stack) — K8s 네이티브 라우터·스택
- [vllm-router (PyPI)](https://pypi.org/project/vllm-router/) — 독립 실행 라우터, 정책 5종
- [Qwen3-14B](https://huggingface.co/Qwen/Qwen3-14B) · [Qwen3-14B-AWQ](https://huggingface.co/Qwen/Qwen3-14B-AWQ)
