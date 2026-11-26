import React, { useState } from 'react';
import { CheckSquare, CheckCircle2 } from 'lucide-react';

export const PreFlightChecklist: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Cama de impresión limpia con alcohol isopropílico para retirar grasa de dedos.', checked: false },
    { id: 2, text: 'Cama correctamente nivelada (resistencia ligera con hoja de papel estándar de 80g).', checked: false },
    { id: 3, text: 'Temperatura de boquilla y cama verificadas según la etiqueta del filamento.', checked: false },
    { id: 4, text: 'Carrete desenrollado libremente sin nudos cruzados en el soporte.', checked: false },
    { id: 5, text: 'Orientación de pieza óptima en laminador para reducir voladizos mayores a 45°.', checked: false },
    { id: 6, text: 'Soportes activados si hay voladizos suspendidos en el aire.', checked: false },
    { id: 7, text: 'Adhesión (Brim/Borde) activado en piezas con base angosta para evitar warping.', checked: false },
    { id: 8, text: 'G-code copiado a tarjeta SD y previsualización de recorrido de capas inspeccionada.', checked: false },
    { id: 9, text: 'Primeras 3 capas supervisadas presencialmente antes de dejar la máquina sola.', checked: false }
  ]);

  const toggle = (id: number) => {
    setItems(items.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const completed = items.filter(i => i.checked).length;
  const progressPercent = Math.round((completed / items.length) * 100);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-puma-navy font-bold text-base">
          <CheckSquare className="w-5 h-5 text-emerald-600" />
          <span>Checklist Pre-Vuelo para Impresión 3D</span>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {completed}/{items.length} completados ({progressPercent}%)
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Sigue esta lista paso a paso antes de cada impresión para evitar impresiones fallidas tipo "espagueti" y atascos de boquilla.
      </p>

      {/* Barra de progreso */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-emerald-500 h-2 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <label
            key={item.id}
            className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
              item.checked ? 'bg-emerald-50/60 border-emerald-200 text-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle(item.id)}
              className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className={item.checked ? 'line-through text-slate-400' : ''}>{item.text}</span>
          </label>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>¡Excelente! Tu equipo está 100% listo para una impresión exitosa.</span>
        </div>
      )}
    </div>
  );
};
