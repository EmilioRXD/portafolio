---
title: Water Tank IoT
category: IoT · Monitoreo de Nivel de Agua
date: 2023
image: public/projects/pic-2.png
tags: React Native, Node.js, MQTT, IoT, Backend
---

**El reto:** Monitorear el nivel de agua de un tanque de forma remota y en tiempo real. El tanque está ubicado en un lugar de difícil acceso, por lo que revisarlo implicaba subir a verificarlo manualmente, con el riesgo de caídas, además de no poder decidir a tiempo cuándo bombear o llenar.

**Mi enfoque:** Construí una app móvil en React Native que consulta el nivel del tanque a través de un backend Node.js conectado por MQTT al dispositivo medidor. Las pantallas de nivel y del estado general del tanque muestran la información clara y actualizada para el usuario.

**El resultado:** El monitoreo del tanque dejó de depender de visitas manuales: ahora cualquier persona responsable puede consultar el nivel en tiempo real desde su celular y decidir cuándo bombear o llenar sin trasladarse al sitio, evitando tanto desabastecimientos como reboses por falta de control.