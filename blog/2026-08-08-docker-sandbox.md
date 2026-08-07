---
layout: single
title: "Docker Sandbox - AI 에이전트에게 YOLO를 안심하고 허락하기"
comments: true
classes: wide
description: "AI 코딩 에이전트를 microVM으로 격리해 실행하는 Docker Sandbox(sbx)의 개념과 개인이 써먹을 만한 유스케이스를 정리한다"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: docker/sandbox
date: 2026-08-08
draft: true
categories:
  - Docker
tags:
  - Docker
  - Sandbox
  - microVM
  - AI Agent
  - Claude Code
  - security
  - isolation
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

Claude Code 같은 AI 코딩 에이전트를 한 번이라도 `--dangerously-skip-permissions`(일명 YOLO 모드)로 켜본 사람은 안다. 승인 프롬프트가 사라지고 에이전트가 알아서 명령어를 척척 실행하는 그 편리함, 그리고 동시에 등줄기가 서늘해지는 그 불안함을.

에이전트가 어디선가 긁어온 `curl ... | bash` 스크립트를 실행하려고 하면? 지우라고 시킨 적 없는 파일을 `rm -rf` 하면? 글로벌 npm 패키지를 마음대로 깔아서 내 개발 환경을 오염시키면? 결국 이 불안함의 정체는 하나다. **내 호스트 머신이 에이전트의 인질로 잡혀 있다**는 것.

그래서 Docker가 내놓은 것이 **Docker Sandbox**(`sbx`)다. 이번 글에서는 이게 무엇이고, 개인 개발자가 어떤 상황에서 써먹을 수 있는지 정리해본다.

<!--truncate-->

## Docker Sandbox가 뭔가

한 줄로 요약하면, **AI 코딩 에이전트를 격리된 microVM 안에서 돌리는 도구**다. `sbx`라는 CLI로 사용한다.

핵심은 "격리 수준"이다. 우리가 흔히 코드를 실행하는 방식은 격리 강도에 따라 이렇게 나뉜다.

| 실행 위치 | 격리 수준 | 격리 기술 | 뚫렸을 때 |
|---|---|---|---|
| 호스트에서 직접 | 없음(None) | - | 내 머신 전체가 위험 |
| 컨테이너 | 부분(Partial) | 네임스페이스(namespaces) | 커널 공유, 탈출 가능성 존재 |
| **샌드박스** | **완전(Full)** | **하이퍼바이저(microVM)** | VM 경계로 격리 |

여기서 자연스럽게 드는 질문. **"그냥 `docker run`으로 컨테이너에 가두면 되는 거 아닌가?"**

맞는 말이지만 한 가지 함정이 있다. 컨테이너는 호스트와 **커널을 공유**한다. 격리는 리눅스 네임스페이스와 cgroup으로 이루어지는데, 이건 "벽"이라기보다 "칸막이"에 가깝다. 커널 취약점을 찌르는 컨테이너 탈출(container escape) 시나리오가 실재하고, 무엇보다 에이전트가 그 안에서 자유롭게 `docker` 명령을 쓰게 하려면 위험한 Docker socket 마운트 같은 걸 열어줘야 한다.

Docker Sandbox는 아예 **경량 VM(microVM)을 하나 띄운다**. 하이퍼바이저가 만든 진짜 하드웨어 경계 안에서 에이전트가 놀기 때문에, 그 안에서 무슨 짓을 하든 — 심지어 샌드박스 안에서 또 다른 Docker 컨테이너를 돌리든 — 호스트 커널과는 분리되어 있다. 대신 VM이라 컨테이너보다 뜨는 데 자원과 시간이 조금 더 든다. 완전한 격리를 위해 그 정도 오버헤드를 치르는 셈이다.

## 동작 원리, 딱 필요한 만큼만

완전히 격리된 VM이라면 "그럼 내 프로젝트 파일은 어떻게 건드리고, 인터넷은 어떻게 쓰지?"가 궁금해진다. Sandbox는 두 개의 통로를 열어둔다.

