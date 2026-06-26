---
layout: single
title: "AWS EFA 직접 써보기 — 멀티노드 통신"
comments: true
classes: wide
description: "EFA를 켠 EC2 2대로 노드 간 RDMA 통신을 확인하고 NCCL 벤치마크까지 직접 돌려보는 핸즈온"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: aws/efa-hands-on
date: 2026-06-26
categories:
  - AWS
tags:
  - AWS
  - EFA
  - NCCL
  - libfabric
  - HPC
  - RDMA
  - GPU
  - placement-group
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

지난 글 [일반 InfiniBand vs AWS EFA](https://ddii.dev/aws/infiniband-vs-efa/)에서는 EFA가 무엇인지, InfiniBand와 어떻게 다른지를 정리했다. EFA가 빠른 이유(커널 TCP/IP 스택을 우회하는 OS bypass, 패킷을 여러 경로로 분산 전송하는 SRD)까지는 개념으로 짚었다.

그런데 개념을 알았다고 손이 움직이는 건 아니다. **"그래서 EFA를 실제로 어떻게 켜고 쓰는데?"** 이 글은 그 질문에 답한다. EFA를 켠 인스턴스 2대를 띄우고, 노드 간 통신이 진짜로 EFA를 타는지 확인한 뒤, NCCL 벤치마크로 성능까지 측정하는 과정을 처음부터 끝까지 따라가 본다.

<!--truncate-->

## 테스트 구성

```
[ 인스턴스 A (GPU) ]  ←— EFA / SRD —→  [ 인스턴스 B (GPU) ]
        \                                      /
         \____ 같은 Cluster Placement Group ___/
              (같은 AZ · 같은 서브넷 · 근접 배치)
```

1. EFA 지원 인스턴스 2대를 **같은 Placement Group**에 띄운다
2. EFA 소프트웨어 스택을 설치하고 `fi_info`로 인식 확인
3. 두 노드 간 통신이 실제로 EFA를 타는지 검증
4. `nccl-tests`로 멀티노드 all-reduce 대역폭 측정
5. **EFA 켜기 전 vs 후**를 비교해서 효과를 확인

이 글은 **GPU 분산 학습(NCCL)** 을 메인 예제로 한다. CPU/HPC(MPI) 쪽도 흐름은 거의 같으니 중간중간 짚어주겠다. 그리고 실제로 돌렸을 때 무엇을 확인할 수 있는지 "따라 하기 가이드" 수준으로 정리했다.

## 1. 사전 준비

EFA는 기존 ENA(일반 네트워크 어댑터) 위에 RDMA 기능을 얹어, EC2에서 EFA만 켜면 OS bypass 통신을 쓸 수 있게 해주는 인터페이스다. 다만 이 통신이 제대로 동작하려면 몇 가지 전제 조건이 있다.

### EFA 지원 인스턴스 타입

EFA는 모든 인스턴스에서 켤 수 있는 게 아니다. GPU 분산 학습이라면 보통 다음을 쓴다.

- **`p4d.24xlarge`** (A100 8장), **`p5.48xlarge`** (H100 8장): GPUDirect RDMA를 완전히 지원하는 인스턴스. 이 글의 메인 타깃이다.
- HPC/CPU라면: `hpc6a.48xlarge`, `c5n.18xlarge`, `c5n.9xlarge` 등

> 지난 글에서 짚었듯, AWS의 NCCL + EFA 공식 가이드는 **P 계열만 지원 대상으로 명시**한다. g5/g6에서도 EFA 자체는 동작하지만 GPUDirect RDMA가 없어 효과가 제한적이다. 이 글에서는 설명은 P 계열 기준으로 하되, 실제 벤치마크는 비용을 고려해 `g6.12xlarge`로 진행했다.

### 같은 서브넷 + Cluster Placement Group

EFA 트래픽은 **같은 가용 영역(AZ) 안, 같은 서브넷**에 있는 인스턴스끼리만 통한다. AZ나 VPC를 넘으면 EFA 트래픽은 흐르지 않는다(일반 IP 트래픽은 통신 가능).

EFA의 낮은 지연 시간은 노드들이 물리적으로 가까이 배치되어 있을 때 보장된다. 이를 위한 것이 **Cluster Placement Group**이다. cluster 전략으로 묶으면 AWS가 인스턴스들을 같은 랙 또는 근접한 위치에 배치해 노드 간 지연과 지터를 최소화한다.

```bash
# cluster 전략으로 placement group 생성
aws ec2 create-placement-group \
  --group-name efa-cluster \
  --strategy cluster
```

### 보안그룹 self-referencing 규칙

EFA에서 가장 자주 빠뜨리는 함정이다. EFA 트래픽이 통하려면 **보안그룹이 자기 자신을 출발지/목적지로 하는 모든 트래픽(all traffic)을 허용**해야 한다. 즉 "이 보안그룹에 속한 멤버끼리는 전부 통과"라는 규칙이 필요하다.

```bash
# 보안그룹 생성
aws ec2 create-security-group \
  --group-name efa-sg \
  --description "EFA enabled SG" \
  --vpc-id vpc-xxxxxxxx

# 자기 자신(sg-xxxx)을 source로 하는 all traffic 인바운드 허용
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxxxxx \
  --protocol -1 --port -1 \
  --source-group sg-xxxxxxxx

# 자기 자신을 destination으로 하는 all traffic 아웃바운드 허용
aws ec2 authorize-security-group-egress \
  --group-id sg-xxxxxxxx \
  --protocol -1 --port -1 \
  --source-group sg-xxxxxxxx
```

여기에 본인 IP에서 들어오는 SSH(22)만 따로 열어주면 된다. (운영 환경에서는 SSH 소스를 반드시 내 IP로 제한하자.)

> **가장 중요한 함정 — egress는 반드시 self-referencing으로.** 기본 보안그룹에는 이미 `0.0.0.0/0` 아웃바운드 규칙이 있어서 "어차피 다 열려 있으니 괜찮겠지"라고 넘어가기 쉽다. **하지만 EFA(SRD) 트래픽은 CIDR 기반 `0.0.0.0/0` egress 규칙으로는 나가지 못한다.** 보안그룹을 *자기 자신*으로 지정한 self-referencing egress 규칙이 따로 있어야 한다. 이게 없으면 아주 헷갈리는 증상이 나타난다 — `ping`·SSH·TCP(부트스트랩 포트)는 멀쩡히 되는데(이건 `0.0.0.0/0`으로 통과), 정작 **EFA 데이터 전송만 응답 없이 멈춘다.** `fi_pingpong`은 컨트롤 연결까지만 맺고 hang, NCCL은 `Init COMPLETE`까지 가놓고 첫 데이터 교환에서 멈춘다. 실제로 이 글을 검증하면서 egress를 self-ref로 바꾸자마자 노드 간 EFA 통신이 곧바로 살아났다. (검증: self-ref egress 추가 시 정상, 제거하고 `0.0.0.0/0`만 두면 즉시 hang — EFA 하드웨어 카운터로 송신 자체가 안 되는 것을 확인)

## 2. EFA 활성화 인스턴스 띄우기

준비가 끝났으면 인스턴스를 띄운다. 핵심은 네트워크 인터페이스의 **`InterfaceType=efa`** 설정이다. 콘솔에서는 인스턴스 생성 시 "Advanced network configuration"에서 **Elastic Fabric Adapter** 체크박스를 켜면 된다.

CLI로는 이렇게 한다.

```bash
aws ec2 run-instances \
  --image-id ami-xxxxxxxx \          # Deep Learning AMI 권장
  --instance-type p4d.24xlarge \
  --key-name my-key \
  --count 2 \
  --placement "GroupName=efa-cluster" \
  --network-interfaces "DeviceIndex=0,InterfaceType=efa,Groups=sg-xxxxxxxx,SubnetId=subnet-xxxxxxxx,DeleteOnTermination=true"
```

포인트 정리:

- `InterfaceType=efa`: 이게 EFA(ENA 포함) 인터페이스를 만든다. 이 한 줄이 핵심이다.
- `--placement "GroupName=efa-cluster"`: 위에서 만든 placement group에 넣는다.
- `--count 2`: 노드 간 통신을 보려면 최소 2대.
- **AMI는 Deep Learning AMI(DLAMI)를 권장**한다. EFA 드라이버, libfabric, `aws-ofi-nccl` 플러그인, NCCL이 미리 설치되어 있어 다음 단계(설치)를 상당 부분 건너뛸 수 있다.

> p4d는 네트워크 카드가 4개, p5는 32개다. 카드당 EFA를 하나씩 붙일 수 있어 대역폭을 극대화하려면 인터페이스를 여러 개 구성한다. 다만 첫 실습에서는 `DeviceIndex=0` 하나로도 동작 확인에는 충분하다.

## 3. EFA 소프트웨어 스택 설치

DLAMI가 아니라 일반 AMI(Amazon Linux 2023, Ubuntu 22.04 등)로 시작했다면 직접 설치해야 한다. AWS가 제공하는 **EFA Installer** 하나로 드라이버 + Libfabric + aws-ofi-nccl + OpenMPI가 한 번에 깔린다.

```bash
# 1. latest 패키지 다운로드 (항상 최신 버전을 가리킴)
curl -O https://efa-installer.amazonaws.com/aws-efa-installer-latest.tar.gz

# 2. 압축 해제 후 디렉터리 진입
tar -xf aws-efa-installer-latest.tar.gz && cd aws-efa-installer

# 3. 설치 (OpenMPI 4.1만 설치)
sudo ./efa_installer.sh -y --mpi=openmpi4
```

> 작성 시점(2026-06) 기준 최신 버전은 **1.48.0**이다. [릴리스 노트](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-changelog.html)에서 최신 버전을 확인할 수 있다.

설치가 끝나면 구성 요소들이 다음 위치에 들어간다.

- Libfabric → `/opt/amazon/efa`
- aws-ofi-nccl 플러그인 → `/opt/amazon/ofi-nccl`
- OpenMPI → `/opt/amazon/openmpi`

설치 중 재부팅하라고 하면 재부팅하고, 아니면 로그아웃 후 다시 접속한다.

### `fi_info`로 인식 확인

지난 글에서 슬쩍 보여줬던 그 명령어다. 이제 제대로 써보자.

```bash
fi_info -p efa -t FI_EP_RDM
```

EFA가 정상이라면 libfabric의 `efa` provider 정보가 출력된다.

```
provider: efa
fabric: EFA-fe80::94:3dff:fe89:1b70
domain: efa_0-rdm
version: 2.0
type: FI_EP_RDM
protocol: FI_PROTO_EFA
```

`p4d`/`p5`처럼 네트워크 카드가 여러 개인 인스턴스라면 `efa_0-rdm`, `efa_1-rdm`... 식으로 여러 개가 나온다. **여기서 아무것도 안 나오면** EFA 인터페이스가 안 붙은 것이다. 7번 트러블슈팅 절을 보자.

## 4. 진짜 되는지 확인 — 노드 간 통신 테스트

한 노드에서 `fi_info`가 떴다는 건 "이 노드에 EFA가 달려 있다"는 의미일 뿐이다. 우리가 보고 싶은 건 **두 노드가 EFA로 실제로 대화하는지**다.

### passwordless SSH 설정

멀티노드 테스트는 한 노드(마스터)가 다른 노드에 SSH로 명령을 던지는 방식이다. 그래서 노드 간 비밀번호 없는 SSH가 필요하다.

```bash
# 마스터 노드에서 키 생성 후, 두 노드의 authorized_keys에 등록
ssh-keygen -t rsa -N "" -f ~/.ssh/id_rsa
# 생성된 ~/.ssh/id_rsa.pub 를 각 노드의 ~/.ssh/authorized_keys 에 추가
```

설정 후 마스터에서 워커로 `ssh <워커 private IP>` 가 비밀번호 없이 되면 성공이다.

### libfabric 레벨 핑퐁 테스트

NCCL을 돌리기 전에, libfabric 차원에서 두 노드의 latency를 먼저 재보자. EFA Installer에 포함된 `fi_pingpong`을 쓴다.

```bash
# 노드 B(서버 역할)에서 먼저 실행
fi_pingpong -e rdm -p efa -f efa

# 노드 A(클라이언트)에서 노드 B의 private IP를 향해 실행
fi_pingpong -e rdm -p efa -f efa <노드 B private IP>
```

출력되는 latency(usec)와 bandwidth(MB/s)가 두 노드가 EFA로 직접 통신한 결과다. TCP로 같은 테스트를 했을 때보다 latency가 눈에 띄게 낮은 걸 확인할 수 있다.

> **주의 — `-f efa`를 꼭 붙이자.** 최신 EFA 소프트웨어(libfabric 2.x)는 `efa`와 `efa-direct` 두 개의 fabric을 노출한다. `fi_pingpong -p efa`만 쓰면 첫 번째로 잡히는 `efa-direct`(양방향 send/recv 미지원)를 선택해 테스트가 응답 없이 멈추는 경우가 있다. SRD 기반의 `efa` fabric을 명시하려면 `-f efa`를 붙여야 한다. `fi_info -p efa`를 실행하면 두 fabric이 모두 보인다.

> **왜 더 빠른가?** 일반 TCP는 커널의 TCP/IP 스택을 거치면서 매번 메모리 복사와 패킷 처리가 일어난다. 반면 EFA는 이 커널 경로를 우회(OS bypass)해 애플리케이션이 상대 노드 메모리에 직접 데이터를 쓴다. 게다가 SRD는 패킷을 여러 경로로 분산 전송(multipath)해 특정 경로의 혼잡을 피한다. 이 두 가지가 마이크로초 단위의 낮은 latency로 나타난다.

### 실측 비교 — EFA vs TCP

수치로 확인하기 위해, 같은 인스턴스 2대(c5n.9xlarge, 같은 서브넷)에서 `fi_pingpong`을 **EFA**와 **TCP**로 각각 돌려 비교했다. EFA는 `-e rdm -p efa -f efa`, TCP는 `-e rdm -p "tcp;ofi_rxm"`로 측정했다.

| 메시지 크기 | EFA latency (μs) | EFA 대역폭 (MB/s) | TCP latency (μs) | TCP 대역폭 (MB/s) |
|---|---|---|---|---|
| 256 B | **27.7** | 9.2 | 36.4 | 7.0 |
| 1 KB | **25.6** | 40.0 | 31.0 | 33.0 |
| 4 KB | **26.3** | 155.7 | 35.1 | 116.7 |
| 64 KB | **46.4** | 1,412.4 | 146.2 | 448.3 |
| 1 MB | **453.1** | **2,314.5** | 1,887.5 | 555.6 |

작은 메시지에서는 latency 차이가 크지 않지만(25μs vs 31μs), **메시지가 커질수록 격차가 벌어진다.** 1MB에서는 EFA가 TCP보다 latency는 약 **4배 낮고**, 대역폭은 약 **4배 높다**(2,314 vs 556 MB/s). 분산 학습처럼 큰 텐서를 주고받는 워크로드에서 EFA가 유리한 이유가 여기 있다.

대역폭을 Gbps로 환산하면 다음과 같다. `c5n.9xlarge`의 정격 네트워크 대역폭은 **50 Gbps**인데, 위 1MB 측정값은:

- EFA: 2,314 MB/s ≈ **약 18.5 Gbps**
- TCP: 556 MB/s ≈ 약 4.4 Gbps

`fi_pingpong`은 한 번에 하나씩 주고받는 **단일 스트림 + 왕복(latency-bound)** 테스트라, 정격 50 Gbps를 다 채우지는 못한다(이건 정상이다). 라인레이트에 가깝게 끌어올리려면 여러 스트림을 동시에 돌리거나(예: `nccl-tests`의 멀티 채널 all-reduce, 다중 EFA 네트워크 카드) 더 큰 메시지를 써야 한다. 그럼에도 **같은 단일 스트림 조건에서 EFA가 TCP의 약 4배 대역폭**을 내는 것이 핵심이다.

> 위 수치는 GPU 없는 c5n(EFA v1) 2노드에서 libfabric 레벨로 측정한 값이다. 절대값은 인스턴스 타입·네트워크 카드 수·메시지 패턴에 따라 달라지므로, 경향(메시지가 클수록 EFA 우위 확대)에 주목하자.

## 5. 실전 워크로드 — NCCL 멀티노드 all-reduce

GPU 분산 학습에서 가장 빈번한 통신 패턴인 **all-reduce**(모든 GPU의 gradient를 합쳐 다시 나눠주는 연산)를 멀티노드로 돌려본다.

### NCCL과 nccl-tests 설치

DLAMI라면 이미 있다. 직접 깔아야 한다면:

```bash
# NCCL
cd /opt
sudo git clone https://github.com/NVIDIA/nccl.git -b v2.23.4-1 && cd nccl
sudo make -j src.build CUDA_HOME=/usr/local/cuda

# nccl-tests
cd $HOME
git clone https://github.com/NVIDIA/nccl-tests.git && cd nccl-tests
export LD_LIBRARY_PATH=/opt/amazon/efa/lib64:$LD_LIBRARY_PATH   # Ubuntu는 /opt/amazon/efa/lib
make MPI=1 MPI_HOME=/opt/amazon/openmpi NCCL_HOME=/opt/nccl/build CUDA_HOME=/usr/local/cuda
```

### 호스트 파일 작성

두 노드의 private IP를 적은 `my-hosts` 파일을 만든다.

```
192.168.2.54
192.168.2.55
```

### 멀티노드 all-reduce 실행

마스터 노드에서 OpenMPI의 `mpirun`으로 두 노드에 걸쳐 NCCL 테스트를 실행한다. (p4d/p5 기준, GPU 16장 = 노드당 8장 × 2노드)

```bash
/opt/amazon/openmpi/bin/mpirun \
  -x FI_PROVIDER=efa \
  -x FI_EFA_USE_DEVICE_RDMA=1 \
  -x LD_LIBRARY_PATH=/opt/nccl/build/lib:/usr/local/cuda/lib64:/opt/amazon/efa/lib:/opt/amazon/openmpi/lib:/opt/amazon/ofi-nccl/lib:$LD_LIBRARY_PATH \
  -x NCCL_DEBUG=INFO \
  --hostfile my-hosts -n 16 -N 8 \
  --mca pml ^cm --mca btl tcp,self --mca btl_tcp_if_exclude lo,docker0 --bind-to none \
  $HOME/nccl-tests/build/all_reduce_perf -b 8 -e 1G -f 2 -g 1 -c 1 -n 100
```

주요 환경변수:

- **`FI_PROVIDER=efa`**: libfabric이 EFA provider를 쓰도록 명시
- **`FI_EFA_USE_DEVICE_RDMA=1`**: EFA 디바이스의 RDMA 기능 사용 (p4d/p5에서 권장)
- **`NCCL_DEBUG=INFO`**: NCCL이 어떤 경로로 통신하는지 로그로 보여줌
- `-n 16 -N 8`: 전체 16 프로세스, 노드당 8 프로세스(=GPU 8장)
- **`--mca pml ^cm --mca btl tcp,self`**: 이 플래그를 빠뜨리지 말자. MPI **자체의 제어 통신(MPI_Init 등)** 을 TCP로 처리하도록 강제하는 옵션이다. 이게 없으면 OpenMPI가 MPI 통신에도 OFI/EFA 경로를 쓰려다 **`MPI_Init` 단계에서 응답 없이 멈추는** 경우가 있다. 핵심은 *"MPI 제어는 TCP로, GPU 데이터(NCCL)만 EFA로"* 분리하는 것이다. `--mca btl_tcp_if_exclude lo,docker0`는 TCP 통신에서 루프백·도커 인터페이스를 제외해 올바른 인터페이스를 고르게 한다.

> **실제로 겪은 함정.** 위 `--mca` 플래그 없이 `mpirun`을 돌렸더니 NCCL 로그조차 한 줄 찍히지 않고 `MPI_Init`에서 멈췄다. 플래그를 추가하자 곧바로 `NET/OFI Selected provider is efa ... Init COMPLETE`까지 진행됐다. NCCL이 EFA를 쓰기 이전에, MPI 런처 자체가 EFA에 발이 묶이지 않도록 하는 설정이라고 이해하면 된다.

### EFA를 타고 있는지 확인

로그에서 다음과 같은 줄이 보이면 NCCL 통신이 **EFA를 정상적으로 타고 있는 것**이다. (aws-ofi-nccl 버전에 따라 문구가 조금씩 다르다.)

```
NCCL INFO NET/OFI Selected provider is efa, fabric is efa (found 1 nics)
NCCL INFO ncclCommInitRankConfig comm ... - Init COMPLETE
NCCL INFO Channel 00/0 : 0[0] -> 1[0] [send] via NET/Libfabric/0
```

`fabric is efa`(SRD)로 잡히는 게 정상이다. 만약 `efa-direct`로 잡히거나 `NET/Socket`이 보인다면 EFA 경로를 제대로 못 타는 것이니 위 환경변수/플래그를 다시 점검하자.

p4d라면 토폴로지 파일까지 자동으로 잡아준다.

```
NCCL INFO NET/OFI Running on P4d platform, Setting NCCL_TOPO_FILE ... p4d-24xl-topo.xml
```

### EFA 켜기 전 vs 후 비교

EFA의 효과를 체감하려면 비교가 필요하다. 같은 테스트를 **EFA를 끈 채(TCP로 강제)** 돌려보자. NCCL에서 EFA를 제대로 끄려면 `FI_PROVIDER=tcp`만으로는 부족하다(aws-ofi-nccl 플러그인이 여전히 EFA를 잡는다). **플러그인 자체를 꺼서** NCCL 내장 소켓(TCP) 전송으로 떨어뜨려야 한다.

```bash
# EFA 켜기: -x FI_PROVIDER=efa (위 명령 그대로)
# EFA 끄기: 플러그인을 비활성화해 NCCL 내장 Socket(TCP) 전송 사용
-x NCCL_NET_PLUGIN=none -x NCCL_NET=Socket -x NCCL_SOCKET_IFNAME=enp39s0
```

로그에서 EFA는 `NET/OFI Selected provider is efa`, TCP는 `NET/Socket : Using [0]enp39s0` 로 확인된다.

실제로 측정해봤다. **`g6.12xlarge` 2대, 노드당 GPU 1개**(=모든 all-reduce 트래픽이 노드 간을 건너가는 구성)에서 `all_reduce_perf`의 busbw(GB/s)를 비교한 결과다.

| 메시지 크기 | EFA busbw (GB/s) | TCP busbw (GB/s) | EFA 우위 |
|---|---|---|---|
| 1 MB | 2.37 | 0.77 | ~3.1× |
| 8 MB | 4.47 | 1.25 | ~3.6× |
| 64 MB | 4.71 | 1.45 | ~3.2× |
| 256 MB | **4.76** | 1.03 | ~4.6× |

메시지가 커질수록 EFA가 TCP를 **3~4배 이상** 앞선다. TCP는 큰 메시지에서 오히려 대역폭이 출렁이며 떨어지는데(재전송·혼잡), EFA는 SRD의 multipath와 OS bypass 덕에 안정적으로 높은 대역폭을 유지한다. "노드 간 통신이 병목이던 분산 학습이 EFA로 빨라지는" 지점이 바로 이것이다.

> **주의 — GPU를 노드당 여러 개 쓰면 결과가 달라진다.** 같은 인스턴스에서 노드당 4 GPU(총 8 GPU)로 돌렸더니 EFA·TCP 둘 다 busbw가 ~4.2 GB/s로 비슷하게 나왔다. `g6`의 L4 GPU는 노드 내에서 **NVLink 없이 PCIe로 연결**되어, 8 GPU all-reduce에서는 노드 내 PCIe가 병목이 되어 노드 간 네트워크 차이가 묻히기 때문이다. EFA 네트워크의 효과를 또렷이 보려면 위처럼 **노드 간 통신이 지배적인 구성**(노드당 GPU 1개)이거나, NVLink가 있어 노드 내가 빠른 `p4d`/`p5` 같은 인스턴스가 필요하다.

> 위 수치는 us-west-2의 `g6.12xlarge`(EFA v2, 단일 EFA 네트워크 카드)에서 측정했다. 절대값은 인스턴스 타입·네트워크 카드 수·GPU 수에 따라 크게 달라지므로 경향에 주목하자.

## 6. HPC/MPI 테스트 (OSU 벤치마크 실측)

GPU/NCCL이 아니라 CPU 기반 HPC라면 설치·검증 흐름은 거의 동일하고, 벤치마크 도구만 바뀐다.

- 설치: 동일한 EFA Installer (OpenMPI 포함)
- 벤치마크: `nccl-tests` 대신 **OSU Micro-Benchmarks**(`osu_latency`, `osu_bw`)를 `mpirun`으로 실행 — [AWS의 EFA+MPI 가이드](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start.html) 참고
- 실행: NCCL 때와 달리 **MPI 자체가 워크로드**이므로 MPI 전송 계층을 직접 지정한다. EFA는 `--mca pml cm --mca mtl ofi -x FI_PROVIDER=efa`, TCP는 `--mca pml ob1 --mca btl tcp,self --mca btl_tcp_if_include <iface>`.

```bash
# 예: EFA로 osu_latency (노드당 1 프로세스, 2노드)
/opt/amazon/openmpi/bin/mpirun -np 2 -N 1 --host <A>,<B> \
  --mca pml cm --mca mtl ofi -x FI_PROVIDER=efa \
  -x LD_LIBRARY_PATH=/opt/amazon/efa/lib:/opt/amazon/openmpi/lib64 \
  osu-micro-benchmarks-7.5/c/mpi/pt2pt/standard/osu_latency
```

실제로 `c5n.9xlarge` 2대(EFA v1, 정격 50 Gbps, us-east-1)에서 EFA와 TCP로 측정한 결과다.

**지연 시간 (`osu_latency`, μs — 낮을수록 좋음)**

| 메시지 크기 | EFA | TCP |
|---|---|---|
| 1 B | **20.9** | 27.3 |
| 1 KB | **22.4** | 29.2 |
| 64 KB | **43.3** | 158.1 |
| 1 MB | **417.5** | 728.7 |

**대역폭 (`osu_bw`, MB/s — 높을수록 좋음)**

| 메시지 크기 | EFA | TCP |
|---|---|---|
| 1 KB | 639.8 | 371.4 |
| 64 KB | **6,165** | 1,189 |
| 1 MB | **6,131** | 1,191 |
| 최대(peak) | **~6,725** | ~1,238 |

대역폭 차이가 특히 또렷하다. EFA는 큰 메시지에서 **~6,700 MB/s(≈54 Gbps)** 까지 올라가 인스턴스 정격(50 Gbps)을 거의 채우는 반면, TCP는 **~1,190 MB/s(≈9.5 Gbps)** 에서 정체한다. 약 **5배** 차이다. (`osu_bw`는 여러 메시지를 연속으로 흘려보내 링크를 포화시키므로, 4번의 단일 왕복 `fi_pingpong`보다 높은 대역폭이 나온다.)

즉 "EFA 설치 → `fi_info` 확인 → 멀티노드 벤치마크"라는 큰 틀은 NCCL이든 MPI든 같고, EFA의 이점도 MPI 워크로드에서 그대로 확인된다.

> 위 수치는 `c5n.9xlarge`(EFA v1, GPU 없음) 2노드에서 측정했다. 인스턴스 타입·세대에 따라 절대값은 달라진다.

## 7. 자주 막히는 곳 (트러블슈팅)

테스트를 진행하다 보면 거의 항상 마주치는 내용들이다.

- **`fi_info -p efa`에 아무것도 안 뜬다**
  → EFA 인터페이스가 안 붙은 경우. 인스턴스를 `InterfaceType=efa`로 띄웠는지, EFA Installer를 깔고 재부팅했는지 확인한다.
- **노드 간 통신이 안 되거나 hang 걸린다**
  → **보안그룹 egress가 self-referencing이 아니다.** `ping`·SSH·TCP는 되는데 EFA 데이터만 멈춘다면 거의 확실하다. 기본 `0.0.0.0/0` egress로는 EFA(SRD) 트래픽이 안 나간다 — 보안그룹 자기 자신을 destination으로 하는 all-traffic egress 규칙을 추가하자. 인바운드 self-ref도 함께 확인.
- **`mpirun`이 nonzero exit / 연결 실패**
  → passwordless SSH가 안 된 경우가 많다. 마스터→워커 `ssh`가 비밀번호 없이 되는지 확인한다.
- **NCCL 로그에 `Selected Provider is efa`가 안 보이고 Socket이라고 뜬다**
  → libfabric/플러그인 경로(`LD_LIBRARY_PATH`)가 빠졌거나 `FI_PROVIDER`가 설정 안 된 경우. mpirun의 `-x` 옵션을 점검한다.
- **AZ를 넘어 통신하려 한다**
  → EFA 트래픽은 AZ/VPC를 못 넘는다. 모든 노드가 같은 서브넷·같은 placement group에 있는지 확인한다.

## 8. 마무리 + 다음 편

여기까지 따라왔다면, EFA를 켠 2대의 노드가 SRD 위에서 실제로 통신하고, NCCL all-reduce가 EFA를 타는 것을 직접 확인할 수 있다. 지난 글에서 개념으로만 봤던 `fi_info`, `mpirun`, `FI_PROVIDER=efa`가 어떻게 실제로 동작하는지 알 수 있었다.

### 정리 (cleanup)

- GPU 인스턴스(특히 p4d/p5 계열)는 켜둔 만큼 과금되니 **테스트가 끝나면 반드시 인스턴스를 terminate** 하자. 인스턴스별 요금은 [Amazon EC2 온디맨드 요금](https://aws.amazon.com/ec2/pricing/on-demand/) 페이지에서 확인할 수 있다.
- placement group, 보안그룹 등 부수 리소스도 함께 정리한다.
- 잠깐 테스트 하는 검증 용도라면 [Spot 인스턴스](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)도 선택지가 될 수 있다.

```bash
# 인스턴스 종료
aws ec2 terminate-instances --instance-ids i-xxxx i-yyyy
# placement group 삭제
aws ec2 delete-placement-group --group-name efa-cluster
```

### 다음 포스트 예고

이번 글에서 노드들이 빠르게 "대화"하는 건 확인했다. 그런데 분산 학습에는 또 하나의 큰 질문이 남는다. **"그 많은 노드가 학습 데이터와 체크포인트를 어디서 같이 읽고 쓰지?"** 다음 편에서는 고성능 공유 스토리지 — **FSx for Lustre / EFS / S3(Mountpoint)** 편으로 시리즈를 이어가 보려고 한다.

## 부록: 용어 사전

이 글에 나온 생소할 수 있는 용어들을 정리했다. 

### 네트워크 / EFA 관련

- **EFA (Elastic Fabric Adapter)**: EC2 인스턴스에 붙이는 특수 네트워크 장치. 운영체제 커널을 우회(OS bypass)해 노드 간 통신을 가속한다. HPC·분산 학습용. [AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html)
- **ENA (Elastic Network Adapter)**: EC2의 일반 고성능 네트워크 어댑터. 우리가 평소 쓰는 IP 통신(TCP/IP)을 담당한다. EFA는 이 ENA 위에 RDMA 기능을 얹은 형태다. [AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking-ena.html)
- **RDMA (Remote Direct Memory Access)**: 한 노드가 상대 노드의 메모리에 **CPU·OS를 거치지 않고 직접** 데이터를 읽고 쓰는 기술. 복사와 커널 처리를 생략해 지연이 매우 낮다.
- **OS bypass (커널 우회)**: 데이터를 보낼 때 운영체제 커널의 네트워크 스택(TCP/IP 처리)을 건너뛰고 애플리케이션이 네트워크 장치와 직접 통신하는 방식. EFA의 핵심 원리.
- **SRD (Scalable Reliable Datagram)**: AWS가 EFA용으로 만든 전송 프로토콜. 패킷을 **여러 경로로 분산(multipath)** 시키고 순서가 바뀌어 도착해도 재조립한다. 대규모 클라우드 네트워크에 최적화돼 있다. [AWS 논문](https://www.amazon.science/publications/a-cloud-optimized-transport-protocol-for-elastic-and-scalable-hpc)
- **libfabric**: 다양한 네트워크 하드웨어(EFA, InfiniBand 등)를 **공통 API**로 다루게 해주는 라이브러리. MPI·NCCL이 EFA와 대화할 때 이 libfabric을 거친다. [공식 사이트](https://ofiwg.github.io/libfabric/)
- **provider / fabric**: libfabric에서 "어떤 네트워크 백엔드를 쓸지" 지정하는 단위. `provider=efa`가 EFA를 의미하고, 그 안에 `efa`(SRD)와 `efa-direct` 두 fabric이 있다(본문 `-f efa` 주의 참고).
- **latency(지연) / bandwidth(대역폭)**: latency는 "한 번 주고받는 데 걸리는 시간"(μs, 작을수록 좋음), bandwidth는 "초당 옮기는 데이터 양"(MB/s·Gbps, 클수록 좋음).
- **jitter(지터)**: 지연 시간이 들쭉날쭉한 정도. 작을수록 통신이 안정적이다.

### EC2 / 인프라 관련

- **AZ (Availability Zone, 가용 영역)**: 한 리전 안의 물리적으로 분리된 데이터센터 묶음. EFA 트래픽은 같은 AZ 안에서만 통한다.
- **Placement Group (cluster 전략)**: 인스턴스들을 물리적으로 가까이 배치해달라고 AWS에 요청하는 기능. cluster 전략은 노드 간 지연을 최소화해 HPC·EFA에 적합하다. [AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html)
- **Security Group (보안그룹)**: 인스턴스의 가상 방화벽. 인바운드/아웃바운드 트래픽을 규칙으로 제어한다. EFA는 **자기 자신을 참조(self-referencing)** 하는 규칙이 인바운드·아웃바운드 모두 필요하다. [AWS 문서](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
- **DLAMI (Deep Learning AMI)**: GPU 드라이버·CUDA·NCCL·EFA 스택이 미리 설치된 EC2 이미지. 설치 단계를 크게 줄여준다. [AWS 문서](https://docs.aws.amazon.com/dlami/latest/devguide/what-is-dlami.html)
- **Spot 인스턴스**: 남는 여유 용량을 활용하는 EC2 구매 방식. 중간에 회수될 수 있어 테스트·내결함성 워크로드에 적합하다. [AWS 문서](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)
- **InterfaceType=efa**: 인스턴스 기동 시 네트워크 인터페이스를 EFA로 만들라는 설정. 이 한 줄이 EFA 활성화의 핵심이다.

### GPU / 분산 학습 관련

- **NCCL (NVIDIA Collective Communications Library)**: 여러 GPU·여러 노드 간의 집합 통신(all-reduce 등)을 빠르게 처리하는 NVIDIA 라이브러리. 분산 학습의 핵심. [NVIDIA 문서](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/index.html)
- **aws-ofi-nccl**: NCCL이 libfabric(=EFA)을 통해 통신하도록 연결해주는 플러그인. 이게 있어야 NCCL이 EFA를 탄다. [GitHub](https://github.com/aws/aws-ofi-nccl)
- **MPI / OpenMPI**: HPC에서 프로세스 간 통신의 표준(MPI)과 그 대표 구현체(OpenMPI). `mpirun`으로 여러 노드에 프로세스를 띄운다. [OpenMPI](https://www.open-mpi.org/)
- **all-reduce**: 모든 GPU가 가진 값(예: gradient)을 합쳐서 그 결과를 다시 모든 GPU에 나눠주는 연산. 분산 학습에서 매 스텝마다 일어나는 가장 흔한 통신 패턴. [NCCL 문서](https://docs.nvidia.com/deeplearning/nccl/archives/nccl_2234/user-guide/docs/usage/collectives.html)
- **gradient(그래디언트)**: 모델 학습에서 가중치를 얼마나 조정할지 알려주는 값. 분산 학습에서는 각 GPU가 계산한 gradient를 all-reduce로 합친다.
- **busbw / algbw**: `nccl-tests`가 출력하는 두 대역폭 지표. algbw(algorithm bandwidth)는 단순히 데이터량÷시간, busbw(bus bandwidth)는 하드웨어 실효 대역폭과 비교하기 좋게 보정한 값. 보통 **busbw로 성능을 비교**한다. [nccl-tests 설명](https://github.com/NVIDIA/nccl-tests/blob/master/doc/PERFORMANCE.md)
- **GPUDirect RDMA**: GPU 메모리에서 네트워크 장치로 **CPU를 거치지 않고 직접** 데이터를 보내는 기술. p4d/p5에서 EFA와 결합해 최고 성능을 낸다. [NVIDIA 문서](https://docs.nvidia.com/cuda/gpudirect-rdma/index.html)
- **NVLink**: 한 노드 안에서 GPU끼리 직접 연결하는 고속 인터커넥트. NVLink가 있으면 노드 내 통신이 매우 빠르다(p4d/p5는 있고, g6는 없어 PCIe 사용). [NVIDIA](https://www.nvidia.com/en-us/data-center/nvlink/)
- **PCIe**: 일반적인 장치 연결 버스. NVLink가 없는 GPU(예: L4)는 노드 내 GPU 간 통신에 PCIe를 쓰며, NVLink보다 느리다.

### 도구 / 명령

- **fi_info**: libfabric provider(여기선 EFA)가 시스템에 제대로 인식됐는지 확인하는 명령. EFA 설치 검증의 첫 단계.
- **fi_pingpong**: 두 노드 간 latency·대역폭을 재는 libfabric 기본 벤치마크. NCCL을 돌리기 전 네트워크 자체를 확인할 때 쓴다.
- **nccl-tests / all_reduce_perf**: NCCL 성능·정확성을 측정하는 공식 테스트 모음과 그중 all-reduce 측정 도구. [GitHub](https://github.com/NVIDIA/nccl-tests)
- **FI_PROVIDER / FI_EFA_* / NCCL_* 환경변수**: libfabric·NCCL의 동작을 제어하는 환경변수들. 본문에서 `FI_PROVIDER=efa`(EFA 선택), `NCCL_DEBUG=INFO`(통신 경로 로그), `NCCL_NET_PLUGIN=none`(EFA 끄고 TCP로) 등을 사용했다.

## 참고 문서

- [Get started with EFA and NCCL for ML workloads](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start-nccl.html) — 본문 명령어의 1차 출처(설치, fi_info, mpirun, 환경변수)
- [Get started with EFA and MPI for HPC workloads](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa-start.html) — MPI/OSU 벤치마크 셋업
- [Elastic Fabric Adapter for AI/ML and HPC workloads on Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html) — 지원 인스턴스, 제약사항(AZ/VPC, 네트워크 카드)
- [Using EFA on the DLAMI](https://docs.aws.amazon.com/dlami/latest/devguide/tutorial-efa-using.html) — Deep Learning AMI 사용
- [NVIDIA nccl-tests](https://github.com/NVIDIA/nccl-tests) — all_reduce_perf 등 테스트 인자 설명

> 본문의 명령어와 경로는 위 AWS 공식 문서(EFA Installer 1.48.0, NCCL v2.23.4 기준)를 토대로 작성했다. 버전에 따라 일부 경로/옵션이 달라질 수 있다. (작성/검증 시점: 2026-06)
