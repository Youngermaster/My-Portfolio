---
key: infra
title: Infrastructure design and DevOps
blurb: AWS, Docker, CI/CD and the observability that tells you what is actually happening in production.
panel: ../../../assets/panels/services/infra-design.png
order: 3
---

Shipping code is the easy half. I set up the part that comes after: **Docker**
images that build reproducibly, **CI/CD** in GitHub Actions or GitLab, and
deployment onto **AWS** that a team can operate without ceremony.

Then the part most projects skip — observability. Logs, traces and metrics
through **Grafana, Loki and the LGTM stack**, so that when something degrades at
2am there is an answer rather than a guess. On the health interoperability
platform, that visibility is what made an unreliable upstream API survivable.
