---
layout: single
title: "[MLOps] 서울 자전거 데이터를 KFP v2로 준비·검증"
comments: true
classes: wide
description: "UCI 서울 공공자전거 8,760시간 데이터를 Rancher Desktop Kubernetes의 KFP standalone에서 수집, 검증, 시차 피처 생성, 시간 분할, QA까지 실행한 기록."
authors: jinwoong
toc: true
toc_label: Table of Contents
slug: mlops/ml-platform-engineering-ch7-practice
date: 2026-11-06
categories:
  - MLOps
tags:
  - ML Platform Engineering
  - MLOps
  - Kubernetes
  - Kubeflow Pipelines
  - Seoul Bike
  - Data Preparation
---

# [MLOps] 서울 자전거 데이터를 KFP v2로 준비·검증

> 이 글은 개인 학습 기록이며 현재 재직 중인 회사와 관계가 없다.
>
> **읽은 자료:** *Machine Learning Platform Engineering* 7장. **직접 실행:** 2026년 11월 5일 Mac M3 Pro, Rancher Desktop Kubernetes의 KFP standalone에서 아래 파이프라인을 실행했다. **이 KFP 실행 당시** Kubeflow Notebook 컨트롤러와 MinIO 서비스는 없었다. 노트북 UI 구성은 책의 내용으로 설명하고, 실행 결과는 실제로 설치된 KFP와 SeaweedFS 아티팩트 저장소 기준으로 적었다. 같은 날 뒤이어 진행한 Part 2 후속 실험에서 Notebook v1 컨트롤러를 추가했다.

