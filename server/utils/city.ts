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
    return {}
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
