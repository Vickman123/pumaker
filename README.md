# PUMAKER · PC PUMA · UNAM
### Aprende · Experimenta · Crea · Comparte

> **Portal abierto de aprendizaje, fabricación digital e innovación tecnológica de la Universidad Nacional Autónoma de México (PC PUMA).**

PUMAKER es una plataforma web completa, funcional, moderna y libre de barreras económicas, diseñada para democratizar el acceso a la cultura maker, la computación física, el modelado 3D, el corte láser, la robótica y la inteligencia artificial.

---

## 🌟 Características Principales

1. **Acceso 100% Público y Gratuito:** Consulta libre de toda la biblioteca y herramientas sin necesidad de registro ni pago.
2. **11 Grandes Áreas Maker:** Páginas de especialización dedicadas a:
   - Impresión 3D y Fabricación Aditiva
   - Corte y Grabado Láser (con advertencias de seguridad para materiales prohibidos como PVC)
   - Electrónica y Microcontroladores (Arduino, ESP32, Raspberry Pi Pico)
   - Robótica y Mecatrónica
   - Fotografía, Video y Producción Audiovisual (OBS, DaVinci Resolve, Audacity)
   - Diseño y Creatividad Digital (Inkscape, Blender, Penpot, Photopea)
   - Inteligencia Artificial y Machine Learning (Teachable Machine, Hugging Face)
   - Realidad Virtual, Aumentada y Tecnologías Inmersivas (Three.js, WebXR, A-Frame, Godot)
   - Programación y Desarrollo Tecnológico (Web, Python, Git)
   - Sustentabilidad, Reparación y Cultura DIY (iFixit, economía circular)
   - Ciencia, Sensores y Experimentación Ciudadana
3. **Catálogo Curado con Buscador y Filtros Combinables:** Más de 45 recursos iniciales verificados con filtrado por categoría, nivel, software, costo, licencia e idioma.
4. **30 Proyectos Maker Paso a Paso:** Fichas técnicas completas con lista de materiales (BOM), herramientas, software, instrucciones guiadas con progreso interactivo, resultado esperado y licencias.
5. **8 Rutas de Aprendizaje Guiadas:** Planes formativos desde cero para construir tu primer objeto 3D, tu primer circuito, tu primer corte láser o tu primer robot.
6. **Videoteca Verificada:** Canales oficiales de referencia técnica en YouTube y reproductor embebido sin búsquedas engañosas ni enlaces falsos.
7. **8 Simuladores y Calculadoras Interactivas Nativas:**
   - Calculadora de volumen y masa de impresión 3D
   - Calculadora de costos reales de fabricación
   - Conversor de unidades técnicas maker (mm, pulgadas, mils, oz de cobre)
   - Compensador de kerf y parámetros para corte láser
   - Generador de despiece paramétrico de cajas con dientes (finger joints)
   - Checklist interactivo pre-vuelo para impresoras 3D
   - Generador de ficha técnica de proyecto descargable en Markdown
   - Calculadora de tiempo y logística para talleres maker
8. **Comunidad y Moderación:** Envío de propuestas de proyectos con panel administrativo protegido por JWT para revisión antes de su publicación.
9. **Accesibilidad Web:** Cumplimiento con las pautas WCAG 2.2 Nivel AA.

---

## 🛠️ Arquitectura Tecnológica

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router 7, Lucide React.
- **Backend API:** Node.js, Express, TypeScript, Helmet, CORS, Morgan, JSON Web Tokens (JWT), BcryptJS.
- **Base de Datos & ORM:** Prisma ORM con SQLite para desarrollo local sin dependencias externas (fácilmente migrable a PostgreSQL mediante variable de entorno).
- **Contenedores:** Dockerfile para backend y frontend, y `docker-compose.yml` para despliegue automatizado con PostgreSQL.

---

## 🚀 Inicio Rápido en Localhost

### Requisitos Previos
- **Node.js** v18 o superior instalado en el sistema.
- **Git** instalado.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Vickman123/pumaker.git
cd pumaker
```

### 2. Inicio Automático con Scripts
- **En Windows:**
  Haz doble clic o ejecuta en la consola:
  ```cmd
  start-local.bat
  ```
- **En Linux / macOS:**
  ```bash
  chmod +x start-local.sh
  ./start-local.sh
  ```

El script verificará dependencias, generará el archivo `.env`, construirá el cliente Prisma, sembrará la base de datos con los datos reales y levantará tanto el frontend como el backend en paralelo.

### 3. Inicio Manual Paso a Paso
```bash
# 1. Instalar dependencias en la raíz y paquetes de trabajo
npm run install:all

