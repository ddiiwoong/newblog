---
layout: single
title: "Multus on Kind cluster"
comments: true
classes: wide
description: "Multus를 Kind cluster에 설치하는 방법"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/multus-on-kind/
date: 2024-09-21
categories:
  - Kubernetes
tags:
  - Kubernetes
  - multus
  - cni
  - kind
  - multiple network
  - macvlan
  - koko
  - kindnet
---

이전 직장에서 프로젝트 중에 `Multus`를 사용하여 5G환경에서 멀티 네트워크 CNI를 사용해서 패킷을 미러링하고 해당 패킷을 분석하는 프로젝트를 진행했었는데, 당시에 여러 사정으로 아쉽게 된 프로젝트도 존재하고 해서 이번 기회에 시리즈로 정리 해보려고 한다. 이번 포스트에서는 `Kind` cluster에 `Multus`를 구성하고 단일 인스턴스에서 노드끼리 통신할 수 있도록 `koko`를 사용해서 노드간 멀티 네트워크 환경을 구성하는 방법에 대해서 정리해보려고 한다.

## Requirements

- [Kind](https://kind.sigs.k8s.io/): Kind(Kubernetes IN Docker)는 Docker 컨테이너를 사용하여 로컬 Kubernetes 클러스터를 실행할 수 있게 해주는 도구다. 주로 테스트 및 개발 목적으로 사용되며, 빠르고 쉽게 Kubernetes 환경을 구축할 수 있다. 
- [Multus](https://github.com/k8snetworkplumbingwg/multus-cni): Multus는 Kubernetes에서 여러 네트워크 인터페이스를 지원하기 위한 CNI 플러그인이다. Multus를 통해 각 Pod가 여러 네트워크에 연결될 수 있으며, 다양한 네트워크 요구 사항을 충족할 수 있다. 특히 5G 워크로드에서 SR-IOV와 함께 사용될 때, Multus는 기본 네트워크 외에도 고성능 네트워크 인터페이스를 제공할 수 있다.
    - [SR-IOV](https://github.com/k8snetworkplumbingwg/sriov-network-device-plugin): SR-IOV(Single Root I/O Virtualization)는 하나의 물리적 네트워크 인터페이스를 여러 가상 함수(VF)로 나누어 각 Pod에 직접 할당할 수 있게 해주는 기술이다. 이를 통해 네트워크 성능을 크게 향상시킬 수 있으며, 특히 고성능 네트워킹이 필요한 5G 및 NFV(Network Function Virtualization) 환경에서 중요하게 사용되는 기술이다.
- [Koko](https://github.com/redhat-nfvpe/koko): Koko는 컨테이너 간 네트워크 연결을 위한 도구로, 특히 여러 네트워크 네임스페이스 간의 가상 이더넷 페어를 생성하는 데 사용된다. kind cluster에서 컨테이너로 구성된 노드간 통신을 위해서 사용된다.
- [Macvlan](https://github.com/containernetworking/plugins/tree/main/plugins/main/macvlan): Macvlan은 네트워크 인터페이스를 가상화하여 여러 개의 가상 네트워크 인터페이스를 생성할 수 있는 기술이다. 이를 통해 각 컨테이너가 고유한 MAC 주소를 가지며, 물리 네트워크와 직접 통신할 수 있다.

<!--truncate-->

## Architecture

![koko](/img/koko.png)

위 그림은 구성하려고 하는 Kind 클러스터와 네트워크 구성을 보여준다. Multus를 사용하면 Pod가 여러 네트워크에 동시에 연결될 수 있어 복잡한 네트워크 토폴로지를 지원할 수 있다.

1. **Kind 클러스터**: 기본적으로 Docker 컨테이너를 사용하여 노드를 생성한다.
   - **Control Plane**: 클러스터의 제어 영역을 담당하며, `eth0` 인터페이스를 통해 Docker Bridge와 연결된다.
   - **Worker Node 1 & 2**: 각각의 워커 노드는 Pod 형태로 실행되며, `eth0` 인터페이스를 통해 Docker Bridge와 연결된다.

2. **네트워크 구성**:
   - **Primary Interface (eth0)**: 각 노드의 기본 네트워크 인터페이스로, Kindnet CNI 플러그인을 통해 연결된다.
   - **Additional Interface (eth1)**: Multus CNI 플러그인을 사용하여 추가 네트워크 인터페이스를 제공한다. 여기서는 `macvlan` 플러그인을 사용하여 Pod에 추가 네트워크를 제공한다.

3. **Multus CNI**:
   - Multus는 여러 CNI 플러그인을 사용할 수 있게 해주는 멀티플렉서 역할을 한다. 위 그림에서 처럼 Kindnet과 Macvlan을 함께 사용한다.

4. **Docker 브리지**:
   - 컨테이너로 생성된 각 노드의 `eth0` 인터페이스는 Docker 브리지와 연결되어 있으며, `veth` 페어를 통해 통신한다.

5. **Koko**:
   - 컨테이너 간 Point-to-Point 연결을 관리하는 데 사용되는 도구이다. 그림에서 두 워커 노드 간의 직접적인 연결을 설정하는 역할을 한다.
   - Koko는 가상 이더넷 페어를 생성하여 서로 다른 네트워크 네임스페이스 간의 직접 연결을 가능하게 한다. 이를 통해 Kind 클러스터 내의 워커 노드 간에 추가적인 네트워크 인터페이스(eth1)를 생성하고 연결할 수 있다.
   - Koko를 사용하면 복잡한 네트워크 토폴로지를 쉽게 구성할 수 있으며, 특히 멀티 네트워크 환경에서 유용하다.

## Kind Cluster 생성

이번 구성은 Intel 기반 Ubuntu 22.04 환경에서 진행되었다.

`config-3node.yml` 파일을 준비한다. 기본적으로 `kindnet` CNI 플러그인을 사용하게 될 것이다. 주석처리된 구문은 커스텀 CNI 플러그인을 사용하는 경우에 사용된다.

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: multus-cluster
nodes:
    - role: control-plane
    - role: worker
    - role: worker
# Note: uncomment if you install cni plugin by yourself
#networking:
#  disableDefaultCNI: true
```

생성한 yml 파일을 사용하여 클러스터를 생성한다.

```bash
$ kind create cluster --config config-3node.yml
Creating cluster "multus-cluster" ...
 ✓ Ensuring node image (kindest/node:v1.31.0) 🖼
 ✓ Preparing nodes 📦 📦 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
 ✓ Joining worker nodes 🚜 
Set kubectl context to "kind-multus-cluster"
You can now use your cluster with:

kubectl cluster-info --context kind-multus-cluster

Not sure what to do next? 😅  Check out https://kind.sigs.k8s.io/docs/user/quick-start/

```

클러스터 정보를 확인한다.

```bash
$ kubectl cluster-info --context kind-multus-cluster
Kubernetes control plane is running at https://127.0.0.1:32935
CoreDNS is running at https://127.0.0.1:32935/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

kubeconfig를 export 한다.

```bash
$ kind export kubeconfig --name multus-cluster
Set kubectl context to "kind-multus-cluster"
```

클러스터가 성공적으로 생성되었는지 kubectl과 docker 명령어로 확인할 하면, 워커 노드 이름과 docker 컨테이너 이름이 같은 것을 확인할 수 있다.

```bash
$ kubectl get nodes 
NAME                           STATUS   ROLES           AGE     VERSION
multus-cluster-control-plane   Ready    control-plane   7m11s   v1.31.0
multus-cluster-worker          Ready    <none>          6m59s   v1.31.0
multus-cluster-worker2         Ready    <none>          6m59s   v1.31.0

$ docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED         STATUS         PORTS                       NAMES
6e4420eeaf93   kindest/node:v1.31.0   "/usr/local/bin/entr…"   9 minutes ago   Up 9 minutes   127.0.0.1:32935->6443/tcp   multus-cluster-control-plane
923ca6407417   kindest/node:v1.31.0   "/usr/local/bin/entr…"   9 minutes ago   Up 9 minutes                               multus-cluster-worker
de238256402a   kindest/node:v1.31.0   "/usr/local/bin/entr…"   9 minutes ago   Up 9 minutes                               multus-cluster-worker2
```

노드 컨테이너에 sh로 접속해서 `ip a` 명령어로 인터페이스 정보를 확인해보면, 노드에는 `eth0` 인터페이스만 연결되어 있는 것을 확인할 수 있다. 이는 `kindnet` CNI 플러그인이 기본적으로 제공하는 인터페이스이다. 

```bash
$ docker exec -it multus-cluster-worker sh
# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
23: eth0@if24: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.3/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fc00:f853:ccd:e793::3/64 scope global nodad 
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe12:3/64 scope link 
       valid_lft forever preferred_lft forever
```

## Multus 설치

Multus는 `CRD`, `clusterrole`, `clusterrolebinding`, `serviceaccount`, `configmap`, `daemonset`을 설치하는 방식으로 설치한다. 

```bash
$ kubectl apply -f https://raw.githubusercontent.com/k8snetworkplumbingwg/multus-cni/master/deployments/multus-daemonset.yml
customresourcedefinition.apiextensions.k8s.io/network-attachment-definitions.k8s.cni.cncf.io created
clusterrole.rbac.authorization.k8s.io/multus created
clusterrolebinding.rbac.authorization.k8s.io/multus created
serviceaccount/multus created
configmap/multus-cni-config created
daemonset.apps/kube-multus-ds created
``` 

## `koko`를 사용한 노드간 통신 설정

`koko`는 Docker 컨테이너 또는 Linux 네임스페이스 간에 veth 장치를 사용하여 포인트 투 포인트 연결을 설정하는 도구이다. koko는 하나의 호스트에서 두 개의 컨테이너에 대해서는 veth를, 별도의 호스트에서 두 개의 컨테이너에 대해서는 vxlan로 연결을 지원한다. 

### koko 설치

테스트를 진행할 노드에서 다음 명령어를 실행하여 `koko`를 설치한다. `koko`를 사용하여 컨테이너 호스트에서 컨테이너를 연결하는 방법은 veth를 사용한다. [Connecting containers in container host using veth](https://github.com/redhat-nfvpe/koko/blob/main/docs/Connecting-containers-in-container-host-using-veth.md) 문서를 참고하면 된다. 

```bash
./koko {-c <linkname> |
        -d <container>,<linkname>[,<IP addr>/<prefixlen>,...] |
        -n <netns name>,<linkname>[,<IP addr>/<prefixlen>,...]|
        -p <pid>,<linkname>[,<IP addr>/<prefixlen>,...]|
        -c <linkname> }
       {-d <container>,<linkname>[,<IP addr>/<prefixlen>,...] |
        -n <netns name>,<linkname>[,<IP addr>/<prefixlen>,...]|
        -p <pid>,<linkname>[,<IP addr>/<prefixlen>,...]|
        -c <linkname> }
```

```bash
$ curl -LO https://github.com/redhat-nfvpe/koko/releases/download/v0.83/koko_0.83_linux_amd64
```

다운받은 koko 파일에 실행 권한을 추가하고, sudo 권한으로 각 노드 컨테이너에 `eth1` 인터페이스를 추가하는 명령어를 실행한다. 아래 명령어는 `multus-cluster-worker`와 `multus-cluster-worker2`라는 두 Kind 노드 간에 veth 페어를 생성하고, 각 노드에 인터페이스를 할당하게 된다. 

```bash
$ chmod +x koko_0.83_linux_amd64
$ sudo ./koko_0.83_linux_amd64 -d multus-cluster-worker,eth1 -d multus-cluster-worker2,eth1
Create veth...done
```

"Create veth...done" 메시지는 실제로 새 veth가 생성되었다기 보다는 pair가 생성되어서 기존 docker bridge에 연결된 veth에 각 노드 컨테이너의 `eth1` 인터페이스가 매핑되어 추가된 것이다. 상세 코드는 [koko.go 파일](https://github.com/redhat-nfvpe/koko/blob/bbe26f6c7e0124815573e22a2f28ff70bfd0db61/koko.go#L595)에서 확인할 수 있다.


`ip a` 명령어로 인터페이스 정보를 다시 확인해보면, 각 노드 컨테이너에 새로운 `eth1` 인터페이스가 추가된 것을 확인할 수 있다.

```bash
$ docker exec -it multus-cluster-worker ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
23: eth0@if24: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.3/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fc00:f853:ccd:e793::3/64 scope global nodad 
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe12:3/64 scope link 
       valid_lft forever preferred_lft forever
28: eth1@if27: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 3e:da:c1:0e:3a:5d brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::3cda:c1ff:fe0e:3a5d/64 scope link 
       valid_lft forever preferred_lft forever
```


## CNI 레퍼런스 플러그인 설치

[CNI 레퍼런스 플러그인](https://github.com/containernetworking/plugins)은 컨테이너 네트워크 인터페이스(Container Network Interface)의 표준 구현체이다. 이 플러그인들은 Kubernetes와 같은 컨테이너 오케스트레이션 플랫폼에서 네트워크 기능을 제공하는 데 사용된다. CNI 레퍼런스 플러그인을 설치함으로써 클러스터 관리자는 다양한 네트워킹 요구사항을 충족시키고, 컨테이너 간 통신을 효율적으로 관리할 수 있다. 이번 테스트에서는 macvlan 구성을 진행하여 새로운 MAC 주소를 생성하고, 모든 트래픽을 해당 컨테이너로 전달하는 방식을 사용한다. 설치는 다음 yaml를 사용한다. 

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: cni-install-sh
  namespace: kube-system
data:
  install_cni.sh: |
    cd /tmp
    wget https://github.com/containernetworking/plugins/releases/download/v1.5.1/cni-plugins-linux-amd64-v1.5.1.tgz
    cd /host/opt/cni/bin
    tar xvfzp /tmp/cni-plugins-linux-amd64-v1.5.1.tgz
    sleep infinite
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: install-cni-plugins
  namespace: kube-system
  labels:
    name: cni-plugins
spec:
  selector:
    matchLabels:
      name: cni-plugins
  template:
    metadata:
      labels:
        name: cni-plugins
    spec:
      hostNetwork: true
      nodeSelector:
        kubernetes.io/arch: amd64
      tolerations:
      - operator: Exists
        effect: NoSchedule
      containers:
      - name: install-cni-plugins
        image: alpine
        command: ["/bin/sh", "/scripts/install_cni.sh"]
        resources:
          requests:
            cpu: "100m"
            memory: "50Mi"
          limits:
            cpu: "100m"
            memory: "50Mi"
        securityContext:
          privileged: true
        volumeMounts:
        - name: cni-bin
          mountPath: /host/opt/cni/bin
        - name: scripts
          mountPath: /scripts
      volumes:
        - name: cni-bin
          hostPath:
            path: /opt/cni/bin
        - name: scripts
          configMap:
            name: cni-install-sh
            items:
            - key: install_cni.sh
              path: install_cni.sh
```

cni 인스톨을 설치하는 스크립트는 cni-install-sh configmap에 정의되어 있다. 해당 플러그인은 노드마다 설치되어야 하므로 daemonset으로 설치한다. 글쓰는 당시의 최신 버전인 1.5.1으로 설치한다.

```bash
$ kubectl create -f cni.yaml 
configmap/cni-install-sh created
daemonset.apps/install-cni-plugins created
```

## macvlan을 사용하여 두 개의 컨테이너 생성

### macvlan

`macvlan`은 네트워크 인터페이스를 가상화하여 여러 개의 가상 네트워크 인터페이스를 생성할 수 있는 기술이다. 이를 통해 각 컨테이너가 고유한 MAC 주소를 가지며, 물리 네트워크와 직접 통신할 수 있다. macvlan은 Parent Inteface를 이용하여 여러개의 Child Interface를 생성한다. Child Interface는 각각 별도의 MAC Address와 macvlan Mode를 가질 수 있다. Mode에 따라서 Child Inteface간의 통신은 가능하지만, Mode에 관계없이 Parent Interface와 Child Interface는 서로 절대로 통신이 불가능한게 macvlan의 특징 중 하나이다.


### NetworkAttachmentDefinition

`NetworkAttachmentDefinition`은 Multus CNI를 사용하여 네트워크 인터페이스를 추가할 때 사용되는 오브젝트이다. 이를 통해 컨테이너에 추가적인 네트워크 인터페이스를 할당할 수 있다. 아래와 같이 macvlan을 사용하여 네트워크 인터페이스를 추가해보자.

```yaml
apiVersion: "k8s.cni.cncf.io/v1"
kind: NetworkAttachmentDefinition
metadata:
  name: macvlan-conf
spec: 
  config: '{
      "cniVersion": "0.3.1",
      "plugins": [
        {
          "type": "macvlan",
          "capabilities": { "ips": true },
          "master": "eth1",
          "mode": "bridge",
          "ipam": {
            "type": "static",
            "routes": [
              {
                "dst": "0.0.0.0/0",
                "gw": "10.1.1.1"
              }
            ] 
          }
        }, {
          "capabilities": { "mac": true },
          "type": "tuning"
        }
      ]
    }'
```

이 `NetworkAttachmentDefinition`의 각 부분을 하나씩 살펴보자. 이 구성은 `macvlan`을 사용하여 새로운 네트워크 인터페이스를 생성하고, 정적 IP 할당 및 라우팅을 설정한다. 또한 `tuning` 플러그인을 통해 MAC 주소 설정 기능을 추가로 제공하게 된다. 

- name: "macvlan-conf"로 이 `NetworkAttachmentDefinition`의 이름을 지정한다.
- cniVersion: 사용되는 CNI 스펙 버전을 나타낸다. 여기서는 0.3.1 버전을 사용한다.
- plugins: CNI 플러그인 목록을 정의한다.
  - type: "macvlan" 플러그인 사용
  - capabilities: IP 주소 할당 기능 활성화
  - master: "eth1"을 마스터 인터페이스로 사용
  - mode: "bridge" 모드로 동작
  - ipam: IP 주소 관리 설정
     - type: "static"으로 정적 IP 할당 사용
     - routes: 기본 라우트 설정 (게이트웨이: 10.1.1.1)
  - capabilities: MAC 주소 설정 기능 활성화
  - type: "tuning" 플러그인은 MAC 주소 설정 기능을 활성화하기 위해 사용


`NetworkAttachmentDefinition` 리소스를 생성한다.

```bash
$ kubectl apply -f nad.yaml 
networkattachmentdefinition.k8s.cni.cncf.io/macvlan-conf created
```

모든 준비가 완료되었다. 이제 멀티 네트워크 파드를 생성해보자. 

### 멀티 네트워크 파드 생성

멀티 네트워크 파드를 생성하기 위해서는 `annotations`에 네트워크 인터페이스를 추가해야 한다. 이전에 구성했던 macvlan-conf를 추가하고, 각 파드에 할당될 IP 주소와 게이트웨이를 설정한다. 그리고 `netshoot` 이미지를 사용하여 파드를 생성한다. 또한 파드에 대한 네트워크 명령어 실행을 위해 `securityContext`를 통해 파드에 대한 권한을 설정하고, 파드가 종료될 때 자원을 정리하는 설정을 한다. 그리고 각 노드에 대한 선택과 통신 확인을 위해 `nodeSelector` 설정으로 이미 구성한 각 노드 컨테이너에 파드를 배치한다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod1
  annotations:
    k8s.v1.cni.cncf.io/networks: '[
            { "name": "macvlan-conf",
              "ips": [ "10.1.1.101/24" ],
              "gateway": [ "10.1.1.1" ]
            }]'
spec:
  containers:
  - name: pod1
    image: nicolaka/netshoot
    command: ["tail"]
    args: ["-f", "/dev/null"]
    securityContext:
      privileged: true
  terminationGracePeriodSeconds: 0
  nodeSelector:
    kubernetes.io/hostname: multus-cluster-worker
---
apiVersion: v1
kind: Pod
metadata:
  name: pod2
  annotations:
    k8s.v1.cni.cncf.io/networks: '[
            { "name": "macvlan-conf",
              "ips": [ "10.1.1.102/24" ],
              "gateway": [ "10.1.1.1" ]
            }]'
spec:
  containers:
  - name: pod2
    image: nicolaka/netshoot
    command: ["tail"]
    args: ["-f", "/dev/null"]
    securityContext:
      privileged: true
  terminationGracePeriodSeconds: 0
  nodeSelector:
    kubernetes.io/hostname: multus-cluster-worker2
```

파드를 생성한다.

```bash
$ kubectl apply -f pod.yaml                                                                   
pod/pod1 created
pod/pod2 created
```

## 파드간 신규 네트워크 인터페이스 통신 확인

먼저 파드에 할당된 네트워크 인터페이스를 확인한다. 먼저 아키텍처 구성도에 따라서 파드에 할당된 네트워크 인터페이스를 확인 할 수 있다. eth0은 노드의 기존 kindnet 네트워크 인터페이스이고, net1은 multus에 의해 새로 생성된 macvlan 네트워크 인터페이스이다.

```bash
$ kubectl exec -it pod1 -- ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host proto kernel_lo 
       valid_lft forever preferred_lft forever
2: eth0@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether ba:aa:3b:d1:7c:50 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.244.1.2/24 brd 10.244.1.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::b8aa:3bff:fed1:7c50/64 scope link proto kernel_ll 
       valid_lft forever preferred_lft forever
3: net1@if20: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether a6:64:d5:ee:c4:91 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.1.1.101/24 brd 10.1.1.255 scope global net1
       valid_lft forever preferred_lft forever
    inet6 fe80::a464:d5ff:feee:c491/64 scope link proto kernel_ll 
       valid_lft forever preferred_lft forever

$ kubectl exec -it pod2 -- ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host proto kernel_lo 
       valid_lft forever preferred_lft forever
2: eth0@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether fa:82:35:f3:28:62 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.244.2.2/24 brd 10.244.2.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f882:35ff:fef3:2862/64 scope link proto kernel_ll 
       valid_lft forever preferred_lft forever
3: net1@if19: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 7e:af:c9:aa:18:8b brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 10.1.1.102/24 brd 10.1.1.255 scope global net1
       valid_lft forever preferred_lft forever
    inet6 fe80::7caf:c9ff:feaa:188b/64 scope link proto kernel_ll 
       valid_lft forever preferred_lft forever
```

노드에서 확인해보면 파드에 할당된 `veth` 네트워크 인터페이스가 추가된 것을 확인할 수 있다.

```bash
docker exec -it multus-cluster-worker ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: veth3775384b@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 52:f5:78:4b:a1:0b brd ff:ff:ff:ff:ff:ff link-netns cni-2632d959-3e52-354c-cde2-3b5e27ba6d86
    inet 10.244.1.1/32 scope global veth3775384b
       valid_lft forever preferred_lft forever
    inet6 fe80::50f5:78ff:fe4b:a10b/64 scope link 
       valid_lft forever preferred_lft forever
23: eth0@if24: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.3/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fc00:f853:ccd:e793::3/64 scope global nodad 
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe12:3/64 scope link 
       valid_lft forever preferred_lft forever
28: eth1@if27: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 3e:da:c1:0e:3a:5d brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::3cda:c1ff:fe0e:3a5d/64 scope link 
       valid_lft forever preferred_lft forever
```


각 파드에서 신규로 추가된 네트워크 인터페이스로의 통신을 확인한다.

```bash
$ kubectl exec -it pod1 -- ping 10.1.1.102
PING 10.1.1.102 (10.1.1.102) 56(84) bytes of data.
64 bytes from 10.1.1.102: icmp_seq=1 ttl=64 time=0.065 ms
64 bytes from 10.1.1.102: icmp_seq=2 ttl=64 time=0.034 ms
64 bytes from 10.1.1.102: icmp_seq=3 ttl=64 time=0.035 ms

$ kubectl exec -it pod2 -- ping 10.1.1.101
PING 10.1.1.101 (10.1.1.101) 56(84) bytes of data.
64 bytes from 10.1.1.101: icmp_seq=1 ttl=64 time=0.027 ms
64 bytes from 10.1.1.101: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 10.1.1.101: icmp_seq=3 ttl=64 time=0.026 ms
```

원래 CNI를 통해 할당된 네트워크 인터페이스는 파드간 통신도 확인할 수 있다.

```bash
$ kubectl exec -it pod1 -- ping 10.244.2.2
PING 10.244.2.2 (10.244.2.2) 56(84) bytes of data.
64 bytes from 10.244.2.2: icmp_seq=1 ttl=62 time=0.136 ms
64 bytes from 10.244.2.2: icmp_seq=2 ttl=62 time=0.081 ms
64 bytes from 10.244.2.2: icmp_seq=3 ttl=62 time=0.079 ms

$ kubectl exec -it pod2 -- ping 10.244.2.1                                                    
PING 10.244.2.1 (10.244.2.1) 56(84) bytes of data.
64 bytes from 10.244.2.1: icmp_seq=1 ttl=64 time=0.041 ms
64 bytes from 10.244.2.1: icmp_seq=2 ttl=64 time=0.045 ms
64 bytes from 10.244.2.1: icmp_seq=3 ttl=64 time=0.031 ms
```

## 정리

이 포스트에서는 Kind 클러스터에 Multus를 설치하고 koko를 사용하여 노드 간 멀티 네트워크 환경을 구성하는 방법에 대해 알아봤다. 주요 내용을 요약하면 다음과 같다.

1. Kind를 사용하여 하나의 호스트에서 Kubernetes 클러스터를 생성한다.
2. Multus CNI를 설치하여 다중 네트워크 인터페이스 지원을 추가한다.
3. koko 도구를 사용하여 노드 간 직접 통신을 위한 veth 페어를 생성한다.
4. CNI 레퍼런스 플러그인을 설치하여 macvlan 네트워크를 구성한다.
5. NetworkAttachmentDefinition을 생성하여 Multus에 macvlan 네트워크를 정의한다.
6. 테스트용 파드를 배포하여 추가된 네트워크 인터페이스를 통한 통신을 확인한다.

이 구성을 통해 단일 Kind 클러스터 내에서 다중 네트워크 환경을 시뮬레이션할 수 있었다. 이는 복잡한 네트워크 토폴로지가 필요한 애플리케이션 개발 및 테스트에 유용할 수 있다. 특히 5G 네트워크나 NFV 환경과 같이 고성능 네트워킹이 필요한 시나리오에서 이러한 설정이 도움이 될 수 있다.

이 접근 방식은 개발 및 테스트 환경에서 유용하지만, 프로덕션 환경에서는 추가적인 고려사항과 최적화가 필요할 수 있다. 네트워크 보안, 성능, 확장성 등의 측면에서 더 깊이 있는 검토가 필요할 것이다.

초반에 멀티 네트워크 CNI를 사용해서 패킷을 미러링하고 해당 패킷을 분석하는 프로젝트를 진행했었다는 내용을 언급했었는데, 다음 포스팅에서는 multus와 컨테이너 미러링 도구로 패킷을 미러링하고 pcap exporter를 사용해서 패킷의 5-tuple 정보를 분석하는 방법에 대해서 적어보려고 한다. 