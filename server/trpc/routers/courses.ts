import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

// Helper to extract image from metadata
const extractCourseImage = (course: any): string | null => {
  try {
    // Приоритет 1: Проверяем в metadata.image
    if (course.metadata) {
      const metadata =
        typeof course.metadata === 'string'
          ? JSON.parse(course.metadata)
          : course.metadata

      // Обрабатываем разные форматы хранения изображения
      if (metadata.image) {
        if (typeof metadata.image === 'string') {
          return metadata.image
        } else if (typeof metadata.image === 'object') {
          return metadata.image.url || null
        }
      }
    }

    // Приоритет 2: Проверяем поле instructor.image
    if (course.instructor?.image) {
      return course.instructor.image
    }

    // Приоритет 3: Проверяем в instructorData
    if (course.instructorData) {
      const instructorData =
        typeof course.instructorData === 'string'
          ? JSON.parse(course.instructorData)
          : course.instructorData

      if (instructorData.image) {
        return instructorData.image
      }
    }
  } catch (e) {
    console.error('Error extracting course image:', e)
  }

  // Если ничего не нашли, возвращаем null
  return null
}

// Helper to transform course data for response
const transformCourseData = (course: any) => {
  const image = extractCourseImage(course)

  // Обработка данных инструктора - если нет instructor, но есть instructorData,
  // используем данные из instructorData
  let instructor = course.instructor

  if (!instructor && course.instructorData) {
    const instructorData =
      typeof course.instructorData === 'string'
        ? JSON.parse(course.instructorData)
        : course.instructorData

    instructor = instructorData
  }

  // Если у инструктора нет поля experience, но оно есть в metadata, добавляем его
  if (instructor && !instructor.experience && course.metadata) {
    const metadata =
      typeof course.metadata === 'string'
        ? JSON.parse(course.metadata)
        : course.metadata

    if (metadata.instructorData?.experience) {
      instructor.experience = metadata.instructorData.experience
    }
  }

  // Извлекаем данные из metadata при необходимости
  let review = course.review || []
  let offers = course.offers || []
  let aggregateRating = course.aggregateRating

  // Если есть metadata и она структурирована, извлекаем дополнительные данные оттуда
  if (course.metadata) {
    const metadata =
      typeof course.metadata === 'string'
        ? JSON.parse(course.metadata)
        : course.metadata

    // Добавляем отзывы из metadata, если они есть
    if (metadata.review && !course.review) {
      review = metadata.review
    }

    // Добавляем предложения из metadata, если они есть
    if (metadata.offers && !course.offers) {
      offers = metadata.offers
    }

    // Добавляем рейтинг из metadata, если он есть
    if (metadata.aggregateRating && !course.aggregateRating) {
      aggregateRating = metadata.aggregateRating
    }
  }

  const courseWithImage = {
    ...course,
    image: image || null,
    instructor: instructor || null,
    review: review,
    offers: offers,
    aggregateRating: aggregateRating,
  }

  return courseWithImage
}

export const coursesRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional().default(10),
        cursor: z.string().optional(),
        // Optional filters
        level: z.string().optional(),
        style: z.string().optional(),
        priceRange: z.string().optional(),
        rating: z.string().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        // Build the where clause based on filters
        const where: any = {}

        // Apply level filter if provided
        if (input.level) {
          where.educationalLevel = input.level
        }

        // Apply search query if provided
        if (input.searchQuery) {
          where.OR = [
            { name: { contains: input.searchQuery, mode: 'insensitive' } },
            {
              description: { contains: input.searchQuery, mode: 'insensitive' },
            },
          ]
        }

        // Fetch courses from the database
        const courses = await ctx.prisma.course.findMany({
          take: input.limit,
          skip: input.cursor ? 1 : 0,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: { createdAt: 'desc' },
          include: {
            instructor: true,
            reviews: true,
            offerings: true,
            modules: {
              include: {
                lessons: true,
              },
            },
          },
          where,
        })

        // Add image field to each course
        const transformedCourses = courses.map(transformCourseData)

        // Determine the next cursor for pagination
        let nextCursor: string | undefined = undefined
        if (transformedCourses.length === input.limit) {
          nextCursor = transformedCourses[transformedCourses.length - 1].id
        }

        return {
          items: transformedCourses,
          nextCursor,
        }
      } catch (error) {
        console.error('Error in getAll courses:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch courses',
          cause: error,
        })
      }
    }),

  // Get course by ID procedure
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input },
        include: {
          instructor: true,
          reviews: true,
          offerings: true,
          resources: true,
          modules: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      })

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course found with id: ${input}`,
        })
      }

      return transformCourseData(course)
    } catch (error) {
      console.error('Error in course byId:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch course',
        cause: error,
      })
    }
  }),

  // Get course by slug
  bySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const course = await ctx.prisma.course.findUnique({
        where: { slug: input },
        include: {
          instructor: true,
          reviews: true,
          offerings: true,
          resources: true,
          modules: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      })
      debugger

      if (!course) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course found with slug: ${input}`,
        })
      }

      return transformCourseData(course)
    } catch (error) {
      console.error('Error in course bySlug:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch course',
        cause: error,
      })
    }
  }),
})
