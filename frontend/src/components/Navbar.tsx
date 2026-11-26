import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import {
  Menu,
  X,
  Search,
  Compass,
  GraduationCap,
  Tv,
  FolderGit2,
  Wrench,
  Cpu,
  Layers,
  Users,
  Info
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/', icon: null },
    { name: 'Explorar', path: '/explorar', icon: Compass },
    { name: 'Aprende', path: '/aprende', icon: GraduationCap },
    { name: 'Cursos', path: '/cursos', icon: GraduationCap },
    { name: 'Videoteca', path: '/videoteca', icon: Tv },
    { name: 'Proyectos', path: '/proyectos', icon: FolderGit2 },
    { name: 'Herramientas', path: '/herramientas', icon: Wrench },
    { name: 'Simuladores', path: '/simuladores', icon: Cpu },
    { name: 'Recursos', path: '/recursos', icon: Layers },
    { name: 'Comunidad', path: '/comunidad', icon: Users },
    { name: 'Acerca de', path: '/acerca', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-puma-dark/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Barra superior de identidad institucional */}
      <div className="bg-[#070E1A] py-1 border-b border-slate-800/80 px-4 text-xs font-medium text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-puma-gold font-semibold tracking-wide">UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">Programa PC PUMA</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Acceso 100% Público y Gratuito
            </span>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logotipo */}
          <Logo variant="light" />

          {/* Menú principal de escritorio */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-puma-navy text-puma-gold border border-puma-gold/30 shadow-sm'
                      : 'text-slate-200 hover:text-puma-gold hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Botón de búsqueda rápida y botón móvil */}
          <div className="flex items-center gap-3">
            <Link
              to="/explorar"
              className="hidden sm:flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
              title="Buscar en todo el catálogo"
            >
              <Search className="w-3.5 h-3.5 text-puma-gold" />
              <span>Buscar...</span>
              <kbd className="hidden md:inline bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">Ctrl+K</kbd>
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-800 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                    active
                      ? 'bg-puma-navy text-puma-gold border-l-4 border-puma-gold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-puma-gold" />}
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-xs font-semibold text-slate-400 hover:text-puma-gold"
              >
                Acceso Administrativo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
