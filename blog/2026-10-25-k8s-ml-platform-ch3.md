---
layout: single
title: "쿠버네티스 위에 ML 플랫폼 토대 쌓기 - Docker부터 GitOps·모니터링까지"
comments: true
classes: wide
description: "Machine Learning Platform Engineering 3장을 Rancher Desktop의 k3s에서 직접 실습한다. Docker 이미지 빌드, 쿠버네티스 배포와 서비스, Helm, Argo CD GitOps, Prometheus·Grafana 모니터링을 하나의 앱으로 테스트 진행."
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: mlops/ml-platform-engineering-ch3
date: 2026-10-25
categories:
  - MLOps
tags:
  - MLOps
  - ML Platform
  - Kubernetes
  - Docker
  - GitOps
---

# 쿠버네티스 위에 ML 플랫폼 토대 쌓기 - Docker부터 GitOps·모니터링까지

> 해당 포스팅은 현재 재직 중인 회사와 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.
>
> **읽은 자료:** *Machine Learning Platform Engineering*(Manning, 2026) 3장 **실습 환경:** Rancher Desktop의 k3s(v1.36.2+k3s1, arm64), Docker 29.5.3, Helm v4. 모든 명령과 출력은 2026년 10월 25일 로컬에서 직접 확인했다.

[지난 글](https://ddii.dev/mlops/ml-platform-engineering-ch1-2/)에서 1~2장을 읽으며 "모델보다 비즈니스 문제가 먼저"이고, 머신러닝의 가치는 폐쇄 루프 안에서 나온다는 개념 뼈대를 정리했다. 3장은 그 이론을 **실제로 돌릴 수 있는 토대**로 옮긴다. 저자들의 표현대로, 여기서 다루는 Docker·쿠버네티스·CI/CD·모니터링은 머신러닝 전용 기술이 아니라 **대규모로 신뢰할 수 있는 머신러닝 시스템을 떠받치는 인프라**다.

이 글은 책의 흐름을 따라 **하나의 데모 앱**을 Docker 이미지로 만들고, 쿠버네티스에 올리고, Helm으로 패키징하고, Argo CD로 GitOps 배포를 하고, Prometheus·Grafana로 관측하는 과정을 직접 실행한 기록이다. 앱은 요청 수를 세어 `/metrics`로 노출하는 작은 Go HTTP 서버다. 모니터링 단계에서 이 커스텀 지표가 Prometheus까지 흘러가는 것을 눈으로 확인하기 위해 골랐다.

<!--truncate-->

***

| 단계 | 책의 절 | 이 글에서 확인하는 것 |
| --- | --- | --- |
| Docker | 3.2 | 멀티스테이지 빌드로 작은 이미지를 만들고 로컬에서 띄운다 |
| 쿠버네티스 | 3.3 | Deployment·Service로 배포하고 서비스 디스커버리와 로드밸런싱을 본다 |
| Helm | 3.3.6 | 같은 앱을 차트로 패키징해 릴리스로 설치한다 |
| CI/CD(GitOps) | 3.4 | Argo CD가 Git 선언을 클러스터에 동기화하고 드리프트를 복구한다 |
| 모니터링 | 3.5 | Prometheus가 커스텀 지표를 수집하고 Grafana가 시각화한다 |

책은 로컬 쿠버네티스로 k3s를 쓴다. 나는 Rancher Desktop이 띄워 주는 k3s를 그대로 썼다. 먼저 클러스터가 살아 있는지 확인한다.

```
$ kubectl get nodes -o wide
NAME                   STATUS   ROLES           AGE   VERSION        CONTAINER-RUNTIME
lima-rancher-desktop   Ready    control-plane   ...   v1.36.2+k3s1   docker://29.5.3
```

노드 하나짜리 control-plane이고 런타임은 Docker다. 이 "Docker 런타임 + k3s" 조합이 뒤에서 이미지를 다룰 때 중요한 전제가 된다.

3장이 가장 먼저 다루는 건 컨테이너화다. 모델이든 API든, 어디서나 같게 돌게 하려면 코드와 실행 환경을 하나의 이미지로 묶어야 한다. 데모 앱은 요청마다 카운터를 올리고 세 엔드포인트를 제공한다.

- `/` - JSON 응답(어느 Pod가 처리했는지 호스트명 포함)
- `/healthz` - 레디니스 프로브용
- `/metrics` - Prometheus 텍스트 포맷 지표(`app_requests_total`)

핵심은 Dockerfile을 **멀티스테이지**로 짜는 것이다. 빌드 단계에서 Go 바이너리를 만들고, 실행 단계에는 그 바이너리만 복사한다. 그러면 최종 이미지에 컴파일러가 남지 않아 작고 공격 표면도 줄어든다.

```
# 빌드 단계
FROM golang:1.23-alpine AS build
WORKDIR /src
COPY main.go .
RUN go mod init demo && CGO_ENABLED=0 go build -o /out/server main.go
# 실행 단계 - 바이너리만 복사
FROM alpine:3.20
RUN adduser -D -u 10001 appuser
COPY --from=build /out/server /usr/local/bin/server
USER appuser
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/server"]
```

빌드하고 이미지 크기를 확인한다.

```
$ docker build -t ch3-demo:1.0 .
$ docker image inspect ch3-demo:1.0 --format 'tags={{.RepoTags}} bytes={{.Size}}'
tags=[ch3-demo:1.0] bytes=8248827
```

약 8.2MB다. 멀티스테이지가 아니었다면 Go 툴체인까지 포함돼 수백 MB가 됐을 것이다. 로컬에서 띄워 엔드포인트를 확인한다.

```
$ docker run --rm -p 18080:8080 ch3-demo:1.0
$ curl -s localhost:18080/
{"message":"hello from ml platform ch3","pod":"fd4263d5b35b","requests":1,...}
$ curl -s localhost:18080/
{"message":"hello from ml platform ch3","pod":"fd4263d5b35b","requests":2,...}
$ curl -s localhost:18080/metrics
# HELP app_requests_total Total HTTP requests served.
# TYPE app_requests_total counter
app_requests_total 2
```

호출할 때마다 `requests`가 올라가고, 같은 값이 `/metrics`에도 반영된다. 이 카운터가 뒤 모니터링 단계의 주인공이다.

이미지가 생겼으니 쿠버네티스에 올린다. 두 가지 오브젝트가 핵심이다. **Deployment**는 "이 이미지를 몇 개 복제로 유지하라"는 선언이고, **Service**는 그 Pod들에 **안정적인 이름과 로드밸런싱**을 붙인다.

Rancher Desktop의 k3s는 런타임이 Docker라 로컬에서 빌드한 이미지를 노드가 이미 들고 있다. 그래서 레지스트리에 푸시하지 않고 `imagePullPolicy: Never`로 바로 쓸 수 있다.

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ch3-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ch3-demo
  template:
    metadata:
      labels:
        app: ch3-demo
    spec:
      containers:
        - name: ch3-demo
          image: ch3-demo:1.0
          imagePullPolicy: Never    # 로컬 이미지 그대로 사용
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: ch3-demo
spec:
  selector:
    app: ch3-demo
  ports:
    - name: http
      port: 80
      targetPort: 8080
```

배포하면 Pod 두 개가 뜬다.

```
$ kubectl apply -f k8s/deployment.yaml
deployment.apps/ch3-demo created
service/ch3-demo created
$ kubectl get pods -l app=ch3-demo
NAME                        READY   STATUS    RESTARTS   AGE
ch3-demo-744c85bb9f-jt2k7   1/1     Running   0          7s
ch3-demo-744c85bb9f-jtmdx   1/1     Running   0          7s
```

이제 Service의 역할을 확인한다. 클러스터 안에서 `ch3-demo.default.svc.cluster.local`로 여러 번 요청을 보내면 두 Pod에 번갈아 분산된다.

```
$ kubectl run curl-test --image=curlimages/curl --rm -i -- \
    sh -c 'for i in 1 2 3 4; do curl -s http://ch3-demo.default.svc.cluster.local/; echo; done'
{"...","pod":"ch3-demo-744c85bb9f-jtmdx","requests":3,...}
{"...","pod":"ch3-demo-744c85bb9f-jt2k7","requests":2,...}
{"...","pod":"ch3-demo-744c85bb9f-jt2k7","requests":3,...}
{"...","pod":"ch3-demo-744c85bb9f-jtmdx","requests":4,...}
```

응답의 `pod` 값이 두 Pod를 오가고, 각 Pod가 자기만의 카운터를 들고 있어 값이 따로 올라간다. 이게 Service가 제공하는 **서비스 디스커버리 + 로드밸런싱**이다. 클라이언트는 개별 Pod IP를 몰라도 서비스 이름 하나로 안정적으로 접근한다.

매니페스트를 손으로 관리하면 환경마다 복붙이 늘어난다. Helm은 같은 매니페스트를 **템플릿 + 값(values)**으로 분리해, 하나의 차트로 여러 환경에 설치하게 해 준다. 데모 앱을 최소 차트로 패키징했다.

```
charts/ch3-demo/
├── Chart.yaml
├── values.yaml
└── templates/
    └── deployment.yaml
```

`values.yaml`에 복제 수와 이미지를 빼 두고, 템플릿은 `{{ .Values.replicaCount }}`처럼 참조한다. lint로 문법을 확인하고 릴리스로 설치한다.

```
$ helm lint charts/ch3-demo
1 chart(s) linted, 0 chart(s) failed
$ helm install demo charts/ch3-demo
NAME: demo
STATUS: deployed
REVISION: 1
$ helm list
NAME   STATUS     CHART            APP VERSION
demo   deployed   ch3-demo-0.1.0   1.0
```

같은 앱이지만 이제 `demo`라는 **릴리스**로 관리된다. `helm upgrade`로 버전을 올리고 `helm rollback`으로 되돌릴 수 있다는 점이, 1~2장에서 강조한 **버전 관리와 롤백** 개념이 배포 계층에서 구체화되는 지점이다.

3장의 CI/CD 절은 깃랩 CI와 Argo CD를 다룬다. 이 글에서는 GitOps의 핵심인 **Argo CD**에 집중했다. GitOps의 발상은 간단하다. **클러스터의 원하는 상태를 Git에 선언**해 두면, Argo CD가 실제 클러스터를 그 선언과 계속 일치시킨다. 사람이 `kubectl apply`를 직접 치는 게 아니라, Git이 단일 진실 공급원이 된다.

Argo CD를 설치한다. 공식 매니페스트는 CRD에 붙은 어노테이션 용량이 커서 일반 `apply`가 크기 한도에 걸리므로 `--server-side`로 적용한다(실습 중 실제로 겪은 함정이다).

```
$ kubectl create namespace argocd
$ kubectl apply --server-side -n argocd \
    -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
$ kubectl get pods -n argocd
argocd-application-controller-0       1/1   Running
argocd-applicationset-controller-...  1/1   Running
argocd-repo-server-...                1/1   Running
argocd-server-...                     1/1   Running
...
```

이제 **Application**을 선언한다. "이 Git 저장소의 이 경로에 있는 매니페스트를 이 네임스페이스에 동기화하라"는 뜻이다. 공식 예제인 guestbook을 썼다.

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git
    targetRevision: HEAD
    path: guestbook
  destination:
    server: https://kubernetes.default.svc
    namespace: guestbook
  syncPolicy:
    automated:
      prune: true
      selfHeal: true      # 수동 변경을 Git 상태로 되돌린다
    syncOptions:
      - CreateNamespace=true
```

적용하면 Argo CD가 Git에서 매니페스트를 읽어 알아서 배포한다. 내가 `kubectl apply`로 guestbook을 만든 적이 없는데도 리소스가 생긴다.

```
$ kubectl apply -f argocd/guestbook-app.yaml
application.argoproj.io/guestbook created
$ kubectl get application guestbook -n argocd
NAME        SYNC     HEALTH
guestbook   Synced   Healthy
```

GitOps의 진가는 **self-heal**에서 드러난다. 누군가 클러스터를 손으로 바꾸면 Argo CD가 Git 선언으로 되돌린다. 일부러 복제 수를 3으로 올려 봤다.

```
$ kubectl scale deploy/guestbook-ui -n guestbook --replicas=3
$ kubectl get deploy guestbook-ui -n guestbook -o custom-columns='DESIRED:.spec.replicas'
DESIRED
3
# 몇 초 뒤 Argo CD가 Git 상태(1)로 되돌림
$ kubectl get deploy guestbook-ui -n guestbook -o custom-columns='DESIRED:.spec.replicas'
DESIRED
1
```

수동 변경이 15초 안에 사라지고 Git에 적힌 1로 복구됐다. 운영 환경에서 "누가 언제 무엇을 바꿨는지 모르는" 드리프트를 막는 장치다. 이는 1~2장의 **리니지·재현성** 원칙이 배포 계층으로 확장된 모습이기도 하다. Git 커밋이 곧 배포의 출처 기록이 된다.

깃랩 CI 같은 CI 파이프라인은 이 그림의 앞단에 붙는다. 코드가 바뀌면 CI가 이미지를 빌드·푸시하고 매니페스트의 태그를 갱신해 Git에 커밋한다. 그 뒤는 Argo CD가 맡는다. CI는 **빌드**를, CD(GitOps)는 **실제 상태를 선언에 맞추는 일**을 담당하는 분업이다.

2장에서 "정상 응답과 좋은 예측은 다르다"고 했다. 배포가 끝이 아니라면, 돌아가는 시스템을 **관측**할 수단이 필요하다. 3장 마지막은 Prometheus(지표 수집)와 Grafana(시각화)를 세운다. Helm 차트 `kube-prometheus-stack` 하나로 둘과 익스포터들을 한 번에 설치한다.

```
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
$ helm install kps prometheus-community/kube-prometheus-stack -n monitoring \
    --set grafana.adminPassword=admin
$ kubectl get pods -n monitoring
kps-grafana-...                              3/3   Running
kps-kube-prometheus-stack-operator-...       1/1   Running
kps-kube-state-metrics-...                   1/1   Running
kps-prometheus-node-exporter-...             1/1   Running
prometheus-kps-kube-prometheus-stack-...-0   2/2   Running
```

이제 아까 만든 데모 앱의 `/metrics`를 Prometheus가 수집하게 한다. 연결 고리는 **ServiceMonitor**다. "이 라벨을 가진 Service의 이 포트, 이 경로를 주기적으로 수집하라"는 선언이다.

```
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: ch3-demo
  namespace: monitoring
  labels:
    release: kps          # 이 스택의 Prometheus가 선택하는 라벨
spec:
  namespaceSelector:
    matchNames: [default]
  selector:
    matchLabels:
      app: demo
  endpoints:
    - port: http
      path: /metrics
      interval: 15s
```

적용하면 Prometheus가 데모 앱의 두 Pod를 타깃으로 발견하고, 첫 스크레이프 뒤 `up` 상태가 된다. 데모 앱에 트래픽을 좀 보낸 뒤 Prometheus API로 커스텀 지표를 조회했다.

```
# 타깃 상태
pod=demo-5bd4c96ffd-9vbbk  health=up
pod=demo-5bd4c96ffd-25knq  health=up
# app_requests_total 쿼리 결과
pod=demo-5bd4c96ffd-25knq  value=3
pod=demo-5bd4c96ffd-9vbbk  value=7
```

Docker 단계에서 봤던 `app_requests_total`이 Pod별로 수집됐다. 값이 Pod마다 다른 건 앞에서 본 로드밸런싱 때문이다. Grafana도 확인했다. 데이터소스가 자동으로 Prometheus에 연결돼 있었다.

```
$ curl -s http://localhost:3000/api/health
{"database":"ok","version":"13.2.4"}
$ curl -s -u admin:admin http://localhost:3000/api/datasources
Prometheus   -> prometheus   http://kps-...-prometheus.monitoring:9090/
Alertmanager -> alertmanager http://kps-...-alertmanager.monitoring:9093/
```

여기까지 오면 앱의 커스텀 지표가 **코드 → 컨테이너 → 쿠버네티스 Service → ServiceMonitor → Prometheus → Grafana**로 한 줄로 이어진다. 2장에서 말한 데이터·성능·오류 모니터링을 실제로 올리려면 바로 이 파이프라인 위에 대시보드와 알림을 얹으면 된다.

3장을 직접 돌려 보니, 책이 왜 머신러닝을 다루기 전에 인프라 한 장을 통째로 할애하는지 분명해졌다. 1~2장이 세운 개념들은 전부 이 토대 위에서 실현된다.

- **버전 관리와 롤백**(1장)은 Helm 릴리스와 이미지 태그로 구체화된다.
- **리니지와 재현성**(2장)은 GitOps에서 "Git 커밋이 곧 배포의 출처"라는 형태로 나타난다.
- **"배포는 끝이 아니다"**(2장)는 Prometheus·Grafana 관측 파이프라인으로 이어진다.

바꿔 말하면, 이 장의 Docker·쿠버네티스·Argo CD·Prometheus는 머신러닝 플랫폼을 위한 **공통 기반**이다. 다음 장부터 올라갈 MLflow(실험 추적), Feast(피처 스토어), Kubeflow(파이프라인)는 모두 이 쿠버네티스 위에 설치된다. 토대가 탄탄해야 그 위의 머신러닝 전용 컴포넌트가 안정적으로 돈다.

실습에 쓴 리소스(데모 앱, Argo CD, 모니터링 스택)는 `helm uninstall`과 `kubectl delete namespace`로 깔끔히 정리할 수 있다. 다음 글에서는 이 클러스터 위에 4장의 MLflow와 Feast를 올려 볼 생각이다.

- *Machine Learning Platform Engineering: Build an internal developer platform for ML and AI systems*, Benjamin Tan Wei Hao·Shanoop Padmanabhan·Varun Mallya (Manning, 2026), 3장
- [Argo CD 공식 문서](https://argo-cd.readthedocs.io/)
- [kube-prometheus-stack 차트](https://github.com/prometheus-community/helm-charts)
