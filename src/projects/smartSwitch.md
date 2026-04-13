---
title: 'Smart Switch (ESP32)'
date: '2023-08-01'
when: 'Aug 2023'
techStack: [{'ESP32': 'https://www.espressif.com/en/products/socs/esp32'}, {'Home Assistant': 'https://www.home-assistant.io/'}, 'YAML', 'js']
---

A custom ESP32-based smart switch that integrates with Home Assistant over local LAN, replacing cloud-dependent commercial switches to eliminate latency and privacy concerns.

The firmware runs on the ESP32 and communicates over the local network using the Home Assistant WebSocket API. By keeping all traffic on the LAN, the switch responds in under 1&nbsp;ms — compared to 80–200&nbsp;ms round-trip through cloud APIs. The Home Assistant integration is configured via YAML and exposed as a standard `switch` entity. A small JavaScript dashboard was built for direct browser-based control without Home Assistant.

**Key Results:**

| Metric | Value |
|---|---|
| LAN round-trip latency | < 1 ms |
| Cloud API latency (replaced) | 80–200 ms |
| Units deployed | 5 |
