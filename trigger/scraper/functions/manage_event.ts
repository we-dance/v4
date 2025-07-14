import { logger } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { getSlug } from '~/cli/utils/slug'

export async function saveEvent(eventId: string, scrappedData: any) {
  const styleHashtags = scrappedData.styles
    ? Object.keys(scrappedData.styles)
    : []

  const eventDataForPrisma = {
    name: scrappedData.name,
    slug: getSlug(scrappedData.name),
    description: scrappedData.description,
    cover: scrappedData.cover,
    startDate: scrappedData.startDate
      ? new Date(scrappedData.startDate)
      : new Date(),
    endDate: scrappedData.endDate ? new Date(scrappedData.endDate) : null,
    type: scrappedData.type,
    price: scrappedData.price,
    sourceUrl: scrappedData.link,
    organizerId:
      (typeof scrappedData.org === 'object' && scrappedData.org?.id) || null,
    venueId: scrappedData.venue?.id || null,
    status: 'published',
    styles: {
      connect: styleHashtags.map((hashtag) => ({
        hashtag: hashtag,
      })),
    },
  }
  try {
    await prisma.event.update({
      where: { id: eventId },
      data: eventDataForPrisma,
    })
    logger.log('Scrape was succesfull', { eventId })
  } catch (error) {
    logger.error('Failed to update event in databse', { eventId, error })
    throw error
  }
}

export async function handleImportFailure(
  eventId: string,
  reason: string,
  error?: any
) {
  logger.error(reason, { eventId, error })
  try {
    const errorMessage = error ? `${reason}: ${JSON.stringify(error)}` : reason
    await prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'import_failed',
        importError: errorMessage,
      },
    })
    logger.log('Marked evet as import_failed', { eventId })
  } catch (e) {
    logger.error('Failed to update event to import_failed.', {
      eventId,
      error: e,
    })
  }
}