**1. 파일시스템 — 워크스페이스 패스스루(passthrough)**

샌드박스를 실행하면 지정한 작업 디렉토리가 VM 안으로 그대로 마운트된다. 격리는 되어 있지만 파일은 공유되는 구조라, 에이전트가 만든 결과물이 곧바로 내 로컬 디렉토리에 반영된다. 절대 경로도 그대로 유지되기 때문에 경로가 꼬이지 않는다. 읽기 성능을 위해 virtiofs 캐싱이 기본으로 켜져 있고, 특정 디렉토리는 `:ro`(read-only)로 걸어 읽기 전용으로만 노출할 수 있다.

> 여기서 중요한 함정 하나. **마운트된 워크스페이스 안의 파일은 에이전트가 여전히 수정·삭제할 수 있다.** 샌드박스가 지켜주는 건 "호스트 시스템 전체"이지, "마운트해준 그 프로젝트 폴더"가 아니다. 그래서 유스케이스에서 다루겠지만 `--clone`으로 복제본을 넘기는 패턴이 유용하다.

**2. 네트워크 — 호스트 프록시 경유**

샌드박스에서 나가는 모든 아웃바운드 트래픽은 호스트에 떠 있는 HTTP/HTTPS 프록시를 거친다. 이 프록시가 네트워크 정책을 적용하고 자격증명을 주입하는 지점 역할을 한다. `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` 환경변수로 제어할 수 있고, 사내 업스트림 프록시가 있는 환경도 연결된다. 조직 단위로 "이 도메인만 허용" 같은 정책을 중앙에서 걸고 싶으면 유료인 **Docker AI Governance**로 확장한다(개인 용도에서는 몰라도 된다).

## 5분이면 시작한다

설치와 로그인부터.

```bash
# macOS
brew install docker/tap/sbx

# Windows
winget install Docker.sbx

# 로그인
sbx login
```

그리고 프로젝트 디렉토리에서 에이전트를 하나 띄우면 끝이다.

```bash
cd ~/my-project
sbx run claude
```

이 한 줄로 microVM이 뜨고, 현재 디렉토리가 마운트된 채로 그 안에서 Claude Code가 실행된다. 여기서부터 에이전트가 무슨 짓을 하든 호스트 본체는 안전하다.

자주 쓰는 명령어는 이 정도만 알면 된다.

| 명령어 | 하는 일 |
|---|---|
| `sbx run claude` | 샌드박스 띄우고 에이전트 실행(접속까지) |
| `sbx run claude --name feature` | 이름을 붙여 실행(나중에 재접속용) |
| `sbx create --name my-proj claude .` | 접속하지 않고 백그라운드로 생성 |
| `sbx ls` | 실행 중인 샌드박스 목록 확인 |
| `sbx exec -it <name> bash` | 실행 중인 샌드박스 안으로 shell 진입 |
| `sbx cp ./a.json <name>:/home/user/` | 호스트 ↔ 샌드박스 파일 복사 |
| `sbx ports <name> --publish 8080:3000` | 샌드박스 3000 포트를 호스트 8080으로 |
| `sbx stop <name>` | 일시 중지 |
| `sbx rm <name>` | 삭제(`--force`로 강제) |
| `sbx` | 인자 없이 실행하면 대화형 대시보드 |

지원하는 에이전트도 Claude Code 하나만이 아니다. Gemini CLI, Copilot CLI, Codex, OpenCode, Kiro 등 주요 CLI 에이전트를 붙일 수 있다.

## 개인이 써먹을 만한 유스케이스

여기서부터가 본론이다. "AI 에이전트 격리"라는 원래 목적을 넘어서, 개인 개발자 입장에서 이 microVM 격리를 어떻게 활용할 수 있는지 다섯 가지로 정리했다.

### 1. AI 에이전트를 YOLO 모드로 완전 자율 실행

