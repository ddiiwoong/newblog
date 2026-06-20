---
layout: single
title: "일반 InfiniBand vs AWS EFA"
comments: true
classes: wide
description: "HPC/분산 학습을 위한 고성능 네트워킹, 온프레미스 InfiniBand와 AWS EFA(Elastic Fabric Adapter)를 비교한다"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: aws/infiniband-vs-efa
date: 2026-06-21
categories:
  - AWS
tags:
  - AWS
  - EFA
  - InfiniBand
  - HPC
  - RDMA
  - NCCL
  - libfabric
  - networking
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

HPC(High Performance Computing)나 대규모 분산 ML 학습을 하다 보면 노드 간 통신이 병목이 되는 순간이 온다. 수백, 수천 개의 GPU가 매 스텝마다 gradient를 주고받아야 하는데, 일반적인 TCP/IP 스택으로는 latency와 CPU 오버헤드를 감당하기 어렵다. 그래서 등장한 것이 **RDMA(Remote Direct Memory Access)** 기반의 고성능 인터커넥트이고, 온프레미스 환경에서는 그 대표주자가 **InfiniBand**다.

그렇다면 클라우드, 특히 AWS에서는 어떻게 할까? AWS는 물리적인 InfiniBand 하드웨어를 노출하지 않는다. 대신 자체적으로 개발한 **EFA(Elastic Fabric Adapter)** 를 제공한다. 이번 글에서는 일반 InfiniBand와 AWS EFA가 무엇이 같고 무엇이 다른지 정리해보려고 한다.

<!--truncate-->

## RDMA가 필요한 이유

비교에 앞서, 두 기술이 공통으로 풀려고 하는 문제부터 짚고 넘어가자. 바로 **"노드끼리 데이터를 주고받을 때 생기는 낭비"** 다.

우리가 흔히 쓰는 TCP/IP 통신을 택배에 비유해보자. 옆 건물에 물건을 보내려는데, 직접 가져다주는 게 아니라 이런 단계를 거친다.

1. 내 물건을 우체국 박스에 옮겨 담는다. (애플리케이션 → 커널 버퍼 **복사**)
2. 우체국 직원이 송장을 붙이고 분류한다. (커널의 TCP/IP 스택 처리)
3. 택배 차가 출발한다. (NIC가 전송)

받는 쪽도 똑같이 역순으로 푼다. 문제는 이 "옮겨 담고, 직원이 처리하는" 과정마다 시간(latency)과 일손(CPU)이 든다는 것이다. 평소엔 괜찮지만, 수천 개의 GPU가 매 순간 서로 데이터를 주고받아야 하는 ML 학습에서는 이 낭비가 그대로 병목이 된다.

**RDMA(Remote Direct Memory Access)** 는 이 중간 단계를 통째로 건너뛴다. 우체국을 거치지 않고 **내가 옆집 책상에 직접 물건을 올려두고 오는 것**과 같다. 운영체제(커널)의 개입 없이 애플리케이션이 원격 노드의 메모리에 곧바로 읽고 쓴다. 그래서 이를 **OS bypass(커널 우회)** 라고 부른다. 결과적으로 지연 시간은 마이크로초 단위로 짧아지고, CPU도 거의 쓰지 않는다.

InfiniBand와 EFA는 **둘 다 이 RDMA를 제공한다**는 점에서 목표가 같다. 차이는 "그걸 어떻게 구현했느냐"에 있을 뿐이다. 아래에서 하나씩 보자.

## 일반 InfiniBand

InfiniBand는 1999년 InfiniBand Trade Association(IBTA)에서 표준화한 고속 인터커넥트(연결 기술)다. 지금은 사실상 NVIDIA(Mellanox 인수)가 생태계를 이끌고 있다.

한마디로 InfiniBand는 **"고성능 통신만을 위해 따로 깔아둔 전용 도로"** 라고 보면 된다. 우리가 쓰는 일반 이더넷(고속도로)과는 물리적으로 분리된, 전용 차선이다. 주요 특징은 다음과 같다.

