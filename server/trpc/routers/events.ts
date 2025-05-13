import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const eventsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
        startDate: z.string().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const events = await prisma.event.findMany({
        take: 100,
        orderBy: { startDate: 'asc' },
        where: {
          startDate: {
            gte: input.startDate ? new Date(input.startDate) : new Date(),
          },
          venue: {
            cityId: input.city ?? undefined,
          },
          styles: {
            some: {
              id: input.community ?? undefined,
            },
          },
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
        },
      })

      return {
        events,
      }
    }),

  // Add byId procedure
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const event = await prisma.event.findUnique({
        where: { id: input },
        include: {
          venue: true,
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
          message: `No event found with id: ${input}`,
        })
      }

      return event
    } catch (error) {
      console.error('Error in event byId:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch event',
        cause: error,
      })
    }
  }),
})
