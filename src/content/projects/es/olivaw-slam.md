---
key: olivaw-slam
title: olivaw-slam
tagline: SLAM 2D con lidar, enteramente en Rust
summary: Una librería de SLAM que produce una rejilla de ocupación consistente y una estimación de pose sin ROS2, sin dependencias de C++ y sin atarte a una distribución.
year: 2026
tier: featured
org: olivaw
tags: [robotics, iot]
tech: [Rust, SLAM, factrs, Raspberry Pi]
tint: yellow
order: 1
links:
  - { label: Código, url: "https://github.com/Project-Olivaw/olivaw-slam", kind: repo }
  - { label: Project Olivaw, url: "https://github.com/Project-Olivaw", kind: site }
---

En términos de arquitectura hace lo mismo que `slam_toolbox` dentro de ROS2 —
pero como una librería de Rust normal. Corre en macOS, Linux y cualquier otro
objetivo de Rust, y se compila de forma cruzada a una Raspberry Pi o una Jetson
con un solo `cargo build --target aarch64-unknown-linux-gnu`. Sin middleware,
sin fijar una distribución, sin toolchain de C++.

## Cómo funciona

Le pasas escaneos de lidar — desde [olivaw-lidar](/es/proyectos/olivaw-lidar) o
cualquier otra fuente — y devuelve un mapa de rejilla de ocupación consistente y
una estimación de pose.

Los escaneos se preprocesan (recorte, filtrado de valores atípicos, voxelizado) y
luego se emparejan mediante un matcher correlativo **contra el mapa acumulado y
no contra el escaneo anterior**. Esa única decisión es el núcleo del diseño:
emparejar contra el mapa evita que la deriva se acumule como ocurre con la
odometría entre cuadros consecutivos.

Se toman keyframes cada 0,3 m o 0,3 rad, y alimentan tres cosas a la vez: la
rejilla de ocupación en log-odds, un grafo de poses construido sobre `factrs` y
la detección de cierres de bucle. Un cierre aceptado se convierte en una
restricción del grafo, el grafo corrige todas las poses, y las poses corregidas
redibujan la rejilla — que es contra lo que se empareja el siguiente escaneo.

## Por qué existe

ROS2 es una respuesta razonable si ya estás dentro de él. Si no lo estás, el
costo de adoptarlo para obtener un solo algoritmo es enorme: una distribución que
fijar, un sistema de compilación que adoptar y un árbol de dependencias de C++
que mantener. Una librería que es solo una librería no tiene nada de eso.
