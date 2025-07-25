import { task, logger } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { fetchEvent } from '../cli/import-event/index'

export const scrape = task({
  id: 'import-event',
  run: async (payload: any, { ctx }) => {
    const { eventId } = payload

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { sourceUrl: true },
    })

    if (!event || !event.sourceUrl) {
      throw new Error('Event not found or has no sourceUrl')
    }
    logger.log('Found evet to be updated in database')

    const scrappedData = await fetchEvent(event.sourceUrl)

    await prisma.event.update({
      where: { id: eventId },
      data: scrappedData,
    })
    logger.log('Scrape was successful', eventId)
  },
})
