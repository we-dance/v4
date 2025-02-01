import { z } from 'zod';
import { PartyEventSchema, WorkshopEventSchema, ConcertEventSchema, FestivalEventSchema, type AnyEvent } from '~/schemas/event';

// Define mock events data without export
const eventsData = [
  {
    id: 100,
    name: "Havana D'Primera Live in Munich",
    type: "concert",
    date: {
      start: "2024-05-15T20:00:00",
      end: "2024-05-16T02:00:00",
    },
    location: {
      name: "Backstage",
      city: "Munich",
      country: "Germany",
      coordinates: {
        lat: 48.1351,
        lng: 11.582,
      },
    },
    artists: [12, 1], // Havana D'Primera ID
    organizer: {
      id: "munich_salsa_social",
      name: "Munich Salsa Social",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=munich",
      points: 3200,
    },
    description:
      "Experience the legendary Havana D'Primera live in Munich! A night of pure Cuban music and dance.",
    image:
      "https://res.cloudinary.com/djumxevsm/image/upload/v1732373003/a1zosu7n7luzj25tsr1l.jpg",
    prices: [
      {
        id: "100-party-pass-1",
        name: "Party Pass",
        description:
          "General admission ticket for the concert and social dancing",
        amount: 35,
        currency: "EUR",
      },
    ],
    schedule: [
      {
        time: "20:00",
        activity: "Doors Open",
      },
      {
        time: "21:00",
        activity: "DJ Warm-up",
      },
      {
        time: "22:00",
        activity: "Havana D'Primera Live",
      },
      {
        time: "00:00",
        activity: "Social Dancing",
      },
    ],
    tags: ["timba", "live-music", "social-dancing"],
    status: "upcoming",
    stats: {
      interested: 45,
      saves: 12,
      views: 120,
      shares: 8,
    },
  },
  {
    id: 200,
    name: "Cuban Weekend with Maykel Fonts",
    type: "festival",
    date: {
      start: "2024-06-01T10:00:00",
      end: "2024-06-02T18:00:00",
    },
    location: {
      name: "TanzZentrum",
      city: "Munich",
      country: "Germany",
    },
    artists: ["1"], // Maykel Fonts ID
    organizer: {
      name: "Munich Casino",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=casino",
      points: 2800,
    },
    description:
      "Two days of intensive Cuban salsa workshops with Maykel Fonts. All levels welcome!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=workshop1",
    prices: [
      {
        id: "200-full-pass-1",
        name: "Full Pass",
        amount: 120,
        currency: "EUR",
        description: "All workshops and parties",
      },
      {
        id: "200-saturday-pass-1",
        name: "Saturday Pass",
        amount: 70,
        currency: "EUR",
        description: "All Saturday activities",
      },
      {
        id: "200-sunday-pass-1",
        name: "Sunday Pass",
        amount: 70,
        currency: "EUR",
        description: "All Sunday activities",
      },
      {
        id: "200-single-workshop-1",
        name: "Single Workshop",
        amount: 25,
        currency: "EUR",
        description: "Per workshop",
      },
    ],
    schedule: [
      {
        time: "10:00-11:30",
        activity: "Basic Footwork & Body Movement",
        description: "Level: Beginner",
      },
      {
        time: "11:45-13:15",
        activity: "Partner Work Fundamentals",
        description: "Level: Beginner/Intermediate",
      },
      {
        time: "14:30-16:00",
        activity: "Advanced Combinations",
        description: "Level: Intermediate/Advanced",
      },
      {
        time: "16:15-17:45",
        activity: "Rueda de Casino",
        description: "All Levels",
      },
    ],
    tags: ["workshop", "casino", "rueda"],
    status: "upcoming",
  },
  {
    id: 300,
    name: "Los Van Van European Tour",
    type: "concert",
    date: {
      start: "2024-07-20T21:00:00",
      end: "2024-07-21T03:00:00",
    },
    location: {
      name: "Muffathalle",
      city: "Munich",
      country: "Germany",
    },
    artists: ["13"], // Los Van Van ID
    organizer: {
      name: "Timba Productions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=timba",
      points: 4100,
    },
    description:
      "The legendary Los Van Van returns to Munich as part of their European tour!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=concert2",
    prices: [
      {
        id: "300-concert-pass-1",
        name: "Concert Pass",
        description: "General admission ticket for the concert",
        amount: 45,
        currency: "EUR",
      },
    ],
    tags: ["timba", "live-music", "songo"],
    status: "upcoming",
  },
  {
    id: 400,
    name: "Cuban Salsa Night with Live Band",
    type: "party",
    date: {
      start: "2024-02-16T20:00:00",
      end: "2024-02-17T02:00:00",
    },
    location: {
      name: "Havana Club",
      city: "London",
      country: "UK",
      address: "123 Soho St",
    },
    description:
      "Join us for a night of pure Cuban salsa! Live music by Son Cubano, pre-party workshop with Maria & Carlos, and social dancing until late.",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=400&fit=crop",
    prices: [
      {
        id: "400-party-pass-1",
        name: "Party Pass",
        description:
          "General admission ticket for the concert and social dancing",
        amount: 15,
        currency: "GBP",
      },
    ],
    tags: ["live-music", "cuban-salsa", "social-dancing"],
    status: "upcoming",
    artists: ["son_cubano_1"],
    organizer: {
      id: "havana_club_1",
      name: "Havana Club",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      points: 3500,
    },
    schedule: [
      { time: "20:00", activity: "Doors Open" },
      { time: "20:30", activity: "Pre-party Workshop" },
      { time: "21:30", activity: "Live Band" },
      { time: "02:00", activity: "Event End" },
    ],
  },
  {
    id: 500,
    name: "Cuban Open Air",
    type: "party",
    artists: [],
    date: {
      start: "2023-10-18T19:00:00",
      end: "2023-10-18T23:00:00",
    },
    location: {
      name: "Pinakothek der Moderne",
      city: "Munich",
      country: "Germany",
    },
    description: "Weekly outdoor social dancing with Timba music",
    image:
      "https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80",
    prices: [
      {
        id: "500-free-pass-1",
        name: "Free Pass",
        description: "Free entry to the event",
        amount: 0,
        currency: "EUR",
      },
    ],
    tags: ["cuban-salsa", "timba", "open-air"],
    status: "upcoming",
    organizer: {
      id: "salsa_cubana_munich",
      name: "Salsa Cubana Munich",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=munich_cuban",
      points: 2800,
    },
  },
  {
    id: 501,
    name: "Timba Night",
    type: "party",
    artists: ["local_band"],
    date: {
      start: "2023-10-21T21:00:00",
      end: "2023-10-22T03:00:00",
    },
    location: {
      name: "Kult Dance Studio",
      city: "Munich",
      country: "Germany",
    },
    description: "Special night dedicated to Timba music with live band",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    prices: [
      {
        id: "501-party-pass-1",
        name: "Party Pass",
        description:
          "General admission ticket for the concert and social dancing",
        amount: 15,
        currency: "EUR",
      },
    ],
    tags: ["cuban-salsa", "timba", "live-music"],
    status: "upcoming",
    organizer: {
      id: "salsa_cubana_munich",
      name: "Salsa Cubana Munich",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=munich_cuban",
      points: 2800,
    },
  },
  {
    id: 502,
    name: "Rueda de Casino Workshop",
    type: "workshop",
    artists: ["instructor_1"],
    date: {
      start: "2023-10-22T14:00:00",
      end: "2023-10-22T17:00:00",
    },
    location: {
      name: "Tanzstudio München",
      city: "Munich",
      country: "Germany",
    },
    description:
      "Learn the basics of Rueda de Casino with experienced instructors",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    prices: [
      {
        id: "502-workshop-pass-1",
        amount: 30,
        currency: "EUR",
        name: "Workshop Pass",
        description: "General admission ticket for the workshop",
      },
    ],
    tags: ["cuban-salsa", "rueda", "workshop"],
    status: "upcoming",
    organizer: {
      id: "salsa_cubana_munich",
      name: "Salsa Cubana Munich",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=munich_cuban",
      points: 2800,
    },
  },
];

// Export validated events based on their type
export const mockEvents = eventsData.map(event => {
  switch (event.type) {
    case 'party':
      return PartyEventSchema.parse(event);
    case 'workshop':
      return WorkshopEventSchema.parse(event);
    case 'concert':
      return ConcertEventSchema.parse(event);
    case 'festival':
      return FestivalEventSchema.parse(event);
    default:
      throw new Error(`Unknown event type: ${event.type}`);
  }
}) as AnyEvent[];

// Export type for TypeScript support
export type MockEvents = typeof mockEvents;
