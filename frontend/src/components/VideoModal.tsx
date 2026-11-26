import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  youtubeId: string;
  title: string;
  channelTitle: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  youtubeId,
  title,
  channelTitle,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-puma-dark rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-700 relative">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>
            <span className="text-xs text-puma-gold font-medium">Canal: {channelTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reproductor de YouTube embebido accesible */}
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
