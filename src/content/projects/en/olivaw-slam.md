---
key: olivaw-slam
title: olivaw-slam
tagline: 2D lidar SLAM in pure Rust
summary: A SLAM library that produces a consistent occupancy grid and pose estimate without ROS2, C++ dependencies, or distro lock-in.
year: 2026
tier: featured
org: olivaw
tags: [robotics, iot]
tech: [Rust, SLAM, factrs, Raspberry Pi]
tint: yellow
order: 1
links:
  - { label: Source, url: 'https://github.com/Project-Olivaw/olivaw-slam', kind: repo }
  - { label: Project Olivaw, url: 'https://github.com/Project-Olivaw', kind: site }
---

Architecturally this does what `slam_toolbox` does inside ROS2 — but as a plain
Rust library. It runs on macOS, Linux, and anything else Rust targets, and
cross-compiles to a Raspberry Pi or Jetson with a single
`cargo build --target aarch64-unknown-linux-gnu`. No middleware, no distro
pinning, no C++ toolchain.

## How it works

Feed it lidar scans — from [olivaw-lidar](/projects/olivaw-lidar) or any other
source — and it returns a consistent occupancy-grid map and a pose estimate.

Scans are preprocessed (gated, outlier-filtered, voxelised), then matched by a
correlative matcher **against the accumulated map rather than against the
previous scan**. That single decision is the core of the design: matching to the
map means drift does not compound the way it does with frame-to-frame odometry.

Keyframes are taken every 0.3 m or 0.3 rad and feed three things at once: the
log-odds occupancy grid, a pose graph built on `factrs`, and loop-closure
detection. An accepted loop closure becomes a constraint in the pose graph, the
graph corrects every pose, and the corrected poses redraw the grid — which is
then what the next scan matches against.

## Why it exists

ROS2 is a reasonable answer if you are already inside it. If you are not, the
cost of adopting it to get one algorithm is enormous: a distribution to pin, a
build system to adopt, and a C++ dependency tree to maintain. A library that is
just a library has none of that.
