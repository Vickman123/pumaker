import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Course } from '../types';
import {
  GraduationCap,
  ExternalLink,
  Clock,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Code2,
  Copy,
  Check,
  CheckCircle2
} from 'lucide-react';

interface CourseCurriculum {
  modules: {
    title: string;
    description: string;
    code?: string;
    testing?: string;
  }[];
}

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const getDetailedSyllabus = (slug: string): CourseCurriculum => {
    switch (slug) {
      case 'curso-fundamentos-arduino':
        return {
          modules: [
            {
              title: 'Módulo 1: Anatomía de Arduino y Primer Circuito (Blink)',
              description: 'Conexión de la placa, reconocimiento de puertos COM e instalación del IDE. Estudio de la estructura mínima de un programa: setup() y loop().',
              code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT); // Pin 13 en Arduino Uno
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // Encender LED
  delay(1000);                     // Esperar 1 segundo
  digitalWrite(LED_BUILTIN, LOW);  // Apagar LED
  delay(1000);                     // Esperar 1 segundo
}`,
              testing: 'Sube el código a tu Arduino Uno por USB. El LED marcado con la letra "L" junto al pin 13 debe parpadear exactamente cada segundo.'
            },
            {
              title: 'Módulo 2: Entradas Digitales y Pulsadores con Resistencia Pull-Down',
              description: 'Lectura del estado lógico (HIGH/LOW) de un botón mecánico y eliminación del ruido eléctrico (rebote).',
              code: `const int BUTTON_PIN = 2;
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  int estado = digitalRead(BUTTON_PIN);
  if (estado == HIGH) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}`,
              testing: 'Presiona el botón en la protoboard: el LED debe encender únicamente mientras el botón permanezca oprimido.'
            },
            {
              title: 'Módulo 3: Sensores Analógicos y Comunicación Serie (9600 baudios)',
              description: 'Lectura de voltaje continuo con el convertidor analógico a digital (ADC de 10 bits, valores de 0 a 1023) mediante un potenciómetro o fotorresistencia.',
              code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int valor = analogRead(A0);
  float voltaje = valor * (5.0 / 1023.0);
  Serial.print("Lectura ADC: ");
  Serial.print(valor);
  Serial.print(" | Tension: ");
  Serial.print(voltaje);
  Serial.println(" V");
  delay(500);
}`,
              testing: 'Abre el Monitor Serie en Arduino IDE (Ctrl+Shift+M a 9600 baudios). Gira el potenciómetro: verás las lecturas variar fluidamente de 0V a 5.0V.'
            }
          ]
        };
      case 'curso-desarrollo-web-freecodecamp':
        return {
          modules: [
            {
              title: 'Módulo 1: HTML5 Semántico y Jerarquía de Documentos',
              description: 'Estructuración correcta de páginas web para accesibilidad universal (WCAG 2.2) y motores de búsqueda.',
              code: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Portafolio Maker</title>
</head>
<body>
  <header>
    <h1>Laboratorio de Fabricación PC PUMA</h1>
    <nav><a href="#proyectos">Proyectos</a></nav>
  </header>
  <main id="proyectos">
    <article>
      <h2>Brazo Robótico</h2>
      <p>Controlado con Arduino y servomotores.</p>
    </article>
  </main>
</body>
</html>`,
              testing: 'Guarda el archivo como "index.html" y ábrelo en el navegador. Inspecciona la jerarquía con F12 asegurando que cada sección tenga encabezados ordenados (h1 -> h2).'
            },
            {
              title: 'Módulo 2: CSS Flexbox y Grid para Diseño Responsivo',
              description: 'Creación de tarjetas visuales que se acomodan automáticamente en celulares y computadoras de escritorio.',
              code: `.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 16px;
}
.card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`,
              testing: 'Modifica el ancho de la ventana del navegador. En pantallas anchas verás 3 columnas y en pantallas móviles se apilarán en 1 columna sin desbordamiento horizontal.'
            }
          ]
        };
      case 'curso-machine-learning-crash-google':
        return {
          modules: [
            {
              title: 'Módulo 1: Regresión Lineal y Función de Pérdida en Python',
              description: 'Ajuste de una recta matemática y = mx + b mediante descenso de gradiente para predecir variables continuas con NumPy y Scikit-learn.',
              code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Datos: Horas de estudio vs Calificación
X = np.array([[1], [2], [3], [4], [5], [6]])
y = np.array([50, 60, 68, 80, 88, 95])

modelo = LinearRegression()
modelo.fit(X, y)

horas = np.array([[7]])
prediccion = modelo.predict(horas)
print(f"Predicción para 7 horas de estudio: {prediccion[0]:.1f} pts")`,
              testing: 'Ejecuta el script en Google Colab o en tu terminal con "python regresion.py". La predicción calculada para 7 horas debe rondar los 102 a 104 puntos.'
            }
          ]
        };
      default:
        return {
          modules: [
            {
              title: 'Módulo 1: Fundamentos y Configuración del Entorno',
              description: 'Instalación de herramientas recomendadas y primeros pasos guiados con ejercicios prácticos.',
              code: `// Código introductorio para el curso\nconsole.log("¡Bienvenido a PUMAKER · UNAM!");`,
              testing: 'Verifica la consola del software seleccionado para confirmar la instalación correcta de dependencias.'
            }
          ]
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <GraduationCap className="w-4 h-4 text-puma-gold" />
          <span>Formación Técnica Estructurada</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Cursos Abiertos y Laboratorios Guiados
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Aprende con temarios detallados paso a paso, ejercicios con código fuente verificable e instrucciones claras para probar tus avances en hardware o navegador.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando cursos y temarios...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {courses.map((c) => {
            const isExpanded = expandedCourse === c.id;
            const syllabus = getDetailedSyllabus(c.slug);

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-puma overflow-hidden transition-all"
              >
                {/* Cabecera del Curso */}
                <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {c.platform}
                      </span>
                      <span className="text-xs text-slate-500 font-medium capitalize bg-slate-100 px-2.5 py-0.5 rounded">
                        Nivel: {c.level}
                      </span>
                      {c.duration && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded">
                          <Clock className="w-3.5 h-3.5 text-puma-gold" />
                          {c.duration}
                        </span>
                      )}
                      {c.certificateOffered && (
                        <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                          <Award className="w-3 h-3" />
                          Certificación Gratuita
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-puma-dark">{c.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => setExpandedCourse(isExpanded ? null : c.id)}
                      className="btn-secondary text-xs !py-2.5 flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isExpanded ? 'Ocultar Temario' : 'Ver Temario y Código'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs !py-2.5 flex items-center justify-center gap-1.5"
                    >
                      <span>Ir al Curso Oficial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Temario Desplegable con Laboratorios Paso a Paso y Código */}
                {isExpanded && (
                  <div className="bg-slate-50/70 p-6 sm:p-8 space-y-6 border-t border-slate-200 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-puma-gold" />
                      <h3 className="text-base font-bold text-puma-dark">
                        Laboratorios Prácticos y Módulos Paso a Paso
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {syllabus.modules.map((mod, mIdx) => {
                        const codeKey = `${c.id}-${mIdx}`;
                        return (
                          <div
                            key={mIdx}
                            className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-puma-navy text-puma-gold font-bold flex items-center justify-center flex-shrink-0 text-xs">
                                {mIdx + 1}
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-bold text-sm text-puma-dark">{mod.title}</h4>
                                <p className="text-slate-600 leading-relaxed">{mod.description}</p>
                              </div>
                            </div>

                            {/* Código de práctica */}
                            {mod.code && (
                              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0B1320] text-xs">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#070D16] border-b border-slate-800">
                                  <span className="font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                                    <Code2 className="w-3.5 h-3.5 text-puma-gold" />
                                    <span>Código de Laboratorio Práctico</span>
                                  </span>
                                  <button
                                    onClick={() => copyCode(mod.code!, codeKey)}
                                    className="btn-primary !py-1 !px-2.5 text-[11px] flex items-center gap-1"
                                  >
                                    {copiedCodeId === codeKey ? (
                                      <>
                                        <Check className="w-3 h-3 text-puma-dark" />
                                        <span>¡Copiado!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copiar</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <pre className="p-4 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed select-all">
                                  <code>{mod.code}</code>
                                </pre>
                              </div>
                            )}

                            {/* Cómo probarlo */}
                            {mod.testing && (
                              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-lg text-emerald-950 flex items-start gap-2.5">
                                <FlaskConical className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                                <div>
                                  <strong className="block text-emerald-900 font-bold uppercase tracking-wide text-[10px]">
                                    Cómo Probarlo y Validar el Ejercicio:
                                  </strong>
                                  <p className="text-emerald-900/90 leading-relaxed mt-0.5">{mod.testing}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
