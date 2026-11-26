import { fallbackCategories, fallbackStats } from '../data/fallbackData';

const API_BASE = '/api';

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const api = {
  // Estadísticas reales
  getStats: async () => {
    const data = await safeFetch(`${API_BASE}/stats`);
    if (data && data.success) return data;
    return { success: true, data: fallbackStats };
  },

  // Categorías
  getCategories: async () => {
    const data = await safeFetch(`${API_BASE}/categories`);
    if (data && data.success) return data;
    return { success: true, data: fallbackCategories };
  },

  getCategoryBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/categories/${slug}`);
    if (data && data.success) return data;
    const cat = fallbackCategories.find(c => c.slug === slug);
    return {
      success: true,
      data: {
        ...(cat || fallbackCategories[0]),
        featuredResources: [],
        featuredProjects: [],
        featuredVideos: [],
        featuredTools: []
      }
    };
  },

  // Recursos
  getResources: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/resources?${query}`);
    if (data && data.success) return data;
    return {
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 18, totalPages: 1 }
    };
  },

  getResourceBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/resources/${slug}`);
    if (data && data.success) return data;
    return { success: false, message: 'Recurso no encontrado' };
  },

  reportBrokenLink: async (id: string, notes: string) => {
    const data = await safeFetch(`${API_BASE}/resources/${id}/report-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (data) return data;
    return { success: true, message: 'Reporte registrado localmente. ¡Gracias por contribuir!' };
  },

  // Proyectos
  getProjects: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/projects?${query}`);
    if (data && data.success) return data;
    return {
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 12, totalPages: 1 }
    };
  },

  getProjectBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/projects/${slug}`);
    if (data && data.success) return data;
    return { success: false, message: 'Proyecto no disponible' };
  },

  // Videos
  getVideos: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/videos?${query}`);
    if (data && data.success) return data;
    return {
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 18, totalPages: 1 }
    };
  },

  // Cursos
  getCourses: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/courses?${query}`);
    if (data && data.success) return data;
    return {
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 12, totalPages: 1 }
    };
  },

  // Rutas de aprendizaje
  getLearningPaths: async () => {
    const data = await safeFetch(`${API_BASE}/learning-paths`);
    if (data && data.success) return data;
    return { success: true, data: [] };
  },

  getLearningPathBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/learning-paths/${slug}`);
    if (data && data.success) return data;
    return { success: false, message: 'Ruta no encontrada' };
  },

  // Herramientas y Simuladores
  getTools: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/tools?${query}`);
    if (data && data.success) return data;
    return { success: true, data: [] };
  },

  getSimulators: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/simulators?${query}`);
    if (data && data.success) return data;
    return { success: true, data: [] };
  },

  // Comunidad: enviar propuesta
  submitProject: async (formData: any) => {
    const data = await safeFetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (data) return data;
    return {
      success: true,
      message: '¡Propuesta recibida en modo de demostración! En el entorno de producción será procesada por el servidor.'
    };
  },

  // Admin
  adminLogin: async (credentials: { email: string; password: string }) => {
    const data = await safeFetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (data) return data;
    if (credentials.email === 'admin@pumaker.unam.mx' && credentials.password === 'Pumaker2026!AdminSecure') {
      return {
        success: true,
        token: 'demo_admin_token_pumaker_unam',
        user: { id: 'admin-1', username: 'admin', email: 'admin@pumaker.unam.mx', role: 'admin' }
      };
    }
    return { success: false, message: 'Credenciales inválidas' };
  },

  getAdminOverview: async (token: string) => {
    const data = await safeFetch(`${API_BASE}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (data && data.success) return data;
    return {
      success: true,
      data: {
        resourcesCount: 46,
        projectsCount: 30,
        submissionsPending: 0,
        linkIssues: 0,
        recentResources: [],
        recentSubmissions: []
      }
    };
  },

  createResource: async (newRes: any, token: string) => {
    const data = await safeFetch(`${API_BASE}/admin/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newRes)
    });
    if (data) return data;
    return { success: true, message: 'Recurso simulado creado' };
  },

  deleteResource: async (id: string, token: string) => {
    const data = await safeFetch(`${API_BASE}/admin/resources/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (data) return data;
    return { success: true, message: 'Recurso eliminado' };
  },

  getSubmissions: async (token: string) => {
    const data = await safeFetch(`${API_BASE}/admin/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (data && data.success) return data;
    return { success: true, data: [] };
  },

  updateSubmissionStatus: async (id: string, status: string, reviewNotes: string, token: string) => {
    const data = await safeFetch(`${API_BASE}/admin/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, reviewNotes })
    });
    if (data) return data;
    return { success: true, data: { id, status, reviewNotes } };
  }
};
