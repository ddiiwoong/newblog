---
id: admin-setup
title: Claude Code Deep Dive — 개인의 도구를 조직의 플랫폼으로
sidebar_position: 3
sidebar_label: Admin Setup
tags:
  - Claude Code
  - Anthropic
  - Enterprise
  - Governance
  - Authentication
  - Monitoring
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

## 들어가며

이 글에서는 Claude Code의 조직 배포, 인증 체계, 거버넌스, 모니터링까지 — Claude Code Deep Dive Workshop Chapter 3 내용을 기본으로 하여 다른 학습 내용들과 같이 정리합니다.

---

### 목차

1. 배포 전략
2. 공급자와 자격증명
3. Claude apps gateway
4. 네트워크와 보안
5. 거버넌스와 정책
6. 모니터링과 비용
7. 신원, 데이터, 컴플라이언스
8. 트러블슈팅
9. Recap & Labs
10. References

---

## 1. 배포 전략

> **해결하는 문제**: "500명에게 어떻게 설치하고 갱신하는가?"

개발자 한 명이 `curl | bash`로 설치하는 것과 조직 전체에 배포하는 것은 완전히 다른 문제입니다. 조직 배포에서는 **버전 일관성** (모든 개발자가 같은 기능을 사용), **보안 검증** (바이너리 무결성 GPG 대조), **갱신 통제** (장애 시 즉시 롤백), **감사 추적** (누가 어떤 버전을 쓰는지)이 필수입니다.

핵심 원칙 3가지:

1. **버전 고정** — CI와 프로덕션 환경은 반드시 특정 버전을 명시합니다
2. **자동갱신 차단** — 예기치 않은 변경을 방지합니다 (`DISABLE_AUTOUPDATER=1`)
3. **정책 내장** — 이미지에 managed-settings.json을 포함해 "설치 = 정책 적용"을 동시에 달성합니다

### 설치 채널 4계열

| 채널 | 특징 | 적합 대상 |
| --- | --- | --- |
| **Native 스크립트** | `claude.ai/install.sh`, 단일 바이너리, 자동 갱신 | MDM 스크립트화, 표준 권장 |
| **OS 패키지 저장소** | apt, dnf, apk, GPG 서명 | 리눅스 서버 플릿 |
| **패키지 매니저** | Homebrew cask, WinGet | 개발자 셀프 서비스 |
| **컨테이너** | 표준 이미지, devcontainer | CI 러너, 통제 환경 |
| npm (레거시) | Node 의존 | 신규 배포 비권장 |

### 실습: Linux 플릿 GPG 저장소 등록

```bash
# GPG 키 설치 및 지문 대조
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \
  -o /etc/apt/keyrings/claude-code.asc
gpg --show-keys /etc/apt/keyrings/claude-code.asc
# 지문 대조: 31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE

# 저장소 등록 및 설치
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] \
  https://downloads.claude.ai/claude-code/apt/stable stable main" \
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update && sudo apt install claude-code

```

### Windows 대량 배포

```powershell
# Intune/SCCM 배포 스크립트 골격
winget install Anthropic.ClaudeCode --silent --accept-package-agreements

# 관리 정책은 HKLM 레지스트리로 (Part 5 상세)
# HKLM\SOFTWARE\Policies\ClaudeCode
# WSL 병행: wslInheritsWindowsSettings: true

```

### 표준 컨테이너 이미지

```dockerfile
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y \
    curl git ca-certificates ripgrep jq
RUN curl -fsSL https://claude.ai/install.sh | bash -s 2.1.201
ENV PATH="/root/.local/bin:${PATH}"
ENV DISABLE_AUTOUPDATER=1
COPY managed-settings.json /etc/claude-code/
WORKDIR /workspace

```

> 💡 **3원칙**: 버전 고정 + 자동갱신 차단 + 정책 내장

### GPG 서명 검증의 의미

GPG 서명 검증은 "이 바이너리가 Anthropic이 빌드한 진짜 파일인지" 확인하는 과정입니다. 공급망 공격(supply chain attack)에서 공격자가 패키지 저장소를 변조하거나 미러를 탈취해도, GPG 서명이 일치하지 않으면 설치가 거부됩니다. 지문(`31DD DE24 DDFA B679...`)을 공식 채널과 대조하는 것은 "이 열쇠의 주인이 Anthropic이 맞는지" 최초 1회 확인하는 절차입니다.

### stable vs latest 채널 선택 기준

| 기준 | `stable` | `latest` |
| --- | --- | --- |
| 지연 | 약 1주 뒤 반영 | 릴리스 즉시 |
| 회귀 | 문제 릴리스 건너뜀 | 그대로 노출 |
| 적합 대상 | 프로덕션 플릿, 대다수 개발자 | Ring 0 챔피언, 얼리어답터 |
| 롤백 필요성 | 낮음 (이미 검증됨) | 높음 (미검증) |

> 결론: 플릿 기본은 **stable**, `latest`는 Ring 0(10명 이하)에만 적용합니다.

### 사내 미러 구성 시 고려사항

