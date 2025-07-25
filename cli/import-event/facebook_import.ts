import { scrapeFbEventFromFbid } from 'facebook-event-scraper'
import { PrismaClient } from '@prisma/client'
import { getCityId, getPlace } from '../utils/google_maps'
import { getUploadedImage } from '../utils/cloudinary'
import { getSuggestedType, getSuggestedStyles } from '../utils/linguist'
import { getSlug } from '../../utils/slug'
import axios from 'axios'

const prisma = new PrismaClient()

function getDate(timestamp: any) {
  if (!timestamp) {
    return ''
  }

  return timestamp * 1000
}

async function getOrg(host: any, place: any): Promise<string | null> {
  if (!host?.id) {
    return null
  }

  let orgUrl = host.url || null
  if (!orgUrl) {
    orgUrl = `https://www.facebook.com/${host?.id}`
  }

  const orgFacebook = orgUrl.replace('https://www.facebook.com/', '')
  if (orgFacebook) {
    const profile = await prisma.profile.findFirst({
      where: { facebook: orgUrl },
    })
    let username = decodeURIComponent(orgFacebook)
    if (username.includes('people/')) {
      username = username.split('/')[1].replace('-', '')
    }

    if (username.length > 20) {
      username = getSlug(host?.name)
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { username },
    })

    if (existingProfile) {
      return existingProfile.id
    }

    const orgPhoto = await getUploadedImage(host?.photo?.imageUri)

    const newProfile = await prisma.profile.create({
      data: {
        name: host?.name,
        username,
        facebook: orgUrl,
        photo: orgPhoto,
        type: 'Organiser',
        claimed: false,
        visibility: 'Public',
        cityId: place?.id || null,
      },
    })

    return newProfile.id
  }

  return null
}

export function getParameterByName(name: string, url: string) {
  const $name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + $name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export async function getFacebookEventId(url: string) {
  let $url = url
  if ($url.includes('facebook.com/share')) {
    const response = await axios.get($url)
    $url = response.request.res.responseUrl
  }

  const eventTimeId = getParameterByName('event_time_id', $url)

  if (eventTimeId) {
    return eventTimeId
  }

  const id = $url
    .split('?')?.[0]
    .split('/')
    .filter((x) => x)
    .pop()

  return id || ''
}

export async function getFacebookEvent(url: string) {
  let event
  const facebookId = await getFacebookEventId(url)
  const failedImportSlug = getSlug(`failed-import`)

  try {
    event = await scrapeFbEventFromFbid(facebookId)
  } catch (e) {
    return {
      status: 'failed_import',
      importError: 'Event was not found',
    }
  }

  if (!event.name || !event.startTimestamp) {
    return {
      status: 'failed_import',
      importError: 'Event was not found',
    }
  }

  const venueName = event.location?.name || ''
  const venueAddress = event.location?.address || ''
  const venueCountry = event.location?.countryCode || ''

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

  const organizerId = await getOrg(event.hosts[0], place)

  if (!venue && organizerId && event.hosts[0]?.name) {
    venue = await getPlace(event.hosts[0].name, 'de')
  }

  if (venue && !place) {
    place = await getCityId(venue)
  }

  const eventType = getSuggestedType(event.name + ' ' + event.description)

  const styles = await getSuggestedStyles(event.name + ' ' + event.description)

  const eventPhoto = await getUploadedImage(event.photo?.imageUri || '')

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
    organizerId: organizerId,
    venueId: venue?.id || null,
    status: 'draft',
    styles: {
      connect: styleHashtags.map((hashtag) => ({
        hashtag,
      })),
    },
  }
}
