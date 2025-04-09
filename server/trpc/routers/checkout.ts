import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'
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

      const userSession = await getServerSession(ctx.event)
      if (!userSession) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

      const customer = await stripe.customers.create({
        email: userSession.user.email,
        name: userSession.user.firstName + ' ' + userSession.user.lastName,
      })

      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [{ price: offer.stripePriceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/checkout/${offerId}/success`,
        cancel_url: `${process.env.BASE_URL}/checkout/${offerId}/cancel`,
      })

      if (!session?.url) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create checkout session',
        })
      }

      return { url: session.url }
    }),
})