가장 정공법이자 원래 목적이다. 평소 에이전트를 쓸 때 매번 "이 명령 실행해도 될까요?"를 클릭하는 게 번거로워서 YOLO 모드를 켜고 싶지만 호스트가 걱정된다면, 샌드박스가 정답이다.

```bash
cd ~/side-project
sbx run claude
# 이 안에서는 --dangerously-skip-permissions를 켜도
# 최악의 경우 날아가는 건 이 microVM뿐이다
```

에이전트에게 "빌드 깨진 거 알아서 다 고쳐놓고, 필요한 패키지 있으면 설치하고, 테스트까지 초록불 만들어놔"라고 던져두고 자리를 비울 수 있다. 무인(unattended)으로 오래 돌리는 작업일수록 격리의 가치가 커진다.

#### Claude Code 샌드박싱

Claude Code는 `sbx`가 가장 먼저 지원한 에이전트다. 샌드박스 안에 들어가면 평소처럼 Claude Code를 쓰되, 호스트에 대한 걱정 없이 YOLO 모드를 자유롭게 활용할 수 있다.

```bash
# 기본 실행 — 현재 디렉토리를 마운트하고 Claude Code 기동
sbx run claude

# 이름 붙여서 나중에 재접속 가능하도록
sbx run claude --name my-feature

# 원본 보호가 필요하면 clone으로 복제본에서 작업
sbx run --clone claude
```

샌드박스 안에서 Claude Code가 뜨면, 그 안에서 `--dangerously-skip-permissions` 없이도 충분히 자유롭게 돌아간다. 어차피 VM 밖으로 빠져나갈 수 없기 때문이다. 하지만 완전 무인 자율 실행을 원한다면 이렇게 조합할 수 있다.

```bash
sbx run claude
# 샌드박스 안에서:
claude --dangerously-skip-permissions -p "이 프로젝트의 빌드 에러를 모두 수정하고, 테스트를 통과시켜줘"
```

또는 `sbx create`로 백그라운드에 띄워두고 나중에 결과만 확인하는 패턴도 유용하다.

```bash
# 백그라운드로 생성
sbx create --name overnight-fix claude ~/my-project

# 나중에 접속해서 결과 확인
sbx exec -it overnight-fix bash
```

#### OpenAI Codex 샌드박싱

OpenAI의 Codex CLI도 마찬가지로 샌드박스 안에서 돌릴 수 있다. Codex는 기본적으로 `full-auto` 모드를 제공하는데, 이걸 호스트에서 바로 쓰기엔 부담스럽다. 샌드박스 안이라면 이야기가 달라진다.

```bash
# Codex를 샌드박스에서 실행
sbx run codex

# 이름을 붙여서 실행
sbx run codex --name codex-refactor
```

샌드박스 안에서 Codex의 `full-auto` 모드를 켜면, 에이전트가 파일 수정·명령 실행·패키지 설치를 모두 자율적으로 수행한다. 호스트는 안전하다.

```bash
sbx run codex
# 샌드박스 안에서:
codex --approval-mode full-auto "레거시 코드를 TypeScript로 마이그레이션해줘"
```

#### 비교: 호스트 직접 실행 vs 샌드박스 실행

| | 호스트에서 YOLO 모드 | 샌드박스에서 YOLO 모드 |
|---|---|---|
| 편의성 | 동일 | 동일 |
| 호스트 리스크 | `rm -rf /`, 글로벌 오염, 자격증명 유출 | microVM 내로 격리 |
| 최악의 경우 | OS 재설치 | `sbx rm`으로 상자만 버림 |
| 무인 장시간 작업 | 위험해서 꺼려짐 | 안심하고 방치 가능 |

결론적으로, Claude Code든 Codex든 "자율 모드로 장시간 돌리고 싶은" 상황이라면 `sbx run`으로 감싸는 것만으로 리스크가 극적으로 줄어든다.

### 2. 신뢰 안 되는 `curl | bash`·오픈소스 설치 스크립트 테스트

