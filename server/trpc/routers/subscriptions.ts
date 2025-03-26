import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import {
  createSubscriptionSchema,
  updateSubscriptionStatusSchema,
} from '~/schemas/subscription'
import { getServerSession } from '#auth'

export const subscriptionsRouter = router({
  // Get all subscriptions for the current user
  getMySubscriptions: publicProcedure.query(async ({ ctx }) => {
    const session = await getServerSession(ctx.event)

    if (!session) {
      throw new Error('You must be logged in to view your subscriptions')
    }

    return await prisma.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }),

  // Get a subscription by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to view subscriptions')
      }

      const subscription = await prisma.subscription.findUnique({
        where: {
          id,
        },
      })

      // Check if the subscription belongs to the current user
      if (subscription && subscription.userId !== session.user.id) {
        throw new Error('You do not have permission to view this subscription')
      }

      return subscription
    }),

  // Create a new subscription
  create: publicProcedure
    .input(createSubscriptionSchema)
    .mutation(async ({ input, ctx }) => {
      console.log('input:', input)
      const session = await getServerSession(ctx.event)
      console.log('session:', session)

      if (!session) {
        throw new Error('You must be logged in to create a subscription')
      }

      return await prisma.subscription.create({
        data: {
          ...input,
          userId: session.user.id,
        },
      })
    }),

  // Update subscription status (for cancellation)
  updateStatus: publicProcedure
    .input(updateSubscriptionStatusSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, status, canceledAt } = input
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to update a subscription')
      }

      // Check if the subscription exists and belongs to the current user
      const subscription = await prisma.subscription.findUnique({
        where: {
          id,
        },
      })

      if (!subscription) {
        throw new Error('Subscription not found')
      }

      if (subscription.userId !== session.user.id) {
        throw new Error(
          'You do not have permission to update this subscription'
        )
      }

      try {
        // Update the subscription status
        const updated = await prisma.subscription.update({
          where: {
            id,
          },
          data: {
            status,
            canceledAt: status === 'canceled' ? canceledAt || new Date() : null,
          },
        })

        return updated
      } catch (error) {
        console.error('Error updating subscription:', error)
        throw new Error('Failed to update subscription status')
      }
    }),

  // Delete a subscription (for admin purposes)
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to delete a subscription')
      }

      // Check if the subscription exists and belongs to the current user
      const subscription = await prisma.subscription.findUnique({
        where: {
          id,
        },
      })

      if (!subscription) {
        throw new Error('Subscription not found')
      }

      if (subscription.userId !== session.user.id) {
        throw new Error(
          'You do not have permission to delete this subscription'
        )
      }

      return await prisma.subscription.delete({
        where: {
          id,
        },
      })
    }),
})
