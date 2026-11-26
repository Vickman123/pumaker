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
  CheckCircle2
} from 'lucide-react';

export const AreaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'guia' | 'proyectos' | 'herramientas' | 'videos'>('guia');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

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

  // Contenidos específicos para la pestaña "Guía" según el slug del área
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
          ]
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
          ]
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
          ]
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
          ]
        };
      case 'audiovisual':
        return {
          safety: 'general',
          modules: [
            { title: '1. Composición Fotográfica y Encuadre', desc: 'Regla de los tercios, ley de la mirada, profundidad de campo, distancia focal y tipos de planos (general, medio, detalle).' },
            { title: '2. Iluminación Profesional en el Taller', desc: 'Esquema de iluminación de 3 puntos (luz principal, relleno y contraluz), difusores suaves y temperatura de color en Kelvin.' },
            { title: '3. Grabación y Limpieza de Audio', desc: 'Micrófonos lavalier vs micrófonos de condensador, captura de perfil de ruido y ecualización con Audacity.' },
            { title: '4. Montaje y Color en DaVinci Resolve', desc: 'Edición en Cut Page, sincronización de audio externo, inserción de B-roll de detalle y exportación a 1080p60.' },
            { title: '5. Streaming Educativo con OBS Studio', desc: 'Creación de escenas multicámara, captura de pantallas de software CAD y transmisión fluida para talleres en vivo.' }
          ]
        };
      case 'diseno-digital':
        return {
          safety: 'general',
          modules: [
            { title: '1. Diseño Vectorial vs Gráficos Raster', desc: 'Matemática de curvas Bézier escalables sin pérdida de resolución en Inkscape vs mapas de bits en GIMP y Photopea.' },
            { title: '2. Modelado Paramétrico para Ingeniería', desc: 'Bocetos 2D con restricciones geométricas (paralelismo, tangencia, coincidencia) y operaciones de extrusión y revolución en FreeCAD.' },
            { title: '3. Escultura y Animación 3D con Blender', desc: 'Topología poligonal limpia, modificadores booleanos, texturizado con materiales PBR e iluminación fotográfica.' },
            { title: '4. Diseño de Interfaces (UI/UX) con Penpot', desc: 'Plataforma abierta para prototipar aplicaciones interactivas, sistemas de diseño y componentes colaborativos.' }
          ]
        };
      case 'inteligencia-artificial':
        return {
          safety: 'general',
          modules: [
            { title: '1. Fundamentos del Aprendizaje Automático', desc: 'Diferencia entre algoritmos deterministas y modelos entrenados con datos. Aprendizaje supervisado, no supervisado y por refuerzo.' },
            { title: '2. Clasificación Visual en Navegador', desc: 'Entrenamiento de redes neuronales convolucionales con Teachable Machine de Google y exportación a TensorFlow.js.' },
            { title: '3. Modelos Abiertos de Hugging Face', desc: 'Uso de modelos pre-entrenados para procesamiento de lenguaje natural (NLP), visión por computadora y reconocimiento de voz.' },
            { title: '4. Ética, Privacidad y Aplicaciones Maker', desc: 'Sesgos en los datos de entrenamiento, privacidad de imágenes locales y automatización de robots y sensores mediante IA embebida.' }
          ]
        };
      case 'tecnologias-inmersivas':
        return {
          safety: 'general',
          modules: [
            { title: '1. Ecosistema XR: VR, AR y WebXR', desc: 'Diferencias entre Realidad Virtual (entornos cerrados), Realidad Aumentada (superposición al mundo real) y el estándar abierto WebXR.' },
            { title: '2. Gráficos 3D en el Navegador con Three.js', desc: 'Construcción de la escena virtual, cámara perspectiva, fuentes de iluminación, materiales y bucle de renderizado a 60 fps.' },
            { title: '3. Realidad Virtual Declarativa con A-Frame', desc: 'Creación de experiencias inmersivas utilizando etiquetas HTML semánticas compatibles con visores VR y smartphones.' },
            { title: '4. Desarrollo Espacial con Godot Engine', desc: 'Motor libre multiplataforma para simulaciones interactivas tridimensionales y experiencias inmersivas abiertas.' }
          ]
        };
      case 'programacion':
        return {
          safety: 'general',
          modules: [
            { title: '1. Pensamiento Computacional y Lógica', desc: 'Descomposición de problemas, reconocimiento de patrones, abstracción y diseño de algoritmos con Scratch y MakeCode.' },
            { title: '2. Los Pilares de la Web Abierta', desc: 'HTML5 semántico y accesible, hojas de estilo responsivas con CSS moderno y lógica interactiva con JavaScript estándar.' },
            { title: '3. Programación con Python', desc: 'Sintaxis limpia, estructuras de control, manejo de archivos y librerías científicas para automatización y hardware.' },
            { title: '4. Control de Versiones con Git y GitHub', desc: 'Commits descriptivos, ramas de desarrollo, colaboración comunitaria y publicación de proyectos en páginas abiertas.' }
          ]
        };
      case 'sustentabilidad-diy':
        return {
          safety: 'general',
          modules: [
            { title: '1. Filosofía "Hazlo Tú Mismo" (DIY) y Reparabilidad', desc: 'Derecho a reparar, documentación abierta de esquemáticos y combate a la obsolescencia programada con guías de iFixit.' },
            { title: '2. Economía Circular y Diseño Regenerativo', desc: 'Ciclos biológicos y tecnológicos según la Fundación Ellen MacArthur para concebir productos desmontables y reciclables.' },
            { title: '3. Upcycling y Reutilización de Hardware', desc: 'Recuperación de fuentes de poder ATX, motores a pasos de impresoras viejas y baterías de laptops en desuso.' },
            { title: '4. Reciclaje y Biomateriales para Impresión 3D', desc: 'Triturado de impresiones fallidas de PLA para reextrusión de filamento e investigación en bioplásticos caseros.' }
          ]
        };
      case 'ciencia-experimentacion':
        return {
          safety: 'general',
          modules: [
            { title: '1. Instrumentación Científica de Código Abierto', desc: 'Construcción de espectrómetros caseros, sensores de turbidez y microscopios digitales con lentes de smartphone.' },
            { title: '2. Estaciones de Monitoreo Ambiental Comunitario', desc: 'Medición de radiación solar UV, calidad de aire y variables climáticas con microcontroladores abiertos.' },
            { title: '3. Textiles Inteligentes y Wearables', desc: 'Hilo conductor de acero inoxidable, microcontroladores lavables y sensores biofísicos para monitoreo de salud.' },
            { title: '4. Ciencia Ciudadana y Conocimiento Compartido', desc: 'Metodologías para recopilar y validar datos científicos de forma comunitaria y pública.' }
          ]
        };
      default:
        return {
          safety: 'general',
          modules: [
            { title: 'Introducción al Área', desc: 'Aprende los fundamentos y mejores prácticas recomendadas por la comunidad maker.' }
          ]
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
            <span>Guía Temática & Conceptos</span>
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
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-puma-dark">
              Plan de Estudio y Conceptos Clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.modules.map((mod: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
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
