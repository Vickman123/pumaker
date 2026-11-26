import { Router } from 'express';
import {
  getResources,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
  reportBrokenLink
} from '../controllers/resourceController.js';
import { getCategories, getCategoryBySlug } from '../controllers/categoryController.js';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { getVideos } from '../controllers/videoController.js';
import { getCourses } from '../controllers/courseController.js';
import { getLearningPaths, getLearningPathBySlug } from '../controllers/learningPathController.js';
import { getTools } from '../controllers/toolController.js';
import { getSimulators } from '../controllers/simulatorController.js';
import { getPlatformStats } from '../controllers/statsController.js';
import { adminLogin, getAdminOverview } from '../controllers/adminController.js';
import {
  createSubmission,
  getSubmissions,
  updateSubmissionStatus
} from '../controllers/submissionController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// ================= Rutas Públicas =================
// Estadísticas del portal
router.get('/stats', getPlatformStats);

// Categorías
router.get('/categories', getCategories);
router.get('/categories/:slug', getCategoryBySlug);

// Recursos
router.get('/resources', getResources);
router.get('/resources/:slug', getResourceBySlug);
router.post('/resources/:id/report-link', reportBrokenLink);

// Proyectos
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

// Videos
router.get('/videos', getVideos);

// Cursos
router.get('/courses', getCourses);

// Rutas de aprendizaje
router.get('/learning-paths', getLearningPaths);
router.get('/learning-paths/:slug', getLearningPathBySlug);

// Herramientas y Simuladores
router.get('/tools', getTools);
router.get('/simulators', getSimulators);

// Propuestas de la comunidad
router.post('/submissions', createSubmission);

// Autenticación de Administrador
router.post('/admin/login', adminLogin);

// ================= Rutas Protegidas de Administración =================
router.get('/admin/overview', requireAdmin, getAdminOverview);

// Gestión de recursos (Admin)
router.post('/admin/resources', requireAdmin, createResource);
router.put('/admin/resources/:id', requireAdmin, updateResource);
router.delete('/admin/resources/:id', requireAdmin, deleteResource);

// Gestión de proyectos (Admin)
router.post('/admin/projects', requireAdmin, createProject);
router.put('/admin/projects/:id', requireAdmin, updateProject);
router.delete('/admin/projects/:id', requireAdmin, deleteProject);

// Gestión de propuestas (Admin)
router.get('/admin/submissions', requireAdmin, getSubmissions);
router.patch('/admin/submissions/:id', requireAdmin, updateSubmissionStatus);

export default router;
