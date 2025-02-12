import { z } from 'zod'

// Common schemas
export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  location: z.string(),
  points: z.number().optional(),
})

export type PostAuthor = z.infer<typeof authorSchema>
export type PostType =
  | 'note'
  | 'video'
  | 'article'
  | 'meet'
  | 'review'
  | 'gig'
  | 'ask_locals'
  | 'ad'
  | 'event'
  | 'course'

export const pollSchema = z.object({
  options: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      votes: z.number(),
    })
  ),
  totalVotes: z.number(),
})

export const linkSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
})

export type Poll = z.infer<typeof pollSchema>
export type Link = z.infer<typeof linkSchema>

export const statsSchema = z.object({
  likes: z.number().optional(),
  comments: z.number().optional(),
  shares: z.number().optional(),
  bookmarks: z.number().optional(),
  interested: z.number().optional(),
  views: z.number().optional(),
})

export type PostStats = z.infer<typeof statsSchema>

// Content schemas
export const noteContentSchema = z.object({
  text: z.string(),
  tags: z.array(z.string()).optional(),
  poll: z
    .object({
      options: z.array(
        z.object({
          id: z.number(),
          text: z.string(),
          votes: z.number(),
        })
      ),
      totalVotes: z.number(),
    })
    .optional(),
  links: z
    .array(
      z.object({
        url: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
})

export const videoContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  video: z.object({
    url: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
  }),
  tags: z.array(z.string()).optional(),
})

export const articleContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
  html: z.string(),
  tags: z.array(z.string()).optional(),
})

export const meetContentSchema = z.object({
  title: z.string(),
  text: z.string(),
  details: z.object({
    type: z.string(),
    format: z.string(),
    gender: z.string().optional(),
    when: z.string(),
    where: z.string(),
    level: z.string().optional(),
    style: z.string().optional(),
    seats: z.string().optional(),
    contribution: z.string().optional(),
  }),
  tags: z.array(z.string()).optional(),
})

export const reviewContentSchema = z.object({
  title: z.string(),
  rating: z.number(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
})

export const gigContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  details: z.array(
    z.object({
      icon: z.string(),
      text: z.string(),
    })
  ),
  tags: z.array(z.string()).optional(),
})

export const askLocalsContentSchema = z.object({
  title: z.string(),
  text: z.string(),
  tags: z.array(z.string()).optional(),
})

export const adContentSchema = z.object({
  title: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export const eventContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  date: z.string(),
  location: z.string(),
  price: z
    .object({
      amount: z.number(),
      currency: z.string(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
})

export const courseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  course: z.object({
    id: z.string(),
    duration: z.string(),
    level: z.string(),
    provider: z.string()
  }),
  cover: z.string(),
  tags: z.array(z.string()).optional()
})

// Export content types
export type NoteContent = z.infer<typeof noteContentSchema>
export type VideoContent = z.infer<typeof videoContentSchema>
export type ArticleContent = z.infer<typeof articleContentSchema>
export type MeetContent = z.infer<typeof meetContentSchema>
export type ReviewContent = z.infer<typeof reviewContentSchema>
export type GigContent = z.infer<typeof gigContentSchema>
export type AskLocalsContent = z.infer<typeof askLocalsContentSchema>
export type AdContent = z.infer<typeof adContentSchema>
export type EventContent = z.infer<typeof eventContentSchema>
export type CourseContent = z.infer<typeof courseContentSchema>

// Post schema
export const postSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('note'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: noteContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('video'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: videoContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('article'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: articleContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('meet'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: meetContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('review'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: reviewContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('gig'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: gigContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('ask_locals'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: askLocalsContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('ad'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: adContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('event'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: eventContentSchema,
    stats: statsSchema,
  }),
  z.object({
    type: z.literal('course'),
    id: z.number(),
    author: authorSchema,
    timestamp: z.string(),
    content: courseContentSchema,
    stats: statsSchema.extend({
      enrolled: z.number().optional()
    })
  }),
])

export type Post = z.infer<typeof postSchema>

// Helper types for each post type
export type NotePost = Extract<Post, { type: 'note' }>
export type VideoPost = Extract<Post, { type: 'video' }>
export type ArticlePost = Extract<Post, { type: 'article' }>
export type MeetPost = Extract<Post, { type: 'meet' }>
export type ReviewPost = Extract<Post, { type: 'review' }>
export type GigPost = Extract<Post, { type: 'gig' }>
export type AskLocalsPost = Extract<Post, { type: 'ask_locals' }>
export type AdPost = Extract<Post, { type: 'ad' }>
export type EventPost = Extract<Post, { type: 'event' }>
export type CoursePost = Extract<Post, { type: 'course' }>
