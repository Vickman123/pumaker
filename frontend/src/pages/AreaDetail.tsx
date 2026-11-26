import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Category, Resource, Project, Video, Tool } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { ProjectCard } from '../components/ProjectCard';
import { VideoModal } from '../components/VideoModal';
import { SafetyAlert } from '../components/SafetyAlert';
import {
  GraduationCap,
  Wrench,
  FolderGit2,
  Tv,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Play,
  CheckCircle2,
  FlaskConical,
  Code2,
  Copy,
  Check
} from 'lucide-react';

export const AreaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'guia' | 'proyectos' | 'herramientas' | 'videos'>('guia');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [copiedLabCode, setCopiedLabCode] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const res = await api.getCategoryBySlug(slug);
        if (res.success) {
          setCategory(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArea();
  }, [slug]);

  const copyLab = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLabCode(true);
    setTimeout(() => setCopiedLabCode(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span className="text-sm text-slate-500">Cargando área de conocimiento...</span>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Área maker no encontrada</h2>
        <Link to="/aprende" className="btn-primary text-xs mt-4 inline-flex">
          Volver a Aprende
        </Link>
      </div>
    );
  }

  const getAreaCurriculum = (slug: string) => {
    switch (slug) {
      case 'impresion-3d':
        return {
          safety: '3d',
          modules: [
            { title: '1. Tecnologías de Fabricación Aditiva', desc: 'FDM (Modelado por Deposición Fundida), SLA (Estereolitografía por resina líquida) y SLS (Sinterizado Láser Selectivo).' },
            { title: '2. Formatos de Archivo 3D', desc: 'Estructuras de mallas triangulares STL, OBJ, el moderno formato 3MF (con color y perfiles) y generación de código de máquina G-code.' },
            { title: '3. Parámetros Críticos de Laminación', desc: 'Altura de capa (0.12 - 0.28 mm), densidad de infill (15-40%), número de perímetros de pared, velocidad de retracción y temperatura de transición vítrea.' },
            { title: '4. Guía de Filamentos Maker', desc: 'PLA (biodegradable de fácil uso), PETG (resistente a impactos y rayos UV), ABS/ASA (resistente térmico) y TPU (flexible).' },
            { title: '5. Mantenimiento y Solución de Fallas', desc: 'Nivelación de cama caliente, corrección de "stringing" (hilos), desprendimiento de esquinas ("warping") y destape de boquillas mediante cold-pull.' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Rutina G-code de Nivelación de 5 Puntos',
            desc: 'Envía este comando G-code para mover el extrusor a las 4 esquinas y al centro de la cama para calibrar con una hoja de papel.',
            code: `; Rutina de Calibracion PUMAKER - Impresion 3D
G28 ; Home de todos los ejes X, Y, Z
G90 ; Coordenadas absolutas
G1 Z5 F3000 ; Elevar boquilla 5mm

; Esquina 1 (Frontal Izquierda)
G1 X30 Y30 Z0.2 F3000
G4 P4000 ; Pausa de 4 segundos para pasar la hoja

; Esquina 2 (Frontal Derecha)
G1 Z5 F3000
G1 X190 Y30 Z0.2 F3000
G4 P4000

; Esquina 3 (Trasera Derecha)
G1 Z5 F3000
G1 X190 Y190 Z0.2 F3000
G4 P4000

; Esquina 4 (Trasera Izquierda)
G1 Z5 F3000
G1 X30 Y190 Z0.2 F3000
G4 P4000

; Centro de la cama
G1 Z5 F3000
G1 X110 Y110 Z0.2 F3000
G4 P4000

G1 Z10 F3000 ; Retirar boquilla al terminar`,
            testing: 'Guarda este texto en un archivo "calibracion.gcode", cárgalo en tu tarjeta SD y ejecútalo en la impresora. La boquilla se posicionará automáticamente en cada esquina; la hoja de papel debe deslizarse con una ligera fricción táctil en los 5 puntos.'
          }
        };
      case 'corte-laser':
        return {
          safety: 'laser',
          modules: [
            { title: '1. Principio Óptico del Láser CO2 y Diodo', desc: 'Generación de haz electromagnético concentrado, lentes de enfoque focal (1.5" a 4") y asistencia neumática de aire comprimido.' },
            { title: '2. Diferencia entre Corte, Marcado y Grabado Raster', desc: 'Corte vectorial de alta potencia a baja velocidad vs grabado superficial de imágenes rasterizadas en escala de grises.' },
            { title: '3. Preparación de Archivos Vectoriales', desc: 'Trazados cerrados en formato SVG, DXF y PDF con grosor de línea de corte de 0.01 mm (hairline) y colores normalizados.' },
            { title: '4. El Kerf y Diseño de Ensambles Mecánicos', desc: 'Cálculo de la merma del haz (promedio 0.15 mm) para diseñar uniones de ranura y lengüeta (finger joints) y cajas paramétricas sin pegamento.' },
            { title: '5. Seguridad Rigurosa contra Incendios y Toxicidad', desc: 'Prohibición estricta de PVC/vinilos (generación de gas cloro). Extracción activa y supervisión visual permanente.' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Trazado SVG para Matriz de Prueba de Potencia y Velocidad',
            desc: 'Archivo SVG mínimo para calibrar el punto óptimo de corte en láminas de MDF o Acrílico de 3mm.',
            code: `<svg xmlns="http://www.w3.org/2000/svg" width="60mm" height="40mm" viewBox="0 0 60 40">
  <!-- Capa 1: Grabado de texto informativo (Negro #000000) -->
  <text x="5" y="10" font-family="sans-serif" font-size="4" fill="#000000">PUMAKER TEST 3mm</text>
  <!-- Capa 2: Corte Vectorial (Rojo puro #FF0000, 0.01mm) -->
  <rect x="5" y="15" width="20" height="20" stroke="#FF0000" stroke-width="0.01mm" fill="none" />
  <circle cx="45" cy="25" r="10" stroke="#FF0000" stroke-width="0.01mm" fill="none" />
</svg>`,
            testing: 'Importa el SVG en LightBurn o Inkscape. Configura la capa negra al 15% de potencia y 200 mm/s (grabado) y la capa roja al 65% de potencia y 22 mm/s (corte). El cuadrado y círculo de madera deben desprenderse suavemente por gravedad sin quemar los bordes.'
          }
        };
      case 'electronica':
        return {
          safety: 'electronica',
          modules: [
            { title: '1. Fundamentos Eléctricos y Ley de Ohm', desc: 'Voltaje (V), Corriente (I), Resistencia (R) y Potencia (P). Aplicación práctica de V = I * R en circuitos de corriente directa.' },
            { title: '2. Componentes Pasivos y Semiconductores', desc: 'Resistencias limitadoras, capacitores de filtrado, diodos de rectificación, transistores BJT y MOSFETs como interruptores de potencia.' },
            { title: '3. Plataformas: Arduino, ESP32 y Pico', desc: 'Microcontroladores de 8 bits (ATmega328P) vs módulos de 32 bits con conectividad WiFi/Bluetooth (ESP32) y Raspberry Pi Pico con RP2040.' },
            { title: '4. Protocolos de Comunicación de Sensores', desc: 'Entradas analógicas (ADC), modulación por ancho de pulsos (PWM), y buses de comunicación digital I2C, SPI y UART.' },
            { title: '5. Diseño y Fabricación de PCB', desc: 'Captura de diagramas esquemáticos y ruteo de pistas en KiCad con generación de archivos Gerber para manufactura.' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Voltímetro Digital y Monitor Serie en Arduino',
            desc: 'Lee el voltaje analógico en tiempo real con precisión milivoltio y muéstralo en la consola de tu computadora.',
            code: `// Laboratorio: Voltímetro con divisor de tensión
const int PIN_SENSOR = A0;

void setup() {
  Serial.begin(9600);
  Serial.println(F("--- Voltímetro Digital PUMAKER · UNAM ---"));
}

void loop() {
  int valorCrudo = analogRead(PIN_SENSOR); // 0 a 1023
  float voltaje = (valorCrudo / 1023.0) * 5.0; // Escala a 5.0V

  Serial.print(F("Lectura ADC: "));
  Serial.print(valorCrudo);
  Serial.print(F(" | Tension Medida: "));
  Serial.print(voltaje, 2);
  Serial.println(F(" V"));

  delay(500);
}`,
            testing: 'Conecta el pin A0 al pin 3.3V de Arduino con un cable jumper. En el Monitor Serie a 9600 baudios debes ver una lectura de 3.30V (+-0.05V). Luego conéctalo a GND y debe marcar exactamente 0.00V.'
          }
        };
      case 'robotica':
        return {
          safety: 'general',
          modules: [
            { title: '1. Arquitectura de un Sistema Robótico', desc: 'Estructura mecánica (chasis/eslabones), fuente de energía, actuadores (motores/servos), sensores y unidad de procesamiento.' },
            { title: '2. Actuadores y Control de Movimiento', desc: 'Motores DC con caja reductora, servomotores angulares (0-180°), motores a pasos bipolares y puentes H para control de dirección.' },
            { title: '3. Cinemática Diferencial y Cinemática Inversa', desc: 'Leyes matemáticas de movimiento para robots con dos ruedas motrices y posicionamiento de efectores finales en brazos articulados.' },
            { title: '4. Sensores para Robótica Móvil', desc: 'Sensores ópticos infrarrojos de seguimiento de línea (TCRT5000), sonares ultrasónicos (HC-SR04), giróscopos y acelerómetros (MPU-6050).' },
            { title: '5. Simulación de Robots', desc: 'Uso de plataformas de simulación como Open Roberta Lab, CoppeliaSim y conceptos de ROS (Robot Operating System).' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Control de Posición de Servomotor de 0° a 180°',
            desc: 'Programa el barrido angular suave de un servomotor SG90 o MG90S con la librería oficial Servo.h.',
            code: `#include <Servo.h>

Servo miServo;
const int PIN_SERVO = 9;

void setup() {
  miServo.attach(PIN_SERVO);
  Serial.begin(9600);
  Serial.println("Barrido de Servomotor PUMAKER");
}

void loop() {
  // Barrido de 0 a 180 grados
  for (int angulo = 0; angulo <= 180; angulo += 5) {
    miServo.write(angulo);
    delay(20);
  }
  delay(500);

  // Regreso de 180 a 0 grados
  for (int angulo = 180; angulo >= 0; angulo -= 5) {
    miServo.write(angulo);
    delay(20);
  }
  delay(500);
}`,
            testing: 'Conecta el cable naranja del servo al Pin 9 de Arduino, el rojo a 5V y el marrón a GND. Al subir el sketch, el brazo del servomotor girará de un extremo al otro en un movimiento suave de 180 grados sin vibraciones.'
          }
        };
      case 'inteligencia-artificial':
        return {
          safety: 'general',
          modules: [
            { title: '1. Fundamentos del Aprendizaje Automático', desc: 'Diferencia entre algoritmos deterministas y modelos entrenados con datos. Aprendizaje supervisado, no supervisado y por refuerzo.' },
            { title: '2. Clasificación Visual en Navegador', desc: 'Entrenamiento de redes neuronales convolucionales con Teachable Machine de Google y exportación a TensorFlow.js.' },
            { title: '3. Modelos Abiertos de Hugging Face', desc: 'Uso de modelos pre-entrenados para procesamiento de lenguaje natural (NLP), visión por computadora y reconocimiento de voz.' },
            { title: '4. Ética, Privacidad y Aplicaciones Maker', desc: 'Sesgos en los datos de entrenamiento, privacidad de imágenes locales y automatización de robots y sensores mediante IA embebida.' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Reconocimiento de Objetos con ml5.js y MobileNet',
            desc: 'Clasifica cualquier imagen local usando una red neuronal pre-entrenada directamente en un archivo HTML.',
            code: `<!DOCTYPE html>
<html>
<head>
  <title>ml5.js MobileNet — PUMAKER</title>
  <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 20px;">
  <h2>Clasificación de Objetos con MobileNet</h2>
  <img id="foto" src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" width="400" crossorigin="anonymous" />
  <p id="resultado">Analizando imagen con red neuronal...</p>

  <script>
    const classifier = ml5.imageClassifier('MobileNet', () => {
      classifier.classify(document.getElementById('foto'), (err, results) => {
        if (err) return console.error(err);
        document.getElementById('resultado').innerHTML = \`
          <strong>Predicción:</strong> \${results[0].label} <br>
          <strong>Certeza:</strong> \${(results[0].confidence * 100).toFixed(1)}%
        \`;
      });
    });
  </script>
</body>
</html>`,
            testing: 'Guarda el archivo como "mobilenet.html" y ábrelo en el navegador. La red neuronal analizará la imagen de la caja de madera y mostrará en pantalla la etiqueta identificada con más del 85% de confianza.'
          }
        };
      default:
        return {
          safety: 'general',
          modules: [
            { title: '1. Fundamentos y Conceptos Clave', desc: 'Bases teóricas y experimentales del área maker seleccionada.' },
            { title: '2. Herramientas y Metodología', desc: 'Uso de software abierto y mejores prácticas recomendadas por la comunidad.' }
          ],
          lab: {
            title: 'Laboratorio Práctico: Ejercicio Inicial',
            desc: 'Verifica la configuración del software y ejecuta una prueba funcional.',
            code: `// Laboratorio práctico PUMAKER\nconsole.log("Laboratorio activo para ${category.name}");`,
            testing: 'Abre la consola de desarrollo (F12) para verificar que el entorno responda con normalidad.'
          }
        };
    }
  };

  const curriculum = getAreaCurriculum(category.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Botón regresar */}
      <Link to="/aprende" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-puma-navy transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a todas las áreas maker</span>
      </Link>

      {/* Cabecera del Área */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-puma p-8 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: category.color || '#2563EB' }}
        />
        <div className="max-w-3xl space-y-3">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
              borderColor: `${category.color}40`,
              borderWidth: '1px'
            }}
          >
            Área Maker Especializada
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-puma-dark">
            {category.name}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Pestañas de navegación interna del área */}
        <div className="flex border-b border-slate-200 mt-8 gap-4 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('guia')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guia' ? 'border-puma-navy text-puma-navy' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Guía Temática & Laboratorio</span>
          </button>

          <button
            onClick={() => setActiveTab('proyectos')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'proyectos' ? 'border-puma-navy text-puma-navy' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Proyectos Paso a Paso ({category.featuredProjects?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('herramientas')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'herramientas' ? 'border-puma-navy text-puma-navy' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Herramientas Recomendadas ({category.featuredTools?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'videos' ? 'border-puma-navy text-puma-navy' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Videoteca ({category.featuredVideos?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Alerta de Seguridad del Área */}
      <SafetyAlert area={curriculum.safety as any} />

      {/* Contenido según la pestaña seleccionada */}
      {activeTab === 'guia' && (
        <div className="space-y-8">
          {/* Módulos Teóricos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-puma-dark">
              Plan de Estudio y Conceptos Clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.modules.map((mod: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="font-bold text-sm text-puma-navy flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{mod.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Laboratorio Práctico con Código y Pruebas */}
          {curriculum.lab && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-puma space-y-4">
              <div className="flex items-center gap-2 text-puma-navy font-bold text-lg">
                <FlaskConical className="w-5 h-5 text-puma-gold" />
                <span>{curriculum.lab.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {curriculum.lab.desc}
              </p>

              {/* Bloque de código con botón de copiado */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B1320] text-xs shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-[#070D16] border-b border-slate-800">
                  <span className="font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-puma-gold" />
                    <span>Código de Laboratorio</span>
                  </span>
                  <button
                    onClick={() => copyLab(curriculum.lab.code)}
                    className="btn-primary !py-1 !px-2.5 text-[11px] flex items-center gap-1"
                  >
                    {copiedLabCode ? (
                      <>
                        <Check className="w-3 h-3 text-puma-dark" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed select-all">
                  <code>{curriculum.lab.code}</code>
                </pre>
              </div>

              {/* Cómo Probarlo */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                <FlaskConical className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-900 font-bold uppercase tracking-wide text-[11px]">
                    Cómo Probarlo y Validar el Resultado:
                  </strong>
                  <p className="text-emerald-900/90 leading-relaxed mt-0.5">
                    {curriculum.lab.testing}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recursos de la biblioteca para esta área */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-puma-dark">
                Recursos Curados para {category.name}
              </h3>
              <Link to={`/explorar?category=${category.slug}`} className="text-xs font-semibold text-puma-navy hover:text-puma-gold">
                Ver todos en el buscador ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.featuredResources?.map((res: Resource) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'proyectos' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-puma-dark">
            Proyectos Prácticos que Puedes Construir en esta Área
          </h2>
          {category.featuredProjects?.length === 0 ? (
            <p className="text-xs text-slate-500">No hay proyectos registrados en esta categoría aún.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.featuredProjects?.map((proj: Project) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'herramientas' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-puma-dark">
            Software Libre y Herramientas Especializadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.featuredTools?.map((tool: Tool) => (
              <div key={tool.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                      {tool.licenseType}
                    </span>
                    <span className="text-[11px] text-slate-400">{tool.platform}</span>
                  </div>
                  <h3 className="font-bold text-base text-puma-dark mb-1">{tool.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{tool.description}</p>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs !py-1.5 text-center flex items-center justify-center gap-1.5"
                >
                  <span>Sitio Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-puma-dark">
            Videotutoriales y Canales Oficiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.featuredVideos?.map((vid: Video) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-puma-gold text-puma-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-puma-dark ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-puma-navy uppercase block mb-1">
                    {vid.channelTitle}
                  </span>
                  <h3 className="font-bold text-xs text-slate-800 line-clamp-2">{vid.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          title={activeVideo.title}
          channelTitle={activeVideo.channelTitle}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};
