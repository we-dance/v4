import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function saveEvent(eventId: string, eventDataForPrisma: any) {
  try {
    await prisma.event.update({
      where: { id: eventId },
      data: eventDataForPrisma,
    })
    console.log('Scrape was succesfull', { eventId })
  } catch (error) {
    console.error('Failed to update event in database', { eventId, error })
    throw error
  }
}

export async function handleImportFailure(
  eventId: string,
  reason: string,
  error?: any
) {
  console.error(reason, { eventId, error })
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
    console.log('Marked event as import_failed', { eventId })
  } catch (error) {
    console.error('Failed to update event to import_failed.', {
      eventId,
      error: error,
    })
  }
}
