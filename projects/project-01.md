---
title: Control de Acceso IUTA
category: Proyecto Académico · IoT & RFID
date: 2025
image: public/projects/pic-1.png
tags: Python, C, MQTT, RFID, IoT
---

**El reto:** El IUTA necesitaba verificar que los estudiantes estuvieran al día con sus pagos antes de permitirles el ingreso a las instalaciones. Esa comprobación se hacía de forma manual y sin un registro confiable de quién entraba, lo que generaba demoras y dejaba margen para que ingresaran estudiantes con pagos pendientes.

**Mi enfoque:** Diseñé una arquitectura de dos capas: un backend en Python (API REST + MQTT) que valida la identidad de cada estudiante y su estado de pago de forma centralizada, y un driver en C compuesto por módulos de lectura (reader) y escritura (writer) para interactuar con los dispositivos de tarjetas. La comunicación con los lectores se realiza vía MQTT, de modo que todos los dispositivos operan desde una única fuente de verdad y se actualizan en tiempo real.

**El resultado:** Una propuesta completa y funcional, validada con pruebas del flujo real, aunque la institución no llegó a implementarla en producción. Demuestra cómo el ingreso quedaría restringido a los estudiantes al día con sus pagos, con cada intento de acceso registrado en tiempo real y con la validación centralizada en lugar de la comprobación manual.

@video src="public/media/project-01/file-01.mp4" desc="MVP de la primera interfaz: el proceso de creación de la aplicación web, desarrollada puramente en frontend"

@image src="public/media/project-01/pic-01.png" desc="Segunda versión de la interfaz web del frontend"

@video src="public/media/project-01/file-02.mp4" desc="Demo de la pantalla de configuración de red del microcontrolador ESP32, donde se definía la IP del servidor que gestionaba los datos de entrada y salida y las validaciones necesarias"

@video src="public/media/project-01/file-03.mp4" desc="Proceso de asignación de una tarjeta NFC a un estudiante; en el video se observa un llavero NFC, aunque el concepto es el mismo con la tarjeta"

@video src="public/media/project-01/file-04.mp4" desc="Prueba del flujo completo de entrada"
