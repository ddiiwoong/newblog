---
layout: single
title: "Advanced Argo Rollout"
comments: true
classes: wide
description: "argo-rollout의 세부적인 전략을 알아보고 다양한 notification을 설정한다."
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/argo-rollout-advanced/
date: 2023-03-25
categories:
  - Kubernetes
tags:
  - Kubernetes
  - kOps
  - argo
  - argo-rollout
  - notification
  - grafana
  - slack
---

kOps 환경에 구축한 ArgoCD와 Argo Rollout를 좀더 잘 쓰기 위한 몇가지 내용들을 간단하게 기록용으로 작성하였다.

## GitOps

간단하게만 정리하면, GitOps는 Git 리포지토리를 단일 정보 소스(SSOT,Single Source Of Truth)로 사용하여 인프라를 코드로 제공하는 것이다. GitOps는 인프라 구성을 위해 Git을 버전 제어 시스템으로 사용하는 코드형 인프라 (IaC) 가 진화한 것이라고 생각하면 된다. IaC는 원하는 시스템 상태를 정의하고 시스템의 실제 상태를 추적하여 인프라 관리에 대한 선언적 접근 방식을 따르는 경우가 많다. 그래서 배포에 관련된 모든 것을 선언형 기술서로 작성한다음 Config 레포지토리에서 저장을 하고, 해당 정보와 실제 배포된 환경간의 상태 차이가 발생하지 않도록 유지하는 것을 GitOps 업무 패턴이라고 할 수 있다. 

또한 개발자에게 익숙한 Git 기반 워크플로우를 사용하여 애플리케이션 개발에서 배포, 애플리케이션 라이프사이클 관리, 인프라 구성에 이르는 기존 프로세스를 기반으로 확장을 할 수 있다. 애플리케이션 라이프사이클 전반에 걸쳐 모든 변경 사항이 Git 리포지토리에서 추적되고, GitOps는 이러한 변경 사항을 자동으로 인프라에 적용하는 것을 말한다. 

이처럼 GitOps의 장점중에 가장 중요한 부분은 신뢰할 수 있는 정보가 공유되고, 인프라 구성하는 모든 변경 사항에 대한 추적과 관리가 가능해진다는 점일 것이다.

<!--truncate-->

## ArgoCD, Argo Rollouts

ArgoCD는 위에서 이야기한 것처럼 쿠버네티스 리소스와 Git에 저장된 선언형 기술서(manifest)를 동일하게 유지시켜 주고 CD환경을 구성할 수 있는 GitOps 구현체 오픈소스이다. 즉, GitOps 패턴을 따라 Git 저장소를 사용하여 애플리케이션 배포를 관리할 수 있는 도구이다.

롤아웃은 쿠버네티스 환경에서 새로운 버전의 애플리케이션을 배포할 때 이전 버전의 애플리케이션과 새로운 버전의 애플리케이션을 조절하고 사용자에게 무중단으로 서비스를 제공할 수 있도록 하는 것을 말한다.

Argo Rollouts는 쿠버네티스에서 롤아웃 관리를 위한 오픈소스 도구 중 하나이다. 쿠버네티스의 서비스 메시 및 인그레스 컨트롤러와 통합하여 트래픽을 새 버전으로 점진적으로 이동시키는 기능을 제공한다. 쿠버네티스의 커스텀 리소스 정의(CRD)를 사용하여 블루-그린 배포, 카나리 배포, 카나리 분석 등의 형태로 정의하고, 거의(?) 무중단으로 새로운 버전의 애플리케이션을 배포할 수 있게 한다. 새로운 버전의 애플리케이션이 제대로 작동하지 않을 경우, 롤백을 수행하여 이전 버전의 애플리케이션으로 빠른 시간내에 되돌릴 수 있다.

## Argo Rollout Specification

Argo Rollout Specification은 Argo Rollouts 도구에서 사용하는 롤아웃 전략을 정의하는 YAML 파일을 말한다. 각각의 애플리케이션에 맞게 작성되어야 하고 Kubernetes API를 기반으로 구성되며, 롤아웃 전략의 모든 내용을 포함하여 작성하게 된다. 

Argo Rollout Specification 파일은 다음과 같은 내용을 포함한다.

1. 롤아웃 전략: Canary, Blue-Green, AB Testing 등 다양한 롤아웃 전략
2. 배포 전략: 롤아웃 속도, 배포 시간 등의 새로운 버전의 애플리케이션을 배포하는 방법을 정의
3. 서비스 설정: 롤아웃 중에 사용할 서비스를 정의
4. 롤아웃 이력: 이전 롤아웃 이력을 추적하고 검색

Blue-Green 전략은 두 개의 버전의 애플리케이션을 동시에 유지하면서, 사용자 트래픽을 새로운 버전으로 전환하는 전략으로 이전 버전은 Blue 환경이라고 하고, 새로운 버전은 Green 환경이라고 말한다. Blue-Green 배포 전략은 롤백이 매우 쉬우며, 사용자 트래픽의 전환도 매우 빠르게 수행된다. 따라서, 많은 기업에서 Blue-Green 배포 전략을 사용하여 새로운 버전의 애플리케이션을 롤아웃하고 있고 일반적인 방식이라 보면 된다.

