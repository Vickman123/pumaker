import React, { useState } from 'react';
import { Resource } from '../types';
import { ExternalLink, Flag, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ReportLinkModal } from './ReportLinkModal';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-puma hover:shadow-puma-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div className="p-5 flex-1">
        {/* Cabecera de la tarjeta: Categoría y Nivel */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${resource.category?.color || '#2563EB'}15`,
              color: resource.category?.color || '#2563EB',
              borderColor: `${resource.category?.color || '#2563EB'}40`,
              borderWidth: '1px'
            }}
          >
            {resource.category?.name || 'Maker'}
          </span>
          <span className="text-[11px] font-medium text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded">
            Nivel: {resource.level}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-bold text-base text-puma-dark group-hover:text-puma-navy transition-colors mb-2 line-clamp-2">
          {resource.title}
        </h3>

        {/* Descripción */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Badges y metadatos */}
        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
          {resource.costType === 'gratuito' ? (
            <span className="badge-green">100% Gratuito</span>
          ) : (
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
              {resource.costType}
            </span>
          )}

          {resource.license && (
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
              {resource.license}
            </span>
          )}

          {resource.requiresRegistration ? (
            <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full">
              Requiere registro
            </span>
          ) : (
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              Sin registro
            </span>
          )}

          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase font-bold text-[10px]">
            {resource.language}
          </span>
        </div>

        {/* Autor e institución */}
        <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-between">
          <span className="truncate" title={resource.author}>Por: {resource.author}</span>
          {resource.institution && (
            <span className="text-slate-400 truncate max-w-[120px] text-right" title={resource.institution}>
              {resource.institution}
            </span>
          )}
        </div>
      </div>

      {/* Pie de tarjeta con acciones reales */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setShowReport(true)}
          className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors"
          title="Reportar enlace caído o desactualizado"
        >
          <Flag className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reportar enlace</span>
        </button>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs !py-1.5 !px-3 font-medium"
        >
          <span>Abrir recurso</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {showReport && (
        <ReportLinkModal
          resourceId={resource.id}
          resourceTitle={resource.title}
          resourceUrl={resource.url}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};