- **전용 하드웨어 스택**: InfiniBand 전용 카드(HCA), 전용 스위치, 전용 케이블이 따로 필요하다. 이더넷과 섞이지 않는 별도의 네트워크다.
- **IB verbs**: 애플리케이션은 `libibverbs`라는 표준 API로 통신한다. InfiniBand 세계에서는 이게 사실상 공용어다.
- **Subnet Manager(SM)**: 도로에 신호와 교통정리가 필요하듯, InfiniBand 패브릭에도 **관제탑 역할을 하는 SM이 반드시 하나 떠 있어야** 한다. SM이 모든 노드에 주소(LID)를 나눠주고 경로를 정한다. SM이 없으면 패브릭 자체가 동작하지 않는다.
- **신뢰성 있는 연결(RC)**: 하드웨어 차원에서 "보낸 순서대로, 빠짐없이" 도착하는 것을 보장하는 전송 모드를 지원한다.
- **무손실(lossless) 네트워크**: 차가 막히면 미리 신호를 보내 출발을 늦추는 방식(credit 기반 흐름 제어)으로, 패킷이 버려지는 일이 거의 없도록 설계되었다.

정리하면 InfiniBand는 **성능은 최고지만, 전용 장비를 사서 깔고 관제탑(SM)까지 직접 운영해야 하는** 기술이다. 규모가 커질수록 이 전용 도로를 설계하고 관리하는 난이도도 함께 올라간다.

## AWS EFA

그렇다면 AWS는 어떻게 했을까? AWS는 InfiniBand 전용 도로를 새로 깔지 않았다. 대신 **이미 있는 도로(자사 네트워크) 위에서 고속 통신이 가능하도록 똑똑한 우회로를 만든** 것이 EFA(Elastic Fabric Adapter)다. 기존 ENA(일반 네트워크 어댑터)에 RDMA 기능을 더한 형태로, EC2 인스턴스에서 EFA만 켜면 OS bypass 통신을 쓸 수 있다.

핵심 특징은 다음과 같다.

- **SRD(Scalable Reliable Datagram)**: EFA의 심장에 해당하는 전송 프로토콜이다. InfiniBand가 "정해진 한 길로 순서대로" 보낸다면, SRD는 **택배를 여러 갈래 길로 나눠서 동시에 보내는(multipath)** 방식을 쓴다. 그래서 일부 패킷이 순서가 뒤바뀐 채 도착할 수 있는데, **순서를 다시 맞추는 일은 받는 쪽 상위 계층이 처리**한다. 이는 길이 수없이 많고 군데군데 막히기도 하는 대규모 클라우드 네트워크의 현실에 맞춘 선택이다. 한 길이 막혀도 다른 길로 우회하면 되니 더 유연하다.
- **libfabric provider**: EFA는 InfiniBand의 IB verbs가 아니라 **libfabric**이라는 라이브러리를 통해 동작한다. MPI나 NCCL 같은 상위 도구가 이 libfabric을 호출하는 구조다.
- **관제탑(SM)이 필요 없음**: EFA는 AWS가 알아서 관리하는 네트워크 위에서 돌아가므로, 사용자가 Subnet Manager를 직접 운영할 필요가 없다. **인스턴스 띄우고 EFA 체크박스만 켜면 끝**이다.
- **손실을 허용하는(lossy) 설계**: InfiniBand가 "애초에 패킷을 안 버리게" 만든다면, SRD는 **"버려질 수도 있다고 보고, 버려지면 아주 빠르게 다시 보내는"** 쪽으로 접근한다. 손실을 막는 대신, 손실이 나도 마이크로초 단위로 복구하는 데 집중한다.

즉 EFA는 InfiniBand를 그대로 베낀 게 아니라, **같은 목표(저지연 OS bypass 통신)를 클라우드 환경에 맞는 다른 방식으로 다시 설계한** 기술이다.

## 한눈에 보는 비교

