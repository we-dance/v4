export interface DanceStyle {
  name: string
  image: string
  to: string
  members: number
  category: string
}

export const getDanceStyles = (): DanceStyle[] => [
  // Latin
  {
    name: 'Casino',
    image: 'https://img.youtube.com/vi/R7E9cNydevg/hqdefault.jpg',
    to: '/dance/casino',
    members: 754,
    category: 'Latin',
  },
  {
    name: 'Bachata',
    image: 'https://img.youtube.com/vi/4nJfpQ3kCbw/hqdefault.jpg',
    to: '/dance/bachata',
    members: 630,
    category: 'Latin',
  },
  {
    name: 'Kizomba',
    image: 'https://img.youtube.com/vi/jcW7Z9y5twQ/hqdefault.jpg',
    to: '/dance/kizomba',
    members: 653,
    category: 'Latin',
  },
  {
    name: 'Merengue',
    image: 'https://img.youtube.com/vi/YUZxZB_Lr3k/hqdefault.jpg',
    to: '/dance/merengue',
    members: 245,
    category: 'Latin',
  },
  {
    name: 'Cha Cha',
    image: 'https://img.youtube.com/vi/vlC4DQ7jqH8/hqdefault.jpg',
    to: '/dance/chacha',
    members: 198,
    category: 'Latin',
  },
  // Ballroom
  {
    name: 'Waltz',
    image: 'https://img.youtube.com/vi/9JUcIXh1LKk/hqdefault.jpg',
    to: '/dance/waltz',
    members: 432,
    category: 'Ballroom',
  },
  {
    name: 'Tango',
    image: 'https://img.youtube.com/vi/xlPjhRdP4ss/hqdefault.jpg',
    to: '/dance/tango',
    members: 521,
    category: 'Ballroom',
  },
  {
    name: 'Foxtrot',
    image: 'https://img.youtube.com/vi/z8KV7XxrHXs/hqdefault.jpg',
    to: '/dance/foxtrot',
    members: 187,
    category: 'Ballroom',
  },
  // Urban
  {
    name: 'Hip Hop',
    image: 'https://img.youtube.com/vi/ZuXG3XA3o_A/hqdefault.jpg',
    to: '/dance/hiphop',
    members: 200,
    category: 'Urban',
  },
  {
    name: 'Breakdance',
    image: 'https://img.youtube.com/vi/zPdQ1gN7Ngo/hqdefault.jpg',
    to: '/dance/breakdance',
    members: 432,
    category: 'Urban',
  },
  {
    name: 'House',
    image: 'https://img.youtube.com/vi/z6jFGcBDrFc/hqdefault.jpg',
    to: '/dance/house',
    members: 321,
    category: 'Urban',
  },
  {
    name: 'Popping',
    image: 'https://img.youtube.com/vi/o8yQVpg_Hyk/hqdefault.jpg',
    to: '/dance/popping',
    members: 234,
    category: 'Urban',
  },
  // Classical
  {
    name: 'Ballet',
    image: 'https://img.youtube.com/vi/8NOw9KJzY9E/hqdefault.jpg',
    to: '/dance/ballet',
    members: 100,
    category: 'Classical',
  },
  {
    name: 'Contemporary',
    image: 'https://img.youtube.com/vi/yqQGfwvPc8c/hqdefault.jpg',
    to: '/dance/contemporary',
    members: 432,
    category: 'Classical',
  },
  {
    name: 'Jazz',
    image: 'https://img.youtube.com/vi/h_bX0T76-8Y/hqdefault.jpg',
    to: '/dance/jazz',
    members: 321,
    category: 'Classical',
  },
  // Swing
  {
    name: 'Lindy Hop',
    image: 'https://img.youtube.com/vi/6fDIPCuGpjE/hqdefault.jpg',
    to: '/dance/lindyhop',
    members: 432,
    category: 'Swing',
  },
  {
    name: 'West Coast Swing',
    image: 'https://img.youtube.com/vi/v4fRV0aG8Xw/hqdefault.jpg',
    to: '/dance/westcoastswing',
    members: 345,
    category: 'Swing',
  },
  {
    name: 'Charleston',
    image: 'https://img.youtube.com/vi/FQ7SNTSq-9o/hqdefault.jpg',
    to: '/dance/charleston',
    members: 234,
    category: 'Swing',
  },
  // Brazilian
  {
    name: 'Samba',
    image: 'https://img.youtube.com/vi/sDJh_9PX4WY/hqdefault.jpg',
    to: '/dance/samba',
    members: 432,
    category: 'Brazilian',
  },
  {
    name: 'Forró',
    image: 'https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg',
    to: '/dance/forro',
    members: 321,
    category: 'Brazilian',
  },
  {
    name: 'Zouk',
    image: 'https://img.youtube.com/vi/QHvXXZqPgZY/hqdefault.jpg',
    to: '/dance/zouk',
    members: 634,
    category: 'Brazilian',
  },
]
