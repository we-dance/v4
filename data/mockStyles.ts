export interface DanceStyle {
  name: string;
  image: string;
  to: string;
  category: string;
  family?: string;
  aliases?: string[];
  description?: string;
  characteristics?: string[];
  musicStyles?: {
    name: string;
    description: string;
    examples: string[];
  }[];
  stats?: {
    members?: number; // For specific styles: number of dancers
    teachers?: number; // Number of teachers
    communities?: number; // For families: number of communities
  };
}

export const getDanceStyles = (): DanceStyle[] => [
  // Salsa Family
  {
    name: "Salsa",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
    to: "/dance/salsa",
    category: "Latin",
    description: "Popular social dance with Latin American roots",
    stats: {
      communities: 24, // Total salsa communities
      teachers: 38, // Active teachers across all styles
    },
  },
  {
    name: "Cuban Style Salsa",
    image: "https://images.unsplash.com/photo-1516834474-48c0abc2a902",
    to: "/dance/salsa/cuban",
    category: "Latin",
    family: "salsa",
    aliases: ["Casino", "Salsa Cubana", "Cuban Salsa"],
    description:
      "Circular style with Afro-Cuban roots, danced to Son and Timba music",
    characteristics: [
      "Circular dance style",
      "Strong Afro-Cuban influence",
      "Complex turn patterns (ruedas)",
      "Emphasis on musicality and improvisation",
      "Social dance focus",
    ],
    musicStyles: [
      {
        name: "Timba",
        description: "Modern Cuban dance music with complex rhythms",
        examples: ["Los Van Van", "Havana D'Primera", "Pupy y Los Que Son Son"],
      },
      {
        name: "Casino Music",
        description: "Traditional Cuban dance music",
        examples: ["Son Cubano", "Rumba", "Guaguancó"],
      },
    ],
    stats: {
      members: 754, // Active dancers in this style
      teachers: 12, // Active teachers
    },
  },
  {
    name: "LA Style Salsa",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e",
    to: "/dance/salsa/la",
    category: "Latin",
    family: "salsa",
    aliases: ["On1", "Linear Salsa"],
    description:
      "Linear style danced on beat 1, popular in Los Angeles and worldwide",
    characteristics: [
      "Linear dance style",
      "Danced on beat 1",
      "Theatrical performance influence",
      "Emphasis on turns and patterns",
      "Strong connection to entertainment industry",
    ],
    stats: {
      members: 680, // Active dancers in this style
      teachers: 15, // Active teachers
    },
  },
  {
    name: "NY Style Salsa",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    to: "/dance/salsa/ny",
    category: "Latin",
    family: "salsa",
    aliases: ["On2", "Mambo Style"],
    description:
      "Linear style danced on beat 2, with strong connection to mambo",
    characteristics: [
      "Linear dance style",
      "Danced on beat 2",
      "Strong connection to mambo",
      "Smooth, grounded movement",
      "Complex musicality",
    ],
    stats: {
      members: 580, // Active dancers in this style
      teachers: 10, // Active teachers
    },
  },
  // Latin
  {
    name: "Bachata",
    image: "https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg",
    to: "/dance/bachata",
    category: "Latin",
    description: "Sensual partner dance from Dominican Republic",
    stats: {
      communities: 18, // Total bachata communities
      teachers: 25, // Active teachers across all styles
    },
  },
  {
    name: "Dominican Bachata",
    image: "https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg",
    to: "/dance/bachata/dominican",
    category: "Latin",
    family: "bachata",
    aliases: ["Traditional Bachata", "Authentic Bachata"],
    description:
      "Traditional style from Dominican Republic with basic, simple movements",
    stats: {
      members: 420, // Active dancers
      teachers: 12, // Active teachers
    },
  },
  {
    name: "Modern Bachata",
    image: "https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg",
    to: "/dance/bachata/modern",
    category: "Latin",
    family: "bachata",
    aliases: ["Urban Bachata", "Fusion Bachata"],
    description:
      "Contemporary style incorporating elements from other dances, with complex footwork and patterns",
    stats: {
      members: 380, // Active dancers
      teachers: 10, // Active teachers
    },
  },
  {
    name: "Sensual Bachata",
    image: "https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg",
    to: "/dance/bachata/sensual",
    category: "Latin",
    family: "bachata",
    aliases: ["Flow Style"],
    description:
      "Style focused on body movement, isolations, and fluid partner connection",
    stats: {
      members: 400, // Active dancers
      teachers: 13, // Active teachers
    },
  },
  {
    name: "Kizomba",
    image: "https://img.youtube.com/vi/jcW7Z9y5twQ/hqdefault.jpg",
    to: "/dance/kizomba",
    category: "Latin",
    description: "Intimate partner dance from Angola",
    stats: {
      communities: 15, // Total kizomba communities
      teachers: 18, // Active teachers across all styles
    },
  },
  {
    name: "Traditional Kizomba",
    image: "https://img.youtube.com/vi/jcW7Z9y5twQ/hqdefault.jpg",
    to: "/dance/kizomba/traditional",
    category: "Latin",
    family: "kizomba",
    aliases: ["Pure Kizomba", "Angolan Style"],
    description: "Original Angolan style with subtle movements and connection",
    stats: {
      members: 320, // Active dancers
      teachers: 8, // Active teachers
    },
  },
  {
    name: "Urban Kiz",
    image: "https://img.youtube.com/vi/jcW7Z9y5twQ/hqdefault.jpg",
    to: "/dance/kizomba/urban",
    category: "Latin",
    family: "kizomba",
    aliases: ["New Style Kizomba", "French Style"],
    description: "Modern fusion style with more complex movements",
    stats: {
      members: 333, // Active dancers
      teachers: 10, // Active teachers
    },
  },
  {
    name: "Merengue",
    image: "https://img.youtube.com/vi/YUZxZB_Lr3k/hqdefault.jpg",
    to: "/dance/merengue",
    category: "Latin",
  },
  {
    name: "Cha Cha",
    image: "https://img.youtube.com/vi/vlC4DQ7jqH8/hqdefault.jpg",
    to: "/dance/chacha",
    category: "Latin",
  },
  // Ballroom
  {
    name: "Waltz",
    image: "https://img.youtube.com/vi/9JUcIXh1LKk/hqdefault.jpg",
    to: "/dance/waltz",
    category: "Ballroom",
  },
  {
    name: "Tango",
    image: "https://img.youtube.com/vi/xlPjhRdP4ss/hqdefault.jpg",
    to: "/dance/tango",
    category: "Ballroom",
  },
  {
    name: "Foxtrot",
    image: "https://img.youtube.com/vi/z8KV7XxrHXs/hqdefault.jpg",
    to: "/dance/foxtrot",
    category: "Ballroom",
  },
  // Urban
  {
    name: "Hip Hop",
    image: "https://img.youtube.com/vi/ZuXG3XA3o_A/hqdefault.jpg",
    to: "/dance/hiphop",
    category: "Urban",
  },
  {
    name: "Breakdance",
    image: "https://img.youtube.com/vi/zPdQ1gN7Ngo/hqdefault.jpg",
    to: "/dance/breakdance",
    category: "Urban",
  },
  {
    name: "House",
    image: "https://img.youtube.com/vi/z6jFGcBDrFc/hqdefault.jpg",
    to: "/dance/house",
    category: "Urban",
  },
  {
    name: "Popping",
    image: "https://img.youtube.com/vi/o8yQVpg_Hyk/hqdefault.jpg",
    to: "/dance/popping",
    category: "Urban",
  },
  // Classical
  {
    name: "Ballet",
    image: "https://img.youtube.com/vi/8NOw9KJzY9E/hqdefault.jpg",
    to: "/dance/ballet",
    category: "Classical",
  },
  {
    name: "Contemporary",
    image: "https://img.youtube.com/vi/yqQGfwvPc8c/hqdefault.jpg",
    to: "/dance/contemporary",
    category: "Classical",
  },
  {
    name: "Jazz",
    image: "https://img.youtube.com/vi/h_bX0T76-8Y/hqdefault.jpg",
    to: "/dance/jazz",
    category: "Classical",
  },
  // Swing
  {
    name: "Lindy Hop",
    image: "https://img.youtube.com/vi/6fDIPCuGpjE/hqdefault.jpg",
    to: "/dance/lindyhop",
    category: "Swing",
    description: "Energetic swing dance from Harlem",
    stats: {
      members: 432, // Active dancers
      teachers: 14, // Active teachers
    },
  },
  {
    name: "West Coast Swing",
    image: "https://img.youtube.com/vi/v4fRV0aG8Xw/hqdefault.jpg",
    to: "/dance/westcoastswing",
    category: "Swing",
    description: "Modern swing dance with a smooth style",
    stats: {
      members: 345, // Active dancers
      teachers: 12, // Active teachers
    },
  },
  {
    name: "Charleston",
    image: "https://img.youtube.com/vi/FQ7SNTSq-9o/hqdefault.jpg",
    to: "/dance/charleston",
    category: "Swing",
  },
  // Brazilian
  {
    name: "Samba",
    image: "https://img.youtube.com/vi/sDJh_9PX4WY/hqdefault.jpg",
    to: "/dance/samba",
    category: "Brazilian",
  },
  {
    name: "Forró",
    image: "https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg",
    to: "/dance/forro",
    category: "Brazilian",
  },
  {
    name: "Zouk",
    image: "https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg",
    to: "/dance/zouk",
    category: "Brazilian",
    description: "Flowing partner dance from Brazil",
    stats: {
      members: 634, // Active dancers
      teachers: 16, // Active teachers
    },
  },
];