다음은 Argo Rollout에서 Blue-Green 배포 전략을 정의하는 YAML 파일의 예시이다.  

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  strategy:
    blueGreen:
      activeService: myapp-green
      previewService: myapp-blue
      autoPromotionEnabled: true
      # autoPromotionSeconds: *int32  
  template:
    spec:
      containers:
        - name: myapp
          image: myapp:v2
  selector:
    matchLabels:
      app: myapp
```

- `activeService`: Green 환경에 배포된 애플리케이션에 대한 서비스 이름으로 Blue-Green 전략에서는 필수 필드
- `previewService`: Blue 환경에 배포된 애플리케이션에 대한 서비스 이름으로 Blue-Green 전략에서는 optional 필드
- `autoPromotionEnabled`: 롤아웃이 완료된 후, 자동으로 Green 환경으로 전환할지 여부
- `template`: 새로운 버전의 애플리케이션을 정의
- `selector`: 롤아웃 중인 애플리케이션을 선택하기 위한 레이블 셀렉터
- `autoPromotionSeconds`: Rollout 이 일시 정지 상태에 들어간 이후 해당 필드 설정 시간이 지난후 자동으로 새로운 ReplicaSet을 활성 서비스로 자동으로 promote 하는 옵션이다.AutoPromotionEnabled 필드가 True로 설정되면이 필드는 무시된다.

anti-affinity는 다른 노드 간의 Pod 분산을 위해 사용되고, pod anti-affinity는 동일한 물리적 호스트에서 실행되는 여러 Pod 간의 분산을 위해 사용되는 방법이다. 

anti-affinity struct를 Blue-Green 또는 Canary 전략에 추가할 수 있다. 여러 노드에 애플리케이션을 배포할 때, 동일한 파드들이 하나의 노드에 모이지 않도록 하는 전략이다. 이를 통해 단일 노드 장애로부터 애플리케이션을 보호할 수 있다. 아래의 예시는 새 버전은 독립된 scaled 노드로 배치하는 하고 특정 zone에만 배치하는 전략이다.

```yaml
spec:
  strategy:
    blueGreen:
      antiAffinity:  
        requiredDuringSchedulingIgnoredDuringExecution:  
          nodeSelectorTerms:  
          - matchExpressions:  
              - key: topology.kubernetes.io/zone  
              operator: In  
              values:  
              - ap-northeast-2a
```

아래 예시는 podAntiAffinity 필드를 사용하여 anti-affinity 전략을 설정하는데 `requiredDuringSchedulingIgnoredDuringExecution`를 사용하여 노드 스케줄링 중에 이전 파드와 동일한 노드에 배치하지 않도록 필요한 설정을 지정하는 전략이다. 

```yaml
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - myapp
            topologyKey: "kubernetes.io/hostname"
```

## Argo Rollouts Notification

https://argoproj.github.io/argo-rollouts/features/notifications/

Argo Rollouts Notification은 롤아웃 이벤트에 대한 알림 메시지를 Slack, Email, Webhook 등 다양한 방법으로 전송할 수 있다. 이를 통해 롤아웃 이벤트에 대한 모니터링 및 대응이 가능해진다.  

해당 기능은 1.1.0 이상 버전의 Rollout을 구성해야만 Notification 기능을 사용할 수 있다.  

구성된 환경에 추가적으로 Argo Rollouts Notification 리소스를 생성하고, 해당 리소스에서 각 통합 서비스에 대한 설정을 작성한다. 이렇게 작성된 설정을 통해 롤아웃 이벤트가 발생할 때 마다, 해당 설정에 따라 알림 메시지가 전송되는 구조이다.  

알림 처리를 담당하는 Argo CD Notification 컨트롤러를 설치한다.  
```sh
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

같은 네임스페이스, 기본 구성되는 argo-rollouts 내의 ConfigMap을 참조하게 된다. 다음 명령을 실행하면 `argo-rollouts` 네임스페이스에 `argo-rollouts-notification-configmap`라는 이름의 ConfigMap이 만들어지게 되고, 이 ConfigMap에는 다음과 같은 트리거와 템플릿을 담겨 있으며 필요시 Custom 트리거와 템플릿을 추가할 수 있다. argo-rollouts pod는 정의된 트리거를 감지하면 트리거와 링크되어 있는 템플릿으로 메시지를 구성하여 알림을 발송하게 된다.  
```sh
kubectl apply -n argo-rollouts -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/manifests/notifications-install.yaml
```

## Slack 연동

Slack에서 다음과 같은 권한으로 Oauth 설정을 하고 생성된 access token을 Secret으로 저장한다.  

![argo-secret](/img/argo-secret.png)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: argo-rollouts-notification-secret
stringData:
  slack-token: <Oauth-access-token>
```

위에서 설정한 Oauth Secret을 위에서 구성한  ConfigMap에 추가한다. 

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argo-rollouts-notification-configmap
data:
  service.slack: |
    token: $slack-token
...
```

