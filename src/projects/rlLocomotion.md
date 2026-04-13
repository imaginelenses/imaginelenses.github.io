---
title: 'RL Locomotion & Trajectory Optimization'
date: '2024-12-01'
when: 'Dec 2024'
techStack: ['python', {'Stable-Baselines3': 'https://stable-baselines3.readthedocs.io/'}, {'Gymnasium': 'https://gymnasium.farama.org/'}, {'NumPy': 'https://numpy.org/'}]
---

Trained a Proximal Policy Optimization (PPO) agent in a custom Gymnasium simulation environment for continuous locomotion tasks, benchmarked against Sequential Quadratic Programming (SQP) trajectory optimization.

A custom Gymnasium environment was built to simulate the robot dynamics, reward shaping, and episode resets. The PPO agent was trained with Stable-Baselines3 using entropy regularization and clipped surrogate objectives. Performance was compared against an SQP-based trajectory planner operating on the same dynamics model, evaluating task completion rate, energy efficiency, and generalization to perturbed initial conditions.
