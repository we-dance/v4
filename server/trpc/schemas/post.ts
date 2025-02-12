import { z } from 'zod'

// Base schemas for TRPC endpoints
const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  location: z.string(),
})

const statsSchema = z.object({
  likes: z.number().default(0),
  shares: z.number().default(0),
  comments: z.number().default(0),
})

// Content schemas for different post types
const noteContentSchema = z.object({
  text: z.string(),
  tags: z.array(z.string()).optional(),
})

const videoContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  video: z.object({
    url: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
  }),
  tags: z.array(z.string()).optional(),
})

const articleContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
  html: z.string(),
  tags: z.array(z.string()).optional(),
})

const meetContentSchema = z.object({
  title: z.string(),
  text: z.string(),
  details: z.object({
    type: z.string(),
    format: z.string(),
    gender: z.string(),
    when: z.string(),
    where: z.string(),
    level: z.string(),
  }),
  tags: z.array(z.string()).optional(),
})

const reviewContentSchema = z.object({
  title: z.string(),
  rating: z.number(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
})

const gigContentSchema = z.object({
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

const askLocalsContentSchema = z.object({
  title: z.string(),
  text: z.string(),
  tags: z.array(z.string()).optional(),
})

const adContentSchema = z.object({
  title: z.string(),
  image: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

const eventContentSchema = z.object({
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

const courseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  course: z.object({
    id: z.string(),
    duration: z.string(),
    level: z.string(),
    provider: z.string(),
  }),
  cover: z.string(),
  tags: z.array(z.string()).optional(),
})

// Main post schema using discriminated union
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
      enrolled: z.number().optional(),
    }),
  }),
])

// Schema for creating new posts
export const createPostSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('note'),
    content: noteContentSchema,
  }),
  z.object({
    type: z.literal('video'),
    content: videoContentSchema,
  }),
  z.object({
    type: z.literal('article'),
    content: articleContentSchema,
  }),
  z.object({
    type: z.literal('meet'),
    content: meetContentSchema,
  }),
  z.object({
    type: z.literal('review'),
    content: reviewContentSchema,
  }),
  z.object({
    type: z.literal('gig'),
    content: gigContentSchema,
  }),
  z.object({
    type: z.literal('ask_locals'),
    content: askLocalsContentSchema,
  }),
  z.object({
    type: z.literal('ad'),
    content: adContentSchema,
  }),
  z.object({
    type: z.literal('course'),
    content: courseContentSchema,
  }),
])

export const updateStatsSchema = z.object({
  postId: z.number(),
  action: z.enum(['like', 'share', 'comment']),
})

export type Post = z.infer<typeof postSchema>
export type CreatePost = z.infer<typeof createPostSchema>
export type UpdateStats = z.infer<typeof updateStatsSchema>

// Content type exports
export type NoteContent = z.infer<typeof noteContentSchema>
export type VideoContent = z.infer<typeof videoContentSchema>
export type ArticleContent = z.infer<typeof articleContentSchema>
export type MeetContent = z.infer<typeof meetContentSchema>
export type ReviewContent = z.infer<typeof reviewContentSchema>
export type GigContent = z.infer<typeof gigContentSchema>
export type AskLocalsContent = z.infer<typeof askLocalsContentSchema>
export type AdContent = z.infer<typeof adContentSchema>
export type CourseContent = z.infer<typeof courseContentSchema>