| 고려사항 | 설명 |
| --- | --- |
| **프록시 저장소 방식** | Artifactory/Nexus의 "Remote Repository"로 상류(downloads.claude.ai)를 캐시합니다. 최초 요청만 외부에 나가고 이후는 로컬에서 서빙됩니다. |
| **GPG 서명 유지** | 미러라도 `.asc` 서명 파일을 함께 제공해야 합니다. 서명을 제거하면 클라이언트가 검증에 실패합니다. |
| **대역폭 절감** | 500대가 동시 갱신할 때 외부 트래픽 = 1회분만 발생합니다. |
| **감사 로그** | Artifactory 접근 로그로 "누가 어떤 버전을 언제 다운로드했는지" 추적할 수 있습니다. |
| **에어갭 대응** | 인터넷 단절 환경에서는 정기적으로 오프라인 번들을 전달합니다: `curl -fsSL [https://claude.ai/install.sh](https://claude.ai/install.sh) |

### 4링 롤아웃 — 왜 이 순서인가

각 링의 규모와 역할이 서로 다른 이유가 있습니다:

| 링 | 규모 | 역할 | 왜 이 순서 |
| --- | --- | --- | --- |
| **Ring 0** | 10명 | 챔피언 | 새 버전의 **기능을 먼저 경험**하고 결함을 빨리 보고하는 자원자들입니다. latest 채널. |
| **Ring 1** | 50명 | 파일럿 | **정책 초판을 검증**합니다. managed settings가 실무에 마찰을 주는지 여기서 확인합니다. |
| **Ring 2** | 200명 | 부문 | **교육 자료와 함께** 배포합니다. 대규모 적용 전 교육 효과를 확인합니다. |
| **Ring 3** | 전사 | 표준 온보딩 | 검증된 설정 + 교육 + 지원 채널이 준비된 상태에서 **안전하게 확산**합니다. |

> 핵심: 뒤로 갈수록 "발견"이 아닌 "적용"에 집중합니다. 문제는 앞 링에서 이미 걸러져야 합니다.

### 에어갭(인터넷 단절) 환경 대응

인터넷이 완전히 차단된 환경(군사, 금융 망분리 등)에서는:

1. **오프라인 번들 전달**: 보안 구역 외부에서 설치 자산을 다운로드해 물리 매체로 반입
2. **사내 미러 세팅**: 반입된 자산을 내부 Artifactory에 수동 업로드
3. **클라이언트 설정**: `sources.list`를 내부 미러 주소로 지정
4. **갱신 차단**: `DISABLE_AUTOUPDATER=1` + `DISABLE_UPDATES=1`로 외부 시도 원천 차단
5. **버전 관리**: 보안 팀이 승인한 버전만 미러에 올려 "갱신 = 보안팀 승인"을 동치로 만듭니다

### 버전 통제 두 다이얼

| 다이얼 | 역할 | 설정 |
| --- | --- | --- |
| `autoUpdatesChannel` | 갱신 속도 조절 | `stable` (플릿 기본), `latest` (얼리어답터) |
| `minimumVersion` | 하한선 강제 | 미달 버전은 강제 갱신 유도 |
| 완전 고정 | CI 전용 | `DISABLE_AUTOUPDATER=1` + 버전 지정 설치 |

### 점진 롤아웃 (4 링)

```mermaid
graph LR
    R0["Ring 0\n챔피언 10명\nlatest 채널"] --> R1["Ring 1\n파일럿 50명\nstable + 정책 초판"]
    R1 --> R2["Ring 2\n부문 200명\n교육 자료 배포"]
    R2 --> R3["Ring 3\n전사\n표준 온보딩"]
    
    style R0 fill:#E8743B,color:#fff
    style R1 fill:#F5A623,color:#fff
    style R2 fill:#4A90D9,color:#fff
    style R3 fill:#63B132,color:#fff

```

---

## 2. 공급자와 자격증명

> **해결하는 문제**: "키를 나눠주지 않고 인증하려면?"

### 공급자 결정표

| 공급자 | 특징 | 적합 조직 |
| --- | --- | --- |
| **Teams / Enterprise** | 좌석제, 인프라 불필요 | 기본 권장 |
| **Claude Console** | API 종량 과금 | 파이프라인 중심 |
| **Amazon Bedrock** | AWS 컴플라이언스·과금 상속 | AWS 표준 기업 |
| **Google Vertex AI** | GCP 통제 상속 | GCP 표준 기업 |
| **Microsoft Foundry** | Azure 통제 상속 | Azure 표준 기업 |
| **혼합** | LLM gateway로 단일 엔드포인트 | 중앙 로깅 요구 시 |

### 인증 우선순위 (충돌 시)

1. `CLAUDE_CODE_USE_BEDROCK` / `USE_VERTEX` / `USE_FOUNDRY` — 강제 스위치
2. `ANTHROPIC_API_KEY` — 환경변수 키
3. `apiKeyHelper` — 동적 키 헬퍼 스크립트 (볼트 연동)
4. OAuth 토큰 — `setup-token` 장기 토큰, 구독 로그인

### 실습: Bedrock SSO 설정

```bash
# 조직 프로파일 (/etc/profile.d/claude.sh)
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=ap-northeast-2

# SSO 로그인
aws sso login --profile dev && export AWS_PROFILE=dev

# 확인
claude
> /status   # Provider: Bedrock 표기 확인

```

### Bedrock IAM 최소 권한 정책

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "ClaudeCodeInvoke",
    "Effect": "Allow",
    "Action": [
      "bedrock:InvokeModel",
      "bedrock:InvokeModelWithResponseStream"
    ],
    "Resource": "arn:aws:bedrock:*::foundation-model/anthropic.*"
  }]
}

```

### apiKeyHelper / 볼트 통합

```json
// ~/.claude/settings.json
{
  "apiKeyHelper": "/opt/claude/get-key.sh",
  "env": { "CLAUDE_CODE_API_KEY_HELPER_TTL_MS": "300000" }
}

```

```bash
#!/bin/bash  # /opt/claude/get-key.sh
aws secretsmanager get-secret-value \
  --secret-id claude/team-api-key \
  --query SecretString --output text

```

> 💡 TTL마다 재호출되어 회전이 클라이언트에 자동 반영됩니다.

### IAM 정책 라인별 설명

```
"Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"]

```

- `InvokeModel`: 동기 호출 (짧은 응답)
- `InvokeModelWithResponseStream`: 스트리밍 호출 (Claude Code의 기본 모드)
- 이 두 개만 있으면 Claude Code가 동작합니다. 다른 Bedrock 액션(모델 관리, 파인튜닝 등)은 불필요합니다.

```
"Resource": "arn:aws:bedrock:*::foundation-model/anthropic.*"

```

- `*` 리전: 모든 리전에서 호출 가능 (단일 리전으로 좁힐 수 있음: `ap-northeast-2`)
- `anthropic.*`: Anthropic의 모든 모델 허용. 특정 모델만 허용하려면 `anthropic.claude-sonnet-5-v1*`처럼 좁힙니다.

**모델 차단 예시** (Deny 조합):

```json
{
  "Sid": "DenyOpus",
  "Effect": "Deny",
  "Action": ["bedrock:InvokeModel*"],
  "Resource": "arn:aws:bedrock:*::foundation-model/anthropic.claude-opus*"
}

```

### PrivateLink — 왜 필요하고 어떻게 격리하는가

PrivateLink는 Bedrock 호출 트래픽이 **인터넷을 거치지 않고 AWS 내부 네트워크만으로** 전달되게 합니다.

| 관점 | 인터넷 경유 | PrivateLink |
| --- | --- | --- |
| 경로 | VPC → IGW → 인터넷 → Bedrock | VPC → VPC Endpoint → Bedrock (내부) |
| 규제 | 일부 산업에서 "추론 데이터가 인터넷을 통과" 불허 | 내부 경로만 사용, 규제 충족 |
| 증적 | 경로 증명 어려움 | VPC Flow Logs로 트래픽 경로 증적 |
| 추가 통제 | — | Endpoint Policy로 호출 가능 모델/주체 제한 |

```bash
# VPC Endpoint 생성 (Terraform 예시 개요)
# aws_vpc_endpoint "bedrock" {
#   service_name = "com.amazonaws.ap-northeast-2.bedrock-runtime"
#   vpc_endpoint_type = "Interface"
#   private_dns_enabled = true  # SDK 무수정 전환
# }

```

> Private DNS를 활성화하면 SDK가 기존 퍼블릭 엔드포인트 주소를 그대로 사용해도 내부로 라우팅됩니다 — 코드 변경 0줄.

### 자격증명 회전 4단계 체계

정적 키를 써야 하는 경우(apiKeyHelper 기반), 회전을 무사고로 만드는 4단계:

