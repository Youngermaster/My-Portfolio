---
key: ecodrive
title: EcoDrive
tagline: Fleet telemetry, four months compressed into weeks
summary: Led the audit and build of a driving-behaviour platform on React Native, Kafka and FastAPI, delivered far ahead of its original timeline.
year: 2023
tier: featured
org: grisu
tags: [mobile, iot, devops]
tech: [React Native, Kafka, FastAPI, Python]
tint: panel
order: 7
links:
  - { label: Grisú, url: 'https://grisu.co', kind: site }
---

EcoDrive collects driving telemetry and turns it into behaviour scoring. I was
brought in to audit the existing work and then lead the build.

The architecture question was the whole job: telemetry arrives continuously from
many devices and cannot be dropped, but the scoring is not something a phone
should wait on. **Kafka** decouples the two — devices publish, consumers score
asynchronously, and the **FastAPI** layer serves results without ever blocking
on ingestion. The client is **React Native**.

A four-month timeline came in at a few weeks, mostly because the audit found
that the hard part had been framed as a client problem when it was a pipeline
problem.
