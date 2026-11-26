import React, { useState } from 'react';
import { api } from '../services/api';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReportLinkModalProps {
  resourceId: string;
  resourceTitle: string;
  resourceUrl: string;
  onClose: () => void;
}

export const ReportLinkModal: React.FC<ReportLinkModalProps> = ({
  resourceId,
  resourceTitle,
  resourceUrl,
  onClose
}) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.reportBrokenLink(resourceId, notes);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      alert('Hubo un error al enviar el reporte. Por favor intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">¡Gracias por tu reporte!</h3>
            <p className="text-sm text-slate-600">
              Nuestro equipo revisará el enlace para mantener la biblioteca de PUMAKER siempre actualizada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Reportar problema de enlace</span>
            </div>

            <p className="text-xs text-slate-600">
              Estás reportando el recurso: <strong className="text-slate-800">{resourceTitle}</strong>
            </p>

            <div className="bg-slate-50 p-2.5 rounded text-[11px] font-mono text-slate-700 break-all border border-slate-200">
              {resourceUrl}
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-slate-700 mb-1">
                ¿Qué problema detectaste? (Opcional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ejemplo: La página devuelve error 404, ahora requiere suscripción de pago, o el video ya no está disponible."
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-xs !py-2 !px-4"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
