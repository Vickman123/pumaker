import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Project, Category } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { FolderGit2, Search, Filter } from 'lucide-react';

export const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'todos';
  const level = searchParams.get('level') || 'todos';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, catsRes] = await Promise.all([
          api.getProjects({
            q,
            category: category !== 'todos' ? category : '',
            level: level !== 'todos' ? level : '',
            limit: '50'
          }),
          api.getCategories()
        ]);
        if (projRes.success) setProjects(projRes.data);
        if (catsRes.success) setCategories(catsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, category, level]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'todos') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <FolderGit2 className="w-4 h-4 text-puma-gold" />
          <span>Fichas Técnicas Ilustradas</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Catálogo de 30 Proyectos Maker Paso a Paso
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Aprende construyendo objetos tangibles: desde soportes impresos en 3D y cajas de corte láser hasta robots móviles y experimentos con IA.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, materiales o herramientas..."
            value={q}
            onChange={(e) => updateParam('q', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
          />
        </div>

        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="text-xs p-2 rounded-lg border border-slate-300 bg-white"
        >
          <option value="todos">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => updateParam('level', e.target.value)}
          className="text-xs p-2 rounded-lg border border-slate-300 bg-white"
        >
          <option value="todos">Todos los niveles</option>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      {/* Cuadrícula de Proyectos */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando proyectos maker...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <p className="text-sm text-slate-600">No se encontraron proyectos con los filtros indicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}
    </div>
  );
};
