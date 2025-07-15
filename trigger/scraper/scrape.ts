import { logger, task } from '@trigger.dev/sdk/v3'
import { getEventType } from './functions/get_event_type'
import { saveEvent, handleImportFailure } from './functions/manage_event'

export const scrape = task({
  id: 'import-event',
  run: async (payload: any, { ctx }) => {
    const { eventId, sourceUrl } = payload
    logger.log('Scraper Started')

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
  },
})
