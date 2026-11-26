import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import {
  Layers,
  FolderGit2,
  Users,
  Flag,
  Plus,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [overview, setOverview] = useState<any | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    url: '',
    description: '',
    categoryId: 'impresion-3d',
    type: 'guia',
    level: 'principiante',
    author: 'PC PUMA UNAM',
    costType: 'gratuito',
    license: 'Open Source / CC'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('pumaker_admin_token');
    if (!savedToken) {
      navigate('/admin/login');
      return;
    }
    setToken(savedToken);

    const loadData = async () => {
      try {
        const [ovRes, subRes] = await Promise.all([
          api.getAdminOverview(savedToken),
          api.getSubmissions(savedToken)
        ]);
        if (ovRes.success) setOverview(ovRes.data);
        if (subRes.success) setSubmissions(subRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pumaker_admin_token');
    localStorage.removeItem('pumaker_admin_user');
    navigate('/admin/login');
  };

  const handleModerate = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.updateSubmissionStatus(id, status, `Revisado por moderador (${status})`, token);
      const subRes = await api.getSubmissions(token);
      if (subRes.success) setSubmissions(subRes.data);
    } catch (err) {
      alert('Error al moderar propuesta');
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await api.createResource(newResource, token);
      if (res.success) {
        alert('¡Recurso creado con éxito!');
        setShowCreateModal(false);
        const ovRes = await api.getAdminOverview(token);
        if (ovRes.success) setOverview(ovRes.data);
      }
    } catch {
      alert('Error al crear el recurso.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span className="text-sm text-slate-500">Cargando panel de administración...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Barra superior de Administrador */}
      <div className="bg-puma-dark text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-puma-gold bg-puma-gold/15 px-2.5 py-0.5 rounded border border-puma-gold/30">
            Panel de Control
          </span>
          <h1 className="text-2xl font-black text-white mt-1">
            Administración PUMAKER · UNAM
          </h1>
          <p className="text-xs text-slate-300">
            Gestión de recursos, moderación de propuestas ciudadanas y supervisión de enlaces.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary text-xs !py-2 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Recurso</span>
          </button>
          <button
            onClick={handleLogout}
            className="btn-outline text-xs !py-2 !text-slate-300 !border-slate-700 hover:!bg-slate-800 flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Administrativas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="block text-2xl font-black text-puma-dark">{overview?.resourcesCount || 0}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase">Recursos Activos</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="block text-2xl font-black text-puma-navy">{overview?.projectsCount || 0}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase">Proyectos Registrados</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="block text-2xl font-black text-amber-600">{overview?.submissionsPending || 0}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase">Propuestas Pendientes</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="block text-2xl font-black text-red-600">{overview?.linkIssues || 0}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase">Enlaces Reportados</span>
        </div>
      </div>

      {/* Moderación de Propuestas de la Comunidad */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-puma-dark flex items-center gap-2">
            <Users className="w-5 h-5 text-puma-navy" />
            <span>Propuestas de la Comunidad para Moderación ({submissions.length})</span>
          </h2>
        </div>

        {submissions.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No hay propuestas pendientes de revisión en este momento.</p>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-puma-dark">{sub.title}</strong>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      sub.status === 'aprobada' ? 'bg-emerald-100 text-emerald-800' : sub.status === 'rechazada' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{sub.description}</p>
                  <div className="text-[11px] text-slate-400">
                    Por: {sub.authorName} ({sub.authorEmail}) · {new Date(sub.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleModerate(sub.id, 'aprobada')}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold flex items-center gap-1"
                    title="Aprobar propuesta"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Aprobar</span>
                  </button>
                  <button
                    onClick={() => handleModerate(sub.id, 'rechazada')}
                    className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-semibold flex items-center gap-1"
                    title="Rechazar propuesta"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Rechazar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Creación de Recurso */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-puma-dark">Agregar Nuevo Recurso al Catálogo</h3>
            <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Oficial</label>
                <input
                  type="url"
                  required
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Descripción</label>
                <textarea
                  rows={3}
                  required
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo</label>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="software">Software Libre</option>
                    <option value="herramienta">Herramienta Web</option>
                    <option value="guia">Guía / Manual</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="curso">Curso</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nivel</label>
                  <select
                    value={newResource.level}
                    onChange={(e) => setNewResource({ ...newResource, level: e.target.value })}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                  >
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs !py-2 !px-4"
                >
                  Guardar Recurso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
