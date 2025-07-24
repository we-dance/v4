import { Prisma } from '@prisma/client'
import { sendEmail } from '~/server/utils/email'

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

// Format ISO date for JSON-LD
const formatISODate = (date: Date | null) => {
  if (!date) return ''
  return date.toISOString()
}

// Calculate end date (assume 2 hours if not specified)
const getEndDate = (startDate: Date | null, endDate: Date | null) => {
  if (endDate) return endDate
  if (!startDate) return null
  const end = new Date(startDate)
  end.setHours(end.getHours() + 2) // Default 2-hour duration
  return end
}

export async function sendTicketPurchaseConfirmationEmail(
  ticketPurchase: Prisma.TicketPurchaseGetPayload<{
    include: {
      event: {
        include: {
          venue: true
          organizer: true
        }
      }
      ticket: true
      user: {
        include: {
          profile: true
        }
      }
    }
  }>
) {
  const endDate = getEndDate(
    ticketPurchase.event.startDate,
    ticketPurchase.event.endDate
  )

  const appUrl = useRuntimeConfig().public.appUrl

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

    // JSON-LD structured data parameters for Gmail calendar cards
    eventStartDateTime: formatISODate(ticketPurchase.event.startDate),
    eventEndDateTime: formatISODate(endDate),
    eventDescription:
      ticketPurchase.event.description ||
      `Join us for ${ticketPurchase.event.name}`,
    eventImageUrl: `${appUrl}/icon.png`, // Default event image
    organizerName: ticketPurchase.event.organizer?.name || 'WeDance',
    organizerUrl: ticketPurchase.event.organizer?.website || appUrl,
    ticketPrice: (ticketPurchase.ticket.price / 100).toString(),
    ticketCurrency: ticketPurchase.currency.toUpperCase(),
  }

  await sendEmail('ticket-purchase-confirmation', emailParams)
}
