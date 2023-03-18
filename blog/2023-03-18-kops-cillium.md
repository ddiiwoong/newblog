---
layout: single
title: "kOps with Cilium"
comments: true
classes: wide
description: "Cilium CNI 기반 kOps 구성"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/kops-cilium/
date: 2023-03-18
categories:
  - Kubernetes
tags:
  - Kubernetes
  - kOps
  - Cloud9
  - CloudFormation
  - CNI
  - Networking
  - Cilium
---

## PKOS Study #2

가시다님의 Production Kubernetes Online Study (=PKOS) 2기 멤버가 되서 쿠버네티스 스터디를 진행하고 있다. 이정훈님의 집필하신 "24단계 실습으로 정복하는 쿠버네티스" 책을 기반으로 하는 스터디이며 총 (4+1)주간 진행이 되고 있고 두번째 스터디 일정이 마무리 되었다. 


이번 스터디 과제에서는 Cilium을 기반으로 하는 kOps 클러스터를 생성하고 네트워크 구성이 어떻게 되는지 확인해보고자 한다. Cilium는 Linux 커널 내에 강력한 보안 가시성 및 제어 로직을 동적으로 삽입할 수 있는 BPF라는 Linux 커널 기술을 사용하는 CNI이다. 

https://cilium.io/
https://kops.sigs.k8s.io/networking/cilium/

## kOps with Cloud9

글을 작성하는 날짜 기준(23년 3월 18일), 버전은 1.25.11 으로 진행을 한다. 지난번 구성과 동일하게 Bastion은 Cloud9에서 구성을 진행하였다. 지난번 작성한 Cloud9 기반 인스턴스는 아래 링크에서 확인할 수 있다.

