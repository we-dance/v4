import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { Prisma } from '@prisma/client'
import { postSchema } from '~/schemas/postSchema'
import { nanoid } from 'nanoid'

export const postsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(20),
        authorId: z.string().optional(),
        pinnedFirst: z.boolean().optional().default(false),
        type: z.string().optional(),
        city: z.string().optional(),
        onlySubscriptions: z.boolean().optional().default(false),
        community: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        page,
        limit,
        authorId,
        pinnedFirst,
        type,
        city,
        onlySubscriptions,
        community,
      } = input

      console.log('posts.list', input)

      const where: Prisma.PostWhereInput = {
        authorId: authorId ?? undefined,
        type: type === 'all' ? undefined : type,
        cityId: city ?? undefined,
        styleId: community ?? undefined,
      }

      if (onlySubscriptions && ctx.session?.profile?.id) {
        const followedProfiles = await prisma.profileFollower.findMany({
          where: { followerId: ctx.session.profile.id },
          select: { profileId: true },
        })
        const followedIds = followedProfiles.map((fp) => fp.profileId)
        where.authorId = { in: followedIds }
      }

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

  create: publicProcedure.input(postSchema).mutation(async ({ ctx, input }) => {
    if (!ctx.session?.user?.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to create a course',
      })
    }

    const data = {
      summary: input.summary,
      type: input.type,
      styleId: input.style?.id,
      cityId: input.city?.id,
      authorId: ctx.session?.profile?.id,
      attachments: input.attachments,
    }

    if (input.profileId) {
      data.profileId = input.profileId
    }

    if (input.id) {
      const updatedPost = await prisma.post.update({
        where: { id: input.id },
        data,
      })

      return updatedPost
    }

    const slug = nanoid(10)
    const newPost = await prisma.post.create({
      data: {
        ...data,
        slug,
      },
    })

    return newPost
  }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const post = await prisma.post.delete({
      where: { id: input },
    })

    return post
  }),
})
