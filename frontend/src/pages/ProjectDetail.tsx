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
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Copy,
  Check,
  Lightbulb,
  ExternalLink,
  Code2,
  CheckSquare,
  Sparkles,
  Download
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span className="text-sm text-slate-500">Cargando guía paso a paso del proyecto...</span>
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

  const progressPercent = steps.length > 0 ? Math.round((completedSteps.length / steps.length) * 100) : 0;

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-3">
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
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Ficha técnica: Materiales, herramientas, software */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <strong className="text-puma-navy font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Layers className="w-4 h-4 text-puma-gold" />
              <span>Lista de Materiales (BOM):</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.materials}</p>
          </div>

          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <strong className="text-puma-navy font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Wrench className="w-4 h-4 text-puma-gold" />
              <span>Herramientas de Taller:</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.tools}</p>
          </div>

          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <strong className="text-puma-navy font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Cpu className="w-4 h-4 text-puma-gold" />
              <span>Software y Entorno:</span>
            </strong>
            <p className="text-slate-600 leading-relaxed">{project.software}</p>
          </div>
        </div>
      </div>

      {/* Barra de Progreso General */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-puma-gold" />
            <h2 className="text-lg font-bold text-puma-dark">
              Guía de Construcción y Pruebas Paso a Paso
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {completedSteps.length} de {steps.length} pasos completados ({progressPercent}%)
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Sigue las instrucciones, copia los códigos fuente, verifica los diagramas y comprueba el funcionamiento con la sección de validación técnica de cada etapa.
        </p>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-puma-gold to-emerald-500 h-2.5 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lista de Pasos Guiados Detallados */}
      <div className="space-y-6">
        {steps.map((st, idx) => {
          const stepNum = st.step || idx + 1;
          const isDone = completedSteps.includes(stepNum);

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                isDone
                  ? 'bg-slate-50/80 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-puma'
              }`}
            >
              {/* Encabezado del Paso */}
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-gradient-to-r from-slate-50/70 to-transparent">
                <div className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isDone ? 'bg-emerald-600 text-white' : 'bg-puma-navy text-puma-gold shadow-sm'
                  }`}>
                    {stepNum}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-puma-gold-dark block">
                      Paso {stepNum} de {steps.length}
                    </span>
                    <h3 className={`font-bold text-base sm:text-lg ${isDone ? 'line-through text-slate-500' : 'text-puma-dark'}`}>
                      {st.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => toggleStep(stepNum)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={isDone ? 'Marcar como pendiente' : 'Marcar como completado'}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{isDone ? '¡Completado!' : 'Marcar listo'}</span>
                </button>
              </div>

              {/* Cuerpo del Paso con Detalles, Diagramas, Código y Pruebas */}
              <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
                {/* 1. Descripción técnica detallada */}
                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {st.detail}
                </div>

                {/* 2. Diagrama o esquemático (si existe) */}
                {st.diagram && (
                  <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-inner">
                    <div className="text-[11px] font-bold text-puma-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Esquemático de Conexión / Mapeo de Pines</span>
                    </div>
                    <pre className="text-slate-300 leading-relaxed font-mono whitespace-pre">{st.diagram}</pre>
                  </div>
                )}

                {/* 3. Bloque de código real funcional con botón de copiar */}
                {st.code && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B1320] shadow-xl text-xs">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#070D16] border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-puma-gold" />
                        <span className="font-mono text-xs text-slate-300 font-semibold uppercase">
                          {st.codeLanguage || 'C++ / Arduino / Python / JS'}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(st.code!, idx)}
                        className="btn-primary !py-1 !px-3 text-[11px] flex items-center gap-1.5"
                        title="Copiar código al portapapeles"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-puma-dark" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Código</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed select-all">
                      <code>{st.code}</code>
                    </pre>
                  </div>
                )}

                {/* 4. SECCIÓN CÓMO PROBARLO Y VALIDARLO */}
                {st.testing && (
                  <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-4 text-xs text-emerald-950 space-y-1.5 shadow-sm">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900 uppercase tracking-wide text-[11px]">
                      <FlaskConical className="w-4 h-4 text-emerald-700" />
                      <span>Cómo Probarlo y Verificar que Funciona</span>
                    </div>
                    <p className="leading-relaxed text-emerald-900/90">
                      {st.testing}
                    </p>
                  </div>
                )}

                {/* 5. CONSEJO PRÁCTICO O SOLUCIÓN DE ERRORES (TROUBLESHOOTING) */}
                {st.tip && (
                  <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1.5 shadow-sm">
                    <div className="font-bold flex items-center gap-1.5 text-amber-900 uppercase tracking-wide text-[11px]">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Consejo Práctico y Solución de Fallas</span>
                    </div>
                    <p className="leading-relaxed text-amber-900/90">
                      {st.tip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resultado Esperado y Consejos de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-puma-dark uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Resultado Esperado de la Práctica</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {project.expectedResult}
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Consejos de Taller y Seguridad</span>
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
