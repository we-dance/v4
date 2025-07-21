import { task } from '@trigger.dev/sdk/v3'
import { importEvent } from '~/cli/importer/import-event/index'

export const scrape = task({
  id: 'import-event',
  run: async (payload: any, { ctx }) => {
    const { eventId, sourceUrl } = payload
    await importEvent(eventId, sourceUrl)
  },
})
