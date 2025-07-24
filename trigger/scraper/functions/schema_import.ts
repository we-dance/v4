const WAE = require('web-auto-extractor').default
const TurndownService = require('turndown')
import { prisma } from '~/server/prisma'
import { decode } from 'html-entities'
import axios from 'axios'
import { getCityId, getPlace } from './google_maps'
import { getUploadedImage } from './cloudinary'
import {
  getSuggestedType,
  getUrlsFromText,
  isFacebookEvent,
  getSuggestedStyles,
} from './linguist'

async function getEvent(url: string) {
  let response
  try {
    response = await axios.get(url)
  } catch (error) {
    return null
  }

  const data = response.data
  const facebookUrlsList = getUrlsFromText(data)
    .filter((u) => isFacebookEvent(u))
    .filter((v, i, a) => a.indexOf(v) === i)

  const parsed = WAE().parse(data)

  const result: any[] = []

  const eventTypes = [
    'Event',
    'SocialEvent',
    'Festival',
    'DanceEvent',
    'MusicEvent',
  ]

  eventTypes.forEach((eventType) => {
    if (parsed.jsonld[eventType]) {
      for (const e of parsed.jsonld[eventType]) {
        result.push(e)
      }
    }

    if (parsed.microdata[eventType]) {
      for (const e of parsed.jsonld[eventType]) {
        result.push(e)
      }
    }
  })

  const event = result[0]
  if (!event) {
    return null
  }

  event.facebookUrlsCount = facebookUrlsList.length
  event.facebookUrlsList = facebookUrlsList
  event.schemaEventsCount = result.length
  event.facebook = facebookUrlsList.length > 0 ? facebookUrlsList[0] : ''

  return event
}

export async function getSchemaEvent(url: string, cloudinaryConfig: any) {
  const event = await getEvent(url)
  if (!event) {
    return {
      type: 'import_error',
      errorCode: 'no_event',
      error: 'No event found',
    }
  }

  event.name = decode(String(event.name))
  const turndownService = new TurndownService()
  event.description = turndownService.turndown(
    decode(String(event.description))
  )

  const venueName = event.location?.name || ''
  const venueAddress = event.location?.address?.streetAddress || ''
  const venueCountry = event.location?.addressCountry?.addressCountry || ''

  let venue: any = ''

  if (venueName) {
    venue = await getPlace(venueName, venueCountry || 'de')
  }

  if (!venue?.place_id && venueAddress) {
    venue = await getPlace(venueAddress, venueCountry || 'de')
  }

  let place: any = ''

  if (!venue?.place_id) {
    venue = ''
  }

  if (venue) {
    place = await getCityId(venue)
  }

  let eventType = getSuggestedType(event.name + ' ' + event.description)

  // how many days the event is
  const days =
    (+new Date(event.endDate) - +new Date(event.startDate)) /
    (1000 * 60 * 60 * 24)

  if (days > 1) {
    eventType = 'Festival'
  }

  const styles = await getSuggestedStyles(event.name + ' ' + event.description)

  const hash = +new Date(event.startDate) + '+' + venue?.place_id
  const eventPhoto = await getUploadedImage(event.image || '', cloudinaryConfig)

  const offer = event.offers?.find((o: any) => o.price) || null

  return {
    name: event.name,
    description: event.description,
    eventType,
    cover: eventPhoto,
    startDate: +new Date(event.startDate),
    endDate: +new Date(event.endDate),
    venue,
    place,
    price: offer ? `${offer.price} ${offer.priceCurrency}` : '',
    link: Array.isArray(event.url) ? event.url[0] : event.url || '',
    type: 'event',
    visibility: 'Public',
    form: 'No',
    online: 'No',
    international: 'No',
    claimed: 'No',
    duration: 60,
    styles,
    artists: [],
    org: '', // can we get it from event.organizer
    program: [],
    watch: {
      count: 0,
      usernames: [],
    },
    hash,
    source: 'schema',
    facebookUrlsCount: event.facebookUrlsCount,
    facebookUrlsList: event.facebookUrlsList,
    schemaEventsCount: event.schemaEventsCount,
    facebook: event.facebook,
  }
}
