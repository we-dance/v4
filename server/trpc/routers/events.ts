import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { nanoid } from 'nanoid'
import { getSlug } from '~/utils/slug'

export const eventsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
        startDate: z.string().optional().nullable(),
        type: z.string().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const baseDate = input.startDate ? new Date(input.startDate) : new Date()
      const startOfDay = new Date(baseDate)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(baseDate)
      endOfDay.setHours(23, 59, 59, 999)

      const commonWhere = {
        venue: { cityId: input.city ?? undefined },
        styles: { some: { id: input.community ?? undefined } },
        type: input.type === 'all' ? undefined : input.type,
        OR: [
          { name: { contains: input.query, mode: 'insensitive' } },
          { description: { contains: input.query, mode: 'insensitive' } },
        ],
      }
      const events = await prisma.event.findMany({
        where: {
          startDate: { gte: startOfDay, lte: endOfDay },
          ...commonWhere,
        },
        include: {
          venue: { include: { city: true } },
          organizer: true,
        },
        orderBy: { startDate: 'asc' },
      })

      const next = await prisma.event.findFirst({
        where: {
          startDate: { gt: endOfDay },
          ...commonWhere,
        },
        orderBy: { startDate: 'asc' },
        select: { startDate: true },
      })

      return {
        events,
        nextPage: next ? next.startDate.toISOString().slice(0, 10) : null,
      }
    }),

  myList: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const events = await prisma.event.findMany({
        where: {
          organizerId: ctx.session?.user.id,
          OR: [
            {
              name: {
                contains: input.query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: input.query,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          venue: {
            include: {
              city: true,
            },
          },
          organizer: true,
          _count: {
            select: {
              guests: true,
            },
          },
        },
      })

      return { events }
    }),

  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      })
    }

    return event
  }),

  feed: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: true,
          },
        },
        posts: {
          include: {
            author: true,
            style: true,
            city: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    return event
  }),

  guests: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: true,
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      })
    }

    return event
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string().optional(),
        cover: z.string().optional(),
        status: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        venue: z
          .object({
            id: z.string().optional(),
          })
          .optional()
          .nullable(),
        organizer: z
          .object({
            id: z.string().optional(),
          })
          .optional()
          .nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, venue, organizer, ...data } = input
      const event = await prisma.event.update({
        where: { id },
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
          venueId: venue?.id,
          organizerId: organizer?.id,
        },
      })
      return event
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input
      const slug = getSlug(name)
      const event = await prisma.event.create({
        data: {
          name,
          slug,
          shortId: nanoid(5),
          creatorId: ctx.session?.profile?.id,
          organizerId: ctx.session?.profile?.id,
          status: 'draft',
        },
      })
      return event
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const event = await prisma.event.delete({
        where: { id },
      })
      return event
    }),
  rsvp: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        status: z.enum(['registered', 'interested', 'cancelled']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, status } = input
      const profileId = ctx.session?.profile?.id

      if (!profileId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to RSVP',
        })
      }

      const event = await prisma.guest.upsert({
        where: {
          profileId_eventId: {
            profileId,
            eventId,
          },
        },
        update: {
          status,
        },
        create: {
          eventId,
          profileId,
          status,
          role: 'attendee',
        },
      })

      return event
    }),
})
