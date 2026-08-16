---
key: olivaw-cli
title: olivaw
tagline: shadcn/ui para robótica
summary: Una CLI que copia componentes de Rust editables dentro de tu proyecto en vez de sumarte una dependencia con la que pelear.
year: 2026
tier: featured
org: olivaw
tags: [robotics, devops]
tech: [Rust, CLI, embedded-hal, ESP32]
tint: red
order: 3
links:
  - { label: Código, url: "https://github.com/Project-Olivaw/olivaw-cli", kind: repo }
---

```bash
olivaw init --name my-robot --target esp32
olivaw add sensors/mpu6050
olivaw add drivers/l298n
olivaw add slam/scan-matcher
```

Cada comando **copia código fuente dentro de tu proyecto**. No agrega una
dependencia. El código es tuyo, puedes editarlo, y nunca quedas bloqueado por el
ritmo de publicación de nadie más.

## Por qué copiar en vez de depender

El problema práctico más difícil del ecosistema de Rust embebido es la rotación
de versiones de `embedded-hal`. Un crate de driver fijado a `embedded-hal 0.2` y
un HAL en `1.0` no componen, y ningún cuidado de tu parte lo arregla: esperas a
un mantenedor, o haces un fork.

Copiar el código elimina la categoría entera del problema. El registro declara
qué dependencias necesita cada componente; `olivaw add` las agrega a tu
`Cargo.toml` preservando tu formato, copia los archivos fuente a `src/` y guarda
versiones y un `sha256` por archivo en `olivaw.toml`, para que sepas qué has
modificado.

## Qué ganas con eso

Un driver de MPU6050 que casi funciona es normalmente un callejón sin salida.
Copiado en tu proyecto, es un archivo que abres y arreglas en diez minutos. El
intercambio es real — dejas de recibir correcciones río arriba gratis — pero en
proyectos embebidos ese intercambio suele estar del lado correcto.
