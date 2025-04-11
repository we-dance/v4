import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { getSlug } from '~/schemas/user'
import { nanoid } from 'nanoid'
import { prisma } from '~/server/prisma'
import { getStripe } from '~/server/utils/stripe'
import { SubscriptionDuration, getRecurring } from '~/utils/format'
import Stripe from 'stripe'

interface StripeIds {
  stripeProductId: string
  stripePriceId: string
}

interface OfferData {
  name: string
  price: number
  currency: string
  duration: SubscriptionDuration
  items: string
  stripeProductId?: string
  stripePriceId?: string
}

async function createOrUpdateStripeProduct(
  stripe: Stripe,
  newOffer: OfferData,
  oldOffer?: OfferData
): Promise<StripeIds> {
  if (!oldOffer?.stripeProductId) {
    const stripeProduct = await stripe.products.create({
      name: newOffer.name,
      description: newOffer.items ? newOffer.items : undefined,
    })
    const stripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: stripeProduct.id,
      recurring: getRecurring(newOffer.duration),
    })

    return {
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    }
  }

  if (!oldOffer.stripePriceId) {
    const stripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: oldOffer.stripeProductId,
      recurring: getRecurring(newOffer.duration),
    })

    return {
      stripeProductId: oldOffer.stripeProductId,
      stripePriceId: stripePrice.id,
    }
  }

  if (newOffer.name !== oldOffer.name || newOffer.items !== oldOffer.items) {
    await stripe.products.update(oldOffer.stripeProductId, {
      name: newOffer.name,
      description: newOffer.items ? newOffer.items : undefined,
    })
  }

  if (
    newOffer.price !== oldOffer.price ||
    newOffer.currency !== oldOffer.currency ||
    newOffer.duration !== oldOffer.duration
  ) {
    if (oldOffer.stripePriceId) {
      await stripe.prices.update(oldOffer.stripePriceId, {
        active: false,
      })
    }

    const newStripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: oldOffer.stripeProductId,
      recurring: getRecurring(newOffer.duration),
    })

    return {
      stripeProductId: oldOffer.stripeProductId,
      stripePriceId: newStripePrice.id,
    }
  }

  return {
    stripeProductId: oldOffer.stripeProductId,
    stripePriceId: oldOffer.stripePriceId,
  }
}

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

      where.status = 'published'

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

  myList: publicProcedure.query(async ({ ctx }) => {
    const courses: any = await prisma.course.findMany({
      where: {
        instructor: {
          user: {
            id: ctx.session?.user?.id,
          },
        },
      },
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

    return {
      courses,
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

      const course: any = await prisma.course.findUnique({
        where: { slug },
        include: {
          instructor: {
            select: {
              id: true,
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
            include: {
              subscriptions: ctx.session?.user?.id
                ? {
                    where: {
                      userId: ctx.session.user.id,
                    },
                  }
                : undefined,
            },
          },
          reviews: {
            include: {
              author: {
                select: {
                  username: true,
                  name: true,
                  photo: true,
                },
              },
            },
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

      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to create a course',
        })
      }

      const slug = getSlug(name) + '-' + nanoid(5)

      const course = await prisma.course.create({
        data: { name, slug, instructorId: ctx.session?.profile?.id },
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { slug, ...data } = input

      const course = await prisma.course.update({
        where: { slug },
        data: {
          name: data.name,
          description: data.description,
          subheader: data.subheader,
          coverUrl: data.coverUrl,
        },
      })

      return course
    }),

  updateModule: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        moduleId: z.string().optional(),
        name: z.string(),
        description: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { courseId, moduleId, name, description } = input

      if (!moduleId) {
        const module = await prisma.courseModule.create({
          data: { name, description, courseId, order: 0 },
        })

        return module
      }

      const module = await prisma.courseModule.update({
        where: { id: moduleId },
        data: { name, description },
      })

      return module
    }),

  deleteModule: publicProcedure
    .input(z.object({ moduleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { moduleId } = input

      await prisma.courseModule.delete({
        where: { id: moduleId },
      })
    }),

  updateLesson: publicProcedure
    .input(
      z.object({
        moduleId: z.string(),
        lessonId: z.string().optional(),
        name: z.string(),
        duration: z.number(),
        videoId: z.string().optional(),
        locked: z.boolean().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { moduleId, lessonId, ...data } = input

      if (!lessonId) {
        const lesson = await prisma.courseLesson.create({
          data: {
            ...data,
            moduleId,
            videoId: data.videoId || '',
          },
        })

        return lesson
      }

      const lesson = await prisma.courseLesson.update({
        where: { id: lessonId },
        data,
      })

      return lesson
    }),

  deleteLesson: publicProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { lessonId } = input

      await prisma.courseLesson.delete({
        where: { id: lessonId },
      })
    }),

  updateResource: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        resourceId: z.string().optional(),
        name: z.string(),
        description: z.string(),
        url: z.string(),
        locked: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { courseId, resourceId, ...data } = input

      if (!resourceId) {
        const resource = await prisma.courseResource.create({
          data: { ...data, courseId, locked: data.locked ?? false },
        })
        return resource
      }

      const resource = await prisma.courseResource.update({
        where: { id: resourceId },
        data,
      })

      return resource
    }),

  deleteResource: publicProcedure
    .input(z.object({ resourceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { resourceId } = input

      await prisma.courseResource.delete({
        where: { id: resourceId },
      })
    }),

  updateOffer: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        offerId: z.string().optional().nullable(),
        name: z.string(),
        price: z.number(),
        currency: z.string(),
        duration: z.nativeEnum(SubscriptionDuration),
        items: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { courseId, offerId, ...offerData } = input

      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          instructor: {
            select: {
              user: {
                select: {
                  stripeAccountId: true,
                },
              },
            },
          },
        },
      })

      try {
        if (!offerId) {
          const stripe = getStripe(course?.instructor?.user?.stripeAccountId)
          const stripeIds = await createOrUpdateStripeProduct(stripe, offerData)

          return await prisma.offer.create({
            data: {
              ...offerData,
              courseId,
              ...stripeIds,
            },
          })
        }

        const existingOffer = await prisma.offer.findUnique({
          where: { id: offerId },
          include: {
            course: {
              include: {
                instructor: {
                  select: { user: { select: { stripeAccountId: true } } },
                },
              },
            },
          },
        })

        if (!existingOffer) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Offer not found' })
        }

        const stripe = getStripe(
          existingOffer.course?.instructor?.user?.stripeAccountId
        )

        const stripeIds = await createOrUpdateStripeProduct(
          stripe,
          offerData,
          existingOffer as OfferData
        )

        return await prisma.offer.update({
          where: { id: offerId },
          data: {
            ...offerData,
            ...stripeIds,
          },
        })
      } catch (error) {
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (error as Error).message,
        })
      }
    }),

  deleteOffer: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { offerId } = input

      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  user: {
                    select: {
                      stripeAccountId: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!offer) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Offer not found' })
      }

      const stripeAccountId = offer.course?.instructor?.user?.stripeAccountId

      if (!stripeAccountId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Instructor has no Stripe account',
        })
      }

      const stripe = getStripe(stripeAccountId)

      if (offer.stripePriceId) {
        await stripe.prices.update(offer.stripePriceId, {
          active: false,
        })
      }

      if (offer.stripeProductId) {
        await stripe.products.update(offer.stripeProductId, {
          active: false,
        })
      }

      await prisma.offer.delete({ where: { id: offerId } })

      return { success: true }
    }),

  addReview: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        rating: z.number(),
        body: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { courseId, rating, body } = input

      const authorId = ctx.session?.profile?.id

      if (!authorId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to add a review',
        })
      }

      try {
        const newReview = await prisma.review.create({
          data: { courseId, rating, body, authorId },
        })

        return newReview
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add review',
        })
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input

      await prisma.course.delete({ where: { id } })

      return { success: true }
    }),
})
