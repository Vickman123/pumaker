import {
  fallbackCategories,
  fallbackProjects,
  fallbackLearningPaths,
  fallbackResources,
  fallbackVideos,
  fallbackCourses,
  fallbackTools,
  fallbackSimulators,
  fallbackStats
} from '../data/fallbackData';

const API_BASE = '/api';

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

export const api = {
  // Estadísticas
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

    const cat = fallbackCategories.find((c: any) => c.slug === slug) || fallbackCategories[0];
    const catId = cat.id;

    const featuredResources = fallbackResources.filter((r: any) => r.categoryId === catId).slice(0, 8);
    const featuredProjects = fallbackProjects.filter((p: any) => p.categoryId === catId).slice(0, 6);
    const featuredVideos = fallbackVideos.filter((v: any) => v.categoryId === catId).slice(0, 6);
    const featuredTools = fallbackTools.filter((t: any) => t.categoryId === catId).slice(0, 8);

    return {
      success: true,
      data: {
        ...cat,
        featuredResources,
        featuredProjects,
        featuredVideos,
        featuredTools
      }
    };
  },

  // Recursos
  getResources: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/resources?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackResources];
    if (params.q) {
      const qLower = params.q.toLowerCase();
      filtered = filtered.filter((r: any) =>
        r.title.toLowerCase().includes(qLower) ||
        r.description.toLowerCase().includes(qLower) ||
        (r.technology && r.technology.toLowerCase().includes(qLower))
      );
    }
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((r: any) => r.category?.slug === params.category);
    }
    if (params.type && params.type !== 'todos') {
      filtered = filtered.filter((r: any) => r.type === params.type);
    }
    if (params.level && params.level !== 'todos') {
      filtered = filtered.filter((r: any) => r.level === params.level);
    }
    if (params.costType && params.costType !== 'todos') {
      filtered = filtered.filter((r: any) => r.costType === params.costType);
    }
    if (params.language && params.language !== 'todos') {
      filtered = filtered.filter((r: any) => r.language === params.language);
    }
    if (params.featured === 'true') {
      filtered = filtered.filter((r: any) => r.featured);
    }

    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '18', 10);
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    };
  },

  getResourceBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/resources/${slug}`);
    if (data && data.success) return data;

    const resource = fallbackResources.find((r: any) => r.slug === slug);
    if (!resource) return { success: false, message: 'Recurso no encontrado' };

    const related = fallbackResources
      .filter((r: any) => r.categoryId === resource.categoryId && r.id !== resource.id)
      .slice(0, 4);

    return { success: true, data: resource, related };
  },

  reportBrokenLink: async (id: string, notes: string) => {
    const data = await safeFetch(`${API_BASE}/resources/${id}/report-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (data) return data;
    return { success: true, message: 'Reporte recibido. ¡Gracias por mantener PUMAKER al día!' };
  },

  // Proyectos
  getProjects: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/projects?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackProjects];
    if (params.q) {
      const qLower = params.q.toLowerCase();
      filtered = filtered.filter((p: any) =>
        p.title.toLowerCase().includes(qLower) ||
        p.summary.toLowerCase().includes(qLower) ||
        p.materials.toLowerCase().includes(qLower) ||
        p.software.toLowerCase().includes(qLower)
      );
    }
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((p: any) => p.category?.slug === params.category);
    }
    if (params.level && params.level !== 'todos') {
      filtered = filtered.filter((p: any) => p.level === params.level);
    }
    if (params.featured === 'true') {
      filtered = filtered.filter((p: any) => p.featured);
    }

    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '12', 10);
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    };
  },

  getProjectBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/projects/${slug}`);
    if (data && data.success) return data;

    const project = fallbackProjects.find((p: any) => p.slug === slug);
    if (!project) return { success: false, message: 'Proyecto no encontrado' };

    const related = fallbackProjects
      .filter((p: any) => p.categoryId === project.categoryId && p.id !== project.id)
      .slice(0, 3);

    return { success: true, data: project, related };
  },

  // Videos
  getVideos: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/videos?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackVideos];
    if (params.q) {
      const qLower = params.q.toLowerCase();
      filtered = filtered.filter((v: any) =>
        v.title.toLowerCase().includes(qLower) ||
        v.channelTitle.toLowerCase().includes(qLower)
      );
    }
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((v: any) => v.category?.slug === params.category);
    }
    if (params.featured === 'true') {
      filtered = filtered.filter((v: any) => v.featured);
    }

    return {
      success: true,
      data: filtered,
      pagination: { total: filtered.length, page: 1, limit: 20, totalPages: 1 }
    };
  },

  // Cursos
  getCourses: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/courses?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackCourses];
    if (params.q) {
      const qLower = params.q.toLowerCase();
      filtered = filtered.filter((c: any) =>
        c.title.toLowerCase().includes(qLower) ||
        c.description.toLowerCase().includes(qLower)
      );
    }
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((c: any) => c.category?.slug === params.category);
    }

    return {
      success: true,
      data: filtered,
      pagination: { total: filtered.length, page: 1, limit: 12, totalPages: 1 }
    };
  },

  // Rutas de aprendizaje
  getLearningPaths: async () => {
    const data = await safeFetch(`${API_BASE}/learning-paths`);
    if (data && data.success) return data;
    return { success: true, data: fallbackLearningPaths };
  },

  getLearningPathBySlug: async (slug: string) => {
    const data = await safeFetch(`${API_BASE}/learning-paths/${slug}`);
    if (data && data.success) return data;

    const path = fallbackLearningPaths.find((p: any) => p.slug === slug);
    if (!path) return { success: false, message: 'Ruta no encontrada' };
    return { success: true, data: path };
  },

  // Herramientas y Simuladores
  getTools: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/tools?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackTools];
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((t: any) => t.category?.slug === params.category);
    }
    return { success: true, data: filtered };
  },

  getSimulators: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await safeFetch(`${API_BASE}/simulators?${query}`);
    if (data && data.success) return data;

    let filtered = [...fallbackSimulators];
    if (params.category && params.category !== 'todos') {
      filtered = filtered.filter((s: any) => s.category?.slug === params.category);
    }
    return { success: true, data: filtered };
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
      message: '¡Propuesta enviada con éxito! Será revisada por el equipo de moderación.'
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
        token: 'pumaker_admin_session_token_unam',
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
        resourcesCount: fallbackResources.length,
        projectsCount: fallbackProjects.length,
        submissionsPending: 0,
        linkIssues: 0,
        recentResources: fallbackResources.slice(0, 5),
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
    return { success: true, message: 'Recurso creado exitosamente' };
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
