import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'
import { getSlug } from '~/schemas/user'
import { nanoid } from 'nanoid'

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

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input
      const prisma = ctx.prisma

      const slug = getSlug(name) + '-' + nanoid(5)

      const course = await prisma.course.create({
        data: { name, slug },
      })

      return course
    }),

  update: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string().min(1),
        description: z.string().optional(),
        subheader: z.string().optional(),
        coverUrl: z.string().optional(),
        offers: z.array(
          z.object({
            id: z.string().optional(),
            name: z.string().min(1),
            price: z.number().min(0),
            currency: z.string().min(1),
            duration: z.string().min(1),
          })
        ),
        deletedOfferIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { slug, deletedOfferIds = [], ...data } = input
      const prisma = ctx.prisma

      const existingOffers = data.offers.filter((offer) => offer.id)
      const newOffers = data.offers
        .filter((offer) => !offer.id)
        .map((offer) => ({
          ...offer,
          id: nanoid(),
        }))

      const course = await prisma.course.update({
        where: { slug },
        data: {
          name: data.name,
          description: data.description,
          subheader: data.subheader,
          coverUrl: data.coverUrl,
          offers: {
            deleteMany: deletedOfferIds.length
              ? {
                  id: {
                    in: deletedOfferIds,
                  },
                }
              : undefined,
            create: newOffers,
            update: existingOffers.map((offer) => ({
              where: { id: offer.id },
              data: offer,
            })),
          },
        },
      })

      return course
    }),
})
