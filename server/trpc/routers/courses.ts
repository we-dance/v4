import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const coursesRouter = router({
  // Get a list of all courses with optional filtering and pagination
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(), // for pagination
        filter: z
          .object({
            search: z.string().optional(),
            instructor: z.string().optional(),
            educationalLevel: z.string().optional(),
            language: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, filter } = input
      const prisma = ctx.prisma

      // Build where conditions for filtering
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

      if (filter?.educationalLevel) {
        where.educationalLevel = filter.educationalLevel
      }

      if (filter?.language) {
        where.languages = { contains: filter.language }
      }

      // Get courses with pagination
      const courses = await prisma.course.findMany({
        take: limit + 1, // take an extra item to determine if there are more items
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          instructor: {
            select: {
              username: true,
              name: true,
              photo: true,
            },
          },
          offerings: true,
          reviews: true,
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (courses.length > limit) {
        const nextItem = courses.pop()
        nextCursor = nextItem?.id
      }

      return {
        courses,
        nextCursor,
      }
    }),

  // Get a single course by ID
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input
      const prisma = ctx.prisma

      const course = await prisma.course.findUnique({
        where: { id },
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
          reviews: {
            orderBy: { createdAt: 'desc' },
          },
          offerings: true,
        },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with ID '${id}'`,
        })
      }

      return course
    }),

  // Get a single course by slug
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input
      const prisma = ctx.prisma

      const course = await prisma.course.findUnique({
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
          reviews: {
            orderBy: { createdAt: 'desc' },
          },
          offerings: true,
        },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course with slug '${slug}'`,
        })
      }

      return course
    }),

  // Get featured/popular courses for homepage
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const prisma = ctx.prisma

    return prisma.course.findMany({
      take: 6,
      orderBy: [{ enrolledCount: 'desc' }, { createdAt: 'desc' }],
      include: {
        instructor: {
          select: {
            username: true,
            name: true,
            photo: true,
          },
        },
        reviews: true,
      },
    })
  }),

  // Get courses by instructor username
  getByInstructor: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { username } = input
      const prisma = ctx.prisma

      return prisma.course.findMany({
        where: {
          instructor: {
            username: username,
          },
        },
        include: {
          instructor: {
            select: {
              username: true,
              name: true,
              photo: true,
            },
          },
          reviews: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    }),
})
