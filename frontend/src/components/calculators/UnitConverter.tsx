import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [val, setVal] = useState<number>(1);
  const [convType, setConvType] = useState<string>('mm_in');

  let resultText = '';
  switch (convType) {
    case 'mm_in':
      resultText = `${val} mm = ${(val / 25.4).toFixed(4)} pulgadas`;
      break;
    case 'in_mm':
      resultText = `${val} pulgadas = ${(val * 25.4).toFixed(2)} mm`;
      break;
    case 'mil_mm':
      resultText = `${val} mil (thou) = ${(val * 0.0254).toFixed(4)} mm`;
      break;
    case 'mm_mil':
      resultText = `${val} mm = ${(val / 0.0254).toFixed(2)} mil`;
      break;
    case 'oz_cu_um':
      resultText = `${val} oz de cobre PCB = ${(val * 35).toFixed(1)} µm de espesor`;
      break;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <ArrowLeftRight className="w-5 h-5 text-puma-gold" />
        <span>Conversor de Unidades Técnicas Maker</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Convierte unidades habituales en diseño CAD, electrónica PCB y corte de materiales.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Conversión</label>
          <select
            value={convType}
            onChange={(e) => setConvType(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
          >
            <option value="mm_in">Milímetros a Pulgadas (mm → in)</option>
            <option value="in_mm">Pulgadas a Milímetros (in → mm)</option>
            <option value="mil_mm">Mils (thou) a Milímetros (mil → mm)</option>
            <option value="mm_mil">Milímetros a Mils (mm → mil)</option>
            <option value="oz_cu_um">Onzas de Cobre PCB a Micras (oz → µm)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Valor a Convertir</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
      </div>

      <div className="bg-slate-900 text-puma-gold p-4 rounded-lg font-mono text-center text-sm font-bold shadow-inner">
        {resultText}
      </div>
    </div>
  );
};
