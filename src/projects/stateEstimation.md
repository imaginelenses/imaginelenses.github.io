---
title: 'Mobile Robot State Estimation'
date: '2026-03-01'
when: 'Mar 2026'
imgSrc: './src/media/'
techStack: ['python', 'c', {'ROS 2': 'https://docs.ros.org/en/humble/'}, {'OpenCV': 'https://opencv.org/'}, {'NumPy': 'https://numpy.org/'}]
---

Implementation and benchmarking of an Extended Kalman Filter (EKF) and a Particle Filter (PF) for mobile robot localization, fusing wheel odometry, IMU, and landmark observations.

<div>
{% image imgSrc, "pf.jpg", "fullWidth", "100vw", "", false, false %}
</div>

The EKF linearizes the nonlinear motion and observation models around the current estimate at each timestep, achieving a good balance of accuracy and computational cost. The PF uses 3,000 weighted particles to represent the full posterior distribution, enabling recovery from large localization errors without re-initialization.

**Key Results:**

| Metric | Value |
|---|---|
| EKF positional RMSE | 4.14 cm |
| EKF correction acceptance rate | 88.2 % |
| PF particle count | 3,000 |
| PF position spread (σ) | 0.27 cm |
| PF heading error (σ) | 0.90° |
| PF recovery time from 1 m / 90° error | 0.63 s |
