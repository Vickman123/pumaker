# Guía de Despliegue — PUMAKER
## Estrategia de Publicación en Producción

### 1. Despliegue con Docker y Docker Compose
PUMAKER incluye configuración lista para producción mediante contenedores:

```bash
# 1. Clonar el repositorio en el servidor
git clone https://github.com/Vickman123/pumaker.git
cd pumaker

# 2. Configurar variables de entorno de producción
cp .env.example .env
# Editar .env con contraseñas seguras de producción y dominio oficial

# 3. Levantar los tres contenedores (PostgreSQL, Backend API, Frontend Nginx)
docker-compose up -d --build

# 4. Ejecutar migraciones en el contenedor de backend
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npm run seed
```

---

### 2. Despliegue en Servicios Cloud PaaS (Render, Railway, Fly.io)

#### Backend:
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npm start`
- **Variables de Entorno Requeridas:**
  - `PORT=3000`
  - `NODE_ENV=production`
  - `DATABASE_URL=postgresql://<usuario>:<password>@<host>:5432/<db>?sslmode=require`
  - `JWT_SECRET=<clave_aleatoria_de_al_menos_32_caracteres>`
  - `CORS_ORIGIN=https://pumaker.unam.mx`

#### Frontend:
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- Configurar reglas de reescritura SPA (Single Page Application) redirigiendo todas las rutas a `/index.html`.

---

### 3. Parámetros de Rendimiento y Caché
- Nginx configurado con compresión Gzip activa para assets estáticos (`.js`, `.css`, `.svg`).
- Paginación del backend limitada a un máximo de 50 registros por consulta para preservar el rendimiento del servidor de base de datos.
