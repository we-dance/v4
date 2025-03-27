import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const coursesRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        filter: z
          .object({
            search: z.string().optional(),
            instructor: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, filter } = input
      const prisma = ctx.prisma

      const where: any = {}

      if (filter?.search) {
        where.OR = [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } },
        ]
      }

      if (filter?.instructor) {
        where.instructor = {
          username: filter.instructor,
        }
      }

      const courses: any = await prisma.course.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: {
            select: {
              username: true,
              name: true,
              photo: true,
              bio: true,
            },
          },
          offers: true,
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (courses.length > limit) {
        const nextItem = courses.pop()
        nextCursor = nextItem?.id
      }

      courses.forEach((course: any) => {
        course.stats = {
          enrolled: 0,
          completed: 0,
        }

        course.aggregateRating = {
          ratingValue: 0,
          reviewCount: 0,
        }
      })

      return {
        courses,
        nextCursor,
      }
    }),

  view: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input
      const prisma = ctx.prisma

      const course: any = await prisma.course.findUnique({
        where: { slug },
        include: {
          instructor: {
            select: {
              username: true,
              name: true,
              photo: true,
              bio: true,
            },
          },
          modules: {
            include: {
              lessons: true,
            },
            orderBy: { order: 'asc' },
          },
          resources: true,
          offers: {
            orderBy: { createdAt: 'desc' },
          },
        },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with slug '${slug}'`,
        })
      }

      course.stats = {
        enrolled: 0,
        completed: 0,
      }

      course.aggregateRating = {
        ratingValue: 0,
        reviewCount: 0,
      }

      return course
    }),
})