| 항목 | 일반 InfiniBand | AWS EFA |
|---|---|---|
| 제공 형태 | 전용 하드웨어(HCA/스위치/케이블) | EC2 인스턴스의 네트워크 인터페이스 |
| 전송 프로토콜 | RC 등 IB verbs 기반 | SRD(Scalable Reliable Datagram) |
| 프로그래밍 인터페이스 | `libibverbs` (IB verbs) | `libfabric` (`efa` provider) |
| 순서 보장 | 하드웨어 레벨에서 보장(RC) | 보장 안 함, 상위 계층이 재정렬 |
| 경로 | 단일 경로 중심 | multipath |
| 네트워크 가정 | lossless(무손실) | lossy(손실 허용 후 복구) |
| 관리 주체 | 사용자가 SM/패브릭 운영 | AWS 관리형, SM 불필요 |
| 호환 라이브러리 | MPI, NCCL | MPI(OpenMPI/Intel MPI), NCCL(aws-ofi-nccl) |
| 확장성 | 패브릭 설계에 의존 | 클라우드 스케일에 맞춰 설계 |

## 그래서 같은 코드가 돌아가나?

여기서 자연스럽게 드는 궁금증이 있다. "InfiniBand랑 EFA가 속은 이렇게 다른데, 그럼 내 코드를 양쪽에서 다 고쳐야 하나?" 결론부터 말하면 **대부분 그대로 돌아간다.**

비결은 **중간에 통역사(추상화 계층)가 끼어 있기 때문**이다. 우리가 직접 InfiniBand나 EFA에게 말을 거는 게 아니라, MPI(HPC용)나 NCCL(분산 학습용) 같은 라이브러리에게 "데이터 좀 모아서 나눠줘"라고 부탁하면, 그 라이브러리가 알아서 하부 통신 방식에 맞게 통역해준다.

- **MPI**: 똑같은 MPI 코드라도, InfiniBand 위에서는 IB verbs로, EFA 위에서는 libfabric으로 알아서 연결된다. 애플리케이션은 그냥 동일한 MPI 함수를 부를 뿐이다.
- **NCCL**: GPU 분산 학습의 핵심인 NCCL은 `aws-ofi-nccl`이라는 플러그인을 통해 EFA(libfabric)에 연결된다. InfiniBand 환경에서는 NCCL이 IB verbs를 직접 쓴다. 어느 쪽이든 PyTorch나 TensorFlow 입장에서는 그저 `all_reduce`를 호출할 뿐, 밑에서 뭐가 도는지 신경 쓸 필요가 없다.

그래서 **"애플리케이션이 잘 도느냐"는 양쪽에서 똑같이 검증할 수 있다.** 다만 주의할 점은, **하드웨어/프로토콜 레벨의 동작(IB verbs 특유의 기능, SM 운영, 무손실 전송 같은 것)까지 EFA로 똑같이 재현할 수는 없다**는 것이다. EFA는 InfiniBand를 흉내 낸 게 아니라 아예 다른 방식이기 때문이다.

## AWS에서 테스트해보려면

EFA 기반 고성능 통신을 직접 검증하고 싶다면 다음 순서로 접근하면 된다.

### EFA 지원 인스턴스 선택

먼저 알아둘 점은, EFA가 모든 사이즈에서 지원되는 것이 아니라는 것이다. EFA는 인스턴스가 호스트의 네트워크 대역폭을 충분히 확보해야 하므로, 많은 패밀리에서 **가장 큰 사이즈(16xlarge / 32xlarge / 48xlarge 등)** 위주로 지원된다.

- HPC용: `hpc6a`, `hpc7g`, `c5n.18xlarge` 등
- GPU 분산 학습용: `p4d`, `p5`, `g5`, `g6` 등

다만 예외가 있다. 2021년에 AWS가 C5n, G4, I3 등 일부 패밀리에 대해 작은 사이즈에도 EFA를 확장했다. 예를 들어 `c5n.9xlarge`(절반 사이즈)나 `g4dn.8xlarge`도 EFA를 지원한다. 단순히 "EFA가 동작하는지" 학습/검증하는 용도라면 이런 작은 사이즈가 진입 장벽이 낮아 유용하다.

특정 리전에서 EFA를 지원하는 인스턴스 목록은 다음 명령으로 직접 확인할 수 있다.

```bash
aws ec2 describe-instance-types \
  --filters Name=network-info.efa-supported,Values=true \
  --query "InstanceTypes[].InstanceType" \
  --output text
```

### 멀티 GPU NCCL 테스트: 단일 노드 vs 멀티 노드

