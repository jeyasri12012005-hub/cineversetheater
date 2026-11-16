import { Movie, TheatreScreen } from '../types';

export const MOVIES: Movie[] = [
  {
  id: 'jailer-2',
  title: 'Jailer 2',
  language: 'Tamil',
  genre: 'Action / Crime Thriller',
  duration: '2h 40m',
  status: 'NOW SHOWING',
  poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/now%20showing%20movie%20img/Jailer2.jpeg',
  certificate: 'U/A',
  director: 'Nelson Dilipkumar',
  cast: ['Rajinikanth', 'Ramya Krishnan', 'Vinayakan', 'Yogi Babu'],
  synopsis: 'Tiger Muthuvel Pandian returns for another high-stakes action mission to dismantle a dangerous international criminal syndicate.',
  rating: 4.9
  },
  {
  id: 'mookuthi-amman-2',
    title: 'Mookuthi Amman 2',
    language: 'Tamil',
    genre: 'Devotional Fantasy / Comedy',
    duration: '2h 20m',
    status: 'NOW SHOWING',
    poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/now%20showing%20movie%20img/Mookuthi%20amman2.jpeg',
    certificate: 'U',
    director: 'Sundar C',
    cast: ['Nayanthara', 'Regina Cassandra', 'Duniya Vijay', 'Urvashi'],
    synopsis: 'The benevolent goddess descending into mortals’ lives returns to battle dark, mythical otherworldly forces threatening balance across heaven and earth.',
    rating: 4.6
  },
  {
  id: 'scene',
  title: 'Scene',
  language: 'Tamil',
  genre: 'Action Comedy / Crime Thriller',
  duration: '2h 29m',
  status: 'NOW SHOWING',
  poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/now%20showing%20movie%20img/Scene%20mov.jpeg',
  certificate: 'U/A 16+',
  director: 'Jithu Madhavan',
  cast: ['Suriya','Nazriya Nazim','Naslen','Anandaraj','Lal','John Vijay','Raj Priyan'],
  synopsis: 'Inbaraj, a police officer, is forced to reopen an unfinished case and solve it with a chaotic team. Their investigation leads to unexpected twists, suspense and action.',
  rating: 4.8
  },
  {
    id: 'ramayanam',
    title: 'Ramayanam',
    language: 'Tamil',
    genre: 'Epic Mythological Drama',
    duration: '3h 05m',
    status: 'BOOKING OPEN',
    poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/now%20showing%20movie%20img/Ramayana%20mov.jpeg',
    certificate: 'U',
    director: 'Nitesh Tiwari',
    cast: ['Ranbir Kapoor', 'Sai Pallavi', 'Yash', 'Sunny Deol'],
    synopsis: 'The timeless Sanskrit epic comes to life with transcendent visual grandiosity, world-class practical production, and monumental orchestral scores by Hans Zimmer and A.R. Rahman.',
    rating: 4.9
  },
  {
  id: 'avengers-doomsday',
  title: 'Avengers: Doomsday',
  language: 'English',
  genre: 'Sci-Fi / Superhero Action',
  duration: '2h 55m',
  status: 'COMING SOON',
  poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/coming%20soon%20movie%20img/Avengers%20doomsday.jpeg',
  certificate: 'U/A',
  director: 'The Russo Brothers',
  cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Benedict Cumberbatch', 'Tom Holland'],
  synopsis: 'Earths mightiest heroes face their most devastating existential threat yet as a new multiversal menace rises to challenge reality.',
  rating: 5.0
},
{
  id: 'om',
  title: 'OM',
  language: 'Tamil',
  genre: 'Action / Thriller',
  duration: '2h 20m',
  status: 'COMING SOON',
  poster: 'https://msagdwggbnuysrbwngoc.supabase.co/storage/v1/object/public/Cineverse-theater-images/coming%20soon%20movie%20img/OM%20movie.jpeg',
  certificate: 'U/A',
  director: 'Director Name',
  cast: ['Lead Actor', 'Lead Actress'],
  synopsis: 'An intense action thriller where an ordinary man uncovers a deep-rooted conspiracy and fights back for justice.',
  rating: 4.5
},
];

export const THEATRE_SCREENS: TheatreScreen[] = [
  {
    id: 'screen-1',
    name: 'Screen 1 · IMAX with Laser',
    tech: 'IMAX 4K Dual Laser',
    format: 'Grand 1.43:1 Silver Screen',
    sound: 'IMAX 12-Channel Immersive Audio'
  },
  {
    id: 'screen-2',
    name: 'Screen 2 · Dolby Atmos 4K',
    tech: 'Christie Pure RGB Laser',
    format: 'Curved Scope 2.39:1 Screen',
    sound: 'Dolby Atmos 64-Channel Spatial Audio'
  },
  {
    id: 'screen-3',
    name: 'Screen 3 · VIP Gold Class',
    tech: 'Barco 4K Laser Cinema',
    format: 'Intimate Luxury Scope',
    sound: 'Dolby 7.1 Studio Reference'
  }
];

export const SHOW_TIMES = [
  { id: 't1', period: 'Morning' as const, time: '10:30 AM' },
  { id: 't2', period: 'Afternoon' as const, time: '02:15 PM' },
  { id: 't3', period: 'Evening' as const, time: '06:45 PM' },
  { id: 't4', period: 'Night' as const, time: '10:15 PM' }
];

export const SEAT_PRICES = {
  Executive: 150,
  Premium: 220,
  'VIP Recliner': 350
};
