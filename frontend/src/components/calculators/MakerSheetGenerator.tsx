import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

export const MakerSheetGenerator: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('Mi Dispositivo Tecnológico');
  const [author, setAuthor] = useState('Comunidad UNAM');
  const [area, setArea] = useState('Electrónica y Robótica');
  const [materials, setMaterials] = useState('Arduino Uno, 4 LEDs, Protoboard, Cables, Sensor ultrasónico');
  const [tools, setTools] = useState('Cautín, multímetro, computadora');
  const [license, setLicense] = useState('Cultura Libre / CC-BY-SA 4.0');
  const [objective, setObjective] = useState('Prototipar un medidor de distancia accesible con sonido para personas con discapacidad visual.');

  const generateMarkdown = () => {
    return `# FICHA TÉCNICA MAKER — PUMAKER · UNAM
**Proyecto:** ${projectTitle}
**Autor(a):** ${author}
**Área Tecnológica:** ${area}
**Licencia:** ${license}
**Fecha:** ${new Date().toLocaleDateString('es-MX')}

---

## 1. OBJETIVO DEL PROYECTO
${objective}

## 2. LISTA DE MATERIALES (BOM)
${materials.split(',').map(m => `- ${m.trim()}`).join('\n')}

## 3. HERRAMIENTAS Y SOFTWARE
${tools.split(',').map(t => `- ${t.trim()}`).join('\n')}

## 4. CONSIDERACIONES DE SEGURIDAD
- Revisar conexiones eléctricas antes de alimentar.
- Mantener área de trabajo limpia y con ventilación adecuada.
- Compartir el código fuente y esquemáticos bajo la licencia indicada.

---
*Generado mediante PUMAKER (PC PUMA · UNAM) — Aprende · Experimenta · Crea · Comparte*
`;
  };

  const handleDownload = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha_${projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-puma">
      <div className="flex items-center gap-2 mb-4 text-puma-navy font-bold text-base">
        <FileText className="w-5 h-5 text-puma-gold" />
        <span>Generador de Ficha Técnica de Proyecto Maker</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Crea y descarga una ficha técnica estandarizada para documentar tu proyecto escolar, concurso o repositorio libre.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del Proyecto</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Autor / Equipo</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-700 mb-1">Objetivo y Resumen</label>
        <textarea
          rows={2}
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Materiales (separados por coma)</label>
          <input
            type="text"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Herramientas necesarias</label>
          <input
            type="text"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="btn-primary text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Ficha en Markdown (.md)</span>
        </button>
      </div>
    </div>
  );
};
