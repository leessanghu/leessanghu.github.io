---
title: "Detecting, Explaining, and Mitigating Memorization in Diffusion Models"
description: "프롬프트의 트리거 단어가 Memorization을 유발함을 발견하고, Gradient 기반 탐지와 prompt embedding 최적화로 완화하는 방법을 제안합니다."
date: 2026-08-17
tags: [Diffusion, Memorization]
venue: ICLR 2024
authors: Yuxin Wen et al.
---

## 1. Paper Overview

T2I Diffusion 모델에서 어떤 프롬프트 토큰이 Memorization을 유발하는지 탐지하고, 이를 완화하는 inference-time 방법을 제안한 논문. 프롬프트의 **트리거 단어**가 Memorization의 핵심 원인임을 보이고, 이를 제거하거나 임베딩을 최적화하면 Memorization이 완화됨을 보임.

## 2. Motivation

Stable Diffusion이 훈련 데이터를 그대로 재현하는 Memorization 문제는 프라이버시·저작권 측면에서 심각. 어떤 프롬프트가, 왜 Memorization을 유발하는지 설명할 수 있어야 mitigation도 가능.

## 3. Method

**Detection:**
- (프롬프트 사용 오차) − (프롬프트 미사용 오차)로 Gradient 계산
- 특정 단어가 Loss에 미치는 영향력 → 트리거 토큰 식별

**Mitigation:**
- 프롬프트 임베딩 자체를 최적화
- 초반 샘플링 단계에서 개입 시 효과 극대화
- 임베딩 최적화가 과도하면 프롬프트 의미 손상 → 조건부 제약 추가

## 4. Limitations

- 트리거 토큰 식별은 자동이지만, 어떤 단어로 대체할지는 사람의 개입 필요
- Detection threshold가 경험적으로 결정되어 모델/데이터가 달라지면 일반화 어려움
- Prompt embedding optimization 추가 계산비용 발생

## 5. Takeaways

- Memorization은 특정 토큰이 Trigger로 작동하는 현상
- Prompt 임베딩 수준에서 inference-time에 완화 가능
- 이후 BE Attention 연구(ICLR 2025)의 직접적인 선행 연구
