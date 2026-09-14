---
layout: post
title: "Consistent Noisy Latent Rewards for Trajectory Preference Optimization in Diffusion Models"
description: "Noisy latent에서 일관된 reward를 학습하고, diffusion trajectory 전체를 preference optimization에 활용하는 방법을 정리합니다."
categories: [Paper Review, Diffusion]
tags: [Diffusion, DiT, Diffusion + RL, SLRM]
---

## 1. Paper Overview

이곳에 논문 개요를 작성하면 됩니다. 이 예시 글은 사이트의 제목, 날짜, 태그, 목차와 본문 스타일을 바로 확인하기 위해 넣어두었습니다.

> **핵심 질문**  완성된 이미지가 아니라 noisy latent의 중간 상태에도 일관된 preference reward를 줄 수 있을까?

## 2. Motivation

기존 diffusion preference optimization이 최종 생성물에만 의존할 때 생기는 문제와, trajectory-level supervision이 필요한 이유를 정리하세요.

## 3. Background

### DiT and noisy latents

DiT의 입력·출력 구조와 각 timestep의 latent가 어떤 의미를 갖는지 작성하세요.

### Preference optimization

선호 데이터와 reward model, policy update의 관계를 작성하세요.

## 4. Method

### Score-based Latent Reward Model

SLRM의 task token, multi-layer feature aggregation, score enhancement를 차례대로 정리하세요.

### Trajectory Preference Optimization

Trajectory에서 reward를 계산하고 최적화하는 과정을 작성하세요.

## 5. Takeaways

- 가장 중요한 contribution
- 기존 방법과의 차이
- 내 연구와 연결되는 지점

