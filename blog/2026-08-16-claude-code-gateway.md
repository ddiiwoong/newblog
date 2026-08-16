---
layout: single
title: "실제 Claude Code를 게이트웨이에 붙이면 — 관문 세 개와 신원이 찍힌 텔레메트리"
comments: true
classes: wide
description: "Claude apps gateway에 실제 CLI를 로그인시켜 IdP 연동, 텔레메트리 수집, 정책 전달까지 검증한 실습 기록"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: claude-code/gateway-observability
date: 2026-08-16
categories:
  - Claude Code
tags:
  - Claude Code
  - Gateway
  - OpenTelemetry
  - Keycloak
  - Observability
  - Governance
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

# 실제 Claude Code를 게이트웨이에 붙이면 — 관문 세 개와 신원이 찍힌 텔레메트리

> 대상: Claude Code Deep Dive Workshop Chapter 3 §3 "Claude apps gateway"
>
> 공식 문서: [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) ·
> [설정 레퍼런스](https://code.claude.com/docs/en/claude-apps-gateway-config) ·
> [모니터링](https://code.claude.com/docs/en/monitoring-usage)
>
> 검증: Claude Code 2.1.224 (네이티브 빌드) · Keycloak 26.0 · PostgreSQL 16 ·
> OTel Collector 0.116 · Prometheus 3.1 · Loki 3.3 · Grafana 11.5

Claude apps gateway는 조직이 Claude Code를 자체 IdP로 인증시키고, 그룹별 정책을 밀어 넣고,
사용량을 자체 관측 스택으로 받게 하는 게이트웨이다. 게이트웨이를 세우고 엔드포인트를 하나씩
찔러 보면 무엇을 내려주는지는 알 수 있다. 그런데 **CLI가 그걸 어떻게 처리하는지**는 서버 쪽에서
보이지 않는다.

이 글은 로컬에 IdP와 저장소, 관측 스택까지 세우고 **진짜 Claude Code를 로그인시켜** 확인한
기록이다.

세 가지가 나왔다. 첫째, 로그인에는 **문서에 없는 관문 세 개**가 있고 전부 기본값이 거부이거나
대기다. 둘째, 그중 하나는 **텔레메트리를 완전히 막는다** — 로그를 보지 않으면 원인을 알 수 없다.
셋째, 관문을 통과하면 게이트웨이의 실질적 가치가 나타난다. **개발자가 지울 수 없는 신원이
모든 텔레메트리에 찍혀 나온다.**

<!--truncate-->

---

## 용어 사전

### 설정과 전달 경로

| 용어 | 의미 |
|---|---|
| `managed-settings.json` | 조직이 MDM으로 개발자 머신에 배포하는 최상위 설정 파일. `forceLoginMethod: "gateway"`가 로그인을 게이트웨이로 강제한다 |
| `/managed/settings` | 게이트웨이가 로그인한 CLI에게 정책을 내려주는 엔드포인트. ETag 캐싱 |
| `remote-settings.json` | CLI가 `/managed/settings` 응답을 캐시하는 로컬 파일 (`~/.claude/`) |
| `gatewayTrust` | CLI가 게이트웨이의 TLS leaf 지문을 호스트명별로 핀한 기록 (`~/.claude/.credentials.json`) |
| catch-all 베이스 | `match: {}`인 정책. 인증만 통과한 모두에게 적용되며 다른 정책의 병합 기준이 된다 |

### 텔레메트리

| 용어 | 의미 |
|---|---|
| OTLP | OpenTelemetry Protocol. 게이트웨이는 OTLP/HTTP만 중계한다 (gRPC 불가) |
| delta / cumulative | 카운터 누적 방식. Claude Code 기본은 delta, Prometheus는 cumulative를 요구한다 |
| `identity.source` | 게이트웨이 세션의 모든 export에 붙는 속성. 값은 `gateway-oidc` |
| `user.groups` | IdP 그룹 멤버십. 메트릭 라벨에서는 콤마 구분 단일 문자열이다 |
| 라벨 승격 | OTLP 리소스 속성을 Prometheus 라벨로 올리는 것. 인당 집계의 전제 조건 |

---

## 1. 서버를 찔러보는 것과 클라이언트를 붙이는 것

게이트웨이 검증에는 두 층이 있다. 엔드포인트를 호출해 응답을 보는 것과, 실제 CLI를 연결해
그 응답이 어떻게 쓰이는지 보는 것이다. 확인 가능한 범위가 다르다.

| 확인 대상 | API 호출로 | 실제 CLI로 |
|---|---|---|
| 게이트웨이가 어떤 정책을 내려주는가 | 가능 | 가능 |
| CLI가 그 정책을 **적용하는가** | 불가 | 가능 |
| 로그인 과정에서 개발자가 무엇을 보는가 | 불가 | 가능 |
| 텔레메트리에 어떤 신원이 찍히는가 | 불가 | 가능 |
| 관리자의 설정 변경이 개발자 화면에 무엇을 띄우는가 | 불가 | 가능 |

앞의 두 항목만 필요하면 `curl`로 충분하다. 인증 흐름과 정책 응답은 그렇게 검증할 수 있다.

문제는 아래 세 항목이다. **관리자가 설정 한 줄을 바꿨을 때 개발자 화면에 무엇이 뜨는지는
서버 쪽에서 관측되지 않는다.** 이 글의 발견 대부분이 거기서 나왔다.

---

## 2. 실습 환경 — 컨테이너와 세 가지 제약

평소 쓰는 개발 머신에서 그대로 하기는 어렵다. 게이트웨이 연결은 **머신 전체에 적용되는
관리 설정 파일**로 켜지기 때문이다.

| 플랫폼 | 경로 |
|---|---|
| macOS | `/Library/Application Support/ClaudeCode/managed-settings.json` |
| Linux / WSL | `/etc/claude-code/managed-settings.json` |
| Windows | `C:\Program Files\ClaudeCode\managed-settings.json` |

여기에 `forceLoginMethod: "gateway"`를 쓰면 그 머신의 **모든** Claude Code 세션이 게이트웨이로
넘어간다. 이미 쓰고 있던 로그인이 끊기고, 실습이 끝나면 되돌려야 한다. 사용자를 바꿔가며
정책 차등을 보려면 로그인을 반복해야 하는데 그때마다 평소 작업 환경이 흔들린다.

컨테이너는 이 문제를 없앤다. 관리 설정 파일과 `~/.claude`가 컨테이너 안에만 있으니 호스트는
무해하고, 상태를 지우고 처음부터 다시 하기도 쉽다. 게이트웨이 서버가 **프로덕션에서는
Linux만 지원**(macOS는 로컬 개발용)이라는 점도 컨테이너와 맞다.

환경 구성에서 알아야 할 것은 세 가지다.

**첫째, 클라이언트와 게이트웨이가 같은 `localhost`를 봐야 한다.** `http://`는 게이트웨이
호스트가 loopback일 때만 허용되므로, TLS 인증서를 만들지 않으려면 둘이 같은 네트워크
네임스페이스에 있어야 한다. 텔레메트리 목적지도 같은 제약을 받는다.

```
claude gateway: [{"code":"custom",
  "message":"forward_to.url must be https:// (http:// allowed for loopback only)",
  "path":["telemetry","forward_to",0,"url"]}]
```

수집기를 별도 호스트명으로 두면 이렇게 부팅이 실패한다. 문서가 제시하는 해법은 HTTPS로
노출하거나 사이드카로 두는 것이고, 후자를 택해 `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1`을 줬다.

**둘째, issuer 주소는 브라우저도 해석할 수 있어야 한다.** 게이트웨이는 디스커버리에서 얻은
`authorization_endpoint`로 브라우저를 리다이렉트한다. issuer를 `http://keycloak:8081`처럼 도커
네트워크 이름으로 두면 그 주소가 리다이렉트에 실려 나가고, 개발자 브라우저는 해석하지 못해
사인인이 그 지점에서 멈춘다. Keycloak도 같은 네임스페이스에 두면 issuer를
`http://localhost:8081`로 통일할 수 있다 — 게이트웨이와 브라우저가 같은 주소를 쓴다.

**셋째, 게이트웨이는 IdP보다 먼저 뜰 수 없다.** 부팅은 OIDC 디스커버리에 fail-closed다.

```
{"evt":"config.load","path":"/etc/claude/gateway.yaml","sha256":"652251dc…"}
[gateway] info waiting for migration lock (another replica may be migrating; …)
claude gateway: connect ECONNREFUSED 172.18.0.4:8081
```

기동 순서를 보장해야 한다. 오케스트레이터에서는 initContainer나 readinessProbe가 같은 역할이다.

정상 부팅은 이렇게 요약된다.

```
[gateway] info claude gateway listening on http://0.0.0.0:8080
[gateway] info public_url http://localhost:8080
[gateway] info oidc issuer http://localhost:8081/realms/claude
[gateway] info email domains example.com
[gateway] info upstreams 1: bedrock(bedrock)
[gateway] info telemetry relay: 1 destination(s), signals enabled: metrics,logs
[gateway] info managed settings: configured
[gateway] warn no managed policy carries a desktop: block — …
```

`telemetry relay: 1 destination(s), signals enabled: metrics,logs`가 텔레메트리 팬아웃이
활성화됐다는 신호다. 그리고 이 한 줄이 §3의 세 번째 관문을 유발한다.

### 구성 요소

```mermaid
flowchart LR
    BR["개발자 브라우저"]

    subgraph NS["공유 네트워크 네임스페이스 — 서로를 localhost 로 본다"]
        CLI["claude CLI<br/>개발자 클라이언트"]
        GW["claude gateway<br/>:8080"]
        KC["Keycloak<br/>:8081"]
        OT["OTel Collector<br/>:4318 수신 · :8889 노출"]
    end

    subgraph NET["compose 네트워크"]
        PG["PostgreSQL<br/>device grant · spend · audit"]
        PR["Prometheus"]
        LK["Loki"]
        GF["Grafana<br/>:3000"]
    end

    BD["Amazon Bedrock<br/>bedrock-runtime"]

    CLI -->|"디바이스 코드 · 정책 · 텔레메트리"| GW
    BR -->|"검증 페이지"| GW
    BR -->|"로그인 폼"| KC
    GW -->|"OIDC 디스커버리 · 토큰"| KC
    GW -->|"세션 · 지출 · 감사"| PG
    GW -->|"OTLP 팬아웃"| OT
    GW -->|"추론"| BD
    PR -->|"스크레이프"| OT
    OT -->|"이벤트"| LK
    GF --> PR
    GF --> LK

    style GW fill:#fff2e6,stroke:#e80
    style CLI fill:#e6ffe6,stroke:#2a2
    style OT fill:#f0e6ff,stroke:#82c
```

| 구성 요소 | 역할 | 왜 필요한가 |
|---|---|---|
| `claude gateway` | 인증·정책·텔레메트리 중계 | 이 실습의 대상 |
| `claude CLI` | 개발자 클라이언트 | 정책이 실제로 적용되는지 확인하는 유일한 방법 |
| Keycloak | OIDC IdP | 그룹 클레임으로 RBAC 차등을 만든다 |
| PostgreSQL | 게이트웨이 필수 저장소 | 디바이스 코드 랑데부가 여기 있어 없으면 사인인이 성립하지 않는다 |
| OTel Collector | OTLP 수신 → Prometheus·Loki 분배 | 게이트웨이는 OTLP/HTTP 만 중계한다 |
| Prometheus · Loki | 메트릭 · 이벤트 저장 | 메트릭과 로그가 별개 시그널이라 목적지도 둘 |
| Grafana | 대시보드 | 인당·그룹별 귀속을 눈으로 확인 |
| Amazon Bedrock | 업스트림 | 추론이 실제로 나가는지 확인 |

`claude CLI`·`Keycloak`·`OTel Collector`가 게이트웨이와 같은 네임스페이스에 있는 것이 위
세 제약의 귀결이다. 브라우저는 호스트에서 접속하는데, 게이트웨이가 퍼블리시한 8080·8081을
쓰므로 게이트웨이·IdP 양쪽에 같은 `localhost` 주소로 닿는다.

### 스택 정의

```yaml
# docker-compose.yaml
services:
  postgres:                          # 게이트웨이 필수 저장소
    image: postgres:16-alpine
    container_name: gw-postgres
    environment: { POSTGRES_USER: gw, POSTGRES_PASSWORD: gwpw, POSTGRES_DB: gateway }
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U gw -d gateway"]
      interval: 3s
      retries: 20

  keycloak:                          # OIDC IdP. 그룹 클레임으로 RBAC 차등을 만든다
    image: quay.io/keycloak/keycloak:26.0
    container_name: gw-keycloak
    command: ["start-dev", "--http-port=8081", "--import-realm"]
    network_mode: "service:gw-server"  # 이유는 아래 "issuer 주소" 참고
    depends_on: [gw-server]
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: admin
    volumes:
      - ./keycloak-realm.json:/opt/keycloak/data/import/claude-realm.json:ro
    # 26.x 는 /health 가 관리포트(9000)에 있고 컨테이너에 curl 이 없어
    # 헬스체크를 붙이기 어렵다. 기동 대기는 gw-server 쪽에서 한다.

  gw-server:
    image: claude-gw-lab:latest
    container_name: gw-server
    # 부팅이 OIDC 디스커버리에 fail-closed 이므로 IdP 를 먼저 기다린다
    command:
      - bash
      - -lc
      - |
        until curl -sf http://localhost:8081/realms/claude/.well-known/openid-configuration \
              >/dev/null; do sleep 2; done
        exec claude gateway --config /etc/claude/gateway.yaml
    # 8080 게이트웨이 · 8081 Keycloak · 8889 사이드카 수집기 exporter
    # (8081/8889 는 netns 를 공유하는 컨테이너가 리슨한다)
    ports: ["8080:8080", "8081:8081", "8889:8889"]
    env_file: [.env.secret]              # Bedrock 업스트림 키 (비어 있어도 부팅된다)
    environment:
      OIDC_CLIENT_SECRET: lab-gateway-secret
      GATEWAY_JWT_SECRET: ${GATEWAY_JWT_SECRET}
      GATEWAY_POSTGRES_URL: postgres://gw:gwpw@postgres:5432/gateway
      GATEWAY_ADMIN_WRITE_KEY: ${GATEWAY_ADMIN_WRITE_KEY}
      GATEWAY_ADMIN_READ_KEY: ${GATEWAY_ADMIN_READ_KEY}
      CLAUDE_GATEWAY_ALLOW_LOOPBACK: "1"   # 사이드카가 loopback 목적지라서 필요
    volumes: ["./gateway-observed.yaml:/etc/claude/gateway.yaml:ro"]
    depends_on:
      postgres: { condition: service_healthy }

  otel:                              # 사이드카. 게이트웨이에게 http://localhost:4318
    image: otel/opentelemetry-collector-contrib:0.116.1
    container_name: gw-otel
    command: ["--config=/etc/otel/config.yaml"]
    network_mode: "service:gw-server"
    volumes: ["./otel-observed.yaml:/etc/otel/config.yaml:ro"]
    depends_on: [gw-server]

  loki:
    image: grafana/loki:3.3.2
    container_name: gw-loki
    command: ["-config.file=/etc/loki/local-config.yaml"]

  prometheus:                        # 사이드카 exporter 를 gw-server:8889 로 스크레이프
    image: prom/prometheus:v3.1.0
    container_name: gw-prometheus
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.retention.time=6h
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml:ro"]
    depends_on: [gw-server]

  grafana:
    image: grafana/grafana:11.5.1
    container_name: gw-grafana
    ports: ["3000:3000"]
    environment:
      GF_AUTH_ANONYMOUS_ENABLED: "true"
      GF_AUTH_ANONYMOUS_ORG_ROLE: Admin
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning:ro
      - ./grafana/dashboards:/var/lib/grafana/dashboards:ro
    depends_on: [prometheus, loki]

  gw-client:                         # 실제 개발자 머신 역할
    image: claude-gw-lab:latest
    container_name: gw-client
    network_mode: "service:gw-server"  # localhost:8080 이 게이트웨이가 되도록
    volumes:
      - ./managed-settings.json:/etc/claude-code/managed-settings.json:ro
      - ./workspace:/workspace
      # 로그인 세션을 컨테이너 밖에 둔다. gw-server 를 재생성하면 netns 를
      # 공유하는 gw-client 도 재생성되므로, 볼륨이 없으면 로그인이 날아간다.
      - claude-home:/root/.claude
    depends_on: [gw-server]
    command: ["sleep", "infinity"]

volumes:
  claude-home:
```

`gw-server`와 `gw-client`가 같은 이미지를 쓴다. 게이트웨이 서버와 개발자 클라이언트가 같은
바이너리이기 때문이다. 이미지는 `ubuntu:24.04`에 `claude.ai/install.sh`로 네이티브 설치한
것이다 — npm 설치본은 `requires the native binary`로 게이트웨이가 부팅하지 않는다.

### 개발자 머신에 배포하는 것

```json
{
  "forceLoginMethod": "gateway",
  "forceLoginGatewayUrl": "http://localhost:8080",
  "parentSettingsBehavior": "merge"
}
```

이 파일만 읽혀도 CLI 상태에 반영된다.

```
$ claude auth status --json
{ "loggedIn": false, "authMethod": "none",
  "apiProvider": "firstParty", "forcedLoginMethod": "gateway" }
```

`forcedLoginMethod: "gateway"`가 잡혔다. 이 상태에서 비대화식 로그인은 거부된다.

```
$ claude auth login
forceLoginMethod is 'gateway' in managed settings; run interactive /login to authenticate.
```

**게이트웨이 로그인은 대화식 `/login` 전용이다.** 우회 플래그도, 비대화식 경로도 없다.
CI 파이프라인이 게이트웨이로 인증할 수 없는 근본 이유가 이것이다.

---

## 3. 관문 세 개 — 문서에 없는 부분

문서는 "`/login`을 실행하고 Cloud gateway 화면에서 Enter를 누른 뒤 브라우저 로그인을
완료한다"고만 쓴다. 실제로는 확인 화면이 셋 더 나온다.

**① 연결과 신뢰 — 터미널**

```mermaid
flowchart LR
    A["/login"] --> B["Cloud gateway<br/>Enter"]
    B --> G1["관문 1<br/>게이트웨이 지문<br/>기본 커서 = No"]
    G1 --> C["디바이스 코드<br/>XXXX-XXXX"]
    style G1 fill:#ffe6e6,stroke:#c33
```

**② 승인 — 브라우저**

```mermaid
flowchart LR
    D["검증 페이지<br/>This matches my device"] --> E["IdP 로그인"]
    E --> F["게이트웨이 콜백<br/>쿠키 해시 대조"]
```

**③ 세션 준비 — 터미널**

```mermaid
flowchart LR
    P["폴링 성공"] --> G2["관문 2<br/>작업 디렉터리 신뢰"]
    G2 --> G3["관문 3<br/>관리 설정 승인"]
    G3 --> H["세션 준비 완료<br/>텔레메트리 초기화"]
    style G2 fill:#ffe6e6,stroke:#c33
    style G3 fill:#ffe6e6,stroke:#c33
    style H fill:#e6ffe6,stroke:#2a2
```

빨간 상자 셋이 문서에 없는 관문이다. 셋 다 기본값이 거부이거나 대기이고, 통과하지 못하면
세션은 겉으로만 살아 있다.

| 관문 | 기본 상태 | 통과하지 못하면 |
|---|---|---|
| 1. 게이트웨이 지문 신뢰 | 커서가 "No, go back" | 연결되지 않는다 |
| 2. 작업 디렉터리 신뢰 | 미수락 | 세션이 준비 상태에 도달하지 못한다 |
| 3. 관리 설정 승인 | 대기 | **텔레메트리가 초기화되지 않는다** |

### 관문 1: 게이트웨이 지문 신뢰

```
Trust gatewaylcalhost?
You haven' conectedtothisgatewaybefore.Oncetrusted,itcanpush
settingstothismachinethatexecutecommandsandchangeyourenvironment.
Onlycontinueifthisisyourorganization'sgateway.

Certificatefingerprint(SHA-256):http-loopback…

  1.Yes,trustthisgateway
❯ 2.No,goback
```

TUI가 문자 단위로 커서를 옮겨 그려 캡처에서 공백이 사라진 부분이 있다. 원문 그대로다.

**기본 커서가 2번 "No, go back"에 있다.** 개발자가 명시적으로 올려서 승인해야 한다.
`http://` loopback 배치에서는 지문 자리에 리터럴 `http-loopback`이 들어간다. 핀할 인증서가
없기 때문이다. 승인 결과는 호스트명별 지문 맵으로 기록된다.

```json
{ "gatewayTrust": { "localhost": "http-loopback" } }
```

> **실제 확인**: `claude auth logout`은 세션뿐 아니라 이 핀까지 지운다. 사용자를 바꿔가며
> 실습하면 매번 지문 프롬프트를 다시 본다. 운영에서는 인증서 교체 시 전 개발자가 이 화면을
> 보게 되므로 계획된 이벤트로 다뤄야 한다.

### 사이: 브라우저가 하는 일

관문 1을 통과하면 CLI가 디바이스 코드와 검증 URL을 표시하고 폴링에 들어간다. 브라우저는
게이트웨이의 검증 페이지를 먼저 만난다.

```
GET http://localhost:8080/device?user_code=TMHT-KVQM

<title>Claude Code</title>
<h1>Approve sign-in?</h1>
<button class="go" type="submit">This matches my device — continue</button>
```

여기서 "This matches my device"라고 묻는 이유가 있다. 디바이스 코드 플로우는 코드를 아는 사람이
승인하는 구조라, 피싱으로 얻은 코드를 남이 승인하게 만드는 공격이 성립한다. 화면에 뜬 코드가
**내 터미널의 코드와 같은지** 확인하라는 것이 이 문구다.

버튼을 누르면 IdP로 리다이렉트되고, 로그인 후 `/oauth/callback`으로 돌아와 사인인이 확정된다.
그 시점에 터미널의 폴링이 성공한다.

리다이렉트 URL에 두 가지가 보인다. **PKCE(S256)가 기본으로 켜져 있고**(`use_pkce` 기본값 `true`),
`state`가 암호화된 JWE다 — 디바이스 코드 키, PKCE verifier, nonce, 브라우저 해시를 서버가 상태
저장 없이 실어 보낸다.

```
http://localhost:8081/realms/claude/protocol/openid-connect/auth
  ?client_id=claude-gateway&scope=openid%20profile%20email%20offline_access
  &response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2Fcallback
  &state=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiMDg1NDA4NTRjYTFmOGJhNiJ9..
  &nonce=u-0f17Le9fbqgxiohHjZigzTiH3it-w174N_2d8ffK0
  &code_challenge=zE9N01HiGJ2rrbNYQddT_hZq5b1NU8Hjsdoa-iILoRM
  &code_challenge_method=S256&response_mode=query
```

그리고 이 왕복은 **같은 브라우저에서 끝나야 한다.** 게이트웨이가 `/device` 응답에 심은 `gw_dev`
쿠키의 해시를 `/oauth/callback`에서 대조한다. 다른 브라우저에서 시작된 링크는 거부된다.

```
{"evt":"device.callback","result":"browser_mismatch"}
→ "This sign-in link was started in a different browser."
```

피싱으로 얻은 코드를 다른 곳에서 승인시키는 공격을 막는 두 번째 층이다. 첫 번째 층이 검증
페이지의 "This matches my device" 확인이었다.

### 관문 2: 작업 디렉터리 신뢰

```
Do you trust the files in this folder?
  1.Yes,proceed
❯ 2.No,exit
Entertoconfirm·Esctocancel
```

수락하지 않으면 **세션이 준비 상태에 도달하지 못한다.** 겉으로는 REPL이 떠 있지만 훅도,
텔레메트리도 동작하지 않는다. 유일한 단서는 디버그 로그다.

```
[DEBUG] Skipping SessionEnd:other hook execution - workspace trust not accepted
```

이것 때문에 한동안 "CLI가 텔레메트리를 안 보낸다"고 오진했다. `session.count`는 세션 시작에
발생하는 메트릭인데, 세션이 시작되지 않았던 것이다.

실습을 반복할 때는 `~/.claude.json`에 미리 심어 이 화면을 건너뛸 수 있다.

```json
{
  "projects": {
    "/workspace": { "allowedTools": [], "hasTrustDialogAccepted": true, "history": [] }
  }
}
```

### 관문 3: 관리 설정 승인

가장 중요한 관문이다.

```
Managedsettingsrequireapproval

Yourorganizationhasconfiguredmanagedsettingsthatcouldallowexecution
ofarbitrarycodeorinterceptionofyourpromptsandresponses.

Settingsrequiringapproval:
 · OTEL_EXPORTER_OTLP_ENDPOINT

Onlyacceptifyoutrustyourorganization'sITadministrationandexpect
thesesettingstobeconfigured.

❯ 1.Yes,Itrustthesesettings
  2.No,exitClaudeCode
```

승인 전에는 CLI가 원격 설정 로딩 자체를 미룬다. 그리고 텔레메트리는 원격 설정을 기다린다.

```
[DEBUG] Remote settings: Fetched successfully
[DEBUG] Remote settings: Loading promise timeout deferred — consent dialog pending
[DEBUG] [3P telemetry] Waiting for remote managed settings before telemetry init
```

승인이 없으면 원격 설정이 적용되지 않고, 그러면 텔레메트리가 초기화되지 않는다. 승인 후에야
`~/.claude/remote-settings.json`이 생기고 다음이 이어진다.

```
[3P telemetry] Remote managed settings loaded, initializing telemetry
[3P telemetry] isTelemetryEnabled=true (CLAUDE_CODE_ENABLE_TELEMETRY=1)
[3P telemetry] getOtlpReaders: types=["otlp"], interval=5000,
               protocol=http/protobuf, endpoint=http://localhost:8080
[3P telemetry] getOtlpLogExporters: types=["otlp"], protocol=http/protobuf, …
[3P telemetry] Created 1 log exporter(s)
[3P telemetry] First metrics export: SUCCESS
```

> **운영 영향**: `telemetry.forward_to`를 켜면 게이트웨이가 `OTEL_EXPORTER_OTLP_ENDPOINT`를
> 관리 설정에 자동 주입하고, 그 변수가 승인 목록에 올라간다. 즉 **게이트웨이에 텔레메트리를
> 켜는 것은 연결된 모든 개발자에게 승인 프롬프트를 띄우는 일이다.** 롤아웃 공지 없이 넣으면
> "누가 내 프롬프트를 가로챈다는 경고가 떴다"는 문의가 먼저 온다.

승인 목록이 무엇을 담는지도 살펴볼 만하다. `CLAUDE_CODE_ENABLE_TELEMETRY`,
`OTEL_METRICS_EXPORTER`, `OTEL_EXPORTER_OTLP_PROTOCOL`은 목록에 없고 **엔드포인트만** 있다.
승인 대상은 "텔레메트리를 켜는 것"이 아니라 **"데이터가 어디로 가는지"** 다. 이 구분은 정직하다.

세 관문 중 이것만 기본 커서가 1번 Yes에 있다. 앞의 둘과 달리 Enter로 승인된다.

### 로그인 완료

```
$ claude auth status --json
{ "loggedIn": true, "authMethod": "third_party",
  "apiProvider": "gateway", "forcedLoginMethod": "gateway" }
```

`apiProvider`가 `firstParty`에서 `gateway`로 바뀐 것이 실제 연결 완료 신호다. 자격증명
파일은 두 키를 갖는다. `gatewayTrust`는 지문 맵이고 `enterpriseGateway`는 게이트웨이 세션이다.

---

## 4. 정책 전달 — 실제 CLI가 받은 것

게이트웨이 설정의 정책 부분은 이렇게 뒀다. 그룹별로 다른 것을 내려주고, 마지막 `match: {}`이
인증만 통과한 모두에게 적용되는 catch-all 베이스다.

```yaml
# gateway-observed.yaml 중 정책·텔레메트리 부분
managed:
  policies:
    - match: { groups: [eng-contractors] }
      cli:
        availableModels: [claude-haiku-4-5]
        enforceAvailableModels: true
        permissions:
          allow: [Read, Grep]

    - match: { groups: [eng-platform] }
      cli:
        # 아래 세 개는 models[] 로 직접 선언한 모델이다 (같은 절 뒷부분 참고)
        availableModels: [claude-opus-5, claude-sonnet-5, claude-sonnet-4-6,
                          claude-opus-4-5, claude-sonnet-4-5, claude-haiku-4-5]

    - match: {}                       # catch-all 베이스
      cli:
        availableModels: [claude-sonnet-4-5, claude-haiku-4-5]
        permissions:
          deny: ["Read(./.env)", "Read(./secrets/**)"]

telemetry:
  forward_to:
    - url: http://localhost:4318      # 사이드카. ALLOW_LOOPBACK=1 이 필요하다
      metrics: true
      logs: true                      # 이벤트까지. Bash 명령·파일 경로가 실려온다
      traces: false
```

부팅 시 병합 결과를 미리 알려준다.

```
[gateway] info managed.policies[0] after merge with catch-all base — changed keys: permissions
[gateway] info managed.policies[1] after merge with catch-all base — changed keys: permissions
```

이 정책이 실제 CLI에 어떻게 도달하는지 사용자 넷으로 확인했다. 그룹 구성을 달리해 정책 해석이
갈리도록 했다.

| 사용자 | IdP 그룹 | 매칭 | `availableModels` | `enforce` | `allow` |
|---|---|---|---|---|---|
| alice | `eng-platform`, `platform-finops` | policy[1] | 6개 | (없음) | (없음) |
| bob | `eng-platform` | policy[1] | 6개 | (없음) | (없음) |
| carol | `eng-contractors` | policy[0] | haiku-4-5 | **true** | Read, Grep |
| dan | `platform-finops` | **매치 없음** | sonnet-4-5, haiku-4-5 | (없음) | (없음) |

여기서 규칙 셋이 드러난다.

**`match.groups`는 부분 겹침으로 매칭된다.** alice는 그룹이 둘이고 bob은 하나인데 같은 정책을
받았다. `match: { groups: [eng-platform] }`에 **하나만 겹치면** 매칭이다. 여러 그룹을 나열하면
OR로 동작한다는 뜻이고, AND 조건은 표현할 수 없다.

**매칭되는 정책이 없으면 거부가 아니라 catch-all로 떨어진다.** dan의 `platform-finops`는 어느
정책의 `match.groups`에도 없다. 그런데도 세션은 정상 발급되고 catch-all 베이스의
`availableModels`를 받았다. **정책에 그룹을 빠뜨리면 조용히 베이스 권한이 부여된다** — 거부를
기대했다면 위험한 기본값이다. 인증 자체를 막으려면 정책이 아니라 `oidc.allowed_groups`를 쓴다.

**deny는 전원 동일하다.** 넷 모두 `permissions.deny`가
`["Read(./.env)", "Read(./secrets/**)"]`다. catch-all 베이스의 deny가 **합집합**으로 내려온 것이고,
어느 경로로 매칭돼도 유지된다. 역할별 정책이 조직 전체 금지 규칙을 실수로 떨어뜨릴 수 없다는
설계다. 반대로 `enforceAvailableModels`는 형제 정책끼리 상속되지 않아 carol만 갖는다.

carol에게 허용 밖 모델을 요청하면 서버가 막는다. 클라이언트를 패치해도 통과하지 못한다.

```
$ curl -s -X POST http://localhost:8080/v1/messages -H "Authorization: Bearer $CAROL_JWT" \
    -d '{"model":"claude-opus-5","max_tokens":8,"messages":[{"role":"user","content":"hi"}]}'
{"type":"error","error":{"type":"invalid_request_error",
 "message":"model claude-opus-5 is not in your role's availableModels allowlist"}}
```

### 정책 한 줄이 비용을 가른다

같은 시간에 넷이 각자 세션을 돌린 결과다.

| 사용자 | 모델 | 추정 비용 |
|---|---|---|
| alice | sonnet-5 | $0.2455 |
| alice | opus-5 | $0.1659 |
| alice | haiku-4-5 | $0.0675 |
| bob | opus-5 | $0.1351 |
| dan | sonnet-4-5 | $0.0930 |
| carol | haiku-4-5 | $0.0307 |

alice는 세 모델을 써서 합계 $0.479, carol은 haiku만 쓸 수 있어 $0.031이다. **16배 차이가
`availableModels` 한 줄에서 나온다.** 지출 한도가 사후 차단이라면 모델 allowlist는 사전 억제다.
둘은 다른 층에서 동작하므로 함께 쓴다.

dan이 흥미롭다. 정책을 명시하지 않았는데 sonnet-4-5를 써서 $0.093을 썼다. **의도하지 않은
그룹이 베이스 권한으로 비용을 발생시키는 경로**가 여기 있다.

CLI가 캐시한 파일에서도 같은 값이 확인된다.

```bash
$ jq -c '{availableModels, enforceAvailableModels}' ~/.claude/remote-settings.json
{"availableModels":["claude-haiku-4-5"],"enforceAvailableModels":true}
```

갱신은 ETag로 절약된다. CLI 디버그 로그에 그대로 찍힌다.

```
[DEBUG] Remote settings: Using cached settings (304)
[DEBUG] Remote settings: Cache still valid (304 Not Modified)
```

ETag 값은 응답 본문의 `checksum` 필드와 같다. 클라이언트는 어느 쪽을 써도 된다.

```
ETag: "sha256:4198bbfc8bd43f185442b8bc3af145b1b6ebcb82f7fb8373f61be33b85ac5489"
$ curl -H 'If-None-Match: "sha256:4198bbfc…"' …/managed/settings   → 304
```

> **실제 확인**: 자동 주입되는 env는 6개다. 관리자가 쓴 게 아니라 `telemetry.forward_to`를
> 설정했더니 게이트웨이가 넣은 것이다.
> ```json
> { "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
>   "OTEL_METRICS_EXPORTER": "otlp", "OTEL_LOGS_EXPORTER": "otlp",
>   "OTEL_TRACES_EXPORTER": "otlp",
>   "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:8080",
>   "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf" }
> ```
> 개발자도 정책도 OTEL을 설정할 필요가 없다. 대신 §3의 승인 대화상자가 따라온다.

### 업스트림 자격증명 — 명시하지 않으면 조용히 60초를 버린다

Bedrock 업스트림의 `auth`가 받는 필드는 넷이다. 게이트웨이 바이너리에서 추출한 스키마다.

```js
aws_access_key_id:     string().min(1).optional(),
aws_secret_access_key: string().min(1).optional(),
aws_session_token:     string().min(1).optional(),
aws_bearer_token:      string().min(1).optional()
```

`aws_bearer_token`은 Bedrock API 키다. SigV4 자격증명도, SSO 로그인도 필요 없어 컨테이너
실습에 가장 잘 맞는다. 콘솔의 Bedrock → API keys에서 발급하면 `ABSK...` 형태의 문자열이 나온다.

문제는 `auth`를 비웠을 때다. 환경변수에 키를 넣어도 게이트웨이는 그것을 보지 않고 SigV4 기본
체인만 시도한다.

```yaml
upstreams:
  - provider: bedrock
    region: us-west-2
    auth: {}                # AWS_BEARER_TOKEN_BEDROCK 이 있어도 쓰지 않는다
```

```
warn upstream failed, trying next request_id=11d70e0c: AWS default-chain credential resolve timed out
warn all upstreams failed request_id=11d70e0c: AWS default-chain credential resolve timed out
{"evt":"inference","email":"alice@example.com","path":"/v1/messages",
 "model":null,"upstream":null,"status":502,"ms":60010}
```

**60초를 기다린 뒤 502다.** 클라이언트에는 `all upstreams failed (1 attempted)`로만 보여서
원인이 자격증명인지 모델인지 알 수 없다. 게이트웨이 로그를 봐야 한다.

> **주의**: 바이너리에 `process.env.AWS_BEARER_TOKEN_BEDROCK`을 읽는 코드가 있어서 환경변수만
> 넣어도 될 것처럼 보인다. 그건 **CLI가 Bedrock에 직접 붙을 때** 쓰는 경로다 — 같은 문맥에
> `CLAUDE_CODE_SKIP_MANTLE_AUTH`, `X-Amzn-Bedrock-Service-Tier`가 함께 있는 것이 단서다.
> 게이트웨이의 업스트림 구성은 별개이고 `upstreams[].auth`만 본다.

명시하면 바로 성공한다.

```yaml
    auth:
      aws_bearer_token: ${AWS_BEARER_TOKEN_BEDROCK}
```

```
{"evt":"inference","request_id":"5d893fa4-…","sub":"2e8ad59f-…",
 "email":"alice@example.com","path":"/v1/messages",
 "model":"claude-haiku-4-5","upstream":"bedrock","status":200,"ms":1393}
```

감사 이벤트에 **이메일과 IdP subject가 함께 남는다**는 점이 중요하다. 추론 한 건이 어느
개발자의 것인지 게이트웨이 로그만으로 특정된다. 직접 연결 배포에는 이 층이 없다.

SigV4를 쓸 경우 `aws_access_key_id`와 `aws_secret_access_key`는 **반드시 함께** 줘야 한다.

```
bedrock upstream: aws_access_key_id and aws_secret_access_key must be set together
                  (and are required with aws_session_token)
```

### 모델 카탈로그 — 내장 목록이 상한은 아니다

`/v1/models`가 돌려주는 목록은 정책 allowlist와 실제 서빙 가능한 모델의 교집합이다.
`auto_include_builtin_models: true`로 두면 CLI 내장 카탈로그가 후자를 채운다. 그런데 이
카탈로그는 Bedrock보다 늦다.

| 계열 | Bedrock us-west-2 | CLI 2.1.224 내장 카탈로그 |
|---|---|---|
| Haiku | `haiku-4-5-20251001` | `haiku-4-5-20251001` |
| Sonnet | `sonnet-4`, `4-5`, `4-6`, **`5`** | `sonnet-4-5`, `4-6` |
| Opus | `opus-4-1`, `4-5`, `4-6`, **`4-7`, `4-8`, `5`** | `opus-4-1`, `4-5`, `4-6` |

내장 카탈로그만 쓰면 Bedrock에 이미 있는 Sonnet 5나 Opus 5를 쓸 수 없다. 하지만 그게 상한은
아니다. 설정에 `models[]` 배열이 있어 **업스트림 모델 ID를 직접 매핑**할 수 있다. 바이너리에서
추출한 스키마다.

```js
models: array(strictObject({
  id:          string().min(1),          // 클라이언트가 쓰는 이름
  label:       string().optional(),      // /v1/models 의 display_name
  description: string().optional(),
  upstream_model: record(string())       // { 업스트림이름: 업스트림모델ID }
    .refine(n => Object.keys(n).length > 0,
            { message: "upstream_model must set at least one upstream" })
})).default([])
```

세 모델을 선언해 보았다.

```yaml
auto_include_builtin_models: true

models:
  - id: claude-sonnet-5
    label: Sonnet 5
    upstream_model:
      bedrock: us.anthropic.claude-sonnet-5
  - id: claude-opus-5
    label: Opus 5
    upstream_model:
      bedrock: us.anthropic.claude-opus-5
  - id: claude-sonnet-4-6
    label: Sonnet 4.6
    upstream_model:
      bedrock: us.anthropic.claude-sonnet-4-6
```

`/v1/models`에 선언 모델과 내장 모델이 함께 나온다. 둘의 생김새가 다르다.

```
$ curl -s -H "Authorization: Bearer $JWT" http://localhost:8080/v1/models \
    | jq -r '.data[] | "\(.id)\t\(.display_name)"'
claude-sonnet-5              Sonnet 5
claude-opus-5                Opus 5
claude-sonnet-4-6            Sonnet 4.6
claude-sonnet-4-5-20250929   claude-sonnet-4-5-20250929
claude-haiku-4-5-20251001    claude-haiku-4-5-20251001
```

선언한 모델은 `label`이 붙고 ID가 쓴 그대로 유지된다. 내장 카탈로그에서 온 모델은 날짜 붙은
ID로 확장되고 `display_name`이 ID와 같다. `auto_include_builtin_models`와 충돌하지 않고 공존한다.

### 선언한 모델이 실제로 동작하는가

실제 CLI 세션에서 `--model`로 지정해 호출했다. 셋 다 응답이 왔다.

```
●claude-sonnet-4-6 ready
✻ Cogitated for 1s
```

게이트웨이 감사 로그에 신모델 ID가 그대로 남는다.

```
07:36:46  alice@example.com  claude-sonnet-5     200  1992ms
07:38:09  alice@example.com  claude-opus-5       200  1313ms
07:39:33  alice@example.com  claude-sonnet-4-6   200  1170ms
```

텔레메트리의 `model` 라벨도 선언한 ID다.

| 모델 | input | output | cacheCreation | cacheRead | 추정 비용 |
|---|---|---|---|---|---|
| `claude-sonnet-5` | 537 | 36 | 32,220 | 0 | $0.1230 |
| `claude-opus-5` | 535 | 27 | 21,114 | 0 | $0.1353 |
| `claude-sonnet-4-6` | 393 | 28 | 23,433 | 0 | $0.0895 |

`cacheRead`가 모두 0인 것이 정합적이다. 각 모델의 첫 호출이라 캐시가 없어 `cacheCreation`만
잡혔다. 반복 호출한 모델에서는 반대로 `cacheRead`가 커진다.

비용 열이 의미 있다. **Opus 5가 가장 비싼데 토큰은 가장 적게 썼다.** Sonnet 5는 토큰이 1.5배인데
비용은 더 낮다. 단가 차이가 토큰 수 차이를 덮는다는 뜻이고, `sum by (user_groups)`로만 비용을
보면 원인을 짚을 수 없다. §6의 대시보드가 모델별로 쪼개는 이유다.

### 정리하면 세 갈래다

| 상황 | 결과 |
|---|---|
| 내장 카탈로그에 있고 리전이 해석 | 자동 노출 (`claude-haiku-4-5`) |
| 내장 카탈로그에 있으나 리전이 해석하지 못함 | `/v1/models`에서 누락. **경고 없음** (`claude-opus-4-5`) |
| 내장 카탈로그에 없으나 업스트림에 존재 | **`models[]` 선언으로 사용 가능** (`claude-sonnet-5`, `claude-opus-5`) |

두 번째가 함정이다. alice 정책에는 `claude-opus-4-5`가 있지만 `/v1/models`에는 나오지 않는다.
이 리전의 해석 단계에서 걸러진 것이고 게이트웨이는 아무 말도 하지 않는다. **정책에 쓴 모델이
실제로 서빙되는지는 `/v1/models`로 직접 확인해야 한다.**

날짜 없는 별칭은 날짜 붙은 ID로 해석된다. 둘 다 받는다.

```
claude-haiku-4-5            → model: claude-haiku-4-5-20251001
claude-haiku-4-5-20251001   → model: claude-haiku-4-5-20251001
```

한 가지 더. Haiku는 4.5가 최신이고 Bedrock에도 그 위가 없다. `models[]`로 선언할 대상 자체가
없다는 뜻이다. 선언은 **업스트림에 이미 있는 모델을 노출하는 수단**이고, 없는 모델을 만들어
내지는 못한다.

---

## 5. 텔레메트리 — 신원이 찍혀서 나온다

세션이 준비 상태에 도달하면 데이터포인트가 도착한다.

```
claude_code.session.count{
  user.id=c9ddfbe2-73f7-410a-8a9a-f8f33c753b84,
  session.id=69498ba5-5c96-4789-9ca7-b3c23542b369,
  identity.source=gateway-oidc,
  user.email=alice@example.com,
  user.groups=eng-platform,platform-finops,
  start_type=fresh } 1
```

문서가 약속한 것이 그대로다.

| 속성 | 게이트웨이 세션 | 직접 API 키 / Bedrock |
|---|---|---|
| `user.id` | IdP subject | 익명 설치 식별자 (`~/.claude.json`) |
| `user.email` | 로그인 이메일 | 없음 |
| `user.groups` | IdP 그룹, 콤마 구분 문자열 | 없음 |
| `identity.source` | `gateway-oidc` | 없음 |

이게 게이트웨이의 실질적 가치다. 직접 연결 배포에서는 `OTEL_RESOURCE_ATTRIBUTES`로 개발자마다
신원을 심어야 하고, 그건 개발자가 지울 수 있다. 게이트웨이 세션에서는 **CLI가 토큰에서 읽어
스탬프하고, `OTEL_RESOURCE_ATTRIBUTES`로 설정한 `user.*`는 무시된다.** 감사 관점에서 전자는
협조 기반이고 후자는 강제다.

사용자를 바꾸면 그룹별로 나뉜다.

```
alice@example.com  groups=[eng-platform,platform-finops]  identity=gateway-oidc
carol@example.com  groups=[eng-contractors]               identity=gateway-oidc
```

---

## 6. 대시보드 — 게이트웨이 세션에서만 가능한 질문

개발자 넷이 각자 세션을 돌린 뒤의 대시보드다.

![Claude Code 게이트웨이 세션 대시보드 — 세션 9건, 개발자 4명, 토큰 253K, 추정 비용 $0.7378](images/grafana-dashboard.png)

읽을 지점이 셋이다.

**세션 신원 표에 IdP 값이 그대로 있다.** 이메일, IdP 그룹, IdP subject가 열로 서 있고
`user.id` 자리에 익명 설치 식별자가 아니라 IdP subject(`6df3e1d0-…`)가 들어간다. 사번 대조가
가능하다는 뜻이다.

**IdP 그룹이 곧 비용 축이다.** 개발자 × 그룹 × 모델 표에서 `eng-contractors`인 carol은
haiku만 $0.0307을 쓴 반면, `eng-platform`인 alice는 세 모델로 $0.479를 썼다. 조직도를 대시보드에
따로 심지 않았는데도 이 분해가 된다.

**토큰 총량과 비용 순서가 다르다.** 막대그래프는 haiku가 97.6K로 가장 많지만, 파이차트에서
비용 1위는 opus-5($0.3010, 40.8%)다. 단가 차이 때문이고, 그래서 토큰만 보고 비용을 추정할 수 없다.

Prometheus까지 오면 신원이 라벨로 승격된다.

```
claude_code_session_count_total{
  identity_source="gateway-oidc",
  user_email="alice@example.com",
  user_groups="eng-platform,platform-finops",
  user_id="c9ddfbe2-73f7-410a-8a9a-f8f33c753b84",
  session_id="69498ba5-…", start_type="fresh",
  service_name="claude-code", service_version="2.1.224",
  os_type="linux", host_arch="arm64"} 1
```

대시보드는 이 라벨이 없으면 물을 수 없는 것만 담았다. 패널 13개의 실제 쿼리다.

| 패널 | 종류 | 쿼리 | 답하는 질문 |
|---|---|---|---|
| 게이트웨이 세션 수 | `stat` | `count(count by (session_id) (max_over_time(claude_code_session_count_total{identity_source="gateway-oidc", user_email=~"$user"}[$__range])))` | 고유 `session_id` 개수. 카운터 합이 아니다 |
| 식별된 개발자 | `stat` | `count(count by (user_email) (max_over_time(claude_code_session_count_total{identity_source="gateway-oidc"}[$__range])))` | `user_email`은 게이트웨이 세션에만 채워진다 |
| 총 토큰 | `stat` | `sum(max_over_time(claude_code_token_usage_tokens_total{user_email=~"$user"}[$__range]))` | type 4종 전체 합 |
| 추정 비용 | `stat` | `sum(max_over_time(claude_code_cost_usage_USD_total{user_email=~"$user"}[$__range]))` | 게이트웨이의 `spend_limits`와는 별개 계량 |
| 세션 신원 (user.id 는 IdP subject) | `table` | `max_over_time(claude_code_session_count_total{identity_source="gateway-oidc", user_email=~"$user"}[$__range])` | 라벨을 그대로 표로 펼친다. instant + format=table |
| 모델별 토큰 총량 | `barchart` | `sum by (model) (max_over_time(claude_code_token_usage_tokens_total{user_email=~"$user"}[$__range]))` | 어느 모델이 토큰을 많이 쓰는가 |
| 모델별 추정 비용 | `piechart` | `sum by (model) (max_over_time(claude_code_cost_usage_USD_total{user_email=~"$user"}[$__range]))` | 어느 모델이 비용을 많이 쓰는가 (순서가 토큰과 다르다) |
| 토큰 상세 (모델 × 종류) | `table` | `sum by (model, type) (max_over_time(claude_code_token_usage_tokens_total{user_email=~"$user"}[$__range]))` | `cacheCreation`을 분리해야 첫 요청 과대 계상을 피한다 |
| 개발자 × 그룹 × 모델 | `table` | `sum by (user_email, user_groups, model) (max_over_time(claude_code_cost_usage_USD_total{user_email=~"$user", user_groups=~"$group"}[$__range]))` | IdP 그룹이 곧 비용 센터 |
| 코드 변경량 (모델별) | `table` | `sum by (model, type) (max_over_time(claude_code_lines_of_code_count_total{user_email=~"$user"}[$__range]))` | 파일 편집이 있었던 세션만 |
| 코드 편집 도구 결정 | `table` | `sum by (tool_name, decision, language) (max_over_time(claude_code_code_edit_tool_decision_total{user_email=~"$user"}[$__range]))` | `language`는 확장자에서 분류 |
| 세션 발생 추이 | `timeseries` | `sum by (user_email) (claude_code_session_count_total{identity_source="gateway-oidc", user_email=~"$user"})` | 유일한 시계열. 계열이 짧아 점으로 보인다 |
| Claude Code 이벤트 | `logs` | `{service_name="claude-code"}` | Loki. 이벤트 원문 감사 |

모든 쿼리가 `sum(max_over_time(metric[$__range]))` 꼴이다. 하나만 예외이고(세션 발생 추이),
그 이유는 바로 아래에서 설명한다. `$__range`는 Grafana가 대시보드 시간 범위로 치환하는
변수라 사용자가 `Last 1 hour`를 고르면 `[1h]`이 된다.

템플릿 변수도 IdP 값을 그대로 쓴다.

```
label_values(claude_code_session_count_total, user_email)
label_values(claude_code_session_count_total, user_groups)
```

IdP 그룹이 그대로 라벨이 되니 비용 센터별 대시보드가 추가 매핑 없이 만들어진다. 직접 연결
배포에서는 이 매핑을 조직이 직접 관리해야 한다.

### 주요 PromQL — 왜 이렇게 써야 하는가

대시보드의 쿼리가 교과서와 다르게 생겼다. `rate()`도 `increase()`도 안 쓴다. 데이터 형태가
평범한 서버 메트릭과 다르기 때문이다.

같은 지표를 네 방식으로 물어본 결과다.

```
sum(rate(claude_code_token_usage_tokens_total[5m]))       →  0
sum(increase(claude_code_token_usage_tokens_total[3h]))   →  0
sum(claude_code_token_usage_tokens_total)                 →  빈 결과
sum(max_over_time(claude_code_token_usage_tokens_total[3h])) → 149270
```

앞의 셋이 실패하는 이유가 각각 다르다.

**인스턴트 쿼리가 빈 결과인 이유.** 프로메테우스 exporter는 비활성 시계열을 만료시킨다.
세션이 끝나고 몇 분 지나면 `/metrics`에서 사라지고, 인스턴트 쿼리는 볼 것이 없다.

```
현재 활성 계열   : 0
3시간 내 계열    : 20
3시간 내 세션 수 : 5
```

**`rate()`와 `increase()`가 0인 이유.** `session.id`가 라벨이라 세션마다 새 계열이 생긴다.
각 계열의 수명은 세션 길이만큼이다.

```
$ count_over_time(claude_code_session_count_total[3h])
session=630dab22  표본 30개
session=8c29f531  표본 30개
session=03f03565  표본 5개
```

10초 스크레이프 간격에 표본 30개면 계열이 약 5분 살았다는 뜻이다. `rate()`는 창 안에서 같은
계열의 **증분**을 보는데, 계열이 나타났다 사라지는 것을 리셋으로 취급한다. 짧은 계열이 흩어져
있으면 증분을 잡을 구간이 사실상 없다.

**그래서 이 패턴을 쓴다.**

```promql
sum(max_over_time(claude_code_token_usage_tokens_total[$__range]))
```

계열별로 시간 범위 안의 **최댓값**을 구한 뒤 합산한다. 각 계열은 살아 있는 동안 단조 증가하는
카운터이므로 최댓값이 곧 그 세션의 최종값이다. 계열이 사라져도 TSDB에 표본이 남아 있으니
범위 안이면 잡힌다. `$__range`는 Grafana가 대시보드 시간 범위로 치환하는 변수라, 사용자가
`Last 3 hours`를 고르면 `[3h]`가 된다.

> **주의**: 이 방식은 **같은 세션이 범위를 걸쳐 있으면 과소 집계**된다. 범위 시작 이전에 이미
> 쌓인 분량이 최댓값에 포함되기 때문이다. 세션이 짧은 개발 도구 텔레메트리에서는 문제가 되지
> 않지만, 장기 실행 프로세스 메트릭에 그대로 옮기면 안 된다.

#### 고유 개수 세기

세션 수와 개발자 수는 카운터 값이 아니라 **라벨의 고유 개수**다. `count(count by ...)` 이중
집계로 구한다.

```promql
count(count by (session_id) (max_over_time(claude_code_session_count_total[$__range])))
count(count by (user_email) (max_over_time(claude_code_session_count_total[$__range])))
```

안쪽 `count by (session_id)`가 세션별로 하나씩 접어 계열을 만들고, 바깥 `count`가 그 계열 수를
센다. `sum(claude_code_session_count_total)`을 쓰면 안 된다 — 그건 세션 시작 카운터의 합이라
재개(`start_type=resume`)를 별개로 세거나 같은 세션을 중복 계산할 수 있다.

#### 게이트웨이 세션만 골라내기

```promql
{identity_source="gateway-oidc"}
```

이 라벨은 게이트웨이 세션에만 붙는다. 직접 API 키로 붙은 세션에는 `identity_source`도
`user_email`도 `user_groups`도 없다. **한 조직에 두 경로가 섞여 있으면 이 필터가 분리 기준이
된다.** 필터를 빼면 신원 없는 계열이 합산에 끼어 인당 집계가 흐려진다.

#### 귀속 축 바꾸기

같은 지표를 `sum by`의 라벨만 바꿔 다른 질문에 답한다.

```promql
sum by (user_email) (max_over_time(claude_code_token_usage_tokens_total[$__range]))
sum by (model) (max_over_time(claude_code_token_usage_tokens_total[$__range]))
sum by (model, type) (max_over_time(claude_code_token_usage_tokens_total[$__range]))
sum by (user_groups) (max_over_time(claude_code_cost_usage_USD_total[$__range]))
```

`user_groups`는 IdP 그룹이 콤마로 이어진 **단일 문자열**이다. `eng-platform,platform-finops`가
하나의 라벨 값이므로 그룹 하나로 쪼개 집계할 수 없다. 비용 센터를 그룹 하나에 대응시키려면
IdP 쪽에서 사용자를 한 그룹에만 넣거나, 수집기 단계에서 라벨을 분리해야 한다.

`type`을 빼면 안 되는 이유는 실측으로 분명하다.

| 모델 | 토큰 총량 | 추정 비용 |
|---|---|---|
| `claude-opus-5` | 43,326 | $0.1659 |
| `claude-sonnet-5` | 32,769 | $0.1228 |
| `claude-haiku-4-5` | 24,446 | $0.0307 |

토큰 총량은 1.8배 차이인데 비용은 5.4배다. 단가가 다르기 때문이고, 그래서 **토큰만 보고
비용을 추정할 수 없다.** 그리고 총량의 대부분은 `cacheCreation`이다 — `type`으로 쪼개지 않으면
모든 세션의 첫 요청이 과대하게 보인다.

#### 템플릿 변수

```promql
claude_code_token_usage_tokens_total{user_email=~"$user"}
```

Grafana의 다중 선택 변수는 정규식으로 치환된다. `All`을 고르면 `.*`이 되므로 `=~`를 써야 한다.
`=`를 쓰면 `All`에서 아무것도 안 나온다. 변수 값 목록은 라벨에서 직접 뽑는다.

```
label_values(claude_code_session_count_total, user_email)
label_values(claude_code_session_count_total, user_groups)
```

IdP 그룹이 그대로 라벨이므로 조직도를 대시보드에 따로 심을 필요가 없다.

#### 카디널리티 주의

`session_id`가 라벨이라 **세션마다 새 계열이 생긴다.** 실습에서는 5세션 × 모델 × type 조합으로
20계열이었지만, 개발자 수백 명 규모에서는 곧 폭발한다. 필요 없으면 끈다.

```
OTEL_METRICS_INCLUDE_SESSION_ID=false
```

끄면 세션 단위 구분은 잃지만 인당·모델별 집계는 그대로 된다. `session.id`는 이벤트(로그)에도
있으니 세션 추적은 Loki 쪽에서 하는 편이 낫다.

> **주의**: `claude_code.cost.usage`는 추정치이고 게이트웨이의 `spend_limits`와 **별개 계량**이다.
> 대시보드의 비용과 게이트웨이가 429로 차단하는 한도는 다른 숫자다. 공식 청구는 Bedrock을 본다.

`token.usage`와 `cost.usage`는 추론이 성공해야 나타난다. 업스트림 자격증명이 없으면 세션 계열만
쌓인다. 반대로 말하면 **인증·정책·신원 스탬프는 비용 없이 전부 검증된다.**

실제 CLI 세션에서 한 줄 프롬프트를 보낸 결과는 이렇다.

```
claude_code_token_usage_tokens_total{user_email="carol@example.com",
  model="claude-haiku-4-5", type="input"}         = 381
  … type="output"                                  = 64
  … type="cacheCreation"                           = 23994
  … type="cacheRead"                               = 0

claude_code_cost_usage_USD_total{user_email="carol@example.com",
  model="claude-haiku-4-5"}                        = 0.030322
```

`cacheCreation`이 23,994로 압도적이다. 프롬프트는 한 줄인데 시스템 프롬프트와 도구 정의가
프롬프트 캐시에 올라간 것이고, 비용 $0.0303의 대부분이 여기서 나왔다. 두 번째 요청부터는
`cacheRead`로 넘어가 훨씬 싸진다.

> **주의**: 인당 비용을 볼 때 `type`을 분리하지 않으면 **모든 개발자의 첫 요청이 과대하게
> 보인다.** 대시보드가 `sum by (model, type)`으로 쪼개는 이유다. 캐시 생성분을 세션 시작
> 고정비로 따로 보고, 실사용 추이는 input/output으로 판단하는 편이 맞다.

---

## 7. 관측 스택에서 조용히 실패하는 것

수집기 설정 전체는 이렇다. 짧지만 두 항목이 결정적이다.

```yaml
# otel-observed.yaml
receivers:
  otlp:
    protocols:
      http: { endpoint: 0.0.0.0:4318 }

processors:
  batch: { timeout: 5s }
  # Claude Code 의 메트릭 temporality 기본값은 delta 다
  deltatocumulative: { max_stale: 5m }

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
    # 이게 있어야 user_email / user_groups / identity_source 가 라벨로 승격된다
    resource_to_telemetry_conversion: { enabled: true }
  otlphttp/loki:
    endpoint: http://loki:3100/otlp
    tls: { insecure: true }
  debug: { verbosity: normal }

service:
  pipelines:
    metrics: { receivers: [otlp], processors: [deltatocumulative, batch],
               exporters: [prometheus, debug] }
    logs:    { receivers: [otlp], processors: [batch],
               exporters: [otlphttp/loki, debug] }
```

Prometheus는 사이드카를 `gw-server` 이름으로 스크레이프한다. netns를 공유하므로 8889 포트가
gw-server의 주소에 노출된다.

```yaml
# prometheus.yml
global:
  scrape_interval: 10s
scrape_configs:
  - job_name: claude-code-otel
    static_configs:
      - targets: ["gw-server:8889"]
```

두 타깃 모두 정상이다.

```
$ curl -s localhost:9090/api/v1/targets | jq -r '.data.activeTargets[] | "\(.labels.job): \(.health)"'
claude-code-otel: up
prometheus: up
```

이제 조용히 실패하는 두 지점이다. 둘 다 에러 없이 잘못된 결과가 나온다.

**첫째, delta를 cumulative로 바꿔야 한다.** Claude Code의 메트릭 temporality 기본값은 delta인데
Prometheus는 cumulative 카운터를 기대한다. 변환하지 않으면 카운터가 매 export마다 리셋된 것처럼
보이고 `rate()`와 `increase()`가 엉뚱한 값을 낸다. 경고는 없다.

```yaml
processors:
  deltatocumulative: { max_stale: 5m }
```

클라이언트에서 `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=cumulative`로 바꾸는 방법도
있지만 개발자 환경에 의존한다. 수집기에서 흡수하는 편이 안전하다.

**둘째, 리소스 속성을 라벨로 승격시켜야 한다.** 이게 없으면 `user_email`, `user_groups`,
`identity_source`가 라벨로 올라오지 않아 §6의 질문을 아예 할 수 없다. 메트릭은 정상적으로
보이는데 인당 집계만 불가능해진다.

```yaml
exporters:
  prometheus:
    resource_to_telemetry_conversion: { enabled: true }
```

> **주의**: `session_id`가 라벨에 포함되므로 **세션마다 새 시계열이 생긴다.** 실습에서는 편하지만
> 규모가 커지면 카디널리티가 폭발한다. `OTEL_METRICS_INCLUDE_SESSION_ID=false`로 끌 수 있다.

프로메테우스 exporter가 비활성 시계열을 만료시킨다는 점도 알아둘 만하다. 세션이 끝나고 몇 분
지나면 `/metrics`가 비고 인스턴트 쿼리도 빈다. `max_over_time(...[45m])`으로 확인한다.

### 릴레이 경로를 먼저 검증한다

CLI를 붙이기 전에 합성 OTLP로 게이트웨이 → 수집기 경로만 확인해 두면, 나중에 문제가 생겼을 때
범위를 좁힐 수 있다. 실제로 이 검증이 있었기에 "CLI가 안 보낸다"를 빨리 확정할 수 있었다.

```bash
$ curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:8080/v1/metrics \
    -H "Authorization: Bearer $JWT" -H 'content-type: application/json' \
    --data-binary @metric.json
200

$ docker logs gw-otel | grep relaytest
claude_code.session.count{user.email=relaytest@example.com} 1
```

보낸 본문은 최소 OTLP/JSON이다.

```json
{"resourceMetrics":[{"resource":{"attributes":[
  {"key":"service.name","value":{"stringValue":"claude-code"}}]},
 "scopeMetrics":[{"scope":{"name":"com.anthropic.claude_code"},
 "metrics":[{"name":"claude_code.session.count","sum":{
   "aggregationTemporality":2,"isMonotonic":true,
   "dataPoints":[{"asInt":"1","timeUnixNano":"1786800000000000000",
     "attributes":[{"key":"user.email","value":{"stringValue":"relaytest@example.com"}}]}]}}]}]}]}
```

`aggregationTemporality: 2`가 cumulative다. 합성 데이터는 이렇게 직접 지정할 수 있지만 실제
CLI는 delta(1)로 보내므로 §7 앞부분의 변환이 필요하다.

게이트웨이가 노출하는 수신 경로는 셋이고 모두 200을 반환한다.

```
POST /v1/metrics  → 200
POST /v1/logs     → 200
POST /v1/traces   → 200      # traces: false 인데도 200
```

`traces: false`인데 200인 것은 의도된 동작이다. 목적지가 없는 시그널은 받아서 폐기한다.
게이트웨이 세션의 CLI는 로컬 설정과 무관하게 게이트웨이로 보내므로, 조용히 버리지 않으면
클라이언트가 에러를 본다.

---

## 8. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| 부팅 즉시 `connect ECONNREFUSED …:8081` | OIDC 디스커버리 fail-closed. IdP보다 먼저 뜨면 죽는다 |
| `forward_to.url must be https:// (http:// allowed for loopback only)` | 텔레메트리 목적지가 loopback이 아니다. HTTPS로 노출하거나 사이드카로 두고 `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1` |
| 로그인 화면에 게이트웨이 선택지가 없음 | `forceLoginGatewayUrl`과 `forceLoginMethod`는 관리 티어에서만 유효하다. 개발자가 자기 설정에 넣어도 무시된다 |
| `claude auth login`이 `run interactive /login` 요구 | 게이트웨이 로그인은 대화식 전용. 비대화식 경로 없음 |
| npm 설치본에서 `requires the native binary` | 게이트웨이는 Bun 런타임 기능을 쓴다 |
| 세션은 뜨는데 텔레메트리가 없음 | 작업 디렉터리 신뢰 미수락(`workspace trust not accepted`) 또는 관리 설정 승인 대기(`consent dialog pending`) |
| 사용자 변경 후 다시 지문 프롬프트 | `claude auth logout`이 `gatewayTrust` 핀까지 지운다 |
| Prometheus 카운터가 계속 리셋되는 것처럼 보임 | temporality가 delta. `deltatocumulative` 처리기 추가 |
| 메트릭에 `user_email` 라벨이 없음 | `resource_to_telemetry_conversion: {enabled: true}` |
| 대시보드 패널이 "No data", `rate()`가 0 | 세션마다 계열이 생겼다 만료된다. `rate()`·`increase()` 대신 `sum(max_over_time(metric[$__range]))` (§6) |
| 호스트에서 `/readyz` 503인데 컨테이너 내부는 `ready` | 게이트웨이가 `127.0.0.1`에 바인딩됐거나, 앞서 띄운 게이트웨이 프로세스가 포트를 점유. `lsof -nP -iTCP:8080` |
| 컨테이너 재생성 때마다 로그인 소실 | `~/.claude`가 컨테이너 파일시스템에 있다. 볼륨으로 분리 |
| realm 임포트 사용자 로그인이 마지막에 실패 | 기본 역할이 없어 `offline_access` 거부. `realmRoles: [default-roles-claude, offline_access, uma_authorization]` |

---

## 9. 부록: 나머지 설정 파일과 실행 절차

§2의 compose가 마운트하는 파일 중 앞에서 다루지 않은 것들이다. 이 셋을 채우면 재현이 완결된다.

### 이미지

```dockerfile
# Dockerfile.claude — 게이트웨이 서버와 개발자 클라이언트가 공용으로 쓴다
# 게이트웨이는 네이티브 바이너리에서만 동작한다
FROM ubuntu:24.04
ARG CLAUDE_VERSION=stable

RUN apt-get update && apt-get install -y --no-install-recommends \
      curl ca-certificates git ripgrep jq less procps expect \
    && rm -rf /var/lib/apt/lists/*

# 네이티브 설치. npm 설치본은 게이트웨이가 부팅하지 않는다:
#   "claude gateway requires the native binary."
RUN curl -fsSL https://claude.ai/install.sh | bash -s "${CLAUDE_VERSION}"

ENV PATH="/root/.local/bin:${PATH}"
ENV DISABLE_AUTOUPDATER=1
WORKDIR /workspace
```

### 게이트웨이 설정 — 필수 5개 섹션

§4에 정책·텔레메트리를 실었으니 앞부분만 채우면 된다. `store`가 빠지면 부팅하지 않는다 —
디바이스 코드 랑데부가 여기 있어서 사인인 자체가 성립하지 않는다.

```yaml
# gateway-observed.yaml (앞부분)
listen:
  host: 0.0.0.0                       # 컨테이너에서는 필수. 127.0.0.1 이면 포트 퍼블리시가 안 닿는다
  port: 8080
  public_url: http://localhost:8080   # loopback 이라 http:// 가 허용된다

oidc:
  issuer: http://localhost:8081/realms/claude
  client_id: claude-gateway
  client_secret: ${OIDC_CLIENT_SECRET}
  allowed_email_domains: [example.com]
  userinfo_fallback: true
  scopes: [openid, profile, email, offline_access]

session:
  jwt_secret: ${GATEWAY_JWT_SECRET}   # openssl rand -base64 32
  ttl_hours: 1

store:
  postgres_url: ${GATEWAY_POSTGRES_URL}

upstreams:
  - provider: bedrock
    region: us-west-2
    auth:
      # Bedrock API 베어러 토큰. SigV4 자격증명이나 SSO 없이 붙는다.
      # 반드시 명시해야 한다 — auth 를 비우면 게이트웨이는 SigV4 기본 체인만
      # 시도하고 AWS_BEARER_TOKEN_BEDROCK 환경변수는 보지 않는다.
      aws_bearer_token: ${AWS_BEARER_TOKEN_BEDROCK}
      # SigV4 를 쓰려면 대신 아래 둘을 함께 준다 (하나만 주면 부팅 실패):
      #   aws_access_key_id: ${AWS_ACCESS_KEY_ID}
      #   aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}

auto_include_builtin_models: true

# 내장 카탈로그에 없는 모델을 쓰려면 models[] 로 선언한다 (§4 참고)
# models:
#   - id: claude-sonnet-5
#     label: Sonnet 5
#     upstream_model:
#       bedrock: us.anthropic.claude-sonnet-5

# 사인인 레이트리밋 기본값은 IP당 device_verify 10회/600초다.
# 실습에서 로그인을 반복하면 audit 에 device.verify result=rate_limited 가 찍힌다.
rate_limits:
  device_authorization: { max: 200, window_seconds: 600 }
  device_verify: { max: 200, window_seconds: 600 }
```

### Keycloak realm — 그룹 클레임이 핵심

```json
{
  "realm": "claude",
  "enabled": true,
  "sslRequired": "none",
  "groups": [
    { "name": "eng-platform" }, { "name": "eng-contractors" }, { "name": "platform-finops" }
  ],
  "clients": [{
    "clientId": "claude-gateway",
    "secret": "lab-gateway-secret",
    "redirectUris": ["http://localhost:8080/oauth/callback",
                     "http://127.0.0.1:8080/oauth/callback"],
    "protocolMappers": [{
      "name": "groups",
      "protocolMapper": "oidc-group-membership-mapper",
      "config": {
        "full.path": "false",
        "claim.name": "groups",
        "id.token.claim": "true",
        "access.token.claim": "true",
        "userinfo.token.claim": "true"
      }
    }]
  }],
  "users": [
    { "username": "alice", "email": "alice@example.com", "emailVerified": true, "enabled": true,
      "credentials": [{ "type": "password", "value": "alice-pw" }],
      "groups": ["/eng-platform", "/platform-finops"],
      "realmRoles": ["default-roles-claude", "offline_access", "uma_authorization"] },
    { "username": "carol", "email": "carol@example.com", "emailVerified": true, "enabled": true,
      "credentials": [{ "type": "password", "value": "carol-pw" }],
      "groups": ["/eng-contractors"],
      "realmRoles": ["default-roles-claude", "offline_access", "uma_authorization"] },
    { "username": "bob", "email": "bob@example.com", "emailVerified": true, "enabled": true,
      "credentials": [{ "type": "password", "value": "bob-pw" }],
      "groups": ["/eng-platform"],
      "realmRoles": ["default-roles-claude", "offline_access", "uma_authorization"] },
    { "username": "dan", "email": "dan@example.com", "emailVerified": true, "enabled": true,
      "credentials": [{ "type": "password", "value": "dan-pw" }],
      "groups": ["/platform-finops"],
      "realmRoles": ["default-roles-claude", "offline_access", "uma_authorization"] },
    { "username": "dave", "email": "dave@outside.test", "emailVerified": true, "enabled": true,
      "credentials": [{ "type": "password", "value": "dave-pw" }],
      "realmRoles": ["default-roles-claude", "offline_access", "uma_authorization"] }
  ]
}
```

두 항목이 실수하기 쉽다.

`full.path`가 `true`면 클레임 값이 `/eng-platform`이 되어 정책의 `match.groups: [eng-platform]`과
문자열이 안 맞는다. 그룹 매칭은 대소문자 구분 정확 비교다.

`realmRoles`를 빼면 realm 임포트 사용자에게 기본 역할이 붙지 않아 게이트웨이의 `offline_access`
스코프 요청이 거부된다. 증상이 사인인 **마지막 단계**에 나타나 원인을 찾기 어렵다.

```
{"evt":"session.mint","result":"fail",
 "err":"not_allowed (Offline tokens not allowed for the user or client)"}
```

`dave@outside.test`는 `allowed_email_domains` 거부를 확인하는 용도다. Keycloak에서는 정상
인증되지만 게이트웨이가 세션 발급을 거부한다.

```
{"evt":"session.mint","result":"fail","err":"email domain not allowed"}
```

거부가 **IdP 로그인을 통과한 뒤** 게이트웨이에서 일어난다는 점이 중요하다. 다중 테넌트 IdP
오설정에 대한 방어선이다.

### Grafana 프로비저닝

대시보드 JSON이 `uid`로 데이터소스를 참조하므로 고정 `uid`를 줘야 한다.

```yaml
# grafana/provisioning/datasources/ds.yaml
apiVersion: 1
datasources:
  - { name: Prometheus, type: prometheus, uid: prometheus,
      url: http://prometheus:9090, isDefault: true }
  - { name: Loki, type: loki, uid: loki, url: http://loki:3100 }
```

```yaml
# grafana/provisioning/dashboards/dash.yaml
apiVersion: 1
providers:
  - name: claude-code
    folder: Claude Code
    type: file
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /var/lib/grafana/dashboards
```

§6의 표가 각 패널의 쿼리이므로, 그 쿼리를 패널로 옮기면 대시보드가 된다.

### 실행

```bash
docker build -f Dockerfile.claude -t claude-gw-lab:latest .

cat > .env <<EOF
GATEWAY_JWT_SECRET=$(openssl rand -base64 32)
GATEWAY_ADMIN_WRITE_KEY=$(openssl rand -hex 24)
GATEWAY_ADMIN_READ_KEY=$(openssl rand -hex 24)
EOF
echo 'AWS_BEARER_TOKEN_BEDROCK=' > .env.secret   # 비어 있어도 부팅된다
chmod 600 .env .env.secret

docker compose up -d

# IdP 와 게이트웨이가 준비될 때까지
until curl -sf http://localhost:8081/realms/claude/.well-known/openid-configuration \
      >/dev/null; do sleep 2; done
until [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/readyz)" = 200 ]; do
  sleep 2
done

# 클라이언트에서 대화식 로그인
docker exec -it gw-client claude
```

`docker exec -it`로 붙으면 §3의 관문 세 개를 손으로 통과할 수 있다. 순서는 이렇다.

| 단계 | 화면 | 조작 |
|---|---|---|
| 1 | REPL 하단에 `Not logged in · Run /login` | `/login` 입력 |
| 2 | `Cloud gateway` + URL 박스 | Enter |
| 3 | 관문 1 — `Trust gateway localhost?` + 지문 | 위 방향키로 1번 선택 후 Enter |
| 4 | 디바이스 코드 `XXXX-XXXX` + 검증 URL | 호스트 브라우저로 이동 |
| 5 | 브라우저 — 게이트웨이 검증 페이지 | `This matches my device — continue` |
| 6 | 브라우저 — IdP 로그인 | `carol` / `carol-pw` |
| 7 | 터미널 — 폴링 성공, 관문 2 폴더 신뢰 | 위 방향키로 1번 선택 후 Enter |
| 8 | 관문 3 — 관리 설정 승인 | Enter (기본 커서가 Yes) |

3번과 7번에서 숫자 키는 먹지 않는다. 방향키로 옮겨야 한다. 8번만 기본 커서가 Yes라 Enter로
승인된다. 4번 URL이 잘려 보이면 코드를 직접 붙여도 된다.

```
http://localhost:8080/device?user_code=<코드>
```

접속 지점은 이렇다.

| 대상 | 주소 | 계정 |
|---|---|---|
| 게이트웨이 | http://localhost:8080 | — |
| Grafana | http://localhost:3000 | 익명 Admin |
| Keycloak 관리 콘솔 | http://localhost:8081 | admin / admin |
| 수집기 exporter | http://localhost:8889/metrics | — |

준비된 사용자는 셋이다.

| 사용자 | 비밀번호 | IdP 그룹 | 확인 대상 |
|---|---|---|---|
| `alice` | `alice-pw` | `eng-platform`, `platform-finops` | 그룹 2개 → policy[1] 매칭 |
| `bob` | `bob-pw` | `eng-platform` | 그룹 1개 → **부분 겹침 매칭** |
| `carol` | `carol-pw` | `eng-contractors` | haiku만 + `enforceAvailableModels` |
| `dan` | `dan-pw` | `platform-finops` | 매치 없음 → **catch-all 베이스** |
| `dave` | `dave-pw` | (없음) | `allowed_email_domains` 거부 |

`bob`과 `dan`이 §4의 매칭 규칙 두 가지를 드러낸다. 실습에서 이 둘을 빼면 정책이 의도대로
동작하는지 확인할 수 없다.

로그인 후 세션 안에서 `/model`을 열면 §4 표의 `availableModels`가 그대로 목록에 반영된 것을
볼 수 있다. carol은 haiku 하나뿐이다.

정리는 볼륨까지 지운다.

```bash
docker compose down -v
```

---

## 마무리

이 실습의 결론은 게이트웨이가 동작한다는 것보다 **개발자 쪽 관문이 문서보다 많다**는 쪽이다.
지문 신뢰, 작업 디렉터리 신뢰, 관리 설정 승인 — 셋 다 기본값이 거부이거나 대기이고, 통과하지
못하면 세션은 겉으로만 살아 있다. 특히 세 번째가 텔레메트리를 막는 경로는 로그를 보지 않으면
알 수 없다.

```
Remote settings: Loading promise timeout deferred — consent dialog pending
[3P telemetry] Waiting for remote managed settings before telemetry init
```

운영으로 옮길 때 가장 중요한 시사점은 **텔레메트리를 켜는 것이 곧 전사 승인 프롬프트를
유발한다**는 점이다. `telemetry.forward_to` 한 줄이 `OTEL_EXPORTER_OTLP_ENDPOINT` 자동 주입으로
이어지고 그 변수가 승인 대상이다. 롤아웃 공지 없이 넣으면 경고 화면을 개발자들이 먼저 본다.
다만 이 프롬프트는 정직하다. 승인 대상은 텔레메트리를 켜는 것이 아니라 데이터가 어디로
가는지다.

관측 측면에서 게이트웨이가 주는 것은 명확하다. `identity.source=gateway-oidc`, `user.email`,
`user.groups`가 CLI에서 자동으로 찍혀 나오고 개발자가 지울 수 없다. 직접 연결 배포에서
`OTEL_RESOURCE_ATTRIBUTES`로 신원을 심는 방식은 협조에 기대지만 게이트웨이 세션은 강제한다.
IdP 그룹이 그대로 라벨이 되니 비용 센터별 대시보드가 추가 매핑 없이 만들어진다.

한편 관측 파이프라인에서 조용히 틀리는 지점 둘도 기억할 만하다. delta 카운터를 변환하지
않으면 숫자가 그럴듯하게 틀리고, 리소스 속성을 승격시키지 않으면 게이트웨이가 애써 붙인
신원이 쿼리에서 사라진다. 둘 다 에러를 내지 않는다.

다음으로 할 것은 Bedrock 업스트림에 실제 자격증명을 붙여 `token.usage`와 `cost.usage`를 채우고,
게이트웨이의 `spend_limits`가 429로 차단하는 시점과 대시보드의 추정 비용이 어떻게 어긋나는지
비교하는 것이다. 그리고 `logs: true`로 흘러드는 이벤트에 `OTEL_LOG_TOOL_DETAILS=1`을 얹으면
Bash 명령과 파일 경로까지 들어오니, 그때 승인 대화상자에 어떤 변수가 추가되는지도 같이 확인할
만하다.

## 참고 자료

- [Claude apps gateway 개요](https://code.claude.com/docs/en/claude-apps-gateway)
- [설정 레퍼런스 — gateway.yaml 전체 옵션](https://code.claude.com/docs/en/claude-apps-gateway-config)
- [모니터링 — 메트릭·이벤트 카탈로그와 표준 속성](https://code.claude.com/docs/en/monitoring-usage)
- [서버 관리 설정](https://code.claude.com/docs/en/server-managed-settings)
- [게이트웨이 프로토콜 레퍼런스](https://code.claude.com/docs/en/llm-gateway-protocol) — 실행 중인 게이트웨이의 `GET /protocol`이 같은 내용을 서빙한다
- [Claude Code ROI Measurement Guide](https://github.com/anthropics/claude-code-monitoring-guide)
- [OTel Collector: deltatocumulative 처리기](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/deltatocumulativeprocessor)

**Tags:** `Claude Code` `Claude apps gateway` `OpenTelemetry` `Prometheus` `Grafana` `Loki` `Keycloak` `OIDC`