| 단계 | 동작 | 포인트 |
| --- | --- | --- |
| 1. 이중화 | 신키 발급, 볼트에 병행 저장 | 구키와 신키가 동시 유효 |
| 2. 전환 | 볼트 포인터를 신키로 스위치 | 이후 헬퍼 호출은 신키 반환 |
| 3. 관찰 | TTL 경과 후 구키 호출 0건 확인 | 잔여 사용자 없음 검증 |
| 4. 폐기 | 구키 비활성화 + 감사 기록 | 증적 보존 |

> SSO 경로(Identity Center)는 STS 단기 토큰이 자동 회전되므로 이 절차 자체가 불필요합니다 — SSO가 권장되는 이유입니다.

### 자격증명 의사결정표

| 주체 | 표준 경로 | 원칙 |
| --- | --- | --- |
| 개발자 (일상) | Bedrock + Identity Center SSO | 정적 키 0 |
| CI 파이프라인 | OIDC 역할 인수, 필요 시 setup-token | 장기 시크릿 최소화 |
| 공유 서비스 | Secrets Manager + apiKeyHelper | TTL 회전 자동화 |
| 폐쇄망 | PrivateLink + SSO | 경로와 인증 동시 해결 |

---

## 3. Claude apps gateway

> **해결하는 문제**: "조직 로그인 UX, 그룹별 모델 차등, 개인 지출 한도를 어떻게?"

**게이트웨이가 없으면** 발생하는 문제:

- 개발자마다 API 키를 개별 관리해야 합니다 → 유출 위험
- 모든 사용자가 동일 모델에 무제한 접근합니다 → 비용 폭증
- 누가 얼마나 사용하는지 추적할 단일 지점이 없습니다 → 감사 불가
- 조직 SSO와 별개로 별도 로그인 과정이 필요합니다 → UX 저하

Claude apps gateway는 이 네 가지를 **단일 인프라**로 해결합니다. 조직의 IdP로 로그인하면 그룹에 따라 모델과 지출이 자동 결정되고, 모든 요청이 한 지점을 통과하므로 로깅과 비용 귀속이 자연스럽게 따라옵니다.

### 아키텍처 5층

```mermaid
graph TD
    L1["Listener + TLS\n조직 도메인으로 서비스"] --> L2["OIDC + Session\nIdP 연동 사인인"]
    L2 --> L3["Policy\nmanaged 정책, 그룹 매핑, 지출 한도"]
    L3 --> L4["Model Routing\n그룹 규칙에 따라 허용/치환"]
    L4 --> L5["Upstream\nBedrock / Agent Platform / Foundry"]
    
    style L1 fill:#4A90D9,color:#fff
    style L3 fill:#E8743B,color:#fff
    style L5 fill:#63B132,color:#fff

```

### 개발자 경험

```bash
# 클라이언트는 게이트웨이만 바라봄
export ANTHROPIC_BASE_URL=https://claude-gw.corp.example

claude
# 브라우저가 열리고 조직 IdP 로그인 (OIDC)
# AWS 프로파일, 정적 키, 리전 설정이 전부 사라짐

> /status   # Provider: gateway 경유, 그룹과 허용 모델 확인

```

### 그룹별 모델 라우팅

```yaml
# gateway.yaml (routing)
routing:
  groups:
    - match: "eng-platform"
      allowedModels: [opus, sonnet, haiku]
    - match: "eng-default"
      allowedModels: [sonnet, haiku]
      rewrite: { opus: sonnet }   # opus 요청을 sonnet으로 하향
    - match: "contractors"
      allowedModels: [haiku]

```

### 지출 한도 API

```bash
curl -X PUT https://claude-gw.corp.example/admin/limits \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{ "subject": "user:jdoe", "period": "month", "usd": 300 }'
# 한도 도달 시 요청 거부, 사용자에게 사유 표시

```

### gateway.yaml 각 섹션의 역할

| 섹션 | 역할 | 관리자 관점 |
| --- | --- | --- |
| **Listener + TLS** | 수신 포트와 인증서 설정 | 조직 도메인(claude-gw.corp.example)으로 서비스 |
| **OIDC + Session** | IdP 연동, 세션 저장(Postgres) | 기존 IdP 하나만 등록하면 개발자 로그인 완성 |
| **Policy** | managed 정책, 그룹 매핑, 지출 한도 판정 | 요청마다 실시간으로 정책 적용 |
| **Model Routing** | 그룹 규칙에 따라 모델 허용/치환 | Opus를 요청해도 Sonnet으로 하향 가능 |
| **Upstream** | Bedrock, Agent Platform, Foundry로 전달 | 상류 인증은 게이트웨이가 대행 |

### 지출 한도의 실무적 활용

| 설정 | 동작 | 활용 |
| --- | --- | --- |
| `period: "day"` | 일 한도 | 실수로 루프 돌릴 때 보호 |
| `period: "week"` | 주 한도 | 스프린트 단위 관리 |
| `period: "month"` | 월 한도 | 예산 기준 관리 |
| 그룹 기본값 + 개인 예외 | 2단 구성 | 팀 기본 $200, 특정 파워유저 $500 |
| 한도 초과 시 | 요청 거부 + 사유 메시지 표시 | 사용자가 원인을 바로 인지 |

### Claude apps gateway vs 일반 LLM gateway 비교

| 비교 항목 | 일반 LLM gateway (LiteLLM 등) | Claude apps gateway |
| --- | --- | --- |
| 목적 | 다중 벤더 추상화 | Claude Code 조직 운영 전용 |
| 정책 | Claude Code 정책 모델 미인지 | managed 정책과 자연 결합 |
| 기능 | 한도/라우팅을 직접 구현해야 함 | SSO, 라우팅, 한도가 내장 완제품 |
| 유지보수 | 범용 프록시 유지보수 부담 | 공식 배포, 운영 문서 제공 |
| 시작 방법 | `claude gateway --config gateway.yaml` (v2.1.195+) | — |

> 이미 LiteLLM 등 범용 게이트웨이를 쓰고 있다면 병행 가능합니다. 하지만 Claude Code 전용 정책(모드 통제, 지출 한도, 그룹 라우팅)이 필요하면 apps gateway가 마찰 없는 답입니다.

---

## 4. 네트워크와 보안

> **해결하는 문제**: "사내망에서 안전하게 통과시키고, 나가는 길은 좁히기"

### 필수 아웃바운드 도메인

| 도메인 | 용도 | 대체 |
| --- | --- | --- |
| `api.anthropic.com` | 추론 API | Bedrock 경로 시 불필요 |
| `claude.ai` | 구독 로그인, 서버 관리 설정 | Teams/Enterprise |
| `downloads.claude.ai` | 설치, 갱신 | 미러 운영 시 대체 |
| `bedrock-runtime.<region>.amazonaws.com` | Bedrock 추론 | PrivateLink 대체 가능 |

