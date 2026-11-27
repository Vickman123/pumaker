import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center select-none ${className}`}>
      <span className={`font-black text-2xl tracking-tight ${isLight ? 'text-white' : 'text-puma-dark'}`}>
        PUMA<span className="text-puma-gold">KER</span>
      </span>
    </Link>
  );
};
