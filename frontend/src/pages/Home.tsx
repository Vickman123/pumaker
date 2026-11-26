import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { PlatformStats, Category, Resource, Project, LearningPath, Video } from '../types';
import { VideoModal } from '../components/VideoModal';
import { MakerLabHeroCanvas } from '../components/canvas/MakerLabHeroCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Compass,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Cpu,
  Box,
  Flame,
  Bot,
  Video as VideoIcon,
  Palette,
  Glasses,
  Code2,
  Recycle,
  FlaskConical,
  Play,
  Layers,
  Wrench,
  Calculator,
  Terminal,
  Activity,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Gauge,
  Sliders,
  Maximize2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

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

  // GSAP Intro & Reveal Animations with React Context Cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (titleLine1Ref.current && titleLine2Ref.current && subtitleRef.current && ctaGroupRef.current) {
        tl.fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
        )
          .fromTo(
            titleLine2Ref.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8 },
            '-=0.5'
          )
          .fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.4'
          )
          .fromTo(
            ctaGroupRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.3'
          )
          .fromTo(
            hudRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.2'
          );
      }

      // Scroll reveals for section titles
      const revealTitles = document.querySelectorAll('.lab-reveal-title');
      revealTitles.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, [loading]);

  const getAreaIcon = (slug: string) => {
    switch (slug) {
      case 'impresion-3d':
        return <Box className="w-5 h-5 text-lab-amber" />;
      case 'corte-laser':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'electronica':
        return <Cpu className="w-5 h-5 text-lab-cyan" />;
      case 'robotica':
        return <Bot className="w-5 h-5 text-lab-green" />;
      case 'audiovisual':
        return <VideoIcon className="w-5 h-5 text-amber-300" />;
      case 'diseno-digital':
        return <Palette className="w-5 h-5 text-pink-400" />;
      case 'inteligencia-artificial':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'tecnologias-inmersivas':
        return <Glasses className="w-5 h-5 text-sky-400" />;
      case 'programacion':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'sustentabilidad-diy':
        return <Recycle className="w-5 h-5 text-emerald-400" />;
      case 'ciencia-experimentacion':
        return <FlaskConical className="w-5 h-5 text-indigo-400" />;
      default:
        return <Wrench className="w-5 h-5 text-lab-amber" />;
    }
  };

  return (
    <div className="bg-lab-dark text-lab-white selection:bg-lab-amber selection:text-lab-dark min-h-screen">
      {/* 1. HERO — EXPERIENCIA INMERSIVA DIGITAL CREATIVE LAB */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-lab-surface pt-12 lg:pt-16"
      >
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F5B82E_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lab-amber/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-lab-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          {/* Columna Izquierda: Editorial Manifesto & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tech Tag / Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-lab-charcoal border border-lab-amber/30 text-lab-amber text-xs font-mono tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-lab-green animate-pulse" />
              <span>PC PUMA · UNAM · DIGITAL CREATIVE LAB</span>
            </div>

            {/* Título Monumental Asimétrico */}
            <div className="space-y-1">
              <h1
                ref={titleLine1Ref}
                className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-lab-white uppercase font-sans"
              >
                NO SOLO APRENDAS <br />
                A HACERLO.
              </h1>
              <span
                ref={titleLine2Ref}
                className="block text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-lab-amber via-yellow-200 to-amber-500 uppercase font-sans drop-shadow-sm"
              >
                HAZLO.
              </span>
            </div>

            {/* Subtítulo de Laboratorio */}
            <p
              ref={subtitleRef}
              className="text-sm sm:text-base text-lab-gray max-w-xl font-normal leading-relaxed"
            >
              <strong className="text-lab-white font-semibold">Aprende. Experimenta. Construye. Reinventa.</strong>{' '}
              PUMAKER es un espacio abierto para descubrir tecnología, experimentar con herramientas de fabricación digital y transformar ideas en proyectos reales.
            </p>

            {/* CTAs de Alto Impacto */}
            <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/explorar"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-lab-amber hover:bg-amber-400 text-lab-dark font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar Laboratorio</span>
              </Link>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-lab-charcoal hover:bg-lab-surface text-lab-white border border-lab-surface font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:border-lab-amber/40 active:scale-95"
              >
                <FolderGit2 className="w-4 h-4 text-lab-cyan" />
                <span>Iniciar mi Primer Proyecto</span>
              </Link>
            </div>

            {/* Terminal Blueprint Meta */}
            <div className="flex items-center gap-6 pt-4 text-[11px] font-mono text-lab-gray border-t border-lab-surface/80">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-lab-amber" />
                <span>OPEN_ACCESS: TRUE</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-lab-cyan" />
                <span>LATENCY: 0MS (NO_AUTH)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-lab-green" />
                <span>CC-BY-SA 4.0</span>
              </span>
            </div>
          </div>

          {/* Columna Derecha: Three.js Kinetic Maker Sculpture */}
          <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[520px] lg:h-[620px] flex items-center justify-center">
            {/* Marco de referencia blueprint */}
            <div className="absolute inset-0 border border-lab-surface/60 rounded-3xl pointer-events-none overflow-hidden">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-lab-gray/60 tracking-widest uppercase">
                [KINETIC_CORE // MESH_01]
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-lab-amber/70 tracking-widest uppercase">
                INTERACTIVE · 3D ORBIT
              </div>
              <span className="absolute top-2 right-2 text-lab-gray/30 text-xs font-mono">+</span>
              <span className="absolute bottom-2 left-2 text-lab-gray/30 text-xs font-mono">+</span>
            </div>

            {/* Canvas 3D */}
            <MakerLabHeroCanvas />
          </div>
        </div>

        {/* HUD Ticker inferior con datos reales */}
        <div
          ref={hudRef}
          className="w-full bg-lab-charcoal/90 border-t border-lab-surface py-3 px-4 sm:px-8 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-lab-gray">
            <div className="flex items-center gap-6">
              <span className="text-lab-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lab-amber" />
                TALLER EN LÍNEA:
              </span>
              <span>{stats?.totalResources || 46} Recursos Verificados</span>
              <span>•</span>
              <span>{stats?.totalProjects || 30} Proyectos Paso a Paso</span>
              <span>•</span>
              <span>{stats?.categoriesCount || 11} Áreas Maker</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-lab-amber">
              <span>UNAM · PROGRAMA PC PUMA</span>
              <span>[2026 // OPEN HARDWARE]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ÁREAS MAKER — EXPLORACIÓN ASIMÉTRICA EDITORIAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-lab-surface pb-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lab-amber flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>01. Nodos de Conocimiento Maker</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-lab-white uppercase lab-reveal-title">
              Áreas de Fabricación & Creación
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-lab-gray max-w-md">
            Espacios especializados de diseño, programación, corte, electrónica y manufactura aditiva sin requisitos previos.
          </p>
        </div>

        {/* Bento Grid Asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card Principal 1: Impresión 3D (Col 7) */}
          <Link
            to="/aprende/impresion-3d"
            className="md:col-span-7 group relative rounded-2xl border border-lab-surface bg-lab-charcoal overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:border-lab-amber/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-600/15 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Box className="w-5 h-5 text-blue-400" />
                </span>
                <span className="text-[11px] font-mono text-lab-gray tracking-wider uppercase">
                  [AREA_01 // FDM · SLA · PARAMETRIC]
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-lab-white group-hover:text-lab-amber transition-colors">
                Impresión 3D & Fabricación Aditiva
              </h3>
              <p className="text-xs sm:text-sm text-lab-gray max-w-lg leading-relaxed">
                De la idea a la pieza física. Modelado en OpenSCAD y FreeCAD, laminación G-code sin soportes, cálculo de tolerancias y mantenimiento de impresoras.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-lab-surface/80 relative z-10 text-xs">
              <span className="text-lab-gray font-mono">6 Proyectos Guiados · OpenSCAD · Cura</span>
              <span className="font-bold text-lab-amber flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Entrar al Taller <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card Principal 2: Corte Láser (Col 5) */}
          <Link
            to="/aprende/corte-laser"
            className="md:col-span-5 group relative rounded-2xl border border-lab-surface bg-lab-charcoal overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/10 min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-600/15 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-red-400" />
                </span>
                <span className="text-[11px] font-mono text-lab-gray tracking-wider uppercase">
                  [AREA_02 // CNC · KERF]
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-lab-white group-hover:text-red-400 transition-colors">
                Corte y Grabado Láser
              </h3>
              <p className="text-xs text-lab-gray leading-relaxed">
                Diseño vectorial con Inkscape, uniones dentadas sin pegamento compensando la sangría (*kerf*) y grabado de acrílico y madera.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-lab-surface/80 relative z-10 text-xs">
              <span className="text-lab-gray font-mono">6 Proyectos · SVG · Boxes.py</span>
              <span className="font-bold text-red-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explorar <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Card 3: Electrónica (Col 4) */}
          <Link
            to="/aprende/electronica"
            className="md:col-span-4 group relative rounded-2xl border border-lab-surface bg-lab-charcoal p-6 flex flex-col justify-between hover:border-lab-cyan/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="w-9 h-9 rounded-lg bg-lab-cyan/10 border border-lab-cyan/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-lab-cyan" />
              </span>
              <h3 className="text-lg font-bold text-lab-white group-hover:text-lab-cyan transition-colors">
                Electrónica & Microcontroladores
              </h3>
              <p className="text-xs text-lab-gray leading-relaxed">
                Circuitos, sensores, protoboard, Arduino y ESP32 con IoT y telemetría.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-mono text-lab-gray border-t border-lab-surface/80">
              <span>6 Proyectos</span>
              <ChevronRight className="w-4 h-4 text-lab-cyan group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Robótica (Col 4) */}
          <Link
            to="/aprende/robotica"
            className="md:col-span-4 group relative rounded-2xl border border-lab-surface bg-lab-charcoal p-6 flex flex-col justify-between hover:border-lab-green/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="w-9 h-9 rounded-lg bg-lab-green/10 border border-lab-green/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-lab-green" />
              </span>
              <h3 className="text-lg font-bold text-lab-white group-hover:text-lab-green transition-colors">
                Robótica & Mecatrónica
              </h3>
              <p className="text-xs text-lab-gray leading-relaxed">
                Seguidores de línea, brazos robóticos 4-DOF, rovers y robots sumo autónomos.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-mono text-lab-gray border-t border-lab-surface/80">
              <span>5 Proyectos</span>
              <ChevronRight className="w-4 h-4 text-lab-green group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Inteligencia Artificial & XR (Col 4) */}
          <Link
            to="/aprende/inteligencia-artificial"
            className="md:col-span-4 group relative rounded-2xl border border-lab-surface bg-lab-charcoal p-6 flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <span className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </span>
              <h3 className="text-lg font-bold text-lab-white group-hover:text-purple-400 transition-colors">
                Inteligencia Artificial & XR
              </h3>
              <p className="text-xs text-lab-gray leading-relaxed">
                Modelos de visión artificial con TensorFlow.js, WebXR y gemelos digitales con Three.js.
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-mono text-lab-gray border-t border-lab-surface/80">
              <span>3 Proyectos Web</span>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Mini-Tiles para las Áreas Restantes */}
          <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { title: 'Audiovisual', slug: 'audiovisual', icon: <VideoIcon className="w-4 h-4" /> },
              { title: 'Diseño Digital', slug: 'diseno-digital', icon: <Palette className="w-4 h-4" /> },
              { title: 'Cultura DIY & Reparación', slug: 'sustentabilidad-diy', icon: <Recycle className="w-4 h-4" /> },
              { title: 'Ciencia Ciudadana', slug: 'ciencia-experimentacion', icon: <FlaskConical className="w-4 h-4" /> }
            ].map((m, idx) => (
              <Link
                key={idx}
                to={`/aprende/${m.slug}`}
                className="p-3.5 rounded-xl border border-lab-surface bg-lab-charcoal/70 hover:bg-lab-surface flex items-center justify-between text-xs text-lab-gray hover:text-lab-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lab-amber">{m.icon}</span>
                  <span className="font-semibold">{m.title}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LEARNING PATHS — VISUAL PROGRESSION (ZERO TO HERO) */}
      <section className="py-20 bg-lab-charcoal/40 border-y border-lab-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lab-cyan flex items-center gap-1.5 mb-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>02. Progresión Continua</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-lab-white uppercase lab-reveal-title">
                Rutas de Aprendizaje Guiadas
              </h2>
            </div>
            <span className="font-mono text-xs text-lab-gray bg-lab-charcoal px-3 py-1.5 rounded-lg border border-lab-surface">
              ZERO → DISCOVER → DESIGN → BUILD → CREATE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.slice(0, 4).map((lp, idx) => (
              <div
                key={lp.id}
                className="rounded-2xl border border-lab-surface bg-lab-charcoal p-6 flex flex-col justify-between hover:border-lab-amber/40 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lab-amber/15 text-lab-amber border border-lab-amber/30 uppercase">
                      Ruta 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-lab-gray capitalize">{lp.level}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-lab-white group-hover:text-lab-amber transition-colors line-clamp-1">
                      {lp.title}
                    </h3>
                    <p className="text-xs text-lab-gray mt-1.5 line-clamp-2 leading-relaxed">
                      {lp.description}
                    </p>
                  </div>

                  {/* Pasos / Nodos conectores */}
                  <div className="space-y-2 pt-2 border-t border-lab-surface">
                    <span className="text-[10px] font-mono text-lab-gray uppercase block">Hitos de la ruta:</span>
                    <div className="flex items-center gap-1.5 text-xs text-lab-white">
                      <span className="w-2 h-2 rounded-full bg-lab-green" />
                      <span className="text-[11px] font-mono line-clamp-1">
                        {lp.steps?.[0]?.finalProject || lp.steps?.[0]?.title || 'Proyecto Integrador'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-lab-surface flex items-center justify-between text-xs">
                  <span className="text-lab-gray font-mono">{lp.estimatedHours ? `${lp.estimatedHours} horas` : '4 semanas'}</span>
                  <Link
                    to="/aprende"
                    className="font-bold text-lab-amber hover:underline flex items-center gap-1"
                  >
                    Ver Ruta <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECT SHOWCASE — EDITORIAL CREATIVE LAB GALLERY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-lab-surface pb-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lab-amber flex items-center gap-1.5 mb-1">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>03. Fichas Técnicas Reales</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-lab-white uppercase lab-reveal-title">
              Proyectos de Creación Paso a Paso
            </h2>
          </div>
          <Link
            to="/proyectos"
            className="text-xs font-mono font-bold text-lab-amber hover:underline flex items-center gap-1"
          >
            Ver catálogo completo (30 Proyectos) →
          </Link>
        </div>

        {/* Galería Asimétrica de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 6).map((proj, idx) => (
            <Link
              key={proj.id}
              to={`/proyectos/${proj.slug}`}
              className="group rounded-2xl border border-lab-surface bg-lab-charcoal overflow-hidden flex flex-col justify-between hover:border-lab-amber/40 transition-all duration-300 shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full bg-lab-surface overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lab-dark via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-lab-charcoal/90 text-lab-amber border border-lab-amber/30 backdrop-blur-sm">
                    {proj.category?.name || 'Taller Maker'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-lab-white">
                  <span className="capitalize">{proj.level}</span>
                  <span>{proj.estimatedTime}</span>
                </div>
              </div>

              <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-lab-white group-hover:text-lab-amber transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-lab-gray line-clamp-2 mt-1 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-lab-surface flex items-center justify-between text-xs">
                  <span className="text-lab-gray font-mono text-[11px] line-clamp-1">
                    {proj.software || 'Open Source'}
                  </span>
                  <span className="font-bold text-lab-amber flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Abrir Guía <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. MAKER TOOLBOX — HERRAMIENTAS INTERACTIVAS Y CALCULADORAS */}
      <section className="py-20 bg-lab-charcoal/60 border-t border-lab-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-lab-surface pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lab-green flex items-center gap-1.5 mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>04. Instrumentación & Cálculo de Taller</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-lab-white uppercase lab-reveal-title">
                Maker Toolbox & Simuladores
              </h2>
            </div>
            <Link
              to="/simuladores"
              className="text-xs font-mono font-bold text-lab-green hover:underline flex items-center gap-1"
            >
              Abrir los 8 calculadores en vivo →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Calculadora de Kerf Láser',
                slug: 'simuladores',
                desc: 'Compensa la sangría del rayo láser para que tus ensambles dentados encajen a presión sin pegamento.',
                tag: 'Corte Láser'
              },
              {
                title: 'Cálculo de Volumen y Peso 3D',
                slug: 'simuladores',
                desc: 'Determina los gramos exactos de filamento PLA/PETG y el tiempo de laminación para tu pieza.',
                tag: 'Impresión 3D'
              },
              {
                title: 'Generador de Cajas Paramétricas',
                slug: 'simuladores',
                desc: 'Calcula dimensiones de caras machihembradas según el grosor del triplay o MDF.',
                tag: 'Madera & CNC'
              },
              {
                title: 'Estimador de Costos de Taller',
                slug: 'simuladores',
                desc: 'Calcula el costo real por consumo eléctrico, desgaste de boquilla y amortización de máquina.',
                tag: 'Gestión Maker'
              }
            ].map((tool, tIdx) => (
              <Link
                key={tIdx}
                to={`/${tool.slug}`}
                className="group p-5 rounded-2xl border border-lab-surface bg-lab-charcoal hover:border-lab-green/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-lab-green bg-lab-green/10 border border-lab-green/20 px-2 py-0.5 rounded uppercase">
                    {tool.tag}
                  </span>
                  <h3 className="font-bold text-base text-lab-white group-hover:text-lab-green transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-lab-gray leading-relaxed">{tool.desc}</p>
                </div>
                <div className="pt-4 mt-3 border-t border-lab-surface flex items-center justify-between text-xs text-lab-green font-bold">
                  <span>Usar Herramienta</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VIDEOTECA — EXPERIENCE PLAYER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-lab-surface pb-6">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-lab-cyan flex items-center gap-1.5 mb-1">
              <VideoIcon className="w-3.5 h-3.5" />
              <span>05. Formación Audiovisual</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-lab-white uppercase lab-reveal-title">
              Videoteca Tecnológica
            </h2>
          </div>
          <Link
            to="/videoteca"
            className="text-xs font-mono font-bold text-lab-cyan hover:underline flex items-center gap-1"
          >
            Ver videoteca completa →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVideos.map((v) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="group cursor-pointer rounded-2xl border border-lab-surface bg-lab-charcoal overflow-hidden hover:border-lab-cyan/50 transition-all duration-300"
            >
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-lab-amber text-lab-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 text-white px-2 py-0.5 rounded">
                  {v.duration || 'Video'}
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-lab-white group-hover:text-lab-cyan transition-colors line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-[11px] text-lab-gray line-clamp-1">{v.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Video */}
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
