---
title: "Bachelor's Project"
date: '2021-09-01'
when: 'Sep 2021 - Aug 2022'
techStack: ['java', 'c', 'python', 'reactNative', {'Socket.IO': 'https://socket.io/'}]
---

For the capstone project of my bachelor's degree, I lead a small team to work on dynamical systems.

<blockquote>
Development of a purely <a href="https://en.wikipedia.org/wiki/Inertial_measurement_unit" target="_blank">IMU</a> based two body relative positional tracking system implemented as a stylus compatible with supported touchscreen and non-touchscreen devices alike.
</blockquote>

I wanted to develop an <a href="https://en.wikipedia.org/wiki/Active_pen" target="_blank">Active Stylus</a> that is cross-compatible with most devices as the ones available today are designed to work only with certain devices, for instance, Apple pencil works only with iPads and Samsung sPen works only with Samsung devices. This is so because of the use of different types of digitizers in different devices. To overcome this I had to reimagine an Active Stylus that normally worked with the help of a digitizer and design a stylus that did not need one. Crazy enough, this way, the Active Stylus would also be compatible with non-touchscreen devices!
 
This Active Stylus works by tracking its position in space with respect to the device, which is made possible by a 9-DOF IMU. As these sensors are very noisy we use <a href="https://en.wikipedia.org/wiki/Kalman_filter" target="_blank">Kalman filters</a>, a <a href="https://en.wikipedia.org/wiki/Data_assimilation" target="_blank">data assimilation</a> technique, to try to achieve precision and accuracy. With all the sensors on-board and no stationary beacon we must heavily rely on the mathematical model. Thereby we are conducting research on designing an accurate model that is also computationally inexpensive to simulate.
 
However, calculating the position of the stylus with respect to the device is only half the problem as the device is also free to move around. Therefore we have to start with both, device and stylus, at the same point in space and then proceed to calculate their relative position. We are developing algorithms to do this in real time with virtually no latency.

All of the experimentation required is done without using any microcontrollers. This is made possible by designing the experiments unconventionally and exploiting the sensors in our smartphones. I have developed open-source software that acts as a testbed where all processes are automated. This enables easy and rapid testing.

#### Team:
* #### <a href="https://www.linkedin.com/in/vidhyasagar-g-m-a86477210/" target="_blank">Vidhyasagar G M</a>
* #### <a href="https://www.linkedin.com/in/omkar-pillutla/" target="_blank">Omkar Pillutla</a>
