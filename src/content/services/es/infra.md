---
key: infra
title: Infraestructura y DevOps
blurb: AWS, Docker, CI/CD y la observabilidad que muestra qué está pasando de verdad en producción.
panel: ../../../assets/panels/services/infra-design.png
order: 3
---

Publicar el código es la mitad fácil. Yo me encargo de lo que viene después:
imágenes **Docker** que compilan de forma reproducible, **CI/CD** en GitHub
Actions o GitLab, y despliegues sobre **AWS** que un equipo pueda operar sin
ceremonias.

Y luego la parte que casi todos los proyectos se saltan: la observabilidad. Logs,
trazas y métricas con **Grafana, Loki y el stack LGTM**, para que cuando algo se
degrade a las 2 de la mañana haya una respuesta y no una suposición. En la
plataforma de interoperabilidad en salud, esa visibilidad fue lo que hizo
soportable una API externa poco confiable.
