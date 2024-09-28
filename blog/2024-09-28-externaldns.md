---
layout: single
title: "ExternalDNS"
comments: true
classes: wide
description: "ExternalDNS와 CoreDNS를 통해 Service를 외부에서 사용할 수 있도록 설정하는 방법"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/externaldns/
date: 2024-09-29
categories:
  - Kubernetes
tags:
  - Kubernetes
  - externaldns
  - coredns
  - etcd
---

엔터프라이즈 환경에서는 클러스터에서 실행되는 워크로드에 IP 주소를 직접 사용하여 액세스하는 것이 일반적이지 않다. 대신, 쿠버네티스 클러스터에서 Service를 실행하여 애플리케이션의 고가용성을 보장한다. 이번 포스팅에서는 [ExternalDNS](https://github.com/kubernetes-sigs/external-dns) sigs 프로젝트를 사용하여 DNS에 서비스 이름 항목를 생성하는 방법에 대해 설명하고자 한다.

## Environment

쿠버네티스 로드 밸런서는 서비스에 표준 IP 주소를 제공하지만 사용자가 서비스에 접속하기 위한 ExternalDNS 이름을 생성하지는 않는다. IP 주소를 사용해 클러스터상에서 실행되고 있는 애플리케이션에 접속하는 것은 그다지 효율적이지 않다. 로드밸런서에서 할당한 각 IP에 대해 DNS에 수동으로 이름을 등록하는 것은 실질적으로 유지보수가 거의 불가능한 방법이다. 

작성하는 24년 9월 시점에는 [링크](https://github.com/kubernetes-sigs/external-dns?tab=readme-ov-file#the-latest-release)에서 볼수 있듯이 다양한 DNS 프로바이더가 지원을 한다. 

-	Google's Cloud DNS 
-	Amazon's Route 53 
-	AzureDNS 
-	Cloudflare 
-	CoreDNS 
-	RFC2136 

쿠버네티스 클러스터는 기본적으로 CoreDNS를 실행하여 클러스터 DNS 이름 해석을 제공한다. 내부 클러스터 DNS 해결이외에도 외부 이름 해석을 통해서 CoreDNS에서 관리하는 모든 DNS 존의 이름을 확인할 수 있다.

## external-dns 설정

kind를 통해 설치한 현재 CoreDNS는 내부 클러스터 이름에 대해서만 해석하므로 새 DNS 항목에 대한 존을 설정해야 한다. 클러스터에 동적으로 서비스 등록을 제공하기 위해서는 ExternalDNS를 배포하고 CoreDNS와 연동이 필요하다. 클러스터에서 작동하도록 ExternalDNS와 CoreDNS를 설정하려면 새로운 DNS 존에 ETCD를 사용하도록 각각 설정해야 한다. 새로운 ETCD 파드를 전용 ExternalDNS 존으로 배포한다.

ETCD를 배포하는 가장 빠른 방법은 공식 ETCD 헬름 차트를 사용하는 것이 좋다. 먼저 헬름 바이너리를 설치한다.

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

이제 헬름을 사용하여 CoreDNS와 연동할 ETCD 클러스터를 생성한다. `stable/etcd-operator` 차트는 더 이상 유지 관리되지 않기 때문에, `bitnami/etcd` 차트를 사용한다. 

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install etcd bitnami/etcd --namespace kube-system
```

설치하고 나면 ETCD Client pod도 실행해놓는다.

```bash
kubectl run etcd-client --restart='Never' --image docker.io/bitnami/etcd:3.5.16-debian-12-r1 --env ROOT_PASSWORD=$(kubectl get secret --namespace kube-system etcd -o jsonpath="{.data.etcd-root-password}" | base64 -d) --env ETCDCTL_ENDPOINTS="etcd.kube-system.svc.cluster.local:2379" --namespace kube-system --command -- sleep infinity
```

IP 주소를 적어 둔다. 다음 절에서 ExternalDNS 및 CoreDNS존 파일을 설정하려면 서비스 IP 주소가 필요하다.  

### CoreDNS에 ETCD 존 추가

동적 이름 해석을 사용하기 위해서는 ExternalDNS가 ETCD 서버에 CoreDNS 존을 저장해야 한다는 것이다. ETCD 연동 영역을 활성화하려면 CoreDNS 컨피그맵을 편집한다.
엔드포인트를 이전 페이지에서 취득한 새로운 ETCD 서비스의 IP 주소로 변경해야 한다.

```yaml
$ kubectl edit cm coredns -n kube-system

apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        etcd jinwoong k8s
          stubzones
          path /skydns
          endpoint http://10.244.3.4:2379
        }
        cache 30
        loop
        reload
        loadbalance
    }
kind: ConfigMap
...
```

다음 단계는 클러스터에 ExternalDNS를 배포한다. 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: external-dns
  namespace: kube-system
spec:
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: external-dns
  template:
    metadata:
      labels:
        app: external-dns
    spec:
      containers:
      - name: external-dns
        image: registry.k8s.io/external-dns/external-dns:v0.13.4
        args:
        - --source=ingress
        - --provider=coredns
        - --log-level=debug # debug only
        env:
        - name: ETCD_URLS
          value: http://10.244.3.4:2379
```

### ExternalDNS 연동으로 로드 밸런서 서비스 생성

기존에 띄워놓은 NGINX 디플로이먼트를 동적으로 DNS 등록을 하기 위해서 `external-dns.alpha.kubernetes.io/hostname` 어노테이션을 추가하고 신규 LoadBalancer 서비스를 생성한다.

```yaml
apiVersion: v1 
kind: Service 
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: nginx.jinwoong.k8s
  name: nginx-ext-dns
  namespace: default 
spec:
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 8080 
  selector:
    run: nginx-web 
  type: LoadBalancer
```

ExternalDNS 가 DNS 변경 사항을 수신하는 데 약간의 시간이 걸리지만 잠시후에 확인하면 레코드가 생성되었는지 확인할 수 있다. 확인하려면 `kubectl logs -n kube-system -l app=external-dns`를 사용하여 external-dns 파드 로그를 확인하고, netshoot 파드를 사용해서 nslookup 테스트를 진행한다.

```bash
kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot -- nslookup nginx.jinwoong.k8s

tmp-shell:~# nslookup nginx.jinwoong.k8s
Server:         10.96.0.10
Address:        10.96.0.10#53
Name:   nginx.jinwoong.k8s
Address: 10.244.0.11
```

