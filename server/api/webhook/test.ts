import { prisma } from '~/server/prisma'
import { sendTicketPurchaseConfirmationEmail } from '~/server/utils/ticket'

export default eventHandler(async (event) => {
  try {
    const ticketPurchase = await prisma.ticketPurchase.findUnique({
      where: {
        id: 'ISoa4Azu-VkYL6Mk0Kl8L',
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
      return {
        error: 'Ticket purchase not found',
      }
    }

    await sendTicketPurchaseConfirmationEmail(ticketPurchase)
  } catch (emailError) {
    console.error('Failed to send ticket confirmation email:', emailError)
  }

  return {
    success: true,
  }
})
