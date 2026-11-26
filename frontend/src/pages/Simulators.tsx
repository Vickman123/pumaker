import React from 'react';
import { Volume3DCalculator } from '../components/calculators/Volume3DCalculator';
import { Cost3DCalculator } from '../components/calculators/Cost3DCalculator';
import { UnitConverter } from '../components/calculators/UnitConverter';
import { LaserKerfCalculator } from '../components/calculators/LaserKerfCalculator';
import { ParametricBoxHelper } from '../components/calculators/ParametricBoxHelper';
import { PreFlightChecklist } from '../components/calculators/PreFlightChecklist';
import { MakerSheetGenerator } from '../components/calculators/MakerSheetGenerator';
import { WorkshopTimeCalculator } from '../components/calculators/WorkshopTimeCalculator';
import { Cpu, ExternalLink } from 'lucide-react';

export const Simulators: React.FC = () => {
  const externalSimulators = [
    {
      name: 'Wokwi Simulator',
      desc: 'Simula Arduino, ESP32, Raspberry Pi Pico y sensores en tiempo real desde el navegador.',
      url: 'https://wokwi.com/',
      provider: 'Wokwi'
    },
    {
      name: 'Tinkercad Circuits',
      desc: 'Simulador visual de circuitos electrónicos, protoboards y programación por bloques del MIT.',
      url: 'https://www.tinkercad.com/circuits',
      provider: 'Autodesk'
    },
    {
      name: 'Open Roberta Lab',
      desc: 'Simulador 2D en la nube para programar robots virtuales de forma visual.',
      url: 'https://lab.open-roberta.org/',
      provider: 'Fraunhofer IAIS'
    },
    {
      name: 'Google Teachable Machine',
      desc: 'Entrena y prueba redes neuronales para visión, sonido y posturas en vivo.',
      url: 'https://teachablemachine.withgoogle.com/',
      provider: 'Google Creative Lab'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <Cpu className="w-4 h-4 text-puma-gold" />
          <span>Herramientas Interactivas y Simuladores</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Simuladores y Calculadoras Maker PUMAKER
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Herramientas computacionales para planear, presupuestar y fabricar piezas con exactitud matemática sin gastar material antes de tiempo. *Los valores son estimaciones de referencia técnica.
        </p>
      </div>

      {/* Simuladores Externos Recomendados */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-puma-dark">
          Simuladores Externos Gratuitos Recomendados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {externalSimulators.map((s, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-puma-navy uppercase block mb-1">
                  {s.provider}
                </span>
                <h3 className="font-bold text-base text-puma-dark mb-1">{s.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.desc}</p>
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs !py-1.5 flex items-center justify-center gap-1.5"
              >
                <span>Abrir Simulador</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Las 8 Calculadoras Nativas de PUMAKER */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-puma-dark">
            Calculadoras y Utilidades Nativas PUMAKER
          </h2>
          <p className="text-xs text-slate-500">
            Funcionales directamente en tu navegador sin requerir descargas.
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Calculadora de Volumen y Masa 3D */}
          <div id="calculadora-3d">
            <Volume3DCalculator />
          </div>

          {/* 2. Calculadora de Costos de Fabricación */}
          <div id="calculadora-costos">
            <Cost3DCalculator />
          </div>

          {/* 3. Conversor de Unidades Maker */}
          <div>
            <UnitConverter />
          </div>

          {/* 4. Compensación de Kerf y Parámetros Láser */}
          <div>
            <LaserKerfCalculator />
          </div>

          {/* 5. Generador de Medidas de Caja Paramétrica */}
          <div id="generador-cajas">
            <ParametricBoxHelper />
          </div>

          {/* 6. Checklist Pre-Vuelo 3D */}
          <div id="checklist-3d">
            <PreFlightChecklist />
          </div>

          {/* 7. Generador de Ficha Técnica Maker */}
          <div>
            <MakerSheetGenerator />
          </div>

          {/* 8. Calculadora de Tiempo de Taller */}
          <div>
            <WorkshopTimeCalculator />
          </div>
        </div>
      </section>
    </div>
  );
};
