---
layout: single
title: "Istio Ambient Mode on K3d"
comments: true
classes: wide
description: "K3d 클러스터에서 Istio Ambient 모드 구성"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/istio-ambient
date: 2024-10-20
categories:
  - Kubernetes
tags:
  - Istio
  - Ambient
  - Service-Mesh
  - Sidecarless
---

# Istio Ambient 모드에서 telemetry 분석

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

이번 포스팅의 목적은 K3d 클러스터에 Istio Ambient 모드를 구성하고 기본 개념을 이해하는 것이다.

<!--truncate-->

## Istio Ambient Mesh

![https://istio.io/latest/blog/2022/introducing-ambient-mesh/traditional-istio.png](https://istio.io/latest/blog/2022/introducing-ambient-mesh/traditional-istio.png)

위 그림처럼 Istio의 기본 구성으로 동작하는 사이드카(`sidecar`) 방식는 애플리케이션을 직접 리팩토링에 하는 것에 비해 상당한 이점이 있지만, 애플리케이션과 Istio 데이터 플레인을 완벽하게 분리하지는 못한다. 사이드카를 애플리케이션에 `inject`하려면 해당 Kubernetes 파드 스펙을 수정하고 파드 내에서 트래픽을 리디렉션(Redirect)해야 한다. 따라서 사이드카를 설치하거나 업그레이드하려면 애플리케이션 파드를 다시 시작해야 하므로 워크로드에 지장을 줄 수 있다. 그리고, 사이드카 프록시는 관련 워크로드 전용이므로 각 개별 파드의 사용량에 대비하여 CPU 및 메모리 리소스를 프로비저닝해야 한다. 이로 인해 대규모 리소스 예약(reservation)이 추가되어 클러스터 전체에서 리소스 활용도가 낮아질 수 있다. 일반적으로 Istio의 사이드카가 수행하는 트래픽 캡처 및 HTTP 처리는 계산 비용이 많이 발생하기도 하며 표준 형태가 아닌 HTTP 구현을 사용하는 일부 애플리케이션을 중단시킬 수 있다.

`Istio`는 기존에 사이드카를 사용하여 모든 데이터 플레인 기능을 구현했지만, 이는 모든 기능을 사용해야 하는 부담이 있었다. Istio는 각 파드에 사이드카를 배포하지 않도록 허용하는 `Ambient` 기능을 22년에 소개했다. Ambient 모드에서 Istio는 CNI 역할을 하며 파드에서 들어오고 나가는 네트워크 트래픽을 가로채 여러가지 규칙을 적용하게 된다. Istio의 기능을 두 개의 계층으로 분리하여 필요에 따라 기능을 선택적으로 사용할 수 있도록 한다. 이를 통해 사용자는 Istio를 점진적으로 도입하고, 필요에 따라 보안 오버레이(overlay) 네트워크에서 L7 처리 방식으로 전환할 수 있다. `보안 오버레이`라는 용어는 ztunnel 프록시를 통해 Ambient 메시에서 구현되는 일련의 L4 네트워킹 기능을 총칭하여 설명하는 데 사용된다. 사이드카의 수를 줄여 각 요청에 대한 L7 처리 단계 수를 줄임으로써 리소스 소비(CPU, 메모리)를 줄이고 Istio의 성능을 향상시키는 것이 주요 목적이다.

![https://istio.io/latest/blog/2022/introducing-ambient-mesh/ambient-secure-overlay.png](https://istio.io/latest/blog/2022/introducing-ambient-mesh/ambient-secure-overlay.png)

### Ztunnel

Ambient 메시는 쿠버네티스 클러스터의 각 노드에 배포되어 실행되는 데몬셋 기반의 공유 에이전트인 `Ztunnel`을 사용한다. Ztunnel은 Ambient 메시에서 노드 프록시를 구현하기 위한 목적으로 기능 세트를 최소로하여 Ambient에 필요한 최소한의 요구 사항만 구현하는 것이다. ztunnel 프록시는 Rust로 작성되었으며 mTLS, 인증, L4 권한 부여, 원격 측정과 같은 L3 및 L4 기능을 처리하도록 의도적으로 범위가 설정되어 있다. ztunnel은 L3 및 L4 트래픽이 워크로드, 다른 ztunnel 프록시 또는 웨이포인트 프록시로 직접 효율적이고 안전하게 전송되도록 보장한다.

[ztunnel의 범위를 명시적으로 벗어난 기능](https://github.com/istio/ztunnel?tab=readme-ov-file#feature-scope)은 다음과 같다.

- 사용자 HTTP 트래픽 종료
- 반복할 가치가 있는 사용자 HTTP 트래픽 종료
- `ext_authz`, WASM, 연동 확장(linked-in extensions), Lua 등과 같은 일반적인 확장성

일반적으로 ztunnel은 일반적인 확장성 프록시를 목표로 하지 않으며, 이러한 작업에는 `Envoy`가 더 적합하다. 

전송 계층에서는 [HBONE](https://istio.io/latest/docs/ambient/architecture/hbone/)이라는 HTTP CONNECT 기반 트래픽 터널링 프로토콜을 통해 구현된다.

### Waypoint Proxy

![https://istio.io/latest/blog/2022/introducing-ambient-mesh/ambient-waypoint.png](https://istio.io/latest/blog/2022/introducing-ambient-mesh/ambient-waypoint.png)

위에서 이야기했듯이 L7 처리는 ztunnel에서 구현되지 않고 별도의 `Waypoint Proxy` 파드를 통해 진행된다. `Waypoint Proxy`는 사이드카 데이터 플레인 모드에 사용하는 것과 동일한 엔진인 Envoy 프록시를 사용한다. `Waypoint Proxy`는 애플리케이션 파드 외부에서 독립적으로 설치, 실행, 업그레이드 된다. 앰비언트 모드에서 Istio의 일부 사용 사례는 L4 보안 오버레이 기능만으로 해결될 수 있으며, L7 기능이 필요하지 않으므로 `Waypoint Proxy`를 배포할 필요가 없다. 고급 트래픽 관리 및 L7 네트워킹 기능이 필요한 경우는 `Waypoint Proxy` 배포가 필요하다.


## Install Istio Ambient

간단하게 Istio Ambient 테스트를 진행하기 위해서 K3d 클러스터에서 ArgoCD를 사용하여 샘플 애플리케이션 배포를 진행한다. 최종적으로 구성하고자 하는 그림은 다음과 같이 4개의 노드에 각 컴포넌트를 배치하는 것이다. (그림 출처: https://istio.io/latest/blog/2023/traffic-for-ambient-and-sidecar/)

![demo](https://istio.io/latest/blog/2023/traffic-for-ambient-and-sidecar/sidecar-to-ambient.png)

### Prerequisites

- [K3d Cluster](https://k3d.io/) 4 nodes(agents)
- kubectl
- [ArgoCD](https://github.com/argoproj/argo-cd/releases) Non-HA
- Docker 또는 Rancher Desktop

### K3d 기반 Istion Ambient 설치

`k3d`는 기본적으로 `Treaefik` 프록시를 설치하게 되어 있지만  Istio는 자체적으로 Ingress Gateway와 같은 프록시 기능을 제공하기 때문에 충돌을 방지하기 위해 설치시 `--k3s-arg "--disable=traefik@server:*"` 옵션을 사용하여 Traefik을 비활성화할 수 있다.

```bash
$ k3d cluster create --api-port 6550 -p '9080:80@loadbalancer' -p '9443:443@loadbalancer' --agents 4 --k3s-arg '--disable=traefik@server:*'
INFO[0000] portmapping '9080:80' targets the loadbalancer: defaulting to [servers:*:proxy agents:*:proxy]
INFO[0000] portmapping '9443:443' targets the loadbalancer: defaulting to [servers:*:proxy agents:*:proxy]
INFO[0000] Prep: Network
INFO[0000] Created network 'k3d-k3s-default'
INFO[0000] Created image volume k3d-k3s-default-images
INFO[0000] Starting new tools node...
INFO[0000] Starting node 'k3d-k3s-default-tools'
INFO[0001] Creating node 'k3d-k3s-default-server-0'
INFO[0001] Creating node 'k3d-k3s-default-agent-0'
INFO[0001] Creating node 'k3d-k3s-default-agent-1'
INFO[0001] Creating node 'k3d-k3s-default-agent-2'
INFO[0001] Creating node 'k3d-k3s-default-agent-3'
INFO[0001] Creating LoadBalancer 'k3d-k3s-default-serverlb'
INFO[0001] Using the k3d-tools node to gather environment information
INFO[0001] HostIP: using network gateway 172.22.0.1 address
INFO[0001] Starting cluster 'k3s-default'
INFO[0001] Starting servers...
INFO[0001] Starting node 'k3d-k3s-default-server-0'
INFO[0004] Starting agents...
INFO[0004] Starting node 'k3d-k3s-default-agent-2'
INFO[0004] Starting node 'k3d-k3s-default-agent-0'
INFO[0004] Starting node 'k3d-k3s-default-agent-1'
INFO[0004] Starting node 'k3d-k3s-default-agent-3'
INFO[0013] Starting helpers...
INFO[0013] Starting node 'k3d-k3s-default-serverlb'
INFO[0020] Injecting records for hostAliases (incl. host.k3d.internal) and for 6 network members into CoreDNS configmap...
INFO[0022] Cluster 'k3s-default' created successfully!
INFO[0022] You can now use it like this:
kubectl cluster-info
```

Istio를 설치할 때 기본 Flannel CNI와 함께 k3d를 사용하는 경우에는, CNI 구성 및 바이너리에 표준이 아닌 위치를 사용하기 때문에 설치 명령에 몇 가지 값을 추가해야 한다. 

```bash
$ istioctl install --set profile=ambient --set values.cni.cniConfDir=/var/lib/rancher/k3s/agent/etc/cni/net.d --set values.cni.cniBinDir=/bin

        |\
        | \
        |  \
        |   \
      /||    \
     / ||     \
    /  ||      \
   /   ||       \
  /    ||        \
 /     ||         \
/______||__________\
____________________
  \__       _____/
     \_____/

This will install the Istio 1.23.2 "ambient" profile (with components: Istio core, Istiod, CNI, and Ztunnel) into the cluster. Proceed? (y/N) y
✔ Istio core installed ⛵️
✔ Istiod installed 🧠
✔ CNI installed 🪢
✔ Ztunnel installed 🔒
✔ Installation complete                                                                                                                                                  
Made this installation the default for cluster-wide operations.
The ambient profile has been installed successfully, enjoy Istio without sidecars!
```

설치가 완료된 이후의 클러스터의 `istio` 컴포넌트 점검 `istioctl verify-install` 명령을 통해 확인할 수 있다. 기본으로 배포가 되었기 때문에 특별한 옵션없이 점검을 수행하면 `default` 리비전만 점검을 수행한다.

```bash
$ istioctl verify-install
1 Istio control planes detected, checking --revision "default" only
✔ Deployment: istiod.istio-system checked successfully
... ## 중략
✔ CustomResourceDefinition: workloadgroups.networking.istio.io.istio-system checked successfully
Checked 14 custom resource definitions
Checked 1 Istio Deployments
Checked 2 Istio Daemonsets
✔ Istio is installed and verified successfully
```

ArgoCD 배포를 진행한다. Non-HA YAML 매니페스트를 사용하여 [ArgoCD 최신버전](https://github.com/argoproj/argo-cd/releases)(설치당시 2.12.6 버전)으로 배포를 진행한다.

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.12.6/manifests/install.yaml
```

설치가 완료되고 ArgoCD 컴포넌트를 확인해보면 다음과 비슷하게 보일 것이다.

```bash
$ kubectl get pods -n argocd
NAME                                               READY   STATUS    RESTARTS      AGE
argocd-application-controller-0                    1/1     Running   0             12m
argocd-applicationset-controller-75d8c9495-fpd69   1/1     Running   0             12m
argocd-dex-server-7c9b44b9f9-wcmth                 1/1     Running   1 (10m ago)   12m
argocd-notifications-controller-77f49c7745-jdq4p   1/1     Running   0             12m
argocd-redis-575c96bc4f-xvwrk                      1/1     Running   0             12m
argocd-repo-server-7f44b474d7-r8n5m                1/1     Running   0             12m
argocd-server-5f4dd5d648-brghh                     1/1     Running   0             12m
```

ArgoCD 패스워드를 변경하기 위해 `bcrypt`로 `KANS`로 암호화하고 `argocd-secret` 리소스를 patch한다. 참고로 encrypt는 [https://bcrypt-generator.com/](https://bcrypt-generator.com/)에서 진행했다. 

```bash
$ kubectl -n argocd patch secret argocd-secret \
  -p '{"stringData": {
    "admin.password": "$2a$12$PFnmDf/NBL4PQTe5x/oqT.DKtkmc2stvPdvrDaeaYwu.nwq4izE6G",
    "admin.passwordMtime": "'$(date +%FT%T%Z)'"
  }}'
secret/argocd-secret patched
```

```
kubectl port-forward svc/argocd-server -n argocd 9999:443
```




### Sample App Rollout 배포

![https://istio.io/latest/docs/ambient/getting-started/deploy-sample-app/bookinfo.svg](https://istio.io/latest/docs/ambient/getting-started/deploy-sample-app/bookinfo.svg)

해당 그림과 같은 샘플 애플리케이션을 배포하기 위해서 Argo Rollout 최신 버전도 배포한다.

```bash
$ kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
namespace/argo-rollouts created
customresourcedefinition.apiextensions.k8s.io/analysisruns.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/analysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/clusteranalysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/experiments.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/rollouts.argoproj.io created
serviceaccount/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-admin created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-edit created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-view created
clusterrolebinding.rbac.authorization.k8s.io/argo-rollouts created
configmap/argo-rollouts-config created
secret/argo-rollouts-notification-secret created
service/argo-rollouts-metrics created
deployment.apps/argo-rollouts created
```


#### 0번 노드 foo 네임스페이스에 sleep 배포

foo 네임스페이스에서 `sleep` 서비스를 실행하고 해당 네임스페이스에 대해 Istio 사이드카 인젝션을 사용하려면 `foo` 네임스페이스에 Istio injection 라벨을 추가해야 한다.

```bash
$ kubectl create namespace foo
namespace/foo created

$ kubectl label namespace foo istio-injection=enabled
namespace/foo labeled
```

`k3d-k3s-default-agent-0` 노드에 배포하기 위해 `nodeSelector` 구문을 추가하고 `foo` 네임스페이스에 배포한다.

```yaml
cat <<EOF | kubectl create -n foo -f -
apiVersion: v1
kind: Service
metadata:
  name: sleep
  labels:
    app: sleep
    service: sleep
spec:
  ports:
  - port: 80
    name: http
  selector:
    app: sleep
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sleep
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sleep
  template:
    metadata:
      labels:
        app: sleep
    spec:
      terminationGracePeriodSeconds: 0
      containers:
      - name: sleep
        image: curlimages/curl
        command: ["/bin/sleep", "3650d"]
        imagePullPolicy: IfNotPresent
        volumeMounts:
        - mountPath: /etc/sleep/tls
          name: secret-volume
      volumes:
      - name: secret-volume
        secret:
          secretName: sleep-secret
          optional: true
      nodeSelector:
        kubernetes.io/hostname: "k3d-k3s-default-agent-0"
```

Ambient 모드이지만 Istio injection이 오버라이드 되면서 추가적인 사이드카가 있는채로 배포된 것을 확인할 수있다.
![foo](/img/foo.png)

#### 1번 노드 bar-1 네임스페이스에 httpbin 배포

`bar-1` 네임스페이스에서 `httpbin` 서비스를 실행하고, 해당 네임스페이스에 대해 Ambient 모드를 사용하려면 `bar-1` 네임스페이스에 라벨을 추가해야 한다.

```bash
$ kubectl create namespace bar-1
namespace/foo created

$ kubectl label namespace bar-1 istio.io/dataplane-mode=ambient
namespace/bar-1 labeled
```

`k3d-k3s-default-agent-1` 노드에 배포하기 위해 `nodeSelector` 구문을 추가하고 `bar-1` 네임스페이스에 배포한다.

```yaml
cat <<EOF | kubectl create -n bar-1 -f -
---
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  labels:
    app: httpbin
    service: httpbin
spec:
  ports:
  - name: http
    port: 8000
    targetPort: 80
  selector:
    app: httpbin
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
      version: v1
  template:
    metadata:
      labels:
        app: httpbin
        version: v1
    spec:
      containers:
      - image: docker.io/kennethreitz/httpbin
        imagePullPolicy: IfNotPresent
        name: httpbin
        ports:
        - containerPort: 80
      nodeSelector:
        kubernetes.io/hostname: "k3d-k3s-default-agent-1"
EOF
```

#### 2번 노드 waypoint proxy 배포

웨이포인트 프록시는 쿠버네티스 게이트웨이 리소스를 사용하여 배포된다. 대부분의 쿠버네티스 클러스터에는 기본적으로 쿠버네티스 게이트웨이 API CRD가 설치되어 있지 않으므로, 게이트웨이 API를 사용하기 전에 설치되어 있는지 확인해야 한다. 

```bash
$ kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml; }

customresourcedefinition.apiextensions.k8s.io/gatewayclasses.gateway.networking.k8s.io created
customresourcedefinition.apiextensions.k8s.io/gateways.gateway.networking.k8s.io created
customresourcedefinition.apiextensions.k8s.io/grpcroutes.gateway.networking.k8s.io created
customresourcedefinition.apiextensions.k8s.io/httproutes.gateway.networking.k8s.io created
customresourcedefinition.apiextensions.k8s.io/referencegrants.gateway.networking.k8s.io created

```


`istioctl waypoint` 명령어를 사용하여 Gateway API 리소스를 생성, 적용 또는 나열할 수 있다. waypoint가 배포된 후에는 전체 네임스페이스(또는 선택한 서비스 또는 파드)를 등록해야  한다. 특정 네임스페이스에 대한 waypoint proxy를 배포하기 전에 네임스페이스가 `istio.io/dataplane-mode: ambient`로 레이블이 지정되어 있는지 확인해야 한다.

```bash
$ kubectl get ns -L istio.io/dataplane-mode

NAME              STATUS   AGE    DATAPLANE-MODE
argo-rollouts     Active   147m
argocd            Active   172m
bar-1             Active   69m    ambient
default           Active   3h
foo               Active   102m
istio-system      Active   176m
kube-node-lease   Active   3h
kube-public       Active   3h
kube-system       Active   3h
```

현재 Ambient가 등록되어 있는 네임스페이스는 `bar-1` 뿐이다. 

구성 예시 그림에 보면 helloworld 앱을 `bar-2` 네임스페이스에 배포하고, waypoint가 해당 네임스페이스의 서비스에 대한 트래픽을 처리할 수 있도록 구성할 수 있다. 먼저, helloworld 앱을 배포할 네임스페이스 `bar-2`를 추가하고, 해당 네임스페이스에 대해 Ambient 모드를 사용하기 위해 `bar-2` 네임스페이스에 라벨을 추가해야 한다.

```bash
$ kubectl create namespace bar-2
namespace/bar-2 created

$ kubectl label namespace bar-2 istio.io/dataplane-mode=ambient
namespace/bar-2 labeled
```

`istioctl waypoint generate`로 waypoint proxy에 대한 쿠버네티스 `Gateway` API 리소스 manifest를 생성할 수 있다.

```bash
$ istioctl waypoint generate --for service -n bar-2
```

```yaml
$ kubectl apply -f - <<EOF
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  labels:
    istio.io/waypoint-for: service
  name: waypoint
  namespace: bar-2
spec:
  gatewayClassName: istio-waypoint
  listeners:
  - name: mesh
    port: 15008
    protocol: HBONE
EOF
gateway.gateway.networking.k8s.io/waypoint created
```

생성된 Gateway Resource를 직접 배포하거나 아래와 같이 `istioctl waypoint apply` 명령을 사용해서 waypoint를 배포하는 경우 --enroll-namespace 매개변수를 사용하여 네임스페이스에 자동으로 레이블을 지정할 수 있다.

```bash
$ istioctl waypoint apply -n bar-2 --enroll-namespace
waypoint bar-2/waypoint applied
namespace bar-2 labeled with "istio.io/use-waypoint: waypoint"
```
waypoint proxy가 배포되면, 리소스에서 명시적으로 사용하도록 구성하기 전까지는 어떤 리소스에서도 waypoint를 사용하지 않는다. 

Gateway 리소스가 적용되면 Istiod는 리소스를 모니터링하고 해당 waypoint 배포 및 사용자를 위한 서비스를 자동으로 배포 및 관리하게 된다. waypoint가 모든 트래픽을 처리하거나, 클러스터의 워크로드(포드 또는 VM)로 직접 전송되는 트래픽만 처리하거나, 트래픽을 전혀 처리하지 않을 수도 있다. 예를 들어 waypoint가 모든 트래픽을 처리한다고 설정하는 경우 Prometheus 스크래핑 같은 내부 용도로 사용시 모든 트래픽이 L7 처리가 되는 오버헤드가 발생하기 때문에 아래와 같은 옵션을 `istio.io/waypoint-for` 레이블에 설정해서 정의하게 된다.

- `istio.io/waypoint-for: service`: 쿠버네티스 서비스
- `istio.io/waypoint-for: workload`: 파드 또는 VM IP
- `istio.io/waypoint-for: all`: 서비스와 워크로드 트래픽 모두
- `istio.io/waypoint-for: none`: 전달 없음 (테스트 용)

배포가 완료되면 아래와 같이 `bar-2` 네임스페이스에서 쿠버네티스 서비스로 전달되는 트래픽에 대해서만 트래픽을 수신하는 waypoint proxy pod를 확인할 수 있다. 

```
$ kubectl get gateway -A
NAMESPACE   NAME       CLASS            ADDRESS        PROGRAMMED   AGE
bar-2       waypoint   istio-waypoint   10.43.241.18   True         21m

$ kubectl get pod -n bar-2
NAME                        READY   STATUS    RESTARTS   AGE
waypoint-7674fbc875-s9mgw   1/1     Running   0          22m
```

#### 3번 노드 helloworld Application 배포

`k3d-k3s-default-agent-3` 노드에 배포하기 위해 `nodeSelector` 구문을 추가하고 `bar-2` 네임스페이스에 배포한다.

```yaml
cat <<EOF | kubectl create -n bar-2 -f -
---
apiVersion: v1
kind: Service
metadata:
  name: helloworld
spec:
  ports:
  - port: 5000
    name: http
  selector:
    app: helloworld
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloworld
spec:
  replicas: 1
  selector:
    matchLabels:
      app: helloworld
      version: v1
  template:
    metadata:
      labels:
        app: helloworld
        version: v1
    spec:
      containers:
      - name: helloworld
        image: docker.io/istio/examples-helloworld-v1
        imagePullPolicy: Always
        ports:
        - containerPort: 5000
          protocol: TCP
        resources:
          requests:
            cpu: "100m"
      nodeSelector:
        kubernetes.io/hostname: "k3d-k3s-default-agent-3"
EOF
```

배포가 완료되면 의도한 대로 각 네임스페이스에 정상적으로 등록되어 있는지 확인한다.

```bash
$ kubectl get pod -n foo -o wide
NAME                     READY   STATUS    RESTARTS   AGE     IP          NODE                      NOMINATED NODE   READINESS GATES
sleep-6885445f75-6zxh5   2/2     Running   0          3h33m   10.42.0.5   k3d-k3s-default-agent-0   <none>           <none>

$ kubectl get pod -n bar-1 -o wide
NAME                      READY   STATUS    RESTARTS   AGE    IP          NODE                      NOMINATED NODE   READINESS GATES
httpbin-55d7b9f77-65rjk   1/1     Running   0          3h7m   10.42.1.7   k3d-k3s-default-agent-1   <none>           <none>

$ kubectl get pod -n bar-2 -o wide
NAME                        READY   STATUS    RESTARTS   AGE   IP          NODE                       NOMINATED NODE   READINESS GATES
helloworld-5996d5d8-2l55k   1/1     Running   0          22m   10.42.2.6   k3d-k3s-default-agent-2    <none>           <none>
waypoint-7674fbc875-s9mgw   1/1     Running   0          96m   10.42.4.5   k3d-k3s-default-server-0   <none>           <none>
```

### 네트워크 트래픽 흐름 체크 (sleep -> httpbin)

`sleep`에서 나가는 트래픽의 흐름을 확인해보자. K3d로 배포했기 때문에 노드 접근은 `docker`나 `nerdctl` 명령으로 진행한다. 먼저 httpbin으로 접속해보자. 

```bash
$ ❯ kubectl exec -it deploy/sleep -n foo sleep -- curl http://httpbin.bar-1:8000/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.bar-1:8000",
    "User-Agent": "curl/8.10.1",
    "X-Envoy-Attempt-Count": "1",
    "X-Envoy-Decorator-Operation": "httpbin.bar-1.svc.cluster.local:8000/*",
    "X-Envoy-Peer-Metadata": "ChoKCkNMVVNURVJfSUQSDBoKS3ViZXJuZXRlcwp5CgZMQUJFTFMSbyptCg4KA2FwcBIHGgVzbGVlcAoqCh9zZXJ2aWNlLmlzdGlvLmlvL2Nhbm9uaWNhbC1uYW1lEgcaBXNsZWVwCi8KI3NlcnZpY2UuaXN0aW8uaW8vY2Fub25pY2FsLXJldmlzaW9uEggaBmxhdGVzdAogCgROQU1FEhgaFnNsZWVwLTY4ODU0NDVmNzUtNnp4aDUKEgoJTkFNRVNQQUNFEgUaA2ZvbwpFCgVPV05FUhI8GjprdWJlcm5ldGVzOi8vYXBpcy9hcHBzL3YxL25hbWVzcGFjZXMvZm9vL2RlcGxveW1lbnRzL3NsZWVwChgKDVdPUktMT0FEX05BTUUSBxoFc2xlZXA=",
    "X-Envoy-Peer-Metadata-Id": "sidecar~10.42.0.5~sleep-6885445f75-6zxh5.foo~foo.svc.cluster.local"
  },
  "origin": "10.42.0.5",
  "url": "http://httpbin.bar-1:8000/get"
}
```

헤더의 `origin`이나 `X-Envoy-Peer-Metadata-Id`를 보면 `sleep` 파드에서 넘어온 트래픽이라는 것을 확인할 수 있다.

`sleep` 파드의 iptable을 확인해보자. `istio-proxy` 컨테이너 PID는 다음과 같이 확인할 수 있다.

```bash
$ docker exec -it k3d-k3s-default-agent-0 ps -ef | grep istio
24459 1337     /usr/local/bin/envoy -c etc/istio/proxy/envoy-rev.json --drain-t
```

`istio-proxy`의 iptable을 위에서 확인한 PID `24459` 네임스페이스(ns) 컨텍스트로 진입해서 확인해보면 마지막 `ISTIO_REDIRECT` 체인에서 `localhost:5001`로 Redirect 되는 것을 볼 수 있다.

```bash
$ docker exec -it k3d-k3s-default-agent-0 nsenter --net --target 24459
~ # iptables -t nat -vnL
Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
  908 54480 ISTIO_INBOUND  6    --  *      *       0.0.0.0/0            0.0.0.0/0

Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination
   21  1260 ISTIO_OUTPUT  6    --  *      *       0.0.0.0/0            0.0.0.0/0

Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination

Chain ISTIO_INBOUND (1 references)
 pkts bytes target     prot opt in     out     source               destination
    0     0 RETURN     6    --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:15008
    0     0 RETURN     6    --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:15020
  908 54480 RETURN     6    --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:15021
    0     0 RETURN     6    --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:15090
    0     0 ISTIO_IN_REDIRECT  6    --  *      *       0.0.0.0/0            0.0.0.0/0

Chain ISTIO_IN_REDIRECT (3 references)
 pkts bytes target     prot opt in     out     source               destination
    1    60 REDIRECT   6    --  *      *       0.0.0.0/0            0.0.0.0/0            redir ports 15006

Chain ISTIO_OUTPUT (1 references)
 pkts bytes target     prot opt in     out     source               destination
    2   120 RETURN     6    --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:15020
    0     0 RETURN     0    --  *      lo      127.0.0.6            0.0.0.0/0
    1    60 ISTIO_IN_REDIRECT  6    --  *      lo      0.0.0.0/0           !127.0.0.1            tcp dpt:!15008 owner UID match 1337
    0     0 RETURN     0    --  *      lo      0.0.0.0/0            0.0.0.0/0            ! owner UID match 1337
   15   900 RETURN     0    --  *      *       0.0.0.0/0            0.0.0.0/0            owner UID match 1337
    0     0 ISTIO_IN_REDIRECT  6    --  *      lo      0.0.0.0/0           !127.0.0.1            tcp dpt:!15008 owner GID match 1337
    0     0 RETURN     0    --  *      lo      0.0.0.0/0            0.0.0.0/0            ! owner GID match 1337
    0     0 RETURN     0    --  *      *       0.0.0.0/0            0.0.0.0/0            owner GID match 1337
    0     0 RETURN     0    --  *      *       0.0.0.0/0            127.0.0.1
    3   180 ISTIO_REDIRECT  0    --  *      *       0.0.0.0/0            0.0.0.0/0

Chain ISTIO_REDIRECT (1 references)
 pkts bytes target     prot opt in     out     source               destination
    3   180 REDIRECT   6    --  *      *       0.0.0.0/0            0.0.0.0/0            redir ports 15001
```

이번엔 `httpbin` 파드와 같은 노드의 `ztunnel` 파드의 로그를 확인해보자. 위에서 `sleep` 파드에서 접근했기 때문에 src 워크로드의 정보를 통해 이를 확인할 수 있다. 

```bash
$ kubectl logs ztunnel-9t97l -n istio-system

2024-10-19T17:46:36.635961Z	info	access	connection complete	src.addr=10.42.0.5:56742 src.workload="sleep-6885445f75-6zxh5" src.namespace="foo" src.identity="spiffe://cluster.local/ns/foo/sa/default" ..."
```

### 네트워크 트래픽 흐름 체크 (sleep -> helloworld)

Istio 컨트롤 플레인에는 서비스 메시의 모든 서비스 정보와 구성이 존재한다. `helloworld` 파드가 `wayfront` proxy와 함께 배포되면, `sleep` 파드 사이드카가 수신하는 `helloworld` 서비스의 EDS 구성이 `envoy_internal_address` 유형으로 변경된다. 사이드카를 통과하는 요청 트래픽이 [HBONE(HTTP 기반 overlay 네트워크)](https://istio.io/latest/docs/ambient/architecture/hbone/) 프로토콜을 통해 세번째 노드의 `wayfront` proxy 포트 15008로 포워딩되는 것을 확인할 수 있다.

#### helloworld 로그 확인 정리중

---

## 정리

이번 포스팅에서는 Istio Ambient 모드의 기능과 설치 방법, 샘플 애플리케이션 배포 및 트래픽 흐름에 대한 개괄적인 내용을 정리해봤다. 


## Reference

- https://istio.io/latest/blog/2022/introducing-ambient-mesh/
- https://sysnet4admin.gitbook.io/cncf/cloud-native/service-mesh/istio/ambient-mesh/introducing-ambient-mesh
- https://www.youtube.com/watch?v=bbfiYMzHtH0&list=WL&index=1 

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.
