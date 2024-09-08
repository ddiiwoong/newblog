---
layout: single
title: "prometheus grafana 스택으로 k6 테스트 결과 확인하기"
comments: true
classes: wide
description: "k6으로 진행한 부하 테스트 결과를 remote write 형태로 prometheus에 전달하고 grafana 대시보드로 확인하는 방법을 알아본다."
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/k6-prometheus/
date: 2023-04-08
categories:
  - Kubernetes
tags:
  - Kubernetes
  - grafana
  - loadtest
  - prometheus
  - performance test
  - k6
---

애플리케이션의 부하 테스트를 k6를 이용하여 진행하고 결과를 prometheus 및 grafana로 전달하여 확인하는 방법을 작성한다.

## k6

https://github.com/grafana/k6

k6는 오픈소스 부하테스트 도구로, Go와 자바스크립트를 이용해 성능 테스트를 할 수 있는 도구이다. k6은 다양한 프로토콜(HTTP, WebSocket 등)을 지원하며, 설치와 사용이 매우 간편하다. 이전에 k6 테스트를 작성해 본 적이 없다면 [Running k6](https://k6.io/docs/getting-started/running-k6)를 확인하고 작동 방식을 파악하는 것부터 시작하는 것이 좋다. 또한, 친철하게 한글로 설명되어 있는 tutorial 링크도 참조한다.

[https://github.com/schooldevops/k6-tutorials/blob/main/GettingStarts/01_intro_install.md](https://github.com/schooldevops/k6-tutorials/blob/main/GettingStarts/01_intro_install.md)

<!--truncate-->

## Prometheus Stack

지난번 구성했던 것도 동일하게 kube-prometheus-stack을 설치한다. 

[kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)은 Kubernetes 클러스터 내에서 Prometheus와 Grafana를 사용하여 모니터링을 구성하는 데 사용되는 편리한 차트이다. 

```sh
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

$ helm install -n monitoring kube-prometheus-stack prometheus-community/kube-prometheus-stack
```

Prometheus remote write 출력을 통해 k6는 테스트 결과 메트릭을 Prometheus remote write 엔드포인트로 전송할 수 있다. 뒤에 진행할 k6에서 Prometheus 쪽으로 메트릭을 전달하기 위해서는 두가지 기능(flag)인 [Remote Write Receiver](https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver)와 [Native Histograms](https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms)을 활성화 해야한다.

- [Remote Write Receiver](https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver): remote write 활성화
- [Native Histograms](https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms): 고해상도 히스토그램을 위한 기능 활성화 (experimental)

두가지 flag를 활성화 하기 위해 위에 설치한 `kube-prometheus-stack` 차트에 위 두가지 기능을 추가하여 다시 배포한다.

```yaml
prometheus:
  serviceMonitor:
    enableFeatures: 
    - remote-write-receiver
    - native-histograms
```

```
$ helm upgrade -n monitoring kube-prometheus-stack prometheus-community/kube-prometheus-stack -f value.yaml
```

## k6-operator 설치 및 구성

쿠버네티스에서 k6를 구성하는 방법은 직접 k6 바이너리를 컨테이너로 빌드해서 사용할 수도 있고 단일 인스턴스에서 실행하는 방법도 있지만 쿠버네티스 기반으로 동작하고 여러 인스턴스에서 동시에 부하 테스트를 진행하려는 요구사항이 있을 경우에는 k6-operator 로 구성하는 것을 추천한다.

https://github.com/grafana/k6-operator

기본적으로 바이너리 및 플러그인 빌드를 하고 배포하는 형태를 취하다 보니 [`Go`](https://golang.org/doc/install), [`Kustomize`](https://github.com/kubernetes-sigs/kustomize/), [`Kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/), `Make` 등이 설치되어 있어야 한다. 

설치 명령은 `MacOs` 기준으로 설명한다. 일단 레포지토리를 로컬로 가져오고 나서 `make deploy` 명령을 수행하면 operator 구성이 완료된다. 

```
$ git clone https://github.com/grafana/k6-operator && cd k6-operator
$ make deploy
```
## k6 스크립트 작성

아직 테스트 인스턴스 구성이 되어 있지 않기 때문에 테스트를 첫 단계 진행할 스크립트를 작성한다.  

```js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { target: 200, duration: '30s' },
    { target: 0, duration: '30s' },
  ],
};

export default function () {
  const result = http.get('https://test-api.k6.io/public/crocodiles/');
  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
```

스크립트를 살펴보면서 각각 30초 동안 실행되는 두 단계를 설정했다. 첫 번째 단계는 30초 동안 200 virtual users(이하 VUs)까지 선형적으로 증가시킨다. 두 번째 단계에서는 30초에 걸쳐 다시 VUs를 0으로 감소시킨다. function() 에서는 테스트를 진행할 URL에 대해 HTTP GET 요청을 실행하고 HTTP 상태 200으로 응답하는지 확인한다.

```sh
k6 run scripts.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: scripts.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m30s max duration (incl. graceful stop):
           * default: Up to 200 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ http response status code is 200

     checks.........................: 100.00% ✓ 2893      ✗ 0
     data_received..................: 3.5 MB  58 kB/s
     data_sent......................: 416 kB  6.9 kB/s
     http_req_blocked...............: avg=49.33ms min=1µs      med=3µs   max=3.45s    p(90)=16µs    p(95)=377.18ms
     http_req_connecting............: avg=13.09ms min=0s       med=0s    max=199.77ms p(90)=0s      p(95)=186.36ms
     http_req_duration..............: avg=2.14s   min=190.5ms  med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s
       { expected_response:true }...: avg=2.14s   min=190.5ms  med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s
     http_req_failed................: 0.00%   ✓ 0         ✗ 2893
     http_req_receiving.............: avg=81.97µs min=19µs     med=61µs  max=2.43ms   p(90)=141.8µs p(95)=205.4µs
     http_req_sending...............: avg=22.37µs min=5µs      med=16µs  max=687µs    p(90)=38µs    p(95)=57µs
     http_req_tls_handshaking.......: avg=36.2ms  min=0s       med=0s    max=3.2s     p(90)=0s      p(95)=190.18ms
     http_req_waiting...............: avg=2.14s   min=190.38ms med=1.32s max=5.79s    p(90)=5.39s   p(95)=5.57s
     http_reqs......................: 2893    48.176768/s
     iteration_duration.............: avg=2.19s   min=190.7ms  med=1.39s max=6.05s    p(90)=5.4s    p(95)=5.58s
     iterations.....................: 2893    48.176768/s
     vus............................: 1       min=1       max=200
     vus_max........................: 200     min=200     max=200


running (1m00.0s), 000/200 VUs, 2893 complete and 0 interrupted iterations
default ✓ [======================================] 000/200 VUs  1m0s
```

## k6 스크립트 컨피그맵 생성

테스트 스크립트가 정상적으로 완료되었는 확인한 뒤 쿠버네티스 클러스터에 먼저 컨피그맵을 생성한다. 이름은 이후 k6 runner 파드에서 사용하는 컨피그맵을 참조하도록 식별할 수 있는 값(예시에서는 `test-script`)으로 지정한다. 

```sh
$ kubectl create configmap test-script --from-file /home/ec2-user/environment/k6/scritps.js 
configmap/test-script created
```

### k6 prometheus 이미지 빌드

기본적으로 k6-operator는 테스트 작업의 컨테이너 이미지로 `grafana/k6:latest`를 사용한다. xk6로 빌드된 확장을 사용하려면 자체 이미지를 생성하고 k6 쿠버네티스 배포 리소스에서 이미지 속성을 바꿔서 배포해야 한다. 다음 Dockerfile을 사용하여 https://github.com/grafana/xk6-output-prometheus-remote 로 빌드한 컨테이너 이미지를 생성할 수 있다.


```dockerfile
# Build the k6 binary with the extension
FROM golang:1.18.1 as builder

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --output /k6 --with github.com/grafana/xk6-output-prometheus-remote@latest

# Use the operator's base image and override the k6 binary
FROM grafana/k6:latest
COPY --from=builder /k6 /usr/bin/k6
```

```sh
$ docker build -t k6-prometheus:v1 .
```

빌드한 이미지를 원하는 레지스트리에 push하고 image 경로를 기록해 놓는다.

## k6 리소스 생성

생성이 되고 나면 `k6` 커스텀 리소스(CRD)를 동일한 네임스페이스에 만든다. 부하 테스트에 필요한 내용들을 포함하고 있다.

- `arguments: -o xk6-prometheus-rw --tag testid=alb`
  - Prometheus의 실행인자로 위에서 빌드한 이미지의 옵션 값, `tag`의 경우 그라파나 대시보드에 구분자로 사용할 값
- `K6_PROMETHEUS_RW_SERVER_URL`
  - remote write endpoint로 위에 구성한 prometheus endpoint를 기재
- `K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM`
  - 고해상도 히스토그램 형태의 데이터를 보내기 위한 환경 변수 값 (기본값: false)
- `image: k6-prometheus:v1`
  - 위에서 빌드한 Prometheus remote write 기능이 포함된 이미지 레지스트리 경로를 입력
- `configMap`
  - 컨피그맵으로 등록한 부하 스크립트

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-sample
spec:
  arguments: -o xk6-prometheus-rw --tag testid=test
  parallelism: 1
  runner:
    env:
    - name: K6_PROMETHEUS_RW_SERVER_URL
      value: http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/write
    - name: K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM
      value: "true"
    image: k6-prometheus:v1
  script:
    configMap:
      file: scritps.js
      name: test-script
```

클러스터에서 두 개 이상의 테스트 스크립트를 사용하려면 각 스크립트에 대해 이 프로세스를 반복하여 맵에 다른 이름을 지정하면 된다. k6 리소스를 배포하게 되면 이제부터 배포 테스트 결과 메트릭 값이 프로메테우스로 바로 전달이 된다.  

## Grafana 대시보드 등록

[`18030` grafana 대시보드](https://grafana.com/grafana/dashboards/18030-test-result/)를 import 하면 다음 그림과 같은 대시보드를 통해 현재 리퀘스트 현황(성공, 실패), 지연시간, 데이터 전송량, VUs 등을 최대 프로메테우스가 수집 최대 주기 기준의 준 실시간 수준으로 확인이 가능하다.

![dashboard](/img/k6-dashboard.png)

## 정리

이번 4주차 스터디에는 Grafana가 포함된 Prometheus Stack에 k6 테스트 결과 메트릭을 전달하고, 대시보드로 확인하는 방법을 정리했다. 이번 글에서는 다루지 않았지만 k6는 브라우저에 녹화된 스크립트 기반으로 테스트가 가능하기 때문에 다양한 시나리오로 테스트를 만족스럽게 진행할 수 있었다. locust라는 강력한 오픈소스 기반 부하 테스트 도구도 있지만 이번 글과 같이 다양한 플러그인을 직접 빌드하고 연동하여 사용할 수 있다는 점이 조금 더 매력적으로 다가왔다. 

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 자료로 활용할 예정입니다.
