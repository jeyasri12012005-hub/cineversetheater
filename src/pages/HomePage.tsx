import React from 'react';
import { Movie } from '../types';
import { MOVIES } from '../data/movies';
import { GALLERY_ITEMS } from '../data/gallery';
import { MovieCard } from '../components/MovieCard';
import { Ticket, Sparkles, Armchair, Projector, ChevronRight, Star, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'booking' | 'gallery') => void;
  onBookMovie: (movie: Movie) => void;
  onSelectGalleryItem: (index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookMovie,
  onSelectGalleryItem
}) => {
  // Separate movies by status
  const nowShowingMovies = MOVIES.filter((m) => m.status === 'NOW SHOWING' || m.status === 'BOOKING OPEN');
  const comingSoonMovies = MOVIES.filter((m) => m.status === 'COMING SOON');

  // Preview 4 gallery items
  const galleryPreview = GALLERY_ITEMS.slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* ========================================================
          HERO SECTION - CINEMATIC SPIDER-MAN NIGHT SCENE
          ======================================================== */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
        {/* Cinematic Spider-Man Hero Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_spiderman_night_1793944529422.jpg"
            alt="Spider-Man swinging between skyscrapers at night"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-100 animate-in fade-in duration-1000"
          />
          {/* Dark transparent gradient overlay in deep black & burgundy */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#3A0715]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/60 to-[#080808]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Small Heading */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3A0715]/80 border border-[#D4AF37]/40 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              WELCOME TO CINEVERSE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl text-balance drop-shadow-2xl">
            WHERE CINEMA BECOMES AN EXPERIENCE
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-neutral-200 font-light max-w-2xl mb-10 leading-relaxed drop-shadow-md">
            Experience the Magic of Movies on the Big Screen.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E2C35D] to-[#AA820A] text-black font-extrabold text-sm uppercase tracking-widest rounded-lg shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Ticket className="w-5 h-5 text-black" />
              <span>BOOK YOUR TICKETS</span>
            </button>

            <button
              onClick={() => onNavigate('gallery')}
              className="flex items-center gap-2 px-6 py-4 bg-[#3A0715]/80 hover:bg-[#3A0715] text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-sm uppercase tracking-wider rounded-lg backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Explore Theatres</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Value Highlights Pill Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-neutral-300">
            <div className="flex flex-col items-center">
              <span className="font-mono-nums font-bold text-base text-[#D4AF37]">4K LASER</span>
              <span className="text-neutral-400">Pure Projection</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono-nums font-bold text-base text-[#D4AF37]">64-CH</span>
              <span className="text-neutral-400">Dolby Atmos Audio</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono-nums font-bold text-base text-[#D4AF37]">GOLD CLASS</span>
              <span className="text-neutral-400">VIP Recliners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono-nums font-bold text-base text-[#D4AF37]">MADURAI</span>
              <span className="text-neutral-400">South Veli Center</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          NOW SHOWING SECTION
          ======================================================== */}
      <section className="w-full py-20 bg-[#080808] border-t border-[#3A0715]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>Current Screenings</span>
              </div>
              <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-white">
                NOW SHOWING
              </h2>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] hover:text-[#FFF0B3] transition-colors cursor-pointer group"
            >
              <span>View All Showtimes</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nowShowingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onBook={onBookMovie}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          COMING SOON SECTION
          ======================================================== */}
      {comingSoonMovies.length > 0 && (
        <section className="w-full py-16 bg-[#0c0508] border-t border-[#3A0715]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block">
                  Upcoming Releases
                </span>
                <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-white">
                  COMING SOON
                </h2>
              </div>
              <p className="text-sm text-neutral-400 max-w-md">
                Get ready for the most anticipated releases arriving soon on CINEVERSE silver screens.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {comingSoonMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onBook={onBookMovie}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          WHY CHOOSE CINEVERSE?
          ======================================================== */}
      <section className="w-full py-20 bg-gradient-to-b from-[#080808] via-[#120307] to-[#080808] border-t border-[#3A0715]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block">
              The Cineverse Standard
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-5xl font-black text-white mb-4">
              WHY CHOOSE CINEVERSE?
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Every detail engineered from acoustics to ergonomics to deliver a flawless international cinematic experience in Madurai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Premium Cinema Experience */}
            <div className="bg-[#0e070a] border border-[#3A0715] hover:border-[#D4AF37]/50 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(58,7,21,0.5)] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#3A0715] border border-[#D4AF37]/30 flex items-center justify-center mb-6 text-[#D4AF37]">
                  <Projector className="w-7 h-7" />
                </div>
                <h3 className="font-serif-brand text-xl font-bold text-white mb-3">
                  Premium Cinema Experience
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Immerse yourself in crystal-clear Christie 4K pure laser projection and 64-channel Dolby Atmos spatial sound engineered with zero acoustic blind spots.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-900 text-xs text-[#D4AF37] font-semibold">
                High-Contrast Micro-Perforated Silver Screens
              </div>
            </div>

            {/* Feature 2: Comfortable Seating */}
            <div className="bg-[#0e070a] border border-[#3A0715] hover:border-[#D4AF37]/50 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(58,7,21,0.5)] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#3A0715] border border-[#D4AF37]/30 flex items-center justify-center mb-6 text-[#D4AF37]">
                  <Armchair className="w-7 h-7" />
                </div>
                <h3 className="font-serif-brand text-xl font-bold text-white mb-3">
                  Comfortable Seating
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Sink into plush motorized leather recliners with personal swivel dining tables, integrated cup-holder lights, and spacious legroom for effortless relaxation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-900 text-xs text-[#D4AF37] font-semibold">
                Ergonomic Dual-Motor VIP Gold Class
              </div>
            </div>

            {/* Feature 3: Easy Online Booking */}
            <div className="bg-[#0e070a] border border-[#3A0715] hover:border-[#D4AF37]/50 rounded-xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(58,7,21,0.5)] flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#3A0715] border border-[#D4AF37]/30 flex items-center justify-center mb-6 text-[#D4AF37]">
                  <Ticket className="w-7 h-7" />
                </div>
                <h3 className="font-serif-brand text-xl font-bold text-white mb-3">
                  Easy Online Booking
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Reserve your favorite seats with our responsive 2D cinema layout, instant booking confirmation, contactless QR passes, and zero box-office waiting lines.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-900 text-xs text-[#D4AF37] font-semibold">
                Instant Digital Pass & QR Admission
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          THEATRE GALLERY PREVIEW (4 Photographs + View Gallery Link)
          ======================================================== */}
      <section className="w-full py-20 bg-[#080808] border-t border-[#3A0715]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block">
                Visual Showcase
              </span>
              <h2 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-white">
                THEATRE GALLERY PREVIEW
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3A0715] hover:bg-[#520a1e] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>View Full Gallery (8 Spaces)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Preview Photographs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryPreview.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate('gallery');
                  onSelectGalleryItem(idx);
                }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#3A0715] hover:border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif-brand text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              <span>Discover all 8 cinema spaces & VIP facilities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
