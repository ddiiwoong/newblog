---
layout: single
title: "분산 학습을 위한 AWS 공유 스토리지 — FSx for Lustre vs EFS vs S3(Mountpoint)"
comments: true
classes: wide
description: "멀티노드 GPU 학습에서 데이터와 체크포인트를 어디에 둘 것인가. FSx for Lustre, EFS, Mountpoint for S3를 비교하고 선택 기준을 정리한다"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: aws/distributed-training-storage
date: 2026-07-03
draft: true
categories:
  - AWS
tags:
  - AWS
  - FSx for Lustre
  - EFS
  - S3
  - Mountpoint for S3
  - distributed-training
  - GPU
  - HPC
  - storage
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

지난 두 편에서 노드 간 **네트워크**(EFA)를 다뤘다. 빠르게 대화하는 건 해결했는데, 분산 학습에는 또 하나의 큰 질문이 남아 있다.

**"그 많은 노드가 학습 데이터와 체크포인트를 어디서 같이 읽고 쓰지?"**

노드가 2대일 때는 각 노드에 데이터를 복사해도 되지만, 수십~수백 노드로 스케일하면 그건 불가능하다. 공유 스토리지가 필요하다. AWS에서 선택지는 크게 세 가지다.

1. **FSx for Lustre** — HPC용 고성능 병렬 파일시스템
2. **EFS (Elastic File System)** — 범용 NFS
3. **Mountpoint for Amazon S3** — S3를 POSIX 파일시스템처럼 마운트

이 글에서는 각각의 특성을 분산 학습 관점에서 비교하고, 언제 뭘 쓰면 되는지 정리한다.

<!--truncate-->

## 분산 학습에서 스토리지에 요구되는 것

본격적으로 비교하기 전에, 분산 학습이 스토리지에 요구하는 조건을 짚어보자.

### 읽기: 학습 데이터 로딩

- **높은 읽기 처리량(throughput)**: 수십~수백 GPU가 동시에 데이터를 읽는다. 단일 노드 기준 수 GB/s 이상의 읽기 대역폭이 필요할 수 있다.
- **랜덤 읽기 성능**: 이미지 분류처럼 작은 파일을 랜덤하게 읽는 패턴이면 IOPS가 중요하다.
- **순차 읽기 성능**: LLM 학습에서 토크나이즈된 대용량 바이너리를 순차 스트리밍하는 경우 throughput이 지배적이다.

### 쓰기: 체크포인트 저장

- **쓰기 대역폭**: 수십~수백 GB 크기의 모델 체크포인트를 주기적으로 저장한다. 쓰기가 느리면 학습 GPU가 idle 상태로 대기하게 된다.
- **일관성(consistency)**: 여러 노드가 동시에 쓸 때 데이터가 꼬이지 않아야 한다.
- **내구성(durability)**: 수일간의 학습 결과물이므로 잃어버리면 안 된다.

### 공통

- **POSIX 호환**: PyTorch/TensorFlow의 데이터 로더는 기본적으로 파일시스템 경로를 기대한다.
- **멀티노드 동시 접근**: 모든 노드가 같은 경로를 마운트할 수 있어야 한다.
- **비용 효율**: 페타바이트급 데이터셋을 두기도 하니 GB당 비용도 무시 못 한다.

## 1. FSx for Lustre — HPC의 정석

### 개요

[FSx for Lustre](https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html)는 오픈소스 병렬 파일시스템 Lustre를 AWS가 완전관리형으로 제공하는 서비스다. 온프레미스 HPC 클러스터에서 수십 년간 검증된 Lustre를 클라우드에서 그대로 쓸 수 있다.

### 특성

- **병렬 I/O**: 데이터를 여러 스토리지 서버(OST)에 스트라이핑한다. 클라이언트(노드)가 늘어날수록 aggregate throughput이 선형으로 증가한다.
- **높은 처리량**: Persistent 2 배포 유형 기준, 스토리지 용량에 비례해 최대 수백 GB/s까지 확장 가능하다. 1TB당 최대 1,000 MB/s(1000 처리량 티어).
- **낮은 지연**: sub-millisecond latency. 메타데이터 연산도 빠르다.
- **S3 통합**: S3 버킷을 Data Repository로 연결하면, FSx가 S3 데이터를 자동으로 lazy-load(처음 접근 시 가져옴)하고, 결과를 S3로 export할 수 있다.
- **POSIX 완전 호환**: 심볼릭 링크, 하드 링크, 파일 잠금 등 모두 지원.

