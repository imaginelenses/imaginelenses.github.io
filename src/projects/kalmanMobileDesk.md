---
title: 'Kalman Mobile & Kalman Desktop'
date: '2021-12-01'
when: 'Dec 2021 - Jan 2022'
techStack: ['java', {'Socket.IO': 'https://socket.io/'}]
source: 'https://github.com/imaginelenses/kalmanMobile'
---

A tool to implement and understand <a href="https://en.wikipedia.org/wiki/Kalman_filter" target="_blank">Kalman filters</a> - Kalman Mobile along with Kalman Desktop is a
Server-Client pair. Kalman Mobile, a mobile application, reads the accelerometer readings from an
Android device and sends them over to Kalman Desktop, a desktop application, over websockets.
Kalman Desktop then moves the cursor on the screen according to the change in acceleration of the
mobile device.

{% link "https://www.kalmanfilter.net/default.aspx", "Kalmanfilter.net" %} is a great place to learn about Kalman filters.
