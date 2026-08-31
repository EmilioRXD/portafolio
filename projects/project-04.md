---
title: Asistente de IA por WhatsApp
category: Aplicación Web · IA Conversacional
date: 2026
image: public/projects/pic-4.png
tags: Node.js, Evolution API, Redis, PostgreSQL, Groq
---

**El reto:** Un restaurante perdía pedidos y clientes en horas pico porque no lograba responder todos los mensajes y llamadas a tiempo. La atención manual no escalaba y cada consulta sin respuesta era un pedido perdido.

**Mi enfoque:** Construí un asistente conversacional en Node.js integrado con Evolution API para la mensajería de WhatsApp. El flujo de conversación usa Groq como LLM para interpretar las solicitudes, Redis para el estado de las conversaciones y PostgreSQL para persistir pedidos, clientes y mensajes. El asistente responde automáticamente, consulta el estado de los pedidos y gestiona solicitudes frecuentes de forma automatizada.

**El resultado:** La carga de respuesta manual en horas pico se redujo drásticamente, con respuestas inmediatas a los clientes en cualquier horario. La solución quedó lista para operar en producción y demostró cómo un flujo de atención conversacional puede reemplazar la necesidad de personal extra en la atención.