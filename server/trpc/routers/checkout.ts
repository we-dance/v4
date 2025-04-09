import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import Stripe from 'stripe'
import { getServerSession } from '#auth'

export const checkoutRouter = router({
  view: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { offerId } = input
      const offer = await ctx.prisma.offer.findUnique({
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
      console.log('createCheckoutSession', { input, ctx })

      const { offerId } = input
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: offerId },
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

      const subscription = await ctx.prisma.subscription.create({
        data: {
          offerId: offer.id,
          userId: ctx.session?.user.id,
          status: 'pending',
        },
      })

      // if (!ctx.session) {
      //   throw new TRPCError({
      //     code: 'UNAUTHORIZED',
      //     message: 'User not authenticated',
      //   })
      // }
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

      const buyer = {
        email: 'alex@razbakov.com',
        name: 'Alex Razbakov',
      }

      const seller = {
        stripeAccountId: 'acct_1P5TyRPfAZyf4epA',
      }

      const customer = await stripe.customers.create(
        {
          email: buyer.email,
          name: buyer.name,
        },
        {
          stripeAccount: seller.stripeAccountId,
        }
      )

      const stripeSession = await stripe.checkout.sessions.create(
        {
          customer: customer.id,
          line_items: [{ price: offer.stripePriceId, quantity: 1 }],
          mode: 'subscription',
          success_url: `${process.env.BASE_URL}/subscriptions/${subscription.id}/success`,
          cancel_url: `${process.env.BASE_URL}/subscriptions/${subscription.id}/cancel`,
        },
        {
          stripeAccount: seller.stripeAccountId,
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
