import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export const WorkshopTimeCalculator: React.FC = () => {
  const [students, setStudents] = useState<number>(20);
  const [stations, setStations] = useState<number>(4);
  const [minutesPerTurn, setMinutesPerTurn] = useState<number>(25);
  const [introMinutes, setIntroMinutes] = useState<number>(30);
  const [wrapupMinutes, setWrapupMinutes] = useState<number>(20);

  const studentsPerStation = Math.ceil(students / stations);
  const rotationRounds = studentsPerStation;
  const totalHandsOnMinutes = rotationRounds * minutesPerTurn;
  const totalWorkshopMinutes = introMinutes + totalHandsOnMinutes + wrapupMinutes;
  const totalHours = (totalWorkshopMinutes / 60).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <Clock className="w-5 h-5 text-puma-gold" />
        <span>Calculadora de Tiempo y Logística de Taller Maker</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Planea la duración total de sesiones presenciales o virtuales con rotación de equipos y máquinas compartidas.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Participantes</label>
          <input
            type="number"
            min="1"
            value={students}
            onChange={(e) => setStudents(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Estaciones / Máquinas</label>
          <input
            type="number"
            min="1"
            value={stations}
            onChange={(e) => setStations(Math.max(1, Number(e.target.value)))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Minutos / Turno</label>
          <input
            type="number"
            min="5"
            value={minutesPerTurn}
            onChange={(e) => setMinutesPerTurn(Math.max(5, Number(e.target.value)))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Intro Teórica (min)</label>
          <input
            type="number"
            value={introMinutes}
            onChange={(e) => setIntroMinutes(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cierre / Retro (min)</label>
          <input
            type="number"
            value={wrapupMinutes}
            onChange={(e) => setWrapupMinutes(Number(e.target.value))}
            className="w-full text-xs p-2 rounded border border-slate-300"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Rondas de Rotación</span>
          <span className="text-sm font-bold text-slate-800">{rotationRounds} rondas</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Tiempo de Práctica</span>
          <span className="text-sm font-bold text-slate-800">{totalHandsOnMinutes} min</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-bold text-slate-500">Tiempo Total Estimado</span>
          <span className="text-sm font-extrabold text-puma-dark">{totalWorkshopMinutes} min</span>
        </div>
        <div className="bg-puma-navy/10 p-2 rounded">
          <span className="block text-[10px] uppercase font-bold text-puma-navy">Duración en Horas</span>
          <span className="text-base font-extrabold text-puma-navy">{totalHours} horas</span>
        </div>
      </div>
    </div>
  );
};
