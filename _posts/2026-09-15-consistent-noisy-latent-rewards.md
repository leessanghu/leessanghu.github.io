---
title: "Consistent Noisy Latent Rewards for Trajectory Preference Optimization in Diffusion Models"
description: "Noisy latent에서 일관된 reward를 학습하고, diffusion trajectory 전체를 preference optimization에 활용하는 방법을 정리합니다."
date: 2026-09-15
tags: [Diffusion, RL, PreferenceOptimization, DiT, SLRM]
venue: ICLR 2026
authors: Xiaole Xian et al.
---

## 1. Paper Overview

Diffusion 모델의 trajectory 전체를 대상으로 preference optimization을 수행하는 프레임워크. 기존 pixel-level reward model이 noisy latent에 취약한 문제를 해결하기 위해 **Score-based Latent Reward Model(SLRM)**을 제안하고, 이를 기반으로 **Trajectory Advantages Preference Optimization(TAPO)**를 구성.

> **핵심 질문** 완성된 이미지가 아니라 noisy latent의 중간 상태에도 일관된 preference reward를 줄 수 있을까?

## 2. Motivation

기존 preference optimization은 최종 생성 이미지에만 reward를 줌. 하지만 Diffusion은 수백 step의 denoising trajectory이므로, **중간 noisy latent 단계에서도 일관된 reward**를 줄 수 있어야 trajectory-aware 최적화가 가능.

## 3. Method

**SLRM (Score-based Latent Reward Model):**
- Task token + multi-layer feature aggregation으로 noisy latent에서 직접 reward 추정
- Noise에 robust한 latent-space reward modeling

**TAPO (Trajectory Advantages Preference Optimization):**
- SDE sampling + 여러 timestep에서 reward 평가
- Trajectory 간 preference inconsistency 감지 및 erroneous trajectory 제거
- Multi-step evaluation로 trajectory advantage 동적 포착

## 4. Takeaways

- Noisy latent에서 직접 reward를 모델링하는 것이 핵심
- Trajectory 전체를 preference 단위로 보는 관점 전환
- Diffusion + RL 연결의 최신 흐름 — DDPM×PPO 연구와 직접 연결되는 논문
