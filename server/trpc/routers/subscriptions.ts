import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import {
  createSubscriptionSchema,
  updateSubscriptionStatusSchema,
} from '~/schemas/subscription'
import { getServerSession } from '#auth'
import { stripeService } from '~/server/services/stripe'

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

      if (subscription && subscription.userId !== session.user.id) {
        throw new Error('You do not have permission to view this subscription')
      }

      return subscription
    }),

  // Create a new subscription
  create: publicProcedure
    .input(createSubscriptionSchema)
    .mutation(async ({ input, ctx }) => {
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to create a subscription')
      }

      const {
        name,
        plan,
        price,
        currency,
        interval,
        status,
        nextBillingDate,
        canceledAt,
        stripeCustomerId,
        stripeSubscriptionId,
        stripePriceId,
      } = input

      const existing = await prisma.subscription.findFirst({
        where: {
          userId: session.user.id,
          status: 'active',
          plan,
        },
      })

      if (existing) {
        throw new Error(
          'You already have an active subscription for this plan.'
        )
      }

      try {
        return await prisma.subscription.create({
          data: {
            userId: session.user.id,
            name,
            plan,
            price,
            currency,
            interval,
            status,
            nextBillingDate,
            canceledAt,
            stripeCustomerId,
            stripeSubscriptionId,
            stripePriceId,
          },
        })
      } catch (error) {
        console.error('Error creating subscription:', error)
        throw new Error('Failed to create subscription')
      }
    }),

  // Retrieve Stripe session details
  getStripeSessionDetails: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const session = await getServerSession(ctx.event)
      if (!session) {
        throw new Error(
          'You must be logged in to retrieve subscription details'
        )
      }

      try {
        const stripeSession = await stripeService.getCheckoutSession(
          input.sessionId
        )
        return {
          stripeCustomerId: stripeSession.stripeCustomerId,
          stripeSubscriptionId: stripeSession.stripeSubscriptionId,
          stripePriceId: stripeSession.stripePriceId,
        }
      } catch (error) {
        console.error('Error retrieving Stripe session:', error)
        throw new Error('Failed to retrieve Stripe session details')
      }
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
        return await prisma.subscription.update({
          where: {
            id,
          },
          data: {
            status,
            canceledAt: status === 'canceled' ? canceledAt || new Date() : null,
          },
        })
      } catch (error) {
        console.error('Error updating subscription:', error)
        throw new Error('Failed to update subscription status')
      }
    }),

  // Delete a subscription
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to delete a subscription')
      }

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

  // Modified checkout session creation
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        offeringId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to subscribe')
      }

      const { courseId, offeringId, successUrl, cancelUrl } = input

      try {
        const checkoutSession = await stripeService.createCheckoutSession({
          userId: session.user.id,
          email: session.user.email as string,
          courseId,
          offeringId,
          successUrl,
          cancelUrl,
        })

        return { sessionId: checkoutSession.id, url: checkoutSession.url }
      } catch (error) {
        console.log(input)
        console.error('Error creating checkout session:', error)
        throw new Error('Failed to create checkout session')
      }
    }),

  cancelStripeSubscription: publicProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { subscriptionId } = input
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new Error('You must be logged in to cancel a subscription')
      }

      const subscription = await prisma.subscription.findFirst({
        where: {
          stripeSubscriptionId: subscriptionId,
          userId: session.user.id,
        },
      })

      if (!subscription) {
        throw new Error('Subscription not found or does not belong to you')
      }

      try {
        await stripeService.cancelSubscription(subscriptionId)

        return await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: 'canceled',
            canceledAt: new Date(),
          },
        })
      } catch (error) {
        console.error('Error canceling subscription:', error)
        throw new Error('Failed to cancel subscription')
      }
    }),
})
