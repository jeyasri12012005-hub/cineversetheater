import React, { useState } from 'react';
import { Film, Menu, X, Ticket } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'booking' | 'gallery';
  onNavigate: (page: 'home' | 'booking' | 'gallery') => void;
  onQuickBook?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onQuickBook }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'booking' | 'gallery') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#3A0715]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3A0715] to-[#080808] border border-[#D4AF37]/50 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all">
            <Film className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-brand text-2xl font-black tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
              CINEVERSE
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]/80 font-medium">
              Cinema Beyond Imagination
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap cursor-pointer transition-colors pb-1 relative ${
              currentPage === 'home'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('booking')}
            className={`whitespace-nowrap cursor-pointer transition-colors pb-1 relative ${
              currentPage === 'booking'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Ticket Booking
            {currentPage === 'booking' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('gallery')}
            className={`whitespace-nowrap cursor-pointer transition-colors pb-1 relative ${
              currentPage === 'gallery'
                ? 'text-[#D4AF37] font-semibold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Theatre Gallery
            {currentPage === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={() => {
              if (onQuickBook) onQuickBook();
              else handleNavClick('booking');
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA820A] text-black font-semibold text-xs tracking-wider uppercase rounded-md shadow-[0_4px_14px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Ticket className="w-4 h-4 text-black" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              if (onQuickBook) onQuickBook();
              else handleNavClick('booking');
            }}
            className="px-3 py-1.5 bg-[#D4AF37] text-black text-xs font-bold rounded uppercase tracking-wider"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white rounded-md bg-neutral-900/60 border border-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0507] border-b border-[#3A0715] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${
              currentPage === 'home'
                ? 'bg-[#3A0715]/80 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('booking')}
            className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${
              currentPage === 'booking'
                ? 'bg-[#3A0715]/80 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            Ticket Booking
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium ${
              currentPage === 'gallery'
                ? 'bg-[#3A0715]/80 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            Theatre Gallery
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                if (onQuickBook) onQuickBook();
                else handleNavClick('booking');
              }}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-center text-sm rounded uppercase tracking-wider shadow-md"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
