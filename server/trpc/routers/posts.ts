import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { Prisma } from '@prisma/client'
import { createPostSchema, updateStatsSchema } from '../schemas/post'
import { mockPosts } from '~/data/mockPosts'

export const postsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(5),
        authorId: z.string().optional(),
        pinnedFirst: z.boolean().optional().default(false),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, authorId, pinnedFirst } = input

      const where: Prisma.PostWhereInput = {
        authorId: authorId ?? undefined,
      }

      const orderBy: Prisma.PostOrderByWithRelationInput[] = [
        {
          pinned: 'desc',
          createdAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ]

      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where,
        include: {
          style: true,
          city: true,
          author: true,
          profile: true,
          event: {
            include: {
              venue: {
                include: {
                  city: true,
                },
              },
            },
          },
          course: {
            include: {
              instructor: true,
            },
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        where,
      })

      const total = await prisma.post.count()
      const hasNextPage = page * limit < total

      return {
        posts,
        nextPage: hasNextPage ? page + 1 : null,
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
