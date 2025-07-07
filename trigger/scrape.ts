import { logger, task, wait } from '@trigger.dev/sdk/v3'
import { prisma } from '../server/prisma'
import { isFacebookEvent, slugify } from '~/server/utils/linguist'
import { getFacebookEvent } from '~/server/utils/facebook_imports'
import { getSchemaEvent } from '~/server/utils/schema_imports'
import axios from 'axios'

export const scrape = task({
  id: 'scrape-and-fill-events',
  run: async (payload: any, { ctx }) => {
    const { eventId, sourceUrl } = payload
    logger.log('Scraper Started')

    if (!sourceUrl) {
      logger.error('No sourceUrl provided in payload', { eventId })
      return
    }

    async function getRedirectedUrl(url: string): Promise<string> {
      try {
        const response = await axios.get(url)
        return response.request.res.responseUrl || url
      } catch (error) {
        logger.error('Failed to get redirected url', { url, error })
        return url
      }
    }
    let scrappedData: any
    if (isFacebookEvent(sourceUrl)) {
      const facebookUrl = await getRedirectedUrl(sourceUrl)
      scrappedData = await getFacebookEvent(facebookUrl)
    } else {
      scrappedData = await getSchemaEvent(sourceUrl)
    }
    if (scrappedData.type === 'import_error') {
      logger.error('Failed to scrape event data', {
        eventId,
        error: scrappedData.error,
      })
      return
    }
    const eventDataForPrisma = {
      name: scrappedData.name,
      slug: slugify(scrappedData.name),
      description: scrappedData.description,
      cover: scrappedData.cover,
      startDate: new Date(scrappedData.startDate),
      endDate: scrappedData.endDate ? new Date(scrappedData.endDate) : null,
      type: scrappedData.type,
      price: scrappedData.price,
      sourceUrl: scrappedData.link,
      organizerId: scrappedData.org?.id || null,
      venueId: scrappedData.venue?.id || null,
      status: 'published',
    }

    try {
      await prisma.event.update({
        where: { id: eventId },
        data: eventDataForPrisma,
      })
      logger.log('Scrape was succesfull', { eventId })
    } catch (error) {
      logger.error('Failed to update event in databse', { eventId, error })
    }
  },
})
