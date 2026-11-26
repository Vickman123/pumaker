# Guía de Administración — PUMAKER
## Panel de Control, Gestión de Recursos y Moderación

### 1. Acceso al Panel Administrativo
- URL de Ingreso: `http://localhost:5173/admin/login` (o en tu dominio de producción `/admin/login`).
- Usuario Predeterminado: `admin@pumaker.unam.mx`
- Contraseña Predeterminada: `Pumaker2026!AdminSecure`

> [!IMPORTANT]
> En un despliegue de producción real, cambie inmediatamente la contraseña del administrador en la base de datos o mediante variables de entorno antes de exponer el servidor a la red pública.

---

### 2. Funcionalidades del Panel

#### A. Tablero de Métricas (Overview)
Permite visualizar en tiempo real:
- Total de recursos publicados y clasificados.
- Total de proyectos con guías paso a paso.
- Cantidad de propuestas de la comunidad en espera de revisión.
- Número de reportes de enlaces caídos generados por los usuarios.

#### B. Creación de Nuevos Recursos
Los administradores pueden dar de alta nuevos contenidos completando el formulario:
- Título y URL oficial.
- Categoría maker asignada (Impresión 3D, Corte Láser, Electrónica, Robótica, etc.).
- Tipo de recurso (Software libre, herramienta web, guía técnica, tutorial o curso).
- Nivel de dificultad sugerido (Principiante, Intermedio, Avanzado).
- Licencia y autoría.

#### C. Moderación de Propuestas Ciudadanas
Cualquier miembro de la comunidad puede proponer proyectos desde la sección `/comunidad`. Las propuestas quedan en estado **"pendiente"** hasta que un administrador las examine:
- **Aprobar:** Cambia el estado a publicado y lo incorpora a la base de datos pública.
- **Rechazar:** Descarta la propuesta si no cumple con las directrices de calidad o seguridad.

#### D. Atención a Reportes de Enlaces
Cuando un usuario reporta un enlace como caído o desactualizado desde una tarjeta de recurso, el sistema genera un registro en la tabla `LinkCheck`. El equipo administrativo puede revisar la nota del usuario y actualizar la URL correspondiente.
