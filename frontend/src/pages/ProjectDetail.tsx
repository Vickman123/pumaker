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
  BookOpen,
  HelpCircle,
  Award,
  ListChecks,
  BrainCircuit,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'steps' | 'fundamentals' | 'workspace' | 'troubleshooting' | 'challenges' | 'rubric'>('steps');
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const res = await api.getProjectBySlug(slug);
        if (res.success && res.data) {
          setProject(res.data);
          setRelated(res.related || []);

          // Cargar progreso persistente de LocalStorage
          try {
            const savedSteps = localStorage.getItem(`pumaker_steps_${res.data.slug}`);
            if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));
            const savedChecklist = localStorage.getItem(`pumaker_checklist_${res.data.slug}`);
            if (savedChecklist) setChecklist(JSON.parse(savedChecklist));
          } catch (e) {
            console.error('Error al leer LocalStorage', e);
          }
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
    const updated = completedSteps.includes(stepNum)
      ? completedSteps.filter((s) => s !== stepNum)
      : [...completedSteps, stepNum];
    setCompletedSteps(updated);
    if (project?.slug) {
      try {
        localStorage.setItem(`pumaker_steps_${project.slug}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleChecklistItem = (itemId: string) => {
    const updated = checklist.includes(itemId)
      ? checklist.filter((id) => id !== itemId)
      : [...checklist, itemId];
    setChecklist(updated);
    if (project?.slug) {
      try {
        localStorage.setItem(`pumaker_checklist_${project.slug}`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleStepExpand = (stepNum: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
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
        <span className="text-sm text-slate-500">Cargando experiencia de aprendizaje PUMAKER...</span>
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

  const pedagogy = project.pedagogy;
  const progressPercent = steps.length > 0 ? Math.round((completedSteps.length / steps.length) * 100) : 0;

  // Contador total de checklist
  const totalWorkspaceItems =
    (pedagogy?.workspaceChecklist?.materials?.length || 0) +
    (pedagogy?.workspaceChecklist?.tools?.length || 0) +
    (pedagogy?.workspaceChecklist?.software?.length || 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Botón Volver */}
      <Link
        to="/proyectos"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-puma-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al catálogo de proyectos</span>
      </Link>

      {/* Cabecera del Proyecto con Imagen e Identidad */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-puma overflow-hidden">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-3 w-full">
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
                <span className="bg-emerald-500/30 backdrop-blur-sm text-emerald-200 text-[11px] font-medium px-2.5 py-0.5 rounded border border-emerald-400/30">
                  {project.license}
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

        {/* Ficha técnica rápida de taller */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <strong className="text-puma-navy font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <Layers className="w-4 h-4 text-puma-gold" />
              <span>Materiales Requeridos:</span>
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

      {/* Barra de Progreso Persistente (LocalStorage) */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-puma-gold" />
            <h2 className="text-base sm:text-lg font-bold text-puma-dark">
              Tu Progreso en el Proyecto
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {completedSteps.length} de {steps.length} etapas completadas ({progressPercent}%)
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-puma-gold to-emerald-500 h-3 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>El progreso se guarda automáticamente en tu navegador.</span>
          {progressPercent === 100 && (
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ¡Proyecto Completado!
            </span>
          )}
        </div>
      </div>

      {/* Navegación por Pestañas Pedagógicas */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'steps'
              ? 'bg-puma-navy text-puma-gold shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>Etapas Paso a Paso ({steps.length})</span>
        </button>

        {pedagogy && (
          <>
            <button
              onClick={() => setActiveTab('fundamentals')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'fundamentals'
                  ? 'bg-puma-navy text-puma-gold shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Fundamentos & STEAM</span>
            </button>

            <button
              onClick={() => setActiveTab('workspace')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'workspace'
                  ? 'bg-puma-navy text-puma-gold shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Checklist de Espacio ({checklist.length}/{totalWorkspaceItems})</span>
            </button>

            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'troubleshooting'
                  ? 'bg-puma-navy text-puma-gold shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Solución de Fallas ({pedagogy.troubleshooting?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'challenges'
                  ? 'bg-puma-navy text-puma-gold shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Retos de Personalización</span>
            </button>

            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'rubric'
                  ? 'bg-puma-navy text-puma-gold shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Rúbrica & Evaluación</span>
            </button>
          </>
        )}
      </div>

      {/* CONTENIDO DE LA PESTAÑA: ETAPAS PASO A PASO */}
      {activeTab === 'steps' && (
        <div className="space-y-6">
          {steps.map((st, idx) => {
            const stepNum = st.step || idx + 1;
            const isDone = completedSteps.includes(stepNum);
            const isExpanded = expandedSteps.includes(stepNum);

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
                  <div
                    className="flex items-start gap-3.5 cursor-pointer flex-grow"
                    onClick={() => toggleStepExpand(stepNum)}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-puma-navy text-puma-gold shadow-sm'
                      }`}
                    >
                      {stepNum}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-puma-gold-dark">
                          Etapa {stepNum} de {steps.length}
                        </span>
                        {st.stageTime && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-puma-gold" />
                            {st.stageTime}
                          </span>
                        )}
                        {st.conceptLearned && (
                          <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
                            Aprenderás: {st.conceptLearned}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-bold text-base sm:text-lg flex items-center gap-2 ${
                          isDone ? 'line-through text-slate-500' : 'text-puma-dark'
                        }`}
                      >
                        {st.title}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStep(stepNum)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 ${
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

                {/* Cuerpo del Paso con Detalles Pedagógicos */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6 text-xs sm:text-sm">
                    {/* Objetivo de la etapa */}
                    {st.stageObjective && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-puma-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[11px] font-bold text-puma-navy uppercase tracking-wider block">
                            Objetivo de esta Etapa:
                          </strong>
                          <p className="text-slate-700 text-xs mt-0.5">{st.stageObjective}</p>
                        </div>
                      </div>
                    )}

                    {/* Descripción técnica detallada */}
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line bg-white">
                      {st.detail}
                    </div>

                    {/* ¿Por qué lo hacemos? */}
                    {st.whyDoWeDoIt && (
                      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 space-y-1">
                        <strong className="text-blue-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                          <span>¿Por qué lo hacemos de esta forma?</span>
                        </strong>
                        <p className="text-slate-700 text-xs leading-relaxed">{st.whyDoWeDoIt}</p>
                      </div>
                    )}

                    {/* Diagrama o esquemático */}
                    {st.diagram && (
                      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-inner">
                        <div className="text-[11px] font-bold text-puma-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Esquema Técnico de Medidas y Geometría</span>
                        </div>
                        <pre className="text-slate-300 leading-relaxed font-mono whitespace-pre select-all">
                          {st.diagram}
                        </pre>
                      </div>
                    )}

                    {/* Bloque de código real funcional con botón de copiar */}
                    {st.code && (
                      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B1320] shadow-xl text-xs">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#070D16] border-b border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-puma-gold" />
                            <span className="font-mono text-xs text-slate-300 font-semibold uppercase">
                              {st.codeLanguage || 'OpenSCAD / Código Fuente'}
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

                    {/* Cómo Probarlo y Validarlo */}
                    {st.testing && (
                      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-4 text-xs text-emerald-950 space-y-1.5 shadow-sm">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-900 uppercase tracking-wide text-[11px]">
                          <FlaskConical className="w-4 h-4 text-emerald-700" />
                          <span>Cómo Probarlo y Verificar que Funciona</span>
                        </div>
                        <p className="leading-relaxed text-emerald-900/90">{st.testing}</p>
                      </div>
                    )}

                    {/* Errores comunes y soluciones */}
                    {st.commonErrors && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs">
                          <strong className="text-red-900 font-bold uppercase tracking-wider block mb-1">
                            Error Frecuente:
                          </strong>
                          <p className="text-red-800/90 leading-relaxed">{st.commonErrors}</p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs">
                          <strong className="text-emerald-900 font-bold uppercase tracking-wider block mb-1">
                            Solución Concreta:
                          </strong>
                          <p className="text-emerald-800/90 leading-relaxed">{st.errorSolution}</p>
                        </div>
                      </div>
                    )}

                    {/* Consejo Profesional */}
                    {(st.professionalTip || st.tip) && (
                      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1.5 shadow-sm">
                        <div className="font-bold flex items-center gap-1.5 text-amber-900 uppercase tracking-wide text-[11px]">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Consejo Profesional Maker</span>
                        </div>
                        <p className="leading-relaxed text-amber-900/90">
                          {st.professionalTip || st.tip}
                        </p>
                      </div>
                    )}

                    {/* Evidencia de progreso */}
                    {st.progressEvidence && (
                      <div className="text-[11px] text-slate-500 font-medium border-t border-slate-100 pt-3 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-puma-gold" />
                        <span>Evidencia al terminar la etapa: <strong>{st.progressEvidence}</strong></span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: FUNDAMENTOS & STEAM */}
      {activeTab === 'fundamentals' && pedagogy && (
        <div className="space-y-6">
          {/* Módulo 00: Introducción & Motivación */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-puma-gold" />
              <span>Módulo 00 — Propósito y Aplicación Real</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {pedagogy.objectiveGeneral}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <strong className="text-puma-navy block font-bold">Perfil del Estudiante:</strong>
              <p className="text-slate-600">{pedagogy.studentProfile}</p>
            </div>
          </div>

          {/* Objetivos de Aprendizaje Medibles */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-puma-dark flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>Objetivos de Aprendizaje Medibles</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {pedagogy.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competencias STEAM Desarrolladas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-base text-puma-dark flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-600" />
              <span>Competencias STEAM Desarrolladas</span>
            </h3>
            <div className="space-y-2 text-xs">
              {pedagogy.steamCompetencies.map((comp, i) => (
                <div key={i} className="bg-blue-50/60 p-3 rounded-lg border border-blue-200 text-slate-800 leading-relaxed">
                  {comp}
                </div>
              ))}
            </div>
          </div>

          {/* Módulo 01: Conceptos Fundamentales desde Cero */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-puma-gold" />
              <span>Módulo 01 — Fundamentos Explicados desde Cero</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pedagogy.fundamentals.map((f, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-puma-gold-dark bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                    Concepto {i + 1}
                  </span>
                  <h4 className="font-bold text-sm text-puma-dark">{f.term}</h4>
                  
                  <div className="space-y-1.5">
                    <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">En palabras sencillas:</strong>
                    <p className="text-slate-600">{f.simpleDef}</p>
                  </div>

                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Analogía:</strong>
                    <p className="text-slate-600 italic">"{f.analogy}"</p>
                  </div>

                  <div className="space-y-1.5">
                    <strong className="text-slate-900 block text-[11px] uppercase tracking-wider">Definición Técnica:</strong>
                    <p className="text-slate-600">{f.technicalDef}</p>
                  </div>

                  <div className="text-blue-900 bg-blue-50/70 p-2.5 rounded-lg border border-blue-200">
                    <strong>Aplicación en el proyecto:</strong> {f.application}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elementos Didácticos Complementarios */}
          {pedagogy.didacticElements && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {pedagogy.didacticElements.didYouKnow && (
                <div className="bg-amber-50/80 p-5 rounded-xl border border-amber-200 space-y-2">
                  <strong className="font-bold text-amber-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>¿Sabías que...?</span>
                  </strong>
                  <p className="text-amber-900/90 leading-relaxed">{pedagogy.didacticElements.didYouKnow}</p>
                </div>
              )}

              {pedagogy.didacticElements.realWorldExample && (
                <div className="bg-blue-50/80 p-5 rounded-xl border border-blue-200 space-y-2">
                  <strong className="font-bold text-blue-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span>Aplicación en la Industria Real</span>
                  </strong>
                  <p className="text-blue-900/90 leading-relaxed">{pedagogy.didacticElements.realWorldExample}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: CHECKLIST DE ESPACIO Y MATERIALES */}
      {activeTab === 'workspace' && pedagogy && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <Wrench className="w-5 h-5 text-puma-gold" />
              <span>Módulo 02 — Prepara tu Espacio de Trabajo</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Marca las casillas conforme tengas listos los elementos en tu mesa de taller. Tu avance se guarda en tu navegador.
            </p>
          </div>

          {/* 1. Materiales */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-puma-navy uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-puma-gold" />
              <span>1. Materiales Requeridos</span>
            </h4>
            <div className="space-y-3">
              {pedagogy.workspaceChecklist.materials.map((m, i) => {
                const itemId = `mat_${i}`;
                const isChecked = checklist.includes(itemId);
                return (
                  <div
                    key={i}
                    onClick={() => toggleChecklistItem(itemId)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                      isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between">
                        <strong className={`font-bold ${isChecked ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                          {m.item}
                        </strong>
                        <span className="text-[11px] text-slate-500">{m.specs}</span>
                      </div>
                      <p className="text-slate-600">{m.why}</p>
                      {m.alternative && (
                        <p className="text-[11px] text-blue-700">
                          <strong>Alternativa económica:</strong> {m.alternative}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Herramientas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-puma-navy uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-puma-gold" />
              <span>2. Herramientas de Taller</span>
            </h4>
            <div className="space-y-3">
              {pedagogy.workspaceChecklist.tools.map((t, i) => {
                const itemId = `tool_${i}`;
                const isChecked = checklist.includes(itemId);
                return (
                  <div
                    key={i}
                    onClick={() => toggleChecklistItem(itemId)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                      isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between">
                        <strong className={`font-bold ${isChecked ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                          {t.item}
                        </strong>
                        <span className="text-[11px] text-slate-500">{t.specs}</span>
                      </div>
                      <p className="text-slate-600">{t.why}</p>
                      {t.alternative && (
                        <p className="text-[11px] text-blue-700">
                          <strong>Alternativa:</strong> {t.alternative}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Software Open Source */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-puma-navy uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-puma-gold" />
              <span>3. Software y Entorno Digital (Gratuito / Open Source)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pedagogy.workspaceChecklist.software.map((s, i) => {
                const itemId = `soft_${i}`;
                const isChecked = checklist.includes(itemId);
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-all text-xs space-y-2 ${
                      isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleChecklistItem(itemId)}
                          className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                        <strong className="font-bold text-slate-900 text-sm">{s.name}</strong>
                      </div>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-puma-gold font-bold hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Sitio Oficial <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <span className="text-[11px] text-slate-500 block">{s.version} · {s.platform}</span>
                    <p className="text-slate-600 leading-relaxed">{s.installGuide}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: SOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING) */}
      {activeTab === 'troubleshooting' && pedagogy?.troubleshooting && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-puma-gold" />
              <span>Guía de Diagnóstico y Depuración Técnica (Troubleshooting)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              En la fabricación aditiva y el mundo maker los errores son parte natural del aprendizaje. Consulta esta tabla ante cualquier comportamiento anómalo.
            </p>
          </div>

          <div className="space-y-4">
            {pedagogy.troubleshooting.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.problem}</h4>
                    <span className="text-[11px] text-slate-500">Causa principal: {item.cause}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold text-[11px] uppercase tracking-wider">
                      ¿Cómo comprobarlo en tu máquina?
                    </strong>
                    <p className="text-slate-600 leading-relaxed">{item.check}</p>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-lg border border-emerald-200 space-y-1">
                    <strong className="text-emerald-950 block font-bold text-[11px] uppercase tracking-wider">
                      Acción Correctiva Concreta:
                    </strong>
                    <p className="text-emerald-900/90 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: RETOS DE PERSONALIZACIÓN */}
      {activeTab === 'challenges' && pedagogy?.challenges && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <Award className="w-5 h-5 text-puma-gold" />
              <span>Retos de Personalización y Autonomía</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Una vez terminado el modelo base, pon a prueba tus habilidades resolviendo estos tres niveles de desafío progresivo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {pedagogy.challenges.map((ch, idx) => {
              const badgeColors =
                idx === 0
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : idx === 1
                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                  : 'bg-red-100 text-red-800 border-red-200';

              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${badgeColors}`}>
                      {ch.level}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Validación práctica obligatoria</span>
                  </div>
                  <h4 className="font-bold text-base text-puma-dark">{ch.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{ch.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <strong className="text-puma-navy block text-[11px] uppercase tracking-wider mb-1">
                        Objetivo Técnico:
                      </strong>
                      <p className="text-slate-600">{ch.objective}</p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                      <strong className="text-emerald-900 block text-[11px] uppercase tracking-wider mb-1">
                        Criterio de Validación:
                      </strong>
                      <p className="text-emerald-800">{ch.validation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTENIDO DE LA PESTAÑA: RÚBRICA Y EVALUACIÓN */}
      {activeTab === 'rubric' && pedagogy?.rubric && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-lg text-puma-dark flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-puma-gold" />
              <span>Rúbrica de Evaluación de Competencias Maker</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Utiliza esta rúbrica para auto-evaluar tu nivel de dominio técnico antes de dar por concluida la práctica.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-puma-navy text-white">
                  <th className="p-3.5 font-bold uppercase tracking-wider">Criterio de Evaluación</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-amber-300">Inicial</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-blue-200">Logrado (Meta)</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-emerald-300">Avanzado (Sobresaliente)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {pedagogy.rubric.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-puma-dark bg-slate-50/60">{r.criteria}</td>
                    <td className="p-3.5 bg-amber-50/30 text-slate-600">{r.initial}</td>
                    <td className="p-3.5 bg-blue-50/30 text-slate-800 font-medium">{r.achieved}</td>
                    <td className="p-3.5 bg-emerald-50/30 text-emerald-950 font-semibold">{r.advanced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Revisión Final */}
          {pedagogy.finalReview && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-base text-puma-dark flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-puma-gold" />
                <span>Lo que construiste y cómo funciona</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {pedagogy.finalReview.whatYouBuilt}
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <strong className="text-puma-navy font-bold block">Fundamento de Física Aplicada:</strong>
                <p className="text-slate-600 leading-relaxed">{pedagogy.finalReview.howItWorks}</p>
              </div>

              <div className="space-y-2 pt-2">
                <strong className="text-puma-dark font-bold text-xs uppercase tracking-wider block">
                  Habilidades Adquiridas y Consolidadas:
                </strong>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {pedagogy.finalReview.whatYouLearned.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Galería Visual Técnica del Proyecto (3 Imágenes Clave) */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base sm:text-lg text-puma-dark flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-puma-gold" />
              <span>Galería Visual y Fases de Construcción ({project.gallery.length} perspectivas)</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">Modelado · Fabricación · Prototipo Final</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.gallery.map((imgUrl, gIdx) => (
              <div key={gIdx} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-sm">
                <img
                  src={imgUrl}
                  alt={`Fase ${gIdx + 1} - ${project.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white drop-shadow">
                    {gIdx === 0 ? '1. Geometría y Modelo CAD' : gIdx === 1 ? '2. Proceso y Fabricación' : '3. Prototipo en Uso Real'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advertencia de Seguridad en Taller */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-2">
        <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Protocolo de Seguridad Física en el Taller de Impresión 3D</span>
        </h3>
        <p className="text-xs text-amber-950/90 leading-relaxed">
          {pedagogy?.didacticElements?.safetyCaution || project.tips ||
            'La boquilla alcanza 205°C y la cama 60°C: evita contacto directo durante la operación. Al retirar piezas con la espátula, empuja siempre en dirección opuesta a tu cuerpo y mantén una buena ventilación ambiental.'}
        </p>
      </div>

      {/* Proyectos Relacionados / Próximos Pasos */}
      {related.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-puma-dark">
              Próximos Pasos: Continúa tu Ruta de Fabricación Aditiva
            </h3>
            <Link to="/proyectos" className="text-xs text-puma-gold font-bold hover:underline">
              Ver todos los 30 proyectos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/proyectos/${r.slug}`}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-puma-gold transition-colors flex items-center gap-3 shadow-sm"
              >
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-puma-dark line-clamp-1">{r.title}</h4>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {r.level} · {r.estimatedTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
