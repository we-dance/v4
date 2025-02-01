import type { CommentWithReplies } from '~/schemas/comment'

export const mockComments: CommentWithReplies[] = [
  {
    id: 1,
    author: {
      id: '2',
      name: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      points: 320,
    },
    text: 'Great tip! This really helped me improve my following technique.',
    timestamp: '1 hour ago',
    stats: {
      likes: 5,
    },
  },
  {
    id: 2,
    author: {
      id: '5',
      name: 'Emma Davis',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      points: 210,
    },
    text: '@Alex Chen Agreed! The connection in the turn makes all the difference.',
    timestamp: '30 minutes ago',
    stats: {
      likes: 2,
    },
    replyTo: {
      id: 1,
      authorName: 'Alex Chen',
    },
  },
  {
    id: 3,
    author: {
      id: '6',
      name: 'John Smith',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      points: 180,
    },
    text: '@Emma Davis Any tips for leaders to help create that connection?',
    timestamp: '15 minutes ago',
    stats: {
      likes: 1,
    },
    replyTo: {
      id: 2,
      authorName: 'Emma Davis',
    },
  },
  {
    id: 4,
    author: {
      id: '3',
      name: 'Sophie Williams',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      points: 150,
    },
    text: "I've been struggling with this. Will definitely try it in my next class!",
    timestamp: '30 minutes ago',
    stats: {
      likes: 2,
    },
  },
]
