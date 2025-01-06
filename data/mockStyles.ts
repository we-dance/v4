export interface DanceStyle {
  name: string;
  image: string;
  to: string;
  members: number;
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
}

export const getDanceStyles = (): DanceStyle[] => [
  // Salsa Family
  {
    name: "Salsa",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
    to: "/dance/salsa",
    members: 2500,
    category: "Latin",
    description: "Popular social dance with Latin American roots",
  },
  {
    name: "Cuban Style Salsa",
    image: "https://images.unsplash.com/photo-1516834474-48c0abc2a902",
    to: "/dance/salsa/cuban",
    members: 754,
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
  },
  {
    name: "LA Style Salsa",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e",
    to: "/dance/salsa/la",
    members: 680,
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
  },
  {
    name: "NY Style Salsa",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    to: "/dance/salsa/ny",
    members: 580,
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
  },
  // Latin
  {
    name: "Casino",
    image: "https://img.youtube.com/vi/R7E9cNydevg/hqdefault.jpg",
    to: "/dance/casino",
    members: 754,
    category: "Latin",
  },
  {
    name: "Bachata",
    image: "https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg",
    to: "/dance/bachata",
    members: 630,
    category: "Latin",
  },
  {
    name: "Kizomba",
    image: "https://img.youtube.com/vi/jcW7Z9y5twQ/hqdefault.jpg",
    to: "/dance/kizomba",
    members: 653,
    category: "Latin",
  },
  {
    name: "Merengue",
    image: "https://img.youtube.com/vi/YUZxZB_Lr3k/hqdefault.jpg",
    to: "/dance/merengue",
    members: 245,
    category: "Latin",
  },
  {
    name: "Cha Cha",
    image: "https://img.youtube.com/vi/vlC4DQ7jqH8/hqdefault.jpg",
    to: "/dance/chacha",
    members: 198,
    category: "Latin",
  },
  // Ballroom
  {
    name: "Waltz",
    image: "https://img.youtube.com/vi/9JUcIXh1LKk/hqdefault.jpg",
    to: "/dance/waltz",
    members: 432,
    category: "Ballroom",
  },
  {
    name: "Tango",
    image: "https://img.youtube.com/vi/xlPjhRdP4ss/hqdefault.jpg",
    to: "/dance/tango",
    members: 521,
    category: "Ballroom",
  },
  {
    name: "Foxtrot",
    image: "https://img.youtube.com/vi/z8KV7XxrHXs/hqdefault.jpg",
    to: "/dance/foxtrot",
    members: 187,
    category: "Ballroom",
  },
  // Urban
  {
    name: "Hip Hop",
    image: "https://img.youtube.com/vi/ZuXG3XA3o_A/hqdefault.jpg",
    to: "/dance/hiphop",
    members: 200,
    category: "Urban",
  },
  {
    name: "Breakdance",
    image: "https://img.youtube.com/vi/zPdQ1gN7Ngo/hqdefault.jpg",
    to: "/dance/breakdance",
    members: 432,
    category: "Urban",
  },
  {
    name: "House",
    image: "https://img.youtube.com/vi/z6jFGcBDrFc/hqdefault.jpg",
    to: "/dance/house",
    members: 321,
    category: "Urban",
  },
  {
    name: "Popping",
    image: "https://img.youtube.com/vi/o8yQVpg_Hyk/hqdefault.jpg",
    to: "/dance/popping",
    members: 234,
    category: "Urban",
  },
  // Classical
  {
    name: "Ballet",
    image: "https://img.youtube.com/vi/8NOw9KJzY9E/hqdefault.jpg",
    to: "/dance/ballet",
    members: 100,
    category: "Classical",
  },
  {
    name: "Contemporary",
    image: "https://img.youtube.com/vi/yqQGfwvPc8c/hqdefault.jpg",
    to: "/dance/contemporary",
    members: 432,
    category: "Classical",
  },
  {
    name: "Jazz",
    image: "https://img.youtube.com/vi/h_bX0T76-8Y/hqdefault.jpg",
    to: "/dance/jazz",
    members: 321,
    category: "Classical",
  },
  // Swing
  {
    name: "Lindy Hop",
    image: "https://img.youtube.com/vi/6fDIPCuGpjE/hqdefault.jpg",
    to: "/dance/lindyhop",
    members: 432,
    category: "Swing",
  },
  {
    name: "West Coast Swing",
    image: "https://img.youtube.com/vi/v4fRV0aG8Xw/hqdefault.jpg",
    to: "/dance/westcoastswing",
    members: 345,
    category: "Swing",
  },
  {
    name: "Charleston",
    image: "https://img.youtube.com/vi/FQ7SNTSq-9o/hqdefault.jpg",
    to: "/dance/charleston",
    members: 234,
    category: "Swing",
  },
  // Brazilian
  {
    name: "Samba",
    image: "https://img.youtube.com/vi/sDJh_9PX4WY/hqdefault.jpg",
    to: "/dance/samba",
    members: 432,
    category: "Brazilian",
  },
  {
    name: "Forró",
    image: "https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg",
    to: "/dance/forro",
    members: 321,
    category: "Brazilian",
  },
  {
    name: "Zouk",
    image: "https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg",
    to: "/dance/zouk",
    members: 634,
    category: "Brazilian",
  },
];