[https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml](https://github.com/jinwoongk/aws-cloud9-bootstrapping-example/blob/main/example_instancestack.yaml)

<!--truncate-->

## Cilium CNI 기반 kOps 배포

Cloud9이 구성되고 나면 해당 환경에서 기본 구성할 Cluster yaml을 작성한다. yaml의 크기 때문에 부분을 나눠서 설명한다.

```yaml
apiVersion: kops.k8s.io/v1alpha2
kind: Cluster
metadata:
  creationTimestamp: null
  name: prosv.kr
spec:
  kubeProxy:
    enabled: false
    metricsBindAddress: 0.0.0.0
  networking:
    cilium:
      enableNodePort: true
      ipam: eni
      hubble:
        enabled: true
...
```

kOps를 구성할 때는 Cluster CRD를 작성하는것이 기본인데 클러스터 이름은 현재 사용중인 테스트 도메인을 입력한다.   
그리고 Cilium 을 기본 CNI으로 구성할 예정이기 때문에 Kube-Proxy는 기본적으로 비활성화 한다. Cilium이 AWS에서 할당된 managed IP 주소를 프로비저닝하고 AWS VPC와 마찬가지로 각 파드에 직접 연결하도록 `networking.cilium.ipam=eni` 설정을 추가하고, hubble을 활성화하기 위한 `networking.cilium.hubble.enabled: true` 설정도 추가한다.  
https://docs.cilium.io/en/stable/network/concepts/ipam/eni/


cilium 설정에서의 다양한 옵션은 다음을 참조할 수 있다.  
https://kops.sigs.k8s.io/networking/cilium/


```yaml
...
  api:
    dns: {}
  authorization:
    rbac: {}
  channel: stable
  cloudProvider: aws
  certManager:
    enabled: true
  awsLoadBalancerController:
    enabled: true
  externalDns:
    provider: external-dns
  metricsServer:
    enabled: true
  kubeDNS:
    provider: CoreDNS
    nodeLocalDNS:
      enabled: true
      memoryRequest: 5Mi
      cpuRequest: 25m
  configBase: s3://jinwoong-k8s-s3/prosv.kr
...
```

위에서 추가한 설정은 다음과 같다.

- [certManager 활성화](https://kops.sigs.k8s.io/addons/#cert-manager)
- [awsLoadBalancerController 활성화](https://kops.sigs.k8s.io/addons/#aws-load-balancer-controller) 및 [externalDns 구성](https://kops.sigs.k8s.io/cluster_spec/#externaldns)
- [metricsServer 활성화](https://kops.sigs.k8s.io/addons/#metrics-server)
- [kubeDNS 구성](https://kops.sigs.k8s.io/cluster_spec/#kubedns)
- [기본 config 저장소 s3 지정](https://kops.sigs.k8s.io/state/#s3-state-store)

```yaml
...
  etcdClusters:
  - cpuRequest: 200m
    etcdMembers:
    - encryptedVolume: true
      instanceGroup: control-plane-ap-northeast-2a
      name: a
    memoryRequest: 100Mi
    name: main
  - cpuRequest: 100m
    etcdMembers:
    - encryptedVolume: true
      instanceGroup: control-plane-ap-northeast-2a
      name: a
    memoryRequest: 100Mi
    name: events
  iam:
    allowContainerRegistry: true
    legacy: false
  kubelet:
    anonymousAuth: false
    maxPods: 100
...
```
위에서 추가한 설정은 다음과 같다.

- [etcd 클러스터 구성](https://kops.sigs.k8s.io/cluster_spec/#etcdclusters)
  - instancGroup CRD에서 원하는 머신타입, 기본 노드 이미지, 노드 개수 등을 구성할 수 있다.
- [ECR 접근을 위한 IAM 구성](https://kops.sigs.k8s.io/iam_roles/#access-to-aws-ec2-container-registry-ecr)
- [kubelet 구성](https://kops.sigs.k8s.io/cluster_spec/#kubelet)


```yaml
...
  kubernetesApiAccess:
  - 0.0.0.0/0
  - ::/0
  kubernetesVersion: 1.24.11
  masterPublicName: api.prosv.kr
  networkCIDR: 172.30.0.0/16
  nonMasqueradeCIDR: 100.64.0.0/10
  sshAccess:
  - 0.0.0.0/0
  - ::/0
  subnets:
  - cidr: 172.30.32.0/19
    name: ap-northeast-2a
    type: Public
    zone: ap-northeast-2a
  - cidr: 172.30.64.0/19
    name: ap-northeast-2c
    type: Public
    zone: ap-northeast-2c
  topology:
    dns:
      type: Public
    masters: public
    nodes: public
...
```

위에서 추가한 설정은 다음과 같다.

- [kube-API 접근제어 설정](https://kops.sigs.k8s.io/cluster_spec/#kubernetesapiaccess)
- [기존 VPC내 CIDR 사용을 위한 구성](https://kops.sigs.k8s.io/run_in_existing_vpc/)
- [네트워크 토폴로지 구성](https://kops.sigs.k8s.io/topology/)


InstanceGroup 과 SSHCredential 를 작성한다.

```yaml
apiVersion: kops.k8s.io/v1alpha2
kind: InstanceGroup
metadata:
  creationTimestamp: null
  labels:
    kops.k8s.io/cluster: prosv.kr
  name: control-plane-ap-northeast-2a
spec:
  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302
  instanceMetadata:
    httpPutResponseHopLimit: 3
    httpTokens: required
  machineType: t3.medium
  maxSize: 1
  minSize: 1
  role: Master
  subnets:
  - ap-northeast-2a
```

```yaml
apiVersion: kops.k8s.io/v1alpha2
kind: InstanceGroup
metadata:
  creationTimestamp: null
  labels:
    kops.k8s.io/cluster: prosv.kr
  name: nodes-ap-northeast-2a
spec:
  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302
  instanceMetadata:
    httpPutResponseHopLimit: 1
    httpTokens: required
  machineType: t3.medium
  maxSize: 1
  minSize: 1
  role: Node
  subnets:
  - ap-northeast-2a
```

```yaml
apiVersion: kops.k8s.io/v1alpha2
kind: InstanceGroup
metadata:
  creationTimestamp: null
  labels:
    kops.k8s.io/cluster: prosv.kr
  name: nodes-ap-northeast-2c
spec:
  image: 099720109477/ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-20230302
  instanceMetadata:
    httpPutResponseHopLimit: 1
    httpTokens: required
  machineType: t3.medium
  maxSize: 1
  minSize: 1
  role: Node
  subnets:
  - ap-northeast-2c
```

```yaml
apiVersion: kops.k8s.io/v1alpha2
kind: SSHCredential
metadata:
  creationTimestamp: null
  labels:
    kops.k8s.io/cluster: prosv.kr
  name: admin
spec:
  publicKey: ssh-rsa AAAA.....
    root@ip-172-31-50-160
```

작성한 모든 파일을 하나의 파일로 저장한 후 다음과 같이 kops CLI로 배포를 진행한다. 전체 파일은 다음 링크 예시를 참조한다.  
https://raw.githubusercontent.com/ddiiwoong/kops-config/main/kops.yaml


```sh
kops create -f kops.yaml

kops update cluster --name prosv.kr --ssh-public-key ~/.ssh/id_rsa.pub --yes
```

배포과 완료된 이후에 구성된 파드를 확인해보면 대부분은 기존 VPC CNI 구성요소와 동일하지만 몇가지 차이점은 노드마다 구성되어 있던 kube-proxy 대신 cilium 데몬셋 파드와 cilium 오퍼레이터 파드가 구성된것을 확인할 수 있다.  

```sh
$ kubectl get pod -n kube-system
NAME                                            READY   STATUS    RESTARTS      AGE
...
cilium-l6j9d                                    1/1     Running   0             24h
cilium-operator-697c58f5d5-8kk8m                1/1     Running   0             24h
cilium-q9j27                                    1/1     Running   0             24h
cilium-rx8zx                                    1/1     Running   0             24h
...
external-dns-598d5f5c76-pqp6r                   1/1     Running   0             24h
hubble-relay-85df7fbcbf-79n52                   1/1     Running   0             24h
hubble-relay-85df7fbcbf-rfchd                   1/1     Running   0             24h
hubble-ui-5986c56d45-wn95w                      3/3     Running   0             23h
...
```

## CNI 테스트

테스트용 netshoot 파드를 생성한다.

```yaml
cat <<EOF | kubectl create -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: netshoot-pod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: netshoot-pod
  template:
    metadata:
      labels:
        app: netshoot-pod
    spec:
      containers:
      - name: netshoot-pod
        image: nicolaka/netshoot
        command: ["tail"]
        args: ["-f", "/dev/null"]
      terminationGracePeriodSeconds: 0
EOF
```

배포한 netshoot 파드의 IP를 확인한다.

```sh
# kubectl get pod -o=custom-columns=NAME:.metadata.name,IP:.status.podIP
NAME                            IP
netshoot-pod-7757d5dd99-9mb7s   172.30.47.42
netshoot-pod-7757d5dd99-df68s   172.30.68.92
```

hubble 접근을 위해 https://docs.cilium.io/en/stable/gettingstarted/hubble_setup/ 을 참조해서 hubble, cilium CLI를 Cloud9에 설치한다. Hubble API에 액세스하려면 로컬 머신에서 Hubble 서비스에 대한 포트 포워드를 생성한다.

```sh
$ cilium hubble port-forward&
Forwarding from 0.0.0.0:4245 -> 4245
Forwarding from [::]:4245 -> 4245

$ hubble status
Healthcheck (via localhost:4245): Ok
Current/Max Flows: 12,285/12,285 (100.00%)
Flows/s: 12.41
Connected Nodes: 3/3
```

외부로 통신하는 트래픽을 발생시키고 `hubble observe` 명령을 통해 flow를 확인할 수 있다.

```
$ kubectl exec -it netshoot-pod-7757d5dd99-k4pf7 -- curl -s wttr.in/seoul                                              

$ hubble observe --pod netshoot-pod-7757d5dd99-k4pf7                                                                   
Mar 18 17:24:57.786: default/netshoot-pod-7757d5dd99-k4pf7:35019 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)
Mar 18 17:24:57.788: default/netshoot-pod-7757d5dd99-k4pf7:35019 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)
Mar 18 17:24:57.788: default/netshoot-pod-7757d5dd99-k4pf7:51562 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)
Mar 18 17:24:57.789: default/netshoot-pod-7757d5dd99-k4pf7:51562 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)
Mar 18 17:24:57.789: default/netshoot-pod-7757d5dd99-k4pf7:57074 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)
Mar 18 17:24:57.790: default/netshoot-pod-7757d5dd99-k4pf7:57074 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)
Mar 18 17:24:57.790: default/netshoot-pod-7757d5dd99-k4pf7:49895 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)
Mar 18 17:24:57.791: default/netshoot-pod-7757d5dd99-k4pf7:49895 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)
Mar 18 17:24:57.792: default/netshoot-pod-7757d5dd99-k4pf7:42920 (ID:22269) -> 169.254.20.10:53 (world) to-stack FORWARDED (UDP)
Mar 18 17:24:57.794: default/netshoot-pod-7757d5dd99-k4pf7:42920 (ID:22269) <- 169.254.20.10:53 (world) to-endpoint FORWARDED (UDP)
Mar 18 17:24:58.050: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: SYN)
Mar 18 17:24:58.528: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: ACK, FIN)
Mar 18 17:24:58.766: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) <- 5.9.243.187:80 (world) to-endpoint FORWARDED (TCP Flags: ACK, FIN)
Mar 18 17:24:58.766: default/netshoot-pod-7757d5dd99-k4pf7:40550 (ID:22269) -> 5.9.243.187:80 (world) to-stack FORWARDED (TCP Flags: ACK)
```

이번에는 최대 파드 개수를 체크하기 위해 replica를 20개로 증가시킨다. 하지만 아래와 같이 몇개의 파드가 `ContainerCreating` 상태인 것을 확인할 수 있다.

```sh
$ kubectl scale deployment/netshoot-pod --replicas=20
deployment.apps/netshoot-pod scaled
$ kubectl get pod
NAME                            READY   STATUS              RESTARTS   AGE
netshoot-pod-7757d5dd99-2x29s   0/1     c   0          9s
netshoot-pod-7757d5dd99-5j9qc   1/1     Running             0          34m
netshoot-pod-7757d5dd99-9996z   1/1     Running             0          26m
netshoot-pod-7757d5dd99-9dnkg   1/1     Running             0          34m
netshoot-pod-7757d5dd99-9k92w   0/1     ContainerCreating   0          23s
netshoot-pod-7757d5dd99-9mb7s   1/1     Running             0          43m
netshoot-pod-7757d5dd99-c2292   1/1     Running             0          35m
netshoot-pod-7757d5dd99-cf7dv   1/1     Running             0          34m
netshoot-pod-7757d5dd99-df68s   1/1     Running             0          43m
netshoot-pod-7757d5dd99-h9fjm   0/1     ContainerCreating   0          23s
netshoot-pod-7757d5dd99-hrkcs   0/1     ContainerCreating   0          23s
netshoot-pod-7757d5dd99-jkc6v   1/1     Running             0          34m
netshoot-pod-7757d5dd99-jkx7j   1/1     Running             0          23s
netshoot-pod-7757d5dd99-k4pf7   1/1     Running             0          26m
netshoot-pod-7757d5dd99-lbzvs   1/1     Running             0          35m
netshoot-pod-7757d5dd99-nb4pf   1/1     Running             0          34m
netshoot-pod-7757d5dd99-r4bhf   1/1     Running             0          26m
netshoot-pod-7757d5dd99-t8rt6   1/1     Running             0          26m
netshoot-pod-7757d5dd99-x2d62   1/1     Running             0          26m
netshoot-pod-7757d5dd99-zm7vc   1/1     Running             0          35m
```

파드의 상태를 `describe` 명령으로 살펴보면 cilium agent가 AWS IPAM 과 연동되어 IP 부족으로 인해 할당이 되지 않음을 알 수 있다.

```sh
$ kubectl describe pod netshoot-pod-7757d5dd99-9k92w
...
  Warning  FailedCreatePodSandBox  3m43s (x85 over 21m)  kubelet            (combined from similar events): Failed to create pod sandbox: rpc error: code = Unknown desc = failed to setup network for sandbox "eaced767b8747e09656744a3249a5e1c092fea7ba45302abdbf8086e3297c07d": plugin type="cilium-cni" name="cilium" failed (add): unable to allocate IP via local cilium agent: [POST /ipam][502] postIpamFailure  No more IPs availabl
```

AWS VPC CNI 환경에서 최대 파드 사용 가능 계산식은 ENI 자체 IP를 제외하고 `aws-node` 와 `kube-proxy` 파드를 고려하여 다음과 같은 공식으로 계산을 하게 된다.  
https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt

```
((MaxENI * (IPv4addr - 1)) + 2)
t3.medium 경우 : ((3 * (6 - 1) + 2 ) = 17개 >> aws-node 와 kube-proxy 2개 제외하면 15개
```

IPAM을 설정한 Cilium은 [AWS ENI](https://docs.cilium.io/en/stable/network/concepts/ipam/eni/) 기준을 따라간다. 공식 문서에서는 아직 확인할 수 없지만 [GitHub issue](https://github.com/cilium/cilium/issues/10426)로 추정해보면 `health`, `router` `CiliumInternalIP` 3개의 IP를 제외하기 때문에 t3.medium의 경우라면 3개의 ENI 당 6개의 아이피를 할당할 수 있기 때문에 실제

```
(MaxENI * (IPv4addr - 1))
t3.medium 경우 : ((3 * (6 - 1)) = 15개 >> health, router, CiliumInternalIP 3개 제외하면 12개 파드가 생성이 가능하다. 
```

이를 ciliumnode CRD를 통해서도 확인이 가능하다. 

첫번째 인터페이스에 할당된 `InternalIP`, `ExternalIP` 와 내부적으로 사용하는 `CiliumInternalIP` 를 확인할 수 있다.

```yaml
kubectl get ciliumnode i-00b3ebc1b78f19739 -o yaml

apiVersion: v1
items:
- apiVersion: cilium.io/v2
  kind: CiliumNode
  metadata:
    ...
  spec:
    addresses:
    - ip: 172.30.60.14
      type: InternalIP
    - ip: 13.124.209.231
      type: ExternalIP
    - ip: 172.30.44.153
      type: CiliumInternalIP

```

`spec.ipam`에서는 위에서 언급한 대로 15개의 할당가능한 IP를 보여준다.


```yaml
    ...
    ipam:
      podCIDRs:
      - 100.96.2.0/24
      pool:
        172.30.32.43:
          resource: eni-0717341e6470f76ce
        172.30.32.217:
          resource: eni-0483a896a7c0b49f3
        172.30.36.179:
          resource: eni-0717341e6470f76ce
        172.30.38.188:
          resource: eni-0483a896a7c0b49f3
        172.30.38.221:
          resource: eni-0483a896a7c0b49f3
        172.30.42.57:
          resource: eni-03b280d75b6d6cb09
        172.30.44.103:
          resource: eni-0717341e6470f76ce
        172.30.44.153:
          resource: eni-03b280d75b6d6cb09
        172.30.44.201:
          resource: eni-0717341e6470f76ce
        172.30.47.42:
          resource: eni-0483a896a7c0b49f3
        172.30.47.95:
          resource: eni-03b280d75b6d6cb09
        172.30.53.208:
          resource: eni-03b280d75b6d6cb09
        172.30.55.231:
          resource: eni-0717341e6470f76ce
        172.30.61.93:
          resource: eni-0483a896a7c0b49f3
        172.30.63.46:
          resource: eni-03b280d75b6d6cb09
      pre-allocate: 8
    ...
```

`status.ipam`에서는 현재 할당되어 있는 12개의 IP현황을 볼수 있다.

```yaml
    ipam:
      operator-status: {}
      used:
        172.30.32.43:
          owner: default/netshoot-pod-7757d5dd99-x2d62
          resource: eni-0717341e6470f76ce
        172.30.32.217:
          owner: kube-system/metrics-server-5f65d889cd-kg8sb
          resource: eni-0483a896a7c0b49f3
        172.30.36.179:
          owner: default/netshoot-pod-7757d5dd99-9996z
          resource: eni-0717341e6470f76ce
        172.30.38.188:
          owner: default/netshoot-pod-7757d5dd99-9dnkg
          resource: eni-0483a896a7c0b49f3
        172.30.38.221:
          owner: kube-system/coredns-68cd66b8cc-2bmzj
          resource: eni-0483a896a7c0b49f3
        172.30.42.57:
          owner: kube-system/ebs-csi-node-t9dk5
          resource: eni-03b280d75b6d6cb09
        172.30.44.103:
          owner: default/netshoot-pod-7757d5dd99-5j9qc
          resource: eni-0717341e6470f76ce
        172.30.44.153:
          owner: router
          resource: eni-03b280d75b6d6cb09
        172.30.44.201:
          owner: default/netshoot-pod-7757d5dd99-c2292
          resource: eni-0717341e6470f76ce
        172.30.47.42:
          owner: default/netshoot-pod-7757d5dd99-9mb7s
          resource: eni-0483a896a7c0b49f3
        172.30.53.208:
          owner: default/netshoot-pod-7757d5dd99-zm7vc
          resource: eni-03b280d75b6d6cb09
        172.30.55.231:
          owner: kube-system/hubble-relay-85df7fbcbf-79n52
          resource: eni-0717341e6470f76ce
        172.30.61.93:
          owner: default/netshoot-pod-7757d5dd99-jkc6v
          resource: eni-0483a896a7c0b49f3
        172.30.63.46:
          owner: health
          resource: eni-03b280d75b6d6cb09
```

## 정리

이번에는 kOps 구성을 Cilium CNI 기반으로 구성하고 hubble을 통해 flow를 확인하고 AWS IPAM API 연동을 통한 파드 IP할당 테스트를 진행해봤다.


> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 자료로 활용할 예정입니다.
