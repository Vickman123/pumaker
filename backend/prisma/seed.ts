import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando sembrado de datos para PUMAKER · UNAM ---');

  // 1. Limpiar base de datos si existían datos previos
  await prisma.resourceTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.linkCheck.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.simulator.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.learningPathStep.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.project.deleteMany();
  await prisma.video.deleteMany();
  await prisma.course.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Crear Administrador Inicial
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Pumaker2026!AdminSecure', salt);
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'admin@pumaker.unam.mx',
      passwordHash,
      role: 'admin'
    }
  });
  console.log('✓ Administrador creado: admin@pumaker.unam.mx');

  // 3. Crear las 11 Grandes Áreas Maker
  const categoriesData = [
    {
      slug: 'impresion-3d',
      name: 'Impresión 3D y Fabricación Aditiva',
      description: 'Modelado paramétrico, tecnologías FDM/SLA, laminadores (slicers), materiales y mantenimiento para materializar piezas tridimensionales.',
      icon: 'Box',
      color: '#2563EB',
      displayOrder: 1
    },
    {
      slug: 'corte-laser',
      name: 'Corte y Grabado Láser',
      description: 'Diseño vectorial (SVG/DXF), uniones mecánicas, cajas paramétricas, grabado y medidas de seguridad esenciales para corte CNC láser.',
      icon: 'Flame',
      color: '#DC2626',
      displayOrder: 2
    },
    {
      slug: 'electronica',
      name: 'Electrónica y Microcontroladores',
      description: 'Circuitos analógicos y digitales, microcontroladores Arduino, ESP32, Raspberry Pi Pico, diseño de PCB y proyectos de Internet de las Cosas (IoT).',
      icon: 'Cpu',
      color: '#059669',
      displayOrder: 3
    },
    {
      slug: 'robotica',
      name: 'Robótica y Mecatrónica',
      description: 'Diseño mecánico, cinemática, actuadores, sensores y programación para robots móviles, brazos mecánicos y sistemas autónomos.',
      icon: 'Bot',
      color: '#7C3AED',
      displayOrder: 4
    },
    {
      slug: 'audiovisual',
      name: 'Fotografía, Video y Creación Audiovisual',
      description: 'Composición fotográfica, iluminación, streaming con OBS, edición en DaVinci Resolve y documentación multimedia de proyectos maker.',
      icon: 'Video',
      color: '#D97706',
      displayOrder: 5
    },
    {
      slug: 'diseno-digital',
      name: 'Diseño y Creatividad Digital',
      description: 'Diseño vectorial con Inkscape, modelado 3D en Blender, prototipado UI/UX en Penpot y creación artística digital con herramientas abiertas.',
      icon: 'Palette',
      color: '#DB2777',
      displayOrder: 6
    },
    {
      slug: 'inteligencia-artificial',
      name: 'Inteligencia Artificial y Machine Learning',
      description: 'Visión por computadora, modelos de lenguaje, clasificación en el navegador con Teachable Machine y aplicaciones prácticas de IA en hardware.',
      icon: 'Sparkles',
      color: '#4F46E5',
      displayOrder: 7
    },
    {
      slug: 'tecnologias-inmersivas',
      name: 'Realidad Virtual, Aumentada y XR',
      description: 'Entornos inmersivos en navegador con Three.js y WebXR, desarrollo con Godot y experiencias espaciales sin instalaciones privativas.',
      icon: 'Glasses',
      color: '#0891B2',
      displayOrder: 8
    },
    {
      slug: 'programacion',
      name: 'Programación y Desarrollo Tecnológico',
      description: 'Pensamiento computacional, desarrollo web abierto (HTML/CSS/JS), Python, creative coding y control de versiones con Git/GitHub.',
      icon: 'Code2',
      color: '#0284C7',
      displayOrder: 9
    },
    {
      slug: 'sustentabilidad-diy',
      name: 'Sustentabilidad, Reparación y Cultura DIY',
      description: 'Reparabilidad de hardware, economía circular, reciclaje de filamentos, diseño ecológico y filosofía "Do It Yourself" (Hazlo tú mismo).',
      icon: 'Recycle',
      color: '#16A34A',
      displayOrder: 10
    },
    {
      slug: 'ciencia-experimentacion',
      name: 'Ciencia, Sensores y Experimentación',
      description: 'Instrumentación científica abierta, microscopía digital DIY, estaciones de monitoreo ambiental y ciencia ciudadana comunitaria.',
      icon: 'FlaskConical',
      color: '#9333EA',
      displayOrder: 11
    }
  ];

  const catMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    catMap.set(cat.slug, created.id);
  }
  console.log(`✓ 11 Grandes Áreas creadas.`);

  // 4. Sembrar Recursos Curados Reales
  const resourcesList = [
    // Inspiración Maker & Comunidad
    {
      slug: 'instructables-diy',
      title: 'Instructables — Plataforma de Proyectos DIY paso a paso',
      description: 'Comunidad global donde creadores comparten guías ilustradas paso a paso de electrónica, impresión 3D, carpintería, ciencia y talleres.',
      url: 'https://www.instructables.com/',
      categoryId: catMap.get('sustentabilidad-diy')!,
      type: 'plataforma',
      technology: 'DIY / Maker',
      level: 'todos',
      language: 'en',
      costType: 'gratuito',
      license: 'Creative Commons / Varios',
      author: 'Autodesk Instructables Community',
      institution: 'Instructables',
      featured: true
    },
    {
      slug: 'makezine-maker-media',
      title: 'Make: Magazine — Proyectos y Cultura Maker',
      description: 'Referente internacional de la cultura hacedora con proyectos abiertos, revisiones de herramientas y guías de fabricación digital.',
      url: 'https://makezine.com/',
      categoryId: catMap.get('sustentabilidad-diy')!,
      type: 'articulo',
      technology: 'Cultura Maker',
      level: 'todos',
      language: 'en',
      costType: 'gratuito',
      license: 'Publicación editorial',
      author: 'Make: Media',
      institution: 'Maker Media',
      featured: true
    },
    {
      slug: 'hackster-io-hardware',
      title: 'Hackster.io — Repositorio de Proyectos de Hardware e IoT',
      description: 'Plataforma comunitaria dedicada al aprendizaje de hardware de código abierto, microcontroladores y sensores con esquemáticos y código.',
      url: 'https://www.hackster.io/',
      categoryId: catMap.get('electronica')!,
      type: 'plataforma',
      technology: 'Arduino / ESP32 / Raspberry Pi',
      level: 'intermedio',
      language: 'en',
      costType: 'gratuito',
      license: 'Open Hardware',
      author: 'Comunidad Hackster',
      institution: 'Avnet',
      featured: true
    },
    {
      slug: 'hackaday-hardware-hacks',
      title: 'Hackaday — Ingeniería inversa, hacks y hardware abierto',
      description: 'Artículos y proyectos diarios enfocados en modificaciones electrónicas, ingeniería casera, hardware libre e innovación colaborativa.',
      url: 'https://hackaday.com/',
      categoryId: catMap.get('electronica')!,
      type: 'articulo',
      technology: 'Hardware abierto',
      level: 'avanzado',
      language: 'en',
      costType: 'gratuito',
      license: 'Open Source',
      author: 'Supplyframe',
      institution: 'Hackaday',
      featured: false
    },
    {
      slug: 'arduino-project-hub',
      title: 'Arduino Project Hub Oficial',
      description: 'El hub oficial de la comunidad Arduino con miles de proyectos explicados a detalle con diagramas de conexión, BOM y código descargable.',
      url: 'https://projecthub.arduino.cc/',
      categoryId: catMap.get('electronica')!,
      type: 'tutorial',
      technology: 'Arduino',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'Open Source Hardware',
      author: 'Arduino Team & Community',
      institution: 'Arduino',
      featured: true
    },
    {
      slug: 'mit-k12-maker-lab',
      title: 'MIT K12 Maker — Guías para Laboratorios Escolares',
      description: 'Recursos pedagógicos del MIT para implementar espacios de fabricación digital, diseño y creatividad en la educación.',
      url: 'https://k12maker.mit.edu/',
      categoryId: catMap.get('robotica')!,
      type: 'guia',
      technology: 'Educación Maker',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'Educativa abierta',
      author: 'MIT Edgerton Center',
      institution: 'Massachusetts Institute of Technology',
      featured: true
    },
    {
      slug: 'fab-academy-open-curriculum',
      title: 'Fab Academy — Currículum Abierto de Fabricación Digital',
      description: 'Programa internacional del Center for Bits and Atoms del MIT sobre cómo fabricar (casi) cualquier cosa usando máquinas CNC y electrónica.',
      url: 'https://fabacademy.org/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'curso',
      technology: 'Fabricación Digital',
      level: 'avanzado',
      language: 'en',
      costType: 'gratuito',
      license: 'Open Educational Resource',
      author: 'Neil Gershenfeld & Fab Foundation',
      institution: 'Fab Foundation',
      featured: true
    },
    {
      slug: 'hack-club-workshops',
      title: 'Hack Club Workshops — Talleres interactivos de programación',
      description: 'Colección de talleres guiados y de código abierto para que jóvenes construyan juegos, páginas web y dispositivos físicos.',
      url: 'https://hackclub.com/',
      categoryId: catMap.get('programacion')!,
      type: 'taller',
      technology: 'Web / Creative Coding',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'MIT',
      author: 'Hack Club Community',
      institution: 'Hack Club',
      featured: false
    },

    // Impresión 3D
    {
      slug: 'tinkercad-3d-design',
      title: 'Tinkercad 3D — Modelado 3D intuitivo en el navegador',
      description: 'Herramienta gratuita en línea para aprender modelado geométrico tridimensional, diseño para impresión 3D y circuitos electrónicos.',
      url: 'https://www.tinkercad.com/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'herramienta',
      technology: 'CAD 3D',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      requiresRegistration: true,
      license: 'Propietaria gratuita para educación',
      author: 'Autodesk',
      institution: 'Autodesk Education',
      featured: true
    },
    {
      slug: 'printables-repositorio-3d',
      title: 'Printables — Catálogo abierto de modelos 3D para imprimir',
      description: 'Comunidad creada por Prusa Research con modelos 3D verificados, archivos STL, 3MF y parámetros de impresión optimizados y libres.',
      url: 'https://www.printables.com/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'modelo3d',
      technology: 'FDM / SLA',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'Creative Commons',
      author: 'Prusa Research',
      institution: 'Prusa Research',
      featured: true
    },
    {
      slug: 'thingiverse-makerbot',
      title: 'Thingiverse — Biblioteca histórica de modelos 3D imprimibles',
      description: 'El mayor repositorio de modelos 3D de libre descarga para entusiastas de la fabricación aditiva y proyectos escolares.',
      url: 'https://www.thingiverse.com/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'modelo3d',
      technology: 'FDM',
      level: 'todos',
      language: 'en',
      costType: 'gratuito',
      license: 'Creative Commons',
      author: 'UltiMaker Community',
      institution: 'MakerBot / UltiMaker',
      featured: false
    },
    {
      slug: 'makerworld-bambu-lab',
      title: 'MakerWorld — Plataforma comunitaria de modelos 3D con perfiles listos',
      description: 'Repositorio moderno con perfiles de laminación integrados, modelos listos para imprimir y soporte para ensambles mecánicos complejos.',
      url: 'https://makerworld.com/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'modelo3d',
      technology: 'FDM',
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      license: 'Creative Commons / Varios',
      author: 'Bambu Lab Community',
      institution: 'Bambu Lab',
      featured: false
    },
    {
      slug: 'blender-org-open-source',
      title: 'Blender — Suite Open Source de Modelado y Animación 3D',
      description: 'Software libre de modelado 3D, escultura digital, rigging y animación. Excelente para preparar piezas orgánicas y artísticas.',
      url: 'https://www.blender.org/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'software',
      technology: 'Blender 3D',
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      license: 'GNU GPL (Open Source)',
      author: 'Blender Foundation',
      institution: 'Blender Foundation',
      featured: true
    },
    {
      slug: 'ultimaker-cura-slicer',
      title: 'UltiMaker Cura — Laminador Open Source líder para impresión 3D',
      description: 'Software laminador de código abierto para transformar modelos 3D (STL/OBJ) en código G-code compatible con cientos de impresoras.',
      url: 'https://ultimaker.com/software/ultimaker-cura/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'software',
      technology: 'G-Code / Slicer',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'LGPLv3 (Open Source)',
      author: 'UltiMaker',
      institution: 'UltiMaker',
      featured: true
    },
    {
      slug: 'prusa-knowledge-base',
      title: 'Prusa Knowledge Base — Guía maestra de impresión y solución de fallas',
      description: 'Manual integral de calibración, temperaturas, retracción, adherencia y resolución de problemas comunes en impresión 3D.',
      url: 'https://help.prusa3d.com/',
      categoryId: catMap.get('impresion-3d')!,
      type: 'manual',
      technology: 'Mantenimiento 3D',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'Open Access',
      author: 'Prusa Research Team',
      institution: 'Prusa Research',
      featured: true
    },

    // Corte y Grabado Láser
    {
      slug: 'inkscape-vector-editor',
      title: 'Inkscape — Editor Gráfico Vectorial Libre y Open Source',
      description: 'El estándar libre para diseño vectorial profesional. Ideal para preparar trazados de corte en formato SVG y DXF para cortadoras láser.',
      url: 'https://inkscape.org/',
      categoryId: catMap.get('corte-laser')!,
      type: 'software',
      technology: 'SVG / Vectorial',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'GNU GPL (Open Source)',
      author: 'Comunidad Inkscape',
      institution: 'Inkscape.org',
      featured: true
    },
    {
      slug: 'makercase-box-generator',
      title: 'MakerCase — Generador de cajas para corte láser en el navegador',
      description: 'Herramienta web interactiva para generar planos de cajas con uniones de dedos (finger joints) y ranuras con compensación de kerf en SVG.',
      url: 'https://www.makercase.com/',
      categoryId: catMap.get('corte-laser')!,
      type: 'herramienta',
      technology: 'Corte Láser / SVG',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Libre en web',
      author: 'Jon Goebel',
      institution: 'MakerCase',
      featured: true
    },
    {
      slug: 'boxes-py-laser-box',
      title: 'Boxes.py — Generador paramétrico avanzado de cajas y ensambles',
      description: 'Poderoso generador web de cajas con bisagras vivas, compartimentos, gavetas y ensambles complejos de madera para corte láser.',
      url: 'https://boxes.hackerspace-bamberg.de/',
      categoryId: catMap.get('corte-laser')!,
      type: 'herramienta',
      technology: 'Corte Láser / Paramétrico',
      level: 'intermedio',
      language: 'en',
      costType: 'gratuito',
      license: 'GPLv3',
      author: 'Florian Festi',
      institution: 'Hackerspace Bamberg',
      featured: true
    },
    {
      slug: 'lightburn-software-docs',
      title: 'LightBurn Software — Documentación oficial y control de máquinas',
      description: 'Software de referencia en la industria para diseño, edición y control de cortadoras láser CO2, fibra y diodo. Guía de uso y kerf.',
      url: 'https://lightburnsoftware.com/',
      categoryId: catMap.get('corte-laser')!,
      type: 'manual',
      technology: 'Control Láser',
      level: 'intermedio',
      language: 'en',
      costType: 'freemium',
      license: 'Comercial con prueba gratuita',
      author: 'LightBurn Software LLC',
      institution: 'LightBurn',
      featured: false
    },
    {
      slug: 'trotec-laser-academy',
      title: 'Trotec Laser Academy — Consejos de grabado, materiales y seguridad',
      description: 'Guías de configuración de potencias, velocidades y reglas de seguridad esenciales: advertencias sobre materiales prohibidos como PVC.',
      url: 'https://www.troteclaser.com/',
      categoryId: catMap.get('corte-laser')!,
      type: 'guia',
      technology: 'Seguridad Láser',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'Corporativa abierta',
      author: 'Trotec Laser GmbH',
      institution: 'Trotec Laser',
      featured: true
    },

    // Electrónica
    {
      slug: 'arduino-official-docs',
      title: 'Documentación Oficial de Arduino y Referencia del Lenguaje',
      description: 'Tutoriales oficiales, librerías, referencia de sintaxis C++ para Arduino y guías de pines de placas Uno, Mega, Nano y Nano ESP32.',
      url: 'https://docs.arduino.cc/',
      categoryId: catMap.get('electronica')!,
      type: 'documentacion',
      technology: 'Arduino IDE / C++',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Creative Commons BY-SA',
      author: 'Arduino Official Team',
      institution: 'Arduino',
      featured: true
    },
    {
      slug: 'adafruit-learn-system',
      title: 'Adafruit Learning System — Cientos de guías de electrónica DIY',
      description: 'Tutoriales paso a paso de electrónica, sensores, wearables, MicroPython, CircuitPython y microcontroladores con código abierto.',
      url: 'https://learn.adafruit.com/',
      categoryId: catMap.get('electronica')!,
      type: 'guia',
      technology: 'CircuitPython / IoT',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'CC BY-SA / MIT',
      author: 'Adafruit Industries',
      institution: 'Adafruit',
      featured: true
    },
    {
      slug: 'sparkfun-learn',
      title: 'SparkFun Learn — Fundamentos de electrónica y sensores',
      description: 'Explicaciones claras de la Ley de Ohm, comunicación I2C/SPI, lectura de sensores analógicos y técnicas profesionales de soldadura.',
      url: 'https://learn.sparkfun.com/',
      categoryId: catMap.get('electronica')!,
      type: 'tutorial',
      technology: 'Circuitos y Sensores',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'CC BY-SA',
      author: 'SparkFun Electronics',
      institution: 'SparkFun',
      featured: true
    },
    {
      slug: 'wokwi-simulator',
      title: 'Wokwi — Simulador de Arduino, ESP32 y Raspberry Pi Pico en navegador',
      description: 'Simula circuitos completos en tiempo real con Arduino, pantallas OLED, sensores ultrasónicos, LEDs y WiFi sin comprar componentes físicos.',
      url: 'https://wokwi.com/',
      categoryId: catMap.get('electronica')!,
      type: 'simulador',
      technology: 'Arduino / ESP32 / Wokwi',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Freemium / Abierto en navegador',
      author: 'Uri Shaked',
      institution: 'Wokwi Systems',
      featured: true
    },
    {
      slug: 'kicad-eda-suite',
      title: 'KiCad EDA — Suite Profesional Open Source para Diseño de PCB',
      description: 'El programa de código abierto líder para captura de esquemáticos electrónicos y diseño de placas de circuito impreso (PCB) multicapa.',
      url: 'https://www.kicad.org/',
      categoryId: catMap.get('electronica')!,
      type: 'software',
      technology: 'PCB Design / EDA',
      level: 'avanzado',
      language: 'es',
      costType: 'gratuito',
      license: 'GNU GPL v3',
      author: 'KiCad Development Team',
      institution: 'CERN / KiCad Association',
      featured: true
    },
    {
      slug: 'all-about-circuits',
      title: 'All About Circuits — Libro de texto abierto de teoría de circuitos',
      description: 'Lecciones profundas sobre análisis de circuitos DC/AC, semiconductores, amplificadores operacionales y electrónica digital.',
      url: 'https://www.allaboutcircuits.com/',
      categoryId: catMap.get('electronica')!,
      type: 'curso',
      technology: 'Teoría de Circuitos',
      level: 'intermedio',
      language: 'en',
      costType: 'gratuito',
      license: 'Open Book',
      author: 'Tony R. Kuphaldt & EETech',
      institution: 'EETech Media',
      featured: false
    },

    // Robótica y Programación de Bloques
    {
      slug: 'microbit-projects',
      title: 'Micro:bit Educational Foundation — Proyectos para micro:bit',
      description: 'Plataforma con decenas de proyectos educativos para la placa BBC micro:bit programables con bloques MakeCode o Python.',
      url: 'https://microbit.org/projects/',
      categoryId: catMap.get('robotica')!,
      type: 'proyecto',
      technology: 'micro:bit',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Educativa abierta',
      author: 'Micro:bit Educational Foundation',
      institution: 'BBC / Micro:bit Foundation',
      featured: true
    },
    {
      slug: 'scratch-mit-edu',
      title: 'Scratch — Programación por bloques del MIT Media Lab',
      description: 'La comunidad de programación creativa más grande del mundo para aprender lógica de control, variables, eventos y bucles.',
      url: 'https://scratch.mit.edu/',
      categoryId: catMap.get('programacion')!,
      type: 'herramienta',
      technology: 'Scratch',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Libre y gratuito para educación',
      author: 'Lifelong Kindergarten Group',
      institution: 'MIT Media Lab',
      featured: true
    },
    {
      slug: 'open-roberta-lab',
      title: 'Open Roberta Lab — Entorno de simulación de robótica en la nube',
      description: 'Simula y programa robots virtuales y reales (EV3, micro:bit, Calliope, Arduino) con bloques NEPO desarrollados por el Instituto Fraunhofer.',
      url: 'https://lab.open-roberta.org/',
      categoryId: catMap.get('robotica')!,
      type: 'simulador',
      technology: 'Robótica Educativa',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Open Source',
      author: 'Fraunhofer IAIS',
      institution: 'Fraunhofer Institute',
      featured: true
    },
    {
      slug: 'coppelia-sim-robotics',
      title: 'CoppeliaSim (V-REP) — Simulador cinemático y dinámico de robots',
      description: 'Potente simulador de robótica con cinemática directa/inversa, física de colisiones y soporte para ROS (Robot Operating System).',
      url: 'https://www.coppeliarobotics.com/',
      categoryId: catMap.get('robotica')!,
      type: 'software',
      technology: 'Cinemática / ROS',
      level: 'avanzado',
      language: 'en',
      costType: 'freemium',
      license: 'Gratuito para fines educativos',
      author: 'Coppelia Robotics',
      institution: 'Coppelia Robotics',
      featured: false
    },

    // Audiovisual
    {
      slug: 'davinci-resolve-free',
      title: 'DaVinci Resolve — Suite profesional de edición de video y color',
      description: 'La herramienta más completa para montaje de video, corrección de color cinematográfica, efectos visuales con Fusion y postproducción de audio.',
      url: 'https://www.blackmagicdesign.com/products/davinciresolve',
      categoryId: catMap.get('audiovisual')!,
      type: 'software',
      technology: 'Video / Edición',
      level: 'intermedio',
      language: 'es',
      costType: 'freemium',
      license: 'Versión gratuita completa sin marcas de agua',
      author: 'Blackmagic Design',
      institution: 'Blackmagic Design',
      featured: true
    },
    {
      slug: 'obs-studio-open-source',
      title: 'OBS Studio — Transmisión y Grabación de Video Open Source',
      description: 'Software libre multiplataforma para capturar pantallas, cámaras, mezclar audio y transmitir en directo a YouTube, Twitch y aulas virtuales.',
      url: 'https://obsproject.com/',
      categoryId: catMap.get('audiovisual')!,
      type: 'software',
      technology: 'Streaming / Grabación',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'GNU GPL v2 (Open Source)',
      author: 'OBS Project Contributors',
      institution: 'OBS Project',
      featured: true
    },
    {
      slug: 'audacity-audio-editor',
      title: 'Audacity — Editor de Audio Multipista Libre',
      description: 'Graba podcasts, limpia ruido de fondo, normaliza audio y edita locuciones para tus videos y tutoriales tecnológicos.',
      url: 'https://www.audacityteam.org/',
      categoryId: catMap.get('audiovisual')!,
      type: 'software',
      technology: 'Audio / Podcast',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'GNU GPL v3',
      author: 'Audacity Team',
      institution: 'Muse Group',
      featured: true
    },
    {
      slug: 'pexels-creative-commons',
      title: 'Pexels — Banco de fotografías y videos de libre uso',
      description: 'Imágenes y videos de alta calidad bajo licencia libre de derechos para enriquecer documentaciones y presentaciones maker.',
      url: 'https://www.pexels.com/',
      categoryId: catMap.get('audiovisual')!,
      type: 'herramienta',
      technology: 'Banco multimedia',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'Pexels License (Uso libre)',
      author: 'Pexels Community',
      institution: 'Canva / Pexels',
      featured: false
    },

    // Inteligencia Artificial
    {
      slug: 'teachable-machine-google',
      title: 'Teachable Machine de Google — Entrena modelos de IA en tu navegador',
      description: 'Herramienta basada en web que permite entrenar modelos de aprendizaje automático para reconocer imágenes, sonidos o posturas sin programar.',
      url: 'https://teachablemachine.withgoogle.com/',
      categoryId: catMap.get('inteligencia-artificial')!,
      type: 'simulador',
      technology: 'TensorFlow.js / IA',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'Apache 2.0 / Google Creative Lab',
      author: 'Google Creative Lab',
      institution: 'Google Experiments',
      featured: true
    },
    {
      slug: 'hugging-face-hub',
      title: 'Hugging Face — El hogar del código abierto para modelos de IA',
      description: 'Explora y utiliza miles de modelos de lenguaje, visión artificial y audio de código abierto para tus prototipos interactivos.',
      url: 'https://huggingface.co/',
      categoryId: catMap.get('inteligencia-artificial')!,
      type: 'plataforma',
      technology: 'Transformers / LLM',
      level: 'intermedio',
      language: 'en',
      costType: 'freemium',
      license: 'Varios Open Source',
      author: 'Hugging Face Community',
      institution: 'Hugging Face',
      featured: true
    },
    {
      slug: 'ml5-js-friendly-ai',
      title: 'ml5.js — Inteligencia artificial amigable para la web',
      description: 'Librería construida sobre TensorFlow.js diseñada para artistas, diseñadores y creadores novatos en el entorno web.',
      url: 'https://ml5js.org/',
      categoryId: catMap.get('inteligencia-artificial')!,
      type: 'herramienta',
      technology: 'JavaScript / IA',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'MIT (Open Source)',
      author: 'ITP NYU Community',
      institution: 'New York University',
      featured: true
    },
    {
      slug: 'google-ml-crash-course',
      title: 'Google Machine Learning Crash Course Oficial',
      description: 'Curso con ejercicios en video y laboratorios en Google Colab con TensorFlow para aprender conceptos de aprendizaje automático.',
      url: 'https://developers.google.com/machine-learning/crash-course',
      categoryId: catMap.get('inteligencia-artificial')!,
      type: 'curso',
      technology: 'Machine Learning',
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      license: 'CC BY 4.0',
      author: 'Google AI Developers',
      institution: 'Google',
      featured: true
    },

    // Tecnologías Inmersivas
    {
      slug: 'three-js-webgl-library',
      title: 'Three.js — Biblioteca 3D para la web sobre WebGL y WebGPU',
      description: 'La librería JavaScript estándar para renderizar gráficos interactivos en 3D directo en cualquier navegador web moderno sin plugins.',
      url: 'https://threejs.org/',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      type: 'herramienta',
      technology: 'Three.js / WebGL',
      level: 'intermedio',
      language: 'en',
      costType: 'gratuito',
      license: 'MIT (Open Source)',
      author: 'Ricardo Cabello (Mr.doob) & Community',
      institution: 'Three.js Organization',
      featured: true
    },
    {
      slug: 'a-frame-webxr-framework',
      title: 'A-Frame — Framework para Realidad Virtual en WebXR con HTML',
      description: 'Crea mundos virtuales inmersivos para cascos VR, móviles y navegadores utilizando etiquetas HTML declarativas y Three.js.',
      url: 'https://aframe.io/',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      type: 'herramienta',
      technology: 'WebXR / HTML',
      level: 'principiante',
      language: 'en',
      costType: 'gratuito',
      license: 'MIT',
      author: 'Supermedium & Mozilla Team',
      institution: 'Mozilla / Supermedium',
      featured: true
    },
    {
      slug: 'godot-engine-open-source',
      title: 'Godot Engine — Motor libre de videojuegos 2D, 3D y XR',
      description: 'Motor de código abierto ligero, potente y sin regalías para desarrollar experiencias interactivas y simulaciones espaciales.',
      url: 'https://godotengine.org/',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      type: 'software',
      technology: 'Godot / GDScript',
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      license: 'MIT (Open Source)',
      author: 'Juan Linietsky, Ariel Manzur & Community',
      institution: 'Godot Foundation',
      featured: true
    },

    // Programación y Desarrollo
    {
      slug: 'mdn-web-docs-es',
      title: 'MDN Web Docs en Español — Referencia definitiva de HTML, CSS y JS',
      description: 'La documentación más completa y confiable del mundo para aprender desarrollo web estándar y accesible.',
      url: 'https://developer.mozilla.org/es/',
      categoryId: catMap.get('programacion')!,
      type: 'documentacion',
      technology: 'Web Standards',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'CC-BY-SA',
      author: 'Mozilla Developer Network Community',
      institution: 'Mozilla',
      featured: true
    },
    {
      slug: 'freecodecamp-org-es',
      title: 'freeCodeCamp en Español — Aprende a programar gratis',
      description: 'Plataforma interactiva gratuita con miles de desafíos y proyectos con certificaciones en desarrollo web, Python y análisis de datos.',
      url: 'https://www.freecodecamp.org/espanol/',
      categoryId: catMap.get('programacion')!,
      type: 'curso',
      technology: 'JavaScript / Python',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'BSD 3-Clause',
      author: 'Quincy Larson & freeCodeCamp',
      institution: 'freeCodeCamp.org',
      featured: true
    },
    {
      slug: 'p5-js-creative-coding',
      title: 'p5.js — Programación creativa y arte generativo en JavaScript',
      description: 'Librería JavaScript que hace accesible el código a artistas, diseñadores y educadores para crear dibujos interactivos en el navegador.',
      url: 'https://p5js.org/es/',
      categoryId: catMap.get('programacion')!,
      type: 'herramienta',
      technology: 'Canvas / Creative Coding',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'LGPLv2.1 (Open Source)',
      author: 'Lauren McCarthy & Processing Foundation',
      institution: 'Processing Foundation',
      featured: true
    },

    // Sustentabilidad y Reparación
    {
      slug: 'ifixit-manuales-reparacion',
      title: 'iFixit — Manuales abiertos de reparación de dispositivos y hardware',
      description: 'La mayor base de datos abierta con guías paso a paso para reparar celulares, computadoras, electrodomésticos y combatir la obsolescencia.',
      url: 'https://www.ifixit.com/',
      categoryId: catMap.get('sustentabilidad-diy')!,
      type: 'manual',
      technology: 'Derecho a Reparar',
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      license: 'CC BY-NC-SA 3.0',
      author: 'Kyle Wiens & Comunidad iFixit',
      institution: 'iFixit',
      featured: true
    },
    {
      slug: 'ellen-macarthur-foundation',
      title: 'Fundación Ellen MacArthur — Principios de Economía Circular',
      description: 'Guías de diseño regenerativo y materiales sostenibles para creadores, diseñadores industriales e ingenieros de producto.',
      url: 'https://www.ellenmacarthurfoundation.org/',
      categoryId: catMap.get('sustentabilidad-diy')!,
      type: 'guia',
      technology: 'Economía Circular',
      level: 'todos',
      language: 'es',
      costType: 'gratuito',
      license: 'Educativa abierta',
      author: 'Ellen MacArthur Foundation',
      institution: 'Ellen MacArthur Foundation',
      featured: false
    }
  ];

  for (const res of resourcesList) {
    await prisma.resource.create({ data: res });
  }
  console.log(`✓ ${resourcesList.length} Recursos iniciales sembrados.`);

  // 5. Sembrar Canales y Videos de YouTube Prioritarios
  const videosList = [
    {
      slug: 'teaching-tech-calibracion-3d',
      title: 'Guía Integral de Calibración de Impresoras 3D — Teaching Tech',
      description: 'Metodología paso a paso para calibrar pasos por milímetro, flujo de filamento, retracción y temperatura de boquilla.',
      youtubeId: 'rp3r9KEgk38',
      youtubeUrl: 'https://www.youtube.com/watch?v=rp3r9KEgk38',
      channelTitle: 'Teaching Tech',
      channelUrl: 'https://www.youtube.com/@TeachingTech',
      categoryId: catMap.get('impresion-3d')!,
      level: 'intermedio',
      duration: '18 min',
      featured: true
    },
    {
      slug: 'cnc-kitchen-resistencia-filamentos',
      title: 'Comparativa de Resistencia: PLA vs PETG vs ABS — CNC Kitchen',
      description: 'Pruebas destructivas de laboratorio para evaluar la resistencia mecánica y térmica de filamentos para fabricación aditiva.',
      youtubeId: 'n1hH307_d4U',
      youtubeUrl: 'https://www.youtube.com/watch?v=n1hH307_d4U',
      channelTitle: 'CNC Kitchen',
      channelUrl: 'https://www.youtube.com/@CNCkitchen',
      categoryId: catMap.get('impresion-3d')!,
      level: 'intermedio',
      duration: '15 min',
      featured: true
    },
    {
      slug: 'makers-muse-errores-comunes',
      title: 'Top 10 errores al comenzar a imprimir en 3D — Maker\'s Muse',
      description: 'Consejos fundamentales sobre nivelación de cama, adherencia de primera capa y orientación de modelos 3D.',
      youtubeId: 'qwuPiaFU37w',
      youtubeUrl: 'https://www.youtube.com/watch?v=qwuPiaFU37w',
      channelTitle: 'Maker\'s Muse',
      channelUrl: 'https://www.youtube.com/@MakersMuse',
      categoryId: catMap.get('impresion-3d')!,
      level: 'principiante',
      duration: '14 min',
      featured: false
    },
    {
      slug: 'ben-eater-computadora-8-bits',
      title: 'Construye una Computadora de 8 bits desde cero en Protoboards — Ben Eater',
      description: 'Serie legendaria de ingeniería informática explicando cómo funciona un microprocesador desde compuertas lógicas básicas.',
      youtubeId: 'HyznrdDSSGM',
      youtubeUrl: 'https://www.youtube.com/watch?v=HyznrdDSSGM',
      channelTitle: 'Ben Eater',
      channelUrl: 'https://www.youtube.com/@BenEater',
      categoryId: catMap.get('electronica')!,
      level: 'avanzado',
      duration: '22 min',
      featured: true
    },
    {
      slug: 'greatscott-fundamentos-electronica',
      title: 'Fundamentos de Transistores y MOSFETs explicados — GreatScott!',
      description: 'Explicación práctica con osciloscopio sobre cómo activar cargas grandes usando microcontroladores y transistores.',
      youtubeId: 'sTu3LwpF6XI',
      youtubeUrl: 'https://www.youtube.com/watch?v=sTu3LwpF6XI',
      channelTitle: 'GreatScott!',
      channelUrl: 'https://www.youtube.com/@GreatScottLab',
      categoryId: catMap.get('electronica')!,
      level: 'intermedio',
      duration: '12 min',
      featured: true
    },
    {
      slug: 'andreas-spiess-esp32-sensores',
      title: 'Comparativa de conectividad ESP32 y sensores IoT — Andreas Spiess',
      description: 'Análisis de consumo eléctrico en reposo (deep sleep) y protocolos MQTT para proyectos maker de bajo consumo.',
      youtubeId: '5kO_v_p6L0o',
      youtubeUrl: 'https://www.youtube.com/watch?v=5kO_v_p6L0o',
      channelTitle: 'Andreas Spiess',
      channelUrl: 'https://www.youtube.com/@AndreasSpiess',
      categoryId: catMap.get('electronica')!,
      level: 'intermedio',
      duration: '16 min',
      featured: false
    },
    {
      slug: 'trotec-laser-parametros',
      title: 'Ajuste de Foco, Potencia y Frecuencia en Corte Láser — Trotec Laser',
      description: 'Tutorial técnico para conseguir bordes limpios en acrílico y madera MDF, minimizando el quemado y la carbonización.',
      youtubeId: 'Gg48z3YpG4Y',
      youtubeUrl: 'https://www.youtube.com/watch?v=Gg48z3YpG4Y',
      channelTitle: 'Trotec Laser',
      channelUrl: 'https://www.youtube.com/@TrotecLaserEngraving',
      categoryId: catMap.get('corte-laser')!,
      level: 'intermedio',
      duration: '10 min',
      featured: true
    },
    {
      slug: 'lightburn-tutorial-completo',
      title: 'Curso Rápido de LightBurn: De la idea a la máquina cortadora',
      description: 'Aprende a importar vectores SVG, configurar capas de corte/grabado y realizar el encuadre preliminar en la mesa de trabajo.',
      youtubeId: '4j_nLq5p4nE',
      youtubeUrl: 'https://www.youtube.com/watch?v=4j_nLq5p4nE',
      channelTitle: 'LightBurn Software',
      channelUrl: 'https://www.youtube.com/@LightBurnSoftware',
      categoryId: catMap.get('corte-laser')!,
      level: 'principiante',
      duration: '25 min',
      featured: true
    },
    {
      slug: 'davinci-resolve-edicion-principiantes',
      title: 'Edición de Video en DaVinci Resolve para Proyectos Maker',
      description: 'Guía oficial de corte de clips, inserción de títulos limpios y renderizado optimizado a 1080p y 4K para YouTube.',
      youtubeId: '63Jn_6H_x8A',
      youtubeUrl: 'https://www.youtube.com/watch?v=63Jn_6H_x8A',
      channelTitle: 'Blackmagic Design',
      channelUrl: 'https://www.youtube.com/@BlackmagicDesign',
      categoryId: catMap.get('audiovisual')!,
      level: 'principiante',
      duration: '30 min',
      featured: true
    },
    {
      slug: 'obs-configuracion-optima',
      title: 'Configuración de OBS Studio para grabar tutoriales de pantalla',
      description: 'Optimización de bitrate, filtros de audio de reducción de ruido y escenas multicámara para creadores de contenido educativo.',
      youtubeId: 'yTRtH4n1rLk',
      youtubeUrl: 'https://www.youtube.com/watch?v=yTRtH4n1rLk',
      channelTitle: 'OBS Project',
      channelUrl: 'https://www.youtube.com/@OBSProject',
      categoryId: catMap.get('audiovisual')!,
      level: 'principiante',
      duration: '15 min',
      featured: false
    },
    {
      slug: 'blender-donut-tutorial',
      title: 'Fundamentos de Blender 3D: Modelado y Materiales',
      description: 'Introducción básica al espacio tridimensional, navegación orbital, atajos de teclado y modificadores esenciales.',
      youtubeId: 'TPrnSACiTJ4',
      youtubeUrl: 'https://www.youtube.com/watch?v=TPrnSACiTJ4',
      channelTitle: 'Blender Official / Blender Guru',
      channelUrl: 'https://www.youtube.com/@BlenderOfficial',
      categoryId: catMap.get('diseno-digital')!,
      level: 'principiante',
      duration: '20 min',
      featured: true
    }
  ];

  for (const vid of videosList) {
    await prisma.video.create({ data: vid });
  }
  console.log(`✓ ${videosList.length} Videos verificados sembrados.`);

  // 6. Sembrar los 30 Proyectos Maker Completos Paso a Paso
  const projectsData = [
    // --- Impresión 3D (1 al 6) ---
    {
      slug: 'soporte-celular-paramétrico-3d',
      title: 'Soporte Ajustable para Celular con Ranura de Carga',
      summary: 'Diseña e imprime un soporte de escritorio ergonómico para smartphone con ángulo de visión óptimo y paso de cable USB.',
      content: 'Un proyecto introductorio perfecto para familiarizarse con tolerancias mecánicas, voladizos sin soportes y altura de capa en impresión 3D.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'principiante',
      estimatedTime: '2 horas de impresión + 30 min modelado',
      materials: '50g de filamento PLA (cualquier color)',
      tools: 'Impresora 3D FDM con boquilla de 0.4mm, espátula para despegar piezas',
      software: 'Tinkercad o FreeCAD, UltiMaker Cura o PrusaSlicer',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Medición del dispositivo', detail: 'Mide con calibrador el grosor de tu celular con funda incluida (promedio 11-13 mm).' },
        { step: 2, title: 'Modelado en Tinkercad', detail: 'Crea una base triangular con un ángulo de 65 grados y una ranura pasante para el conector USB-C.' },
        { step: 3, title: 'Laminación en Cura/PrusaSlicer', detail: 'Configura 3 paredes perimétricas, 20% de relleno gyroid o grid, y sin soportes colocando la pieza de costado.' },
        { step: 4, title: 'Impresión y verificación', detail: 'Imprime a 205°C con cama a 60°C. Comprueba la estabilidad sobre la mesa.' }
      ]),
      filesJson: JSON.stringify([{ name: 'soporte_celular_pumaker.stl', url: '#' }]),
      expectedResult: 'Soporte rígido y estable que sostiene el teléfono vertical u horizontalmente permitiendo conectar el cable de carga.',
      imageUrl: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=800&q=80',
      tips: 'Orienta la pieza de lado en la cama del laminador para evitar que las capas se separen con el peso del teléfono.',
      featured: true
    },
    {
      slug: 'organizador-cables-escritorio',
      title: 'Organizador Modular de Cables y Memorias USB',
      summary: 'Diseño compacto de escritorio para fijar cables de cargador y almacenar tarjetas SD y llaves USB.',
      content: 'Aprende a diseñar ensambles por presión (snap-fit) y calcular la contracción térmica del filamento PLA.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'principiante',
      estimatedTime: '1.5 horas',
      materials: '40g de filamento PLA o PETG',
      tools: 'Impresora 3D FDM',
      software: 'FreeCAD o Tinkercad, laminador FDM',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Definir diámetros', detail: 'Determina las ranuras para cables USB estándar (diámetro 4 mm a 5 mm).' },
        { step: 2, title: 'Diseño de clips con flexibilidad', detail: 'Añade pestañas curvas que cedan ligeramente al presionar el cable hacia adentro.' },
        { step: 3, title: 'Impresión de prueba', detail: 'Imprime primero una muestra de 10 minutos para validar que los cables no queden ni muy flojos ni atorados.' }
      ]),
      expectedResult: 'Bloque organizador con ranuras firmes que se fija al borde de la mesa con cinta doble cara.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'llaveros-personalizados-relieve',
      title: 'Llaveros Institucionales con Cambio de Color en Pausa',
      summary: 'Fabrica llaveros personalizados con texto en relieve cambiando de filamento a una altura determinada para lograr dos colores.',
      content: 'Técnica fundamental para lograr impresiones multicolor con una sola boquilla mediante el comando M600 o pausa en capa.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'principiante',
      estimatedTime: '45 minutos',
      materials: '15g filamento azul marino y 5g filamento dorado',
      tools: 'Impresora 3D FDM, pinzas de punta',
      software: 'Inkscape (para vectorizar silueta) y Tinkercad o Cura',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Diseño 2D en SVG', detail: 'Dibuja el contorno y las letras en Inkscape con trazos definidos.' },
        { step: 2, title: 'Extrusión en 3D', detail: 'Importa el SVG en Tinkercad. Extruye la base a 2 mm y el texto en relieve a 3.6 mm.' },
        { step: 3, title: 'Insertar pausa en laminador', detail: 'En Cura/PrusaSlicer coloca una pausa en la capa donde inicia el texto para cambiar de azul a dorado.' }
      ]),
      expectedResult: 'Llavero bicolor duradero con argolla metálica insertada.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'pieza-repuesto-engrane-mecánico',
      title: 'Pieza de Repuesto: Engrane Paramétrico Reforzado',
      summary: 'Modela un engrane de repuesto para reparar un aparato averiado, calculando módulo, número de dientes y eje estriado.',
      content: 'Aplica conceptos de ingeniería inversa y diseño para resistencia mecánica con materiales como PETG o ABS.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'intermedio',
      estimatedTime: '3 horas',
      materials: '60g PETG para mayor resistencia a la fricción',
      tools: 'Calibrador pie de rey, impresora 3D calibrada',
      software: 'FreeCAD (módulo Gear) o Autodesk Fusion',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Medición de la pieza dañada', detail: 'Determina el diámetro exterior, diámetro de eje y cuenta el número de dientes para calcular el módulo.' },
        { step: 2, title: 'Generación del perfil de diente', detail: 'Usa el generador involuta en FreeCAD para obtener el perfil exacto de contacto.' },
        { step: 3, title: 'Laminación estructural', detail: 'Configura 5 perímetros de pared y 40% de relleno cúbico o gyroid para soportar torque.' }
      ]),
      expectedResult: 'Engrane funcional que sustituye con precisión la pieza rota restaurando el mecanismo.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'maqueta-arquitectonica-seccionada',
      title: 'Maqueta Arquitectónica Modular con Ensambles Ocultos',
      summary: 'Prototipa un modelo a escala de un edificio o pabellón modular seccionado para inspección interior.',
      content: 'Aprende a escalar modelos CAD complejos y dividir volúmenes grandes para camas de impresión estándar.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'intermedio',
      estimatedTime: '6 horas de impresión divididas',
      materials: '180g de PLA mate blanco o gris claro',
      tools: 'Impresora 3D, lija fina de grano 400',
      software: 'Blender, FreeCAD, laminador 3D',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Optimización de geometría', detail: 'Simplifica mallas complejas y cierra orificios no manifold.' },
        { step: 2, title: 'Corte por planos de entrepiso', detail: 'Divide el edificio por niveles añadiendo pernos de centrado de 3 mm.' },
        { step: 3, title: 'Impresión con capas finas', detail: 'Usa altura de capa de 0.16 mm para resaltar los detalles de cancelería y vanos.' }
      ]),
      expectedResult: 'Maqueta desmontable de alta definición visual con excelente acople entre pisos.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'modelo-anatomico-corazon-didactico',
      title: 'Modelo Anatómico Didáctico con Secciones Desmontables',
      summary: 'Imprime un corazón humano didáctico a partir de datos tomográficos abiertos para enseñanza de ciencias médicas y biológicas.',
      content: 'Explora el procesamiento de datos científicos biomédicos y la impresión de estructuras orgánicas con soportes tipo árbol.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'avanzado',
      estimatedTime: '8 horas',
      materials: '220g PLA en dos colores distintos',
      tools: 'Impresora 3D FDM, pinzas de corte para remover soportes',
      software: '3D Slicer (código abierto biomédico), Blender, Cura',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Obtención de la malla médica', detail: 'Descarga el modelo de corazón de repositorios abiertos de anatomía médica.' },
        { step: 2, title: 'Configuración de soportes orgánicos/árbol', detail: 'Activa soportes tipo árbol para facilitar su remoción sin dañar las cavidades internas.' },
        { step: 3, title: 'Postprocesado y ensamble de imanes', detail: 'Inserta pequeños imanes de neodimio de 3 mm en los orificios para mantener las dos mitades unidas.' }
      ]),
      expectedResult: 'Modelo anatómico interactivo que se abre para mostrar ventrículos, aurículas y válvulas.',
      imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      featured: true
    },

    // --- Corte y Grabado Láser (7 al 12) ---
    {
      slug: 'caja-parametrica-laser-kerf',
      title: 'Caja Paramétrica con Ranuras de Dientes y Compensación de Kerf',
      summary: 'Diseña y corta una caja ensamblable de MDF sin pegamento calculando la merma del rayo láser (kerf).',
      content: 'Proyecto esencial para entender cómo el ancho del corte del láser afecta el ajuste a presión de ensambles en madera y acrílico.',
      categoryId: catMap.get('corte-laser')!,
      level: 'principiante',
      estimatedTime: '1 hora (15 min corte)',
      materials: 'Lámina de MDF o Triplay de 3mm de 30x30 cm',
      tools: 'Cortadora láser CO2 o diodo, extractor de humos activo',
      software: 'MakerCase o Boxes.py, Inkscape, LightBurn',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Medición del grosor real del material', detail: 'Mide con vernier el espesor exacto de la lámina (comúnmente varía entre 2.8 y 3.2 mm).' },
        { step: 2, title: 'Generación del plano en MakerCase', detail: 'Configura dimensiones (100x100x60 mm) y especifica uniones Finger Joints con compensación de kerf de 0.15 mm.' },
        { step: 3, title: 'Preparación en Inkscape/LightBurn', detail: 'Asigna color rojo (RGB) a las líneas de corte con grosor de 0.01 mm y color negro a cualquier texto grabado.' },
        { step: 4, title: 'Corte con medidas de seguridad', detail: 'Verifica la asistencia de aire, enfoca el cabezal a la distancia focal correcta y supervisa el corte en todo momento.' }
      ]),
      expectedResult: 'Caja de 6 caras ensamblada a presión perfectamente rígida que no requiere adhesivos.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      tips: 'NUNCA cortes materiales con cloro como PVC o vinilo: emiten gas cloro tóxico que corroe el equipo y daña la salud.',
      featured: true
    },
    {
      slug: 'lampara-geometrica-madera-laser',
      title: 'Lámpara Geométrica Decorativa de Madera con Acrílico Difusor',
      summary: 'Fabrica una lámpara de mesa moderna con celosías geométricas cortadas en madera y difusores de luz interiores.',
      content: 'Aprende patrones de celosía que permiten proyectar sombras artísticas en las paredes y alojar un portalámparas estándar.',
      categoryId: catMap.get('corte-laser')!,
      level: 'intermedio',
      estimatedTime: '2 horas',
      materials: 'Placa de Triplay de abedul de 3mm, lámina de acrílico opalino blanco de 2mm, foco LED cálido y cable con socket',
      tools: 'Cortadora láser, pegamento para madera',
      software: 'Inkscape o Illustrator, LightBurn',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Diseño de celosías vectoriales', detail: 'Crea patrones con repetición de curvas Voronoi o geometrías islámicas.' },
        { step: 2, title: 'Corte de tapas y caras laterales', detail: 'Corta 4 caras laterales y 2 tapas con perforación para socket E27.' },
        { step: 3, title: 'Ensamble y cableado', detail: 'Pega las caras con adhesivo vinílico y monta el portalámparas asegurando el aislamiento del cable.' }
      ]),
      expectedResult: 'Lámpara de diseño contemporáneo que emite patrones lumínicos envolventes.',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'rompecabezas-didactico-madera',
      title: 'Rompecabezas Didáctico Infantil de Geografía o Anatomía',
      summary: 'Crea un juego de encaje de piezas de madera con grabado de nombres y cortes precisos.',
      content: 'Combina grabado rasterizado de alta velocidad con vectorizado de líneas de corte profundo.',
      categoryId: catMap.get('corte-laser')!,
      level: 'principiante',
      estimatedTime: '1.5 horas',
      materials: '2 placas de MDF o triplay de 3mm de 25x20 cm',
      tools: 'Cortadora láser',
      software: 'Inkscape',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Base inferior y marco', detail: 'Corta una placa base sólida y un marco superior hueco.' },
        { step: 2, title: 'Grabado de información', detail: 'Graba en la madera nombres de estados, órganos o figuras a baja potencia y alta velocidad.' },
        { step: 3, title: 'Corte de piezas individuales', detail: 'Ejecuta el corte de las piezas móviles asegurando bordes sin astillas.' }
      ]),
      expectedResult: 'Juego de mesa educativo de piezas suaves y ajuste exacto.',
      imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'placa-personalizada-senaletica-acrilico',
      title: 'Placa Señalética de Acrílico con Grabado Invertido y LED',
      summary: 'Placa de acrílico transparente para escritorio o puerta con grabado en cara posterior iluminada lateralmente por LEDs.',
      content: 'Técnica de grabado por el reverso en modo espejo para que la cara frontal quede lisa al tacto y la luz difracte en el grabado.',
      categoryId: catMap.get('corte-laser')!,
      level: 'intermedio',
      estimatedTime: '2 horas',
      materials: 'Placa de acrílico cristal de 4mm, tira LED 5V USB, base de madera',
      tools: 'Cortadora láser, removedor de cinta de protección',
      software: 'Inkscape, software de control láser',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Diseño en espejo', detail: 'Voltea horizontalmente las letras y logotipos para grabarlos en la cara trasera.' },
        { step: 2, title: 'Grabado en acrílico', detail: 'Ajusta la frecuencia para obtener un blanco lechoso de alta difusión de luz.' },
        { step: 3, title: 'Base con canal para tira LED', detail: 'Corta capas de madera apilables con una ranura donde descansa la placa sobre los LEDs.' }
      ]),
      expectedResult: 'Letrero luminoso elegante donde el texto brilla intensamente al encender los LEDs.',
      imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'maqueta-topografica-estratificada',
      title: 'Maqueta Topográfica Estratificada por Curvas de Nivel',
      summary: 'Representa el relieve de una montaña o cuenca cortando láminas de cartón corrugado o madera por curvas de nivel apiladas.',
      content: 'Transforma datos geográficos de curvas de nivel en archivos vectoriales de corte superpuesto.',
      categoryId: catMap.get('corte-laser')!,
      level: 'intermedio',
      estimatedTime: '3 horas',
      materials: '10 láminas de cartón prensado o MDF de 2mm',
      tools: 'Cortadora láser, pegamento en spray',
      software: 'QGIS (código abierto geográfico), Inkscape',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Exportación de curvas de nivel', detail: 'Descarga curvas de elevación y numera cada capa consecutivamente.' },
        { step: 2, title: 'Puntos guía de registro', detail: 'Añade dos orificios de 3 mm en las esquinas de cada capa para alinear con varillas.' },
        { step: 3, title: 'Corte por capas y apilado', detail: 'Corta cada cota de nivel y pégalas en orden ascendente usando las guías.' }
      ]),
      expectedResult: 'Modelo topográfico tridimensional tangible de gran impacto visual y pedagógico.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'organizador-modular-cajones-escritorio',
      title: 'Organizador Modular con Cajones Deslizables y Bisagras Vivas',
      summary: 'Mueble de escritorio con gavetas y tapas con cortes flexibles en madera (kerf bending / living hinges).',
      content: 'Aprende a cortar madera rígida con patrones de ranuras que le permiten curvarse como si fuera tela o cuero.',
      categoryId: catMap.get('corte-laser')!,
      level: 'avanzado',
      estimatedTime: '4 horas',
      materials: '2 placas de Triplay de 3mm de 60x40 cm',
      tools: 'Cortadora láser, pegamento para madera',
      software: 'Boxes.py, Inkscape',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Generación del patrón de bisagra viva', detail: 'Calcula el espaciado de líneas alternadas para permitir un radio de giro de 25 mm.' },
        { step: 2, title: 'Prueba de flexibilidad', detail: 'Corta una pequeña tira de prueba para validar que la veta de la madera sea perpendicular a los cortes.' },
        { step: 3, title: 'Ensamble de la estructura', detail: 'Arma los módulos con uniones de espiga y cola de milano.' }
      ]),
      expectedResult: 'Organizador de escritorio con puerta curva flexible que abre y cierra suavemente.',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      featured: false
    },

    // --- Electrónica y Microcontroladores (13 al 18) ---
    {
      slug: 'semaforo-inteligente-arduino-cruce',
      title: 'Semáforo Inteligente para Cruce Peatonal con Arduino',
      summary: 'Construye un sistema de control de tráfico para peatones con LEDs, botón de solicitud y señalización sonora con buzzer.',
      content: 'Aprende programación no bloqueante con millis(), máquinas de estados finitos y circuitos con resistencias limitadoras de corriente.',
      categoryId: catMap.get('electronica')!,
      level: 'principiante',
      estimatedTime: '2 horas',
      materials: 'Arduino Uno o Nano, 6 LEDs (2 rojos, 2 amarillos, 2 verdes), 6 resistencias de 220 ohms, 1 botón pulsador con resistencia de 10k, 1 buzzer activo, protoboard y cables',
      tools: 'Cable USB, computadora con Arduino IDE o navegador con Wokwi',
      software: 'Arduino IDE o simulador Wokwi',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Cálculo de resistencias para LEDs', detail: 'Aplica Ley de Ohm: R = (Vcc - Vled) / Iled = (5V - 2V) / 0.015A ≈ 200 ohms -> usamos 220 ohms estándar.' },
        { step: 2, title: 'Armado en Protoboard', detail: 'Conecta ánodos a pines digitales 2 al 7 a través de las resistencias, y cátodos a la línea común GND.' },
        { step: 3, title: 'Programación en Arduino C++', detail: 'Escribe la lógica del semáforo vehicular en verde hasta que el peatón pulsa el botón.' },
        { step: 4, title: 'Alerta sonora para accesibilidad', detail: 'Agrega pulsos audibles con el buzzer para avisar a personas con discapacidad visual cuando el paso es seguro.' }
      ]),
      expectedResult: 'Circuito funcional que simula un cruce vial real con temporización y señalización accesible.',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'estacion-meteorologica-iot-esp32',
      title: 'Estación Meteorológica IoT con ESP32 y Pantalla OLED',
      summary: 'Mide temperatura, humedad y presión atmosférica y envía los datos por WiFi a un dashboard en la nube.',
      content: 'Integra sensores digitales por bus I2C (BME280 o DHT11), conectividad inalámbrica y visualización de gráficos.',
      categoryId: catMap.get('electronica')!,
      level: 'intermedio',
      estimatedTime: '3 horas',
      materials: 'Módulo ESP32 NodeMCU, sensor BME280 o DHT22, pantalla OLED 0.96 pulgadas I2C (SSD1306), cables jumper',
      tools: 'Computadora con Arduino IDE o VS Code con PlatformIO',
      software: 'Arduino IDE (librerías Adafruit_BME280 y Adafruit_SSD1306)',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Conexión del bus I2C', detail: 'Conecta SDA a GPIO21 y SCL a GPIO22 del ESP32 compartiendo la línea entre el sensor y la pantalla OLED.' },
        { step: 2, title: 'Lectura de magnitudes físicas', detail: 'Inicializa las librerías y realiza lecturas periódicas cada 5 segundos.' },
        { step: 3, title: 'Dibujo en pantalla OLED', detail: 'Muestra íconos de clima y valores numéricos legibles.' },
        { step: 4, title: 'Publicación WiFi', detail: 'Conecta el ESP32 a la red local y envía los datos mediante protocolo HTTP o MQTT.' }
      ]),
      expectedResult: 'Dispositivo autónomo que muestra el clima en tiempo real y permite monitoreo remoto desde celular.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'sensor-ambiental-calidad-aire',
      title: 'Monitor Portátil de Calidad del Aire (CO2 y Partículas)',
      summary: 'Dispositivo con indicador lumínico RGB que avisa sobre niveles de ventilación deficiente en salones de clase.',
      content: 'Aprende sobre sensores de gases semiconductores (MQ-135) o infrarrojos NDIR y calibración de umbrales de alerta.',
      categoryId: catMap.get('electronica')!,
      level: 'intermedio',
      estimatedTime: '2.5 horas',
      materials: 'Arduino Nano o Raspberry Pi Pico, sensor MQ-135 o SCD30, LED RGB cátodo común, buzzer',
      tools: 'Cautín para soldar pines, protoboard',
      software: 'Arduino IDE',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Precalentamiento del sensor', detail: 'Los sensores electroquímicos requieren 24 horas de curado térmico inicial para lecturas estables.' },
        { step: 2, title: 'Lectura analógica y mapeo', detail: 'Convierte la tensión analógica (0-5V) en partes por millón (PPM).' },
        { step: 3, title: 'Semáforo de advertencia', detail: 'Verde (<700 ppm = aire fresco), Amarillo (700-1000 ppm = ventilar pronto), Rojo (>1000 ppm = abrir ventanas urgente).' }
      ]),
      expectedResult: 'Dispositivo de prevención sanitaria que ayuda a mantener espacios educativos bien ventilados.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'alarma-infrarroja-deteccion-movimiento',
      title: 'Sistema de Alarma con Sensor Infrarrojo Pasivo (PIR)',
      summary: 'Alarma de seguridad con detector de presencia humana, temporizador y clave de desactivación por teclado matricial.',
      content: 'Comprende el funcionamiento de sensores piroeléctricos (PIR HC-SR501) y lectura de matrices de botones 4x4.',
      categoryId: catMap.get('electronica')!,
      level: 'principiante',
      estimatedTime: '2 horas',
      materials: 'Sensor PIR HC-SR501, teclado matricial 4x4 de membrana, buzzer zumbador, Arduino Uno',
      tools: 'Cables jumper, computadora',
      software: 'Arduino IDE con librería Keypad.h',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Calibración del PIR', detail: 'Ajusta con potenciómetros la sensibilidad y el tiempo de retardo en la placa del sensor.' },
        { step: 2, title: 'Detección por interrupción', detail: 'Configura un pin de interrupción para despertar el microcontrolador al detectar movimiento.' },
        { step: 3, title: 'Lógica de armado y clave PIN', detail: 'Programa un retardo de 10 segundos para ingresar el PIN de 4 dígitos antes de disparar la sirena.' }
      ]),
      expectedResult: 'Sistema de seguridad funcional con código secreto de desactivación.',
      imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'luz-automatica-fotocelda-rele',
      title: 'Control Automático de Iluminación Nocturna con Fotorresistencia (LDR)',
      summary: 'Enciende automáticamente una lámpara cuando anochece usando un divisor de tensión con LDR y un relé de aislamiento.',
      content: 'Aprende sobre histéresis en comparadores, aislamiento galvánico con optoacopladores y manejo seguro de voltajes de red.',
      categoryId: catMap.get('electronica')!,
      level: 'principiante',
      estimatedTime: '1.5 horas',
      materials: 'Fotorresistencia LDR, resistencia de 10k, potenciómetro de 10k para ajuste de umbral, módulo de relevador con optoacoplador de 5V, Arduino o circuito analógico con transistor',
      tools: 'Multímetro para medir resistencia según iluminación',
      software: 'Arduino IDE o simulador Tinkercad Circuits',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Divisor de tensión con LDR', detail: 'Conecta la LDR en serie con una resistencia de 10k midiendo el voltaje medio en A0.' },
        { step: 2, title: 'Implementación de histéresis', detail: 'Define un umbral superior de activación y uno inferior de apagado para evitar parpadeos molestos en el crepúsculo.' },
        { step: 3, title: 'Accionamiento del relé', detail: 'Envía señal digital al transistor de control del relé escuchando el clic mecánico característico.' }
      ]),
      expectedResult: 'Circuito que enciende la luz de manera estable sólo cuando la oscuridad supera el nivel deseado.',
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'monitor-temperatura-plantas-riego',
      title: 'Sistema de Riego Automático y Monitoreo de Humedad de Suelo',
      summary: 'Mide la humedad de la tierra de una maceta y activa una microbomba sumergible para mantener la planta hidratada.',
      content: 'Compara sensores de humedad resistivos vs capacitivos (anticorrosión) y control de motores DC mediante transistor MOSFET.',
      categoryId: catMap.get('electronica')!,
      level: 'intermedio',
      estimatedTime: '2.5 horas',
      materials: 'Sensor de humedad capacitivo V1.2, microbomba de agua 5V DC, transistor MOSFET IRLZ44N, diodo 1N4007 de protección flyback, Arduino Nano, manguera de silicón',
      tools: 'Tijeras, recipiente de agua, cables',
      software: 'Arduino IDE',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Calibración en seco y húmedo', detail: 'Toma el valor analógico con el sensor al aire libre (seco ~600) y sumergido en agua (húmedo ~300).' },
        { step: 2, title: 'Protección contra picos inductivos', detail: 'Coloca el diodo 1N4007 en antiparalelo a los bornes de la bomba para absorber la f.e.m. inversa.' },
        { step: 3, title: 'Riego dosificado por pulsos', detail: 'Bombea agua durante 3 segundos y espera 20 segundos a que la tierra absorba antes de volver a medir.' }
      ]),
      expectedResult: 'Planta autosuficiente que recibe agua únicamente cuando la humedad cae por debajo del 30%.',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      featured: true
    },

    // --- Robótica (19 al 23) ---
    {
      slug: 'robot-seguidor-linea-analogico-digital',
      title: 'Robot Móvil Seguidor de Línea de Dos Ruedas',
      summary: 'Construye un carro robótico autónomo diferencial que sigue una pista de cinta negra sobre fondo blanco a alta velocidad.',
      content: 'Aprende sobre sensores ópticos infrarrojos TCRT5000, puente H (L298N o TB6612FNG) y algoritmo de control proporcional.',
      categoryId: catMap.get('robotica')!,
      level: 'principiante',
      estimatedTime: '3.5 horas',
      materials: 'Chasis de acrílico 2WD con dos motorreductores amarillos y rueda loca, módulo puente H L298N, 2 o 4 sensores infrarrojos TCRT5000, portapilas 18650 o 4 pilas AA, Arduino Uno',
      tools: 'Destornillador de cruz, cinta de aislar negra',
      software: 'Arduino IDE',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Montaje mecánico del chasis', detail: 'Atornilla los motores a las escuadras del chasis y monta las ruedas de goma con la rueda loca trasera.' },
        { step: 2, title: 'Alineación de sensores infrarrojos', detail: 'Coloca los sensores al frente a una distancia de 5 a 10 mm del suelo separados por el ancho de la cinta.' },
        { step: 3, title: 'Lógica diferencial de dirección', detail: 'Si el sensor izquierdo detecta negro: detén o frena el motor izquierdo para que el robot gire hacia ese lado.' },
        { step: 4, title: 'Ajuste de velocidad por PWM', detail: 'Regula la velocidad con señales PWM analógicas para evitar que el robot derrape en curvas cerradas.' }
      ]),
      expectedResult: 'Vehículo autónomo que recorre un circuito cerrado trazado en el suelo sin salirse de la línea.',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'robot-evita-obstaculos-ultrasonico',
      title: 'Robot Explorador con Radar Ultrasónico Evasor de Choques',
      summary: 'Robot móvil que navega esquivando paredes y muebles girando un sensor ultrasónico con un servomotor para decidir la ruta libre.',
      content: 'Implementa el cálculo del tiempo de vuelo del sonido (HC-SR04) y barrido angular de un servomotor SG90.',
      categoryId: catMap.get('robotica')!,
      level: 'intermedio',
      estimatedTime: '3 horas',
      materials: 'Chasis 2WD o 4WD, Arduino Uno, Sensor ultrasónico HC-SR04, Servomotor SG90, Puente H, Batería',
      tools: 'Destornillador, silicón frío o cinchos plásticos',
      software: 'Arduino IDE',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Montaje del radar móvil', detail: 'Fija el sensor ultrasónico sobre el eje del servomotor al frente del robot.' },
        { step: 2, title: 'Algoritmo de navegación espacial', detail: 'Avanza mientras la distancia libre sea mayor a 25 cm.' },
        { step: 3, title: 'Toma de decisiones ante obstáculo', detail: 'Si detecta obstáculo: frena, gira el sensor 60° a la izquierda, mide distancia; gira 60° a la derecha, mide distancia; y vira hacia el lado con mayor espacio libre.' }
      ]),
      expectedResult: 'Robot que explora habitaciones de manera autónoma sin impactar contra muros u objetos.',
      imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'brazo-robotico-cuatro-grados-libertad',
      title: 'Brazo Robótico 4-DOF con Servomotores y Joysticks',
      summary: 'Construye un brazo articulado impreso en 3D o cortado en láser con pinza efectora final controlado por palancas análogas.',
      content: 'Estudia grados de libertad (DOF), torque en servomotores y cinemática básica para manipulación pick-and-place.',
      categoryId: catMap.get('robotica')!,
      level: 'avanzado',
      estimatedTime: '5 horas',
      materials: 'Piezas estructurales cortadas en MDF 3mm o impresas en 3D, 4 servomotores (MG90S de engranes metálicos para la base), 2 módulos joystick analógicos, fuente externa de 5V 3A, Arduino',
      tools: 'Destornillador de precisión, pinzas',
      software: 'Arduino IDE (librería Servo.h)',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Alimentación independiente', detail: 'IMPORTANTE: Nunca alimentes 4 servomotores directo del pin 5V de Arduino; usa fuente externa compartiendo GND común.' },
        { step: 2, title: 'Ensamble de eslabones y engranes', detail: 'Monta base giratoria (cintura), hombro, codo y pinza de sujeción verificando el rango de 0 a 180 grados.' },
        { step: 3, title: 'Mapeo de joysticks a ángulos', detail: 'Mapea la lectura analógica (0 a 1023) al incremento o decremento suave de la posición angular.' }
      ]),
      expectedResult: 'Brazo articulado capaz de tomar un objeto pequeño de la mesa y moverlo a otro contenedor.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'rover-explorador-bluetooth-esp32',
      title: 'Rover Todo Terreno con Control Inalámbrico Bluetooth y Telemetría',
      summary: 'Vehículo controlado desde una app de smartphone por Bluetooth con transmisión de telemetría de batería y temperatura.',
      content: 'Configuración del módulo Bluetooth Serial en ESP32 y diseño de interfaz gráfica en MIT App Inventor.',
      categoryId: catMap.get('robotica')!,
      level: 'intermedio',
      estimatedTime: '4 horas',
      materials: 'Chasis de 4 motores con orugas o ruedas todo terreno, ESP32, driver de motores doble canal, batería LiPo 7.4V',
      tools: 'Computadora, celular Android',
      software: 'Arduino IDE, MIT App Inventor 2',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Configuración Bluetooth en ESP32', detail: 'Inicia BluetoothSerial y empareja el microcontrolador con el celular.' },
        { step: 2, title: 'Creación de la app en App Inventor', detail: 'Diseña botones de flechas direccionales que envían comandos de un carácter (\'F\', \'B\', \'L\', \'R\', \'S\').' },
        { step: 3, title: 'Recepción de telemetría', detail: 'Envía de regreso al celular el voltaje de batería medido por el ADC del ESP32.' }
      ]),
      expectedResult: 'Rover conducido a distancia con respuesta instantánea y retroalimentación de estado en pantalla.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'mini-robot-sumo-autonomo',
      title: 'Mini Robot Sumo para Competencias Maker (Reglas Oficiales)',
      summary: 'Diseña un robot de 10x10 cm y menos de 500 gramos diseñado para detectar al oponente y empujarlo fuera del ring de dohyo.',
      content: 'Estrategias de combate autónomo, sensores de línea para no caer del ring y motores de alto torque con caja reductora.',
      categoryId: catMap.get('robotica')!,
      level: 'avanzado',
      estimatedTime: '5 horas',
      materials: 'Chasis metálico o 3D con cuchilla frontal biselada, 2 motores Pololu Micro Metal Gearmotor de 50:1, sensor Sharp de distancia infrarroja, 2 sensores de piso QRE1113, microcontrolador Arduino Nano',
      tools: 'Llaves allen, soldador de estaño',
      software: 'Arduino IDE',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Verificación de dimensiones y peso', detail: 'Cumple la norma internacional: máximo 100x100 mm de huella y 500 gramos exactos.' },
        { step: 2, title: 'Detección del borde blanco', detail: 'Si el sensor de piso detecta la línea blanca exterior del dohyo, retrocede de inmediato a máxima potencia.' },
        { step: 3, title: 'Estrategia de búsqueda y embestida', detail: 'Gira sobre su eje hasta que el sensor frontal detecte al rival y acelera al 100% para expulsarlo.' }
      ]),
      expectedResult: 'Robot de combate autónomo ágil y potente preparado para torneos de robótica.',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      featured: false
    },

    // --- Fotografía y Creación Audiovisual (24 al 27) ---
    {
      slug: 'podcast-tecnologico-escolar-audacity',
      title: 'Producción de un Episodio de Podcast Tecnológico con Audacity',
      summary: 'Planea el guion, graba con micrófono USB y realiza edición multipista con música de fondo con licencias libres.',
      content: 'Técnicas de ecualización vocal, compresión dinámica, reducción de ruido de fondo y exportación en formato MP3/OGG.',
      categoryId: catMap.get('audiovisual')!,
      level: 'principiante',
      estimatedTime: '2 horas',
      materials: 'Micrófono USB o manos libres de celular, audífonos cerrados',
      tools: 'Computadora',
      software: 'Audacity (Open Source)',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Estructura de escaleta', detail: 'Define intro (30s), bloque de noticias (5 min), entrevista o debate (10 min) y despedida (1 min).' },
        { step: 2, title: 'Toma de perfil de ruido', detail: 'Graba 5 segundos de silencio en la habitación para que el filtro de Audacity elimine el zumbido ambiental.' },
        { step: 3, title: 'Nivelación y música de fondo', detail: 'Aplica auto-ducking para que la música baje automáticamente el volumen cuando alguien habla.' }
      ]),
      expectedResult: 'Episodio de audio nítido y profesional listo para distribuirse en plataformas abiertas.',
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'tutorial-tecnologico-grabacion-obs',
      title: 'Grabación de un Videotutorial Tecnológico en Pantalla Dividida',
      summary: 'Produce un video educativo mostrando tu pantalla de código y tu cámara web en círculo con audio sincronizado.',
      content: 'Configura fuentes compuestas en OBS Studio, filtros de cámara virtual y atajos de teclado para transiciones de escena.',
      categoryId: catMap.get('audiovisual')!,
      level: 'principiante',
      estimatedTime: '1.5 horas',
      materials: 'Cámara web o smartphone como cámara (DroidCam/Camo), micrófono de solapa o diadema',
      tools: 'Computadora con tarjeta gráfica o CPU multinúcleo',
      software: 'OBS Studio',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Configuración de escenas en OBS', detail: 'Crea una escena principal "Pantalla + Cámara" y una secundaria "Pantalla Completa".' },
        { step: 2, title: 'Máscara circular para la cámara web', detail: 'Aplica un filtro de máscara de imagen PNG para que tu cámara tenga bordes circulares elegantes.' },
        { step: 3, title: 'Grabación en formato MKV seguro', detail: 'Graba en MKV para no perder el video si se va la luz, y activa la conversión automática a MP4 al finalizar.' }
      ]),
      expectedResult: 'Video tutorial en alta definición (1080p60) listo para subirse a la plataforma o YouTube.',
      imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'microdocumental-maker-davinci-resolve',
      title: 'Microdocumental de un Proyecto Maker con DaVinci Resolve',
      summary: 'Edita un video documental de 2 minutos narrando el proceso de diseño, errores y resultado de una creación tecnológica.',
      content: 'Aprende ritmo de montaje, planos de detalle (B-roll), etalonaje de color (Color grading) y exportación limpia.',
      categoryId: catMap.get('audiovisual')!,
      level: 'intermedio',
      estimatedTime: '3 horas',
      materials: 'Clips de video grabados con celular en trípode casero, fotos del proceso',
      tools: 'Computadora con DaVinci Resolve',
      software: 'DaVinci Resolve',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Importación y selección de tomas', detail: 'Clasifica los clips en la página de Corte (Cut Page) descartando tomas desenfocadas.' },
        { step: 2, title: 'Línea de tiempo y voz en off', detail: 'Arma la narrativa visual sincronizando cortes con los acentos de la música.' },
        { step: 3, title: 'Corrección de balance de blancos', detail: 'En la página de Color iguala las tonalidades de las diferentes tomas para coherencia estética.' }
      ]),
      expectedResult: 'Microdocumental cautivador que comunica el valor del aprendizaje práctico y la cultura maker.',
      imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      slug: 'transmision-en-vivo-taller-maker',
      title: 'Configuración de Transmisión en Vivo Multicámara para Talleres',
      summary: 'Emite una sesión en vivo de taller con una cámara cenital apuntando a la mesa de trabajo y otra al expositor.',
      content: 'Uso de dispositivos móviles como cámaras IP por red local, sincronización de latencia de audio y chat en pantalla.',
      categoryId: catMap.get('audiovisual')!,
      level: 'intermedio',
      estimatedTime: '2 horas',
      materials: '2 teléfonos inteligentes o cámaras USB, trípodes o brazos articulados, conexión a internet por cable',
      tools: 'Computadora principal de control',
      software: 'OBS Studio, navegador web',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Cámara cenital sobre la mesa', detail: 'Fija una cámara perpendicular a la mesa de trabajo para mostrar soldadura o ensamble en primer plano.' },
        { step: 2, title: 'Sincronización de audio y video', detail: 'Da un aplauso visible en ambas cámaras y ajusta el retardo de milisegundos en las propiedades de audio.' },
        { step: 3, title: 'Emisión de prueba privada', detail: 'Comprueba tasa de bits (bitrate 4500 kbps) y estabilidad de conexión antes de abrir la sesión pública.' }
      ]),
      expectedResult: 'Streaming educativo fluido donde la audiencia puede seguir cada detalle manual con total claridad.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      featured: true
    },

    // --- Inteligencia Artificial y XR (28 al 30) ---
    {
      slug: 'clasificador-imagenes-teachable-machine',
      title: 'Clasificador de Residuos Reciclables con IA en el Navegador',
      summary: 'Entrena una red neuronal con Teachable Machine para distinguir entre plástico, cartón y metal usando tu cámara web.',
      content: 'Comprende el aprendizaje supervisado, entrenamiento por transferencia (transfer learning) y exportación a TensorFlow.js.',
      categoryId: catMap.get('inteligencia-artificial')!,
      level: 'principiante',
      estimatedTime: '1 hora',
      materials: 'Cámara web, muestras físicas de plástico, papel/cartón y latas',
      tools: 'Navegador web (Chrome, Firefox o Edge)',
      software: 'Teachable Machine de Google, editor web',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Definición de clases', detail: 'Crea tres clases en Teachable Machine: "Plástico", "Cartón" y "Metal", más una clase "Vacío".' },
        { step: 2, title: 'Captura de muestras variadas', detail: 'Graba 100 imágenes por clase mostrando los objetos desde diferentes ángulos e iluminaciones.' },
        { step: 3, title: 'Entrenamiento del modelo', detail: 'Presiona "Entrenar modelo" y observa la convergencia de la pérdida durante las 50 épocas.' },
        { step: 4, title: 'Exportación a JavaScript', detail: 'Descarga el modelo en TensorFlow.js o copia el enlace alojado para incrustarlo en tu página web.' }
      ]),
      expectedResult: 'Aplicación web interactiva que identifica el material que colocas frente a la cámara en milisegundos.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'experiencia-webxr-realidad-aumentada',
      title: 'Visualizador de Modelos 3D en Realidad Aumentada con WebXR y A-Frame',
      summary: 'Crea una página web que proyecta tus diseños 3D (STL/GLTF) en la mesa de tu casa a través de la cámara del smartphone.',
      content: 'Aprende sobre anclajes espaciales, formato GLTF/GLB y APIs WebXR estandarizadas sin necesidad de apps nativas privativas.',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      level: 'intermedio',
      estimatedTime: '2 horas',
      materials: 'Teléfono celular compatible con ARCore o WebXR',
      tools: 'Computadora para escribir el código HTML/JS',
      software: 'Editor de código (VS Code), Three.js o A-Frame',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Estructura básica en A-Frame', detail: 'Incluye la librería aframe.min.js y el componente arjs en el encabezado HTML.' },
        { step: 2, title: 'Carga del modelo 3D optimizado', detail: 'Exporta tu modelo desde Blender en formato .glb comprimido con Dracoloader.' },
        { step: 3, title: 'Interacción táctil', detail: 'Añade eventos de pellizco (pinch-to-zoom) y giro para escalar la pieza en el mundo real.' }
      ]),
      expectedResult: 'Página web accesible mediante código QR que abre la cámara del teléfono y ancla el modelo 3D en el escritorio.',
      imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      slug: 'mundo-3d-interactivo-threejs',
      title: 'Laboratorio Maker Virtual e Interactivo con Three.js',
      summary: 'Construye un entorno 3D navegable con cámara orbital, iluminación dinámica y modelos de herramientas con las que se puede interactuar.',
      content: 'Aprende la estructura básica de Three.js: Escena (Scene), Cámara (Camera), Renderizador (Renderer), Luces y Raycasting para clics.',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      level: 'avanzado',
      estimatedTime: '3.5 horas',
      materials: 'Computadora con soporte WebGL',
      tools: 'Editor de código web',
      software: 'Three.js, Vite, Node.js',
      stepsJson: JSON.stringify([
        { step: 1, title: 'Instalación y escena base', detail: 'Configura un canvas con renderizador WebGL, luz ambiental suave y luz direccional con sombras.' },
        { step: 2, title: 'Carga asíncrona de assets', detail: 'Usa GLTFLoader para traer mesas de trabajo, impresoras 3D y herramientas al escenario virtual.' },
        { step: 3, title: 'Raycaster para detección de clics', detail: 'Detecta cuando el usuario hace clic sobre una máquina para desplegar un panel con su manual y especificaciones técnicas.' }
      ]),
      expectedResult: 'Simulación tridimensional interactiva ejecutable en cualquier navegador a 60 fotogramas por segundo.',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }
  console.log(`✓ ${projectsData.length} Proyectos Maker reales sembrados.`);

  // 7. Sembrar las 8 Rutas de Aprendizaje Guiadas
  const learningPathsData = [
    {
      slug: 'mi-primer-objeto-3d',
      title: 'Ruta 1: Mi Primer Objeto 3D',
      description: 'Aprende los principios del diseño espacial, geometría básica y laminación para imprimir tu primera pieza física.',
      categoryId: catMap.get('impresion-3d')!,
      level: 'principiante',
      estimatedHours: 8,
      icon: 'Box',
      featured: true,
      steps: [
        {
          stepOrder: 1,
          title: '¿Qué es y cómo funciona la impresión 3D?',
          description: 'Comprende el proceso aditivo por deposición de filamento fundido (FDM) y sus diferencias con el desbaste sustractivo.',
          concepts: 'FDM, boquilla (nozzle), filamento PLA, cama caliente, coordenadas X-Y-Z',
          practice: 'Inspecciona las partes de una impresora 3D y aprende a nivelar la cama con una hoja de papel.',
          finalProject: 'Completar checklist de calibración inicial de impresora.'
        },
        {
          stepOrder: 2,
          title: 'Modelado 3D en Tinkercad',
          description: 'Crea volúmenes sumando y restando formas sólidas y huecas elementales.',
          concepts: 'Primitivas geométricas, alineación, agrupación, medidas en milímetros',
          practice: 'Modela un llavero personalizado con tu nombre en relieve.',
          finalProject: 'Exportar archivo STL listo para producción.'
        },
        {
          stepOrder: 3,
          title: 'Laminación con UltiMaker Cura / PrusaSlicer',
          description: 'Configura el software que corta el modelo tridimensional en capas de plástico.',
          concepts: 'Altura de capa (layer height), densidad de relleno (infill), velocidad y temperatura',
          practice: 'Simula el recorrido del cabezal capa por capa en la vista de previsualización.',
          finalProject: 'Generar el archivo G-code y copiarlo a la tarjeta SD.'
        },
        {
          stepOrder: 4,
          title: 'Impresión y Postprocesado',
          description: 'Inicia la impresión, supervisa la adhesión de la primera capa y retira la pieza de forma segura.',
          concepts: 'Brim, skirt, adhesión con pegamento en barra, enfriamiento de capa',
          practice: 'Imprime el llavero y retira los filamentos sueltos o rebabas con alicate.',
          finalProject: 'Llavero bicolor finalizado y verificado.'
        }
      ]
    },
    {
      slug: 'mi-primer-proyecto-electronico',
      title: 'Ruta 2: Mi Primer Proyecto Electrónico',
      description: 'Domina los conceptos de voltaje, corriente y señales digitales controlando circuitos con Arduino.',
      categoryId: catMap.get('electronica')!,
      level: 'principiante',
      estimatedHours: 10,
      icon: 'Cpu',
      featured: true,
      steps: [
        {
          stepOrder: 1,
          title: 'Fundamentos de Electricidad y Ley de Ohm',
          description: 'Comprende la relación entre voltaje (V), corriente (I) y resistencia (R).',
          concepts: 'Voltaje, corriente, resistencia, masa (GND), continuidad',
          practice: 'Mide el voltaje de una pila de 9V y la resistencia de varios resistores con un multímetro.',
          finalProject: 'Calcular la resistencia requerida para proteger un LED rojo.'
        },
        {
          stepOrder: 2,
          title: 'Uso de la Protoboard y Circuitos Básicos',
          description: 'Aprende cómo están conectadas las pistas internas de la tabla de prototipos.',
          concepts: 'Buses de alimentación, pistas terminales, circuitos serie y paralelo',
          practice: 'Arma un circuito para encender un LED con un pulsador manual.',
          finalProject: 'Circuito funcional sin falso contacto.'
        },
        {
          stepOrder: 3,
          title: 'Introducción a Arduino y Programación C++',
          description: 'Escribe tu primer programa (sketch) para controlar un pin digital.',
          concepts: 'setup(), loop(), pinMode(), digitalWrite(), delay()',
          practice: 'Programa el clásico "Blink" haciendo parpadear un LED a diferentes frecuencias.',
          finalProject: 'Modificar el código para emitir la señal SOS en código Morse.'
        },
        {
          stepOrder: 4,
          title: 'Lectura de Entradas y Sensores',
          description: 'Lee el estado de un botón y una fotorresistencia para tomar decisiones automáticas.',
          concepts: 'digitalRead(), analogRead(), condicionales if-else',
          practice: 'Crea una lámpara que se encienda automáticamente en la oscuridad.',
          finalProject: 'Semáforo inteligente peatonal completo.'
        }
      ]
    },
    {
      slug: 'mi-primer-producto-laser',
      title: 'Ruta 3: Mi Primer Producto con Corte Láser',
      description: 'Domina el diseño vectorial y los parámetros de máquina para fabricar objetos de madera y acrílico.',
      categoryId: catMap.get('corte-laser')!,
      level: 'principiante',
      estimatedHours: 6,
      icon: 'Flame',
      featured: true,
      steps: [
        {
          stepOrder: 1,
          title: 'El rayo láser y las normas de seguridad en el taller',
          description: 'Conoce los riesgos del rayo láser infrarrojo y los materiales permitidos y prohibidos.',
          concepts: 'Láser CO2, extracción de humos, materiales prohibidos (PVC), asistencia de aire',
          practice: 'Revisa la hoja de seguridad del taller y la tabla de materiales.',
          finalProject: 'Completar evaluación de seguridad y prevención de fuego.'
        },
        {
          stepOrder: 2,
          title: 'Diseño Vectorial con Inkscape',
          description: 'Dibuja planos con medidas exactas en milímetros utilizando curvas Bézier y operaciones booleanas.',
          concepts: 'Trazados SVG, relleno vs trazo, unión, diferencia, grosor de línea de corte (0.01 mm)',
          practice: 'Dibuja una placa con tu nombre y un marco geométrico decorativo.',
          finalProject: 'Archivo SVG limpio sin líneas encimadas.'
        },
        {
          stepOrder: 3,
          title: 'Uniones a Presión y Compensación de Kerf',
          description: 'Diseña piezas que encajen entre sí sin pegamento compensando el ancho del corte.',
          concepts: 'Kerf, uniones finger joint, ensamble T-slot',
          practice: 'Genera una caja paramétrica con MakerCase y ajústala en Inkscape.',
          finalProject: 'Caja cortada en madera MDF ensamblada a presión.'
        }
      ]
    },
    {
      slug: 'mi-primer-robot',
      title: 'Ruta 4: Mi Primer Robot',
      description: 'Integra motores, sensores y lógica de navegación para dar vida a un vehículo robótico móvil.',
      categoryId: catMap.get('robotica')!,
      level: 'principiante',
      estimatedHours: 12,
      icon: 'Bot',
      featured: true,
      steps: [
        {
          stepOrder: 1,
          title: 'Mecánica de Robots y Chasis Diferencial',
          description: 'Comprende cómo gira un vehículo con dos motores independientes.',
          concepts: 'Cinemática diferencial, reducción de engranes, centro de masa',
          practice: 'Ensambla el chasis mecánico con motorreductores.',
          finalProject: 'Chasis rodante verificado mecánicamente.'
        },
        {
          stepOrder: 2,
          title: 'Control de Motores con Puente H',
          description: 'Controla el sentido de giro y la velocidad de los motores DC mediante PWM.',
          concepts: 'Puente H, señales PWM, control de potencia, consumo de corriente',
          practice: 'Programa rutinas de movimiento: adelante, reversa, giro y parada.',
          finalProject: 'Robot ejecutando una trayectoria cuadrada en el piso.'
        },
        {
          stepOrder: 3,
          title: 'Percepción con Sensores y Evasión',
          description: 'Conecta un sensor ultrasónico para que el robot "vea" obstáculos.',
          concepts: 'Eco, tiempo de vuelo, cálculo de distancia (d = v*t/2)',
          practice: 'Programa la lógica para frenar a 20 cm de una pared y girar.',
          finalProject: 'Robot evasor de obstáculos totalmente autónomo.'
        }
      ]
    },
    {
      slug: 'mi-primer-video-maker',
      title: 'Ruta 5: Mi Primer Video Maker',
      description: 'Documenta audiovisualmente tus creaciones tecnológicas para inspirar y compartir con la comunidad.',
      categoryId: catMap.get('audiovisual')!,
      level: 'principiante',
      estimatedHours: 8,
      icon: 'Video',
      featured: false,
      steps: [
        {
          stepOrder: 1,
          title: 'Iluminación y Encuadre con Celular',
          description: 'Aprende la regla de los tercios y cómo iluminar con 3 puntos (luz principal, relleno y contra).',
          concepts: 'Temperatura de color, balance de blancos, planos de detalle (macro)',
          practice: 'Graba 5 tomas de detalle de un circuito funcionando con buena luz.',
          finalProject: 'Batería de planos B-roll de alta calidad.'
        },
        {
          stepOrder: 2,
          title: 'Grabación de Audio Nítido',
          description: 'El audio es el 50% de un buen video. Elimina ecos y ruidos de ventiladores.',
          concepts: 'Micrófono de solapa, niveles en decibelios (-12 dB a -6 dB), acústica',
          practice: 'Graba la voz en off explicando el objetivo del proyecto.',
          finalProject: 'Pista de voz ecualizada y sin distorsión.'
        },
        {
          stepOrder: 3,
          title: 'Montaje en DaVinci Resolve',
          description: 'Edita los clips, añade títulos limpios y exporta en resolución Full HD.',
          concepts: 'Corte sobre acción, J-cut / L-cut, corrección de color básica',
          practice: 'Ensambla un video de 1 minuto con música libre de regalías.',
          finalProject: 'Video publicado y listo para compartir.'
        }
      ]
    },
    {
      slug: 'mi-primera-experiencia-inmersiva',
      title: 'Ruta 6: Mi Primera Experiencia Inmersiva (WebXR)',
      description: 'Crea mundos virtuales y experiencias de realidad aumentada en el navegador usando código web abierto.',
      categoryId: catMap.get('tecnologias-inmersivas')!,
      level: 'intermedio',
      estimatedHours: 10,
      icon: 'Glasses',
      featured: false,
      steps: [
        {
          stepOrder: 1,
          title: 'Introducción a WebGL y Three.js',
          description: 'Comprende cómo los navegadores renderizan gráficos 3D acelerados por hardware.',
          concepts: 'Escena, cámara perspectiva, mallas (geometría + material), render loop',
          practice: 'Crea un cubo 3D giratorio con texturas en un archivo HTML.',
          finalProject: 'Escena interactiva con rotación por arrastre de ratón.'
        },
        {
          stepOrder: 2,
          title: 'Carga de Modelos 3D GLTF',
          description: 'Importa tus modelos diseñados en Blender o descargados de repositorios abiertos.',
          concepts: 'Formato GLTF/GLB, optimización de polígonos, materiales PBR',
          practice: 'Carga tu diseño del llavero o soporte 3D en la escena virtual.',
          finalProject: 'Visualizador web 3D interactivo.'
        },
        {
          stepOrder: 3,
          title: 'Realidad Aumentada en el Celular con A-Frame',
          description: 'Activa la cámara del teléfono y proyecta el modelo en una superficie real.',
          concepts: 'WebXR Device API, hit-testing espacial, anclas AR',
          practice: 'Prueba la experiencia en tu smartphone escaneando el código QR local.',
          finalProject: 'Aplicación AR accesible desde el navegador móvil.'
        }
      ]
    },
    {
      slug: 'mi-primer-proyecto-ia',
      title: 'Ruta 7: Mi Primer Proyecto con Inteligencia Artificial',
      description: 'Aprende cómo funciona el aprendizaje automático y entrena modelos para interactuar con el mundo físico.',
      categoryId: catMap.get('inteligencia-artificial')!,
      level: 'principiante',
      estimatedHours: 8,
      icon: 'Sparkles',
      featured: false,
      steps: [
        {
          stepOrder: 1,
          title: '¿Qué es y cómo aprende una Inteligencia Artificial?',
          description: 'Diferencia entre programación tradicional (reglas + datos = respuestas) y Machine Learning (datos + respuestas = reglas).',
          concepts: 'Aprendizaje supervisado, datos de entrenamiento, sesgo y ética',
          practice: 'Explora experimentos interactivos en Google AI Experiments.',
          finalProject: 'Mapa conceptual de conceptos clave de IA.'
        },
        {
          stepOrder: 2,
          title: 'Entrenamiento visual con Teachable Machine',
          description: 'Recolecta datos con tu cámara web y entrena un modelo clasificador de gestos.',
          concepts: 'Épocas, tasa de aprendizaje, matriz de confusión',
          practice: 'Entrena un modelo que reconozca los gestos "Piedra", "Papel" y "Tijera".',
          finalProject: 'Modelo entrenado y probado en tiempo real.'
        },
        {
          stepOrder: 3,
          title: 'Integración con Hardware o Web',
          description: 'Conecta el modelo de visión a una página web interactiva o a un Arduino por puerto serie.',
          concepts: 'TensorFlow.js, inferencia en el cliente, comunicación serial',
          practice: 'Haz que una bombilla virtual se encienda cuando la IA detecte una sonrisa.',
          finalProject: 'Prototipo funcional de IA aplicada.'
        }
      ]
    },
    {
      slug: 'mi-primer-sitio-web',
      title: 'Ruta 8: Mi Primer Sitio Web Maker',
      description: 'Aprende los pilares de la web abierta (HTML, CSS y JavaScript) para publicar tu portafolio de proyectos.',
      categoryId: catMap.get('programacion')!,
      level: 'principiante',
      estimatedHours: 10,
      icon: 'Code2',
      featured: false,
      steps: [
        {
          stepOrder: 1,
          title: 'Estructura con HTML5 Semántico',
          description: 'Organiza la información de tu proyecto con etiquetas legibles y accesibles.',
          concepts: 'header, main, section, article, nav, footer, atributos alt',
          practice: 'Crea una página biográfica sencilla con tus intereses maker.',
          finalProject: 'Documento HTML válido con jerarquía clara.'
        },
        {
          stepOrder: 2,
          title: 'Estilos y Diseño con CSS Moderno',
          description: 'Aplica colores, tipografías y diseños responsivos que se adapten a computadoras y teléfonos.',
          concepts: 'Box model, Flexbox, CSS Grid, Media Queries para móviles',
          practice: 'Diseña tarjetas visuales para presentar 3 proyectos construidos.',
          finalProject: 'Hoja de estilos responsiva y atractiva.'
        },
        {
          stepOrder: 3,
          title: 'Interactividad con JavaScript y Publicación en GitHub Pages',
          description: 'Añade botones interactivos, filtros y publica tu página gratis en internet.',
          concepts: 'Event Listeners, DOM manipulation, Git, GitHub Pages',
          practice: 'Crea un botón para alternar entre modo claro y modo oscuro.',
          finalProject: 'Portafolio web publicado con dominio público en GitHub Pages.'
        }
      ]
    }
  ];

  for (const p of learningPathsData) {
    const { steps, ...pathData } = p;
    const createdPath = await prisma.learningPath.create({ data: pathData });
    for (const s of steps) {
      await prisma.learningPathStep.create({
        data: {
          ...s,
          pathId: createdPath.id
        }
      });
    }
  }
  console.log(`✓ ${learningPathsData.length} Rutas de Aprendizaje completas con pasos creadas.`);

  // 8. Sembrar Herramientas y Software Abierto
  const toolsData = [
    {
      slug: 'freecad-3d',
      name: 'FreeCAD',
      description: 'Modelador paramétrico 3D de código abierto para ingeniería y arquitectura mecánica con soporte BIM y FEM.',
      url: 'https://www.freecad.org/',
      categoryId: catMap.get('impresion-3d')!,
      licenseType: 'LGPLv2+',
      isFree: true,
      isOpenSource: true,
      platform: 'Windows, Linux, macOS'
    },
    {
      slug: 'prusa-slicer',
      name: 'PrusaSlicer',
      description: 'Laminador de código abierto basado en Slic3r con perfiles afinados para múltiples fabricantes y soportes orgánicos.',
      url: 'https://www.prusa3d.com/page/prusaslicer_424/',
      categoryId: catMap.get('impresion-3d')!,
      licenseType: 'GNU GPL v3',
      isFree: true,
      isOpenSource: true,
      platform: 'Windows, Linux, macOS'
    },
    {
      slug: 'orca-slicer',
      name: 'OrcaSlicer',
      description: 'Laminador de alto rendimiento para impresoras FDM modernas con calibraciones integradas automáticas de flujo y retracción.',
      url: 'https://github.com/SoftFever/OrcaSlicer',
      categoryId: catMap.get('impresion-3d')!,
      licenseType: 'GNU AGPL v3',
      isFree: true,
      isOpenSource: true,
      platform: 'Windows, Linux, macOS'
    },
    {
      slug: 'penpot-app',
      name: 'Penpot',
      description: 'La primera plataforma de diseño UI/UX y prototipado colaborativo de código abierto basada en estándares web y SVG.',
      url: 'https://penpot.app/',
      categoryId: catMap.get('diseno-digital')!,
      licenseType: 'Mozilla Public License 2.0',
      isFree: true,
      isOpenSource: true,
      platform: 'Web, Docker'
    },
    {
      slug: 'photopea-editor',
      name: 'Photopea',
      description: 'Editor avanzado de imágenes rasterizadas en navegador compatible con archivos PSD, AI, XD y RAW sin instalar nada.',
      url: 'https://www.photopea.com/',
      categoryId: catMap.get('diseno-digital')!,
      licenseType: 'Freemium en web',
      isFree: true,
      isOpenSource: false,
      platform: 'Navegador Web'
    },
    {
      slug: 'kicad-eda',
      name: 'KiCad EDA Suite',
      description: 'Entorno integral de diseño de esquemáticos electrónicos y circuitos impresos con visualizador 3D fotorrealista.',
      url: 'https://www.kicad.org/',
      categoryId: catMap.get('electronica')!,
      licenseType: 'GNU GPL v3',
      isFree: true,
      isOpenSource: true,
      platform: 'Windows, Linux, macOS'
    },
    {
      slug: 'shotcut-video',
      name: 'Shotcut',
      description: 'Editor de video de código abierto, multiplataforma y gratuito, con soporte para 4K y cientos de formatos de audio/video.',
      url: 'https://shotcut.org/',
      categoryId: catMap.get('audiovisual')!,
      licenseType: 'GNU GPL v3',
      isFree: true,
      isOpenSource: true,
      platform: 'Windows, Linux, macOS'
    }
  ];

  for (const t of toolsData) {
    await prisma.tool.create({ data: t });
  }
  console.log(`✓ ${toolsData.length} Herramientas sembradas.`);

  // 9. Sembrar Simuladores
  const simulatorsData = [
    {
      slug: 'wokwi-esp32-arduino',
      name: 'Wokwi Simulator',
      description: 'Simula microcontroladores ESP32, Arduino Uno, Nano, Mega y Raspberry Pi Pico con sensores y actuadores en tiempo real.',
      url: 'https://wokwi.com/',
      isInternal: false,
      categoryId: catMap.get('electronica')!,
      provider: 'Wokwi'
    },
    {
      slug: 'tinkercad-circuits-sim',
      name: 'Tinkercad Circuits',
      description: 'Simulador interactivo para aprender electrónica básica, simular protoboards, baterías y programación en bloques y texto.',
      url: 'https://www.tinkercad.com/circuits',
      isInternal: false,
      categoryId: catMap.get('electronica')!,
      provider: 'Autodesk'
    },
    {
      slug: 'open-roberta-lab-sim',
      name: 'Open Roberta Lab Simulator',
      description: 'Simulador 2D en la nube para programar comportamientos de robots con sensores de color, ultrasonido y contacto.',
      url: 'https://lab.open-roberta.org/',
      isInternal: false,
      categoryId: catMap.get('robotica')!,
      provider: 'Fraunhofer IAIS'
    },
    {
      slug: 'teachable-machine-sim',
      name: 'Google Teachable Machine',
      description: 'Simulador y entrenador de redes neuronales convolucionales en vivo para clasificar imágenes, audios y posturas.',
      url: 'https://teachablemachine.withgoogle.com/',
      isInternal: false,
      categoryId: catMap.get('inteligencia-artificial')!,
      provider: 'Google Creative Lab'
    },
    {
      slug: 'calculadora-volumen-3d',
      name: 'Calculadora de Volumen y Masa de Impresión 3D',
      description: 'Herramienta interactiva nativa de PUMAKER para estimar el peso en gramos, metros de filamento y volumen según infill.',
      url: '/simuladores#calculadora-3d',
      isInternal: true,
      categoryId: catMap.get('impresion-3d')!,
      provider: 'PUMAKER · PC PUMA UNAM'
    },
    {
      slug: 'calculadora-costos-impresion',
      name: 'Calculadora de Costos de Fabricación 3D',
      description: 'Calcula el costo real de una pieza considerando costo del carrete de filamento, consumo eléctrico en kWh y desgaste.',
      url: '/simuladores#calculadora-costos',
      isInternal: true,
      categoryId: catMap.get('impresion-3d')!,
      provider: 'PUMAKER · PC PUMA UNAM'
    },
    {
      slug: 'generador-cajas-parametricas',
      name: 'Generador de Cajas Paramétricas con Kerf',
      description: 'Herramienta gráfica nativa para calcular medidas de caras con uniones dentadas y compensación de kerf lista para corte láser.',
      url: '/simuladores#generador-cajas',
      isInternal: true,
      categoryId: catMap.get('corte-laser')!,
      provider: 'PUMAKER · PC PUMA UNAM'
    },
    {
      slug: 'checklist-impresion-3d',
      name: 'Checklist Interactivo Pre-Vuelo de Impresión 3D',
      description: 'Lista de verificación para evitar fallas catastróficas, atascos de boquilla y desprendimientos de cama antes de imprimir.',
      url: '/simuladores#checklist-3d',
      isInternal: true,
      categoryId: catMap.get('impresion-3d')!,
      provider: 'PUMAKER · PC PUMA UNAM'
    }
  ];

  for (const sim of simulatorsData) {
    await prisma.simulator.create({ data: sim });
  }
  console.log(`✓ ${simulatorsData.length} Simuladores sembrados.`);

  // 10. Sembrar Cursos Abiertos
  const coursesData = [
    {
      slug: 'curso-fundamentos-arduino',
      title: 'Fundamentos de Arduino y Computación Física',
      description: 'Curso integral desde cero para aprender a programar sensores, actuadores y motores con C++ en microcontroladores.',
      url: 'https://docs.arduino.cc/learn/',
      platform: 'Arduino Education',
      instructor: 'Equipo Oficial Arduino',
      categoryId: catMap.get('electronica')!,
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      duration: '15 horas',
      certificateOffered: false,
      featured: true
    },
    {
      slug: 'curso-blender-modelado-3d',
      title: 'Modelado y Diseño 3D en Blender para Impresión',
      description: 'Aprende geometría, mallas cerradas (manifold), modificadores y escultura para materializar objetos tridimensionales.',
      url: 'https://cloud.blender.org/training/',
      platform: 'Blender Studio',
      instructor: 'Blender Community',
      categoryId: catMap.get('impresion-3d')!,
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      duration: '20 horas',
      certificateOffered: false,
      featured: true
    },
    {
      slug: 'curso-desarrollo-web-freecodecamp',
      title: 'Diseño Web Responsivo Certificado',
      description: 'Aprende HTML5, CSS3, Flexbox, CSS Grid y accesibilidad web completando proyectos prácticos auditados.',
      url: 'https://www.freecodecamp.org/espanol/learn/2022/responsive-web-design/',
      platform: 'freeCodeCamp',
      instructor: 'freeCodeCamp Org',
      categoryId: catMap.get('programacion')!,
      level: 'principiante',
      language: 'es',
      costType: 'gratuito',
      duration: '300 horas',
      certificateOffered: true,
      featured: true
    },
    {
      slug: 'curso-machine-learning-crash-google',
      title: 'Google Machine Learning Crash Course en Español',
      description: 'Curso con ejercicios prácticos en Colab para entender regresión, clasificación, redes neuronales y ética en IA.',
      url: 'https://developers.google.com/machine-learning/crash-course',
      platform: 'Google for Developers',
      instructor: 'Investigadores de Google AI',
      categoryId: catMap.get('inteligencia-artificial')!,
      level: 'intermedio',
      language: 'es',
      costType: 'gratuito',
      duration: '15 horas',
      certificateOffered: false,
      featured: true
    }
  ];

  for (const c of coursesData) {
    await prisma.course.create({ data: c });
  }
  console.log(`✓ ${coursesData.length} Cursos abiertos sembrados.`);

  // 11. Sembrar Avisos y Talleres de la Comunidad
  await prisma.announcement.create({
    data: {
      title: '¡Bienvenidas y bienvenidos a PUMAKER · PC PUMA · UNAM!',
      content: 'Iniciativa educativa abierta para potenciar el conocimiento científico, la cultura maker y la fabricación digital en toda la comunidad universitaria y sociedad en general.',
      type: 'destacado',
      isPublished: true
    }
  });

  await prisma.workshop.create({
    data: {
      title: 'Taller Práctico: De la Idea al Objeto en Impresión 3D FDM',
      description: 'Sesión demostrativa en vivo para aprender calibración de cama, selección de filamentos y trucos para evitar fallas de adherencia.',
      instructor: 'Laboratorio Maker PC PUMA',
      date: 'Viernes 16:00 hrs',
      modality: 'Virtual y Presencial',
      duration: '2 horas',
      requirements: 'Computadora con UltiMaker Cura o PrusaSlicer instalado',
      maxSeats: 40,
      url: 'https://pumaker.unam.mx/talleres/impresion3d',
      status: 'abierto'
    }
  });

  await prisma.workshop.create({
    data: {
      title: 'Taller de Internet de las Cosas con ESP32 y Wokwi',
      description: 'Conecta sensores ambientales al simulador en la nube y publica lecturas en paneles de monitoreo sin costo.',
      instructor: 'Comunidad Maker UNAM',
      date: 'Jueves 17:00 hrs',
      modality: 'Virtual',
      duration: '2.5 horas',
      requirements: 'Navegador web moderno',
      maxSeats: 50,
      url: 'https://pumaker.unam.mx/talleres/esp32',
      status: 'abierto'
    }
  });

  console.log('--- ¡Sembrado completado exitosamente! ---');
}

main()
  .catch((e) => {
    console.error('Error durante el sembrado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
