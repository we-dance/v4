import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { stripe } from '~/server/utils/stripe'
import { prisma } from '~/server/prisma'

export const checkoutRouter = router({
  view: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .query(async ({ input }) => {
      const { offerId } = input
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          course: {
            include: {
              instructor: true,
            },
          },
        },
      })

      if (!offer) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Offer not found' })
      }

      return offer
    }),
  createCheckoutSession: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const { offerId } = input
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          course: {
            include: {
              instructor: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      })

      if (!offer) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Offer not found' })
      }

      if (!offer.stripePriceId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Offer does not have a Stripe price',
        })
      }

      if (!offer.course.instructor?.user?.stripeAccountId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Instructor does not have a Stripe account',
        })
      }

      if (!session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      const subscription = await prisma.subscription.create({
        data: {
          offerId: offer.id,
          userId: session.user.id,
          status: 'pending',
        },
      })

      const stripeAccount = offer.course.instructor.user.stripeAccountId

      const customer = await stripe.customers.create(
        {
          email: session.user.email,
          name: session.user.firstName + ' ' + session.user.lastName,
        },
        {
          stripeAccount,
        }
      )

      const { appUrl } = useRuntimeConfig(event)
      const stripeSession = await stripe.checkout.sessions.create(
        {
          customer: customer.id,
          line_items: [{ price: offer.stripePriceId, quantity: 1 }],
          mode: 'subscription',
          success_url: `${appUrl}/subscriptions/${subscription.id}/success`,
          cancel_url: `${appUrl}/subscriptions/${subscription.id}/cancel`,
          metadata: {
            subscriptionId: subscription.id,
            stripeAccount,
          },
        },
        {
          stripeAccount,
        }
      )

      if (!stripeSession?.url) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create checkout session',
        })
      }

      return { url: stripeSession.url }
    }),
})
