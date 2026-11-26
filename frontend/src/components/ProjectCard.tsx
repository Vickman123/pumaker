import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Clock, Wrench, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  let stepsCount = 0;
  try {
    const parsed = JSON.parse(project.stepsJson || '[]');
    stepsCount = Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    stepsCount = 3;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-puma hover:shadow-puma-hover transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Imagen del proyecto */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Badge de Categoría y Nivel */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-puma-dark/90 backdrop-blur-sm text-puma-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-puma-gold/30">
            {project.category?.name || 'Maker'}
          </span>
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium capitalize px-2 py-0.5 rounded">
            {project.level}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 bg-puma-gold text-puma-dark p-1 rounded-full shadow-md" title="Proyecto Destacado">
            <Sparkles className="w-3.5 h-3.5 fill-puma-dark" />
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-medium drop-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-puma-gold" />
            {project.estimatedTime}
          </span>
          <span className="flex items-center gap-1 font-medium drop-shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-puma-gold" />
            {stepsCount} Pasos guiados
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-puma-dark group-hover:text-puma-navy transition-colors mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Licencia: {project.license}
          </span>
          <Link
            to={`/proyectos/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-puma-navy hover:text-puma-gold group-hover:translate-x-1 transition-all"
          >
            <span>Ver proyecto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
