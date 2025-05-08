import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { Prisma } from '@prisma/client'
import { createPostSchema } from '~/schemas/postSchema'
import { nanoid } from 'nanoid'

export const postsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(20),
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
          replyToPost: true,
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
      })

      const total = await prisma.post.count()
      const hasNextPage = page * limit < total

      return {
        posts,
        nextPage: hasNextPage ? page + 1 : null,
      }
    }),

  byId: publicProcedure.input(z.string()).query(async ({ input }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: input,
      },
      include: {
        author: true,
        profile: true,
        city: true,
        style: true,
      },
    })

    if (!post) throw new Error('Post not found')

    return post
  }),

  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a course',
        })
      }

      const slug = nanoid(10)

      const data = {
        summary: input.summary,
        type: input.type,
        communityId: input.community?.id,
        cityId: input.city?.id,
        authorId: ctx.session?.profile?.id,
        slug,
      }

      const post = await prisma.post.create({
        data,
      })

      return post
    }),
})
