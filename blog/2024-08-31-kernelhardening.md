---
layout: single
title: "커널 강화 도구 사용하기"
comments: true
classes: wide
description: "AppArmor와 seccomp를 사용한 커널 강화"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: kubernetes/kernelhardening/
date: 2024-08-31
categories:
  - Kubernetes
tags:
  - Kubernetes
  - AppArmor
  - seccomp
  - security
  - CKS
---

# 커널 강화 도구 사용
컨테이너 내부에서 실행 중인 애플리케이션이나 프로세스는 시스템 호출(system call)을 수행할 수 있다. 대표적인 예로 HTTP 요청을 수행하는 curl 명령을 들 수 있다. 시스템 호출은 커널에 서비스를 요청하기 위해 사용자 공간에서 실행되는 추상화된 프로그래밍인데, 커널 강화 도구를 사용하여 허용되는 시스템 호출을 제한할 수 있으며, CKS 시험에서는 AppArmor와 seccomp라는 두 가지 도구를 명시적으로 언급하고 있다. 이 두 도구는 컨테이너화된 환경에서 보안을 강화하는 데 중요한 역할을 하며, Kubernetes와의 통합을 통해 보다 안전한 클러스터 운영을 지원한다. 이 두 도구와 쿠버네티스와 통합하는 메커니즘에 대해 설명한다.

