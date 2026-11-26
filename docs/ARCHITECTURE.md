# Arquitectura Técnica — PUMAKER
## PC PUMA · UNAM · Plataforma Abierta Maker

### 1. Resumen Ejecutivo
PUMAKER está concebida bajo una arquitectura desacoplada y modular (Decoupled Client-Server Architecture) que garantiza alta velocidad de carga, escalabilidad horizontal y total independencia entre la capa de presentación y la lógica de negocio y persistencia.

```
       +---------------------------------------------+
       |               CLIENTE WEB                   |
       |  React 18 + TypeScript + Vite + Tailwind    |
       |  Componentes accesibles + Lucide Icons      |
       +---------------------------------------------+
                              |
                     HTTPS / JSON REST
                              |
       +---------------------------------------------+
       |               BACKEND API                   |
       |     Node.js + Express + TypeScript          |
       |   Helmet + JWT Security + Error Middleware  |
       +---------------------------------------------+
                              |
                         Prisma ORM
                              |
       +---------------------------------------------+
       |             BASE DE DATOS                   |
       |    Desarrollo: SQLite (cero dependencias)   |
       |    Producción: PostgreSQL 16                |
       +---------------------------------------------+
```

---

### 2. Capa Frontend (Client-Side)
- **Framework:** React 18 con Vite como bundler moderno de ultra alta velocidad.
- **Tipado:** TypeScript estricto con interfaces unificadas en `src/types/index.ts`.
- **Enrutamiento:** React Router v7 con soporte para rutas públicas anidadas y rutas protegidas de administración.
- **Estilos:** Tailwind CSS con tokens institucionales de la UNAM (Azul Marino Profundo `#0B1728`, Azul Oscuro `#142943`, Dorado `#D6A63B`).
- **Interactividad Nativa:** 8 calculadoras técnicas en JavaScript cliente para volumen 3D, costos, conversión técnica, compensación de kerf láser, generador de cajas y checklist pre-vuelo.

---

### 3. Capa Backend (Server-Side)
- **Plataforma:** Node.js con Express y TypeScript compilado vía NodeNext.
- **Seguridad:**
  - `Helmet` para inyección de cabeceras HTTP de protección (XSS, Sniffing, Clickjacking).
  - `CORS` configurado con orígenes permitidos.
  - Autenticación administrativa con JSON Web Tokens (JWT) firmados.
- **Control de Errores:** Middleware centralizado que captura excepciones sin exponer trazas de servidor en producción.
- **Endpoints RESTful:**
  - `GET /health`: Monitoreo de disponibilidad del servicio.
  - `GET /api/stats`: Estadísticas calculadas directamente de la base de datos.
  - `GET /api/categories`: Áreas del conocimiento maker con subcategorías.
  - `GET /api/resources`: Recursos curados con filtros combinables, ordenamiento y paginación.
  - `GET /api/projects`: Proyectos con instrucciones paso a paso.
  - `GET /api/videos`: Catálogo de videoteca técnica.
  - `POST /api/submissions`: Recepción de propuestas ciudadanas para moderación.
  - `POST /api/resources/:id/report-link`: Sistema de reporte comunitario de enlaces caídos.
  - `POST /api/admin/login`: Autenticación con credenciales cifradas con bcrypt.
  - Rutas `PUT/DELETE/PATCH` protegidas con middleware `requireAdmin`.

---

### 4. Capa de Datos (Persistence Layer)
El acceso a datos se gestiona mediante **Prisma ORM**, permitiendo una transición transparente entre bases de datos relacionales sin modificar una sola línea de código SQL:
- **Modo Desarrollo Local:** Utiliza SQLite (`file:./dev.db`), eliminando la necesidad de instalar o levantar servicios externos como Docker o Postgres para correr el MVP.
- **Modo Producción:** Cambiando únicamente la variable de entorno `DATABASE_URL` a una cadena de conexión `postgresql://...`, el sistema opera nativamente sobre PostgreSQL en contenedores o clusters cloud.

---

### 5. Diagrama de Entidad-Relación (Modelos Principales)

```
[ Category ] 1 ──< * [ Resource ] 1 ──< * [ ResourceTag ] >── * [ Tag ]
     │  1                     │ 1
     │                        └──< * [ LinkCheck ]
     ├──< * [ Project ]
     ├──< * [ Video ]
     ├──< * [ Course ]
     ├──< * [ LearningPath ] 1 ──< * [ LearningPathStep ]
     ├──< * [ Tool ]
     ├──< * [ Simulator ]
     └──< * [ Submission ]
```
