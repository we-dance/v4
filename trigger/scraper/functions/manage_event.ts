import { logger } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { getSlug } from '~/cli/utils/slug'

export async function saveEvent(eventId: string, eventDataForPrisma: any) {
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
    const errorMessage = error ? `${reason}: ${String(error)}` : reason
    await prisma.event.update({
      where: { id: eventId },
      data: {
        name: 'Failed import',
        slug: 'failed-import',
        status: 'import_failed',
        importError: errorMessage,
      },
    })
    logger.log('Marked event as import_failed', { eventId })
  } catch (error) {
    logger.error('Failed to update event to import_failed.', {
      eventId,
      error: error,
    })
  }
}
