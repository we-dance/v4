import { logger, task, wait } from '@trigger.dev/sdk/v3'
import { prisma } from '../server/prisma'
import { isFacebookEvent } from '~/server/utils/linguist'
import { getFacebookEvent } from '~/server/utils/facebook_import'
import { getSchemaEvent } from '~/server/utils/schema_import'
import axios from 'axios'
import { loadNuxtConfig } from 'nuxt/kit'
import { getSlug } from '~/utils/slug'

export const scrape = task({
  id: 'import-event',
  run: async (payload: any, { ctx }) => {
    //manually load nuxt config because this task runs outside of the server envorinemt
    const nuxtConfig = await loadNuxtConfig({ cwd: process.cwd() })

    //config created here to inject as a dependecy into scraper funcs
    const cloudinaryConfig = {
      cloud_name: nuxtConfig.runtimeConfig.public.cloudinaryCloudName,
      api_key: nuxtConfig.runtimeConfig.cloudinaryApiKey,
      api_secret: nuxtConfig.runtimeConfig.cloudinaryApiSecret,
    }

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
      scrappedData = await getFacebookEvent(facebookUrl, cloudinaryConfig)
    } else {
      scrappedData = await getSchemaEvent(sourceUrl, cloudinaryConfig)
    }
    if (scrappedData.type === 'import_error') {
      logger.error('Failed to scrape event data', {
        eventId,
        error: scrappedData.error,
      })
      return
    }

    // Get the style hashtags from the scraped data
    const styleHashtags = scrappedData.styles
      ? Object.keys(scrappedData.styles)
      : []

    const eventDataForPrisma = {
      name: scrappedData.name,
      slug: getSlug(scrappedData.name),
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
    }
  },
})