### 프록시 설정

```bash
export HTTPS_PROXY=http://proxy.corp.example:8080
export HTTP_PROXY=http://proxy.corp.example:8080
export NO_PROXY=localhost,127.0.0.1,.corp.example
# 조직 배포: /etc/profile.d 또는 MDM 프로파일로

```

### 사내 CA 인증서

```bash
# TLS 검사 장비 뒤에서 SELF_SIGNED_CERT_IN_CHAIN 오류 시
export NODE_EXTRA_CA_CERTS=/etc/ssl/corp/corp-root-ca.pem

# OS 신뢰 저장소 병행 등록
# Debian: /usr/local/share/ca-certificates + update-ca-certificates
# RHEL: /etc/pki/ca-trust/source/anchors + update-ca-trust

# ⚠️ 금지: NODE_TLS_REJECT_UNAUTHORIZED=0 (검증 무력화)

```

### 각 도메인이 왜 필요한가

| 도메인 | 역할 | 차단 시 증상 |
| --- | --- | --- |
| `api.anthropic.com` | 모델 추론 API 호출 | 응답 생성 불가 (Bedrock 경로 시 불필요) |
| `claude.ai` | OAuth 로그인 + 서버 managed 설정 수신 | 로그인 불가, managed 정책 미수신 |
| `downloads.claude.ai` | 바이너리 업데이트, 패키지 저장소 | 자동 갱신 실패 (미러 운영 시 대체 가능) |
| `statsig` 계열 | 기능 플래그(Feature Flag) 수신 | 차단 가능, 기본값으로 동작 |
| `sentry` 계열 | 오류 리포트 송신 | 차단 가능, 진단 정보 저하 |
| `bedrock-runtime.<region>.amazonaws.com` | Bedrock 추론 | PrivateLink로 대체 가능 |

### 프록시 설정 3가지 방법과 우선순위

| 방법 | 설정 위치 | 범위 |
| --- | --- | --- |
| 1. 환경변수 | `HTTPS_PROXY`, `HTTP_PROXY`, `NO_PROXY` | 해당 세션/프로세스 |
| 2. 시스템 프로파일 | `/etc/profile.d/proxy.sh` 또는 MDM | 조직 전체, 영구 |
| 3. managed env | `managed-settings.json`의 `env` 섹션 | Claude Code 전용, 영구 |

우선순위: 환경변수 > managed env 값 (managed env는 프로세스 시작 시 주입됨)

### 인증 프록시 대응 (Basic, NTLM, Kerberos)

자격증명을 요구하는 프록시에서는 URL에 인증 정보를 삽입하지 말아야 합니다 (유출 위험):

```bash
# ❌ 지양: 평문 자격증명이 환경변수에 남음
export HTTPS_PROXY=http://user:pass@proxy:8080

# ✅ 권장: 로컬 중계 (Px, Cntlm 등)
# NTLM/Kerberos를 로컬에서 처리, Claude Code는 localhost만 가리킴
export HTTPS_PROXY=http://localhost:3128

```

> 가능하면 인증 프록시 자체를 **ZTNA(Zero Trust Network Access)**로 대체하는 것이 구조적 해법입니다.

### VPN / ZTNA 환경 점검 사항

| 환경 | 점검 항목 |
| --- | --- |
| **VPN** | 스플릿 터널 시 API 도메인 경로 확인, MTU 문제로 스트리밍 끊김 진단, DNS 사내 리졸버 경유 여부 |
| **ZTNA** | 앱 단위 정책에 Claude Code 등록, 도메인 허용을 커넥터 정책에 반영, 디바이스 포스처 요건과 CLI 호환 확인 |

### Sandbox 네트워크 (curl 갭 봉쇄)

```json
// managed-settings.json
{
  "sandbox": {
    "enabled": true,
    "network": {
      "allowedDomains": [
        "api.anthropic.com",
        "*.corp.example",
        "github.corp.example"
      ]
    }
  }
}

```

> 💡 **왜 Sandbox가 필요한가**: WebFetch를 deny해도 Bash가 허용이면 `curl`, `wget`으로 임의 URL에 접근 가능합니다. 권한 규칙(permissions)은 "Claude가 도구를 쓸 때" 적용되지만, Bash 안에서 무엇을 실행하는지까지는 추적하지 못합니다. **Sandbox는 OS 레벨에서 이 갭을 봉쇄**합니다 — 파일시스템 격리와 네트워크 허용 도메인 지정으로 Bash 내부 명령까지 통제합니다. 이것은 Anthropic 공식문서(Security)에서도 강조하는 핵심 보안 레이어입니다: "Sandboxed bash tool: Sandbox bash commands with filesystem and network isolation, reducing permission prompts while maintaining security." (docs.anthropic.com/en/docs/claude-code/security)

### DLP 훅 (유출 패턴 차단)

```bash
#!/bin/bash  # ./scripts/dlp-guard.sh (PreToolUse)
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# 외부 전송 명령 + 민감 패턴 결합 시 차단
if echo "$CMD" | grep -qE 'curl|wget|nc |scp ' && \
   echo "$CMD" | grep -qE 'sk-ant-|AKIA[0-9A-Z]{16}|BEGIN.*PRIVATE KEY'; then
  echo "Blocked by DLP: credential exfil pattern" >&2
  exit 2
fi
exit 0

```

---

## 5. 거버넌스와 정책

> **해결하는 문제**: "개인이 못 바꾸는 것을 어떻게 설계하는가?"

거버넌스의 본질은 "**사용자 스스로 완화할 수 없는 강제선**"을 만드는 것입니다. Claude Code는 이를 위해 두 가지 메커니즘을 제공합니다:

