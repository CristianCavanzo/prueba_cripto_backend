# Backend - Documentación Inicial

## Requisitos Previos

Para ejecutar este backend correctamente, se requieren las siguientes dependencias:

-   **Node.js**: v22.14.0
-   **Docker**: para la base de datos PostgreSQL

## Configuración Inicial

### Base de Datos

Se recomienda ejecutar PostgreSQL en un contenedor de Docker. Para crear la base de datos, ejecute el siguiente comando:

```sh
docker run -e POSTGRES_PASSWORD=secret_db_password -p 5432:5432 -d postgres
```

### Configuración de Variables de Entorno

En el archivo `.env`, asegúrese de incluir la URL de la base de datos (si se uso docker para la creacion de la base de datos, la url es la siguiente):

```env
DATABASE_URL="postgresql://postgres:secret_db_password@localhost:5432/prueba?schema=public"
PORT=3001
```

## Ejecución del Proyecto

Para correr el backend después de la configuración:

```sh
npm install
npm run seed
npm run dev
```

El servidor se ejecutará en el puerto `3001`.

## Organización del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
├── nodemon.json
├── package-lock.json
├── package.json
├── prisma/                  # Configuración de Prisma ORM
│   ├── migrations/          # Migraciones de la base de datos
│   ├── schema.prisma        # Esquema de Prisma
│   └── seed.ts              # Script para poblar la base de datos
├── src/
│   ├── app.ts               # Archivo principal de la aplicación
│   ├── config/              # Configuraciones generales
│   │   ├── env.ts           # Manejo de variables de entorno
│   │   ├── index.ts         # Exportaciones de configuración
│   │   └── prisma.ts        # Configuración de Prisma
│   ├── models/              # Modelos de respuesta y entidades
│   ├── modules/             # Módulos principales de la aplicación
│   │   ├── balances/        # Módulo de balances
│   │   ├── statuses/        # Módulo de estados
│   │   ├── transactionTypes/# Módulo de tipos de transacción
│   │   ├── transactions/    # Módulo de transacciones
│   │   └── users/           # Módulo de usuarios
│   ├── utils/               # Utilidades generales
└── tsconfig.json            # Configuración de TypeScript
```

## Características y Buenas Prácticas

### **Migraciones**

Se implementaron migraciones con Prisma para asegurar la consistencia de la base de datos y permitir cambios estructurados en el esquema.

### **Índices en columnas clave**

Se añadieron índices en columnas clave para mejorar la velocidad de filtrado y optimizar las consultas en la base de datos.

### **Manejo de Transacciones**

Para operaciones sensibles, como descuentos de saldo o depósitos en la cuenta del usuario, se implementaron transacciones. Si una petición falla en medio del proceso, se revierte automáticamente para evitar inconsistencias en el saldo del usuario.

### **Validaciones**

Se utilizan `class-validator` para validar datos de entrada y asegurar la integridad de las peticiones.

### **Estructura de Respuesta Unificada**

Todas las respuestas del backend, incluyendo errores, siguen un formato unificado para mantener claridad y evitar exponer información sensible innecesaria.