### 분산 학습에서의 장점

- GPU가 수백 개여도 데이터 로딩이 병목이 되지 않는다. Lustre의 병렬 스트라이핑이 핵심.
- 체크포인트를 빠르게 쓸 수 있다 — 대형 모델(수백 GB)도 수십 초 내에 저장 가능.
- S3에 원본 데이터를 두고, FSx를 캐시처럼 쓰는 패턴이 일반적이다.

### 주의점

- **비용이 높다**: 용량 기준 GB당 월 비용이 EFS나 S3보다 상당히 비싸다. Scratch 배포 유형은 저렴하지만 내구성이 낮다(복제 없음).
- **프로비저닝 필요**: 파일시스템 생성에 수 분이 걸리고, 용량을 미리 정해야 한다(자동 확장 불가, 수동 증설은 가능).
- **AZ 제약**: 단일 AZ에 배포된다. 다른 AZ에서 접근하면 cross-AZ 비용과 지연이 붙는다.
- **임시 작업에는 과하다**: 짧은 실험(몇 시간)에 FSx를 띄웠다 내리면 생성/삭제 시간이 아깝다.

## 2. EFS (Elastic File System) — 간편한 공유 NFS

### 개요

[EFS](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)는 AWS의 완전관리형 NFS(v4.1) 서비스다. 생성 즉시 사용 가능하고, 용량이 자동으로 늘었다 줄었다 한다.

### 특성

- **완전 탄력적**: 용량을 미리 정할 필요 없다. 쓴 만큼만 과금.
- **멀티 AZ**: 기본적으로 리전 내 여러 AZ에서 동시에 마운트 가능. 고가용성.
- **POSIX 호환**: NFS 기반이라 대부분의 POSIX 연산을 지원한다.
- **처리량 모드**:
  - Bursting: 저장 용량에 비례한 기본 처리량 + 버스트 크레딧
  - Elastic: 워크로드에 따라 자동 확장 (최대 읽기 10 GB/s, 쓰기 3 GB/s)
  - Provisioned: 고정 처리량 할당

### 분산 학습에서의 장점

