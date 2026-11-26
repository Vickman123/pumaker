import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Video } from '../types';
import { VideoModal } from '../components/VideoModal';
import { Tv, Play, Search, ExternalLink, Sparkles } from 'lucide-react';

export const Videoteca: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const channels = [
    { name: 'Teaching Tech', url: 'https://www.youtube.com/@TeachingTech', area: 'Impresión 3D' },
    { name: 'CNC Kitchen', url: 'https://www.youtube.com/@CNCkitchen', area: 'Resistencia Materiales' },
    { name: 'Ben Eater', url: 'https://www.youtube.com/@BenEater', area: 'Electrónica e Informática' },
    { name: 'GreatScott!', url: 'https://www.youtube.com/@GreatScottLab', area: 'Electrónica DIY' },
    { name: 'Trotec Laser', url: 'https://www.youtube.com/@TrotecLaserEngraving', area: 'Corte Láser' },
    { name: 'LightBurn Software', url: 'https://www.youtube.com/@LightBurnSoftware', area: 'Software Láser' },
    { name: 'Blender Official', url: 'https://www.youtube.com/@BlenderOfficial', area: 'Modelado 3D' },
    { name: 'OBS Project', url: 'https://www.youtube.com/@OBSProject', area: 'Streaming & Video' }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await api.getVideos({ q, limit: '40' });
        if (res.success) setVideos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cabecera */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-puma-navy mb-2">
          <Tv className="w-4 h-4 text-puma-gold" />
          <span>Videoteca Verificada</span>
        </div>
        <h1 className="text-3xl font-black text-puma-dark">
          Videoteca y Canales Técnicos Recomendados
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Aprende con videos explicativos de canales oficiales, tutoriales de máquinas y demostraciones prácticas sin enlaces inventados.
        </p>
      </div>

      {/* Directorio de Canales de YouTube Prioritarios */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-puma-dark uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-puma-gold" />
          <span>Canales de Referencia Internacional</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors group"
            >
              <div>
                <strong className="block text-xs text-puma-dark group-hover:text-puma-navy">{ch.name}</strong>
                <span className="text-[10px] text-slate-500">{ch.area}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-puma-navy" />
            </a>
          ))}
        </div>
      </div>

      {/* Buscador de Videos */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por título, temática o canal..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-puma-navy/30"
        />
      </div>

      {/* Cuadrícula de Videos */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-puma-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <span className="text-sm font-medium">Cargando videoteca...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-puma hover:shadow-puma-hover cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-puma-gold text-puma-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-puma-dark ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {vid.duration}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-puma-navy uppercase block mb-1">
                    {vid.channelTitle}
                  </span>
                  <h3 className="font-bold text-sm text-puma-dark line-clamp-2 mb-2 group-hover:text-puma-navy transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-puma-navy">
                <span>Reproducir ahora</span>
                <Play className="w-3.5 h-3.5 fill-puma-navy" />
              </div>
            </div>
          ))}
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
