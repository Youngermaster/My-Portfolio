---
key: olivaw-lidar
title: olivaw-lidar
tagline: Driver en Rust puro para escáneres RPLIDAR de SLAMTEC
summary: Un driver de escáner láser sin SDK de C++, sin FFI y sin bindgen — y sin una sola línea de código unsafe.
year: 2026
tier: featured
org: olivaw
tags: [robotics, iot]
tech: [Rust, no_std, RPLIDAR, Embebidos]
tint: blue
order: 2
links:
  - { label: Código, url: "https://github.com/Project-Olivaw/olivaw-lidar", kind: repo }
---

Un driver para los escáneres láser RPLIDAR de SLAMTEC escrito enteramente en
Rust. El objetivo principal es el **RPLIDAR C1**, con la estructura necesaria
para extenderse a las series A y S.

```rust
let mut lidar = Lidar::open("/dev/cu.usbserial-XXXX")?; // /dev/ttyUSB0 en Linux
println!("{:?}", lidar.info()?);
lidar.start_scan()?;
for scan in lidar.scans() {
    println!("{} puntos", scan?.len());
}
```

## Por qué Rust puro

- Se compila de forma cruzada sin fricción a `aarch64-unknown-linux-gnu`
  (Raspberry Pi) y `aarch64-apple-darwin`, sin configuración extra y sin
  toolchain de C++.
- No hay `unsafe` en ninguna parte: el crate declara `unsafe_code = "forbid"`.
- El núcleo de parseo del protocolo es compatible con `no_std`. Al desactivar la
  feature `std` por defecto obtienes solo los parsers, lo bastante pequeños para
  un ESP32.

## La decisión estructural

El parseo del protocolo está estrictamente separado de la E/S. Es la decisión más
importante del crate: los parsers son funciones puras sobre bytes, lo que los
hace verificables sin hardware, reutilizables en un microcontrolador y portables
a cualquier transporte. La mitad del puerto serial es una capa delgada sobre
ellos.
