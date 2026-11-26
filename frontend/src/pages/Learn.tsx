import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Category, LearningPath } from '../types';
import { GraduationCap, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const Learn: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, pathsRes] = await Promise.all([
          api.getCategories(),
          api.getLearningPaths()
        ]);
        if (catsRes.success) setCategories(catsRes.data);
        if (pathsRes.success) setLearningPaths(pathsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Cabecera */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-puma-navy bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          Portal Pedagógico Abierto
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-puma-dark mt-3">
          Aprende con PUMAKER
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Desarrolla habilidades tecnológicas desde cero. Elige una de nuestras 8 rutas guiadas o profundiza en las 11 grandes áreas del ecosistema maker.
        </p>
      </div>

      {/* 8 Rutas de Aprendizaje Guiadas */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-puma-dark flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-puma-gold" />
            <span>Rutas Guiadas: Empieza desde Cero</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Planes de estudio organizados en Conceptos, Prácticas, Herramientas y Proyecto Final sin registro obligatorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-puma hover:shadow-puma-hover transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-puma-gold/20 text-puma-dark px-2.5 py-0.5 rounded-full">
                    {path.level}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">~{path.estimatedHours} hrs</span>
                </div>
                <h3 className="font-bold text-base text-puma-dark group-hover:text-puma-navy transition-colors mb-2">
                  {path.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {path.description}
                </p>

                {/* Pasos de la ruta */}
                <div className="space-y-2 mb-4">
                  {path.steps?.map((step) => (
                    <div key={step.id} className="text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-puma-dark font-medium">{step.title}</strong>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{step.concepts}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/aprende/${path.category?.slug || 'impresion-3d'}`}
                className="w-full btn-primary text-xs !py-2 text-center"
              >
                Comenzar ruta
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Las 11 Grandes Áreas Maker con Acceso Directo */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-puma-dark flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-puma-navy" />
            <span>Páginas de Especialización por Área Maker</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Cada área cuenta con su guía completa, herramientas de software abierto recomendadas, fichas de proyectos y advertencias de seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/aprende/${cat.slug}`}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-puma-hover hover:border-puma-gold/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                    borderWidth: '1px'
                  }}
                >
                  Área {cat.displayOrder} de 11
                </span>
                <h3 className="font-bold text-base text-puma-dark group-hover:text-puma-navy transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-puma-navy group-hover:text-puma-gold transition-colors">
                <span>Explorar página del área</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
