import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Course } from '../types';
import { GraduationCap, ExternalLink, Clock, Award } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <GraduationCap className="w-4 h-4 text-puma-gold" />
          <span>Formación Continua</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Cursos Abiertos y Gratuitos
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Cursos estructurados para profundizar en programación, robótica, IA, modelado 3D y electrónica sin costos de inscripción.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando cursos...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-puma hover:shadow-puma-hover transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {c.platform}
                  </span>
                  <span className="text-xs text-slate-500 font-medium capitalize">
                    {c.level}
                  </span>
                </div>

                <h3 className="font-bold text-base text-puma-dark mb-2">{c.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {c.description}
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mb-4">
                  {c.duration && (
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-puma-gold" />
                      {c.duration}
                    </span>
                  )}
                  {c.certificateOffered && (
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      <Award className="w-3.5 h-3.5" />
                      Certificado gratuito
                    </span>
                  )}
                  <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 uppercase font-semibold">
                    {c.language}
                  </span>
                </div>
              </div>

              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs !py-2 flex items-center justify-center gap-1.5"
              >
                <span>Acceder al curso</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