### Templates

알림 템플릿은 알림 콘텐츠를 생성하는 상태 비저장 함수이다. 이 템플릿은 html/template golang 패키지를 활용한다. 템플릿은 재사용할 수 있으며 여러 트리거에서 참조할 수 있다.

```yaml
...
data:
  template.rollout-completed: |
    message: Rollout {{.rollout.metadata.name}} has been completed.
    email:
      subject: Rollout {{.rollout.metadata.name}} has been completed.
    slack:
      attachments: |
          [{
            "title": "{{ .rollout.metadata.name}}",
            "color": "#18be52",
            "fields": [
            {
              "title": "Strategy",
              "value": "{{if .rollout.spec.strategy.blueGreen}}BlueGreen{{end}}{{if .rollout.spec.strategy.canary}}Canary{{end}}",
              "short": true
            }
            {{range $index, $c := .rollout.spec.template.spec.containers}}
              {{if not $index}},{{end}}
              {{if $index}},{{end}}
              {
                "title": "{{$c.name}}",
                "value": "{{$c.image}}",
                "short": true
              }
            {{end}}
            ]
          }]
```

이외의 다른 여러가지 템플릿 구성은 [https://github.com/argoproj/argo-rollouts/tree/master/manifests/notifications](https://github.com/argoproj/argo-rollouts/tree/master/manifests/notifications) 에서 확인할 수 있다.  

### Triggers

트리거 되는 경우에 어떤 template으로 보낼지 지정하는 구문이다. 아래 예시는 위에서 정한 template 이름인 `rollout-completed`를 보낸다는 설정이다.

```yaml
...
data:
  trigger.on-rollout-completed: |
    - send: [rollout-completed]

```

## Rollout template에 notification annotation 추가

신규로 생성하거나 기존의 Rollout 리소스에 notification annotation를 추가해야 관련된 rollout 이벤트가 발생하면 위에 설정한 슬랙의 `my_channel`로 alert를 보내게 된다.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
  annotations:
    notifications.argoproj.io/subscribe.on-scaling-replica-set.slack: my_channel
spec:
  strategy:
    blueGreen:
      activeService: myapp-green
      previewService: myapp-blue
      autoPromotionEnabled: true
  template:
    spec:
      containers:
        - name: myapp
          image: myapp:v2
  selector:
    matchLabels:
      app: myapp
```

## Grafana로 Rollout notification 받기

추가적으로 Grafana annotation api([https://grafana.com/docs/grafana/latest/http_api/annotations/](https://grafana.com/docs/grafana/latest/http_api/annotations/))를 활용하여 rollout 관련 이벤트 발생시 해당 시점의 이벤트 정보를 Grafana 시계열 차트에 자동으로 등록을 하는 방식으로 메트릭 기반으로 배포 전후 상태를 관측할 수 있도록 구성하는것이 목적이다.

Slack과 동일한 방식으로 grafana에서 발급한 API Key를 Secret에 등록한다.  

```yaml
apiVersion: v1  
kind: Secret  
metadata:  
  name: argo-rollouts-notification-secret  
stringData:  
  grafana-api-key: {{grafana-api-key}}
type: Opaque
```

기존 ConfigMap에 grafana API 엔드포인트와 위에서 설정한 apiKey를 설정한다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argo-rollouts-notification-configmap
data:
  service.grafana: |                                                
    apiUrl: http://prometheus-grafana.prometheus.svc.cluster.local/api
    apiKey: $grafana-api-key
  service.slack: |
    token: $slack-token
...
```

기존 rollout 에 위에 선언한 grafana에 알림 전달을 위한 annotatinos을 추가한다.  

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
  annotations:
    notifications.argoproj.io/subscribe.on-analysis-run-running.grafana: analysis-run  
    notifications.argoproj.io/subscribe.on-app-sync-status.grafana: appsync  
    notifications.argoproj.io/subscribe.on-rollout-completed.grafana: rollout  
    notifications.argoproj.io/subscribe.on-scaling-replica-set.grafana: scalling
...
```

Grafana 설정으로 이동해서 아래 그림과 같이 Settings - Annotation 메뉴로 이동하여 Query - Filter by 항목을 Tag로 변경하고 설정을 저장한다  

![rollout](/img/grafana-annotation.png)

이후 Rollout에 변경 이벤트가 발생하면 아래 그림과 같이 해당 시점에 annotation이 표기되는것을 확인할 수 있다. 이를 통해 특정 배포 버전에 대한 전,후 비교가 가능해진다.  

![grafana](/img/rollout-annotation.png)


## 정리

이번 3주차 스터디에는 구성된 환경에 Argo CD, Argo Rollout을 구성하는 테스트를 진행했고, 이번 포스팅에서는 Argo Rollout Notification을 통해 운영자가 Rollout 이벤트가 다양한 이벤트가 발생했을때 Slack으로 알림을 받아보거나 자동으로 Grafana 대시보드 상에 annotation을 표기하는 실습을 진행했다.

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 자료로 활용할 예정입니다.
