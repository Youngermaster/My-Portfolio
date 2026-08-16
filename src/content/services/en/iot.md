---
key: iot
title: IoT and robotics
blurb: MQTT, Raspberry Pi, lidar and Rust — from sensor firmware to the map it produces.
panel: ../../../assets/panels/services/iot-development.png
order: 4
---

The physical side is where I started, with an Arduino irrigation system that
took third place at Expo-Ingenierías, and it is where a lot of my current work
sits again.

Today that means **Rust on the robot**: a pure-Rust RPLIDAR driver, a 2D SLAM
library that produces a consistent occupancy grid without ROS2 anywhere in the
picture, and a CLI that vendors components into your project rather than adding
another dependency to fight. **MQTT** connects the pieces; a **Raspberry Pi**
usually runs them.
