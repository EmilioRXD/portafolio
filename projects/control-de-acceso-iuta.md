---
title: Control de Acceso IUTA
category: Proyecto Académico · IoT & RFID
date: 2025
image: public/projects/pic-1.png
tags: Python, C, MQTT, RFID, IoT
---

**El reto:** Automatizar el control de acceso del IUTA: registrar quién entra, validar credenciales y centralizar la lógica sin depender de lectores de baja programación.

**Mi enfoque:** Diseñé una arquitectura de dos capas: un backend en Python (API REST + MQTT) que valida credenciales y gestiona los registros, y un driver en C compuesto por módulos de lectura (reader) y escritura (writer) para interactuar con los dispositivos de tarjetas. La comunicación con los lectores se realiza vía MQTT.

**El resultado:** Un sistema completo de control de acceso con separación clara entre hardware (driver en C) y lógica de negocio (backend Python), validado como proyecto de titulación.

@video src="public/media/project1/file-01.mp4" desc="Configuración del lector y validación de credenciales."

@image src="public/media/project1/pic-01.png" desc="Configuración del lector y validación de credenciales."

@video src="public/media/project1/file-02.mp4" desc="Lectura de tarjeta y registro del acceso en tiempo real."

@video src="public/media/project1/file-03.mp4" desc="Escritura de credenciales con el módulo writer."

@video src="public/media/project1/file-04.mp4" desc="Prueba del flujo completo de entrada."
