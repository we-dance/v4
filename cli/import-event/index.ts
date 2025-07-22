import axios from 'axios'
import { getFacebookEvent } from './facebook_import'
import { getSchemaEvent } from './schema_import'
import { isFacebookEvent } from '../utils/linguist'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//database operations
async function saveEvent(eventId: string, eventDataForPrisma: any) {
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

async function handleImportFailure(
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

async function getRedirectedUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url)
    return response.request.res.responseUrl || url
  } catch (error) {
    return url
  }
}

export async function fetchEvent(sourceUrl: string) {
  if (isFacebookEvent(sourceUrl)) {
    const facebookUrl = await getRedirectedUrl(sourceUrl)
    return getFacebookEvent(facebookUrl)
  }
  return getSchemaEvent(sourceUrl)
}

export async function importEvent(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { sourceUrl: true },
  })

  if (!event || !event.sourceUrl) {
    await handleImportFailure(
      eventId,
      'Event not found in the databse or it has no source URL'
    )
    return
  }

  try {
    const scrappedData = await fetchEvent(event.sourceUrl)
    if (scrappedData.type === 'import_error') {
      await handleImportFailure(
        eventId,
        'Failed to scrape event data',
        scrappedData.error
      )
      return
    }
    await saveEvent(eventId, scrappedData)
  } catch (error) {
    await handleImportFailure(
      eventId,
      'An unexpected error occurred during scrape process',
      error
    )
  }
}