# 2. Configurar variables de entorno
cp .env.example backend/.env

# 3. Inicializar base de datos y semillero
cd backend
npx prisma generate
npx prisma db push
npm run seed
cd ..

# 4. Iniciar servidores de desarrollo simultáneos
npm run dev
```

---

## 🌐 URLs de Acceso Local

| Servicio | URL Local | Descripción |
| :--- | :--- | :--- |
| **Portal Público (Frontend)** | `http://localhost:5173` | Portal de libre consulta, biblioteca y proyectos |
| **Backend REST API** | `http://localhost:3000` | Servidor API REST y verificación de salud |
| **Health Check** | `http://localhost:3000/health` | Estado del servicio en tiempo real |
| **Panel Administrativo** | `http://localhost:5173/admin/login` | Acceso con credenciales de moderador |

### Credenciales Administrativas Predeterminadas
- **Correo:** `admin@pumaker.unam.mx`
- **Contraseña:** `Pumaker2026!AdminSecure`

---

## 🧪 Comandos Disponibles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia frontend y backend simultáneamente en modo desarrollo |
| `npm run build` | Compila frontend (Vite/TS) y backend (TSC/Prisma) para producción |
| `npm run test` | Ejecuta pruebas automatizadas de endpoints, base de datos y componentes |
| `npm run seed` | Carga el semillero real de recursos, categorías, proyectos y videos |

---

## 📂 Estructura del Repositorio

```text
pumaker/
├── backend/                  # Servidor API Express + TypeScript + Prisma
│   ├── prisma/
│   │   ├── schema.prisma     # Definición de modelos relacionales
│   │   └── seed.ts           # Semillero con más de 45 recursos y 30 proyectos
│   ├── src/
│   │   ├── config/           # Variables de entorno y configuración
│   │   ├── controllers/      # Controladores de recursos, categorías, proyectos, admin
│   │   ├── middleware/       # Autenticación JWT, control de errores y seguridad
│   │   ├── routes/           # Rutas públicas y protegidas de la API
│   │   ├── services/         # Cliente singleton de base de datos
│   │   └── server.ts         # Punto de entrada del servidor Express
│   ├── test/                 # Pruebas automatizadas de API
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                 # Aplicación cliente React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Componentes visuales accesibles y calculadoras
│   │   │   ├── calculators/  # 8 Calculadoras y herramientas interactivas
│   │   ├── pages/            # 14 Páginas del portal y panel administrativo
│   │   ├── services/         # Cliente API para consumir endpoints
│   │   ├── types/            # Tipos de TypeScript compartidos
│   │   ├── App.tsx           # Router principal de la plataforma
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
│
├── docs/                     # Documentación técnica exhaustiva
│   ├── ARCHITECTURE.md       # Diagrama de arquitectura y modelos
│   ├── CONTENT_GUIDELINES.md # Políticas de calidad y curaduría
│   ├── DEPLOYMENT.md         # Guía de despliegue en la nube y Docker
│   └── ADMIN_GUIDE.md        # Manual de administración y moderación
│
├── docker-compose.yml        # Configuración multi-contenedor con PostgreSQL
├── start-local.bat           # Script de inicio en 1 clic para Windows
├── start-local.sh            # Script de inicio para Linux y macOS
├── .env.example
├── .gitignore
├── package.json              # Configuración de workspaces de npm
└── README.md
```

---

## 🛡️ Seguridad y Buenas Prácticas

- Las contraseñas de administradores se almacenan con hashing seguro mediante `bcryptjs` (salt rounds: 10).
- La API implementa tokens de sesión `JWT` con expiración programada para todas las operaciones de creación, edición o moderación.
- Protección integral de cabeceras mediante `Helmet`.
- Validación y tipado estricto en el backend con TypeScript.
- Ninguna clave o credencial privada se sube al repositorio de control de versiones.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** en favor de la difusión del conocimiento y la cultura libre de la **Universidad Nacional Autónoma de México (PC PUMA · UNAM)**.
