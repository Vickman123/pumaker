import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export const Cost3DCalculator: React.FC = () => {
  const [spoolCost, setSpoolCost] = useState<number>(450); // MXN por 1kg
  const [printGrams, setPrintGrams] = useState<number>(45); // gramos de la pieza
  const [printHours, setPrintHours] = useState<number>(3.5); // horas
  const [powerWatts, setPowerWatts] = useState<number>(120); // Watts promedio
  const [kwhPrice, setKwhPrice] = useState<number>(2.5); // MXN por kWh
  const [machineAmortizationPerHour, setMachineAmortizationPerHour] = useState<number>(5); // MXN/hora

  const materialCost = (spoolCost / 1000) * printGrams;
  const energyCost = (powerWatts / 1000) * printHours * kwhPrice;
  const machineWearCost = printHours * machineAmortizationPerHour;
  const totalCost = materialCost + energyCost + machineWearCost;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <DollarSign className="w-5 h-5 text-puma-gold" />
        <span>Calculadora de Costos de Fabricación 3D</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Calcula el costo transparente de fabricar una pieza considerando filamento, energía eléctrica y depreciación del equipo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Costo carrete 1kg ($ MXN)</label>
          <input
            type="number"
            value={spoolCost}
            onChange={(e) => setSpoolCost(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Gramos usados por la pieza</label>
          <input
            type="number"
            value={printGrams}
            onChange={(e) => setPrintGrams(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tiempo de impresión (horas)</label>
          <input
            type="number"
            step="0.5"
            value={printHours}
            onChange={(e) => setPrintHours(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Filamento</span>
          <span className="text-sm font-bold text-slate-700">${materialCost.toFixed(2)} MXN</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Luz Eléctrica</span>
          <span className="text-sm font-bold text-slate-700">${energyCost.toFixed(2)} MXN</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Desgaste Máquina</span>
          <span className="text-sm font-bold text-slate-700">${machineWearCost.toFixed(2)} MXN</span>
        </div>
        <div className="bg-puma-navy/10 p-2 rounded">
          <span className="block text-[10px] uppercase font-bold text-puma-navy">Costo Estimado Total</span>
          <span className="text-base font-extrabold text-puma-navy">${totalCost.toFixed(2)} MXN</span>
        </div>
      </div>
    </div>
  );
};
