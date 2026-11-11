import React, { useState } from 'react';
import { Movie } from '../types';
import { Clock, Ticket, Sparkles, Info } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onBook: (movie: Movie) => void;
  onViewDetails?: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onBook, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);

  // Status badge styling
  const getStatusBadge = () => {
    switch (movie.status) {
      case 'NOW SHOWING':
        return (
          <div className="bg-[#A30D28]/90 text-white text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase border border-red-500/30 backdrop-blur-md rounded">
            Now Showing
          </div>
        );
      case 'BOOKING OPEN':
        return (
          <div className="bg-[#D4AF37] text-black text-[11px] font-extrabold px-2.5 py-1 tracking-wider uppercase shadow-[0_0_12px_rgba(212,175,55,0.6)] rounded">
            Booking Open
          </div>
        );
      case 'COMING SOON':
        return (
          <div className="bg-neutral-800/95 text-[#D4AF37] text-[11px] font-bold px-2.5 py-1 tracking-wider uppercase border border-[#D4AF37]/30 backdrop-blur-md rounded">
            Coming Soon
          </div>
        );
    }
  };

  return (
    <div className="group relative bg-[#0e070a] border border-[#3A0715]/80 hover:border-[#D4AF37]/70 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(58,7,21,0.6)] flex flex-col h-full">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#150a0f]">
        {/* Status indicator on top left */}
        <div className="absolute top-3 left-3 z-20">
          {getStatusBadge()}
        </div>

        {/* Certificate on top right */}
        <div className="absolute top-3 right-3 z-20 bg-black/75 text-neutral-200 text-[11px] font-mono-nums font-bold px-2 py-0.5 rounded border border-neutral-700 backdrop-blur-sm">
          {movie.certificate}
        </div>

        {/* Poster Rendering */}
        {movie.poster && !imageError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} Poster`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
          />
        ) : (
          /* Premium Placeholder for Movies without official posters (e.g. Mookuthi Amman 2) */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#24060e] via-[#120307] to-[#080808] border border-dashed border-[#D4AF37]/30">
            <div className="w-16 h-16 rounded-full bg-[#3A0715] border border-[#D4AF37]/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <span className="font-serif-brand text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
              Official Release
            </span>
            <h4 className="font-serif-brand text-lg font-bold text-white mb-2">
              {movie.title}
            </h4>
            <div className="mt-4 px-3 py-1.5 bg-[#3A0715]/90 border border-[#D4AF37]/50 rounded text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
              POSTER COMING SOON
            </div>
            <p className="text-[11px] text-neutral-400 mt-3 max-w-[180px]">
              Directorial by {movie.director}
            </p>
          </div>
        )}

        {/* Subtle Dark Gradient Overlay at the bottom of poster */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e070a] via-[#0e070a]/70 to-transparent pointer-events-none" />
      </div>

      {/* Movie Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata: Zero-pill discipline - clean text with separators */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium mb-1.5 flex-wrap">
            <span className="text-[#D4AF37] font-semibold">{movie.language}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-300">{movie.genre}</span>
          </div>

          <h3 className="font-serif-brand text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono-nums">{movie.duration}</span>
            </div>
            {movie.rating && (
              <>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="text-amber-400 font-mono-nums font-semibold">
                  ★ {movie.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>

          <p className="text-xs text-neutral-400 mt-2.5 line-clamp-2 leading-relaxed">
            {movie.synopsis}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onBook(movie)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#E5C354] hover:to-[#C69E2B] text-black font-bold text-xs tracking-wider uppercase rounded-md shadow-[0_2px_10px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_16px_rgba(212,175,55,0.45)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Ticket className="w-4 h-4 text-black" />
            <span>{movie.status === 'COMING SOON' ? 'Notify & Book' : 'Book Tickets'}</span>
          </button>

          {onViewDetails && (
            <button
              onClick={() => onViewDetails(movie)}
              title="View Movie Details"
              className="p-2.5 border border-[#3A0715] hover:border-[#D4AF37]/50 rounded-md text-neutral-400 hover:text-white bg-[#150a0f] transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
