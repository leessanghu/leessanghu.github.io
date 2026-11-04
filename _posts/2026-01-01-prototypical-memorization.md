---
title: "Diffusion Models Preferentially Memorize Prototypical Examples"
description: "Common한 sub-feature를 많이 가진 prototypical 샘플이 먼저 암기됨을 발견하고, 부분 암기까지 같은 메커니즘으로 설명합니다."
date: 2026-01-01
tags: [Diffusion, Memorization]
venue: ICML 2026
authors: Marta Aparicio Rodriguez et al.
---

## 1. Paper Overview

Diffusion 모델이 어떤 데이터를 먼저 암기하는지를 분석한 논문. **Common한 sub-feature를 많이 가진 "prototypical" 샘플**이 먼저 Memorization됨을 보이며, full memorization뿐만 아니라 **부분 암기(partial memorization)**도 같은 메커니즘으로 설명 가능함을 보임.

## 2. Motivation

기존 Memorization 연구는 "암기가 일어났냐 안 났냐"만 봤지, 왜 특정 샘플이 먼저 암기되는지는 설명하지 못함. 데이터의 어떤 속성이 Memorization을 유발하는지 규명 필요.

## 3. Method

**이론 (Synthetic):**
- RHM(Random Hierarchical Model) + Power-law 구조로 계층적 feature rareness 모델링
- DDIM에서 feature가 얼마나 rare한지 + 계층 구조 2가지를 동시에 분석

**실험 (CelebA):**
- 각 Attribute의 rareness 측정
- Attribute 간 상관관계 분석 → 부분 암기 패턴 포착

## 4. Limitations

- Symbol-level에선 RHM으로 계층 직접 조작하지만, CelebA에선 계층 검증 없이 rareness만 사용
- CelebA의 40개 이진 속성({1,-1}) 표현 방식이 애매함
- Commonness와 early memorization 관계에 visual complexity, local density 등 교란 변수 존재

## 5. Takeaways

- Prototypical(흔한) 샘플이 먼저 암기된다는 직관적이고 강력한 발견
- Partial memorization까지 같은 프레임으로 설명 가능
- 데이터셋 구성 전략과 Memorization 완화에 직접 연결 가능한 인사이트
