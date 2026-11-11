export type MovieStatus = 'NOW SHOWING' | 'COMING SOON' | 'BOOKING OPEN';

export type MovieFilter = 'All Movies' | 'Tamil' | 'English' | 'Horror';

export interface Movie {
  id: string;
  title: string;
  language: 'Tamil' | 'English';
  genre: string;
  duration: string;
  status: MovieStatus;
  poster: string | null;
  certificate: string;
  director: string;
  cast: string[];
  synopsis: string;
  rating?: number;
}

export interface ShowTime {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  time: string;
}

export interface TheatreScreen {
  id: string;
  name: string;
  tech: string;
  format: string;
  sound: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  tier: 'Executive' | 'Premium' | 'VIP Recliner';
  price: number;
  status: 'available' | 'selected' | 'booked';
}

export interface BookingDetails {
  bookingId: string;
  movie: Movie;
  date: string;
  showTime: ShowTime;
  screen: TheatreScreen;
  seats: string[];
  seatTierBreakdown: { tier: string; count: number; unitPrice: number }[];
  customerName: string;
  mobileNumber: string;
  ticketCount: number;
  subtotal: number;
  convenienceFee: number;
  gst: number;
  totalAmount: number;
  bookingTimestamp: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: string;
}