> **시리즈 순서:** [발행된 4\~5장](https://ddii.dev/mlops/ml-platform-engineering-ch4-5-practice/) (모델·피처·배치 추론) → 6장(BentoML 서빙·Evidently 배치 드리프트) → **이 글, 7장(KFP 데이터 준비)** → Part 2 후속 실험(Notebook·KServe 정합성 검사).

4\~5장의 서울 자전거 모델 실습은 원본 데이터를 Job으로 내려받고, Feast 피처와 MLflow 모델을 만든 뒤 KFP로 배치 추론했다. 이번에는 **훈련보다 앞 단계인 데이터 준비를 KFP의 작업 단위로 옮겼다.** 다운로드, 원본 검증, 시차 피처 생성, 시간 순서 분할, QA가 각각 다른 Pod에서 실행된다. 어느 단계에서 어떤 파일이 만들어졌는지를 KFP `Dataset` 아티팩트로 확인하는 것이 이번 실험의 목표다.

6장에서는 이미 등록된 모델을 API로 서빙하고 입력 분포를 배치로 검사했다. 여기서는 그 API를 다시 배포하지 않고 **상류 데이터 준비를 별도의 KFP 실행으로 재구성**한다. 같은 원본 데이터와 시간 분할 규칙을 사용하지만, 새 아티팩트가 기존 모델이나 온라인 피처를 자동으로 갱신하지는 않는다.

데이터 준비를 따로 떼어낸 이유는 간단하다. 소득 분류처럼 행을 섞어 나누면 자전거 수요의 미래 평가가 과거와 섞인다. `lag_168`을 만들기 전에 첫 168시간을 버리지 않으면 결측이 모델 입력에 들어간다. 두 규칙을 노트북의 기억에 맡기는 대신 파이프라인 코드와 QA 단언으로 고정해 봤다.

<!--truncate-->

***

## 1. 무엇을 실행했고, 책의 구성과 어디가 다른가

책 7장은 Kubeflow Notebook에서 분석한 다음 컴포넌트 사이의 데이터 전달과 KFP 파이프라인을 설명한다. 노트북은 분석 환경에 PVC, PodDefault, 이미지와 자원 한도를 붙일 수 있는 Kubeflow 리소스다. **이 파이프라인을 돌릴 당시** Mac 클러스터의 Kubeflow 구성은 KFP standalone뿐이어서 `notebooks.kubeflow.org` CRD가 없었다. 따라서 이 글에서 노트북 생성 화면이나 PodDefault를 실행한 것처럼 적을 수는 없다. 대신 4\~5장에서 검증한 분석 규칙을 코드에 옮겨 **KFP v2 파이프라인 실행까지** 확인했다. Notebook은 뒤의 Part 2 실험에서 따로 설치해 데이터 검사 셀을 실행했다.

| 항목 | 이번 실행에서 확인한 값 |
| --- | --- |
| 실행 환경 | Rancher Desktop, k3s `v1.34.4+k3s1`, arm64, VM 8 CPU·16 GiB |
| 오케스트레이터 | `kubeflow` 네임스페이스의 KFP standalone, SDK `2.17.3` |
| 아티팩트 저장소 | KFP 설치에 포함된 SeaweedFS S3. 이번에는 별도 MinIO 버킷을 만들지 않았다 |
| 원본 | UCI *Seoul Bike Sharing Demand*, 서울 현지 시각 2017-12-01 00시부터 2018-11-30 23시까지 8,760시간 |
| 실행 결과 | KFP run `2609613e-954c-407c-9a56-c21fa3f1d05e`, `SUCCEEDED` |

데이터를 이 자료로 고른 배경은 4\~5장과 같다. **시간이 명시된 한국의 실제 대여 기록**이라 `t-1`, `t-24`, `t-168` 시차가 무엇을 뜻하는지 검증할 수 있고, 매 시간의 정답 대여 대수가 있어 미래 구간 평가도 가능하다. UCI 원본 ZIP과 내부 CSV의 SHA-256을 고정해 데이터가 바뀌면 수집 단계에서 멈추게 했다.

```text
ZIP 139e9908f0a3544bb222386855c9ce107e96467306bb8e4ce936aab59e7baac4
CSV 373339b71a8935d69e9af0abf26a70744632119862eeb3919efb389a7b749c60
```

## 2. 이 파이프라인의 아티팩트는 파일 하나씩 쓴다

KFP v2의 `Output[Dataset].path`는 아티팩트 내용을 쓸 경로다. **이번 구현은 그 경로에 Parquet 파일 하나를 직접 쓰고**, 다음 Pod가 `Input[Dataset].path`에서 그 파일을 읽도록 정했다. KFP의 모든 아티팩트가 파일 하나여야 한다는 일반 규칙은 아니다. 이전 초안처럼 `.path`를 디렉터리로 만들고 그 밑에 `source.parquet`을 쓰면, **이 글의 다음 컴포넌트가 `.path`를 파일로 읽는 코드**와 맞지 않는다.

```python
@dsl.container_component
def download(source: dsl.Output[dsl.Dataset]):
    return dsl.ContainerSpec(
        image="seoul-bike-prep:dev",
        command=["python", "/app/prep.py", "download"],
        args=["--output", source.path],
    )
```

다운로드 Pod가 끝나면 KFP 런처가 이 파일을 SeaweedFS에 올리고, 다음 Pod에 다시 가져온다. `source` → `feature_dataset`·`entity_dataset` → `train`·`validation`·`future_test`의 연결이 DAG의 데이터 계보가 된다. `validation_report`와 `qa_report`는 표 데이터가 아니라 JSON 검사 기록이라 범용 `Artifact`로 받았다. 코드의 타입이 곧 다음 단계가 받을 파일의 의미를 설명한다.

```mermaid
flowchart LR
  A["download<br/>8,760행 Dataset"] --> B["validate<br/>연속 시간·결측"]
  A --> C["features<br/>8,592행"]
  B -. "통과 뒤 실행" .-> C
  C --> D["split<br/>시간 순서"]
  D --> E["QA<br/>행 수·결측·순서"]
  E --> F["JSON 검사 기록"]
```

## 3. 다운로드부터 QA까지 실제로 넣은 규칙

### 3.1 다운로드와 원본 검증

다운로드 컴포넌트는 `urllib.request`로 UCI ZIP을 받는다. 응답은 `.read()`로 바이트를 얻고 ZIP·CSV 두 파일의 해시를 확인한다. 그다음 CSV를 `latin1`로 읽는다. 원본의 `Temperature(°C)` 열 이름에 있는 `°`가 깨지지 않도록 4\~5장의 읽기 규칙을 유지했다. `Date`와 `Hour`는 `Asia/Seoul` 시간으로 조합하고, Feast와 아티팩트 조인에 사용할 `event_timestamp`는 UTC로 저장한다.

검증 Pod는 원본이 정확히 8,760행인지, UTC 기준 고유 시각도 8,760개인지, 시각 간 간격이 모두 1시간인지, 빈 셀이 없는지 확인한다. 여기서 실패하면 `features` 작업이 실행되지 않게 `features(...).after(checked)`로 의존 관계를 명시했다. 아티팩트 연결만으로는 다운로드와 피처 생성 사이의 관계만 생기고, 검증 완료를 기다리는 관계는 생기지 않는다.

### 3.2 시차 피처와 시간 순서 분할

각 `t`행의 `lag_1`은 `t-1`시간의 대여량, `lag_24`는 전날 같은 시간, `lag_168`은 일주일 전 같은 시간이다. 날씨 두 개도 `t-1`로 밀어 두었다. 처음 168행을 자르면 결측 없이 8,592행이 남는다. 달력 피처 `hour`·`weekday`·`month`·`holiday`와 정답 `target`은 별도의 엔티티 아티팩트에 넣고, 분할 단계에서 시각을 키로 다시 합친다. **분할 파일에는 피처와 정답이 함께 있어** 다음 장의 훈련 입력으로 사용할 수 있다.

| 분할 | 현지 시각 | 행 수 |
| --- | --- | ---: |
| 훈련 | 2017-12-08 ~ 2018-06-30 | 4,920 |
| 검증 | 2018-07-01 ~ 2018-08-31 | 1,488 |
| 미래 테스트 | 2018-09-01 ~ 2018-11-30 | 2,184 |

책의 캡스톤에 나온 무작위 75/15/10 분할은 이 문제에 적용하지 않았다. 자전거 수요는 예측 시점이 있고 미래 평가가 목적이다. 마지막 QA Pod는 세 아티팩트의 행 수와 합계 8,592, 모델 입력 7개와 `target`의 결측 0개, `train < validation < future_test` 시각 순서를 다시 검사한다.

### 3.3 설치한 저장소에 맞춘 데이터 전달

초안에는 `minio-service.kubeflow:9000`과 공개 기본 계정이 들어 있었지만, 이번 클러스터에는 그 서비스가 없다. KFP의 설치된 아티팩트 저장소는 SeaweedFS다. 따라서 별도 MinIO 업로드 태스크를 흉내 내지 않고 KFP의 `Dataset` 입출력으로 파일을 전달했다. 최종 QA까지 성공했다고 해서 이 파일들이 자동으로 4\~5장의 Feast 레지스트리나 MLflow 모델을 바꾸는 것은 아니다. **새 데이터셋을 검증하는 단계와 모델 입력으로 승격하는 단계는 따로 설계해야 한다.**

## 4. 실행 명령과 확인한 결과

4\~5장의 `seoul-bike-ml:dev` 이미지가 이미 있다면 첫 빌드를 건너뛸 수 있다. 없다면 4\~5장 글에 실은 코드를 `seoul_bike_k8s/`에 저장한 뒤 빌드한다. 이 글의 부록 파일은 같은 상위 디렉터리의 `ch07_seoul_bike/`에 저장한다. 아래 명령은 두 디렉터리의 상위에서 시작하며, `port-forward`는 별도 터미널에서 켜 둔다.

```bash
cd seoul_bike_k8s
docker build -t seoul-bike-ml:dev .

cd ../ch07_seoul_bike
uv venv --python 3.11 .venv
uv pip install --python .venv/bin/python 'kfp==2.17.3'
docker build -t seoul-bike-prep:dev .
.venv/bin/python pipeline.py
kubectl -n kubeflow port-forward svc/ml-pipeline-ui 18088:80
```

다른 터미널에서 실행을 제출한다. 제출 자체는 KFP SDK 호출이며, SDK가 KFP REST API에 요청한다. 생성된 YAML을 수동 업로드할 필요가 없다.

```bash
cd ch07_seoul_bike
.venv/bin/python submit.py
kubectl -n kubeflow get pods | grep seoul-bike-data-preparation
```

실행 결과는 다음과 같다. 파이프라인 제출 ID는 위의 run ID이고 `SUCCEEDED`로 끝났다. 각 단계의 로그에서는 아래 숫자를 확인했다.

```text
download: rows=8760 zip_sha256=139e9908f0a3544bb222386855c9ce107e96467306bb8e4ce936aab59e7baac4
validate: rows=8760, missing_hours=0, null_cells=0
make_features: rows=8592
split: train=4920 validation=1488 future_test=2184
qa: train=4920 validation=1488 future_test=2184 total=8592
    null_model_input_or_target=0 chronological=True
```

KFP 출력 아티팩트는 런처 로그에서 `source`, `feature_dataset`, `entity_dataset`, `train`, `validation`, `future_test`, `qa_report`가 저장소에 올라간 것을 확인했다. `qa_report`의 내용은 해당 run의 QA 노드에서도 볼 수 있다. 모든 태스크의 캐시는 이번에 껐다. UCI 원본을 매번 내려받아 고정된 해시로 대조하는 실험이라 이전 다운로드 결과가 그대로 재사용되는 상황을 막으려는 선택이다. 실제 정기 운영에서는 데이터 버전과 캐시 키를 먼저 정한 뒤 태스크별로 켜는 편이 맞다.

## 5. 직접 해 보고 남은 판단

첫 번째는 **아티팩트 타입이 코드의 약속이라는 점**이다. 같은 Parquet이라도 원본, 엔티티, 피처, 분할의 용도가 다르다. 이름과 `Dataset` 연결을 코드에 남기니 어느 Pod가 어느 파일을 필요로 하는지 따라가기 쉬웠다. 두 번째는 **검증 순서를 연결해야 검증이 작동한다는 점**이다. `features`가 원본 아티팩트만 받으면 `validate`와 동시에 돌 수 있다. `.after(checked)` 한 줄이 원본 QA를 실제 문지기로 만든다.

세 번째는 **저장소와 노트북 같은 책의 인프라 설명을 현재 클러스터에 대조해야 한다는 점**이다. 이번 KFP 데이터 준비 실험은 SeaweedFS에 아티팩트를 남겼다. 이 실험에서는 Kubeflow Notebook 생성 화면이나 MinIO 업로드 결과를 검증 대상으로 삼지 않았다. 이 파이프라인이 만든 아티팩트를 4\~5장 학습·Feast 등록 파이프라인으로 넘기는 승격 단계도 아직 실행하지 않았다. 다음 실험은 그 아티팩트의 해시와 스키마를 확인하고, 검증된 버전만 학습에 쓰도록 잇는 것이다.

시리즈의 다음 글인 Part 2 후속 실험에서는 **같은 클러스터에 Notebook 컨트롤러를 추가**하고, 기존 `experiment-data` PVC의 원본·피처·분할을 노트북에서 다시 점검한다. 이어 MLflow의 `champion` 모델을 KServe에 올려 BentoML과 예측을 대조한다. Part 2의 Notebook과 KServe가 읽는 데이터는 **4\~5장에서 만든 PVC와 모델**이며, 이 글의 SeaweedFS `Dataset` 아티팩트를 곧바로 읽지는 않는다. 따라서 KFP 데이터 준비 → Feast·MLflow 갱신 → 서빙 재검증을 하나의 자동화된 루프로 연결하는 일은 아직 남아 있다.

아래는 이번 실행에 사용한 전체 소스다. 블로그 본문만으로 입력·출력 경로와 제출 호출을 확인할 수 있도록 파일별로 실었다. 40줄 이상인 코드는 ‘전체 코드 보기’를 눌러 펼칠 수 있다. 비밀번호는 코드에 넣지 않았다.

## 부록: 실행한 소스 전체

```text
ch07_seoul_bike/
├── prep.py
├── pipeline.py
├── submit.py
└── Dockerfile
```

### `ch07_seoul_bike/prep.py`

<details markdown="1">
<summary>전체 코드 보기: prep.py (196줄)</summary>

~~~python
"""KFP v2 container steps for the Seoul Bike data preparation experiment."""
import argparse
import hashlib
import io
import json
import urllib.request
import zipfile
from pathlib import Path

import pandas as pd


URL = "https://archive.ics.uci.edu/static/public/560/seoul+bike+sharing+demand.zip"
ZIP_SHA256 = "139e9908f0a3544bb222386855c9ce107e96467306bb8e4ce936aab59e7baac4"
CSV_SHA256 = "373339b71a8935d69e9af0abf26a70744632119862eeb3919efb389a7b749c60"
COLS = ["hour", "weekday", "month", "holiday", "lag_1", "lag_24", "lag_168"]


def write_parquet(frame: pd.DataFrame, path: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    frame.to_parquet(path, index=False)


def write_json(data: dict, path: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def download(output: str) -> None:
    request = urllib.request.Request(URL, headers={"User-Agent": "mlpe-study/1.0"})
    with urllib.request.urlopen(request, timeout=90) as response:
        raw_zip = response.read()
    if hashlib.sha256(raw_zip).hexdigest() != ZIP_SHA256:
        raise ValueError("ZIP SHA-256 mismatch")
    with zipfile.ZipFile(io.BytesIO(raw_zip)) as archive:
        raw_csv = archive.read("SeoulBikeData.csv")
    if hashlib.sha256(raw_csv).hexdigest() != CSV_SHA256:
        raise ValueError("CSV SHA-256 mismatch")
    source = pd.read_csv(io.BytesIO(raw_csv), encoding="latin1")
    local_time = pd.to_datetime(
        source["Date"] + " " + source["Hour"].astype(str).str.zfill(2),
        format="%d/%m/%Y %H",
    ).dt.tz_localize("Asia/Seoul")
    source.insert(0, "local_time", local_time)
    source.insert(1, "event_timestamp", local_time.dt.tz_convert("UTC"))
    source = source.sort_values("event_timestamp").reset_index(drop=True)
    write_parquet(source, output)
    print(f"download: rows={len(source)} zip_sha256={ZIP_SHA256}")


def validate(source_path: str, report_path: str) -> None:
    source = pd.read_parquet(source_path)
    times = pd.to_datetime(source["event_timestamp"], utc=True)
    if len(source) != 8760 or times.nunique() != 8760:
        raise ValueError("Expected 8760 unique hourly rows")
    if not times.diff().dropna().eq(pd.Timedelta(hours=1)).all():
        raise ValueError("Missing or duplicated hours")
    if source.isna().any().any():
        raise ValueError("Unexpected nulls")
    report = {
        "rows": len(source),
        "first_local_time": str(source["local_time"].iloc[0]),
        "last_local_time": str(source["local_time"].iloc[-1]),
        "missing_hours": 0,
        "null_cells": 0,
    }
    write_json(report, report_path)
    print(f"validate: {report}")


def make_features(source_path: str, features_path: str, entities_path: str) -> None:
    source = pd.read_parquet(source_path)
    count = source["Rented Bike Count"]
    local = pd.to_datetime(source["local_time"], utc=True).dt.tz_convert("Asia/Seoul")
    features = pd.DataFrame({
        "city_id": "seoul",
        "event_timestamp": source["event_timestamp"],
        "lag_1": count.shift(1).astype("float32"),
        "lag_24": count.shift(24).astype("float32"),
        "lag_168": count.shift(168).astype("float32"),
        "prev_temperature": source["Temperature(°C)"].shift(1).astype("float32"),
        "prev_rainfall": source["Rainfall(mm)"].shift(1).astype("float32"),
    }).iloc[168:].reset_index(drop=True)
    entities = pd.DataFrame({
        "city_id": "seoul",
        "event_timestamp": source["event_timestamp"].iloc[168:].reset_index(drop=True),
        "local_time": local.iloc[168:].reset_index(drop=True),
        "hour": local.dt.hour.iloc[168:].reset_index(drop=True).astype("int64"),
        "weekday": local.dt.dayofweek.iloc[168:].reset_index(drop=True).astype("int64"),
        "month": local.dt.month.iloc[168:].reset_index(drop=True).astype("int64"),
        "holiday": (source["Holiday"] == "Holiday").iloc[168:].reset_index(drop=True).astype("int64"),
        "target": count.iloc[168:].reset_index(drop=True).astype("int64"),
    })
    if len(features) != 8592 or features.isna().any().any():
        raise ValueError("Feature shape/null check failed")
    if not features["event_timestamp"].equals(entities["event_timestamp"]):
        raise ValueError("Feature/entity time misalignment")
    write_parquet(features, features_path)
    write_parquet(entities, entities_path)
    print(f"make_features: rows={len(features)}")


def split(
    features_path: str,
    entities_path: str,
    train_path: str,
    validation_path: str,
    test_path: str,
) -> None:
    features = pd.read_parquet(features_path)
    entities = pd.read_parquet(entities_path)
    if not features["event_timestamp"].equals(entities["event_timestamp"]):
        raise ValueError("Feature/entity time misalignment")
    joined = entities.merge(
        features.drop(columns=["city_id"]),
        on="event_timestamp",
        how="inner",
        validate="one_to_one",
    )
    local_time = pd.to_datetime(joined["local_time"], utc=True).dt.tz_convert("Asia/Seoul")
    masks = (
        local_time < pd.Timestamp("2018-07-01", tz="Asia/Seoul"),
        (local_time >= pd.Timestamp("2018-07-01", tz="Asia/Seoul"))
        & (local_time < pd.Timestamp("2018-09-01", tz="Asia/Seoul")),
        local_time >= pd.Timestamp("2018-09-01", tz="Asia/Seoul"),
    )
    for path, mask, expected in zip(
        (train_path, validation_path, test_path),
        masks,
        (4920, 1488, 2184),
    ):
        part = joined.loc[mask].reset_index(drop=True)
        if len(part) != expected or part[COLS + ["target"]].isna().any().any():
            raise ValueError(f"Split check failed: {path}")
        write_parquet(part, path)
    print("split: train=4920 validation=1488 future_test=2184")


def qa(train_path: str, validation_path: str, test_path: str, report_path: str) -> None:
    parts = [pd.read_parquet(path) for path in (train_path, validation_path, test_path)]
    counts = [len(part) for part in parts]
    if counts != [4920, 1488, 2184]:
        raise ValueError(f"Unexpected split counts: {counts}")
    for part in parts:
        if part[COLS + ["target"]].isna().any().any():
            raise ValueError("Null model input or target")
    times = [pd.to_datetime(part["event_timestamp"], utc=True) for part in parts]
    if not (times[0].max() < times[1].min() < times[1].max() < times[2].min()):
        raise ValueError("Chronological split violated")
    if sum(counts) != 8592:
        raise ValueError("Split total mismatch")
    report = {
        "train": counts[0],
        "validation": counts[1],
        "future_test": counts[2],
        "total": sum(counts),
        "null_model_input_or_target": 0,
        "chronological": True,
        "model_columns": COLS,
    }
    write_json(report, report_path)
    print(f"qa: {report}")


def main() -> None:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="step", required=True)
    sub.add_parser("download").add_argument("--output", required=True)
    validate_parser = sub.add_parser("validate")
    validate_parser.add_argument("--source", required=True)
    validate_parser.add_argument("--report", required=True)
    features_parser = sub.add_parser("features")
    features_parser.add_argument("--source", required=True)
    features_parser.add_argument("--features", required=True)
    features_parser.add_argument("--entities", required=True)
    split_parser = sub.add_parser("split")
    for name in ("features", "entities", "train", "validation", "test"):
        split_parser.add_argument(f"--{name}", required=True)
    qa_parser = sub.add_parser("qa")
    for name in ("train", "validation", "test", "report"):
        qa_parser.add_argument(f"--{name}", required=True)
    args = parser.parse_args()
    if args.step == "download":
        download(args.output)
    elif args.step == "validate":
        validate(args.source, args.report)
    elif args.step == "features":
        make_features(args.source, args.features, args.entities)
    elif args.step == "split":
        split(args.features, args.entities, args.train, args.validation, args.test)
    else:
        qa(args.train, args.validation, args.test, args.report)


if __name__ == "__main__":
    main()
~~~

</details>

### `ch07_seoul_bike/pipeline.py`

<details markdown="1">
<summary>전체 코드 보기: pipeline.py (108줄)</summary>

~~~python
"""KFP v2 typed-artifact data preparation pipeline."""
from kfp import compiler, dsl


IMAGE = "seoul-bike-prep:dev"


@dsl.container_component
def download(source: dsl.Output[dsl.Dataset]):
    return dsl.ContainerSpec(
        image=IMAGE,
        command=["python", "/app/prep.py", "download"],
        args=["--output", source.path],
    )


@dsl.container_component
def validate(
    source: dsl.Input[dsl.Dataset],
    validation_report: dsl.Output[dsl.Artifact],
):
    return dsl.ContainerSpec(
        image=IMAGE,
        command=["python", "/app/prep.py", "validate"],
        args=["--source", source.path, "--report", validation_report.path],
    )


@dsl.container_component
def features(
    source: dsl.Input[dsl.Dataset],
    feature_dataset: dsl.Output[dsl.Dataset],
    entity_dataset: dsl.Output[dsl.Dataset],
):
    return dsl.ContainerSpec(
        image=IMAGE,
        command=["python", "/app/prep.py", "features"],
        args=[
            "--source", source.path,
            "--features", feature_dataset.path,
            "--entities", entity_dataset.path,
        ],
    )


@dsl.container_component
def split(
    feature_dataset: dsl.Input[dsl.Dataset],
    entity_dataset: dsl.Input[dsl.Dataset],
    train: dsl.Output[dsl.Dataset],
    validation: dsl.Output[dsl.Dataset],
    future_test: dsl.Output[dsl.Dataset],
):
    return dsl.ContainerSpec(
        image=IMAGE,
        command=["python", "/app/prep.py", "split"],
        args=[
            "--features", feature_dataset.path,
            "--entities", entity_dataset.path,
            "--train", train.path,
            "--validation", validation.path,
            "--test", future_test.path,
        ],
    )


@dsl.container_component
def qa(
    train: dsl.Input[dsl.Dataset],
    validation: dsl.Input[dsl.Dataset],
    future_test: dsl.Input[dsl.Dataset],
    qa_report: dsl.Output[dsl.Artifact],
):
    return dsl.ContainerSpec(
        image=IMAGE,
        command=["python", "/app/prep.py", "qa"],
        args=[
            "--train", train.path,
            "--validation", validation.path,
            "--test", future_test.path,
            "--report", qa_report.path,
        ],
    )


@dsl.pipeline(name="seoul-bike-data-preparation")
def pipeline():
    source = download()
    checked = validate(source=source.outputs["source"])
    made = features(source=source.outputs["source"]).after(checked)
    divided = split(
        feature_dataset=made.outputs["feature_dataset"],
        entity_dataset=made.outputs["entity_dataset"],
    )
    verified = qa(
        train=divided.outputs["train"],
        validation=divided.outputs["validation"],
        future_test=divided.outputs["future_test"],
    )
    for task in (source, checked, made, divided, verified):
        task.set_caching_options(False)
        task.set_cpu_request("100m")
        task.set_memory_request("128Mi")
        task.set_memory_limit("1Gi")


if __name__ == "__main__":
    compiler.Compiler().compile(pipeline, "seoul-bike-data-prep.yaml")
~~~

</details>

### `ch07_seoul_bike/submit.py`

```python
"""Submit the data preparation pipeline to KFP standalone through its REST-backed SDK."""
import json
from pathlib import Path

import kfp


client = kfp.Client(host="http://127.0.0.1:18088", namespace="kubeflow")
run = client.create_run_from_pipeline_package(
    "seoul-bike-data-prep.yaml",
    run_name="seoul-bike-data-prep",
    experiment_name="seoul-bike-study",
    namespace="kubeflow",
    enable_caching=False,
)
finished = client.wait_for_run_completion(run.run_id, timeout=1200)
result = {"run_id": run.run_id, "state": finished.state}
Path("evidence").mkdir(exist_ok=True)
Path("evidence/kfp-run.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result))
if finished.state != "SUCCEEDED":
    raise SystemExit(1)
```

### `ch07_seoul_bike/Dockerfile`

```dockerfile
FROM seoul-bike-ml:dev

COPY prep.py /app/prep.py
```

## 참고 자료

- *Machine Learning Platform Engineering*, Benjamin Tan Wei Hao·Shanoop Padmanabhan·Varun Mallya, 7장.
- [UCI Seoul Bike Sharing Demand 데이터 카드](https://archive.ics.uci.edu/dataset/560/seoul+bike+sharing+demand)
- [KFP v2 컴포넌트와 아티팩트 문서](https://www.kubeflow.org/docs/components/pipelines/user-guides/components/)
