import { getCountryCode } from '~/utils/country'
import { getSlug } from '~/utils/slug'
import { prisma } from '~/server/prisma'

const addressPart = (result: any, type: string) => {
  if (!result || !result.address_components) {
    return ''
  }

  const part = result.address_components.find((o: any) =>
    o.types.includes(type)
  )
  if (!part) {
    return ''
  }

  return part.long_name
}

const getAddress = (places: any) => {
  if (!places) {
    return {}
  }

  const place =
    places.find((p: any) => p.types.includes('locality')) || places[0]

  const result: any = {}

  result.establishment = addressPart(place, 'establishment')
  result.locality = addressPart(place, 'locality')
  result.country = addressPart(place, 'country')
  result.region = addressPart(place, 'administrative_area_level_1')

  if (place.geometry?.location) {
    result.lat = place.geometry.location.lat
    result.lng = place.geometry.location.lng
  }

  result.place_id = place.place_id

  return result
}

const getAddressFromPlaceId = async (placeId: string) => {
  if (!placeId) {
    return null
  }

  const apiKey = useRuntimeConfig().public.googleMapsApiKey
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.status !== 'OK') {
    return []
  }

  return getAddress(data.results)
}

export async function findOrCreateCity(placeId: string) {
  const existing = await prisma.city.findUnique({
    where: { id: placeId },
  })
  if (existing) return existing

  const address = await getAddressFromPlaceId(placeId)

  if (!address || !address.locality || !address.country) {
    throw new Error("Couldn't determine city from Google data")
  }
  const { locality, region, country, lat, lng } = address

  let slug = getSlug(locality)
  const existingLocality = await prisma.city.findFirst({
    where: { slug },
  })

  if (existingLocality) {
    slug = getSlug(`${region} ${locality}`)
  }
  const existingRegion = await prisma.city.findFirst({
    where: { slug },
  })
  if (existingRegion) {
    throw new Error(
      `City slug conflict: A city with slug "${slug}" already exists.`
    )
  }

  const countryCode = await getCountryCode(country)

  const createData = {
    id: placeId,
    name: locality,
    region: region || '',
    slug: slug,
    countryCode,
    lat: address.lat ?? 0,
    lng: address.lng ?? 0,
  }
  const updateData = {
    name: locality,
    region: region || '',
    countryCode,
    lat: address.lat ?? 0,
    lng: address.lng ?? 0,
  }

  try {
    const city = await prisma.city.upsert({
      where: { id: placeId },
      create: createData,
      update: updateData,
    })
    return city
  } catch (error) {
    throw error
  }
}
