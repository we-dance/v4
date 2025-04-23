import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

import {
  postSchema,
  createPostSchema,
  updateStatsSchema,
} from '../schemas/post'
import { mockPosts } from '~/data/mockPosts'

export const postsRouter = router({
  // Get all posts with optional filtering
  list: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        limit: z.number().optional().default(10),
        page: z.number().optional().default(0),
        authorId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { type, limit, page = 0, authorId } = input
      const start = page * limit
      const end = start + limit

      const data = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            include: {
              city: true,
            },
          },
        },
        take: 5,
      })

      const posts = data.map((post) => ({
        ...post,
        type: 'note',
        content: {
          text: post.title,
        },
        timestamp: post.createdAt,
        stats: {
          likes: 0,
          shares: 0,
          comments: 0,
        },
      }))

      return {
        posts,
        nextPage: page + 1,
      }
    }),

  // Get a single post by ID
  byId: publicProcedure.input(z.number()).query(async ({ input }) => {
    const post = mockPosts.find((p) => p.id === input)
    if (!post) throw new Error('Post not found')
    return post
  }),

  // Create a new post
  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      return {
        ...input,
        id: Math.random(),
        timestamp: new Date().toISOString(),
        stats: { likes: 0, shares: 0, comments: 0 },
        author: {
          id: 'user-1',
          name: 'John Doe',
          image: '/avatar.png',
          location: 'San Francisco, CA',
        },
      }
    }),

  // Update post stats (like, comment, share)
  updateStats: publicProcedure
    .input(updateStatsSchema)
    .mutation(async ({ input }) => {
      const { postId, action } = input
      console.log(`${action} post ${postId}`)
      return { success: true }
    }),
})
