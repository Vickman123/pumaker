import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.js';
import apiRoutes from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares de seguridad y logging
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));

app.use(cors({
  origin: '*', // Permitir orígenes en desarrollo y producción
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Endpoint de verificación de salud
app.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    portal: 'PUMAKER · PC PUMA · UNAM',
    timestamp: new Date().toISOString()
  });
});

// Rutas de API
app.use('/api', apiRoutes);

// Manejador 404 para rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta API no encontrada en PUMAKER'
  });
});

// Manejador centralizado de errores
app.use(errorHandler);

// Iniciar servidor solo si no estamos en entorno de prueba
if (process.env.NODE_ENV !== 'test' && process.env.npm_lifecycle_event !== 'test' && !process.env.TEST_MODE) {
  app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`  PUMAKER API Backend activo en http://localhost:${config.port}`);
    console.log(`  Iniciativa: PC PUMA · UNAM`);
    console.log(`  Ambiente: ${config.nodeEnv}`);
    console.log(`=======================================================`);
  });
}

export default app;
