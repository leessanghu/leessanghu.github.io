---
title: "Optimal Robust Memorization with ReLU Neural Networks"
description: "ReLU 신경망의 robust memorization에 대해 O(Nn) 파라미터로 optimal robust memorization이 가능함을 constructive하게 증명합니다."
date: 2024-01-02
tags: [Memorization, Optimization]
venue: ICLR 2024 Spotlight
authors: Lijia Yu, Xiaoshan Gao, Lijun Zhang
---

## 1. Paper Overview

ReLU 신경망의 **robust memorization**에 관한 이론 논문. 단순히 데이터를 암기(interpolate)하는 것을 넘어, 각 샘플 주변 μ-ball 내에서도 예측이 일관되게 유지되는 robust memorization의 최적 조건을 규명. O(Nn) 파라미터로 optimal robust memorization이 가능함을 constructive하게 증명.

## 2. Motivation

기존 memorization 연구는 adversarial perturbation에 취약한 non-robust memorization에 집중. 실제로는 perturbation에도 안정적인 robust memorization이 필요하지만, 이를 달성하기 위한 최소 파라미터 수와 구조가 불명확했음.

## 3. Method

**이론적 결과:**
- Optimal robust memorization의 NP-hardness 증명 (특정 단순 구조 네트워크에 대해)
- Hypothesis space가 optimal robust memorization ⟺ separation bound의 절반 미만 budget에 대해 항상 robust memorization 달성 가능
- **Upper bound**: O(Nn) 파라미터로 임의 데이터셋의 optimal robust memorization 명시적 구성
- **Width lower bound**: optimal robust memorization에 필요한 최소 width 도출
- Lipschitz constant 제어 시 O(Nn log n) 파라미터로 binary classification 가능

## 4. Takeaways

- Robust memorization의 complexity는 non-robust보다 최대 선형 배 증가
- Separation bound가 robustness budget 결정의 핵심 기준
- Diffusion Memorization 연구와 연결: 왜 특정 샘플이 더 쉽게 암기되는지 이론적 토대 제공
