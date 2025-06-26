import crypto from 'crypto'
import { prisma } from '~/server/prisma'
import { readBody } from 'h3'
import posthog from '~/server/utils/posthog'

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { signature, timestamp, token } = body.signature

    if (!signature || !timestamp || !token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Missing required signature fields',
      })
    }

    const apiKey = useRuntimeConfig().mailgunWebhookKey

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Mailgun API key not configured',
      })
    }

    const value = timestamp + token
    const expectedSignature = crypto
      .createHmac('sha256', apiKey)
      .update(value)
      .digest('hex')

    if (signature !== expectedSignature) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid signature',
      })
    }

    const eventData = body['event-data']
    if (!eventData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing event data',
      })
    }

    const {
      event: eventType,
      message,
      timestamp: eventTimestamp,
      recipient,
      'delivery-status': deliveryStatus,
      reason,
      description,
      code,
    } = eventData

    // Find the email record by message ID
    const messageId = message?.headers?.['message-id']
    if (!messageId) {
      console.warn('No message ID found in webhook event')
      return { received: true }
    }

    // Update the email record
    const emailRecord = await prisma.emailSent.findFirst({
      where: {
        mailgunId: `<${messageId}>`,
      },
    })

    if (!emailRecord) {
      console.warn(`Email record not found for message ID: ${messageId}`)
      return { received: true }
    }

    // Parse existing events
    const existingEvents = Array.isArray((emailRecord as any).events)
      ? ((emailRecord as any).events as any[])
      : []

    // Add new event
    const newEvent = {
      event: eventType,
      timestamp: eventTimestamp,
      recipient,
      deliveryStatus,
      reason,
      description,
      code,
    }

    existingEvents.push(newEvent)

    // Determine the new status based on the event type
    let newStatus = emailRecord.status
    switch (eventType) {
      case 'accepted':
        newStatus = 'accepted'
        break
      case 'delivered':
        newStatus = 'delivered'
        break
      case 'failed':
        newStatus = 'failed'
        break
      case 'opened':
        newStatus = 'opened'
        break
      case 'clicked':
        newStatus = 'clicked'
        break
      case 'unsubscribed':
        newStatus = 'unsubscribed'
        break
      case 'complained':
        newStatus = 'complained'
        break
      case 'bounced':
        newStatus = 'bounced'
        break
      case 'rejected':
        newStatus = 'rejected'
        break
      default:
        // Keep existing status for unknown events
        break
    }

    // Update the email record
    await prisma.emailSent.update({
      where: {
        id: emailRecord.id,
      },
      data: {
        status: newStatus,
        events: existingEvents as any,
      },
    })

    if (['opened', 'clicked'].includes(newStatus)) {
      posthog.capture({
        distinctId: emailRecord.userId,
        event: 'email_' + newStatus,
        properties: {
          mailgunId: emailRecord.mailgunId,
          type: emailRecord.type,
        },
      })
    }

    console.log(`Updated email ${emailRecord.id} with event: ${eventType}`)

    return { received: true }
  } catch (error: any) {
    console.error('Mailgun webhook error:', error)

    // Re-throw if it's already a proper error
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
