---
title: 'Robot Localization & Autonomous Navigation'
date: '2026-05-01'
when: 'Jan - May 2026'
techStack: ['python', 'c', {'OpenCV': 'https://opencv.org/'}, {'NumPy': 'https://numpy.org/'}, 'State Estimation', 'Motion Planning', 'Control Systems']
source: 'https://github.com/imaginelenses/NYU_ROB_GY_6213'
---

Complete autonomous navigation stack built from scratch and deployed on a physical Ackermann steering robot, across five progressive labs in the NYU graduate course {% link "https://sites.google.com/nyu.edu/rob-gy6213/", "ROB-GY 6213" %}. Every algorithm (motion model identification, camera calibration, EKF, particle filter, and MPPI) is implemented without library abstractions and validated on real hardware.

<img src="https://raw.githubusercontent.com/imaginelenses/NYU_ROB_GY_6213/main/assets/mppi_demo.gif" alt="MPPI autonomous navigation on physical robot" class="fullWidth" style="border-radius: 10px;" decoding="async" loading="lazy">

**Motion Model.** Controlled experiments at five steering angles and three trial durations yield ground-truth trajectory data. Separate degree-2 polynomial models are fit for left and right turns via nonlinear least squares, capturing the robot's mechanical asymmetry in both mean displacement and variance.

**EKF Localization.** An Extended Kalman Filter fuses high-frequency wheel odometry with sparse ArUco marker observations from a calibrated overhead camera. The nonlinear unicycle model forms the prediction step; ArUco pose provides the linear correction. 95% confidence ellipses grow when the robot leaves the camera's field of view and shrink on re-entry, directly reflecting the filter's online uncertainty estimate.

<img src="https://raw.githubusercontent.com/imaginelenses/NYU_ROB_GY_6213/main/assets/camera_before_after.jpg" alt="Overhead camera frame before and after lens distortion correction" class="fullWidth" decoding="async" loading="lazy">

**Particle Filter (MCL).** A full Monte Carlo Localization pipeline (motion update, RPLidar beam model likelihood, systematic resampling, and adaptive reinitialization) localizes the robot within a pre-built occupancy map. Benchmarked under three conditions: accurate prior, wrong prior, and completely unknown pose.

<img src="https://raw.githubusercontent.com/imaginelenses/NYU_ROB_GY_6213/main/assets/pf_trajectory.png" alt="Particle filter trajectory under three initialization conditions: accurate prior, wrong prior, and unknown pose" class="fullWidth" decoding="async" loading="lazy">

**MPPI Navigation.** A Model Predictive Path Integral controller closes the full autonomy loop. A Euclidean Distance Transform of the occupancy map converts obstacle geometry into a continuous clearance cost field. At each control step, thousands of stochastic candidate trajectories are forward-simulated, weighted by composite cost (goal proximity, path following, obstacle clearance), and collapsed into a single control via importance-weighted averaging, all running in real time on the physical robot.

**Key Results:**

| Metric | Value |
|---|---|
| EKF positional RMSE | 4.14 cm |
| EKF correction acceptance rate | 88.2% |
| PF convergence from unknown pose | < 1 s |
| PF steady-state position spread (σ) | 0.27 cm |
| PF heading spread (σ) | 0.90° |
| PF recovery from 1 m / 90° error | 0.63 s |
