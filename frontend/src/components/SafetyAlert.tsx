import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, Wind } from 'lucide-react';

interface SafetyAlertProps {
  area: 'laser' | '3d' | 'electronica' | 'general';
}

export const SafetyAlert: React.FC<SafetyAlertProps> = ({ area }) => {
  if (area === 'laser') {
    return (
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg shadow-sm my-6 text-xs text-red-900">
        <div className="flex items-start gap-3">
          <Flame className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-red-800 uppercase tracking-wide">
              Aviso Crítico de Seguridad para Corte Láser
            </h4>
            <p>
              <strong>MATERIALES PROHIBIDOS:</strong> NUNCA cortes PVC, policloruro de vinilo, vinilos adhesivos ni cuero sintético clorado. El láser libera gas cloro altamente tóxico que destruye los pulmones y corroe irreversiblemente la maquinaria.
            </p>
            <p>
              Supervisa la cortadora en todo momento mientras esté en operación. Asegúrate de que el extractor de humos y la asistencia de aire estén activos antes de pulsar iniciar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (area === '3d') {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm my-6 text-xs text-amber-900">
        <div className="flex items-start gap-3">
          <Wind className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-800 uppercase tracking-wide">
              Ventilación y Seguridad Térmica en Impresión 3D
            </h4>
            <p>
              La boquilla de extrusión alcanza temperaturas superiores a los 200°C y la cama caliente hasta 100°C. Nunca toques las partes móviles durante la impresión. Al imprimir con filamentos técnicos como ABS o resinas fotosensibles SLA, opera en un área ventilada con extracción o filtro HEPA/carbón activado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (area === 'electronica') {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg shadow-sm my-6 text-xs text-blue-900">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-blue-800 uppercase tracking-wide">
              Manejo Seguro de Circuitos y Soldadura
            </h4>
            <p>
              Desconecta siempre la alimentación antes de modificar conexiones en la protoboard. Utiliza gafas de seguridad al soldar con estaño y trabaja en espacios ventilados para evitar la inhalación de humo de resina.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
