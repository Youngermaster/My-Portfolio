---
key: iot
title: IoT y robótica
blurb: MQTT, Raspberry Pi, lidar y Rust — desde el firmware del sensor hasta el mapa que produce.
panel: ../../../assets/panels/services/iot-development.png
order: 4
---

El lado físico es donde empecé, con un sistema de riego en Arduino que ganó el
tercer puesto en Expo-Ingenierías, y es donde vuelve a estar buena parte de mi
trabajo actual.

Hoy eso significa **Rust sobre el robot**: un driver de RPLIDAR escrito
enteramente en Rust, una librería de SLAM 2D que produce una rejilla de
ocupación consistente sin ROS2 de por medio, y una CLI que copia los componentes
dentro de tu proyecto en lugar de sumarte otra dependencia con la que pelear.
**MQTT** conecta las piezas; una **Raspberry Pi** suele ejecutarlas.
