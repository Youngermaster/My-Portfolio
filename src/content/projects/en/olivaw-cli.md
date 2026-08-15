---
key: olivaw-cli
title: olivaw
tagline: shadcn/ui for robotics
summary: A CLI that copies vendored, editable Rust components into your project instead of adding a dependency you have to fight.
year: 2026
tier: featured
org: olivaw
tags: [robotics, devops]
tech: [Rust, CLI, embedded-hal, ESP32]
tint: red
order: 3
links:
  - { label: Source, url: "https://github.com/Project-Olivaw/olivaw-cli", kind: repo }
---

```bash
olivaw init --name my-robot --target esp32
olivaw add sensors/mpu6050
olivaw add drivers/l298n
olivaw add slam/scan-matcher
```

Each command **copies source code into your project**. It does not add a
dependency. You own the code, you can edit it, and you are never blocked by
anyone else's release cadence.

## Why vendoring instead of crates

The hardest practical problem in the embedded Rust ecosystem is `embedded-hal`
version churn. A driver crate pinned to `embedded-hal 0.2` and a HAL on `1.0`
do not compose, and no amount of care on your side fixes it — you wait for a
maintainer, or you fork.

Vendoring sidesteps the whole category. The registry declares which crate
dependencies a component needs; `olivaw add` appends them to your `Cargo.toml`
while preserving your formatting, copies the source files into `src/`, and
records versions plus a per-file `sha256` in `olivaw.toml` so you can tell what
you have changed since.

## What that buys you

An MPU6050 driver that almost works is normally a dead end. Vendored, it is a
file you open and fix in ten minutes. The trade is real — you no longer get
upstream fixes for free — but on embedded projects that trade is usually the
right way round.
