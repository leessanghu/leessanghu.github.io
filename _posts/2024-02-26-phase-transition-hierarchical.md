---
title: "A Phase Transition in Diffusion Models Reveals the Hierarchical Nature of Data"
description: "Diffusion backward process에 phase transition이 존재함을 보이며, 모델이 high-level feature와 low-level feature를 서로 다른 시간 스케일에서 처리함을 규명합니다."
date: 2024-02-26
tags: [Diffusion, Theory, ComputerVision]
venue: PNAS 2025
authors: Antonio Sclocchi, Alessandro Favero, Matthieu Wyart
---

## 1. Paper Overview

Diffusion 모델의 backward process에 **phase transition**이 존재함을 이론과 실험으로 보인 논문. 특정 noise threshold를 기준으로 high-level feature(클래스)의 복원 확률이 급격히 떨어지며, low-level feature(texture 등)는 완만하게 변함. 이를 통해 Diffusion 모델이 **계층적 데이터 구조를 시간 순서대로 처리**함을 규명.

## 2. Motivation

자연 이미지는 계층적·조합적 구조를 가진다고 알려져 있지만, 이를 정량적으로 측정하고 검증하는 방법이 없었음. Diffusion 모델이 이 구조를 어떻게 학습·활용하는지 이해하면 generative model의 작동 원리를 더 깊이 파악할 수 있음.

## 3. Method

**이론:**
- 데이터를 tree 구조의 계층적 생성 모델(RHM)로 모델링
- Large tree depth 극한에서 root node(클래스) 복원 확률의 phase transition 도출

**실험:**
- Class-unconditional ImageNet diffusion model에서 forward-backward 실험
- 노이즈 수준을 바꾸며 high-level / low-level feature 복원 확률 추적

## 4. Takeaways

- Diffusion은 초반 denoising에서 클래스(high-level) 결정, 이후 디테일(low-level) 복원
- Phase transition이 존재 → 특정 timestep 이후에야 클래스가 확정됨
- Memorization 연구와 연결: 계층적 feature 중 어느 레벨이 먼저 암기되는지 분석에 응용 가능