GPU 분산 학습 통신(NCCL)을 테스트할 때는 다음 두 시나리오를 구분해야 한다.

- **단일 노드 내 멀티 GPU**: GPU가 여러 개 달린 인스턴스 1대에서 NCCL을 돌리면, GPU 간 통신은 NVLink/PCIe로 노드 내부에서 처리된다. 이 경우 **EFA를 타지 않는다.** 노드가 하나뿐이라 노드 간 통신 자체가 없기 때문이다. `g4dn.12xlarge`(T4 4장)나 `g5.12xlarge`(A10G 4장)처럼 GPU가 여러 개인 인스턴스로 손쉽게 시도해볼 수 있다.
- **멀티 노드 멀티 GPU**: EFA가 실제로 의미를 가지려면 **2대 이상의 인스턴스를 같은 Cluster Placement Group에 배치**하고 노드 간 NCCL을 돌려야 한다. 이것이 InfiniBand 대체로서의 EFA를 검증하는 진짜 테스트다. `g5.48xlarge`, `g6.48xlarge`, `p4d.24xlarge`, `p5.48xlarge` 같은 인스턴스를 2대 이상 사용한다.

### GPUDirect RDMA 여부가 핵심

EFA가 NCCL을 **제대로 가속**하려면, GPU 메모리에서 EFA로 데이터가 직접 전달되는 **GPUDirect RDMA**가 필요하다. 이 지원 수준에 따라 EFA의 효과가 크게 달라진다.

- `p4d`, `p5`, `p5en`: GPUDirect RDMA를 완전히 지원하고 다중 네트워크 카드를 갖춰, EFA의 진가가 드러나는 인스턴스다. GPUDirect RDMA는 P4d에서 처음 지원되기 시작했다.
- `g5`, `g6`: EFA 자체는 동작하지만 GPUDirect RDMA를 지원하지 않고(RDMA = No) 네트워크 카드 구성도 제한적이라, p 계열만큼의 성능은 기대하기 어렵다.
- `g4dn`: 마찬가지로 GPUDirect RDMA를 지원하지 않는다. 노드 간 EFA를 써도 GPU↔CPU 복사를 거치므로 가속 효과가 제한적이다.

참고로 AWS의 **NCCL + EFA 공식 가이드(getting started)는 가속 컴퓨팅 P 계열 인스턴스만 지원 대상으로 명시**하고 있다. 즉 g5/g6에서도 EFA로 NCCL을 돌려볼 수는 있지만, GPUDirect RDMA가 적용되는 정식 경로이자 EFA의 실제 성능(InfiniBand 대체)을 제대로 검증하려면 `p4d`/`p5` 계열을 사용하는 것이 맞다. g5/g6는 "EFA 멀티노드 통신이 동작하는지" 정도를 가볍게 확인하는 용도로 보면 된다.

### 셋업 순서 (멀티 노드 기준)

1. **AWS Deep Learning AMI** 사용: EFA 드라이버, libfabric, `aws-ofi-nccl` 플러그인, NCCL이 모두 사전 설치되어 있어 셋업이 수월하다. AWS ParallelCluster를 써도 된다.
2. **Cluster Placement Group** 생성 후 그 안에 인스턴스를 2대 이상 배치해 노드 간 물리적 근접성을 확보한다.
3. 각 인스턴스 생성 시 **EFA 인터페이스를 활성화**("EFA with ENA" 선택)하고, 같은 보안 그룹 내에서 자기 자신을 참조하는(self-referencing) 인바운드/아웃바운드 규칙을 허용한다.
4. **EFA 인식 확인**
   ```bash
   fi_info -p efa
   ```
5. **검증**
   - HPC: OSU Micro-Benchmarks로 latency/bandwidth 측정
   - 분산 학습: `nccl-tests`의 `all_reduce_perf`로 collective 성능 측정
   ```bash
   mpirun -np 16 -N 8 --hostfile hosts \
     -x FI_PROVIDER=efa \
     -x NCCL_DEBUG=INFO \
     ./build/all_reduce_perf -b 8 -e 8G -f 2 -g 1
   ```
6. `NCCL_DEBUG=INFO` 로그에 `NET/OFI Selected provider is efa`가 보이면 통신이 EFA를 정상적으로 타고 있는 것이다.

