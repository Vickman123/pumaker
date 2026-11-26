import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Resource, Category } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { Search, Filter, RotateCcw, Compass, ArrowUpDown } from 'lucide-react';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'todos';
  const type = searchParams.get('type') || 'todos';
  const level = searchParams.get('level') || 'todos';
  const costType = searchParams.get('costType') || 'todos';
  const language = searchParams.get('language') || 'todos';
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          page: String(page),
          limit: '18',
          sort
        };
        if (q) params.q = q;
        if (category !== 'todos') params.category = category;
        if (type !== 'todos') params.type = type;
        if (level !== 'todos') params.level = level;
        if (costType !== 'todos') params.costType = costType;
        if (language !== 'todos') params.language = language;

        const res = await api.getResources(params);
        if (res.success) {
          setResources(res.data);
          setTotal(res.pagination.total);
          setTotalPages(res.pagination.totalPages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [q, category, type, level, costType, language, sort, page]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'todos') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setPage(1);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <Compass className="w-4 h-4 text-puma-gold" />
          <span>Catálogo Abierto</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Explorador de Recursos y Herramientas Maker
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Busca entre cientos de guías, software libre, simuladores, manuales y modelos 3D curados sin barreras de pago.
        </p>
      </div>

      {/* Barra de búsqueda y filtros combinados */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        {/* Buscador de texto */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, tecnología (Arduino, Blender, Láser), software o autor..."
            value={q}
            onChange={(e) => updateParam('q', e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30 bg-slate-50/50"
          />
        </div>

        {/* Filtros seleccionables */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Categoría */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Área Maker</label>
            <select
              value={category}
              onChange={(e) => updateParam('category', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="todos">Todas las áreas</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Tipo de contenido */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tipo de Recurso</label>
            <select
              value={type}
              onChange={(e) => updateParam('type', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="todos">Todos los tipos</option>
              <option value="software">Software Libre</option>
              <option value="herramienta">Herramienta Web</option>
              <option value="simulador">Simulador</option>
              <option value="guia">Guía / Manual</option>
              <option value="tutorial">Tutorial</option>
              <option value="curso">Curso</option>
              <option value="modelo3d">Modelo 3D</option>
              <option value="plataforma">Plataforma</option>
            </select>
          </div>

          {/* Nivel de dificultad */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nivel</label>
            <select
              value={level}
              onChange={(e) => updateParam('level', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="todos">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          {/* Costo */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Costo</label>
            <select
              value={costType}
              onChange={(e) => updateParam('costType', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="todos">Todos los costos</option>
              <option value="gratuito">100% Gratuito</option>
              <option value="freemium">Freemium</option>
            </select>
          </div>

          {/* Idioma */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Idioma</label>
            <select
              value={language}
              onChange={(e) => updateParam('language', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="todos">Todos los idiomas</option>
              <option value="es">Español (Prioritario)</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          {/* Orden */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ordenar por</label>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="newest">Más recientes</option>
              <option value="popular">Más consultados</option>
              <option value="title">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Resumen de resultados y botón de limpieza */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Mostrando <strong>{resources.length}</strong> de <strong>{total}</strong> recursos encontrados
          </span>
          {(q || category !== 'todos' || type !== 'todos' || level !== 'todos' || costType !== 'todos' || language !== 'todos') && (
            <button
              onClick={clearFilters}
              className="text-puma-navy hover:text-puma-gold font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Cuadrícula de Recursos */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando biblioteca de recursos...</span>
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 p-8 space-y-4">
          <Compass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No se encontraron recursos</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No encontramos resultados con los términos o filtros seleccionados. Intenta ampliar tu búsqueda o limpiar los filtros.
          </p>
          <button onClick={clearFilters} className="btn-secondary text-xs">
            Restablecer búsqueda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Anterior
          </button>
          <span className="text-xs text-slate-600 px-3">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
