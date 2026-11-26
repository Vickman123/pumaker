@echo off
TITLE PUMAKER - PC PUMA UNAM - Servidor Local
echo =====================================================================
echo          PUMAKER - PC PUMA - UNAM - INICIO LOCAL
echo          Aprende - Experimenta - Crea - Comparte
echo =====================================================================
echo.

REM 1. Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado o no se encuentra en el PATH.
    echo Por favor instala Node.js 18+ desde https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado:
node -v
echo.

REM 2. Verificar archivo .env en backend
if not exist "backend\.env" (
    echo [INFO] Creando backend\.env desde .env.example...
    copy ".env.example" "backend\.env" >nul
)

REM 3. Instalar dependencias si no existen
if not exist "node_modules" (
    echo [INFO] Instalando dependencias de la raiz...
    call npm install
)

if not exist "backend\node_modules" (
    echo [INFO] Instalando dependencias de backend...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo [INFO] Instalando dependencias de frontend...
    cd frontend
    call npm install
    cd ..
)

REM 4. Inicializar base de datos y semilla
echo [INFO] Verificando base de datos y cargando semillero...
cd backend
call npx prisma db push --skip-generate
call npx prisma generate
call npm run seed
cd ..

echo.
echo =====================================================================
echo Servidores listos para iniciar:
echo  - Frontend: http://localhost:5173
echo  - Backend API: http://localhost:3000
echo  - Panel Admin: http://localhost:5173/admin/login
echo    Usuario: admin@pumaker.unam.mx
echo    Clave:   Pumaker2026!AdminSecure
echo =====================================================================
echo.
echo Presiona Ctrl+C para detener ambos servidores en cualquier momento.
echo.

call npm run dev
pause
