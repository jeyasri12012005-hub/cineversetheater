import { Movie, TheatreScreen } from '../types';

export const MOVIES: Movie[] = [
  {
    id: 'jana-nayagan',
    title: 'Jana Nayagan',
    language: 'Tamil',
    genre: 'Political Action Thriller',
    duration: '2h 45m',
    status: 'NOW SHOWING',
    poster: '/posters/jana_nayagan.jpg',
    certificate: 'A',
    director: 'H. Vinoth',
    cast: ['Thalapathy Vijay', 'Pooja Hegde', 'Bobby Deol', 'Mamitha Baiju'],
    synopsis: 'A former decorated police officer confronts institutional tyranny and political syndicates to protect democracy and guide a fallen comrade’s daughter toward valor.',
    rating: 4.8
  },
  {
    id: 'dude',
    title: 'Dude',
    language: 'Tamil',
    genre: 'Romantic Comedy / Action',
    duration: '2h 32m',
    status: 'NOW SHOWING',
    poster: '/posters/dude.jpg',
    certificate: 'U/A',
    director: 'Keerthiswaran',
    cast: ['Pradeep Ranganathan', 'Mamitha Baiju', 'R. Sarathkumar', 'Rohini'],
    synopsis: 'Childhood cousins Agan and Kural navigate playful banter, modern youth lifestyle, and chaotic emotional complications when hidden feelings come to light.',
    rating: 4.5
  },
  {
    id: 'immortal',
    title: 'Immortal',
    language: 'Tamil',
    genre: 'Horror / Supernatural Thriller',
    duration: '2h 15m',
    status: 'NOW SHOWING',
    poster: '/posters/immortal.jpg',
    certificate: 'A',
    director: 'Mariyappan Chinna',
    cast: ['G. V. Prakash Kumar', 'Kayadu Lohar', 'T. M. Karthik'],
    synopsis: 'A carefree tenant leases an isolated historic bungalow where an enigmatic beauty draws him into an ancient, terrifying paranormal realm of the afterlife.',
    rating: 4.2
  },
  {
    id: 'viswanath-and-sons',
    title: 'Viswanath & Sons',
    language: 'Tamil',
    genre: 'Family Drama / Romance',
    duration: '2h 38m',
    status: 'NOW SHOWING',
    poster: '/posters/vishwanath_and_sons.jpg',
    certificate: 'U/A',
    director: 'Venky Atluri',
    cast: ['Suriya', 'Mamitha Baiju', 'Radikaa Sarathkumar', 'Raveena Tandon'],
    synopsis: 'Industrial tycoon and Olympic-medallist marksman Sanjay Vishwanath faces an emotional awakening when a surrogate mother re-enters his life with life-altering choices.',
    rating: 4.7
  },
  {
    id: 'ramayanam',
    title: 'Ramayanam',
    language: 'Tamil',
    genre: 'Epic Mythological Drama',
    duration: '3h 05m',
    status: 'BOOKING OPEN',
    poster: '/posters/ramayanam.jpg',
    certificate: 'U',
    director: 'Nitesh Tiwari',
    cast: ['Ranbir Kapoor', 'Sai Pallavi', 'Yash', 'Sunny Deol'],
    synopsis: 'The timeless Sanskrit epic comes to life with transcendent visual grandiosity, world-class practical production, and monumental orchestral scores by Hans Zimmer and A.R. Rahman.',
    rating: 4.9
  },
  {
    id: 'mookuthi-amman-2',
    title: 'Mookuthi Amman 2',
    language: 'Tamil',
    genre: 'Devotional Fantasy / Comedy',
    duration: '2h 20m',
    status: 'COMING SOON',
    poster: null, // Official placeholder per user instruction: "POSTER COMING SOON"
    certificate: 'U',
    director: 'Sundar C',
    cast: ['Nayanthara', 'Regina Cassandra', 'Duniya Vijay', 'Urvashi'],
    synopsis: 'The benevolent goddess descending into mortals’ lives returns to battle dark, mythical otherworldly forces threatening balance across heaven and earth.',
    rating: 4.6
  },
  {
    id: 'spider-man',
    title: 'Spider-Man',
    language: 'English',
    genre: 'Superhero Action / Sci-Fi',
    duration: '2h 28m',
    status: 'NOW SHOWING',
    poster: '/posters/spiderman.jpg',
    certificate: 'U/A',
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Willem Dafoe'],
    synopsis: 'With his secret unmasked, Peter Parker seeks mystical intervention, inadvertently shattering the multiverse barriers and summoning iconic adversaries.',
    rating: 4.9
  },
  {
    id: 'demonte-colony-2',
    title: 'Demonte Colony 2',
    language: 'Tamil',
    genre: 'Horror / Supernatural Mystery',
    duration: '2h 24m',
    status: 'NOW SHOWING',
    poster: '/posters/demonte_colony_2.jpg',
    certificate: 'U/A',
    director: 'R. Ajay Gnanamuthu',
    cast: ['Arulnithi', 'Priya Bhavani Shankar', 'Arun Pandian', 'Antti Jääskeläinen'],
    synopsis: 'A harrowing investigation into the chilling folklore surrounding John Demonte’s cursed residence unleashes malevolent entities and relentless supernatural torment.',
    rating: 4.4
  }
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
