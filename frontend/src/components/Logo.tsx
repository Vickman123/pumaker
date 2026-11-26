import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Símbolo geométrico original: Hexágono constructivo maker entrelazado con cubo */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base geométrica */}
          <path
            d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z"
            className={isLight ? "stroke-puma-gold fill-puma-navy/60" : "stroke-puma-gold fill-puma-navy"}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Líneas isométricas de construcción tecnológica */}
          <path
            d="M18 3V18M18 18L31 10.5M18 18L5 10.5M18 18V33"
            stroke="#D6A63B"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Nodo central de innovación */}
          <circle cx="18" cy="18" r="3" fill="#D6A63B" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-xl tracking-tight ${isLight ? 'text-white' : 'text-puma-dark'}`}>
            PUMA<span className="text-puma-gold">KER</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1 py-0.5 rounded bg-puma-gold/20 text-puma-gold border border-puma-gold/30">
            UNAM
          </span>
        </div>
        <span className={`text-[10px] font-medium tracking-wider uppercase ${isLight ? 'text-slate-300' : 'text-puma-muted'}`}>
          PC PUMA · Fabricación & Innovación
        </span>
      </div>
    </Link>
  );
};
