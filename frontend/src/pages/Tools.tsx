import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Tool } from '../types';
import { Wrench, ExternalLink, CheckCircle } from 'lucide-react';

export const Tools: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await api.getTools();
        if (res.success) setTools(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <Wrench className="w-4 h-4 text-puma-gold" />
          <span>Software Libre y Herramientas Maker</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Herramientas y Software Abierto
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Catálogo curado de programas libres para modelado 3D, diseño vectorial, laminadores, diseño de PCB y edición multimedia.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando software...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-puma hover:shadow-puma-hover transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {t.licenseType}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {t.platform}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-puma-dark mb-1">{t.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  {t.isOpenSource && (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Open Source
                    </span>
                  )}
                  {t.isFree && (
                    <span className="flex items-center gap-1 text-blue-600 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Gratuito
                    </span>
                  )}
                </div>
              </div>

              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs !py-2 flex items-center justify-center gap-1.5"
              >
                <span>Descargar / Sitio Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
