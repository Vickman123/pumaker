import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { PlatformStats, Category, Resource, Project, LearningPath, Video } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { ProjectCard } from '../components/ProjectCard';
import { VideoModal } from '../components/VideoModal';
import {
  Compass,
  FolderGit2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Cpu,
  Tv,
  Box,
  Flame,
  Bot,
  Video as VideoIcon,
  Palette,
  Glasses,
  Code2,
  Recycle,
  FlaskConical,
  ShieldCheck,
  Play,
  Layers,
  Wrench
} from 'lucide-react';

export const Home: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, catsRes, resRes, projRes, pathsRes, vidsRes] = await Promise.all([
          api.getStats(),
          api.getCategories(),
          api.getResources({ featured: 'true', limit: '6' }),
          api.getProjects({ featured: 'true', limit: '6' }),
          api.getLearningPaths(),
          api.getVideos({ featured: 'true', limit: '4' })
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (catsRes.success) setCategories(catsRes.data);
        if (resRes.success) setFeaturedResources(resRes.data);
        if (projRes.success) setFeaturedProjects(projRes.data);
        if (pathsRes.success) setLearningPaths(pathsRes.data);
        if (vidsRes.success) setFeaturedVideos(vidsRes.data);
      } catch (err) {
        console.error('Error cargando datos de inicio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'impresion-3d': return <Box className="w-6 h-6 text-blue-500" />;
      case 'corte-laser': return <Flame className="w-6 h-6 text-red-500" />;
      case 'electronica': return <Cpu className="w-6 h-6 text-emerald-500" />;
      case 'robotica': return <Bot className="w-6 h-6 text-purple-500" />;
      case 'audiovisual': return <VideoIcon className="w-6 h-6 text-amber-500" />;
      case 'diseno-digital': return <Palette className="w-6 h-6 text-pink-500" />;
      case 'inteligencia-artificial': return <Sparkles className="w-6 h-6 text-indigo-500" />;
      case 'tecnologias-inmersivas': return <Glasses className="w-6 h-6 text-cyan-500" />;
      case 'programacion': return <Code2 className="w-6 h-6 text-sky-500" />;
      case 'sustentabilidad-diy': return <Recycle className="w-6 h-6 text-green-500" />;
      case 'ciencia-experimentacion': return <FlaskConical className="w-6 h-6 text-purple-600" />;
      default: return <Wrench className="w-6 h-6 text-puma-gold" />;
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO PRINCIPAL */}
      <section className="relative bg-gradient-to-b from-[#070E1A] via-puma-dark to-puma-navy text-white pt-16 pb-24 overflow-hidden border-b border-slate-800">
        {/* Gráfico decorativo de fondo tecnológico */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6A63B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-puma-gold/15 border border-puma-gold/30 text-puma-gold text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>PC PUMA · UNAM · Plataforma Abierta de Creación</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                EL CONOCIMIENTO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-puma-gold via-amber-200 to-puma-gold-light">
                  SE CONSTRUYE.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Un espacio abierto para aprender, experimentar y crear con tecnología. Descubre herramientas, proyectos paso a paso, tutoriales verificados y recursos abiertos para transformar tus ideas en realidad.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/explorar" className="btn-primary text-sm">
                  <Compass className="w-4 h-4" />
                  <span>Explorar recursos</span>
                </Link>
                <Link to="/proyectos" className="btn-secondary text-sm">
                  <FolderGit2 className="w-4 h-4" />
                  <span>Descubrir proyectos</span>
                </Link>
                <Link to="/aprende" className="btn-outline text-sm !border-slate-600 !text-slate-200 hover:!bg-slate-800/80">
                  <GraduationCap className="w-4 h-4" />
                  <span>Comenzar a aprender</span>
                </Link>
              </div>

              {/* Indicadores clave */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Público y Gratuito
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Sin registro obligatorio
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Prioridad Open Source & CC
                </span>
              </div>
            </div>

            {/* Panel visual de presentación maker */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/80 p-2 backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Laboratorio de Fabricación Digital y Robótica"
                  className="rounded-xl object-cover h-80 w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-puma-dark/90 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-bold text-puma-gold uppercase tracking-wider">Cultura Maker en la UNAM</span>
                    <h3 className="text-lg font-bold text-white">Fabricación Digital e Innovación Abierta</h3>
                    <p className="text-xs text-slate-300">Impresión 3D, Corte Láser, Robótica, IA y Tecnologías Inmersivas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESTADÍSTICAS REALES DESDE LA BASE DE DATOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-puma border border-slate-200/90 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl font-black text-puma-navy">
              {stats?.totalResources || 46}+
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recursos Curados
            </span>
          </div>
          <div>
            <span className="block text-3xl font-black text-puma-gold-dark">
              {stats?.totalProjects || 30}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Proyectos Paso a Paso
            </span>
          </div>
          <div>
            <span className="block text-3xl font-black text-emerald-600">
              {stats?.categoriesCount || 11}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Áreas Maker Especializadas
            </span>
          </div>
          <div>
            <span className="block text-3xl font-black text-purple-600">
              100%
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Acceso Libre y Gratuito
            </span>
          </div>
        </div>
      </section>

      {/* 3. EXPLORA LAS 11 GRANDES ÁREAS MAKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-puma-navy bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Especialidades Tecnológicas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-puma-dark mt-3">
            Explora las Áreas del Conocimiento Maker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Aprende desde los fundamentos físicos hasta el diseño digital y la programación de sistemas autónomos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/aprende/${cat.slug}`}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-puma-gold/60 shadow-sm hover:shadow-puma-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.slug)}
                </div>
                <h3 className="font-bold text-sm text-puma-dark group-hover:text-puma-navy transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-puma-navy group-hover:text-puma-gold transition-colors">
                <span>Ver guías y proyectos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. EMPIEZA DESDE CERO — RUTAS GUIADAS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                Paso a Paso
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-puma-dark mt-3">
                Empieza desde Cero: Rutas de Aprendizaje
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Rutas guiadas paso a paso sin registro obligatorio para dominar tu primera tecnología.
              </p>
            </div>
            <Link to="/aprende" className="btn-secondary text-xs self-start md:self-auto">
              <span>Ver todas las rutas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {learningPaths.slice(0, 4).map((path) => (
              <div key={path.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase bg-puma-gold/20 text-puma-dark px-2 py-0.5 rounded">
                      Ruta Maker
                    </span>
                    <span className="text-xs text-slate-500 font-medium">~{path.estimatedHours} horas</span>
                  </div>
                  <h3 className="font-bold text-base text-puma-dark mb-2">{path.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200 mb-4">
                    <strong>Pasos incluidos:</strong> {path.steps?.length || 4} etapas con práctica y proyecto final.
                  </div>
                </div>

                <Link
                  to={`/aprende/${path.category?.slug || 'impresion-3d'}`}
                  className="w-full btn-outline text-xs !py-2 text-center"
                >
                  Seguir esta ruta
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROYECTOS QUE PUEDES CONSTRUIR (30 PROYECTOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-puma-navy bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Fichas Técnicas Reales
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-puma-dark mt-3">
              Proyectos que Puedes Construir
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Explora más de 30 proyectos con lista de materiales, herramientas, software y pasos ilustrados.
            </p>
          </div>
          <Link to="/proyectos" className="btn-primary text-xs self-start md:self-auto">
            <span>Explorar los 30 proyectos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>

      {/* 6. VIDEOTECA DESTACADA */}
      <section className="bg-puma-dark text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-puma-gold bg-puma-gold/15 border border-puma-gold/30 px-3 py-1 rounded-full">
                Canales y Tutoriales Verificados
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Videoteca Educativa PUMAKER
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Selección de los mejores creadores de contenido técnico en YouTube sin enlaces falsos ni búsquedas engañosas.
              </p>
            </div>
            <Link to="/videoteca" className="btn-primary text-xs self-start md:self-auto">
              <Tv className="w-3.5 h-3.5" />
              <span>Ver videoteca completa</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-puma-gold/60 cursor-pointer transition-all group"
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-puma-gold text-puma-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-puma-dark ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {vid.duration}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-puma-gold uppercase tracking-wider block mb-1">
                    {vid.channelTitle}
                  </span>
                  <h3 className="font-bold text-xs text-white line-clamp-2 mb-2 group-hover:text-puma-gold transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HERRAMIENTAS Y SIMULADORES DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-puma-navy via-slate-900 to-puma-dark rounded-2xl p-8 sm:p-12 text-white border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-puma-gold bg-puma-gold/15 border border-puma-gold/30 px-3 py-1 rounded-full">
                Interactividad en Vivo
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Calculadoras y Simuladores Interactivos Maker
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Prueba nuestras 8 herramientas nativas para estimar volumen de piezas 3D, calcular costos de producción, compensar el kerf del láser, generar cajas con dedos paramétricos y verificar el checklist de impresión.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/simuladores" className="btn-primary text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Abrir Simuladores y Calculadoras</span>
                </Link>
                <Link to="/herramientas" className="btn-secondary text-xs">
                  <Wrench className="w-4 h-4" />
                  <span>Catálogo de Software Libre</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-32 h-32 rounded-2xl bg-puma-gold/10 border border-puma-gold/30 flex items-center justify-center p-6 text-puma-gold shadow-gold-glow animate-pulse">
                <Cpu className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECURSOS ABIERTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-puma-navy bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Biblioteca Abierta
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-puma-dark mt-3">
              Recursos y Tutoriales Destacados
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Plataformas, manuales, software y librerías verificadas para tu aprendizaje.
            </p>
          </div>
          <Link to="/explorar" className="btn-outline text-xs self-start md:self-auto">
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* Video Modal si hay un video activo */}
      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          channelTitle={activeVideo.channelTitle}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};
