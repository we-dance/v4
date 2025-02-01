import { mockEvents } from './mockEvents'
import { eventToFeedPost } from '~/schemas/event'
import { postSchema, type Post } from '~/schemas/post'

// Define mock posts data without export
const postsData = [
  {
    id: 1,
    type: 'note',
    author: {
      id: '1',
      name: 'Maria Rodriguez',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      location: 'Madrid',
      points: 1250,
    },
    timestamp: '2 hours ago',
    content: {
      text: '💃 Quick tip for following: When you feel the lead for a right turn, wait for the tension in the connection before moving. This helps create cleaner turns and better synergy with your partner.\n\nThis small detail made a huge difference in my dancing. Try it and let me know if it helps!',
      tags: ['dance-tips', 'following', 'technique'],
    },
    stats: {
      likes: 42,
      comments: 12,
      shares: 0,
    },
  },
  {
    id: 15,
    type: 'video',
    author: {
      id: '8',
      name: 'Juan Martinez',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      location: 'Barcelona',
      points: 890,
    },
    timestamp: '5 hours ago',
    content: {
      title: '3 Essential Body Movement Exercises for Salsa',
      video: {
        url: 'https://youtube.com/watch?v=example',
        thumbnail:
          'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4',
        duration: '8:24',
      },
      description:
        'Quick tutorial showing three fundamental exercises to improve your body movement in salsa. Perfect for beginners!',
      tags: ['tutorial', 'technique', 'body-movement'],
    },
    stats: {
      likes: 156,
      comments: 23,
      shares: 45,
    },
  },
  {
    id: 2,
    type: 'note',
    author: {
      id: '2',
      name: 'David Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      location: 'London',
      points: 670,
    },
    timestamp: '3 hours ago',
    content: {
      text: "🎵 What's your go-to song for practicing body movement?",
      poll: {
        options: [
          { id: 1, text: "Lloraras - Oscar D'Leon", votes: 45 },
          { id: 2, text: 'Aguanile - Hector Lavoe', votes: 62 },
          { id: 3, text: 'Idilio - Willie Colon', votes: 28 },
          { id: 4, text: 'Ahora Quien - Marc Anthony', votes: 15 },
        ],
        totalVotes: 150,
      },
      tags: ['music', 'practice', 'salsa'],
    },
    stats: {
      likes: 25,
      comments: 18,
      shares: 0,
    },
  },
  {
    id: 3,
    type: 'note',
    author: {
      id: '3',
      name: 'Sophie Laurent',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      location: 'Paris',
      points: 1480,
    },
    timestamp: '6 hours ago',
    content: {
      text: 'Just discovered this amazing YouTube channel for salsa music history! Each video breaks down the evolution of different styles and the stories behind classic songs. Perfect for understanding the music we dance to! 🎧',
      links: [
        {
          url: 'https://youtube.com/...',
          title: 'Salsa Music History',
          description:
            'Deep dive into the roots of salsa music and its evolution',
        },
      ],
      tags: ['music-history', 'learning-resources', 'musicality'],
    },
    stats: {
      likes: 45,
      comments: 8,
      shares: 0,
    },
  },
  {
    id: 5,
    type: 'article',
    author: {
      name: 'Sophie Laurent',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      location: 'Paris',
      id: '4',
      points: 1480,
    },
    timestamp: '1 day ago',
    content: {
      title: "Understanding the Clave: A Beginner's Guide to Salsa Rhythm",
      cover:
        'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=400&fit=crop',
      description:
        'A comprehensive guide to understanding the fundamental rhythm pattern in salsa music and how it affects our dancing.',
      html: 'The clave is the heartbeat of salsa music...',
      tags: ['musicality', 'beginner-guide', 'rhythm'],
    },
    stats: {
      likes: 89,
      comments: 24,
      bookmarks: 45,
    },
  },
  {
    id: 6,
    type: 'meet',
    author: {
      id: '5',
      name: 'Anna Schmidt',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      location: 'Berlin',
      points: 520,
    },
    timestamp: '2 hours ago',
    content: {
      title: 'Looking for ladies to join salsa social tonight! 💃',
      text: "Hey dancers! I'm going to Havana Social Club tonight and would love to have some dance friends join! I'm intermediate level, been dancing for 2 years. The more the merrier! 🎉",
      details: {
        type: 'social',
        format: 'group',
        gender: 'female',
        when: 'Tonight, 9 PM - 1 AM',
        where: 'Havana Social Club, Berlin',
        level: 'All levels welcome',
      },
      tags: ['ladies-group', 'social-dancing', 'berlin'],
    },
    stats: {
      interested: 5,
      shares: 0,
      comments: 0,
    },
  },
  {
    id: 7,
    type: 'review',
    author: {
      id: '2',
      name: 'David Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      location: 'London',
      points: 670,
    },
    timestamp: '1 day ago',
    content: {
      title: 'Salsa Mania - Best Floor in Town!',
      rating: 5,
      description:
        'Finally checked out the new Salsa Mania venue and wow! Spacious dance floor with perfect grip, great sound system, and friendly crowd. The pre-party class was excellent too. Definitely my new favorite Thursday spot!',
      tags: ['venue-review', 'london', 'social-dancing'],
    },
    stats: {
      likes: 35,
      comments: 15,
      shares: 0,
    },
  },
  {
    id: 8,
    type: 'gig',
    author: {
      id: 'salsa_mania_1',
      name: 'Salsa Mania',
      image: 'https://images.unsplash.com/photo-1560439514-4e9645039924',
      location: 'London',
      points: 2100,
    },
    timestamp: '1 day ago',
    content: {
      title: 'Seeking Salsa Instructor for Group Classes',
      description:
        'Looking for an experienced salsa instructor to teach beginner and intermediate levels. Must have at least 3 years of teaching experience and be comfortable with both leading and following.',
      details: [
        { icon: 'ph:calendar', text: 'Tuesday & Thursday evenings' },
        { icon: 'ph:clock', text: '7 PM - 9 PM' },
        { icon: 'ph:map-pin', text: 'East London' },
        { icon: 'ph:graduation-cap', text: 'Min. 3 years teaching exp.' },
      ],
      tags: ['teaching', 'job-opening', 'london'],
    },
    stats: {
      interested: 12,
      shares: 0,
      comments: 0,
    },
  },
  {
    id: 9,
    type: 'ask_locals',
    author: {
      id: '6',
      name: 'Lisa Wong',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      location: 'Tokyo',
      points: 180,
    },
    timestamp: '12 hours ago',
    content: {
      title: 'New in Berlin - Where to dance salsa?',
      text: 'Just moved to Berlin and looking to connect with the salsa scene! Particularly interested in Cuban style socials and weekday practice sessions. Any recommendations for venues, WhatsApp groups, or regular events?',
      tags: ['berlin', 'local-scene', 'cuban-salsa'],
    },
    stats: {
      likes: 8,
      comments: 15,
      shares: 0,
    },
  },
  {
    id: 10,
    type: 'ad',
    author: {
      id: 'dance_shoes_pro_1',
      name: 'Dance Shoes Pro',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      location: 'Online Store',
      points: 950,
    },
    timestamp: '5 hours ago',
    content: {
      title: 'New Collection: Professional Dance Shoes',
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=400&fit=crop',
      description:
        'Just launched our new collection of professional dance shoes! Italian leather, perfect heel height, and superior comfort. Use code SUMMER20 for 20% off.',
      tags: ['dance-shoes', 'new-collection', 'special-offer'],
    },
    stats: {
      likes: 34,
      bookmarks: 12,
      shares: 0,
      comments: 0,
    },
  },
  {
    id: 11,
    type: 'meet',
    author: {
      id: '7',
      name: 'Thomas Weber',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      location: 'Stuttgart',
      points: 340,
    },
    timestamp: '4 hours ago',
    content: {
      title: 'Looking for ride share to Freiburg Salsa Festival! 🚗',
      text: "Hey dancers! Anyone driving to Freiburg Salsa Festival next weekend? Happy to share fuel costs and good vibes! I'm flexible with departure times.",
      details: {
        type: 'travel',
        format: 'carpool',
        when: 'Sept 15-17',
        where: 'Stuttgart → Freiburg',
        seats: '1 seat needed',
        contribution: 'Will share fuel costs',
      },
      tags: ['festival', 'ride-share', 'freiburg'],
    },
    stats: {
      interested: 3,
      shares: 0,
      comments: 0,
    },
  },
  {
    id: 12,
    type: 'meet',
    author: {
      id: '8',
      name: 'Carlos Mendoza',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      location: 'Berlin',
      points: 120,
    },
    timestamp: '1 hour ago',
    content: {
      title: 'Casino style practice partner needed 🕺',
      text: "Hola! I'm looking for a follow to practice casino style salsa. I'm a beginner (3 months experience) and would love to work on basic figures and rueda combinations. I have access to a practice room near Alexanderplatz.",
      details: {
        type: 'practice',
        format: 'individual',
        gender: 'female',
        when: 'Weekday evenings',
        where: 'Berlin, Alexanderplatz area',
        level: 'Beginner',
        style: 'Casino/Cuban',
      },
      tags: ['practice-partner', 'casino', 'berlin', 'beginner'],
    },
    stats: {
      interested: 2,
      shares: 0,
      comments: 0,
    },
  },
  {
    id: 101,
    type: 'article',
    author: {
      id: 'pedro_1',
      name: 'Pedro Gonzalez',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
      location: 'Havana',
      points: 3200,
    },
    timestamp: '2023-10-14',
    content: {
      title: 'Basic Steps and Movements',
      description:
        'Learn the foundational steps and body movement of Cuban style salsa',
      cover:
        'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
      html: 'Learn the foundational steps and body movement of Cuban style salsa...',
      tags: ['cuban-salsa', 'basics', 'tutorial'],
    },
    stats: {
      likes: 45,
      comments: 12,
      shares: 8,
    },
  },
  {
    id: 102,
    type: 'article',
    author: {
      id: 'rosa_1',
      name: 'Rosa Martinez',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rosa',
      location: 'Miami',
      points: 2800,
    },
    timestamp: '2023-10-12',
    content: {
      title: 'Introduction to Rueda de Casino',
      description:
        'Get started with the exciting world of Cuban salsa circle dancing',
      cover:
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
      html: 'Get started with the exciting world of Cuban salsa circle dancing...',
      tags: ['rueda', 'casino', 'tutorial'],
    },
    stats: {
      likes: 38,
      comments: 15,
      shares: 10,
    },
  },
  {
    id: 103,
    type: 'article',
    author: {
      id: 'dj_timba_1',
      name: 'DJ Timba',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=djtimba',
      location: 'Munich',
      points: 4100,
    },
    timestamp: '2023-10-10',
    content: {
      title: 'Understanding Timba Music',
      description: 'Deep dive into the complex rhythms and structure of Timba',
      cover:
        'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
      html: 'Deep dive into the complex rhythms and structure of Timba...',
      tags: ['timba', 'music', 'musicality'],
    },
    stats: {
      likes: 62,
      comments: 20,
      shares: 15,
    },
  },
  {
    id: 104,
    type: 'article',
    author: {
      id: 'maria_1',
      name: 'Maria Sanchez',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      location: 'Havana',
      points: 3800,
    },
    timestamp: '2023-10-08',
    content: {
      title: 'Cuban Dance Culture',
      description:
        'Explore the rich history and cultural context of Cuban salsa',
      cover:
        'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
      html: 'Explore the rich history and cultural context of Cuban salsa...',
      tags: ['cuban-culture', 'history', 'dance'],
    },
    stats: {
      likes: 55,
      comments: 18,
      shares: 12,
    },
  },
  {
    id: 105,
    type: 'article',
    author: {
      id: 'maria_1',
      name: 'Maria Rodriguez',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      location: 'Madrid',
      points: 3200,
    },
    timestamp: '2023-10-15',
    content: {
      title: 'Getting Started with Salsa',
      description: "A complete beginner's guide to salsa dancing",
      cover:
        'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
      html: "A complete beginner's guide to salsa dancing...",
      tags: ['beginner-guide', 'salsa-basics'],
    },
    stats: {
      likes: 85,
      comments: 22,
      shares: 18,
    },
  },
  {
    id: 106,
    type: 'article',
    author: {
      id: 'carlos_1',
      name: 'Carlos Mendoza',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      location: 'Barcelona',
      points: 2800,
    },
    timestamp: '2023-10-10',
    content: {
      title: 'How to Choose Your Salsa Style',
      description: 'Compare different salsa styles and find your perfect match',
      cover:
        'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
      html: 'Compare different salsa styles and find your perfect match...',
      tags: ['salsa-styles', 'beginner-guide'],
    },
    stats: {
      likes: 72,
      comments: 18,
      shares: 15,
    },
  },
  {
    id: 107,
    type: 'article',
    author: {
      id: 'juan_1',
      name: 'Juan Martinez',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
      location: 'Miami',
      points: 4100,
    },
    timestamp: '2023-10-12',
    content: {
      title: 'Teaching Resources',
      description: 'Essential tools and methods for salsa instructors',
      cover:
        'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
      html: 'Essential tools and methods for salsa instructors...',
      tags: ['teaching', 'instruction', 'methodology'],
    },
    stats: {
      likes: 65,
      comments: 20,
      shares: 25,
    },
  },
  {
    id: 108,
    type: 'article',
    author: {
      id: 'ana_1',
      name: 'Ana Sofia',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
      location: 'Havana',
      points: 3800,
    },
    timestamp: '2023-10-08',
    content: {
      title: 'Salsa Music Guide',
      description: 'Understanding salsa music structure and rhythms',
      cover:
        'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
      html: 'Understanding salsa music structure and rhythms...',
      tags: ['music', 'musicality', 'rhythm'],
    },
    stats: {
      likes: 92,
      comments: 28,
      shares: 32,
    },
  },
] as const

// Export validated posts
export const mockPosts = postSchema
  .array()
  .parse([
    ...postsData,
    eventToFeedPost(mockEvents[3]),
    eventToFeedPost(mockEvents[2]),
  ])

// Export type for TypeScript support
export type MockPosts = typeof mockPosts
