import { prisma } from '../../../utils/prisma'
import { generateClassFinishedEmail } from '../../../utils/email/templates/classFinished'
import { sendEmail } from '../../../utils/email/emailService'
import type { User, Event, Profile } from '@prisma/client'

interface AttendeeWithUser {
  user: Pick<User, 'firstName' | 'email' | 'id'>
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Event ID is required',
    })
  }

  const body = await readBody(event)
  const { hoursAfterClass = 24 } = body

  // Get event details
  const eventDetails = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: true,
      styles: true,
      guests: {
        include: {
          profile: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!eventDetails) {
    throw createError({
      statusCode: 404,
      message: 'Event not found',
    })
  }

  // Check if enough time has passed since event ended
  const eventEndTime = eventDetails.endDate
  const hoursElapsed = (Date.now() - eventEndTime.getTime()) / (1000 * 60 * 60)
  
  if (hoursElapsed < hoursAfterClass) {
    throw createError({
      statusCode: 400,
      message: `Cannot send feedback email until ${hoursAfterClass} hours after event ends`,
    })
  }

  // Find similar events
  const similarEvents = await prisma.event.findMany({
    where: {
      OR: [
        { organizerId: eventDetails.organizerId },
        {
          styles: {
            some: {
              id: {
                in: eventDetails.styles.map(style => style.id)
              }
            }
          }
        },
      ],
      id: { not: eventDetails.id },
      startDate: { gt: new Date() },
    },
    take: 3,
    orderBy: { startDate: 'asc' },
  })

  // Send email to each attendee
  const emailPromises = eventDetails.guests
    .filter((guest) => guest.profile?.user?.email && guest.profile.user.firstName)
    .map(async (guest) => {
      if (!guest.profile?.user) return

      const emailData = {
        firstName: guest.profile.user.firstName!,
        className: eventDetails.name,
        classDate: eventDetails.startDate.toLocaleDateString(),
        classTime: `${eventDetails.startDate.toLocaleTimeString()} - ${eventDetails.endDate.toLocaleTimeString()}`,
        instructorName: `${eventDetails.organizer.name}`,
        feedbackUrl: `${process.env.BASE_URL}/events/${eventDetails.id}/feedback?userId=${guest.profile.user.id}`,
        similarClasses: similarEvents,
        unsubscribeUrl: `${process.env.BASE_URL}/settings/notifications`,
      }

      const email = generateClassFinishedEmail(emailData)
      
      return sendEmail({
        to: guest.profile.user.email!,
        ...email,
      })
    })

  try {
    await Promise.all(emailPromises.filter((p): p is Promise<void> => p !== undefined))
    return { success: true, message: 'Feedback emails sent successfully' }
  } catch (error) {
    console.error('Error sending feedback emails:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send feedback emails',
    })
  }
}) 