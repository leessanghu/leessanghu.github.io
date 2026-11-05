---
title: "Exploring Local Memorization in Diffusion Models via Bright Ending Attention"
description: "End 토큰의 비정상적 attention(Bright Ending)이 Memorization의 신호임을 발견하고, 이를 Mask로 활용해 local memorization 영역을 pixel 단위로 localize합니다."
date: 2026-08-19
tags: [Diffusion, Memorization, CV]
venue: ICLR 2025 Spotlight
authors: Chen Chen et al.
---

## 1. Paper Overview

T2I 모델에서 Memorization을 **local** 관점으로 분석한 논문. End 토큰이 Denoising 마지막 과정에 비정상적으로 큰 attention을 받는 **Bright Ending(BE)** 현상이 Memorization의 신호임을 발견. 이를 Mask로 활용해 Memorization된 영역을 pixel 단위로 localize.

## 2. Motivation

기존 연구는 Memorization을 이미지 전체 단위(global)로만 감지. 하지만 실제로는 이미지의 일부 영역만 암기되는 local memorization이 존재하며, 이를 세밀하게 감지할 방법이 없었음.

## 3. Method

- 프롬프트당 16개 이미지 생성
- End 토큰이 Denoising 마지막 단계에서 받는 attention 값 → **BE Mask** 추출
- 선행 연구의 (프롬프트 사용 오차 − 미사용 오차)에 BE Mask를 곱해 Memorization 영역 국소화

**핵심 주장:**
- End 토큰은 전체 프롬프트 의미를 집약
- Memorization 발생 시 End 토큰 attention이 비정상적으로 증가
- 이 신호를 감지하면 local memorization까지 포착 가능

## 4. Takeaways

- Global → Local 로 Memorization 분석 단위를 세밀화
- BE Attention이 Memorization의 internal signal로 작동
- Detecting 논문(ICLR 2024)의 방법론을 local level로 확장한 후속 연구