## AppArmor
[AppArmor](https://apparmor.net/)는 Linux 시스템에서 실행되는 프로그램에 대한 액세스 제어 기능을 제공한다. AppArmor는 경로 기반으로 작동하며, 프로필을 통해 특정 프로그램이나 컨테이너가 필요한 접근만 허용하도록 설정할 수 있다. Kubernetes에서는 AppArmor 프로필을 Pod 또는 컨테이너 수준에서 지정할 수 있으며, securityContext를 통해 적용한다. 이 도구는 user space에서 호출되는 애플리케이션과 기본 시스템 기능 사이에 추가적인 보안 계층을 구현한다. 네트워크 호출 또는 파일 시스템 상호 작용을 제한할 수 있다. 많은 Linux 배포판(예: Debian, Ubuntu, openSUSE)이 AppArmor를 기본으로 제공한다. AppArmor를 지원하지 않는 Amazon Linux와 같은 배포판은 AppArmor와 유사한 접근 방식을 취하는 [SELinux](https://en.wikipedia.org/wiki/Security-Enhanced_Linux)를 대신 사용할 수 있다.  

<!--truncate-->

### 프로파일(profile) 이해
프로그램이 수행할 수 있는 작업과 수행할 수 없는 작업을 정의하는 규칙은 AppArmor 프로필에 정의된다. 모든 프로필을 적용하려면 먼저 AppArmor에 로드해야 한다. AppArmor는 로드된 프로파일을 확인할 수 있는 명령줄 도구를 제공한다. `aa-status` 명령을 실행하면 로드된 모든 프로파일의 요약을 확인할 수 있다. AppArmor에는 Linux 서비스를 보호하기 위한 기본 애플리케이션 프로파일 세트가 이미 포함되어 있음을 확인할 수 있다.

```
$ sudo aa-status
apparmor module is loaded.
43 profiles are loaded.
41 profiles are in enforce mode.
   /snap/snapd/21759/usr/lib/snapd/snap-confine
   ...
2 profiles are in complain mode.
   snap.amazon-ssm-agent.amazon-ssm-agent
   snap.amazon-ssm-agent.ssm-cli
0 profiles are in kill mode.
0 profiles are in unconfined mode.
9 processes have profiles defined.
2 processes are in enforce mode.
   /usr/sbin/chronyd (429)
   /usr/sbin/chronyd (434)
7 processes are in complain mode.
   /snap/amazon-ssm-agent/7993/amazon-ssm-agent (104231) snap.amazon-ssm-agent.amazon-ssm-agent
   /snap/amazon-ssm-agent/7993/ssm-agent-worker (104261) snap.amazon-ssm-agent.amazon-ssm-agent
   /snap/amazon-ssm-agent/7993/ssm-session-worker (138449) snap.amazon-ssm-agent.amazon-ssm-agent
   /usr/bin/dash (138466) snap.amazon-ssm-agent.amazon-ssm-agent
   /usr/bin/sudo (138468) snap.amazon-ssm-agent.amazon-ssm-agent
   /usr/bin/sudo (138469) snap.amazon-ssm-agent.amazon-ssm-agent
   /usr/sbin/aa-status (138470) snap.amazon-ssm-agent.amazon-ssm-agent
0 processes are unconfined but have a profile defined.
0 processes are in mixed mode.
0 processes are in kill mode.
```
프로파일 모드는 일치하는 이벤트가 발생할 경우 런타임에 규칙의 처리를 결정한다. AppArmor는 두 가지 유형의 프로필 모드를 구분한다.

#### Enforce
시스템이 규칙을 적용하고 위반을 리포트하고 시스템 로그에 기록한다. 이 모드를 사용하면 프로그램이 특정 호출을 하지 못하도록 방지할 수 있다.

#### Complain
시스템에서 규칙을 적용하지는 않지만 위반 사항을 로그에 기록한다. 이 모드는 프로그램의 시스템 호출을 발견하려는 경우에 유용하다.

아래 프로파일은 파일 쓰기 액세스를 제한하기 위해 k8s-deny-write 파일에 사용자 지정 프로필을 정의하는 부분이다. 해당 파일은 워크로드를 실행하는 모든 워커 노드의 /etc/apparmor.d 디렉터리에 배치해야 한다. 자세한 문법은 [AppArmor](https://gitlab.com/apparmor/apparmor/-/wikis/QuickProfileLanguage) 위키를 참조하자.

```
#include <tunables/global>

profile k8s-deny-write flags=(attach_disconnected) { //profile 키워드 뒤의 식별자는 프로필의 이름이다.
  #include <abstractions/base> 
  file, //파일 작업에 적용한다.
  deny /** w, //모든 파일 쓰기를 거부한다.
}
```

### 사용자 지정 프로필 설정
AppArmor에 프로파일을 로드하려면 워커 노드에서 다음 명령을 실행한다.

```
sudo apparmor_parser /etc/apparmor.d/k8s-deny-write
```

해당 명령은 기본적으로 `Enforce` 모드를 사용한다. `Complain` 모드에서 프로파일을 로드하려면 -C 옵션을 사용한다. 다시 aa-status 명령을 수행하면 기본 프로필과 함께 프로필을 보여준다. `Enforce` 모드를 사용하는 것을 확인할 수 있다. 

```
$ sudo aa-status
apparmor module is loaded.
49 profiles are loaded.
45 profiles are in enforce mode.
   ...
   docker-default
   k8s-deny-write
   ...
```

AppArmor는 유틸리티 패키지의 일부로 추가 명령을 지원하는 도구를 설치 할 수 있다. 설치가 완료되면 aa-enforce 명령을 사용하여 `Enforce` 모드에서 프로필을 로드하고 aa-complain 명령을 사용하여 `Complain` 모드에서 프로필을 로드할 수 있다. 

```    
sudo apt-get update
sudo apt-get install apparmor-utils
```

### 컨테이너에 프로파일 적용하기
파드에 AppArmor 규칙을 적용하기 전에 다음과 같은 전제조건을 확인해야 한다. 
* 컨테이너 런타임 지원: AppArmor 규칙을 적용하려면 사용 중인 컨테이너 런타임이 AppArmor를 지원해야 한다. Docker와 같은 대부분의 현대적인 컨테이너 런타임은 AppArmor를 지원한다.
* 워커 노드에 AppArmor 설치: AppArmor가 제대로 작동하려면 파드를 실행하는 모든 워커 노드에 AppArmor가 설치되어 있어야 한다.
* 프로파일 로드 확인: AppArmor 프로파일이 시스템에 로드되어 있는지 확인해야 한다. 

컨테이너에 프로파일을 적용하려면 아래 예시 yaml 파일과 같이 특정 어노테이션을 설정해야 한다. 어노테이션 키는 `container.apparmor.security.beta. kubernetes.io/<컨테이너 이름>` 형식의 키를 사용해야 한다. 이 경우 컨테이너 이름은 `test`이다. 전체 키는 `container.apparmor.security.beta.kubernetes.io/test`이다. 어노테이션의 값은 localhost/<프로필 이름> 패턴을 따른다. 여기서 사용하려는 사용자 정의 프로파일은 k8s-deny-write이다. 구성 옵션에 대한 자세한 내용은 [쿠버네티스 문서](https://kubernetes.io/docs/tutorials/security/apparmor/)를 참조한다.

```
apiVersion: v1
kind: Pod
metadata:
  name: test-apparmor
  annotations:
    container.apparmor.security.beta.kubernetes.io/test: localhost/k8s-deny-write 
spec:
  containers:
  - name: test
    image: busybox:1.28
    command: ["sh", "-c", "echo 'Test AppArmor!' && sleep 100h"]
```

`kubectl apply` 명령을 실행하고 파드가 “`Running`” 상태로 전환될 때까지 기다린다:
```
$ kubectl apply -f apparmor.yaml
pod/test-apparmor created

$ kubectl get pod test-apparmor
NAME             READY   STATUS    RESTARTS   AGE
test-apparmor   1/1     Running   0          4s
```

이제 컨테이너에 셸을 넣고 파일 쓰기 작업을 수행할 수 있다.
```
$ kubectl exec -it test-apparmor -- /bin/sh
/ # touch test.txt
touch: test.txt: Permission denied
```
AppArmor는 컨테이너의 파일시스템에 파일을 쓰지 못하게 한다. 작업을 수행하려고 하면 “Permission denied”라는 메시지가 표시된다.

## Seccomp 사용
Seccomp는 Linux 커널의 보안 기능으로, "Secure Computing Mode"의 줄임말이다. seccomp는 user space에서 커널로의 호출을 제한할 수 있는 또 다른 Linux 커널 기능이다. seccomp 프로파일에 시스템 호출과 그 인수를 제한하는 규칙을 정의하게 된다. seccomp를 사용하면 Linux 커널 취약점을 악용할 위험을 줄일 수 있다. Kubernetes에서는 seccomp 프로필을 Pod의 securityContext를 통해 적용할 수 있고, 기본적으로 RuntimeDefault 프로필을 사용하여 보안 민감도가 높은 시스템 호출을 차단할 수 있다. 쿠버네티스의 seccomp에 대한 자세한 내용은 [쿠버네티스 문서](https://kubernetes.io/docs/tutorials/security/seccomp/)를 참조한다.

### 컨테이너에 기본 컨테이너 런타임 프로파일 적용하기
도커 엔진이나 컨테이너와 같은 컨테이너 런타임은 기본 seccomp 프로파일과 함께 제공된다. 기본 seccomp 프로파일은 애플리케이션에서 가장 일반적으로 사용되는 `syscalls`을 허용하는 동시에 위험하다고 간주되는 `syscalls`의 사용을 금지한다. 쿠버네티스는 파드를 생성할 때 기본 컨테이너 런타임 프로파일을 컨테이너에 적용하지 않지만, SeccompDefault [feature gate](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)를 사용하여 이를 활성화할 수 있다. 또는 `spec.securityContext.seccompProfile`을 사용하여 seccomp 프로파일 유형을 `RuntimeDefault`로 설정하여 파드 단위로 이 기능을 선택할 수 있다. 

```
apiVersion: v1 
kind: Pod 
metadata:
  name: test-seccomp
spec:
  securityContext: 
    seccompProfile:
      type: RuntimeDefault 
  containers:
  - name: test
    image: busybox:1.28
    command: ["sh", "-c", "echo 'Test seccomp!' && sleep 100h"]
```

기본 컨테이너 런타임 프로파일을 적용한다. `kubectl apply` 명령을 사용하여 파드를 시작한다.

```
$ kubectl apply -f seccomp.yaml
pod/test-seccomp created

$ kubectl get pod test-seccomp
NAME            READY   STATUS      RESTARTS   AGE
hello-seccomp   1/1     Running     0          4s
```

컨테이너에서 실행되는 `echo` 명령은 기본 seccomp 프로파일에 의해 보안 관점에서 문제가 없는 것으로 본다.

```
$ kubectl logs hello-seccomp
Test seccomp!
```

`RuntimeDefault`로 `syscalls`이 허용되었고 그 결과 표준 출력에 "Test seccomp!”라는 메시지를 볼 수 있다.

### 사용자 지정 프로필 설정
기본 컨테이너 런타임 프로파일 외에 사용자 정의 프로파일을 생성하고 설정할 수 있다. 이러한 파일의 표준 디렉터리는 `/var/lib/kubelet/seccomp`이다. 사용자 정의 프로파일은 하위 디렉터리 프로파일에 구성한다. 디렉터리가 없는 경우 디렉터리를 생성한다.

```
    sudo mkdir -p /var/lib/kubelet/seccomp/profiles
```

프로필 디렉터리에 있는 violation.json 파일에 사용자 정의 프로필을 생성한다. 

```
{
    "defaultAction": "SCMP_ACT_ALLOW",
    "architectures": [
        "SCMP_ARCH_X86_64",
        "SCMP_ARCH_X86",
        "SCMP_ARCH_X32"
    ],
    "syscalls": [
        {
            "names": [
                "mkdir"
            ],
            "action": "SCMP_ACT_ERRNO"
        }
    ]
}
```

간단히 말해서, 이 규칙 세트는 mkdir의 사용을 허용하지 않는다. 아래 규칙은 모든 `syscalls`을 허용하고, `syscalls` 리스트에 특별히 정의된 것만 거부하는 블랙리스트 방식이다. 반대로 화이트리스트 방식은 `syscalls`에 `SCMP_ACT_ALLOW`, `SCMP_ACT_ERRNO` 위치를 바꿔서 사용하면 된다. 

기본 조치는 모든 시스템 호출에 적용된다. 여기서는 블랙리스트 방식으로 `SCMP_ACT_ALLOW`를 사용하는 모든 시스템 호출을 허용하고, `SCMP_ACT_ERRNO` 액션은 mkdir syscall의 실행을 방지하도록 규칙을 작성했다. 

사용자 정의 프로파일을 /var/lib/kubelet/seccomp 디렉터리에 배치해도 자동으로 규칙이 파드에 적용되지는 않기 때문에 파드에 프로파일을 적용해야 한다.

### 컨테이너에 사용자 정의 프로파일 적용하기
사용자 정의 프로파일을 적용하는 것은 기본 컨테이너 런타임 프로파일을 적용하는 것과 비슷한 패턴을 따르지만 약간의 차이가 있다. 보안 프로파일의 seccompProfile 속성을 violation.json 파일을 가리키고 유형을 Localhost로 설정한다.

```
apiVersion: v1 
kind: Pod 
metadata:
  name: test-seccomp2 
spec:
  securityContext: 
    seccompProfile:
      type: Localhost // 노드의 프로필을 참조
      localhostProfile: profiles/violation.json  //하위 디렉터리 프로필에 violation.json이라는 이름의 프로필을 적용
  containers:
  - name: test2
    image: busybox:1.28
    command: ["sh", "-c", "echo 'Test seccomp!' && sleep 100h"] 
    securityContext:
      allowPrivilegeEscalation: false
```

커스텀 프로파일을 적용한다. `kubectl apply` 명령을 사용하여 파드를 시작한다. 파드가 "Running" 상태로 전환될 때까지 기다린다:

```
$ kubectl apply -f seccomp.yaml 
pod/test-seccomp2 created

$ kubectl get pod test-seccomp2
NAME            READY   STATUS    RESTARTS   AGE
test-seccomp2   1/1     Running   0          40s
```

컨테이너에 셸을 실행하여 seccomp가 적용된 규칙을 제대로 적용했는지 확인한다.
```
$ kubectl exec -it test-seccomp2 -- /bin/sh
/ # mkdir test
mkdir: can't create directory 'test': Operation not permitted
```
출력에서 볼 수 있듯이, 이 작업은 mkdir 명령을 실행하려고 할 때 오류 메시지를 렌더링한다. 사용자 지정 프로필의 규칙을 위반했다고 볼 수 있다.

## 요약
컨테이너에서 실행되는 애플리케이션과 프로세스가 시스템 호출을 하는 것은 매우 일반적이다. 보안 측면을 다루는 것은 호스트 시스템 수준에서 확인해야 할 게 많기 때문에 AppArmor 및 seccomp와 같은 Linux 커널 강화 도구를 사용하여 이러한 시스템 호출을 제한할 수 있다. 이런 도구들을 잘 활용하면 Kubernetes와 통합하여 보다 안전한 클러스터 운영을 할 수 있다.