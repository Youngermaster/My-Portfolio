---
key: ecodrive
title: EcoDrive
tagline: Telemetría de flota, cuatro meses comprimidos en semanas
summary: Lideré la auditoría y la construcción de una plataforma de comportamiento de conducción sobre React Native, Kafka y FastAPI, entregada muy por delante de su cronograma original.
year: 2023
tier: featured
org: grisu
tags: [mobile, iot, devops]
tech: [React Native, Kafka, FastAPI, Python]
tint: panel
order: 7
links:
  - { label: Grisú, url: "https://grisu.co", kind: site }
---

EcoDrive recoge telemetría de conducción y la convierte en puntuación de
comportamiento. Entré a auditar el trabajo existente y luego a liderar la
construcción.

La pregunta de arquitectura era todo el trabajo: la telemetría llega de forma
continua desde muchos dispositivos y no se puede perder, pero la puntuación no es
algo que un teléfono deba esperar. **Kafka** desacopla ambas cosas — los
dispositivos publican, los consumidores puntúan de forma asíncrona, y la capa de
**FastAPI** sirve resultados sin bloquearse nunca en la ingesta. El cliente es
**React Native**.

Un cronograma de cuatro meses se resolvió en unas semanas, sobre todo porque la
auditoría encontró que la parte difícil se había planteado como un problema de
cliente cuando era un problema de pipeline.
