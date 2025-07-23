import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { getStripe } from '~/server/utils/stripe'
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

  viewTicket: publicProcedure
    .input(z.object({ ticketId: z.string() }))
    .query(async ({ input }) => {
      const { ticketId } = input
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: {
            include: {
              organizer: true,
              venue: true,
            },
          },
        },
      })

      if (!ticket) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Ticket not found' })
      }

      return ticket
    }),
  createCheckoutSession: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const appUrl = useRuntimeConfig().public.appUrl

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

      const stripe = getStripe()

      const customer = await stripe.customers.create(
        {
          email: session.user.email,
          name: session.user.firstName + ' ' + session.user.lastName,
        },
        {
          stripeAccount,
        }
      )

      const stripeSession = await stripe.checkout.sessions.create(
        {
          customer: customer.id,
          line_items: [{ price: offer.stripePriceId, quantity: 1 }],
          mode: offer.duration === 'ONETIME' ? 'payment' : 'subscription',
          success_url: `${appUrl}/subscriptions/${subscription.id}/success`,
          cancel_url: `${appUrl}/subscriptions/${subscription.id}/cancel`,
          discounts: [],
          allow_promotion_codes: true,
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

  createTicketCheckoutSession: publicProcedure
    .input(z.object({ ticketId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const appUrl = useRuntimeConfig().public.appUrl

      const { session } = ctx
      const { ticketId } = input
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: {
            include: {
              organizer: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      })

      if (!ticket) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Ticket not found' })
      }

      if (!ticket.stripePriceId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ticket does not have a Stripe price',
        })
      }

      if (!ticket.event.organizer?.user?.stripeAccountId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Event organizer does not have a Stripe account',
        })
      }

      if (!session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      // Create ticket purchase record
      const ticketPurchase = await prisma.ticketPurchase.create({
        data: {
          userId: session.user.id,
          ticketId: ticket.id,
          eventId: ticket.event.id,
          status: 'pending',
          totalAmount: ticket.price,
          currency: ticket.currency,
        },
      })

      const stripeAccount = ticket.event.organizer.user.stripeAccountId

      const stripe = getStripe()

      const customer = await stripe.customers.create(
        {
          email: session.user.email,
          name: session.user.firstName + ' ' + session.user.lastName,
        },
        {
          stripeAccount,
        }
      )

      const stripeSession = await stripe.checkout.sessions.create(
        {
          customer: customer.id,
          line_items: [{ price: ticket.stripePriceId, quantity: 1 }],
          mode: 'payment',
          success_url: `${appUrl}/events/${ticket.event.id}/ticket-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/events/${ticket.event.id}`,
          discounts: [],
          allow_promotion_codes: true,
          metadata: {
            ticketId: ticket.id,
            eventId: ticket.event.id,
            ticketPurchaseId: ticketPurchase.id,
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
