import { saveEvent, handleImportFailure } from './manage_event'
import { getEventType } from './get_event_type'

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
