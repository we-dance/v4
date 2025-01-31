import { type Artist, validateArtists } from '~/schemas/artist';

const mockArtistsData = [
  {
    id: 1,
    name: "Maykel Fonts",
    roles: ["instructor", "performer"],
    specialties: ["casino", "rueda", "son", "afro-cuban"],
    level: "master",
    location: "Cuba",
    image:
      "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fmaykel_fonts.png?generation=1655231303310013&alt=media",
    followers: "50k+",
    rating: 4.9,
    reviewCount: 128,
    languages: ["Spanish", "English", "Italian"],
    experience: {
      years: 25,
      teachingLevels: ["beginner", "intermediate", "advanced"],
      achievements: [
        "World Salsa Champion 2018",
        "Best Casino Instructor 2019",
      ],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Madrid, Spain",
      pricing: {
        privateClass: {
          amount: 80,
          currency: "EUR",
          duration: 60, // minutes
        },
        workshop: {
          amount: 35,
          currency: "EUR",
          duration: 120,
          note: "per person",
        },
      },
    },
    certifications: [
      "International Casino Instructor",
      "Cuban Dance Federation Master",
    ],
    socialMedia: {
      instagram: "@maykelfontssalsa",
      youtube: "@maykelfontscuba",
    },
  },
  {
    id: 2,
    name: "Yanet Fuentes",
    roles: ["choreographer", "performer"],
    specialties: ["ladies styling", "body movement", "performance"],
    level: "master",
    location: "Cuba",
    image:
      "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fyftmoves.png?generation=1720624675308869&alt=media",
    followers: "45k+",
    rating: 4.8,
    reviewCount: 95,
    languages: ["Spanish", "English"],
    experience: {
      years: 20,
      teachingLevels: ["intermediate", "advanced"],
      achievements: ["Choreographer of the Year 2020"],
    },
    availability: {
      privateClasses: false,
      workshops: true,
      touring: true,
      currentLocation: "Barcelona, Spain",
    },
  },
  {
    id: 3,
    name: "Yoannis Tamayo",
    roles: ["instructor", "performer"],
    specialties: ["casino", "rueda", "partner work"],
    level: "advanced",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=yoannis",
    followers: "35k+",
    rating: 4.7,
    reviewCount: 82,
    languages: ["Spanish", "English", "French"],
    experience: {
      years: 15,
      teachingLevels: ["beginner", "intermediate"],
      achievements: ["Best Rising Star 2021"],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: false,
      currentLocation: "Havana, Cuba",
    },
  },
  {
    id: 4,
    name: "Yeny Vargas",
    roles: ["choreographer", "performer", "instructor"],
    specialties: ["performance routines", "showdance", "ladies styling"],
    level: "advanced",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=yeny",
    followers: "30k+",
    rating: 4.6,
    reviewCount: 64,
    languages: ["Spanish", "English"],
    experience: {
      years: 12,
      teachingLevels: ["intermediate", "advanced"],
      achievements: ["Best Show Performance 2022"],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "London, UK",
    },
  },
  {
    id: 5,
    name: "Fernando Sosa",
    roles: ["instructor", "dj"],
    specialties: ["casino", "musicality", "cuban salsa"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fernando",
    followers: "40k+",
    rating: 4.8,
    reviewCount: 110,
    languages: ["Spanish", "English", "German"],
    experience: {
      years: 18,
      teachingLevels: ["beginner", "intermediate", "advanced"],
      achievements: ["Best Timba DJ 2021", "Casino Master Certification"],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Berlin, Germany",
    },
  },
  {
    id: 6,
    name: "Diana Rodriguez",
    roles: ["choreographer", "performer"],
    specialties: ["afro-cuban", "rumba", "contemporary fusion"],
    level: "advanced",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=diana",
    followers: "38k+",
    rating: 4.7,
    reviewCount: 88,
    languages: ["Spanish", "English", "Portuguese"],
    experience: {
      years: 14,
      teachingLevels: ["intermediate", "advanced"],
      achievements: ["Best Choreography 2023"],
    },
    availability: {
      privateClasses: false,
      workshops: true,
      touring: true,
      currentLocation: "Miami, USA",
    },
  },
  {
    id: 7,
    name: "Carlos Mendoza",
    roles: ["musician", "performer"],
    specialties: ["timba", "son", "percussion"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    followers: "42k+",
    rating: 4.9,
    reviewCount: 115,
    languages: ["Spanish", "English"],
    experience: {
      years: 22,
      teachingLevels: ["all levels"],
      achievements: ["Grammy Nominee 2020", "Best Timba Band Leader 2019"],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Paris, France",
    },
    instruments: ["piano", "timbales", "congas"],
  },
  {
    id: 8,
    name: "DJ Melao",
    roles: ["dj", "instructor"],
    specialties: ["timba", "salsa dura", "classic son"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=melao",
    followers: "55k+",
    rating: 4.8,
    reviewCount: 150,
    languages: ["Spanish", "English", "French"],
    experience: {
      years: 20,
      teachingLevels: ["beginner", "intermediate"],
      achievements: [
        "Best Latin DJ Europe 2022",
        "Musicality Workshop Specialist",
      ],
    },
    availability: {
      privateClasses: false,
      workshops: true,
      touring: true,
      currentLocation: "Amsterdam, Netherlands",
    },
    equipment: ["Pioneer CDJ-3000", "DJM-900NXS2"],
  },
  {
    id: 9,
    name: "Laura Santos",
    roles: ["videographer", "photographer"],
    specialties: [
      "dance documentation",
      "event coverage",
      "promotional content",
    ],
    level: "advanced",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura",
    followers: "28k+",
    rating: 4.7,
    reviewCount: 75,
    languages: ["Spanish", "English"],
    experience: {
      years: 10,
      achievements: [
        "Best Dance Documentary 2023",
        "Official Congress Videographer",
      ],
    },
    availability: {
      privateClasses: false,
      workshops: false,
      touring: true,
      currentLocation: "Mexico City, Mexico",
    },
    equipment: ["Sony FX6", "Canon R5", "DJI RS 3 Pro"],
    portfolio: "@laurasantosmedia",
  },
  {
    id: 10,
    name: "Manolito Rodriguez",
    roles: ["musician", "dj"],
    specialties: ["live mixing", "percussion", "electronic fusion"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=manolito",
    followers: "33k+",
    rating: 4.6,
    reviewCount: 92,
    languages: ["Spanish", "English"],
    experience: {
      years: 15,
      teachingLevels: ["intermediate", "advanced"],
      achievements: [
        "Best Live DJ Performance 2022",
        "Innovation in Cuban Music Award",
      ],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Tokyo, Japan",
    },
    instruments: ["congas", "bongos", "electronic percussion"],
    equipment: ["Ableton Live", "Roland SPD-SX"],
  },
  {
    id: 11,
    name: "Jorge Amado Perez Machado",
    roles: ["instructor", "performer", "choreographer", "musician"],
    specialties: [
      "cuban folklore",
      "afro-cuban",
      "contemporary fusion",
      "choreography",
    ],
    level: "master",
    location: "Cuba",
    image:
      "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Famado.art.official.png?generation=1655385406881655&alt=media",
    followers: "40k+",
    rating: 4.9,
    reviewCount: 86,
    languages: ["Spanish", "English", "German", "Czech"],
    experience: {
      years: 20,
      teachingLevels: ["beginner", "intermediate", "advanced"],
      achievements: [
        "Ramiro Guerra Award 2012",
        "First Dancer at Ban Rarrá Company 2006",
        "Performance with Rihanna in Cuba",
      ],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Munich, Germany",
    },
    certifications: [
      "ISA University of Arts Graduate",
      "Professional Folklore Dancer",
      "Choreographer",
    ],
    socialMedia: {
      instagram: "@amadoart",
    },
    albums: ["One More Time", "Latiendo", "Identity"],
    collaborations: [
      "Los Van Van",
      "Pupy Y Los Que Son Son",
      "Elito Revé Y Su Charangón",
      "Yoruba Andabo",
    ],
    otherAchievements: [
      "Actor in 'Una Danza Para Mi Habana'",
      "Founder & Director of Dance Gods Company",
    ],
  },
  {
    id: 12,
    name: "Havana D'Primera",
    roles: ["musician"],
    specialties: ["timba", "trumpet", "vocals"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexander",
    followers: "100k+",
    rating: 5.0,
    reviewCount: 156,
    languages: ["Spanish"],
    experience: {
      years: 30,
      achievements: ["Grammy Award Winner", "Founded by Alexander Abreu"],
    },
    availability: {
      privateClasses: false,
      workshops: false,
      touring: true,
      currentLocation: "Havana, Cuba",
    },
    instruments: ["trumpet", "vocals"],
    collaborations: ["Havana D'Primera", "Paulo FG", "Issac Delgado"],
  },
  {
    id: 13,
    name: "Los Van Van",
    roles: ["musician"],
    specialties: ["timba", "songo", "cuban music"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vanvan",
    followers: "500k+",
    rating: 5.0,
    reviewCount: 312,
    languages: ["Spanish"],
    experience: {
      years: 50,
      achievements: [
        "Grammy Award Winners",
        "Pioneers of Songo",
        "Cuba's Most Famous Orchestra",
      ],
    },
    availability: {
      privateClasses: false,
      workshops: false,
      touring: true,
      currentLocation: "Havana, Cuba",
    },
  },
  {
    id: 14,
    name: "El Niño y La Verdad",
    roles: ["musician"],
    specialties: ["timba", "salsa", "cuban music"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=nino",
    followers: "45k+",
    rating: 4.8,
    reviewCount: 92,
    languages: ["Spanish"],
    experience: {
      years: 20,
      achievements: ["Best Timba Band 2020", "Founded by Emilio Frías"],
    },
    availability: {
      privateClasses: false,
      workshops: false,
      touring: true,
      currentLocation: "Havana, Cuba",
    },
    collaborations: [
      "Havana D'Primera",
      "Los Van Van",
      "Pupy y Los Que Son Son",
    ],
  },
  {
    id: 15,
    name: "Maykel Blanco y su Salsa Mayor",
    roles: ["musician", "instructor"],
    specialties: ["timba", "piano", "composition"],
    level: "master",
    location: "Cuba",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=blanco",
    followers: "80k+",
    rating: 4.9,
    reviewCount: 145,
    languages: ["Spanish", "English"],
    experience: {
      years: 25,
      achievements: [
        "Director of Maykel Blanco y su Salsa Mayor",
        "Best Timba Band 2021",
      ],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Havana, Cuba",
      pricing: {
        workshop: {
          amount: 40,
          currency: "EUR",
          duration: 120,
          note: "per person",
        },
      },
    },
    instruments: ["piano", "percussion"],
  },
  {
    id: 16,
    name: "Nik Ntaya",
    roles: ["instructor", "performer"],
    specialties: ["cuban salsa", "body movement", "afro-cuban"],
    level: "master",
    location: "France",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=nik",
    followers: "30k+",
    rating: 4.8,
    reviewCount: 76,
    languages: ["French", "English", "Spanish"],
    experience: {
      years: 15,
      teachingLevels: ["beginner", "intermediate", "advanced"],
      achievements: [
        "European Cuban Dance Champion",
        "Best Afro-Cuban Workshop Instructor",
      ],
    },
    availability: {
      privateClasses: true,
      workshops: true,
      touring: true,
      currentLocation: "Paris, France",
      pricing: {
        privateClass: {
          amount: 70,
          currency: "EUR",
          duration: 60,
        },
        workshop: {
          amount: 35,
          currency: "EUR",
          duration: 90,
          note: "per person",
        },
      },
    },
  },
];

export const mockArtists: Artist[] = validateArtists(mockArtistsData);

export type { Artist } from '~/schemas/artist';
