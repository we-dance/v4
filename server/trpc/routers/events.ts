import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const eventsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        // status: z.enum(['upcoming', 'ongoing', 'past']).optional(),
        limit: z.number().min(1).max(100).optional().default(10),
        cursor: z.string().optional(),
        description: z.string().optional().default(''),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        published: z.boolean().optional().default(false),
        cover: z.string().optional().default(''),
        price: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        // Fetch events from the database
        const events = await ctx.prisma.event.findMany({
          take: input.limit,
          skip: input.cursor ? 1 : 0,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: { startDate: 'asc' },
          include: {
            venue: true,
            styles: true,
            organizer: true,
            creator: true,
          },
        })

        // Determine the next cursor for pagination
        let nextCursor: string | undefined = undefined
        if (events.length === input.limit) {
          nextCursor = events[events.length - 1].id
        }

        return {
          items: events,
          nextCursor,
        }
      } catch (error) {
        console.error('Error in getAll events:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch events',
          cause: error,
        })
      }
    }),

  // Add byId procedure
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const event = await ctx.prisma.event.findUnique({
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
