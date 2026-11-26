import React, { useState } from 'react';
import { Flame } from 'lucide-react';

export const LaserKerfCalculator: React.FC = () => {
  const [material, setMaterial] = useState<string>('mdf3');
  const [thickness, setThickness] = useState<number>(3.0); // mm

  const kerfTable: Record<string, { kerf: number; notes: string; speed: string; power: string }> = {
    mdf3: { kerf: 0.16, notes: 'MDF 3mm con asistencia de aire estándar', speed: '25 mm/s', power: '65%' },
    mdf6: { kerf: 0.22, notes: 'MDF 6mm requiere mayor potencia', speed: '12 mm/s', power: '80%' },
    acrylic3: { kerf: 0.14, notes: 'Acrílico 3mm deja bordes pulidos transparentes', speed: '18 mm/s', power: '70%' },
    triplay3: { kerf: 0.18, notes: 'Triplay de pino/abedul con veta', speed: '22 mm/s', power: '68%' }
  };

  const current = kerfTable[material] || kerfTable.mdf3;
  const jointOffset = current.kerf / 2;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <Flame className="w-5 h-5 text-red-500" />
        <span>Compensación de Kerf y Parámetros de Corte Láser</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        El <em>kerf</em> es el ancho del material que el haz láser evapora al cortar. Compensarlo es indispensable para ensambles a presión perfectos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Material y Grosor</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
          >
            <option value="mdf3">MDF de 3 mm</option>
            <option value="mdf6">MDF de 6 mm</option>
            <option value="acrylic3">Acrílico Cristal 3 mm</option>
            <option value="triplay3">Triplay de Abedul 3 mm</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Grosor Real Medido (mm)</label>
          <input
            type="number"
            step="0.1"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Kerf Típico</span>
          <span className="text-sm font-extrabold text-red-600">{current.kerf} mm</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Offset en Vector (Lado)</span>
          <span className="text-sm font-extrabold text-puma-dark">+{jointOffset.toFixed(3)} mm</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Velocidad Sugerida</span>
          <span className="text-sm font-bold text-slate-700">{current.speed}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Potencia Tubo 60W</span>
          <span className="text-sm font-bold text-slate-700">{current.power}</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 italic text-center">
        *Aviso: Los parámetros son valores de referencia iniciales y deben verificarse siempre con una matriz de prueba en tu equipo específico.
      </p>
    </div>
  );
};
