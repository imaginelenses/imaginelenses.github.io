---
title: '3D Line-of-Sight Audit System for Intersections'
date: '2025-12-01'
when: 'Dec 2025'
imgSrc: './src/media/'
techStack: ['python', 'C++', {'YOLOv8': 'https://docs.ultralytics.com/'}, {'ByteTrack': 'https://github.com/ifzhang/ByteTrack'}, {'Open3D': 'https://www.open3d.org/'}, {'Gaussian Splatting': 'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/'}, {'SfM': 'https://colmap.github.io/'}, {'ArUco': 'https://docs.opencv.org/4.x/d5/dae/tutorial_aruco_detection.html'}, {'OpenCV': 'https://opencv.org/'}, 'UDP']
---

A multi-camera 3D visibility analysis system developed as a group project, designed to audit pedestrian and vehicle sightlines at urban intersections and detect occlusions before they cause accidents.

<div>
{% image imgSrc, "gaussian.png", "fullWidth", "100vw", "", false, false %}
</div>

My primary contribution was the 3D reconstruction pipeline: eight calibrated cameras at 30&nbsp;FPS stream frames over UDP to a central pipeline, reconstructing a 1.34-million-point 3D point cloud of the intersection using Structure-from-Motion and 3D Gaussian Splatting. The team's broader system layers YOLOv8 with ByteTrack on top for per-camera detection and consistent object IDs across frames. Visibility rays are cast through the point cloud for each tracked agent, and per-frame line-of-sight scores are aggregated into a spatial heatmap of occlusion risk.

**Key Results:**

| Metric | Value |
|---|---|
| Point cloud size | 1.34 M points |
| Detection precision | > 90 % |
| Detection recall | > 85 % |
| Mean visibility score | 0.973 |
| Earlier hazard detection vs. 2D baseline | ~12.2 s |
| Camera count / frame rate | 8 cameras @ 30 FPS |