1. **managed settings** — 파일/레지스트리/서버를 통해 배포되며, 사용자 설정보다 항상 우선합니다. settings.json에서 `deny`에 추가된 규칙은 개발자가 제거할 수 없습니다.
2. **Permission Modes** — 6가지 모드(Manual, Accept Edits, Plan, Auto, Don't Ask, Bypass)로 Claude의 자율성 범위를 결정합니다. `disableBypassPermissionsMode: "disable"` 설정으로 조직 차원에서 위험한 모드를 영구 차단할 수 있습니다.

> 💡 **Anthropic Skilljar 핵심 통찰 (Permission Modes Lesson)**:
> - Auto Mode의 분류기는 **의도(intent)**를 검사하지, **정확성(correctness)**을 검사하지 않습니다
> - 깨진 코드를 쓰는 것은 "위험한 것"이 아니므로 분류기가 통과시킵니다
> - 따라서 Auto Mode + **Stop Hook** (테스트 실행)을 조합해야 무인 실행이 안전합니다

### managed settings 4채널 (우선순위 순)

| 순위 | 채널 | 도달 방식 | 플랫폼 |
| --- | --- | --- | --- |
| 1 | **Server-managed** | claude.ai 어드민 콘솔 | Teams/Enterprise 전용 |
| 2 | **plist / HKLM** | MDM, 레지스트리 | macOS, Windows |
| 3 | **파일 기반** | `/etc/claude-code/managed-settings.json` | 전 플랫폼 |
| 4 | **HKCU** | 사용자 레지스트리 | Windows (비강제) |

> 규칙: 기기에서 처음 발견되는 채널 하나를 사용합니다.

### 병합 규칙

| 타입 | 동작 | 결과 |
| --- | --- | --- |
| **스칼라** (model, minimumVersion 등) | managed가 덮어쓰기 | 개인 설정 무시됨 |
| **배열** (permissions.allow, deny) | 전 소스 합집합 | 개발자가 allow 추가 가능, deny 제거 불가 |

### managed-settings.json 예시 (조직 기준선)

```json
{
  "permissions": {
    "deny": ["Read(./.env*)", "Bash(rm -rf:*)", "Bash(curl * | bash:*)"],
    "disableBypassPermissionsMode": "disable"
  },
  "sandbox": {
    "enabled": true,
    "network": { "allowedDomains": ["api.anthropic.com", "*.corp.example"] }
  },
  "allowedMcpServers": ["github", "corp-wiki"],
  "minimumVersion": "2.1.190",
  "env": { "CLAUDE_CODE_USE_BEDROCK": "1" }
}

```

### 잠금 키 6종

| 키 | 효과 |
| --- | --- |
| `allowManagedPermissionRulesOnly` | managed 규칙만 유효, 개인 allow 무시 |
| `disableBypassPermissionsMode` | `--dangerously-skip` 우회 봉쇄 |
| `allowManagedHooksOnly` | managed 훅만 로드 |
| `allowedHttpHookUrls` | HTTP 훅 목적지 허용 목록 |
| `strict/blockedMarketplaces` | 플러그인 마켓 소스 통제 |
| `minimumVersion` | 구버전 강제 상향 |

### 💡 Skilljar 보충: 팀 전체 배포를 위한 Plugin 시스템

managed settings가 "무엇을 금지하는가"를 결정한다면, **Plugin**은 "무엇을 표준으로 제공하는가"를 결정합니다.

| Plugin 구성요소 | 관리자 관점 효용 |
| --- | --- |
| **Skills** | 팀 전체의 반복 절차 표준화 |
| **Subagents** | 코드 리뷰어, 보안 스캐너 등 팀 도구 배포 |
| **Hooks** | 건너뛸 수 없는 게이트 (테스트, 린트 강제) |
| **MCP configs** | 팀 필수 외부 도구 연결 자동화 |

```bash
# Plugin 설치 (팀 멤버가 실행)
/plugin install org-name@security-standards

# 관리자가 Private Marketplace로 중앙 관리
/plugin marketplace add your-org/claude-plugins

```

> ⚠️ **보안 주의** (Skilljar Lesson 09): Plugin은 사용자 권한으로 코드를 실행합니다. Hook이 매칭되는 모든 도구 호출에서 발동하므로, 설치 전 hooks/agents/MCP 구성을 반드시 확인해야 합니다.

### 💡 Skilljar 보충: 무인 실행 검증 원칙

managed settings로 Auto Mode를 허용한 뒤, 무인 실행 결과를 어떻게 검증하는가가 관리자의 핵심 과제입니다.

> **"감시하지 않을수록, 더 많이 검증한다."** — Anthropic Skilljar, Lesson 08

| 검증 단계 | 방법 |
| --- | --- |
| 1. Diff부터 시작 | Claude의 요약이 아닌 `git diff` 자체를 먼저 확인 |
| 2. 테스트를 게이트로 | Stop Hook으로 테스트 실행 → 실패 시 턴 종료 거부 |
| 3. Cold Second Opinion | 별도 sub-agent로 리뷰 (작성에 참여하지 않은 신선한 시선) |

### Auto Mode 조직 구성 — 분류기에게 신뢰 경계를 알려주기

Auto Mode의 분류기는 "이 행동이 안전한가?"를 판단하지만, **조직의 신뢰 경계**를 모릅니다. managed settings로 이를 알려줍니다:

```json
// managed-settings.json 발췌
{
  "autoMode": {
    "trustedRepositories": ["github.corp.example/*"],
    "trustedBuckets": ["s3://corp-data-*"],
    "trustedDomains": ["*.corp.example"],
    "blockOverrides": ["Bash(aws iam *:*)"],
    "allowOverrides": ["Bash(kubectl get:*)"]
  }
}

```

| 키 | 효과 |
| --- | --- |
| `trustedRepositories` | 이 저장소의 코드를 신뢰 → 분류기가 더 관대하게 판정 |
| `trustedDomains` | 이 도메인으로의 네트워크 요청을 안전으로 분류 |
| `blockOverrides` | 분류기 판정과 무관하게 **무조건 차단** (IAM 변조 등) |
| `allowOverrides` | 분류기 판정과 무관하게 **무조건 허용** (읽기 명령 등) |

```bash
# 배포 전 시뮬레이션
claude auto-mode show              # 유효 구성 확인
claude auto-mode test "aws iam create-user x"   # 판정 미리보기

```

### 감사 훅 — 누가 무엇을 실행했는가

managed hooks로 모든 도구 호출을 중앙 로그에 기록할 수 있습니다:

```json
// managed-settings.json 발췌
{
  "allowManagedHooksOnly": true,
  "hooks": {
    "PostToolUse": [{
      "type": "command",
      "command": "./scripts/audit-log.sh"
    }]
  }
}

```

> `allowManagedHooksOnly: true`이면 사용자가 자체 훅을 추가할 수 없으므로, 감사 훅이 우회되지 않습니다.

### 권한 패턴 설계 전략

> **deny는 좁고 단단하게, allow는 넓고 명시적으로**

| 영역 | 패턴 | 예시 |
| --- | --- | --- |
| **managed deny** (최소, 불변) | 논쟁 없는 위험만 | `rm -rf`, `.env 읽기`, `curl |
| **명시 allow** (넉넉히) | 생산성 도구 | 빌드, 테스트, 린트, git 조회 |
| **ask (회색지대)** | 사람 확인 | git push, 배포 명령 |
| **auto 분류기** | 나머지 | 신뢰 경계 설정으로 보완 |

### 적용 검증

```bash
claude
> /status
# Enterprise managed settings (file)  ← 괄호 안 소스 확인
# Provider: Bedrock (env 강제)


### Auto Mode 조직 구성 — 분류기에게 신뢰 경계를 알려주기

Auto Mode의 분류기는 "이 행동이 안전한가?"를 판단하지만, **조직의 신뢰 경계**를 모릅니다. managed settings로 이를 알려줍니다:

```json
// managed-settings.json 발췌
{
  "autoMode": {
    "trustedRepositories": ["github.corp.example/*"],
    "trustedBuckets": ["s3://corp-data-*"],
    "trustedDomains": ["*.corp.example"],
    "blockOverrides": ["Bash(aws iam *:*)"],
    "allowOverrides": ["Bash(kubectl get:*)"]
  }
}

```

| 키 | 효과 |
| --- | --- |
| `trustedRepositories` | 이 저장소의 코드를 신뢰 → 분류기가 더 관대하게 판정 |
| `trustedDomains` | 이 도메인으로의 네트워크 요청을 안전으로 분류 |
| `blockOverrides` | 분류기 판정과 무관하게 **무조건 차단** (IAM 변조 등) |
| `allowOverrides` | 분류기 판정과 무관하게 **무조건 허용** (읽기 명령 등) |

```bash
# 배포 전 시뮬레이션
claude auto-mode show              # 유효 구성 확인
claude auto-mode test "aws iam create-user x"   # 판정 미리보기

```

### 감사 훅 — 누가 무엇을 실행했는가

managed hooks로 모든 도구 호출을 중앙 로그에 기록할 수 있습니다:

```json
// managed-settings.json 발췌
{
  "allowManagedHooksOnly": true,
  "hooks": {
    "PostToolUse": [{
      "type": "command",
      "command": "./scripts/audit-log.sh"
    }]
  }
}

```

> `allowManagedHooksOnly: true`이면 사용자가 자체 훅을 추가할 수 없으므로, 감사 훅이 우회되지 않습니다.

### 권한 패턴 설계 전략

> **deny는 좁고 단단하게, allow는 넓고 명시적으로**

| 영역 | 패턴 | 예시 |
| --- | --- | --- |
| **managed deny** (최소, 불변) | 논쟁 없는 위험만 | `rm -rf`, `.env 읽기`, `curl |
| **명시 allow** (넉넉히) | 생산성 도구 | 빌드, 테스트, 린트, git 조회 |
| **ask (회색지대)** | 사람 확인 | git push, 배포 명령 |
| **auto 분류기** | 나머지 | 신뢰 경계 설정으로 보완 |

# Sandbox: enabled

```

---

## 6. 모니터링과 비용

> **해결하는 문제**: "누가 얼마나 쓰는지, 이상은 없는지"

### 관측 3축

| 축 | 도구 | 지원 범위 |
|----|------|----------|
| **OTel** | 세션·도구·토큰 메트릭 송출 | 전 공급자 |
| **Analytics** | claude.ai/analytics/claude-code | Anthropic 경로 전용 |
| **Cost tracking** | 지출 한도, 비용 귀속 | 경로별 상이 |

### OTel 전사 배포

```json
// managed-settings.json의 env로 전사 배포
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "http://otel-collector.corp.example:4317",
    "OTEL_RESOURCE_ATTRIBUTES": "department=platform,team=payments"
  }
}

```

### 메트릭 카탈로그

| 카테고리 | 메트릭 | 활용 |
| --- | --- | --- |
| 세션 | 세션 수, 활성 시간 | 채택률 |
| 토큰 | 입력, 출력, 캐시 | 비용 근사 |
| 비용 | 추정 비용 카운터 | 모델 단가 반영 |
| 도구 | 호출 수, 승인/거부 | 정책 마찰 신호 |
| 코드 변화 | 수정 라인, 커밋, PR | 기여 추적 |

### AWS Budgets 예산 알람

```bash
aws budgets create-budget \
  --account-id 111122223333 \
  --budget '{ "BudgetName": "claude-code-monthly",
    "BudgetLimit": {"Amount":"5000","Unit":"USD"},
    "TimeUnit": "MONTHLY", "BudgetType": "COST",
    "CostFilters": {"Service":["Amazon Bedrock"]} }' \
  --notifications-with-subscribers '[{
    "Notification": {"NotificationType":"ACTUAL",
      "ComparisonOperator":"GREATER_THAN","Threshold":80},
    "Subscribers": [{"SubscriptionType":"SNS",
      "Address":"arn:aws:sns:...:cost-alerts"}] }]'

```

### SIEM 연계 — 보안 관점 활용

OTel Collector에서 Splunk, OpenSearch 등 SIEM으로 분기하면 보안 관점 탐지가 가능합니다:

| 탐지 규칙 | 조건 | 대응 |
| --- | --- | --- |
| 거부 급증 | 정책 거부 이벤트 단기 폭증 | 자동 티켓 발부, 정책 우회 시도 점검 |
| 심야 대량 | 비업무 시간 대량 토큰 사용 | 행태 축 알림 |
| 민감 경로 | `.env`, 키 파일 접근 시도 | DLP 훅 로그와 조인 |
| 신규 목적지 | 허용 밖 도메인/MCP 시도 | deniedMcpServers 긴급 배포 |

### 비용 귀속 — 3단 절단

OTel의 사용자 차원과 클라우드 호출 신원을 결합하면 비용을 정확히 귀속시킬 수 있습니다:

| 소스 | 차원 | 활용 |
| --- | --- | --- |
| **OTel** | `user.id`, 부서 리소스 속성 | 토큰/비용 개인·팀별 절단 |
| **CloudTrail** | 역할 세션 이름 | AWS 호출 주체 식별 |
| **apps gateway** | 사용자, 그룹 태그 기본 제공 | 경유 시 별도 구현 불필요 |

→ 부서, 팀, 개인 3단 리포트를 월간 자동 생성합니다.

### 비용 최적화 6가지 손잡이

| # | 레버 | 방법 |
| --- | --- | --- |
| 1 | **모델 배분** | 탐색은 haiku, 본대는 sonnet, opus는 선별 |
| 2 | **캐시 활용** | 프롬프트 캐시 적중 관리, fork의 캐시 공유 |
| 3 | **컨텍스트 위생** | `/clear` 습관, compact 임계 조정 |
| 4 | **서브에이전트** | 고볼륨 출력 격리로 메인 토큰 절약 |
| 5 | **배치 시간대** | 무인 작업은 야간 예약으로 피크 회피 |
| 6 | **한도 계층** | 그룹 기본 + 개인 예외의 지출 캡 |

### 분기 운영 리뷰 — 숫자로 도는 회의

| 주제 | 메트릭 | 의사결정 |
| --- | --- | --- |
| 채택 | 활성 사용자, 세션 추세 | 링 확산 판단 |
| 비용 | 부서별 절단, 모델 믹스 변화 | 배분 정책 조정 |
| 정책 | 거부 상위 규칙, 문의량 | 완화/강화 결정 |
| 안전 | 이상 신호, DLP 적중 | 탐지 규칙 갱신 |
| 성과 | 기여 지표(커밋, PR), 만족도 | 경영 보고 |

### 이상 사용 감지 신호

| 신호 | 기준 | 대응 |
| --- | --- | --- |
| 토큰 급증 | 이동 평균 3배 초과 | 자동 티켓 |
| 심야 대량 | 비업무 시간 지속 호출 | 행태 축 |
| 거부 급증 | 정책 거부 단기 폭증 | 정책 마찰 점검 |
| 신규 목적지 | 허용 밖 도메인 시도 | 보안 알림 |

---

## 7. 신원, 데이터, 컴플라이언스

> **해결하는 문제**: "감사관의 질문에 어떻게 답하는가?"

### SSO 두 레벨

| 레벨 | 범위 | 관리 |
| --- | --- | --- |
| **Claude 계정** | SSO, SCIM, 좌석 배정 | claude.ai 콘솔 |
| **클라우드 IAM** | Bedrock 호출 권한, 그룹 매핑 | Identity Center, Permission Set |

### 데이터 정책 핵심

| 항목 | 정책 |
| --- | --- |
| 학습 사용 | Team/Enterprise/API/클라우드 경로 **미사용** |
| 보존 | 경로별 retention, 공급자 정책 상속 |
| ZDR | 요청 완료 후 무저장, Enterprise 제공 |
| 로컬 데이터 | 세션 트랜스크립트 30일 기본 정리 (`cleanupPeriodDays`) |

### CloudTrail 통합 (Bedrock)

```bash
# InvokeModel은 데이터 이벤트: 트레일에 명시 활성 필요
aws cloudtrail put-event-selectors \
  --trail-name org-trail \
  --advanced-event-selectors '[{
    "Name": "BedrockInvoke",
    "FieldSelectors": [
      {"Field":"eventCategory","Equals":["Data"]},
      {"Field":"resources.type","Equals":["AWS::Bedrock::Model"]}
    ] }]'
# 기록: 시각, 주체(역할 세션), 모델 ARN, 소스 IP

```

### SOC 2 / ISO 27001 매핑

| 통제 항목 | 구현 | 관련 파트 |
| --- | --- | --- |
| 접근 통제 | SSO, Permission Set, 그룹 매핑 | Part 2, 7 |
| 변경 관리 | Policy as Code, PR 리뷰, 링 배포 | Part 5 |
| 로깅·감시 | CloudTrail, OTel, 감사 훅, SIEM | Part 5, 6, 7 |
| 공급망 | GPG 서명, 마켓플레이스 통제 | Part 1, 5 |
| 데이터 보호 | 학습 미사용, ZDR, 암호화 전송 | Part 7 |
| 가용성 | 게이트웨이 수평 확장, 버전 하한 | Part 1, 3 |

### 그룹 매핑 전략 — 한 그룹 체계로 두 층을 움직인다

IdP 그룹을 단일 원천(Single Source of Groups)으로 삼아, 두 층에서 동시에 매핑합니다:

| IdP 그룹 | 클라우드 층 (Permission Set) | 게이트웨이 층 (라우팅) |
| --- | --- | --- |
| `eng-platform` | PS-Claude-Full (전 모델) | opus, sonnet, haiku 허용, 월 $500 |
| `eng-default` | PS-Claude-Std (sonnet까지) | sonnet, haiku 허용, opus→sonnet 치환 |
| `contractors` | PS-Claude-Min (haiku만) | haiku만, 월 $100 |

> 그룹 변경이 곧 권한 변경 — 별도 작업 없이 IdP 하나만 수정하면 양 층이 동시에 반영됩니다.

### 세션과 오프보딩 — 떠나는 순간 접근도 끝난다

SSO 구조에서는 IdP 비활성화가 곧 접근 종료입니다:

| 단계 | 동작 | 잔여 위험 |
| --- | --- | --- |
| **원천 절단** | IdP 계정 비활성 즉시 신규 인증 불가 | — |
| **세션 만료** | SSO 세션과 STS 만료를 업무 리듬에 맞게 단축 (예: 8시간) | 만료 전 시간창 |
| **잔여 정리** | setup-token 등 장기 토큰 발급 대장 기반 회수 | 미회수 토큰 |
| **증적** | 비활성 시각과 마지막 호출 시각의 대조 리포트 | — |

### CloudTrail 감사 — 무엇이 기록되는가

Bedrock의 `InvokeModel`은 **데이터 이벤트**이므로 트레일에 명시적으로 활성화해야 합니다:

```bash
aws cloudtrail put-event-selectors \
  --trail-name org-trail \
  --advanced-event-selectors '[{
    "Name": "BedrockInvoke",
    "FieldSelectors": [
      {"Field":"eventCategory","Equals":["Data"]},
      {"Field":"resources.type","Equals":["AWS::Bedrock::Model"]}
    ]
  }]'

```

기록되는 정보: 시각, 주체(역할 세션), 모델 ARN, 소스 IP → 개인 귀속 가능

### 규제 매핑표 (SOC2, ISO 27001)

| 통제 항목 | Claude Code 구현 |
| --- | --- |
| 접근 통제 | SSO, Permission Set, 그룹 매핑 |
| 변경 관리 | Policy as Code, PR 리뷰, 링 배포 |
| 로깅·감시 | CloudTrail, OTel, 감사 훅, SIEM |
| 공급망 | GPG 서명, 마켓플레이스 통제 |
| 데이터 보호 | 학습 미사용, ZDR, 암호화 전송 |
| 가용성 | 게이트웨이 수평 확장, 버전 하한 |

### 외부 감사 대응 — 미리 싸두는 증적 패키지

| 패키지 | 내용 |
| --- | --- |
| 정책 원본 | managed-settings 이력, PR 기록, 배포 태그 |
| 적용 증명 | `/status` 소스 표기 수집본, 링별 검증 기록 |
| 행위 원장 | CloudTrail, 감사 훅, SIEM 조회 절차서 |
| 데이터 근거 | 학습 미사용·ZDR·retention 공식 문서 스냅샷 |

> 감사 통지 후 모으기 시작하면 늦습니다. 분기 리뷰 산출물과 함께 상시 갱신 상태를 유지합니다.

---

## 8. 트러블슈팅

> **해결하는 문제**: "관리자에게 오는 문의를 기계적으로 해결"

### 인증 진단표

| 증상 | 원인 | 처방 |
| --- | --- | --- |
| 로그인 루프 | 세션 혼선 | `/logout` 후 `/login` 재시도 |
| Enterprise 옵션 안보임 | 구버전 | `claude update` 후 재시작 |
| 조직 미배정 | 좌석에 Code 권한 미포함 | 어드민 콘솔 갱신 |
| Bedrock 자격 실패 | SSO 만료 | `aws sso login`, `sts get-caller-identity` |
| 헬퍼 키 오류 | 볼트 권한/TTL | 스크립트 단독 실행 검증 |

### 네트워크 진단표

| 증상 | 원인 | 처방 |
| --- | --- | --- |
| 타임아웃 | 프록시/방화벽 | `curl -v` 계층 분리 |
| TLS 오류 | 사내 CA 미등록 | `NODE_EXTRA_CA_CERTS` |
| 407 응답 | 인증 프록시 | 로컬 중계 |
| 부분 기능 실패 | 도메인 부분 차단 | 필수 도메인 표 대조 |
| 샌드박스 차단 | allowedDomains 누락 | 정책에 도메인 추가 |

### 진단 수집 표준 세트

```bash
claude doctor                    # 환경 진단, f 키 자동 수정
claude --version                 # 버전 확인
> /status                         # 공급자, 모델, managed 소스
> /context                        # 컨텍스트 점유 현황
claude --verbose 2> claude-debug.log   # 재현 로그
curl -v https://api.anthropic.com/     # 네트워크 경로 확인

```

### 에스컬레이션 경로

| 선 | 범위 | 담당 |
| --- | --- | --- |
| 1선 | 진단표 매칭, 계정, 좌석 | 헬프데스크 |
| 2선 | 정책, 네트워크, 게이트웨이 | 플랫폼 팀 |
| 3선 | Bedrock 쿼터, 서비스 이슈 | AWS Support |
| 3선 | 제품 결함, 문서 괴리 | Anthropic 지원 |

### 성능 문제 4갈래 분해

"느리다"는 문의가 오면 4가지 원인 중 어디인지 분해합니다:

| 원인 | 진단 방법 | 해결 |
| --- | --- | --- |
| **경로 지연** | `curl -v`로 프록시/검사장비 홉 측정 | 프록시 우회, 리전 변경 |
| **모델 선택** | 무거운 모델 기본값 여부 점검 | sonnet이면 충분한 작업에 opus 쓰는지 확인 |
| **컨텍스트 비대** | `/context` 명령으로 점유 확인 | `/clear` 또는 `/compact` 안내 |
| **쿼터 스로틀** | 429 응답 비율 관측 | 리전 TPM 한도 증설 요청 |

### 진단 수집 — 문의 접수 시 표준 세트

```bash
# 1차 자가 진단
claude doctor              # 환경 진단, f 키 자동 수정
claude --version           # 버전 확인

# 세션 내 진단
> /status                  # 공급자, 모델, managed 소스
> /context                 # 컨텍스트 점유 현황

# 재현 로그 수집
claude --verbose 2> claude-debug.log
# 재현 후 로그 회수

# 네트워크 분리 진단
curl -v https://api.anthropic.com/

```

> 접수 양식에 **시각, 사용자, 저장소 경로, claude --version, /status 출력**을 표준으로 요구합니다.

### 에스컬레이션 경로 상세

| 선 | 담당 | 범위 | 도구 |
| --- | --- | --- | --- |
| **1선** (헬프데스크) | 진단표 매칭, 계정·좌석 | 재로그인, 업데이트 안내 | doctor, /status |
| **2선** (플랫폼팀) | 정책, 네트워크, 게이트웨이 | 정책 수정, 프록시 경로 조정 | managed settings, gateway logs |
| **3선 AWS** | Bedrock 쿼터, 서비스 이슈 | 쿼터 증설, 서비스 상태 확인 | AWS Support Case |
| **3선 Anthropic** | 제품 결함, 문서 괴리 | 버그 리포트 | /feedback, HackerOne |

> 진단 번들 표준화가 각 선을 잇는 공용어입니다 — 정보 누락으로 반복 질문하는 시간을 없앱니다.

---

## 9. Recap & Labs

### 핵심 요약 6문장

| 영역 | 한 문장 |
| --- | --- |
| **배포** | 플랫폼별 표준 조합, `stable` + `minimumVersion`, 링 롤아웃 |
| **자격증명** | 사람은 SSO, 기계는 볼트 헬퍼, CI는 OIDC, 키 배포 0 |
| **게이트웨이** | SSO 로그인 + 그룹 모델 라우팅 + 지출 한도 + OTLP |
| **네트워크** | 프록시·CA로 열고, sandbox 도메인과 DLP로 좁힘 |
| **거버넌스** | managed 4채널, 배열 병합, 잠금 키, Policy as Code |
| **관측** | OTel 전사 계측, 귀속 태그, 예산 알람, 분기 리뷰 |

### 실습 3종

| Lab | 소요 | 핵심 |
| --- | --- | --- |
| **Lab 1: managed 정책 배포** | 15분 | `/etc/claude-code/`에 정책 배치 → `/status` 확인 → deny 체험 |
| **Lab 2: Bedrock SSO 전환** | 25분 | USE_BEDROCK=1 + SSO 로그인 → `/status` Provider 확인 |
| **Lab 3: OTel 관측 배선** | 20분 | docker compose로 컬렉터 → ENABLE_TELEMETRY=1 → 대시보드 확인 |

### 실행 로드맵

| 기간 | 마일스톤 |
| --- | --- |
| **Day 0-30** | 공급자 확정, 파일럿 링, 정책 초판 |
| **Day 31-60** | managed 전 채널, 샌드박스, OTel 배포 |
| **Day 61-90** | 전사 링, 게이트웨이, 분기 리뷰 1회차 |

---

## References

### 1차 출처 (본문 작성 기반)

| # | 출처 | 상세 |
| --- | --- | --- |
| [1] | **Claude Code Deep Dive Workshop — Chapter 3: Admin Setup** | AWS Korea, 2026.07. [github.com/whchoi98/claude-code-workshop](https://github.com/whchoi98/claude-code-workshop) |
| [2] | **Claude Code in Action** | Anthropic Skilljar. Lesson NEW-04 (Permission Modes), NEW-05 (Hooks), NEW-08 (Verifying Runs), NEW-09 (Plugins). [anthropic.skilljar.com](https://anthropic.skilljar.com) |
| [3] | **Claude Code on Amazon Bedrock 온라인 프로그램** | AWS Skill Builder. Module 07 (MCP와 Sub-agents). [skillbuilder.aws](https://skillbuilder.aws) |

### 공식문서 (교차 검증)

| # | 문서 | URL |
| --- | --- | --- |
| [4] | Admin setup | [docs.anthropic.com/en/docs/claude-code/admin-setup](https://docs.anthropic.com/en/docs/claude-code/admin-setup) |
| [5] | Server-managed settings | [docs.anthropic.com/en/docs/claude-code/server-managed-settings](https://docs.anthropic.com/en/docs/claude-code/server-managed-settings) |
| [6] | Claude apps gateway | [docs.anthropic.com/en/docs/claude-code/claude-apps-gateway](https://docs.anthropic.com/en/docs/claude-code/claude-apps-gateway) |
| [7] | Network config | [docs.anthropic.com/en/docs/claude-code/network-config](https://docs.anthropic.com/en/docs/claude-code/network-config) |
| [8] | Monitoring usage | [docs.anthropic.com/en/docs/claude-code/monitoring-usage](https://docs.anthropic.com/en/docs/claude-code/monitoring-usage) |
| [9] | Security | [docs.anthropic.com/en/docs/claude-code/security](https://docs.anthropic.com/en/docs/claude-code/security) |

---