- **설정이 간단하다**: 파일시스템 만들고 마운트 타깃만 잡으면 된다. 별도 클라이언트 설치 없이 `mount -t nfs4`로 바로 붙는다.
- **체크포인트 저장소로 적합**: 내구성(11 9's)과 가용성이 높아 체크포인트를 안전하게 보관할 수 있다.
- **비용 효율적인 Infrequent Access 클래스**: 오래된 체크포인트를 IA로 자동 전환하면 비용을 줄일 수 있다.

### 주의점

- **throughput 한계**: Elastic 모드에서도 읽기 최대 10 GB/s다. GPU 수백 대가 동시에 데이터를 읽으면 부족할 수 있다. FSx for Lustre의 수백 GB/s와는 차이가 크다.
- **latency가 상대적으로 높다**: NFS 프로토콜 특성상 Lustre보다 메타데이터 연산이 느리다. 작은 파일 수십만 개를 읽는 패턴에서는 병목이 된다.
- **랜덤 I/O 성능**: 작은 파일을 대량으로 읽는 이미지 분류 등에서는 IOPS가 부족할 수 있다.
- **결론**: 데이터 로딩보다는 **체크포인트 저장, 설정 파일 공유, 소규모 학습** 에 더 어울린다.

## 3. Mountpoint for Amazon S3 — S3를 파일시스템처럼

### 개요

[Mountpoint for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mountpoint.html)는 S3 버킷을 로컬 파일시스템 경로에 마운트해주는 오픈소스 FUSE 클라이언트다. 2023년에 GA되었고, 꾸준히 성능이 개선되고 있다.

### 특성

- **S3 비용으로 무제한 용량**: 스토리지 비용이 S3 요금 그대로다. GB당 월 $0.023(Standard)로 FSx/EFS 대비 매우 저렴하다.
- **높은 읽기 처리량**: S3의 대역폭을 그대로 활용한다. 단일 인스턴스에서도 수십 Gbps의 읽기 처리량을 낼 수 있다(인스턴스 네트워크 대역폭이 허용하는 한).
- **순차 읽기에 최적화**: 대용량 파일을 순차적으로 읽는 패턴에서 뛰어난 성능을 보인다. LLM 학습 데이터(토크나이즈된 바이너리) 로딩에 적합.
- **서버리스**: 별도 인프라를 프로비저닝할 필요가 없다. `mount-s3` 명령어 하나로 마운트.
- **S3 Express One Zone**: 저지연이 필요하면 S3 Express One Zone 버킷을 쓸 수 있다. 일반 S3 대비 latency가 크게 낮다.

### 분산 학습에서의 장점

- **데이터가 이미 S3에 있다면 최고의 선택**: 대부분의 ML 파이프라인은 전처리된 데이터를 S3에 저장한다. 별도 복사 없이 바로 마운트해서 읽으면 된다.
- **비용이 압도적으로 저렴하다**: 페타바이트급 데이터셋을 두기에 FSx/EFS는 비용 부담이 크지만, S3는 현실적이다.
- **스케일 제한이 없다**: 노드가 몇 대든 동시에 읽을 수 있다. S3 자체가 사실상 무한한 읽기 병렬성을 제공한다.
- **PyTorch DataLoader와 호환**: 마운트 경로를 그냥 데이터 디렉토리로 지정하면 된다.

### 주의점

- **쓰기 제약**: 새 파일 생성(sequential write)은 가능하지만, **기존 파일 수정(overwrite)이나 append는 불가**하다. 체크포인트를 매번 새 파일로 써야 한다.
- **랜덤 읽기 성능**: S3는 object storage다. 파일 내 특정 offset을 seek해서 읽는 패턴은 비효율적이다. 작은 파일 수만 개를 랜덤으로 읽으면 S3 API 호출 오버헤드가 생긴다.
- **메타데이터 연산이 느리다**: `ls`로 수만 개 파일을 나열하거나, stat 호출이 빈번한 패턴에서는 체감 지연이 있다.
- **POSIX 부분 지원**: 심볼릭 링크, 하드 링크, rename, chmod 등은 지원하지 않는다. 일부 학습 프레임워크가 이런 연산에 의존하면 문제가 될 수 있다.
- **결론**: 순차 읽기 중심의 **데이터 로딩에 강하고**, 쓰기가 많은 체크포인트 저장에는 제약이 있다.

## 한눈에 비교

| 항목 | FSx for Lustre | EFS | Mountpoint for S3 |
|---|---|---|---|
| **프로토콜** | Lustre (POSIX) | NFS v4.1 (POSIX) | FUSE + S3 API (부분 POSIX) |
| **최대 읽기 처리량** | 수백 GB/s (용량 비례) | 10 GB/s (Elastic) | 인스턴스 네트워크 대역폭 한도 |
| **latency** | sub-ms | 수 ms | 수~수십 ms (첫 바이트) |
| **쓰기** | 완전 POSIX | 완전 POSIX | 새 파일만 (overwrite 불가) |
| **용량 관리** | 프로비저닝 (수동 증설) | 자동 확장 | 무제한 (S3) |
| **내구성** | Persistent: 복제 / Scratch: 없음 | 11 9's | 11 9's (S3) |
| **멀티 AZ** | 단일 AZ | 멀티 AZ | 리전 전체 |
| **S3 연동** | Data Repository (lazy-load/export) | 없음 (별도 복사 필요) | 네이티브 (S3 자체) |
| **비용 (GB/월)** | ~$0.14~$0.25 (Persistent) | ~$0.30 (Standard) / ~$0.016 (IA) | ~$0.023 (S3 Standard) |
| **프로비저닝 시간** | 수 분 | 즉시 | 즉시 (mount 명령) |
| **적합한 역할** | 데이터 로딩 + 체크포인트 | 체크포인트 + 설정 공유 | 데이터 로딩 (읽기 중심) |

> 비용은 us-east-1 기준 대략적인 값이다. 실제 비용은 배포 유형, 처리량 티어, 스토리지 클래스에 따라 달라진다.

## 실전 조합 패턴

실무에서는 하나만 쓰기보다 **역할에 따라 조합**하는 경우가 많다.

### 패턴 1: S3(데이터) + FSx for Lustre(캐시) + EFS(체크포인트)

가장 일반적인 대규모 학습 구성이다.

```
┌─────────────┐     lazy-load      ┌──────────────────┐
│  S3 (원본)   │ ──────────────────→ │  FSx for Lustre  │ ← GPU 노드들이 데이터 읽기
│  데이터셋    │ ←── export ──────── │  (캐시 레이어)    │
└─────────────┘                     └──────────────────┘
                                           │
                                    체크포인트 쓰기도 여기 가능
                                           │
                                    ┌──────────────────┐
                                    │      EFS         │ ← 체크포인트 장기 보관
                                    │  (공유 저장소)    │    설정 파일, 로그
                                    └──────────────────┘
```

- S3에 원본 데이터를 두고, FSx for Lustre가 Data Repository로 연결해 lazy-load
- GPU 노드는 FSx를 마운트해서 고속으로 읽기
- 체크포인트는 FSx에 쓰거나, 내구성이 더 중요하면 EFS에 저장
- 학습 끝나면 FSx를 삭제해 비용 절감

### 패턴 2: Mountpoint for S3(데이터) + EFS(체크포인트)

FSx를 띄우기 부담스러운 경우(비용, 프로비저닝 시간).

```
┌─────────────┐     mount-s3       ┌──────────────────┐
│  S3 버킷     │ ──────────────────→ │  /mnt/data       │ ← GPU 노드들이 읽기
│  데이터셋    │                     │  (Mountpoint)    │
└─────────────┘                     └──────────────────┘
                                    ┌──────────────────┐
                                    │  /mnt/checkpoints │ ← 체크포인트 쓰기
                                    │  (EFS)           │
                                    └──────────────────┘
```

- 데이터 로딩: S3를 Mountpoint로 마운트. 순차 읽기 중심이면 충분한 성능.
- 체크포인트: Mountpoint는 overwrite가 안 되니, EFS에 쓴다.
- FSx 대비 관리 포인트가 적고 비용이 저렴하다.
- LLM 학습처럼 대용량 파일을 순차로 읽는 워크로드에 특히 잘 맞는다.

### 패턴 3: FSx for Lustre 올인

성능이 최우선이고 비용을 감당할 수 있는 대규모 프로덕션 학습.

- 데이터 로딩 + 체크포인트 모두 FSx에서 처리
- Persistent 2 배포 유형으로 내구성 확보
- S3 Data Repository로 원본 연동 + 결과 export
- SageMaker HyperPod나 ParallelCluster에서 이 구성을 기본으로 제공

## 선택 가이드 — 언제 뭘 쓸까

### FSx for Lustre를 고르는 경우

- GPU 수십~수백 대 이상의 대규모 학습
- 작은 파일(이미지 등) 수백만 개를 랜덤으로 읽는 워크로드
- 체크포인트 쓰기 속도가 학습 효율에 직접적으로 영향을 주는 경우
- 이미 SageMaker HyperPod / ParallelCluster를 쓰고 있는 경우

### EFS를 고르는 경우

- 체크포인트 저장이 주 용도 (읽기 성능은 덜 중요)
- 여러 AZ에서 동시에 접근해야 하는 경우
- 설정 파일, 소스코드, 로그 등 소규모 공유 데이터
- 프로비저닝 없이 바로 쓰고 싶을 때
- 소규모 학습(GPU 수 대)에서 데이터 로딩까지 겸할 때

### Mountpoint for S3를 고르는 경우

- 데이터가 이미 S3에 있고, 별도 복사 없이 바로 쓰고 싶을 때
- 대용량 파일을 순차로 읽는 패턴 (LLM 학습 데이터, 동영상 등)
- 비용을 최소화해야 할 때 (페타바이트급 데이터)
- FSx를 띄울 만큼 장기 학습이 아닌 짧은 실험
- 쓰기가 새 파일 생성(체크포인트를 매번 새 파일로)으로 충분한 경우

> **S3 Express One Zone**: latency가 중요한데 Mountpoint를 쓰고 싶다면 고려하자. 일반 S3 대비 첫 바이트 지연이 크게 줄어든다. 다만 GB당 비용은 일반 S3보다 높다.

## 체크포인트 전략 보충

분산 학습에서 체크포인트 쓰기는 단순히 "어디에 저장하냐"만의 문제가 아니다. 몇 가지 실무적 고려사항을 짚는다.

### 동기 체크포인트 vs 비동기 체크포인트

- **동기**: 모든 GPU가 체크포인트 쓰기가 끝날 때까지 기다린다. 쓰기 대역폭이 곧 학습 중단 시간이다. → FSx for Lustre의 고속 쓰기가 유리.
- **비동기**: 체크포인트를 백그라운드에서 저장하고 학습을 계속한다. PyTorch의 `torch.distributed.checkpoint`가 이 패턴을 지원한다. → 쓰기 속도가 덜 중요해지므로 EFS나 S3도 선택지가 된다.

### 체크포인트 크기와 주기

- 70B 파라미터 모델의 체크포인트는 옵티마이저 상태 포함 시 **수백 GB~1TB**에 달한다.
- 주기가 짧을수록(예: 매 100 스텝) 스토리지 쓰기 부담이 크다.
- 큰 모델 + 짧은 주기라면 FSx의 throughput이 필요하고, 작은 모델 + 긴 주기라면 EFS로 충분하다.

### sharded checkpoint

대형 모델은 FSDP(Fully Sharded Data Parallel)나 DeepSpeed ZeRO로 파라미터를 샤딩한다. 이 경우 각 노드가 자기 샤드만 독립적으로 저장하므로, 파일시스템에 대한 동시 쓰기 부하가 분산된다. FSx의 병렬 I/O가 빛을 발하는 지점이다.

## 마무리

분산 학습의 스토리지 선택은 결국 **읽기 패턴, 쓰기 요구, 비용, 운영 편의성**의 균형이다.

- 성능이 최우선이면 → **FSx for Lustre**
- 간편함과 내구성이 우선이면 → **EFS**
- 비용과 스케일이 우선이면 → **Mountpoint for S3**

그리고 실전에서는 이 셋을 조합해서 쓴다. 데이터 읽기는 S3/FSx, 체크포인트 쓰기는 EFS/FSx — 역할에 맞게 배치하는 것이 핵심이다.

이 시리즈의 지금까지를 정리하면:

1. [1편: 일반 InfiniBand vs AWS EFA](https://ddii.dev/aws/infiniband-vs-efa/) — 개념 비교
2. [2편: AWS EFA 직접 써보기](https://ddii.dev/aws/efa-hands-on/) — 핸즈온
3. **3편: 분산 학습을 위한 AWS 공유 스토리지** (이 글) — 스토리지 선택

네트워크(EFA)로 노드 간 통신을 빠르게 하고, 스토리지(FSx/S3)로 데이터 공급을 원활하게 하면, 분산 학습의 두 가지 인프라 병목을 모두 해결한 셈이다.

## 참고 문서

- [Amazon FSx for Lustre User Guide](https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html)
- [Amazon EFS User Guide](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
- [Mountpoint for Amazon S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mountpoint.html)
- [Mountpoint for Amazon S3 GitHub](https://github.com/awslabs/mountpoint-s3)
- [S3 Express One Zone](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-express-one-zone.html)
- [Best practices for distributed training on AWS](https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training-best-practices.html)
- [PyTorch Distributed Checkpoint](https://pytorch.org/docs/stable/distributed.checkpoint.html)
