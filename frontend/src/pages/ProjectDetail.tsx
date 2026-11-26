import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Project, ProjectStep } from '../types';
import {
  ArrowLeft,
  Clock,
  Wrench,
  Cpu,
  Layers,
  Download,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const res = await api.getProjectBySlug(slug);
        if (res.success) {
          setProject(res.data);
          setRelated(res.related || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const toggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span className="text-sm text-slate-500">Cargando ficha de proyecto...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Proyecto no encontrado</h2>
        <Link to="/proyectos" className="btn-primary text-xs mt-4 inline-flex">
          Volver a Proyectos
        </Link>
      </div>
    );
  }

  let steps: ProjectStep[] = [];
  try {
    steps = JSON.parse(project.stepsJson || '[]');
  } catch {
    steps = [];
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Botón Volver */}
      <Link to="/proyectos" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-puma-navy transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al catálogo de proyectos</span>
      </Link>

      {/* Cabecera del Proyecto con Imagen */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-puma overflow-hidden">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-puma-gold text-puma-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {project.category?.name}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold capitalize px-2.5 py-0.5 rounded">
                  Nivel: {project.level}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-puma-gold" />
                  {project.estimatedTime}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
                {project.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Ficha técnica: Materiales, herramientas, software */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <strong className="text-puma-dark font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-puma-gold" />
              <span>Materiales Requeridos:</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.materials}</p>
          </div>

          <div className="space-y-1">
            <strong className="text-puma-dark font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-puma-gold" />
              <span>Herramientas de Taller:</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.tools}</p>
          </div>

          <div className="space-y-1">
            <strong className="text-puma-dark font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-puma-gold" />
              <span>Software & Entorno:</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.software}</p>
          </div>
        </div>
      </div>

      {/* Pasos de Construcción Guiados */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-puma-dark">
              Instrucciones Paso a Paso
            </h2>
            <p className="text-xs text-slate-500">
              Marca las casillas conforme avances para llevar el registro de tu progreso.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {completedSteps.length}/{steps.length} completados
          </span>
        </div>

        <div className="space-y-4">
          {steps.map((st, idx) => {
            const isDone = completedSteps.includes(st.step || idx + 1);
            return (
              <div
                key={idx}
                onClick={() => toggleStep(st.step || idx + 1)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-500">
                        {st.step || idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className={`font-bold text-sm ${isDone ? 'line-through text-slate-500' : 'text-puma-dark'}`}>
                      {st.title}
                    </h3>
                    <p className={`leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                      {st.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resultado Esperado y Consejos de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-puma-dark uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Resultado Esperado</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {project.expectedResult}
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Consejos y Prevención</span>
          </h3>
          <p className="text-xs text-amber-900 leading-relaxed">
            {project.tips || 'Usa siempre equipo de protección personal. Verifica la ventilación adecuada y nunca cortes PVC en el láser ni dejes máquinas térmicas desatendidas.'}
          </p>
        </div>
      </div>

      {/* Proyectos Relacionados */}
      {related.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-puma-dark">
            Otros Proyectos en esta Área
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/proyectos/${r.slug}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-puma-gold transition-colors flex items-center gap-3"
              >
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-puma-dark line-clamp-1">{r.title}</h4>
                  <span className="text-[10px] text-slate-500 capitalize">{r.level} · {r.estimatedTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
