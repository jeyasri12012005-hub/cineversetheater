import React, { useState, useId, useMemo } from 'react';
import { Movie, MovieFilter, ShowTime, TheatreScreen, BookingDetails } from '../types';
import { MOVIES, THEATRE_SCREENS, SHOW_TIMES, SEAT_PRICES } from '../data/movies';
import { MovieCard } from '../components/MovieCard';
import {
  Calendar,
  Clock,
  Tv,
  CheckCircle2,
  Ticket,
  User,
  Phone,
  ArrowLeft,
  Sparkles,
  Printer,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface BookingPageProps {
  selectedMovieFromHome?: Movie | null;
  onClearMovieSelection?: () => void;
  onNavigateHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  selectedMovieFromHome,
  onClearMovieSelection,
  onNavigateHome
}) => {
  // Filters for movie catalog
  const [activeFilter, setActiveFilter] = useState<MovieFilter>('All Movies');

  // Booking Flow Steps State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(selectedMovieFromHome || null);

  // Generate next 6 dates starting today
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      const fullDate = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      dates.push({ id: `d-${i}`, label: dayName, sub: formattedDate, fullDate });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<ShowTime>(SHOW_TIMES[2]); // Default 06:45 PM
  const [selectedScreen, setSelectedScreen] = useState<TheatreScreen>(THEATRE_SCREENS[0]);

  // Selected Seats set
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Customer Form
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; mobile?: string }>({});

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  // Unique component ID for form inputs
  const nameInputId = useId();
  const mobileInputId = useId();

  // Filtered movies list
  const filteredMovies = useMemo(() => {
    if (activeFilter === 'Tamil') {
      return MOVIES.filter((m) => m.language === 'Tamil');
    }
    if (activeFilter === 'English') {
      return MOVIES.filter((m) => m.language === 'English');
    }
    if (activeFilter === 'Horror') {
      return MOVIES.filter((m) => m.genre.toLowerCase().includes('horror'));
    }
    return MOVIES;
  }, [activeFilter]);

  // 2D Cinema Seats Layout Definition
  // Rows:
  // Executive: A, B, C (10 seats each, ₹150)
  // Premium: D, E, F, G (12 seats each, ₹220)
  // VIP Recliner: H, J (8 seats each, ₹350)
  const seatLayout = useMemo(() => {
    const rows = [
      { row: 'A', tier: 'Executive' as const, seats: 10, price: SEAT_PRICES.Executive },
      { row: 'B', tier: 'Executive' as const, seats: 10, price: SEAT_PRICES.Executive },
      { row: 'C', tier: 'Executive' as const, seats: 10, price: SEAT_PRICES.Executive },
      { row: 'D', tier: 'Premium' as const, seats: 12, price: SEAT_PRICES.Premium },
      { row: 'E', tier: 'Premium' as const, seats: 12, price: SEAT_PRICES.Premium },
      { row: 'F', tier: 'Premium' as const, seats: 12, price: SEAT_PRICES.Premium },
      { row: 'G', tier: 'Premium' as const, seats: 12, price: SEAT_PRICES.Premium },
      { row: 'H', tier: 'VIP Recliner' as const, seats: 8, price: SEAT_PRICES['VIP Recliner'] },
      { row: 'J', tier: 'VIP Recliner' as const, seats: 8, price: SEAT_PRICES['VIP Recliner'] }
    ];

    // Seeded booked seats per show for realistic interactive 2D map
    const bookedSeed: Record<string, string[]> = {
      'screen-1': ['B4', 'B5', 'C3', 'D6', 'D7', 'E5', 'E6', 'E7', 'F8', 'H3', 'H4', 'J5'],
      'screen-2': ['A2', 'C6', 'C7', 'D4', 'D5', 'E8', 'F3', 'F4', 'H2', 'J3', 'J4'],
      'screen-3': ['A1', 'B2', 'D5', 'E4', 'E5', 'H4', 'H5', 'J2']
    };

    const bookedList = bookedSeed[selectedScreen.id] || [];

    return { rows, bookedList };
  }, [selectedScreen.id]);

  // Handle seat click
  const toggleSeat = (seatId: string) => {
    if (seatLayout.bookedList.includes(seatId)) return;

    setSelectedSeatIds((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= 8) {
          alert('Maximum 8 seats can be selected per booking.');
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  // Calculate pricing breakdown
  const pricingBreakdown = useMemo(() => {
    let subtotal = 0;
    const tierMap: Record<string, { count: number; unitPrice: number }> = {};

    selectedSeatIds.forEach((id) => {
      const rowLetter = id.charAt(0);
      const rowDef = seatLayout.rows.find((r) => r.row === rowLetter);
      if (rowDef) {
        subtotal += rowDef.price;
        if (!tierMap[rowDef.tier]) {
          tierMap[rowDef.tier] = { count: 0, unitPrice: rowDef.price };
        }
        tierMap[rowDef.tier].count += 1;
      }
    });

    const tierBreakdown = Object.entries(tierMap).map(([tier, data]) => ({
      tier,
      count: data.count,
      unitPrice: data.unitPrice
    }));

    // Realistic fees: Convenience fee ₹25/ticket + 18% GST on convenience fee
    const convenienceFee = selectedSeatIds.length * 25;
    const gst = Math.round(convenienceFee * 0.18);
    const totalAmount = subtotal + convenienceFee + gst;

    return {
      subtotal,
      convenienceFee,
      gst,
      totalAmount,
      tierBreakdown
    };
  }, [selectedSeatIds, seatLayout]);

  // Validate and submit booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; mobile?: string } = {};

    if (!customerName.trim() || customerName.trim().length < 3) {
      errors.name = 'Please enter a valid customer name (at least 3 characters).';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (selectedSeatIds.length === 0) {
      alert('Please select at least one seat to proceed with booking.');
      return;
    }

    if (!selectedMovie) {
      alert('Please select a movie to continue.');
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Generate unique booking reference (e.g. CV-784291)
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const bookingRef = `CV-${randomCode}`;

    const newBooking: BookingDetails = {
      bookingId: bookingRef,
      movie: selectedMovie,
      date: selectedDate,
      showTime: selectedTime,
      screen: selectedScreen,
      seats: [...selectedSeatIds].sort(),
      seatTierBreakdown: pricingBreakdown.tierBreakdown,
      customerName: customerName.trim(),
      mobileNumber: cleanMobile,
      ticketCount: selectedSeatIds.length,
      subtotal: pricingBreakdown.subtotal,
      convenienceFee: pricingBreakdown.convenienceFee,
      gst: pricingBreakdown.gst,
      totalAmount: pricingBreakdown.totalAmount,
      bookingTimestamp: new Date().toLocaleString()
    };

    // Save to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('cineverse_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('cineverse_bookings', JSON.stringify(existing));
    } catch {
      // safe fallback if storage unavailable
    }

    setConfirmedBooking(newBooking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset booking to start over
  const handleResetBooking = () => {
    setConfirmedBooking(null);
    setSelectedSeatIds([]);
    setCustomerName('');
    setMobileNumber('');
    setFormErrors({});
  };

  // Open WhatsApp with all selected booking details pre-filled
  const handleBookViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedMovie) {
      alert('Please select a movie first.');
      return;
    }
    if (selectedSeatIds.length === 0) {
      alert('Please select at least one seat to proceed with booking via WhatsApp.');
      return;
    }

    const messageLines = [
      `*CINEVERSE CINEMAS - TICKET BOOKING*`,
      `--------------------------------`,
      `🎬 *Movie:* ${selectedMovie.title} (${selectedMovie.language})`,
      `📅 *Date:* ${selectedDate}`,
      `⏰ *Showtime:* ${selectedTime.time} (${selectedTime.period})`,
      `🏛️ *Screen:* ${selectedScreen.name}`,
      `💺 *Seats (${selectedSeatIds.length}):* ${[...selectedSeatIds].sort().join(', ')}`,
      `💰 *Total Amount:* ₹${pricingBreakdown.totalAmount}`,
      customerName.trim() ? `👤 *Customer Name:* ${customerName.trim()}` : null,
      mobileNumber.trim() ? `📱 *Mobile Number:* ${mobileNumber.trim()}` : null,
      `--------------------------------`,
      `Hello CINEVERSE team, I would like to book these tickets at South Veli, Madurai. Please confirm availability.`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/919751331659?text=${encodeURIComponent(messageLines)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full min-h-screen py-10 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            VIEW: BOOKING CONFIRMATION SCREEN (STEP 8)
            ======================================================== */}
        {confirmedBooking ? (
          <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
            {/* Header Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mb-4 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-white">
                BOOKING CONFIRMED!
              </h1>
              <p className="text-sm text-neutral-300 mt-2">
                Your cinematic experience at CINEVERSE is officially reserved.
              </p>
            </div>

            {/* The Ticket Pass Card */}
            <div className="bg-[#120609] border-2 border-[#D4AF37] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(58,7,21,0.8)] relative">
              {/* Gold Top Banner */}
              <div className="bg-gradient-to-r from-[#D4AF37] via-[#F3DE8A] to-[#AA820A] px-6 py-4 flex items-center justify-between text-black">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  <span className="font-serif-brand font-black text-lg tracking-wider">
                    CINEVERSE DIGITAL PASS
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest font-bold block">
                    BOOKING REFERENCE
                  </span>
                  <span className="font-mono-nums font-black text-base tracking-wider">
                    {confirmedBooking.bookingId}
                  </span>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Movie Poster Thumbnail */}
                  {confirmedBooking.movie.poster ? (
                    <img
                      src={confirmedBooking.movie.poster}
                      alt={confirmedBooking.movie.title}
                      referrerPolicy="no-referrer"
                      className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-lg border border-[#D4AF37]/50 shadow-md shrink-0"
                    />
                  ) : (
                    <div className="w-24 sm:w-32 aspect-[2/3] bg-[#3A0715] rounded-lg border border-dashed border-[#D4AF37]/40 flex flex-col items-center justify-center p-2 text-center shrink-0">
                      <Sparkles className="w-6 h-6 text-[#D4AF37] mb-1" />
                      <span className="text-[10px] text-[#D4AF37] font-bold">CINEVERSE</span>
                    </div>
                  )}

                  {/* Movie & Showtime Specs */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="text-[#D4AF37] font-bold">{confirmedBooking.movie.language}</span>
                      <span>·</span>
                      <span>{confirmedBooking.movie.genre}</span>
                      <span>·</span>
                      <span className="bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded text-[10px] font-mono-nums font-bold">
                        {confirmedBooking.movie.certificate}
                      </span>
                    </div>

                    <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
                      {confirmedBooking.movie.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{confirmedBooking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{confirmedBooking.showTime.time} ({confirmedBooking.showTime.period})</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300 sm:col-span-2">
                        <Tv className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{confirmedBooking.screen.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perforation Divider */}
                <div className="relative py-2">
                  <div className="border-t-2 border-dashed border-[#3A0715]" />
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#080808]" />
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#080808]" />
                </div>

                {/* Seats & Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#18090d] p-5 rounded-xl border border-[#3A0715]">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                      Reserved Seats ({confirmedBooking.ticketCount})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {confirmedBooking.seats.map((seat) => (
                        <span
                          key={seat}
                          className="px-2.5 py-1 bg-[#D4AF37] text-black font-black text-xs font-mono-nums rounded shadow"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                      Guest Information
                    </span>
                    <p className="font-semibold text-white text-sm">{confirmedBooking.customerName}</p>
                    <p className="text-xs text-neutral-400 font-mono-nums">
                      +91 {confirmedBooking.mobileNumber}
                    </p>
                  </div>
                </div>

                {/* Amount Paid */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <div>
                    <span className="text-xs text-neutral-400 block">Total Amount Paid</span>
                    <span className="text-xs text-[#D4AF37]">
                      {confirmedBooking.ticketCount} Tickets · All Taxes Included
                    </span>
                  </div>
                  <div className="font-mono-nums text-2xl sm:text-3xl font-black text-[#D4AF37]">
                    ₹{confirmedBooking.totalAmount}
                  </div>
                </div>

                {/* Simulated Booking Notice */}
                <div className="bg-amber-950/40 border border-amber-600/40 rounded-lg p-3 text-xs text-amber-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Simulated Booking Record:</strong> This is an interactive demo for demonstration purposes. No real bank charges were processed. Your ticket reference is saved locally.
                  </div>
                </div>

                {/* Cinema Location Stamp */}
                <div className="text-center text-xs text-neutral-400 pt-2">
                  <p className="font-semibold text-white">CINEVERSE CINEMAS</p>
                  <p>South Veli, Madurai – 625001 · Phone: 9751331659</p>
                </div>
              </div>
            </div>

            {/* Confirmation Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={handleResetBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black rounded-lg text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4 text-black" />
                <span>Book Another Movie</span>
              </button>

              <button
                onClick={onNavigateHome}
                className="w-full sm:w-auto px-6 py-3 text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
              VIEW: INTERACTIVE 8-STEP TICKET BOOKING FLOW
              ======================================================== */
          <div className="space-y-12">
            {/* Page Header */}
            <div className="border-b border-[#3A0715] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                  <Ticket className="w-4 h-4" />
                  <span>Box Office Portal</span>
                </div>
                <h1 className="font-serif-brand text-3xl sm:text-5xl font-black text-white">
                  TICKET BOOKING
                </h1>
                <p className="text-sm text-neutral-400 mt-2">
                  Select your film, showtime, and preferred seating across our 3 luxury screens.
                </p>
              </div>

              {selectedMovie && (
                <button
                  onClick={() => {
                    setSelectedMovie(null);
                    if (onClearMovieSelection) onClearMovieSelection();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#18090d] border border-[#3A0715] text-xs text-[#D4AF37] hover:text-white transition-colors cursor-pointer self-start md:self-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Choose Another Movie</span>
                </button>
              )}
            </div>

            {/* ========================================================
                STEP 1: SELECT MOVIE (WHEN NO MOVIE IS SELECTED)
                ======================================================== */}
            {!selectedMovie ? (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Movie Filter Tabs (Button / Segmented controls per frontend-design rules) */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-1.5 p-1 bg-[#120508] border border-[#3A0715] rounded-lg">
                    {(['All Movies', 'Tamil', 'English', 'Horror'] as MovieFilter[]).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          activeFilter === filter
                            ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-neutral-400 font-mono-nums">
                    Showing {filteredMovies.length} of {MOVIES.length} Verified Titles
                  </span>
                </div>

                {/* Movie Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onBook={(m) => {
                        setSelectedMovie(m);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* ========================================================
                  STEPS 2 THROUGH 7: CONFIGURE DATE, TIME, SCREEN & SEATS
                  ======================================================== */
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Selected Movie Spotlight Banner */}
                <div className="bg-gradient-to-r from-[#24060e] via-[#120407] to-[#080808] border border-[#3A0715] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    {selectedMovie.poster ? (
                      <img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        referrerPolicy="no-referrer"
                        className="w-20 aspect-[2/3] object-cover rounded-md border border-[#D4AF37]/40 shadow-lg"
                      />
                    ) : (
                      <div className="w-20 aspect-[2/3] bg-[#3A0715] rounded-md border border-dashed border-[#D4AF37]/30 flex flex-col items-center justify-center p-2 text-center">
                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                        <span className="text-[#D4AF37] font-semibold">{selectedMovie.language}</span>
                        <span>·</span>
                        <span>{selectedMovie.genre}</span>
                        <span>·</span>
                        <span className="font-mono-nums">{selectedMovie.duration}</span>
                      </div>
                      <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
                        {selectedMovie.title}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xl line-clamp-1">
                        {selectedMovie.synopsis}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="text-xs text-[#D4AF37] hover:underline uppercase tracking-wider shrink-0 cursor-pointer"
                  >
                    Change Movie
                  </button>
                </div>

                {/* STEP 2: SELECT DATE */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37]">
                    <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>Select Date</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.id}
                        onClick={() => setSelectedDate(dateObj.fullDate)}
                        className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer ${
                          selectedDate === dateObj.fullDate
                            ? 'bg-[#3A0715] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                            : 'bg-[#0f070a] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                        }`}
                      >
                        <span className="text-xs font-semibold block text-neutral-400">
                          {dateObj.label}
                        </span>
                        <span className="font-serif-brand font-bold text-base text-white block mt-0.5">
                          {dateObj.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 3 & STEP 4: SHOW TIME & THEATRE SCREEN */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* STEP 3: SHOW TIME */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37]">
                      <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>Select Show Time</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {SHOW_TIMES.map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setSelectedTime(st)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            selectedTime.id === st.id
                              ? 'bg-[#3A0715] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                              : 'bg-[#0f070a] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                          }`}
                        >
                          <div>
                            <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                              {st.period}
                            </span>
                            <span className="font-mono-nums text-base font-bold text-white block mt-0.5">
                              {st.time}
                            </span>
                          </div>
                          <Clock className={`w-4 h-4 ${selectedTime.id === st.id ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* STEP 4: THEATRE SCREEN */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37]">
                      <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                        4
                      </span>
                      <span>Select Theatre Screen</span>
                    </div>

                    <div className="space-y-2.5">
                      {THEATRE_SCREENS.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setSelectedScreen(sc);
                            setSelectedSeatIds([]); // Clear seats when screen changes
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            selectedScreen.id === sc.id
                              ? 'bg-[#3A0715] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                              : 'bg-[#0f070a] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                          }`}
                        >
                          <div>
                            <span className="font-serif-brand font-bold text-sm text-white block">
                              {sc.name}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {sc.tech} · {sc.sound}
                            </span>
                          </div>
                          <span className="text-xs text-[#D4AF37] font-mono-nums font-semibold">
                            {sc.format}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    STEP 5: SEAT SELECTION (2D CINEMA SEAT LAYOUT)
                    ======================================================== */}
                <div className="space-y-6 pt-4 border-t border-[#3A0715]/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37]">
                      <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                        5
                      </span>
                      <span>Seat Selection (Interactive 2D Cinema Layout)</span>
                    </div>

                    {/* Color Status Legend as explicitly specified in prompt:
                        - Available Seats – Green
                        - Selected Seats – Gold
                        - Booked Seats – Red */}
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-[#22C55E] border border-green-400 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                        <span className="text-neutral-300">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-[#D4AF37] border border-amber-200 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                        <span className="text-neutral-300 font-semibold">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-[#EF4444] border border-red-600 opacity-80" />
                        <span className="text-neutral-400">Booked</span>
                      </div>
                    </div>
                  </div>

                  {/* 2D Cinema Auditorium Viewport */}
                  <div className="bg-[#0b0407] border border-[#3A0715] rounded-2xl p-6 sm:p-10 flex flex-col items-center overflow-x-auto shadow-2xl">
                    {/* Screen Indicator at top */}
                    <div className="w-full max-w-xl mb-12 text-center flex flex-col items-center">
                      <div className="w-full h-2.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full shadow-[0_0_20px_#D4AF37] opacity-80" />
                      <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-0.5 opacity-40" />
                      <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mt-3">
                        CINEMA SCREEN · ALL EYES THIS WAY
                      </span>
                    </div>

                    {/* Seating Tiers Grid */}
                    <div className="space-y-6 w-full max-w-2xl min-w-[500px]">
                      {/* VIP Recliner Tier */}
                      <div className="border border-[#D4AF37]/30 bg-[#3A0715]/20 p-4 rounded-xl">
                        <div className="flex items-center justify-between text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-3">
                          <span>VIP Recliner Tier</span>
                          <span className="font-mono-nums">₹{SEAT_PRICES['VIP Recliner']} per seat</span>
                        </div>
                        <div className="space-y-2.5">
                          {seatLayout.rows
                            .filter((r) => r.tier === 'VIP Recliner')
                            .map((rowDef) => (
                              <div key={rowDef.row} className="flex items-center justify-center gap-2">
                                <span className="w-6 text-xs font-bold text-neutral-400 font-mono-nums">
                                  {rowDef.row}
                                </span>
                                <div className="flex items-center gap-2">
                                  {Array.from({ length: rowDef.seats }, (_, i) => {
                                    const seatId = `${rowDef.row}${i + 1}`;
                                    const isBooked = seatLayout.bookedList.includes(seatId);
                                    const isSelected = selectedSeatIds.includes(seatId);

                                    return (
                                      <button
                                        key={seatId}
                                        onClick={() => toggleSeat(seatId)}
                                        disabled={isBooked}
                                        title={`${seatId} - VIP Recliner (₹${SEAT_PRICES['VIP Recliner']})`}
                                        className={`w-8 h-8 rounded-md text-[11px] font-mono-nums font-bold flex items-center justify-center transition-all cursor-pointer ${
                                          isBooked
                                            ? 'bg-[#EF4444] text-white opacity-40 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-[#D4AF37] text-black ring-2 ring-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.9)] scale-110'
                                            : 'bg-[#22C55E] text-black hover:bg-emerald-400'
                                        }`}
                                      >
                                        {i + 1}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Premium Tier */}
                      <div className="border border-neutral-800 bg-neutral-900/20 p-4 rounded-xl">
                        <div className="flex items-center justify-between text-xs text-neutral-300 font-bold uppercase tracking-wider mb-3">
                          <span>Premium Tier</span>
                          <span className="font-mono-nums text-[#D4AF37]">₹{SEAT_PRICES.Premium} per seat</span>
                        </div>
                        <div className="space-y-2">
                          {seatLayout.rows
                            .filter((r) => r.tier === 'Premium')
                            .map((rowDef) => (
                              <div key={rowDef.row} className="flex items-center justify-center gap-2">
                                <span className="w-6 text-xs font-bold text-neutral-400 font-mono-nums">
                                  {rowDef.row}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {Array.from({ length: rowDef.seats }, (_, i) => {
                                    const seatId = `${rowDef.row}${i + 1}`;
                                    const isBooked = seatLayout.bookedList.includes(seatId);
                                    const isSelected = selectedSeatIds.includes(seatId);

                                    return (
                                      <button
                                        key={seatId}
                                        onClick={() => toggleSeat(seatId)}
                                        disabled={isBooked}
                                        title={`${seatId} - Premium (₹${SEAT_PRICES.Premium})`}
                                        className={`w-7 h-7 rounded text-[10px] font-mono-nums font-bold flex items-center justify-center transition-all cursor-pointer ${
                                          isBooked
                                            ? 'bg-[#EF4444] text-white opacity-40 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-[#D4AF37] text-black ring-2 ring-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.9)] scale-110'
                                            : 'bg-[#22C55E] text-black hover:bg-emerald-400'
                                        }`}
                                      >
                                        {i + 1}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Executive Tier */}
                      <div className="border border-neutral-800 bg-neutral-900/10 p-4 rounded-xl">
                        <div className="flex items-center justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider mb-3">
                          <span>Executive Tier</span>
                          <span className="font-mono-nums text-[#D4AF37]">₹{SEAT_PRICES.Executive} per seat</span>
                        </div>
                        <div className="space-y-2">
                          {seatLayout.rows
                            .filter((r) => r.tier === 'Executive')
                            .map((rowDef) => (
                              <div key={rowDef.row} className="flex items-center justify-center gap-2">
                                <span className="w-6 text-xs font-bold text-neutral-400 font-mono-nums">
                                  {rowDef.row}
                                </span>
                                <div className="flex items-center gap-2">
                                  {Array.from({ length: rowDef.seats }, (_, i) => {
                                    const seatId = `${rowDef.row}${i + 1}`;
                                    const isBooked = seatLayout.bookedList.includes(seatId);
                                    const isSelected = selectedSeatIds.includes(seatId);

                                    return (
                                      <button
                                        key={seatId}
                                        onClick={() => toggleSeat(seatId)}
                                        disabled={isBooked}
                                        title={`${seatId} - Executive (₹${SEAT_PRICES.Executive})`}
                                        className={`w-7 h-7 rounded text-[10px] font-mono-nums font-bold flex items-center justify-center transition-all cursor-pointer ${
                                          isBooked
                                            ? 'bg-[#EF4444] text-white opacity-40 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-[#D4AF37] text-black ring-2 ring-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.9)] scale-110'
                                            : 'bg-[#22C55E] text-black hover:bg-emerald-400'
                                        }`}
                                      >
                                        {i + 1}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Selected Seats summary chip bar */}
                    <div className="mt-8 pt-4 border-t border-neutral-800 w-full max-w-xl flex items-center justify-between flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Selected ({selectedSeatIds.length}):</span>
                        {selectedSeatIds.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {selectedSeatIds.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 bg-[#D4AF37] text-black font-bold font-mono-nums rounded text-[11px]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic">No seats selected yet</span>
                        )}
                      </div>

                      {selectedSeatIds.length > 0 && (
                        <button
                          onClick={() => setSelectedSeatIds([])}
                          className="text-[11px] text-red-400 hover:underline cursor-pointer"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    STEPS 6 & 7: CUSTOMER DETAILS & BOOKING SUMMARY
                    ======================================================== */}
                <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-[#3A0715]">
                  {/* STEP 6: CUSTOMER DETAILS */}
                  <div className="space-y-5 bg-[#0f070a] border border-[#3A0715] p-6 sm:p-8 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37]">
                      <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                        6
                      </span>
                      <span>Customer Details</span>
                    </div>

                    <div className="space-y-4">
                      {/* Customer Name */}
                      <div>
                        <label htmlFor={nameInputId} className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                          Customer Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id={nameInputId}
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-[#170a0f] border border-neutral-800 focus:border-[#D4AF37] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                          />
                        </div>
                        {formErrors.name && (
                          <p className="text-xs text-red-400 mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label htmlFor={mobileInputId} className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                          Mobile Number (10 Digits) *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            id={mobileInputId}
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="e.g. 9751331659"
                            className="w-full bg-[#170a0f] border border-neutral-800 focus:border-[#D4AF37] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono-nums"
                          />
                        </div>
                        {formErrors.mobile && (
                          <p className="text-xs text-red-400 mt-1">{formErrors.mobile}</p>
                        )}
                      </div>

                      {/* Number of Tickets (Auto-synced with seat selection) */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                          Number of Tickets
                        </label>
                        <div className="bg-[#170a0f] border border-neutral-800 rounded-lg p-3 text-sm flex items-center justify-between">
                          <span className="text-neutral-400">Total Seats Selected</span>
                          <span className="font-mono-nums font-bold text-white text-base">
                            {selectedSeatIds.length} {selectedSeatIds.length === 1 ? 'Ticket' : 'Tickets'}
                          </span>
                        </div>
                        {selectedSeatIds.length === 0 && (
                          <p className="text-xs text-amber-400/90 mt-1">
                            Please pick at least one seat from the 2D layout above.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STEP 7: BOOKING SUMMARY & STEP 8: CONFIRM BOOKING */}
                  <div className="space-y-5 bg-[#120609] border-2 border-[#3A0715] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#D4AF37] mb-4">
                        <span className="w-5 h-5 rounded-full bg-[#3A0715] border border-[#D4AF37] flex items-center justify-center text-[10px]">
                          7
                        </span>
                        <span>Booking Summary</span>
                      </div>

                      {/* Summary Breakdown Details */}
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between pb-2 border-b border-neutral-800">
                          <span className="text-neutral-400">Movie Title</span>
                          <span className="font-bold text-white text-right">{selectedMovie.title}</span>
                        </div>

                        <div className="flex justify-between pb-2 border-b border-neutral-800">
                          <span className="text-neutral-400">Date & Showtime</span>
                          <span className="text-white text-right">
                            {selectedDate.split(',')[0]} · {selectedTime.time}
                          </span>
                        </div>

                        <div className="flex justify-between pb-2 border-b border-neutral-800">
                          <span className="text-neutral-400">Auditorium Screen</span>
                          <span className="text-white text-right">{selectedScreen.name}</span>
                        </div>

                        <div className="flex justify-between pb-2 border-b border-neutral-800">
                          <span className="text-neutral-400">Selected Seats</span>
                          <span className="font-mono-nums font-semibold text-[#D4AF37] text-right">
                            {selectedSeatIds.length > 0 ? selectedSeatIds.join(', ') : 'None selected'}
                          </span>
                        </div>

                        {/* Tier pricing lines */}
                        {pricingBreakdown.tierBreakdown.map((t) => (
                          <div key={t.tier} className="flex justify-between text-xs text-neutral-400">
                            <span>{t.tier} ({t.count} × ₹{t.unitPrice})</span>
                            <span className="font-mono-nums">₹{t.count * t.unitPrice}</span>
                          </div>
                        ))}

                        <div className="flex justify-between text-xs text-neutral-400">
                          <span>Convenience Fee (₹25/ticket)</span>
                          <span className="font-mono-nums">₹{pricingBreakdown.convenienceFee}</span>
                        </div>

                        <div className="flex justify-between text-xs text-neutral-400">
                          <span>Integrated GST (18%)</span>
                          <span className="font-mono-nums">₹{pricingBreakdown.gst}</span>
                        </div>
                      </div>
                    </div>

                    {/* Total & Action (Step 8) */}
                    <div className="pt-6 border-t border-neutral-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-neutral-400 block">
                            Total Payable Amount
                          </span>
                          <span className="text-xs text-[#D4AF37]">
                            Includes all taxes & 3D glasses where applicable
                          </span>
                        </div>
                        <div className="font-mono-nums text-3xl font-black text-[#D4AF37]">
                          ₹{pricingBreakdown.totalAmount}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={selectedSeatIds.length === 0}
                        className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          selectedSeatIds.length === 0
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#D4AF37] via-[#E6C764] to-[#AA820A] text-black shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.6)] hover:scale-[1.01] active:scale-[0.99]'
                        }`}
                      >
                        <Ticket className="w-5 h-5" />
                        <span>CONFIRM BOOKING (STEP 8)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleBookViaWhatsApp}
                        disabled={selectedSeatIds.length === 0}
                        className={`w-full py-3.5 rounded-xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                          selectedSeatIds.length === 0
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] hover:scale-[1.01] active:scale-[0.99]'
                        }`}
                      >
                        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.1 7.42C8.94 7.42 8.79 7.43 8.64 7.61C8.47 7.79 7.97 8.27 7.97 9.24C7.97 10.21 8.68 11.14 8.78 11.27C8.88 11.4 10.15 13.38 12.13 14.23C13.75 14.93 14.1 14.81 14.47 14.77C14.96 14.72 15.93 14.19 16.14 13.6C16.34 13.01 16.34 12.51 16.28 12.4C16.22 12.3 16.07 12.24 15.84 12.13C15.61 12.02 14.5 11.47 14.29 11.4C14.08 11.32 13.93 11.28 13.78 11.51C13.63 11.74 13.19 12.28 13.06 12.43C12.93 12.58 12.8 12.6 12.57 12.49C12.34 12.37 11.6 12.13 10.73 11.35C10.05 10.74 9.59 9.99 9.46 9.76C9.33 9.53 9.45 9.41 9.56 9.3C9.67 9.19 9.8 9.02 9.92 8.89C10.04 8.76 10.08 8.66 10.16 8.5C10.24 8.34 10.2 8.2 10.14 8.09C10.08 7.98 9.65 6.91 9.47 6.47C9.3 6.04 9.12 6.1 8.98 6.09L8.64 6.08C8.5 6.08 8.35 6.13 9.1 7.42Z" />
                        </svg>
                        <span>BOOK VIA WHATSAPP</span>
                      </button>

                      <p className="text-[11px] text-center text-neutral-500">
                        Zero cancellation fee up to 2 hours prior to showtime · Instant digital pass
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
