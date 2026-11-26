import React, { useState } from 'react';
import { Box, Calculator } from 'lucide-react';

export const Volume3DCalculator: React.FC = () => {
  const [length, setLength] = useState<number>(50); // mm
  const [width, setWidth] = useState<number>(50); // mm
  const [height, setHeight] = useState<number>(20); // mm
  const [infill, setInfill] = useState<number>(20); // %
  const [material, setMaterial] = useState<string>('PLA');

  // Densidades en g/cm³
  const densities: Record<string, number> = {
    PLA: 1.24,
    PETG: 1.27,
    ABS: 1.04,
    TPU: 1.21
  };

  const volumeCm3 = (length * width * height) / 1000;
  // Estimación empírica: 3 paredes sólidas (~25% de volumen sólido base) + porcentaje de infill en el núcleo
  const effectiveSolidRatio = 0.25 + (0.75 * (infill / 100));
  const estimatedMaterialVolumeCm3 = volumeCm3 * effectiveSolidRatio;
  const estimatedGrams = estimatedMaterialVolumeCm3 * (densities[material] || 1.24);
  const filamentMeters175 = estimatedMaterialVolumeCm3 / (Math.PI * Math.pow(0.175 / 2, 2));

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <Box className="w-5 h-5 text-puma-gold" />
        <span>Calculadora de Volumen y Masa de Impresión 3D</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Estima el material consumido a partir de las dimensiones del prisma envolvente de tu pieza. *Valores estimados de referencia.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Largo X (mm)</label>
          <input
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Ancho Y (mm)</label>
          <input
            type="number"
            min="1"
            value={width}
            onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Alto Z (mm)</label>
          <input
            type="number"
            min="1"
            value={height}
            onChange={(e) => setHeight(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
          >
            <option value="PLA">PLA (1.24 g/cm³)</option>
            <option value="PETG">PETG (1.27 g/cm³)</option>
            <option value="ABS">ABS (1.04 g/cm³)</option>
            <option value="TPU">TPU (1.21 g/cm³)</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
          <span>Densidad de Relleno (Infill): {infill}%</span>
          <span className="text-slate-400">Recomendado estándar: 15% - 25%</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          value={infill}
          onChange={(e) => setInfill(Number(e.target.value))}
          className="w-full accent-puma-gold cursor-pointer"
        />
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Volumen Envolvente</span>
          <span className="text-sm font-extrabold text-puma-dark">{volumeCm3.toFixed(1)} cm³</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Masa Estimada</span>
          <span className="text-sm font-extrabold text-emerald-600">{estimatedGrams.toFixed(1)} g</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Longitud de Filamento</span>
          <span className="text-sm font-extrabold text-puma-dark">{(filamentMeters175 / 100).toFixed(2)} m</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Porcentaje de Carrete (1kg)</span>
          <span className="text-sm font-extrabold text-puma-navy">{((estimatedGrams / 1000) * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
