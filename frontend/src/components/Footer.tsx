import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Heart, ShieldCheck, Sparkles, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-puma-dark text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Columna de identidad */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              <strong className="text-white">PUMAKER</strong> es la plataforma abierta de PC PUMA · UNAM para democratizar el conocimiento tecnológico, la cultura maker y la fabricación digital en México y América Latina.
            </p>
            <div className="text-xs text-puma-gold flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Aprende · Experimenta · Crea · Comparte</span>
            </div>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Contenidos gratuitos, recursos abiertos y herramientas libres</span>
            </div>
          </div>

          {/* Áreas de conocimiento */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-puma-gold pl-2">
              Áreas Maker
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/aprende/impresion-3d" className="hover:text-puma-gold transition-colors">Impresión 3D y Aditiva</Link></li>
              <li><Link to="/aprende/corte-laser" className="hover:text-puma-gold transition-colors">Corte y Grabado Láser</Link></li>
              <li><Link to="/aprende/electronica" className="hover:text-puma-gold transition-colors">Electrónica & Sensores</Link></li>
              <li><Link to="/aprende/robotica" className="hover:text-puma-gold transition-colors">Robótica & Mecatrónica</Link></li>
              <li><Link to="/aprende/audiovisual" className="hover:text-puma-gold transition-colors">Creación Audiovisual</Link></li>
              <li><Link to="/aprende/inteligencia-artificial" className="hover:text-puma-gold transition-colors">Inteligencia Artificial</Link></li>
              <li><Link to="/aprende/tecnologias-inmersivas" className="hover:text-puma-gold transition-colors">Realidad Virtual & WebXR</Link></li>
            </ul>
          </div>

          {/* Navegación y herramientas */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-puma-gold pl-2">
              Plataforma
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explorar" className="hover:text-puma-gold transition-colors">Buscador y Catálogo</Link></li>
              <li><Link to="/proyectos" className="hover:text-puma-gold transition-colors">30 Proyectos Paso a Paso</Link></li>
              <li><Link to="/videoteca" className="hover:text-puma-gold transition-colors">Videoteca Maker</Link></li>
              <li><Link to="/cursos" className="hover:text-puma-gold transition-colors">Cursos Abiertos</Link></li>
              <li><Link to="/simuladores" className="hover:text-puma-gold transition-colors">Calculadoras y Simuladores</Link></li>
              <li><Link to="/comunidad" className="hover:text-puma-gold transition-colors">Proponer Proyecto</Link></li>
            </ul>
          </div>

          {/* Institucional y Legal */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-puma-gold pl-2">
              Institucional
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/acerca" className="hover:text-puma-gold transition-colors">Acerca de PUMAKER</Link></li>
              <li><a href="https://pcpuma.unam.mx" target="_blank" rel="noopener noreferrer" className="hover:text-puma-gold transition-colors">PC PUMA Oficial ↗</a></li>
              <li><a href="https://www.unam.mx" target="_blank" rel="noopener noreferrer" className="hover:text-puma-gold transition-colors">Portal UNAM ↗</a></li>
              <li><Link to="/acerca#accesibilidad" className="hover:text-puma-gold transition-colors">Accesibilidad Web (WCAG 2.2)</Link></li>
              <li><Link to="/acerca#seguridad" className="hover:text-puma-gold transition-colors">Políticas de Privacidad</Link></li>
              <li className="pt-2">
                <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-puma-gold transition-colors text-[11px]">
                  <Lock className="w-3 h-3" />
                  <span>Acceso Administrativo</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior de derechos y créditos */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} PUMAKER · Una iniciativa de PC PUMA de la Universidad Nacional Autónoma de México.
          </p>
          <div className="flex items-center gap-1">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para la comunidad científica y tecnológica abierta.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