GitHub에서 별 많은 도구를 발견했는데 설치 방법이 `curl https://... | sudo bash`라면? 이 한 줄이 내 머신에 무슨 짓을 할지 아무도 모른다. 소스를 다 읽어보기도 귀찮다. 이럴 때 샌드박스에 던져 넣는다.

```bash
sbx create --name scripttest claude .
sbx exec -it scripttest bash
# 이제 이 안에서 마음 놓고
$ curl -fsSL https://get.some-random-tool.dev | bash
# 뭘 건드리는지, 뭘 깔아놓는지 관찰하고
# 마음에 안 들면 통째로 버린다
exit
sbx rm --force scripttest
```

에이전트를 쓰지 않더라도 **일회용 격리 셸**로 그냥 쓰는 셈이다. 검증 안 된 바이너리, 낯선 설치 스크립트를 "일단 돌려보고 판단"하는 용도로 좋다.

### 3. 버전 꼬임·글로벌 오염을 막는 일회용 실험 환경

특정 Node 버전, 특정 Python 가상환경, 시스템 라이브러리를 요구하는 예제를 돌려보다 보면 로컬 환경이 서서히 지저분해진다. `nvm`, `pyenv`, 글로벌 패키지들이 쌓이고, 어느 순간 "내 머신에서만 안 되는" 상태가 된다.

샌드박스는 이걸 **깨끗한 일회용 상자**로 해결한다.

```bash
# 실험 1: 이 예제가 요구하는 대로 마구 깔아본다
sbx run claude --name exp1 ~/experiments/repo-a

# 실험 2: 전혀 다른 버전 조합을 또 다른 상자에서
sbx run claude --name exp2 ~/experiments/repo-b
```

각 상자는 서로, 그리고 호스트와 완전히 독립적이다. 실험이 끝나면 `sbx rm exp1`로 흔적 없이 지운다. 내 실제 개발 환경에는 먼지 한 톨 안 남는다.

### 4. 여러 피처·브랜치를 병렬 샌드박스로 동시 작업

같은 저장소를 두고 여러 갈래의 작업을 동시에 진행하고 싶을 때가 있다. A 기능을 실험하면서 B 버그도 파보고 싶은데, 한 워킹 디렉토리에서 브랜치를 왔다 갔다 하면 상태가 엉킨다.

Sandbox는 같은 워크스페이스에 대해 여러 개를 이름만 다르게 띄울 수 있다.

```bash
sbx run claude --name feature ~/my-project
sbx run claude --name spike   ~/my-project
```

여기서 더 나아가 `--clone`을 쓰면 **워크스페이스를 복제해서** 넘긴다. 앞서 말한 "마운트된 파일은 여전히 수정된다"는 함정을 피하는 방법이다. 에이전트가 원본이 아니라 복제본에서 마음껏 실험하게 하고, 결과가 마음에 들 때만 반영하는 흐름을 만들 수 있다.

```bash
# 원본은 그대로 두고 복제본에서 작업
sbx run --clone claude
sbx create --clone --name safe-experiment claude .
```

### 5. 검증 안 된 MCP 서버·CLI 도구 격리 실행

요즘은 MCP 서버나 CLI 도구를 npm/pip로 설치해서 에이전트에 물리는 일이 흔하다. 그런데 이것들은 대개 검증이 덜 된 서드파티 코드이고, 실행되면 내 자격증명이나 파일에 접근한다. 공급망 관점에서 마음 놓기 어렵다.

이런 도구를 샌드박스 안에서만 살게 하면, 설령 악성이거나 버그가 있어도 피해가 microVM 안에 갇힌다. 게다가 앞서 본 것처럼 **아웃바운드 트래픽이 호스트 프록시를 거치므로**, 이 도구가 어디로 통신을 시도하는지 관찰하거나 특정 도메인으로만 제한할 여지도 생긴다.

