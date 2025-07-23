import { prisma } from '~/server/prisma'
import { getStripe } from '~/server/utils/stripe'
import { sendEmail } from '~/server/utils/email'

export default eventHandler(async (event) => {
  const body = await readRawBody(event, false)

  let stripeEvent: any = body

  const signature = getHeader(event, 'stripe-signature')

  if (!body) {
    return { error: 'Invalid request body' }
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' }
  }

  const stripe = getStripe()

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      useRuntimeConfig().stripeWebhookSecret
    )
  } catch (err) {
    const errorMessage =
      'stripe.webhooks.constructEvent: ' + (err as Error).message

    return {
      error: errorMessage,
    }
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const checkoutSession = stripeEvent.data.object

      // Handle ticket purchases
      if (checkoutSession.metadata.ticketPurchaseId) {
        const ticketPurchase = await prisma.ticketPurchase.findUnique({
          where: {
            id: checkoutSession.metadata.ticketPurchaseId,
          },
          include: {
            event: {
              include: {
                venue: true,
                organizer: true,
              },
            },
            ticket: true,
            user: {
              include: {
                profile: true,
              },
            },
          },
        })

        if (!ticketPurchase) {
          return { error: 'Ticket purchase not found' }
        }

        await prisma.ticketPurchase.update({
          where: { id: ticketPurchase.id },
          data: {
            status: 'completed',
            stripeCheckoutSessionId: checkoutSession.id,
            stripePaymentIntentId: checkoutSession.payment_intent,
          },
        })

        // Auto-create Guest record for the purchaser and link to purchase
        if (ticketPurchase.user.profile) {
          const guest = await prisma.guest.upsert({
            where: {
              profileId_eventId: {
                profileId: ticketPurchase.user.profile.id,
                eventId: ticketPurchase.eventId,
              },
            },
            update: {
              status: 'registered',
              registeredAt: new Date(),
            },
            create: {
              profileId: ticketPurchase.user.profile.id,
              eventId: ticketPurchase.eventId,
              role: 'attendee',
              status: 'registered',
              registeredAt: new Date(),
            },
          })

          // Link the ticket purchase to the guest record
          await prisma.ticketPurchase.update({
            where: { id: ticketPurchase.id },
            data: { guestId: guest.id },
          })
        }

        // Send ticket purchase confirmation email
        try {
          const appUrl = useRuntimeConfig().public.appUrl

          // Format currency amount (convert from cents to proper format)
          const formatCurrency = (amountInCents: number, currency: string) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
            }).format(amountInCents / 100)
          }

          // Format date and time
          const formatDate = (date: Date | null) => {
            if (!date) return ''
            return new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(date)
          }

          const formatTime = (date: Date | null) => {
            if (!date) return ''
            return new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(date)
          }

          // Prepare email parameters
          const emailParams = {
            userId: ticketPurchase.userId,
            email: ticketPurchase.user.email,
            name: ticketPurchase.user.firstName || ticketPurchase.user.name,
            eventName: ticketPurchase.event.name,
            eventDate: formatDate(ticketPurchase.event.startDate),
            eventTime: formatTime(ticketPurchase.event.startDate),
            eventUrl: `${appUrl}/events/${ticketPurchase.event.id}`,
            venueName: ticketPurchase.event.venue?.name || '',
            venueAddress: ticketPurchase.event.venue?.name || '', // You might want to add address field to venue
            ticketName: ticketPurchase.ticket.name,
            quantity: ticketPurchase.quantity.toString(),
            totalAmount: formatCurrency(
              ticketPurchase.totalAmount,
              ticketPurchase.currency
            ),
            ticketItems: ticketPurchase.ticket.items || '',
            organizerContact: ticketPurchase.event.organizer?.name || '',
          }

          await sendEmail('ticket-purchase-confirmation', emailParams)
        } catch (emailError) {
          console.error('Failed to send ticket confirmation email:', emailError)
          // Don't fail the webhook if email sending fails
        }

        return { received: true }
      }

      // Handle course subscriptions
      if (!checkoutSession.metadata.subscriptionId) {
        return { error: 'Subscription ID not found' }
      }

      const stripeAccount = checkoutSession.metadata.stripeAccount

      let nextBillingDate: Date | null = null

      if (checkoutSession.subscription) {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          checkoutSession.subscription,
          {
            stripeAccount,
          }
        )

        nextBillingDate = new Date(
          stripeSubscription.items.data[0].current_period_end * 1000
        )
      }

      const subscription = await prisma.subscription.findUnique({
        where: {
          id: checkoutSession.metadata.subscriptionId,
        },
      })

      if (!subscription) {
        return { error: 'Subscription not found' }
      }

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: 'active',
          nextBillingDate,
          stripeSubscriptionId: checkoutSession.subscription,
        },
      })

      break
  }

  return { received: true }
})
