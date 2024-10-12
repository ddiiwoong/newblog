---
layout: single
title: "AWS Gateway API Controller"
comments: true
classes: wide
description: "Gateway API의 이해와 Lattice를 통해 AWS Gateway API Controller 사용하기"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/gatewayapi
date: 2024-10-13
categories:
  - Kubernetes
tags:
  - Gateway API
  - AWS Gateway API Controller
  - Kubernetes
  - Microservices
  - API Management
  - Lattice
  - EKS
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

이번 포스팅의 목적은 Gateway API의 개념을 이해하고 Lattice를 통해 AWS Gateway API Controller를 EKS에서 사용해보기 위함이다.

<!--truncate-->

## Gateway API 이해하기

[https://gateway-api.sigs.k8s.io/](https://gateway-api.sigs.k8s.io/)

`Gateway API`는 쉽게 이해하도록 설명하면 Kubernetes 에서 네트워크 서비스를 제공하기 위해 설계된 여러 종류의 API를 모아놓은 것이다. 이 API는 사용자가 필요에 따라 인프라를 동적으로 설정하고, 복잡한 트래픽을 효과적으로 관리할 수 있도록 돕는 것이다. Gateway API의 주요 특징은 다음과 같다:

- **역할 지향적(Role-oriented)**: Gateway API에서는 Kubernetes 서비스 네트워킹을 관리하는 담당 업무에 역할에 따라 동작이나 권한을 유연하게 제공할 수 있다.
- **이식성(Portable)**: Gateway API spec은 사용자 정의 리소스(Custom Resources)로 정의되며, 많은 [Gateway Controller](https://gateway-api.sigs.k8s.io/implementations/)에서 지원한다.
- **표현력(Expressive)**: Gateway API는 헤더 기반 매칭(header-based matching), 트래픽 가중치(traffic weighting) 등 사용자 지정 어노테이션을 사용하여 `Ingress`에서만 가능했던 일반적인 트래픽 라우팅 사용 사례에 대한 기능을 지원한다.
- **확장성(Extensible)**: Gateway는 API의 다양한 계층에서 사용자 정의 리소스를 연결할 수 있도록 한다.

### 리소스 모델

Gateway API는 세 가지 stable한 API를 가지고 있다.

#### **GatewayClass**
공통 구성으로 관리되는 `Gateway`의 집합을 정의한다. `Gateway`는 여러 컨트롤러에 의해 구현될 수 있으며, `Gateway`는 클래스를 구현하는 컨트롤러의 이름이 포함된 `GatewayClass`를 참조해야 한다. 클러스터에서 로드밸런서를 만들기 위한 템플릿인 클러스터 범위에 한정되는 리소스를 정의하게 된다.

#### **Gateway**
로드 밸런서가 트래픽을 수신하는 위치와 방법을 로드밸런서와 같은 인스턴스 형태로 정의한다. 클러스터 운영자는 `GatewayClass`를 기반으로 클러스터에 `Gateway`를 생성한다. 

#### **HTTPRoute**
`Gateway`에서 쿠버네티스 서비스로 요청을 라우팅하기 위한 HTTP 프로토콜별 규칙을 정의한다. 새 `HTTPRoute`를 정의하면 클라우드 기반 로드밸런서 또는 클러스터 내 프록시 서버에서 추가 트래픽 경로를 구성할 수 있다. 예를 들면, 특정 네임스페이스에서 다른 네임스페이스의 특정 서비스로 다시 라우팅을 할 수 있는 것이다.

## AWS Gateway API Controller 

[https://www.gateway-api-controller.eks.aws.dev/latest/](https://www.gateway-api-controller.eks.aws.dev/latest/)

VPC Lattice 가 GA되면서, Kubernetes Gateway API의 구현체인 AWS Gateway API Controller를 소개되었다. AWS Gateway API Controller는 Gateway API에 의해 정의된 사용자 정의 리소스를 확장하여 Kubernetes API를 사용하여 VPC Lattice 리소스를 생성할 수 있도록 하는 도구이다.

클러스터에 설치를 하게 되면, 컨트롤러는 게이트웨이 및 경로와 같은 Gateway API 리소스의 생성 여부를 감시하고 해당 Amazon VPC Lattice 객체를 프로비저닝한다. 이를 통해 사용자는 사용자 정의 코드를 작성하거나 사이드카 프록시를 관리할 필요 없이 Kubernetes API를 사용하여 VPC Lattice 서비스, VPC Lattice 서비스 네트워크 및 타겟 그룹을 구성할 수 있다.

AWS Gateway API Controller는 Amazon VPC Lattice와 통합되어 다음과 같은 기능을 제공한다.

- VPC 및 계정 간의 서비스 간 네트워크 연결을 원활하게 처리
- 여러 Kubernetes 클러스터에 걸쳐 VPC Lattice 서비스 디스커버리
- 서비스 간의 통신을 보호하기 위한 방어 심층(defense-in-depth) 전략 구현
- 서비스 간의 요청/응답 트래픽을 관찰

Kubernetes Gateway API와 통합하면 개발자가 기본 네트워킹 인프라를 관리하는 데 필요한 수고 없이 서비스를 생성하고 네트워크 라우팅 및 트래픽 동작을 관리할 수 있는 Kubernetes 네이티브 경험을 제공받을 수 있다. Kubernetes API 및 Kubernetes `networking.k8s.io` 스펙에 의해 정의된 사용자 정의 리소스 정의(CRD)를 사용하여 Kubernetes 서비스 관련 리소스로 작업을 진행할 수 있다. 

## Components

VPC Lattice의 목표는 여러 VPC에 걸친 모든 서비스의 단일 포괄적 서비스 뷰를 제공하는 것이다. 이 뷰를 구성하는 구성 요소는 다음과 같다.

**서비스(Service)**
![https://www.gateway-api-controller.eks.aws.dev/latest/images/service.png](https://www.gateway-api-controller.eks.aws.dev/latest/images/service.png)

특정 작업이나 기능을 제공하는 독립적으로 배포 가능한 소프트웨어 단위이다. 서비스는 EC2 인스턴스나 ECS 컨테이너에서 실행되거나 Lambda 함수로 실행될 수 있으며, 하나의 어카운트 또는 VPC 내에서 실행된다. Target Group, Listener, Rule로 구성된다.


**서비스 네트워크(Service Network)**
![https://www.gateway-api-controller.eks.aws.dev/latest/images/service-network.png](https://www.gateway-api-controller.eks.aws.dev/latest/images/service-network.png)

서비스 모음의 논리적 경계이다. 클라이언트는 서비스 네트워크와 연결된 VPC에 배포된 리소스이다. 동일한 서비스 네트워크와 연결된 클라이언트와 서비스는 권한이 부여된 경우 서로 통신할 수 있다.

**서비스 디렉토리(Service Directory)**

AWS Resource Access Manager(AWS RAM)를 통해 계정과 공유되는 모든 VPC Lattice 서비스를 중앙에서 등록한다.

**인증 정책(Auth Policies)**

서비스에 대한 액세스를 정의하는 세밀한 권한 부여 정책이다. 개별 서비스나 서비스 네트워크에 별도의 인증 정책을 첨부할 수 있다. 예를 들어, EC2 인스턴스의 auto scaling 그룹에서 실행되는 특정 서비스가 AWS Lambda에서 실행되는 서비스와 상호작용하는 방식을 정의하는 정책을 생성할 수 있다.

## VPC Lattice와 Kubernetes 간의 관계

VPC Lattice 오브젝트가 Kubernetes 게이트웨이 API 오브젝트에 매핑되는 내용을 보여준다.

![https://www.gateway-api-controller.eks.aws.dev/latest/images/fundamentals-mapping.png](https://www.gateway-api-controller.eks.aws.dev/latest/images/fundamentals-mapping.png)

`Gateway`, `HTTPRoute` 및 `Service`를 생성하는 데는 Kubernetes Gateway API가 사용되지만, Kubernetes는 이러한 항목의 상세한 정보를 VPC Lattice에서 가져온다.

- **인프라 제공자**: VPC Lattice를 GatewayClass로 식별하는 Kubernetes `GatewayClass` 생성
- **클러스터 운영자**: Kubernetes `Gateway` 생성을 통해 VPC Lattice로부터 서비스 게이트웨이 및 서비스 네트워크와 관련된 정보를 가져옴
- **애플리케이션 개발자**: 특정 파드로 향하는 Kubernetes 서비스를 가리키는 `HTTPRoute` 객체 생성

## AWS Gateway API Controller 설치

### Prerequisites

- **[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html)**
- **[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)**
- **[helm](https://helm.sh/docs/intro/install/)**
- **[eksctl](https://docs.aws.amazon.com/eks/latest/userguide/setting-up.html)**
- **[jq](https://jqlang.github.io/jq/)**
- **EKS Cluster**

### VPC Lattice로부터 트래픽 허용

보안 그룹을 설정하여 VPC 래티스와 통신하는 모든 파드가 VPC 래티스 관리 접두사 목록의 트래픽을 허용하도록 허용해야 한다. 자세한 내용은 보안 그룹을 사용하여 리소스에 대한 트래픽 제어를 참고한다. Lattice는 IPv4와 IPv6 접두사 목록을 모두 사용할 수 있다.

VPC 래티스 네트워크에서 트래픽을 수신하도록 EKS 노드의 보안 그룹을 구성한다. 

1. 사용중인 클러스터의 보안 그룹 확인

```bash
$ CLUSTER_SG=$(aws eks describe-cluster --name $CLUSTER_NAME --output json| jq -r '.cluster.resourcesVpcConfig.clusterSecurityGroupId')

$ PREFIX_LIST_ID=$(aws ec2 describe-managed-prefix-lists --query "PrefixLists[?PrefixListName=="\'com.amazonaws.$AWS_REGION.vpc-lattice\'"].PrefixListId" | jq -r '.[]')

$ aws ec2 authorize-security-group-ingress --group-id $CLUSTER_SG --ip-permissions "PrefixListIds=[{PrefixListId=${PREFIX_LIST_ID}}],IpProtocol=-1"

$ PREFIX_LIST_ID_IPV6=$(aws ec2 describe-managed-prefix-lists --query "PrefixLists[?PrefixListName=="\'com.amazonaws.$AWS_REGION.ipv6.vpc-lattice\'"].PrefixListId" | jq -r '.[]')

$ aws ec2 authorize-security-group-ingress --group-id $CLUSTER_SG --ip-permissions "PrefixListIds=[{PrefixListId=${PREFIX_LIST_ID_IPV6}}],IpProtocol=-1"
```


2. IAM 권한 설정

AWS Gateway API Controller는 작동하기 위해 필요한 권한을 가져야 한다. Gateway API를 호출할 수 있는 다음 내용을 포함하는 IAM에서 정책을 생성하고, 나중에 사용할 수 있도록 정책 ARN을 복사한다.

```bash
$ curl https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/recommended-inline-policy.json  -o recommended-inline-policy.json

$ aws iam create-policy \
    --policy-name VPCLatticeControllerIAMPolicy \
    --policy-document file://recommended-inline-policy.json

$ export VPCLatticeControllerIAMPolicyArn=$(aws iam list-policies --query 'Policies[?PolicyName==`VPCLatticeControllerIAMPolicy`].Arn' --output text)
```
aws-application-networking-system 네임스페이스를 생성한다.

```bash
kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/deploy-namesystem.yaml
```

컨트롤러 권한을 설정하기 위해 IRSA 구성을 진행한다. IAM OIDC provider를 생성한다. 이미 구성되어 있으면 다음 단계로 넘어간다.

```bash
$ eksctl utils associate-iam-oidc-provider --cluster $CLUSTER_NAME --approve --region $AWS_REGION
2024-10-12 15:25:45 [ℹ]  IAM Open ID Connect provider is already associated with cluster "app-signals-demo" in "ap-northeast-2"
```

`gateway-api-controller` 서비스 어카운트를 생성한다. 

```bash
eksctl create iamserviceaccount \
    --cluster=$CLUSTER_NAME \
    --namespace=aws-application-networking-system \
    --name=gateway-api-controller \
    --attach-policy-arn=$VPCLatticeControllerIAMPolicyArn \
    --override-existing-serviceaccounts \
    --region $AWS_REGION \
    --approve
```

### Controller 설치

24년 10월 기준 `1.0.6` 버전으로 설치를 진행한다.

```bash
kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/deploy-v1.0.6.yaml
```

`amazon-vpc-lattice` GatewayClass를 생성한다.

```bash
$ kubectl apply -f https://raw.githubusercontent.com/aws/aws-application-networking-k8s/main/files/controller-installation/gatewayclass.yaml

$ kubectl get GatewayClass -o yaml
apiVersion: v1
items:
- apiVersion: gateway.networking.k8s.io/v1beta1
  kind: GatewayClass
  metadata:
    annotations:
      kubectl.kubernetes.io/last-applied-configuration: |
        {"apiVersion":"gateway.networking.k8s.io/v1beta1","kind":"GatewayClass","metadata":{"annotations":{},"name":"amazon-vpc-lattice"},"spec":{"controllerName":"application-networking.k8s.aws/gateway-api-controller"}}
    creationTimestamp: "2024-10-12T15:37:27Z"
    generation: 1
    name: amazon-vpc-lattice
    resourceVersion: "1626753"
    uid: 2c026d8a-d5dc-4aa8-8ef3-6c5e604dffef
  spec:
    controllerName: application-networking.k8s.aws/gateway-api-controller
  status:
    conditions:
    - lastTransitionTime: "2024-10-12T15:37:27Z"
      message: Accepted
      observedGeneration: 1
      reason: Accepted
      status: "True"
      type: Accepted
kind: List
metadata:
  resourceVersion: ""
```

### 서비스 연동 테스트를 위한 데모 

이 예에서는 단일 VPC에 단일 클러스터를 생성한 다음, 2개의 HTTPRoutes(`rates` 및 `inventory`)와 3개의 kubetnetes 서비스(`parking`, `review` 및 `inventory-1`)를 구성한다.

![https://www.gateway-api-controller.eks.aws.dev/v1.0.6/images/example1.png](https://www.gateway-api-controller.eks.aws.dev/v1.0.6/images/example1.png)


```bash
$ git clone https://github.com/aws/aws-application-networking-k8s.git
$ cd aws-application-networking-k8s

$ aws vpc-lattice create-service-network --name my-hotel

$ SERVICE_NETWORK_ID=$(aws vpc-lattice list-service-networks --query "items[?name=="\'my-hotel\'"].id" | jq -r '.[]')

$ CLUSTER_VPC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME | jq -r .cluster.resourcesVpcConfig.vpcId)

$ aws vpc-lattice create-service-network-vpc-association --service-network-identifier $SERVICE_NETWORK_ID --vpc-identifier $CLUSTER_VPC_ID
```

위에서 생성한 서비스 네트워크가 VPC 연결 상태가 `ACTIVE` 상태인지 확인하여 새 VPC의 트래픽을 받아들일 준비가 되었는지 확인한다.

```
aws vpc-lattice list-service-network-vpc-associations --vpc-id $CLUSTER_VPC_ID
```

AWS 콘솔에서도 다음과 같이 association 된 VPC를 확인할 수 있다. 

![lattice](/img/latticesvc.png)

```
kubectl apply -f files/examples/my-hotel-gateway.yaml
```
my-hotel Gateway가 `PROGRAMMED` status가 True로 생성되었는지 확인한다. [GatewayConditionReason](https://gateway-api.sigs.k8s.io/reference/spec/#gateway.networking.k8s.io%2fv1.GatewayConditionReason) API 스펙을 확인해보면 `PROGRAMMED` 조건은 게이트웨이가 기본 데이터 플레인에서 곧 준비될 것으로 가정되는 구성을 생성했는지 여부를 나타낸다. AWS Lattice에서는 서비스가 정상적으로 생성되어 존재하는지 여부를 나타내는 것으로 볼 수 있다. 

```bash
$ kubectl get gateway
NAME       CLASS                ADDRESS   PROGRAMMED   AGE
my-hotel   amazon-vpc-lattice             True         2m15s
```

HTTPRoute `rates`와  `parking`, `review` 서비스, 디플로이먼트를 생성한다.

```bash
$ kubectl apply -f files/examples/parking.yaml
deployment.apps/parking created
service/parking created

$ kubectl apply -f files/examples/review.yaml
deployment.apps/review created
service/review created

$ kubectl apply -f files/examples/rate-route-path.yaml
httproute.gateway.networking.k8s.io/rates created
```

HTTPRoute `inventory`와 서비스, 디플로이먼트를 생성한다. 

```bash
$ kubectl apply -f files/examples/inventory-ver1.yaml
deployment.apps/inventory-ver1 created
service/inventory-ver1 created

$ kubectl apply -f files/examples/inventory-route.yaml
httproute.gateway.networking.k8s.io/inventory created
```


HTTPRoute `inventory` 및 `rates`에 대한 VPC Lattice에서 생성된 DNS 주소를 리소스와 콘솔에서 확인할 수 있다. 


```yaml
apiVersion: v1
items:
- apiVersion: gateway.networking.k8s.io/v1beta1
  kind: HTTPRoute
  metadata:
    annotations:
      application-networking.k8s.aws/lattice-assigned-domain-name: rates-default-0d36689e1599f2ed2.7d67968.vpc-lattice-svcs.ap-northeast-2.on.aws
    name: rates
    namespace: default
```
```yaml
- apiVersion: gateway.networking.k8s.io/v1beta1
  kind: HTTPRoute
  metadata:
    annotations:
      application-networking.k8s.aws/lattice-assigned-domain-name: rates-default-0d36689e1599f2ed2.7d67968.vpc-lattice-svcs.ap-northeast-2.on.aws
    name: inventory
    namespace: default
```

![lattice2](/img/latticesvc2.png)

위에서 확인한 FQDN을 연결 테스트를 위해 변수로 저장한다.

```bash
ratesFQDN=$(kubectl get httproute rates -o json | jq -r '.metadata.annotations."application-networking.k8s.aws/lattice-assigned-domain-name"')

inventoryFQDN=$(kubectl get httproute inventory -o json | jq -r '.metadata.annotations."application-networking.k8s.aws/lattice-assigned-domain-name"')
```

서비스와 서비스간 연결 확인을 위해 각 서비스에서 위에서 저장한 FQDN으로 curl 명령을 실행해보면 정상적으로 통신되는것을 확인해볼수 있다. 

```bash
$ kubectl exec deploy/inventory-ver1 -- curl -s $ratesFQDN/parking $ratesFQDN/review
Requsting to Pod(parking-7c89b6b67c-65grb): parking handler pod
Requsting to Pod(review-5846dd8dcc-jmmx6): review handler pod

$ kubectl exec deploy/parking -- curl -s $inventoryFQDN
Requsting to Pod(inventory-ver1-55ff9bb45d-f6v7j): Inventory-ver1 handler pod
```


## 정리

Gateway API는 Kubernetes에서 네트워크 서비스를 제공하기 위해 설계된 여러 API를 모아놓은 것으로, 역할 지향적, 이식성, 표현력, 확장성의 특징을 가지고 있어서 다양한 조직이나 담당하는 업무에 따른 역할을 부여할 수 있는 기능을 제공한다. Gateway API는 세 가지 주요 리소스 모델인 `GatewayClass`, `Gateway`, `HTTPRoute`를 통해 클러스터 내에서 트래픽을 효과적으로 관리할 수 있도록 한다. AWS Gateway API Controller는 이러한 Gateway API를 확장하여 VPC Lattice 리소스를 생성하고 관리할 수 있는 도구로, 클러스터에 설치하면 자동으로 Gateway API 리소스를 감시하고 Amazon VPC Lattice 객체로 프로비저닝한다. 실제 서비스 연동 테스트를 위한 데모를 통해 Gateway API와 VPC Lattice의 연동도 간단하게 수행해봤다. 

추가적으로 네임스페이스, 클러스터를 넘어서 연결성을 확보할 수도 있고, 다른 어카운트에 Gateway 리소스를 AWS Resource Access Manager을 통해서 공유하는것도 가능하다. 자세한 내용은 [공식 깃헙](https://github.com/aws/aws-application-networking-k8s)과 [공식 가이드 문서](https://www.gateway-api-controller.eks.aws.dev/latest/)에서도 확인할 수 있다.


> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.