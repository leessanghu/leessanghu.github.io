---
title: "A Closer Look at Model Collapse: From a Generalization-to-Memorization Perspective"
description: "자기 소비 루프에서 Memorization이 어떻게 전이되는지 분석하고, 데이터셋 Entropy를 최대화해 Model Collapse를 완화하는 방법을 제안합니다."
date: 2026-07-23
tags: [Diffusion, Memorization]
venue: NeurIPS 2025 Spotlight
authors: Lianghe Shi et al.
---

## 1. Paper Overview

자기 소비 루프(self-consuming loop)에서 Memorization이 어떻게 전이되는지를 분석한 논문. 생성 데이터를 반복 학습할 때 데이터셋의 **Entropy**가 핵심 지표임을 발견하고, Entropy를 최대화하는 방향으로 데이터를 구성하면 Model Collapse를 완화할 수 있음을 보임.

## 2. Motivation

생성 모델이 자신이 만든 데이터로 재학습될 때 품질이 점점 저하되는 Model Collapse 문제. 기존 연구는 이를 단순히 품질 저하로 봤지만, 이 논문은 **Memorization 전이**라는 관점에서 재해석함.

## 3. Method

- 훈련 데이터 → DDPM 학습 → 생성 → 생성 데이터와 원본 데이터를 **그리디 샘플링**으로 혼합 → 재학습
- 거리 계산은 **DINOv2 임베딩 공간**에서 수행
- Entropy 최대화 기준으로 데이터셋 구성 + Temperature 파라미터 추가
- Entropy ↔ 일반화 성능 간 상관관계 실험적으로 검증

## 4. Limitations

- 그리디 서치 연산 비용이 큼
- Entropy가 왜 줄어드는지 원인 미규명 (모델 성능 때문인지, 데이터셋 특성 때문인지 불분명)

## 5. Takeaways

- Model Collapse는 단순 품질 저하가 아닌 Memorization 전이 현상
- 데이터셋 Entropy가 generalization의 핵심 지표
- 내 연구와 연결: Memorization 발생 조건을 데이터 관점에서 파악하는 프레임워크로 활용 가능
