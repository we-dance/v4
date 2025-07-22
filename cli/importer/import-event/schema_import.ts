const WAE = require('web-auto-extractor').default
const TurndownService = require('turndown')
import { decode } from 'html-entities'
import axios from 'axios'
import { getCityId, getPlace } from '../../utils/google_maps'
import { getUploadedImage } from '../../utils/cloudinary'
import {
  getSuggestedType,
  getUrlsFromText,
  isFacebookEvent,
  getSuggestedStyles,
} from '../../utils/linguist'
import { getSlug } from '../../../utils/slug'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function getDate(timestamp: any) {
  if (!timestamp) {
    return ''
  }

  return timestamp * 1000
}

async function getOrg(
  host: any,
  place: any
): Promise<null | {
  id: string
  name: string
  username?: string
  photo?: string
}> {
  if (!host?.name) {
    return null
  }

  let orgUrl = host.url || ''
  if (orgUrl.startsWith('www')) {
    orgUrl = 'https://' + orgUrl
  }

  const orgWebsite = orgUrl
  if (orgWebsite) {
    const profile = await prisma.profile.findFirst({
      where: { website: orgWebsite },
    })
    if (profile) {
      return {
        id: profile.id,
        name: profile.name || profile.username || '',
        photo: profile.photo || undefined,
      }
    }
  }

  let username = getSlug(host?.name)
  const existingProfile = await prisma.profile.findUnique({
    where: { username },
  })
  if (existingProfile) {
    return {
      id: existingProfile.id,
      name: existingProfile.name || existingProfile.username || '',
      photo: existingProfile.photo || undefined,
    }
  }

  const orgPhoto = await getUploadedImage(host?.photo?.logo)

  const newProfile = await prisma.profile.create({
    data: {
      name: host?.name,
      username,
      website: orgUrl,
      photo: orgPhoto,
      type: 'Organiser',
      claimed: false,
      visibility: 'Public',
      cityId: place?.id || null,
    },
  })

  return {
    id: newProfile.id,
    username: newProfile.username,
    name: newProfile.name,
    photo: newProfile.photo || undefined,
  }
}

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

export async function getSchemaEvent(url: string) {
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
  const org = await getOrg(event.organizer, place)
  if (!venue && org) {
    venue = await getPlace(org.name, 'de')
  }
  if (venue && !place) {
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

  let image = event.image
  if (Array.isArray(image)) {
    image = image[0]
  }

  const eventPhoto = await getUploadedImage(image || '')

  const styleHashtags = styles ? Object.keys(styles) : []

  return {
    name: event.name,
    slug: getSlug(event.name),
    description: event.description,
    cover: eventPhoto,
    startDate: event.startTimestamp
      ? new Date(getDate(event.startTimestamp))
      : null,
    endDate: event.endTimestamp ? new Date(getDate(event.endTimestamp)) : null,
    type: eventType,
    price: '',
    sourceUrl: url,
    ticketUrl: event.ticketUrl || '',
    organizerId: org?.id || null,
    venueId: venue?.id || null,
    status: 'draft',
    styles: {
      connect: styleHashtags.map((hashtag) => ({
        hashtag,
      })),
    },
  }
}
