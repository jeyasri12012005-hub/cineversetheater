import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { GalleryPage } from './pages/GalleryPage';
import { Movie } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking' | 'gallery'>('home');
  const [selectedMovieForBooking, setSelectedMovieForBooking] = useState<Movie | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  const handleNavigate = (page: 'home' | 'booking' | 'gallery') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookMovie = (movie: Movie) => {
    setSelectedMovieForBooking(movie);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBook = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGalleryItem = (index: number) => {
    setSelectedGalleryIndex(index);
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onQuickBook={handleQuickBook}
      />

      {/* Main Content Pages */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onBookMovie={handleBookMovie}
            onSelectGalleryItem={handleSelectGalleryItem}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            selectedMovieFromHome={selectedMovieForBooking}
            onClearMovieSelection={() => setSelectedMovieForBooking(null)}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            initialSelectedItemIndex={selectedGalleryIndex}
            onClearInitialIndex={() => setSelectedGalleryIndex(null)}
            onBookTickets={handleQuickBook}
          />
        )}
      </main>

      {/* Luxury Contact Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
