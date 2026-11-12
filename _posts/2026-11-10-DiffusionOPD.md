---
title: 'DiffusionOPD: A Unified Perspective of On-Policy Distillation in Diffusion Models'
description: Student가 생성한 On-policy Trajectory에서 각 Teacher와의 Transition 차이를 계산하고, 세 Task의 Distillation Loss를 평균 내어 Student를 학습
date: 2026-11-10
tags: [Diffusion, Distillation, OPD]
venue: SIGGRAPH Asia 2026
authors: QUANHAO LI et al.
---

## 1. DiffusionOPD Method



### 0. General OPD Loss
일반적인 OPD Loss 식은 다음과 같다.

$$
\
\mathcal L_{\mathrm{OPD}}(\theta)
=\mathbb E_{\tau\sim p_{S,\theta}}
\left[
\sum_{j=0}^{N-1}
D_{\mathrm{KL}}
\left(
p_S(\cdot|x_{t_j})
\|
p_T(\cdot|x_{t_j})
\right)
\right]
\
$$ 

본 논문에선 이 식이 아닌 더 구체화해서 사용할 예정이다.

### 1. Per-Step Gaussian Transitions

- Student의 SDE 업데이트는 다음과 같다.

 
$$
\
\boxed{
x_{t_{j+1}}
=x_{t_j}
+
\left[
v_j^S
+
\frac{\sigma_{t_j}^{2}}{2t_j}
\left(
x_{t_j}+(1-t_j)v_j^S
\right)
\right]\Delta t_j
+
\sigma_{t_j}\sqrt{-\Delta t_j}\,\epsilon_j
}
\
$$

- Velocity에 따라 determinstic 하게 결정되는 이동량
- Gaussian Noise 에 의한 무작위 이동량

Student와 Teacher은 동일한 Scheduler와 Noise level을 사용하기 때문에 Corvariance가 같다.

$$ 
\
\begin{aligned}
p_S &= \mathcal N(\mu_S,\bar{\sigma}_j^2I_d)\\
p_T &= \mathcal N(\mu_T,\bar{\sigma}_j^2I_d)
\end{aligned}
\
$$ 

### 2. Closed-Form Reverse KL between Same-Covariance Gaussians

동일한 Corvariance를 갖는 d차원의 Gaussian Distribution KL Divergence는 다음과 같다.

$$ 
\
D_{\mathrm{KL}}
\left(
\mathcal N(\mu_1,\Sigma)
\|
\mathcal N(\mu_2,\Sigma)
\right)
=\frac12(\mu_1-\mu_2)^\top
\Sigma^{-1}(\mu_1-\mu_2)
\
$$

이 위에 식을 기반으로 최종 SDE OPD Loss식은 다음과같다.

$$
\mathcal{L}_{\mathrm{OPD}}^{\mathrm{diffusion}}(\theta)=\mathbb{E}_{x_{0:N}\sim p_{S,\theta}}\left[\sum_{j=0}^{N-1}\frac{\left\|\mu_S(x_{t_j};\theta)-\mu_T(x_{t_j})\right\|_2^2}{2\bar{\sigma}_j^2}\right]
$$

OPE OPD Loss 식은 다음과 같다.

$$
\
\mathcal L_{\mathrm{ODE}}
=\mathbb E\left[
\sum_j
\frac12\|\mu_S-\mu_T\|_2^2
\right]
\
$$


## 2. Training Recipe

<img width="557" height="592" alt="image" src="https://github.com/user-attachments/assets/c3890e2e-bdc7-462d-93bb-d1c49f747ea1" />

1. 각각의 task별로 특화된 teacher모델을 독립적으로 학습시킨다.
2. 그리고 각 task에 대한 프롬프트로 student 모델이 직접 rollout해서 on-policy Denoising trajectory생성한다.
3. 그래서 각각의 teacher모델에게 증류를 받고 마지막에 한번에 student모델 업데이트한다.
예를 들어보자면 각각의 task prompt 1개씩 student 모델에게 input으로 넣어서 직접 rollout하게하고
각 task에 맞는 teacher모델과의 차이를 줄이는 loss식을 얻는다.
각 task에 따른 loss식을 평균내서 한번 student 모델을 업데이트 한다.

## 3. Experiments
