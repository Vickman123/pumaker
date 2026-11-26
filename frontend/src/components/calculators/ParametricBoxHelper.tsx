import React, { useState } from 'react';
import { Package } from 'lucide-react';

export const ParametricBoxHelper: React.FC = () => {
  const [w, setW] = useState<number>(100); // mm
  const [l, setL] = useState<number>(80);  // mm
  const [h, setH] = useState<number>(60);  // mm
  const [th, setTh] = useState<number>(3); // grosor mm
  const [tabWidth, setTabWidth] = useState<number>(12); // mm dientes

  const tabsW = Math.max(3, Math.floor(w / tabWidth));
  const tabsL = Math.max(3, Math.floor(l / tabWidth));
  const tabsH = Math.max(3, Math.floor(h / tabWidth));
  const areaCm2 = 2 * (w * l + w * h + l * h) / 100;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <Package className="w-5 h-5 text-puma-gold" />
        <span>Generador de Medidas para Caja Paramétrica de Corte Láser</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Calcula las dimensiones de despiece, número óptimo de dedos de ensamble (finger joints) y área de lámina requerida.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Ancho X (mm)</label>
          <input
            type="number"
            value={w}
            onChange={(e) => setW(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Largo Y (mm)</label>
          <input
            type="number"
            value={l}
            onChange={(e) => setL(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Alto Z (mm)</label>
          <input
            type="number"
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Grosor (mm)</label>
          <input
            type="number"
            value={th}
            onChange={(e) => setTh(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Ancho Diente (mm)</label>
          <input
            type="number"
            value={tabWidth}
            onChange={(e) => setTabWidth(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Despiece de 6 Caras Requeridas:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-white p-2 rounded border border-slate-200">
            <strong>2x Base y Tapa:</strong> {w} x {l} mm ({tabsW} x {tabsL} dientes)
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <strong>2x Laterales X:</strong> {w} x {h} mm ({tabsW} x {tabsH} dientes)
          </div>
          <div className="bg-white p-2 rounded border border-slate-200">
            <strong>2x Laterales Y:</strong> {l} x {h} mm ({tabsL} x {tabsH} dientes)
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-600 flex justify-between items-center border-t border-slate-200 pt-2">
          <span>Área total de lámina requerida: <strong>{areaCm2.toFixed(1)} cm²</strong> (aprox. lámina de {(Math.sqrt(areaCm2 * 1.3) * 10).toFixed(0)}x{(Math.sqrt(areaCm2 * 1.3) * 10).toFixed(0)} mm con margen de corte)</span>
        </div>
      </div>
    </div>
  );
};
