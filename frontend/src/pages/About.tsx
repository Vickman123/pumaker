import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, Lock, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-puma-navy bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          Identidad Institucional
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-puma-dark mt-3">
          Acerca de PUMAKER
        </h1>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          Una iniciativa educativa del Programa PC PUMA de la Universidad Nacional Autónoma de México.
        </p>
      </div>

      {/* Misión y Principios */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-puma space-y-6">
        <div className="flex items-center gap-2 text-puma-navy font-bold text-lg">
          <Sparkles className="w-5 h-5 text-puma-gold" />
          <span>Aprende · Experimenta · Crea · Comparte</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>PUMAKER</strong> nace de la convicción de que el conocimiento tecnológico y la fabricación digital deben ser un bien público accesible a cualquier persona interesada en aprender. Como iniciativa de <strong>PC PUMA · UNAM</strong>, el portal busca tender un puente entre la educación formal y la cultura hacedora (maker), promoviendo la experimentación práctica, el pensamiento crítico y el desarrollo de habilidades tecnológicas sin costo alguno.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <strong className="text-xs font-bold text-puma-dark uppercase flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-puma-gold" />
              <span>Acceso Público</span>
            </strong>
            <p className="text-xs text-slate-600">
              No se establecen barreras de pago ni es necesario registrarse para consultar el catálogo completo, tutoriales o calculadoras.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-xs font-bold text-puma-dark uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cultura Abierta</span>
            </strong>
            <p className="text-xs text-slate-600">
              Priorizamos software de código abierto (Open Source), licencias Creative Commons y herramientas que no requieran suscripción forzosa.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-xs font-bold text-puma-dark uppercase flex items-center gap-1.5">
              <Users className="w-4 h-4 text-puma-navy" />
              <span>Rigor y Verificación</span>
            </strong>
            <p className="text-xs text-slate-600">
              No inventamos enlaces, estadísticas ni cursos falsos. Cada enlace es validado y cualquier anomalía puede ser reportada por la comunidad.
            </p>
          </div>
        </div>
      </div>

      {/* Declaración de Accesibilidad Web (WCAG 2.2 AA) */}
      <div id="accesibilidad" className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
        <h2 className="text-lg font-bold text-puma-dark flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Compromiso con la Accesibilidad Web (WCAG 2.2 Nivel AA)</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          PUMAKER ha sido diseñado y desarrollado siguiendo los estándares del Consorcio World Wide Web (W3C) para garantizar la inclusión digital de personas con diversas capacidades:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Contraste de color superior a 4.5:1 en todos los textos legibles.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Navegación completa y accesible mediante teclado (foco visible y orden lógico).
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Semántica HTML5 nativa con encabezados ordenados y regiones ARIA.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Textos alternativos (alt) descriptivos en todas las imágenes de proyectos.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Diseño completamente adaptable y ergonómico para dispositivos móviles y tabletas.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Respeto a las preferencias del sistema de reducción de movimiento.
          </li>
        </ul>
      </div>

      {/* Políticas de Seguridad y Privacidad */}
      <div id="seguridad" className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-puma-dark flex items-center gap-2">
          <Lock className="w-5 h-5 text-puma-navy" />
          <span>Seguridad Informática y Privacidad de Datos</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          La plataforma implementa cabeceras HTTP seguras (Helmet), protección contra Cross-Site Scripting (XSS), políticas de CORS controladas y sanitización de formularios. El portal público no almacena cookies de rastreo comercial ni expone datos personales de los usuarios.
        </p>
      </div>
    </div>
  );
};
