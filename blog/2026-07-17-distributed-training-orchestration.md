---
layout: single
title: "분산 학습 클러스터 — HyperPod vs ParallelCluster vs EKS"
comments: true
classes: wide
description: "EFA와 FSx로 준비한 노드들을 하나의 멀티노드 학습 클러스터로 묶는 오케스트레이션 방식을 비교"
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: aws/distributed-training-orchestration
date: 2026-07-14
categories:
  - AWS
tags:
  - AWS
  - distributed-training
  - SageMaker HyperPod
  - ParallelCluster
  - EKS
  - Slurm
  - EFA
  - FSx for Lustre
---

> 해당 포스팅은 현재 재직중인 회사에 관련이 없고, 개인 역량 개발을 위한 스터디 자료로 활용할 예정입니다.

시리즈의 마지막 편이다. 지금까지 분산 학습의 내용들을 정리해봤다.

- [1편·2편](https://ddii.dev/aws/efa-hands-on/): 네트워크(EFA)로 노드 간 통신을 빠르게
- [3편](https://ddii.dev/aws/distributed-training-storage/): 스토리지(FSx/EFS/S3)로 데이터·체크포인트 공급
- [4편](https://ddii.dev/aws/distributed-training-bottlenecks/): 관측으로 병목 찾기

그런데 마지막 질문이 남는다.

**"이 많은 노드를 어떻게 하나의 학습 잡으로 묶어서 돌리지?"**

노드 수십 대에 일일이 SSH로 들어가 EFA를 켜고 FSx를 마운트하고 `mpirun`을 칠 수는 없다. 프로비저닝·스케줄링·장애 복구를 대신 해주는 **오케스트레이션 계층**이 필요하다. 이 글에서는 AWS의 세 가지 방식을 비교한다.

<!--truncate-->

## 오케스트레이션이 대신 풀어주는 문제

멀티노드 학습을 직접 손으로 돌릴 때 마주치는 일들이다.

- **노드 프로비저닝** — 같은 서브넷·플레이스먼트 그룹에 GPU 인스턴스 N대를 한 번에 띄우기
- **EFA·FSx 연결** — 모든 노드에 드라이버 설치, FSx 마운트, 패스워드리스 SSH 구성
- **스케줄링** — 잡 큐, 자원 할당, 멀티노드 런처(Slurm `srun`, `torchrun`)
- **장애 복구** — 노드 한 대에 장애가 나면 감지하고 교체한 뒤 체크포인트에서 재개

오케스트레이션 도구는 이걸 자동화한다. 차이는 **얼마나 관리해주느냐**와 **어떤 생태계(Slurm/Kubernetes)를 쓰느냐**다.

## 세 가지 방식

### AWS ParallelCluster

HPC 전통의 Slurm 기반 클러스터를 IaC로 띄우는 도구.

- Slurm 스케줄러, 헤드 노드 + 컴퓨트 큐 구조
- 설정 파일(YAML) 하나로 EFA·FSx·플레이스먼트 그룹을 선언적으로 구성
- HPC/연구자에게 익숙한 `sbatch`/`srun` 워크플로
- 노드 복구는 가능하지만, 자동화 수준은 직접 구성하는 영역이 있다

### SageMaker HyperPod

대규모 학습 전용 관리형 클러스터.

- **자동 헬스 체크·노드 교체** — 장애 난 노드를 감지해 교체하고 마지막 체크포인트에서 재개(장기 학습의 핵심)
- Slurm 또는 EKS(Kubernetes) 백엔드 선택
- EFA·FSx 통합이 기본 제공
- 관리 부담이 가장 낮은 대신, 추상화된 만큼 세밀한 제어는 줄어든다

### EKS (Kubernetes)

쿠버네티스 위에서 학습을 돌리는 방식.

- EFA device plugin + FSx CSI driver로 EFA·스토리지를 파드에 연결
- Kubeflow Training Operator / Volcano / JobSet 등으로 갱(gang) 스케줄링
- 이미 k8s 플랫폼을 쓰는 조직에 자연스럽고, 추론·서빙과 한 클러스터에서 통합 가능
- 학습 곡선이 가장 가파르다

## 비교 한눈에

| 축 | ParallelCluster | HyperPod | EKS |
|---|---|---|---|
| 스케줄러 | Slurm | Slurm 또는 EKS | Kubernetes |
| 관리 부담 | 중 | 낮음(관리형) | 높음 |
| 자동 노드 복구 | 직접 구성 | 기본 제공 | 오퍼레이터로 구성 |
| EFA·FSx 통합 | 설정으로 선언 | 기본 제공 | device plugin·CSI |
| 익숙한 대상 | HPC·연구 | 대규모 LLM 학습 | k8s 플랫폼 팀 |
| 학습 곡선 | 중 | 낮음 | 높음 |

> 발행 전 — 각 항목을 공식 문서로 재확인하고 최신 기능 반영

## EFA + FSx를 클러스터에 붙이기

1~3편에서 손으로 한 것들이 오케스트레이션에선 선언/자동으로 바뀐다.

- **ParallelCluster**: 클러스터 설정 YAML에 `Efa: Enabled: true`와 FSx 파일시스템을 명시하면 컴퓨트 노드에 자동 적용
- **HyperPod**: 클러스터 생성 시 EFA·FSx가 통합되고, 라이프사이클 스크립트로 마운트·드라이버를 구성
- **EKS**: EFA device plugin으로 파드에 EFA 디바이스를 노출, FSx for Lustre CSI driver로 PVC 마운트

### 직접 해본 검증 — ParallelCluster 소규모 구성

ParallelCluster로 작은 클러스터를 띄워 위 통합이 실제로 자동으로 되는지 확인했다.

- 구성: 헤드 `t3.medium`(퍼블릭 서브넷) + 컴퓨트 큐 `c5n.9xlarge`(EFA 지원 타입) 최대 2대, FSx for Lustre(SCRATCH_2, 1.2 TiB)를 `/shared`에 연결
- 보안: **컴퓨트 노드는 프라이빗 서브넷에 두고 퍼블릭 IP를 주지 않았다.** 부트스트랩에 필요한 아웃바운드(SSM·S3)는 NAT 게이트웨이로만 나가게 했다. 클러스터 설정 YAML에 `Efa: Enabled: true`, FSx, 서브넷만 선언하면 나머지는 PC가 처리한다.
- 컴퓨트는 `MinCount: 0`으로 둬서 잡을 제출할 때만 동적으로 떴다(유휴 비용 절감).

클러스터 설정(요지)은 이렇다. 서브넷 ID는 환경마다 다르니 자리표시자로 둔다.

```yaml
Region: us-east-1
Image:
  Os: alinux2023
HeadNode:
  InstanceType: t3.medium
  Networking:
    SubnetId: subnet-PUBLIC        # 퍼블릭 서브넷(헤드, SSM 접근)
  Iam:
    AdditionalIamPolicies:
      - Policy: arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
Scheduling:
  Scheduler: slurm
  SlurmQueues:
    - Name: compute
      ComputeResources:
        - Name: c5n9xl
          InstanceType: c5n.9xlarge   # EFA 지원 타입
          MinCount: 0                 # 잡 제출 시에만 노드 생성
          MaxCount: 2
          Efa:
            Enabled: true             # EFA 활성화
      Networking:
        SubnetIds:
          - subnet-PRIVATE            # 프라이빗 서브넷
        AssignPublicIp: false         # 퍼블릭 IP 미할당(아웃바운드는 NAT)
        PlacementGroup:
          Enabled: true               # 클러스터 배치 그룹
      Iam:
        AdditionalIamPolicies:
          - Policy: arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
SharedStorage:
  - MountDir: /shared
    Name: fsx
    StorageType: FsxLustre
    FsxLustreSettings:
      StorageCapacity: 1200
      DeploymentType: SCRATCH_2
```

이 YAML 하나에 네트워크(EFA·서브넷·배치 그룹)와 스토리지(FSx)가 선언돼 있고, `pcluster create-cluster`가 나머지를 만든다.

CLI 흐름은 이렇다. ParallelCluster CLI는 pip로 설치하며 Node.js가 필요하다(설치 시점 기준 Python 3.12에서 동작 확인, 너무 최신 버전은 호환 문제가 있을 수 있다).

```bash
# 설치 (pipx 권장 — 격리 설치)
pipx install aws-parallelcluster

# 클러스터 생성 (CloudFormation 스택 생성, 비동기)
pcluster create-cluster \
  --cluster-name stor-pc \
  --cluster-configuration cluster.yaml

# 상태 확인 (CREATE_IN_PROGRESS → CREATE_COMPLETE)
pcluster describe-cluster --cluster-name stor-pc --query clusterStatus

# 헤드 노드 접속 — 키페어 없이 SSM Session Manager로
#   (HeadNode 인스턴스 ID를 태그로 찾아 start-session)
aws ssm start-session --target <headnode-instance-id>

# 헤드 노드에서 Slurm으로 잡 제출/확인
sbatch myjob.sh        # 2노드 잡 제출
squeue                 # 큐 상태
sinfo                  # 파티션/노드 상태

# 정리 — 클러스터(헤드·컴퓨트·FSx·IAM·SG) 일괄 삭제
pcluster delete-cluster --cluster-name stor-pc
```

> 키페어를 지정하지 않았으므로 `pcluster ssh` 대신 **SSM Session Manager**로 헤드에 접속한다. 컴퓨트 노드도 SSM이 붙어 있어 SSH 포트를 외부에 열 필요가 없다.

Slurm으로 2노드 잡을 제출해, 각 노드에서 EFA 인식·FSx 마운트와 노드 간 MPI 실행을 확인했다.

```bash
# 2노드 잡 안에서: 각 노드의 EFA·FSx 확인 + 2노드 MPI
srun bash -c 'echo "$(hostname) EFA: $(fi_info -p efa | grep -m1 provider)"; \
              echo "$(hostname) /shared: $(df -h /shared | tail -1)"'
mpirun -N 1 hostname
```

결과:

```
compute-dy-c5n9xl-1 EFA: provider: efa
compute-dy-c5n9xl-2 EFA: provider: efa
compute-dy-c5n9xl-1 /shared: 172.31.x@tcp:/xxxx  lustre  1.1T  /shared
compute-dy-c5n9xl-2 /shared: 172.31.x@tcp:/xxxx  lustre  1.1T  /shared
compute-dy-c5n9xl-1
compute-dy-c5n9xl-2
```

EFA가 실제로 성능을 내는지도 OSU Micro-Benchmarks로 2노드 간 측정했다(`/shared`에 빌드해 양 노드가 공유). EFA를 강제로 끄고(TCP) 같은 테스트를 돌려 비교했다.

```bash
# EFA (기본 경로)
FI_PROVIDER=efa mpirun -n 2 -N 1 osu_bw          # 대역폭
FI_PROVIDER=efa mpirun -n 2 -N 1 osu_latency     # 지연
# TCP 비교 (EFA 우회)
mpirun -n 2 -N 1 --mca pml ob1 --mca btl tcp,self osu_bw
```

| 지표 | EFA | TCP(강제) |
|---|---|---|
| osu_latency (1B, 점대점) | 약 20.7 µs | — |
| osu_bw (1~4 MB) | 약 6,130 MB/s | 약 1,190 MB/s |

순차 대역폭에서 **EFA가 TCP의 약 5배**(6,130 vs 1,190 MB/s)였고, c5n.9xlarge의 50 Gbps NIC를 거의 포화시켰다. 2노드 `osu_allreduce`는 32 KB에서 약 88 µs, 1 MB에서 약 600 µs였다. 즉 오케스트레이션으로 자동 구성된 클러스터가 [2편](https://ddii.dev/aws/efa-hands-on/)에서 손으로 맞췄던 EFA 성능을 그대로 낸다.

손으로 한 게 거의 없다는 점이 핵심이다. [2편](https://ddii.dev/aws/efa-hands-on/)에서 직접 깔던 EFA 스택, [3편](https://ddii.dev/aws/distributed-training-storage/)에서 손으로 마운트하던 FSx가 **모든 컴퓨트 노드에 자동으로 구성**됐고, `srun`/`mpirun` 한 줄로 노드 간 통신과 공유 스토리지가 동작했다. 컴퓨트가 동적으로 떴다가 잡이 끝나면 스스로 내려가는 것도 확인했다.

> **보안 메모 — SSH 포트 점검.** ParallelCluster는 기본적으로 헤드 노드 보안그룹에 SSH(22)를 `0.0.0.0/0`으로 열어 둔다. 이번엔 접속을 모두 SSM으로 했기 때문에 이 규칙을 제거했다(인바운드가 자기참조 규칙만 남음). SSM Session Manager를 쓰면 22를 외부에 열 필요가 없다. 키 기반 SSH가 필요하면 최소한 접속 IP를 특정 CIDR로 제한하는 게 좋다.

> 한 가지 막혔던 점: 컴퓨트를 퍼블릭 IP 없이 띄우면 부트스트랩 중 SSM·S3에 닿지 못해 노드가 등록되지 않는다. 프라이빗 서브넷이라면 **NAT 게이트웨이(또는 VPC 엔드포인트)** 로 아웃바운드 경로를 반드시 열어줘야 한다.

## 복원력 — 노드에 장애가 나도 학습은 계속

수백 노드·수일 학습에서는 노드 장애가 "예외"가 아니라 "전제"다. 그래서 오케스트레이션의 진짜 가치는 복구에 있다.

- 주기적 **체크포인트**(3편의 스토리지 선택과 직결 — 쓰기 처리량·내구성)
- 노드 장애 **감지 → 교체 → 재스케줄 → 체크포인트에서 재개**
- HyperPod는 이 루프를 관리형으로, ParallelCluster/EKS는 구성으로 달성

### 직접 해본 검증 — 노드를 강제 종료해 봤다

2노드 잡(`srun sleep`, `--requeue`)이 도는 중에 컴퓨트 노드 한 대의 EC2 인스턴스를 강제 종료(`terminate-instances`)해 장애를 흉내 냈다. ParallelCluster의 `clustermgtd`가 약 1분 안에 반응했다.

```
15:36:26  clustermgtd: Found the following unhealthy dynamic nodes: ['compute-dy-c5n9xl-2(172.31.108.99)']
15:36:26  clustermgtd: Setting unhealthy dynamic nodes to down and power_down.
# 직후
squeue: JOB 2  ST=PD  (BeginTime)   <- 돌던 잡이 실패로 끝나지 않고 재큐됨
sinfo:  compute-dy-c5n9xl-2  idle%   <- 실패 노드 슬롯 리셋(다음 실행 때 새 인스턴스로 교체)
```

핵심은 세 가지다. ① 헬스 체크가 장애 난 인스턴스를 **자동 감지**했고, ② `--requeue` 덕에 돌던 잡이 **조용히 실패하지 않고 다시 큐로 돌아갔으며**, ③ 실패한 노드 슬롯이 정리돼 다음 실행 때 **새 인스턴스로 교체**된다. 체크포인트가 있었다면 학습은 마지막 지점에서 이어진다. 이게 수일짜리 학습을 노드 장애로부터 지켜주는 메커니즘이다.

> 참고: ParallelCluster는 이 복구를 직접 구성(헬스 체크 + 재큐)으로 달성한다. SageMaker HyperPod는 같은 일을 관리형으로 더 적극적으로(자동 노드 교체) 해준다.

### 직접 해본 검증 — HyperPod 관리형 동작

비교를 위해 HyperPod로도 최소 클러스터(워커 2 × `ml.c5.xlarge`, `NodeRecovery: Automatic`)를 띄워봤다.

**프로비저닝 절차.** ParallelCluster가 YAML 하나였다면, HyperPod는 ① IAM 실행역할, ② 노드 부팅 시 실행할 **라이프사이클 스크립트 묶음**(S3), ③ 어느 그룹이 컨트롤러/워커인지 적는 `provisioning_parameters.json`, ④ 인스턴스 그룹 정의가 필요하다. 라이프사이클 스크립트는 AWS가 공개한 [awsome-distributed-ai](https://github.com/awslabs/awsome-distributed-ai)의 `base-config`(Slurm·Enroot/Pyxis 설치, FSx 마운트 등)를 그대로 썼다.

```json
// provisioning_parameters.json — Slurm 노드 레이아웃
{
  "version": "1.0.0",
  "workload_manager": "slurm",
  "controller_group": "controller-machine",
  "worker_groups": [ { "instance_group_name": "worker-group-1", "partition_name": "dev" } ]
}
```

```bash
# base-config + provisioning_parameters.json 을 S3에 업로드
aws s3 cp base-config s3://<bucket>/src --recursive
# 인스턴스 그룹: 컨트롤러 1 + 워커 1 (ml.c5.xlarge), 각 그룹의 OnCreate=on_create.sh
aws sagemaker create-cluster --cluster-name hp-slurm \
  --instance-groups file://groups.json --node-recovery Automatic
```

**중간에 한 번 깨졌다.** 첫 생성이 `RollingBack`으로 실패해서 CloudWatch 라이프사이클 로그를 봤더니 원인이 명확했다.

```
E: Failed to fetch https://fsx-lustre-client-repo.s3.amazonaws.com/.../InRelease  403  Forbidden
... install_ansible.sh ... returned non-zero exit status 100
[SageMaker] The lifecycle scripts failed.
```

베이스 AMI에 박힌 FSx Lustre apt 레포가 403/서명 만료라 `apt-get update`가 멈추고, 그 위에서 도는 라이프사이클이 통째로 실패한 것이다(이 클러스터는 FSx를 안 쓰는데도). `on_create.sh`에서 `lifecycle_script.py`를 부르기 전에 그 깨진 레포를 지우는 한 줄을 넣어 해결했다.

```bash
# on_create.sh 핫픽스 — 깨진 fsx-lustre apt 레포 제거 후 라이프사이클 실행
grep -rl "fsx-lustre-client-repo" /etc/apt/sources.list.d/ | xargs -r sudo rm -f
```

다시 만드니 약 8분 만에 `InService`가 됐다. 키페어·퍼블릭 IP가 없으므로 컨트롤러에는 SSM의 HyperPod 전용 타깃으로 접속해 Slurm을 확인했다.

```bash
aws ssm start-session --target sagemaker-cluster:<cluster-id>_controller-machine-<instance-id>
```

```
$ sinfo
PARTITION AVAIL TIMELIMIT NODES STATE NODELIST
dev*         up   infinite     1  idle ip-172-22-90-124   # 워커가 Slurm 노드로 등록됨
$ srun -N1 hostname
ip-172-22-90-124                                          # 워커에서 잡 실행 확인
```

ParallelCluster와 비교해 두 가지가 달랐다.

- **네트워크가 더 잠겨 있다.** `VpcConfig`를 주지 않으면 노드가 **SageMaker 관리형 VPC**에 뜬다. 내 계정 쪽에는 퍼블릭 IP·SSH·보안그룹 노출이 아예 없었고(앞서 ParallelCluster에서 손봐야 했던 SSH 0.0.0.0/0 같은 게 구조적으로 안 생긴다), 접속도 EC2가 아니라 SSM `sagemaker-cluster:` 타깃으로 한다. 대신 FSx 같은 내 VPC 리소스를 붙이려면 `VpcConfig`를 명시해야 한다.
- **노드 관리가 관리형이다.** 노드 제거도 EC2 종료가 아니라 `batch-delete-cluster-nodes`로 하고, 목표 수를 다시 올리면 **HyperPod가 새 노드를 약 2.5분 만에 자동 투입**해 desired count를 유지했다. 하드웨어 헬스 장애 시 `NodeRecovery: Automatic`이 같은 일을 한다([문서](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod.html)).

정리하면, **HyperPod는 ParallelCluster가 직접 구성하던 것(클러스터 소프트웨어 설치·네트워크·복구)을 관리형으로 떠안는 대신, 라이프사이클 스크립트라는 진입 비용과 관리형 추상화(직접 EC2 제어 불가)를 받아들이는 트레이드오프**다. (이번엔 진짜 하드웨어 헬스 장애를 강제하진 못했으니, 자동 교체는 `NodeRecovery: Automatic` 설정·문서 기준이고 내가 직접 본 건 목표 수에 맞춘 자동 프로비저닝이다.)

### 직접 해본 검증 — EKS (GPU + EFA + NCCL)

마지막으로 EKS에서 **GPU 멀티노드 NCCL을 EFA로** 돌려봤다. `eksctl`로 GPU·EFA 노드그룹을 선언하면 device plugin까지 자동 설치된다.

```yaml
# eksctl ClusterConfig (요지)
managedNodeGroups:
  - name: gpu-efa
    instanceType: g5.8xlarge      # A10G GPU 1개 + EFA 지원
    desiredCapacity: 2
    efaEnabled: true              # EFA device plugin 자동 설치 + placement group
    privateNetworking: true       # 노드는 프라이빗 서브넷(퍼블릭 IP 없음)
```

```bash
eksctl create cluster -f cluster.yaml     # 컨트롤플레인 + GPU/EFA 노드그룹 (~20분)
kubectl get nodes
```

GPU(`nvidia-device-plugin`)와 EFA(`aws-efa-k8s-device-plugin`) DaemonSet이 자동으로 떴고, 각 노드가 자원을 광고했다.

```
$ kubectl get nodes -o custom-columns=NODE:.metadata.name,GPU:...nvidia\.com/gpu,EFA:...vpc\.amazonaws\.com/efa
NODE                              GPU   EFA
ip-192-168-109-161.ec2.internal   1     1
ip-192-168-116-54.ec2.internal    1     1
```

멀티노드 잡은 Kubeflow **MPI Operator**로 돌렸다. `MPIJob`에 워커 2개(각 `nvidia.com/gpu: 1`, `vpc.amazonaws.com/efa: 1`)를 두고, launcher가 `mpirun`으로 NCCL `all_reduce_perf`를 실행한다.

```bash
kubectl apply -f https://raw.githubusercontent.com/kubeflow/mpi-operator/v0.6.0/deploy/v2beta1/mpi-operator.yaml
kubectl apply -f nccl-mpijob.yaml   # 워커 2 × (GPU1+EFA1), launcher가 all_reduce_perf 실행
```

**두 군데서 막혔다.** ① `mpirun`이 SSH로 워커에서 실행할 때 `LD_LIBRARY_PATH`가 전파 안 돼 `libnccl.so.2`를 못 찾았다 → `-x LD_LIBRARY_PATH`로 NCCL·EFA 라이브러리 경로를 명시. ② `FI_EFA_USE_DEVICE_RDMA=1`을 줬더니 *"EFA device has no rdma-read capability. abort()"* — g5의 EFA는 device RDMA(read)를 지원하지 않는다 → 그 변수를 빼니 EFA(SENDRECV)로 정상 동작.

결과:

```
worker-0/1: NCCL INFO NET/OFI Selected provider is efa, fabric is efa   # EFA 사용 확인
#       size      ...      busbw
   268435456 (256MB)  float  sum  ...  2.99   # 약 3.0 GB/s (2노드 × A10G 1개)
```

NCCL이 EFA provider를 선택했고, 256MB all-reduce에서 busbw 약 3.0 GB/s가 나왔다. EKS도 GPU·EFA·갱 스케줄링(MPIJob)을 device plugin과 오퍼레이터로 엮어 분산 학습을 돌릴 수 있음이 확인됐다. 대신 ParallelCluster의 YAML 하나, HyperPod의 관리형 대비 **손이 가장 많이 갔다**(device plugin·MPI Operator·라이브러리 경로·EFA 옵션을 직접 맞춰야 했다). 노드는 프라이빗 서브넷이라 퍼블릭 노출은 없었다.

> **한계 — 이 수치는 EFA의 최대 성능이 아니다.** g5의 EFA는 GPUDirect RDMA(NIC가 GPU 메모리를 직접 읽는 zero-copy 경로)를 지원하지 않아(`FI_EFA_USE_DEVICE_RDMA=1` 설정 시 *"no rdma-read capability"* 로 중단됨), NCCL이 GPU↔호스트 메모리 복사를 거치는 경로로 동작했다. 즉 이번 측정은 **"EFA가 전송 경로로 동작하고 그 위에서 멀티노드 NCCL이 돈다"는 기능 검증**이고, GPUDirect RDMA의 최대 대역폭(수십~수백 GB/s)은 p4d/p5/p3dn급(다중 고대역폭 EFA NIC + device RDMA)이 필요하다. 비용 문제로 본 시리즈에서는 그 경로를 측정하지 않았다.

> **참고 — 이 GPUDirect RDMA 경로가 추론에서 쓰이는 예.** 여기서 측정하지 못한 p5급 GPUDirect RDMA는 학습뿐 아니라 추론에서도 위력을 낸다. AWS의 [Disaggregated Prefill and Decode(DPD) on SageMaker HyperPod](https://aws.amazon.com/blogs/machine-learning/disaggregated-prefill-and-decode-for-llm-inference-on-sagemaker-hyperpod/)는 LLM 추론의 prefill(compute-bound)과 decode(memory-bound)를 **서로 다른 GPU 풀로 분리**하고, 그 사이 KV 캐시를 EFA GPUDirect RDMA로 전송한다(스택: LMCache PD → NIXL → libfabric → EFA). `ml.p5.48xlarge`의 3,200 Gbps EFA에서 Llama 3.3 70B의 8,000토큰 KV 전송이 한 자릿수 ms에 끝난다. 이 글의 EKS에서 다룬 EFA·device plugin·오퍼레이터 구성이 그대로 추론으로 확장되는 셈이고, 위에서 비용상 건너뛴 device RDMA의 실제 성과를 보여준다.

### 한 걸음 더 — NVIDIA GPU Operator

위 EKS 실습에서는 GPU와 EFA device plugin을 `eksctl` 옵션(`efaEnabled`)으로 하나씩 붙였다. 노드가 몇 대일 땐 괜찮지만, GPU 드라이버·컨테이너 툴킷·device plugin·모니터링을 노드마다 버전 맞춰 관리하다 보면 금세 번거로워진다. 이걸 한 번에 묶어주는 것이 **[NVIDIA GPU Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html)** 다.

GPU Operator는 Helm으로 설치하는 쿠버네티스 오퍼레이터로, GPU 노드에 필요한 스택 전체를 **DaemonSet으로 자동 배포·수명관리**한다.

- **NVIDIA 드라이버**(컨테이너화 옵션) + **container toolkit** — 노드에 수동 설치할 필요가 줄어든다
- **device plugin** — GPU를 `nvidia.com/gpu` 자원으로 노출 (위에서 수동으로 한 것)
- **Node Feature Discovery / GPU Feature Discovery** — GPU 종류·MIG 구성을 노드 라벨로 자동 표시
- **DCGM + dcgm-exporter** — [4편](https://ddii.dev/aws/distributed-training-bottlenecks/)에서 단일 노드에 Docker로 띄웠던 그 dcgm-exporter를, GPU Operator는 **모든 GPU 노드에 DaemonSet으로 자동 배포**한다. Prometheus가 `ServiceMonitor`로 전 노드를 수집하면, 4편에서 만든 대시보드가 클러스터 전체 규모로 확장된다.
- **MIG 매니저** — MIG 분할을 선언적으로 관리

즉 4편에서 "멀티노드로 확장하면 dcgm-exporter를 DaemonSet으로 띄운다"고 했던 그 방식의 실체가 GPU Operator다. EFA는 GPU Operator 범위 밖이라 `aws-efa-k8s-device-plugin`(또는 `eksctl efaEnabled`)과 함께 쓴다.

```bash
# GPU Operator 설치 (요지)
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
# EKS 가속 AMI는 드라이버·툴킷·device plugin이 이미 있으므로 그 셋은 끄고,
# DCGM(dcgm-exporter)·NFD·GFD만 오퍼레이터에 맡긴다
helm install gpu-operator nvidia/gpu-operator -n gpu-operator --create-namespace \
  --set driver.enabled=false --set toolkit.enabled=false \
  --set devicePlugin.enabled=false --set dcgmExporter.enabled=true
```

#### 직접 해본 검증 — GPU Operator로 멀티노드 GPU 모니터링

4편에서 단일 노드에 Docker로 띄웠던 dcgm-exporter를, 이번엔 EKS 2노드(`g4dn.xlarge`, T4 각 1개)에 GPU Operator로 올려 **클러스터 전체 지표를 한 대시보드에 모으는 것**까지 확인했다.

- `eksctl`로 GPU 노드그룹 2대를 만들면 EKS 가속 AMI라 NVIDIA 드라이버·device plugin이 이미 붙어 있다(`nvidia.com/gpu: 1`씩 광고).
- GPU Operator를 위 옵션(드라이버·툴킷·device plugin off, DCGM on)으로 설치하니 **dcgm-exporter가 노드마다 1개씩 DaemonSet으로** 떴고, NFD/GFD·validator도 함께 배포됐다.
- 모니터링은 `kube-prometheus-stack`(Prometheus + Grafana)을 Helm으로 올렸다. GPU Operator가 만든 `ServiceMonitor(nvidia-dcgm-exporter)` 덕에 Prometheus가 **두 노드의 dcgm-exporter를 자동으로 수집**했다.

두 노드에 GPU 부하를 걸고 Prometheus에 질의하니 노드별 GPU가 그대로 잡혔다.

```
DCGM_FI_DEV_GPU_UTIL
  ip-192-168-111-244  GPU 0 = 100%  (pod: gpu-burn-...)
  ip-192-168-68-102   GPU 0 = 100%  (pod: gpu-burn-...)
```

주목할 점은 dcgm-exporter가 GPU 지표에 **쿠버네티스 컨텍스트 라벨**(`exported_pod`, `exported_namespace`, `Hostname`, `gpu`, `modelName`)을 붙여준다는 것이다. 덕분에 "어느 노드의 어느 GPU를, 어느 파드가 100% 쓰는지"가 한 쿼리로 나온다 — 멀티테넌트 클러스터에서 특히 강력하다. 스트래글러 탐지도 노드 라벨로 바로 된다.

```promql
# 노드별 평균 SM 활용률 — 유독 낮은 노드가 스트래글러
avg by (Hostname) (DCGM_FI_PROF_SM_ACTIVE)
```

Grafana에는 NVIDIA 공식 **DCGM 대시보드(ID 12239)** 를 임포트하면 노드·GPU 변수로 전환하며 전 클러스터를 한눈에 본다. 4편의 단일 노드 대시보드가 여기서 클러스터 규모로 확장되는 셈이다.

> EFA는 GPU Operator 범위 밖이라, EFA까지 필요하면 `aws-efa-k8s-device-plugin`(또는 `eksctl efaEnabled`)을 병행한다. 이번 모니터링 검증은 지표 수집이 목적이라 EFA 없이 진행했다(앞의 EKS NCCL 검증에서 EFA 경로는 이미 확인).

## 선택 가이드

- HPC·Slurm에 익숙하고 클러스터를 직접 제어하고 싶다 → **ParallelCluster**
- 대규모·장기 학습에서 노드 복구를 관리형으로 맡기고 싶다 → **HyperPod**
- 이미 Kubernetes 플랫폼이 있고 학습·서빙을 통합하고 싶다 → **EKS**

## 마무리

분산 학습 인프라를 개념부터 실제 클러스터 구성하는 것까지 진행해봤다.

1. [1편](https://ddii.dev/aws/infiniband-vs-efa/) — 네트워크 개념(InfiniBand vs EFA)
2. [2편](https://ddii.dev/aws/efa-hands-on/) — 네트워크 핸즈온(EFA·NCCL)
3. [3편](https://ddii.dev/aws/distributed-training-storage/) — 스토리지(FSx/EFS/S3)
4. [4편](https://ddii.dev/aws/distributed-training-bottlenecks/) — 병목 관측·프로파일링
5. **5편: 클러스터 오케스트레이션** (이 글) — 분산 학습 클러스터링

네트워크로 노드를 잇고, 스토리지로 데이터를 공급하고, 관측으로 병목을 찾고, 오케스트레이션으로 묶으면 — 분산 학습 인프라의 전체 구성이 완성된다.

## 참고 문서

- [AWS ParallelCluster User Guide](https://docs.aws.amazon.com/parallelcluster/latest/ug/what-is-aws-parallelcluster.html)
- [Amazon SageMaker HyperPod](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod.html)
- [Amazon EKS — Machine Learning](https://docs.aws.amazon.com/eks/latest/userguide/ml-on-eks.html)
- [EKS EFA device plugin / 분산 학습](https://docs.aws.amazon.com/eks/latest/userguide/node-efa.html)
- [FSx for Lustre CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/fsx-csi.html)
- [Amazon EKS — EFA 디바이스 관리](https://docs.aws.amazon.com/eks/latest/userguide/device-management-efa.html)
- [Kubeflow MPI Operator](https://github.com/kubeflow/mpi-operator)
- [NVIDIA NCCL Tests](https://github.com/NVIDIA/nccl-tests)