import { logger, task, wait } from '@trigger.dev/sdk/v3'
import { prisma } from '../server/prisma'
import { z } from 'zod'

export const capitalizeTitle = task({
  id: 'capitalize-title',

  run: async (payload: { eventId: string }, { ctx }) => {
    logger.info('Payload arrived', payload)

    const event = await prisma.event.findUnique({
      where: { id: payload.eventId },
    })
    if (!event) {
      logger.error('Payload not found', payload)
      return
    }

    const newName = event.name.toUpperCase()

    await prisma.event.update({
      where: { id: payload.eventId },
      data: { name: newName },
    })

    logger.info('Event Title capitalized ', { id: event.id, newName })
    return { success: true }
  },
})
