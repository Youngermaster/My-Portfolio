---
key: olivaw-lidar
title: olivaw-lidar
tagline: Pure-Rust driver for SLAMTEC RPLIDAR scanners
summary: A laser scanner driver with no C++ SDK, no FFI and no bindgen — and no unsafe code anywhere in it.
year: 2026
tier: featured
org: olivaw
tags: [robotics, iot]
tech: [Rust, no_std, RPLIDAR, Embedded]
tint: blue
order: 2
links:
  - { label: Source, url: "https://github.com/Project-Olivaw/olivaw-lidar", kind: repo }
---

A driver for SLAMTEC RPLIDAR laser range scanners written entirely in Rust.
The primary target is the **RPLIDAR C1**, with the structure to extend to the
A and S series.

```rust
let mut lidar = Lidar::open("/dev/cu.usbserial-XXXX")?; // /dev/ttyUSB0 on Linux
println!("{:?}", lidar.info()?);
lidar.start_scan()?;
for scan in lidar.scans() {
    println!("{} points", scan?.len());
}
```

## Why pure Rust

- Cross-compiles cleanly to `aarch64-unknown-linux-gnu` (Raspberry Pi) and
  `aarch64-apple-darwin` with zero extra setup — no C++ toolchain, ever.
- No `unsafe` anywhere: the crate sets `unsafe_code = "forbid"`.
- The protocol parsing core is `no_std`-compatible. Disable the default `std`
  feature and you get just the parsers, small enough for an ESP32.

## The structural decision

Protocol parsing is strictly separated from I/O. That is the single most
important choice in the crate: the parsers are pure functions over bytes, which
makes them testable without hardware, reusable on a microcontroller, and
portable to any transport. The serial-port half is a thin shell around them.
