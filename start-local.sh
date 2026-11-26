#!/usr/bin/env bash
# =====================================================================
# PUMAKER - PC PUMA UNAM - Script de Inicio Local (Linux / macOS)
# =====================================================================

set -e

echo "====================================================================="
echo "         PUMAKER - PC PUMA - UNAM - INICIO LOCAL"
echo "         Aprende · Experimenta · Crea · Comparte"
echo "====================================================================="
echo ""

# 1. Comprobar Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js no está instalado o no se encuentra en el PATH."
    echo "Instala Node.js 18+ desde https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js detectado: $(node -v)"
echo ""

# 2. Configurar .env si no existe
if [ ! -f "backend/.env" ]; then
    echo "[INFO] Creando backend/.env desde .env.example..."
    cp .env.example backend/.env
fi

# 3. Instalar dependencias si faltan
if [ ! -d "node_modules" ]; then
    echo "[INFO] Instalando dependencias raíz..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "[INFO] Instalando dependencias backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "[INFO] Instalando dependencias frontend..."
    cd frontend && npm install && cd ..
fi

# 4. Prisma y Semillero
echo "[INFO] Inicializando base de datos Prisma y semillero..."
cd backend
npx prisma db push --skip-generate
npx prisma generate
npm run seed
cd ..

echo ""
echo "====================================================================="
echo " Servidores listos:"
echo "  - Frontend:   http://localhost:5173"
echo "  - Backend API: http://localhost:3000"
echo "  - Admin:      http://localhost:5173/admin/login"
echo "    Usuario: admin@pumaker.unam.mx"
echo "    Clave:   Pumaker2026!AdminSecure"
echo "====================================================================="
echo ""

npm run dev
