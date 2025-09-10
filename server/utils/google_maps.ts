import {
  AddressType,
  Client,
  type PlaceData,
} from '@googlemaps/google-maps-services-js'

export async function getCityIdFromGooglePlace(
  place: Partial<PlaceData>
): Promise<string> {
  if (!place?.address_components?.length) {
    return ''
  }

  const client = new Client({})

  const cityComponent = place.address_components.find(
    (c) =>
      c.types.includes(AddressType.locality) ||
      c.types.includes(AddressType.administrative_area_level_1) ||
      c.types.includes(AddressType.administrative_area_level_2) ||
      c.types.includes(AddressType.sublocality) ||
      c.types.includes(AddressType.neighborhood)
  )

  if (!cityComponent) {
    return ''
  }

  const cityName = cityComponent.long_name

  const config = useRuntimeConfig()
  const apiKey = config.public.googleMapsApiKey

  if (!apiKey) {
    throw new Error('Google Maps API key is missing')
  }
  const response = await client.textSearch({
    params: {
      query: cityName,
      key: apiKey,
    },
  })

  if (response.data.results.length) {
    return response.data.results[0].place_id || ''
  }
  return ''
}
