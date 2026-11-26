import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6 max-w-md">
        <span className="text-6xl font-black text-puma-gold">404</span>
        <h1 className="text-2xl font-black text-puma-dark">Página no encontrada</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          La página que buscas no existe o ha sido movida. Puedes explorar nuestros recursos o volver a la página de inicio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary text-xs">
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </Link>
          <Link to="/explorar" className="btn-secondary text-xs">
            <Compass className="w-4 h-4" />
            <span>Explorar recursos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
