import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Film, Sparkles, MapPin } from 'lucide-react';

interface GalleryPageProps {
  initialSelectedItemIndex?: number | null;
  onClearInitialIndex?: () => void;
  onBookTickets: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  initialSelectedItemIndex,
  onClearInitialIndex,
  onBookTickets
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    initialSelectedItemIndex !== undefined ? initialSelectedItemIndex : null
  );

  const activeItem: GalleryItem | null =
    selectedItemIndex !== null ? GALLERY_ITEMS[selectedItemIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [selectedItemIndex]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex(
        (selectedItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  }, [selectedItemIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') setSelectedItemIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handleNext, handlePrev]);

  return (
    <div className="w-full min-h-screen py-12 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
            <Film className="w-4 h-4" />
            <span>Architecture & Ambiance</span>
          </div>
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-black text-white">
            THEATRE GALLERY
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Step inside CINEVERSE South Veli, Madurai. Explore our world-class architecture, laser auditoriums, luxury red recliner suites, and opulent VIP facilities.
          </p>
        </div>

        {/* Gallery Grid of all 8 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(index);
                if (onClearInitialIndex) onClearInitialIndex();
              }}
              className="group relative bg-[#0e070a] border border-[#3A0715] hover:border-[#D4AF37] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_12px_30px_rgba(212,175,55,0.25)] flex flex-col"
            >
              {/* Photo Viewport */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e070a] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Enlarge Hint Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#3A0715]/90 px-2 py-0.5 rounded border border-[#D4AF37]/30 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-brand text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px] text-[#D4AF37]">
                  <span className="truncate pr-2 font-mono-nums">{item.specs.split('·')[0]}</span>
                  <span className="text-neutral-400 hover:text-white shrink-0">Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#24060e] via-[#150408] to-[#080808] border border-[#3A0715] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif-brand text-2xl font-bold text-white">
              Ready to Experience CINEVERSE in Person?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Book your tickets online now to reserve your luxury recliner seats with zero box office queues.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#D4AF37] pt-1">
              <MapPin className="w-4 h-4" />
              <span>South Veli, Madurai – 625001</span>
            </div>
          </div>

          <button
            onClick={onBookTickets}
            className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-extrabold text-xs tracking-widest uppercase rounded-lg shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Book Your Seats
          </button>
        </div>
      </div>

      {/* ========================================================
          IMAGE ENLARGEMENT MODAL (LIGHTBOX)
          ======================================================== */}
      {activeItem && selectedItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedItemIndex(null)}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full bg-[#0d0508] border-2 border-[#D4AF37]/60 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(58,7,21,0.9)] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close */}
            <div className="bg-[#18070d] px-6 py-4 flex items-center justify-between border-b border-[#3A0715]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Space {selectedItemIndex + 1} of {GALLERY_ITEMS.length}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="font-serif-brand text-sm sm:text-base font-bold text-white">
                  {activeItem.title}
                </span>
              </div>

              <button
                onClick={() => setSelectedItemIndex(null)}
                className="p-1.5 rounded-full bg-neutral-900 hover:bg-[#3A0715] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[480px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#3A0715] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#3A0715] border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="bg-[#120508] p-5 sm:p-6 border-t border-[#3A0715] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-neutral-200 leading-relaxed max-w-2xl">
                  {activeItem.description}
                </p>
                <p className="text-xs text-[#D4AF37] font-mono-nums">
                  {activeItem.specs}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedItemIndex(null);
                  onBookTickets();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black text-xs font-bold uppercase tracking-wider rounded-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                Book Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
