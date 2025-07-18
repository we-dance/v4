import { saveEvent, handleImportFailure } from './manage_event'
import axios from 'axios'
import { getFacebookEvent } from './facebook_import'
import { getSchemaEvent } from './schema_import'
import { isFacebookEvent } from './linguist'

async function getRedirectedUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url)
    return response.request.res.responseUrl || url
  } catch (error) {
    return url
  }
}

async function getEventType(sourceUrl: string) {
  if (isFacebookEvent(sourceUrl)) {
    const facebookUrl = await getRedirectedUrl(sourceUrl)
    return getFacebookEvent(facebookUrl)
  }
  return getSchemaEvent(sourceUrl)
}

export async function importEvent(eventId: string, sourceUrl: string) {
  if (!sourceUrl) {
    await handleImportFailure(eventId, 'No Source URL is provided')
    return
  }
  try {
    const scrappedData = await getEventType(sourceUrl)
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
