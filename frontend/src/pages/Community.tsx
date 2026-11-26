import React, { useState } from 'react';
import { api } from '../services/api';
import { Users, Send, CheckCircle2, Calendar, Sparkles } from 'lucide-react';

export const Community: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    authorEmail: '',
    categoryId: '',
    description: '',
    projectUrl: ''
  });
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await api.submitProject(formData);
      if (res.success) {
        setStatusMsg({
          type: 'success',
          text: '¡Propuesta enviada con éxito! Será revisada por el equipo de moderación antes de publicarse.'
        });
        setFormData({
          title: '',
          authorName: '',
          authorEmail: '',
          categoryId: '',
          description: '',
          projectUrl: ''
        });
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Error al enviar la propuesta' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <Users className="w-4 h-4 text-puma-gold" />
          <span>Comunidad Maker Universitaria</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Comunidad, Talleres y Proyectos Compartidos
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Comparte tus creaciones tecnológicas, participa en retos maker y asiste a sesiones prácticas presenciales y virtuales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario de Propuesta de Proyecto con Moderación */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-puma space-y-6">
          <div>
            <h2 className="text-xl font-bold text-puma-dark">
              Proponer un Proyecto o Recurso a la Comunidad
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Todos los envíos pasan por un proceso de revisión y moderación por el equipo de PC PUMA antes de su publicación para asegurar calidad y rigor técnico.
            </p>
          </div>

          {statusMsg && (
            <div className={`p-4 rounded-lg text-xs font-semibold flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Proyecto *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ejemplo: Monitor de CO2 escolar con ESP32"
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre o Equipo *</label>
                <input
                  type="text"
                  required
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="Tu nombre o seudónimo maker"
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Correo de Contacto *</label>
                <input
                  type="email"
                  required
                  value={formData.authorEmail}
                  onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                  placeholder="tucorreo@comunidad.unam.mx"
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Área Tecnológica *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="">Selecciona un área</option>
                  <option value="impresion-3d">Impresión 3D y Fabricación Aditiva</option>
                  <option value="corte-laser">Corte y Grabado Láser</option>
                  <option value="electronica">Electrónica y Microcontroladores</option>
                  <option value="robotica">Robótica y Mecatrónica</option>
                  <option value="audiovisual">Creación Audiovisual</option>
                  <option value="inteligencia-artificial">Inteligencia Artificial</option>
                  <option value="tecnologias-inmersivas">Realidad Virtual y WebXR</option>
                  <option value="programacion">Programación y Desarrollo</option>
                  <option value="sustentabilidad-diy">Sustentabilidad y DIY</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace del Repositorio o Video</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="https://github.com/tu-usuario/proyecto"
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción, Materiales y Pasos *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explica el objetivo, lista de materiales utilizados y cómo funciona tu creación."
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-xs !py-3 w-full flex items-center justify-center gap-2 font-bold"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Enviando a revisión...' : 'Enviar propuesta para moderación'}</span>
            </button>
          </form>
        </div>

        {/* Talleres y Convocatorias */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-puma-dark flex items-center gap-2">
              <Calendar className="w-5 h-5 text-puma-navy" />
              <span>Próximos Talleres Maker</span>
            </h2>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase bg-puma-gold/20 text-puma-dark px-2 py-0.5 rounded">
                  Híbrido · Presencial y Zoom
                </span>
                <h3 className="font-bold text-xs text-puma-dark">
                  Taller: De la Idea al Objeto en Impresión 3D FDM
                </h3>
                <p className="text-[11px] text-slate-600">
                  Calibración de cama, resolución de problemas de adhesión y laminación con Cura.
                </p>
                <div className="text-[11px] text-slate-500 font-semibold pt-1">
                  Viernes 16:00 hrs · Cupo limitado (40 lugares)
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Virtual 100%
                </span>
                <h3 className="font-bold text-xs text-puma-dark">
                  Taller: Internet de las Cosas con ESP32 y Wokwi
                </h3>
                <p className="text-[11px] text-slate-600">
                  Simula circuitos de monitoreo ambiental y envía datos por MQTT sin comprar componentes.
                </p>
                <div className="text-[11px] text-slate-500 font-semibold pt-1">
                  Jueves 17:00 hrs · Registro libre
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-puma-dark to-puma-navy text-white p-6 rounded-2xl shadow-md space-y-3">
            <Sparkles className="w-6 h-6 text-puma-gold" />
            <h3 className="text-base font-bold text-white">Retos Maker PUMAKER</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cada mes lanzamos desafíos de diseño abierto: diseña un soporte para libros reciclado, programa un juego en p5.js o modela una prótesis mecánica libre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
