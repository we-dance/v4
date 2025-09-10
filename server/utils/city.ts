import { getCountryCode } from '~/utils/country'
import { getSlug } from '~/utils/slug'
import { prisma } from '~/server/prisma'
import fetch from 'node-fetch'

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
  if (!places || !places.length) {
    return {}
  }

  // The first result is the most accurate for a place ID lookup.
  const place = places[0]

  const result: any = {}

  // Find the most specific name for the locality by checking multiple types.
  const nameComponent =
    place.address_components.find((c: any) => c.types.includes('locality')) ||
    place.address_components.find((c: any) =>
      c.types.includes('sublocality_level_1')
    ) ||
    place.address_components.find((c: any) =>
      c.types.includes('neighborhood')
    ) ||
    place.address_components.find((c: any) =>
      c.types.includes('administrative_area_level_2')
    ) ||
    place.address_components.find((c: any) =>
      c.types.includes('administrative_area_level_1')
    )

  result.locality = nameComponent?.long_name || ''
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

  const apiKey = useRuntimeConfig().googleMapsServerApiKey
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.status !== 'OK') {
    return null
  }

  return getAddress(data.results)
}

export async function addCity(city: any) {
  const address = await getAddressFromPlaceId(city.id)

  const existingCity = await prisma.city.findUnique({
    where: { id: city.id },
  })

  if (!!existingCity) {
    return existingCity
  }

  const { locality, region, country } = address

  let slug = getSlug(locality)

  let existingLocality = await prisma.city.findFirst({
    where: { slug },
  })

  if (!!existingLocality) {
    slug = getSlug([region, locality].join('-'))
  }

  let existingRegion = await prisma.city.findFirst({
    where: { slug },
  })

  if (!!existingRegion) {
    throw new Error(`city: region-locality slug already exists: ${slug}`)
  }

  const result = {
    id: city.id,
    name: locality,
    region,
    slug,
    countryCode: await getCountryCode(country),
    description: '',
    lat: address.lat,
    lng: address.lng,
  }

  const newCity = await prisma.city.create({
    data: result,
  })

  return newCity
}

export async function findOrCreateCity(placeId: string) {
  const address = await getAddressFromPlaceId(placeId)

  if (!address || !address.locality) {
    throw new Error('Couldnt find city')
  }
  const { locality, region, country, lat, lng } = address

  let slug = getSlug(locality)
  const cityWithSameSlug = await prisma.city.findFirst({ where: { slug } })
  if (cityWithSameSlug) {
    slug = getSlug([region, locality].join('-'))
  }
  const countryCode = await getCountryCode(country)
  const cityData = {
    id: placeId,
    name: locality,
    region: region || '',
    slug,
    countryCode,
    lat: lat || 0,
    lng: lng || 0,
  }

  const newCity = await prisma.city.upsert({
    where: { id: placeId },
    create: cityData,
    update: cityData,
  })

  return newCity
}
