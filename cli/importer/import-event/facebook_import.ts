import { scrapeFbEventFromFbid } from 'facebook-event-scraper'
import { PrismaClient } from '@prisma/client'
import { getCityId, getPlace } from '../../utils/google_maps'
import { getUploadedImage } from '../../utils/cloudinary'
import { getSuggestedType, getSuggestedStyles } from '../../utils/linguist'
import { getSlug } from '~/utils/slug'
import axios from 'axios'

const prisma = new PrismaClient()

function getDate(timestamp: any) {
  if (!timestamp) {
    return ''
  }

  return timestamp * 1000
}

async function getOrg(host: any, place: any) {
  let org: any = ''

  if (!host?.id) {
    return ''
  }

  let orgUrl = host.url || ''
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
      return {
        id: existingProfile.id,
        name: existingProfile.name || existingProfile.username || '',
      }
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

    return {
      id: newProfile.id,
      username: newProfile.username,
      name: newProfile.name,
      photo: newProfile.photo,
    }
  }

  return ''
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

  try {
    event = await scrapeFbEventFromFbid(facebookId)
  } catch (e) {
    return {
      type: 'import_error',
      errorCode: 'no_event',
      error: (e as Error).message,
    }
  }

  if (!event.name || !event.startTimestamp) {
    return {
      type: 'import_error',
      errorCode: 'no_event',
      error: 'Event not found',
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

  const org = await getOrg(event.hosts[0], place)

  if (!venue && org) {
    venue = await getPlace(org.name, 'de')
  }

  if (venue && !place) {
    place = await getCityId(venue)
  }

  const eventType = getSuggestedType(event.name + ' ' + event.description)

  const styles = await getSuggestedStyles(event.name + ' ' + event.description)

  const hash = getDate(event.startTimestamp) + '+' + venue?.place_id
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
    organizerId: (typeof org === 'object' && org?.id) || null,
    venueId: (typeof venue === 'object' && venue?.id) || null,
    status: 'draft',
    styles: {
      connect: styleHashtags.map((hashtag) => ({
        hashtag,
      })),
    },
  }
}
