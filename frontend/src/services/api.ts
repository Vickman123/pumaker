const API_BASE = '/api';

export const api = {
  // Estadísticas reales
  getStats: async () => {
    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
  },

  // Categorías
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  getCategoryBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/categories/${slug}`);
    return res.json();
  },

  // Recursos
  getResources: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/resources?${query}`);
    return res.json();
  },

  getResourceBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/resources/${slug}`);
    return res.json();
  },

  reportBrokenLink: async (id: string, notes: string) => {
    const res = await fetch(`${API_BASE}/resources/${id}/report-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    return res.json();
  },

  // Proyectos
  getProjects: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/projects?${query}`);
    return res.json();
  },

  getProjectBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    return res.json();
  },

  // Videos
  getVideos: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/videos?${query}`);
    return res.json();
  },

  // Cursos
  getCourses: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/courses?${query}`);
    return res.json();
  },

  // Rutas de aprendizaje
  getLearningPaths: async () => {
    const res = await fetch(`${API_BASE}/learning-paths`);
    return res.json();
  },

  getLearningPathBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/learning-paths/${slug}`);
    return res.json();
  },

  // Herramientas y Simuladores
  getTools: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/tools?${query}`);
    return res.json();
  },

  getSimulators: async (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/simulators?${query}`);
    return res.json();
  },

  // Comunidad: enviar propuesta
  submitProject: async (data: any) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin
  adminLogin: async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  getAdminOverview: async (token: string) => {
    const res = await fetch(`${API_BASE}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  createResource: async (data: any, token: string) => {
    const res = await fetch(`${API_BASE}/admin/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteResource: async (id: string, token: string) => {
    const res = await fetch(`${API_BASE}/admin/resources/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  getSubmissions: async (token: string) => {
    const res = await fetch(`${API_BASE}/admin/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
  },

  updateSubmissionStatus: async (id: string, status: string, reviewNotes: string, token: string) => {
    const res = await fetch(`${API_BASE}/admin/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, reviewNotes })
    });
    return res.json();
  }
};
