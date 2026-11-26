process.env.TEST_MODE = 'true';
process.env.NODE_ENV = 'test';
import http from 'http';
import app from '../src/server.js';
import prisma from '../src/services/db.js';

async function runTests() {
  console.log('--- Iniciando Pruebas de API PUMAKER Backend ---');
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(3001, () => {
      console.log('✓ Servidor de pruebas escuchando en puerto 3001');
      resolve();
    });
  });

  try {
    // 1. Test /health
    const resHealth = await fetch('http://localhost:3001/health');
    const dataHealth = await resHealth.json();
    if (resHealth.status !== 200 || dataHealth.status !== 'online') {
      throw new Error('/health falló: ' + JSON.stringify(dataHealth));
    }
    console.log('✓ /health respondió 200 OK');

    // 2. Test /api/stats
    const resStats = await fetch('http://localhost:3001/api/stats');
    const dataStats = await resStats.json();
    if (resStats.status !== 200 || !dataStats.data || dataStats.data.totalProjects < 30) {
      throw new Error('/api/stats no devolvió las estadísticas esperadas: ' + JSON.stringify(dataStats));
    }
    console.log(`✓ /api/stats respondió OK con ${dataStats.data.totalResources} recursos y ${dataStats.data.totalProjects} proyectos.`);

    // 3. Test /api/categories
    const resCats = await fetch('http://localhost:3001/api/categories');
    const dataCats = await resCats.json();
    if (resCats.status !== 200 || !Array.isArray(dataCats.data) || dataCats.data.length !== 11) {
      throw new Error('/api/categories falló. Categorías obtenidas: ' + (dataCats.data?.length || 0));
    }
    console.log(`✓ /api/categories respondió OK con las 11 áreas maker.`);

    // 4. Test /api/projects
    const resProj = await fetch('http://localhost:3001/api/projects?limit=5');
    const dataProj = await resProj.json();
    if (resProj.status !== 200 || dataProj.data.length !== 5) {
      throw new Error('/api/projects falló: ' + JSON.stringify(dataProj));
    }
    console.log('✓ /api/projects paginación funciona.');

    // 5. Test /api/admin/login
    const resLogin = await fetch('http://localhost:3001/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@pumaker.unam.mx',
        password: 'Pumaker2026!AdminSecure'
      })
    });
    const dataLogin = await resLogin.json();
    if (resLogin.status !== 200 || !dataLogin.token) {
      throw new Error('/api/admin/login falló: ' + JSON.stringify(dataLogin));
    }
    console.log('✓ /api/admin/login autenticación exitosa y JWT generado.');

    console.log('--- TODAS LAS PRUEBAS DE BACKEND PASARON EXITOSAMENTE ---');
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error durante pruebas:', err);
    server.close();
    await prisma.$disconnect();
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Error en pruebas de backend:', err);
  process.exit(1);
});
