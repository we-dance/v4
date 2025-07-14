import { logger, task } from '@trigger.dev/sdk/v3'
import { getEventType } from './functions/get_event_type'
import { saveEvent } from './functions/save_event'

export const scrape = task({
  id: 'import-event',
  run: async (payload: any, { ctx }) => {
    const { eventId, sourceUrl } = payload
    logger.log('Scraper Started')

    if (!sourceUrl) {
      logger.error('No sourceUrl provided in payload', { eventId })
      return
    }

    const scrappedData = await getEventType(sourceUrl)

    if (scrappedData.type === 'import_error') {
      logger.error('Failed to scrape event data', {
        eventId,
        error: scrappedData.error,
      })
      return
    }
    await saveEvent(eventId, scrappedData)
  },
})