## 마무리

InfiniBand와 EFA는 **"노드 간 저지연 RDMA 통신"이라는 같은 목표**를 향하지만, 그것을 구현하는 방식이 다르다. InfiniBand는 무손실 전용 패브릭과 IB verbs라는 완결된 생태계로, EFA는 클라우드의 lossy multipath 환경에 맞춘 SRD와 libfabric으로 접근한다.

진짜 InfiniBand 하드웨어와 프로토콜을 검증하는 것이 목적이라면 AWS는 답이 아니다. 하지만 MPI/NCCL 위에서 동작하는 **실제 HPC·대규모 분산 학습 워크로드의 동작과 성능을 검증**하는 것이 목적이라면, EFA는 충분히 강력한 선택지다. 실제로 오늘날 클라우드에서 돌아가는 대부분의 대규모 학습이 이 방식으로 통신하고 있다.

결국 중요한 건 "InfiniBand냐 EFA냐"가 아니라, **내 워크로드가 추상화 계층(MPI/NCCL) 위에서 잘 동작하고 원하는 성능이 나오느냐**다.

다음 포스팅에서는 이번 글에서 정리한 개념을 바탕으로, 실제 EC2에 EFA를 활성화하고 NCCL/MPI 벤치마크를 돌려보는 **실습 위주의 내용**을 다뤄보려고 한다. Cluster Placement Group 구성부터 `fi_info`로 EFA 인식 확인, `nccl-tests`로 노드 간 collective 성능을 측정하는 과정까지 직접 손으로 따라가 볼 예정이다.

## 참고 문서

### AWS EFA

- [Elastic Fabric Adapter for AI/ML and HPC workloads on Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html) — EFA 개요, SRD, 지원 인스턴스 표, 제약사항
- [Get started with EFA and NCCL for ML workloads](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start-nccl.html) — NCCL+EFA 셋업(보안그룹, placement group, 검증), P 계열 지원 명시
- [Get started with EFA and MPI for HPC workloads](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start.html) — MPI+EFA 셋업
- [EFA Now Supports NVIDIA GPUDirect RDMA](https://aws.amazon.com/about-aws/whats-new/2020/11/efa-supports-nvidia-gpudirect-rdma) — GPUDirect RDMA(P4d) 지원 발표
- [EFA now supports new instance sizes](https://aws.amazon.com/about-aws/whats-new/2021/11/elastic-adapter-instance-sizes-ec2-amazon-instance-types/) — C5/G4/I3 작은 사이즈 EFA 확장
- [Using EFA on the DLAMI](https://docs.aws.amazon.com/dlami/latest/devguide/tutorial-efa-using.html) — Deep Learning AMI에서 EFA 사용

### SRD (Scalable Reliable Datagram)

- [A cloud-optimized transport protocol for elastic and scalable HPC](https://www.amazon.science/publications/a-cloud-optimized-transport-protocol-for-elastic-and-scalable-hpc) — SRD 설계 원논문(Amazon Science). multipath, out-of-order 전송 설명
- [PERF05-BP05 Choose network protocols](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/perf_networking_choose_network_protocols_improve_performance.html) — Well-Architected: *"SRD can reorder packets and deliver them out of order"*

### InfiniBand

- [InfiniBand Specification (IBTA)](https://www.infinibandta.org/ibta-specification/) — InfiniBand Trade Association 공식 사양
- [NVIDIA SM (OpenSM) — InfiniBand Subnet Manager](https://docs.nvidia.com/doca/sdk/nvidia-sm) — Subnet Manager 역할, InfiniBand 사양의 Subnet Management 구현
- [Programming Examples Using IBV Verbs (NVIDIA)](https://docs.nvidia.com/networking/display/rdmaawareprogrammingv17/programming+examples+using+ibv+verbs) — `libibverbs` 기반 RDMA 프로그래밍

> 본문의 EFA/SRD 내용은 AWS 공식 문서와 Amazon Science 논문을, InfiniBand 내용은 IBTA 사양 및 NVIDIA 네트워킹 문서를 기준으로 검증했다. (작성/검증 시점: 2026-06)
