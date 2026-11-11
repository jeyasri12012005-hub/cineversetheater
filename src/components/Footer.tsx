import React from 'react';
import { Film, MapPin, Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'booking' | 'gallery') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#3A0715] text-neutral-300">
      {/* Brand & Experience Bar */}
      <div className="border-b border-neutral-900/80 bg-gradient-to-r from-[#170308] via-[#080808] to-[#170308]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-lg bg-[#3A0715] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Film className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif-brand text-2xl font-bold tracking-wider text-white">
                CINEVERSE
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                THE WORLD OF CINEMA, BEYOND IMAGINATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Dolby Atmos & 4K Laser</span>
            </div>
            <span className="text-neutral-700">·</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Luxury Gold Class Recliners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: About */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              About Cineverse
            </h4>
            <p className="text-sm leading-relaxed text-neutral-400">
              Madurai’s premier cinematic destination crafted for true movie lovers. Experience uncompromised acoustics, high-gain silver screens, and bespoke recliner luxury.
            </p>
            <div className="text-xs text-neutral-500 font-mono-nums">
              Registration: TN-MDU-CIN-2026-0881
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Ticket Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Theatre Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Screens */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Showtime Timings
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Box Office: 09:30 AM – 11:30 PM</span>
              </li>
              <li className="text-xs text-neutral-500 pl-6">
                Morning: 10:30 AM · Afternoon: 02:15 PM
              </li>
              <li className="text-xs text-neutral-500 pl-6">
                Evening: 06:45 PM · Night: 10:15 PM
              </li>
              <li className="pt-2 text-xs text-[#D4AF37]">
                3 Screens · Valet Parking Available
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details (Clickable Phone & Full Address) */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              Theatre Location
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-neutral-300">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">CINEVERSE</p>
                  <p className="text-neutral-400">South Veli, Madurai – 625001</p>
                  <p className="text-xs text-neutral-500">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href="tel:9751331659"
                  className="text-white hover:text-[#D4AF37] font-semibold tracking-wider underline decoration-[#D4AF37]/50 underline-offset-4 transition-colors font-mono-nums"
                >
                  9751331659
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:support@cineverse.in" className="hover:text-white transition-colors">
                  support@cineverse.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} CINEVERSE Cinemas. All rights reserved.
          </p>
          <p className="text-center md:text-right">
            Designed for Cinephiles · South Veli, Madurai
          </p>
        </div>
      </div>
    </footer>
  );
};