```bash
sbx create --name mcp-test claude .
sbx exec -it mcp-test bash
# 이 안에서 낯선 MCP 서버를 설치·기동해보고
# 네트워크로 뭘 하는지, 자격증명을 어떻게 쓰는지 지켜본다
```

## 한계와 주의점

좋기만 한 도구는 없으니 짚고 넘어가자.

- **자원 오버헤드**: 컨테이너가 아니라 VM이다. 뜨는 데 시간과 메모리가 컨테이너보다 더 든다. "완전 격리"의 대가다. 가볍게 명령 하나 돌릴 거면 과하다.
- **KVM 등 가상화 지원 필요**: microVM을 쓰므로 하드웨어 가상화가 받쳐줘야 한다(Linux는 KVM). 오래된 머신이나 중첩 가상화가 막힌 환경에서는 제약이 있을 수 있다.
- **마운트한 폴더는 안전지대가 아니다**: 다시 강조하지만, 샌드박스가 지켜주는 건 호스트 시스템이지 마운트해준 워크스페이스가 아니다. 중요한 원본을 다룰 때는 `--clone`이나 `:ro`를 습관화하자.
- **무료 범위 vs 유료**: `sbx` CLI 자체와 개인 사용은 무료(상업적 사용 포함)다. 조직 단위로 네트워크·파일시스템 정책을 중앙에서 강제하는 거버넌스 기능은 Docker AI Governance라는 유료 제품 영역이다. 개인이 쓸 땐 신경 쓸 필요 없다.

## 마무리

Docker Sandbox의 핵심 가치는 결국 **"안심하고 위험한 걸 해볼 수 있다"**로 요약된다. 컨테이너보다 한 단계 강한 microVM 격리 덕분에, 그동안 호스트가 걱정돼서 망설였던 일들 — YOLO 모드 에이전트, 낯선 설치 스크립트, 검증 안 된 도구, 지저분해질 실험 — 을 부담 없이 던져볼 수 있는 일회용 상자를 손쉽게 만들어준다.

AI 에이전트 격리라는 이름을 달고 나왔지만, 개인 개발자 입장에서는 그냥 **"통째로 버릴 수 있는 강격리 개발 환경을 명령어 한 줄로"** 라는 점만으로도 충분히 매력적이다. `sbx run`으로 상자 하나 띄워두고, 평소 겁나서 못 하던 걸 마음 편히 실험해보자. 최악의 경우에도 날아가는 건 그 상자 하나뿐이다.

## 참고 문서

- [Docker Sandboxes 문서(개요)](https://docs.docker.com/ai/sandboxes/) — 개념, 시작하기, 아키텍처, 보안, CLI 레퍼런스 등 목차
- [Get started](https://docs.docker.com/ai/sandboxes/get-started/) — 설치(`brew`/`winget`), `sbx login`, `sbx run claude` 최초 실행
- [Usage](https://docs.docker.com/ai/sandboxes/usage/) — `run`/`create`/`ls`/`exec`/`cp`/`ports`/`stop`/`rm`, `--name`·`--clone`·`:ro` 등 실제 사용법
- [Architecture](https://docs.docker.com/ai/sandboxes/architecture/) — microVM(hypervisor) 격리, filesystem passthrough(virtiofs), 호스트 HTTP/HTTPS 프록시 경유 네트워크
- [Agents](https://docs.docker.com/ai/sandboxes/agents) — 지원 에이전트(Claude Code, Gemini CLI, Copilot CLI, Codex, OpenCode, Kiro 등)
- [CLI reference (`sbx`)](https://docs.docker.com/reference/cli/sbx/) — 전체 서브커맨드/옵션 레퍼런스

> 본문의 명령어와 동작 방식은 Docker 공식 문서(docs.docker.com/ai/sandboxes)를 기준으로 교차 검증했다. Docker Sandbox는 비교적 최신 기능이라 세부 명령어·플래그가 버전에 따라 달라질 수 있으니, 실제 사용 시 `sbx --help`와 위 공식 문서를 함께 확인하기를 권한다. (작성/검증 시점: 2026-07)
