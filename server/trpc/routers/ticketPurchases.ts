import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const ticketPurchasesRouter = router({
  myPurchases: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      })
    }

    const purchases = await prisma.ticketPurchase.findMany({
      where: {
        userId: ctx.session.user.id,
        status: 'completed',
      },
      include: {
        event: {
          include: {
            venue: {
              include: {
                city: true,
              },
            },
            organizer: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return purchases
  }),

  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      })
    }

    const purchase = await prisma.ticketPurchase.findUnique({
      where: { id: input },
      include: {
        ticket: true,
        event: {
          include: {
            venue: {
              include: {
                city: true,
              },
            },
            organizer: true,
          },
        },
        user: true,
      },
    })

    if (!purchase) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Ticket purchase not found',
      })
    }

    // Only allow user to see their own purchases
    if (purchase.userId !== ctx.session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Access denied',
      })
    }

    return purchase
  }),

  // For event organizers to see purchases for their events
  eventPurchases: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.profile) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      const event = await prisma.event.findUnique({
        where: { id: input },
        include: { organizer: true },
      })

      if (!event || event.organizerId !== ctx.session.profile.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Access denied',
        })
      }

      const purchases = await prisma.ticketPurchase.findMany({
        where: {
          eventId: input,
          status: 'completed',
        },
        include: {
          ticket: true,
          user: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return purchases
    }),
})
