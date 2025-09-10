import {
  AddressType,
  Client,
  type PlaceData,
} from '@googlemaps/google-maps-services-js'

const mapsClient = new Client({})

export async function getCityIdFromGooglePlace(
  place: Partial<PlaceData>
): Promise<string> {
  if (!place?.address_components?.length) {
    return ''
  }

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
  const apiKey = config.googleMapsServerApiKey

  if (!apiKey) {
    throw new Error('Google Maps server API key is missing')
  }
  try {
    const response = await mapsClient.textSearch({
      params: {
        query: cityName,
        key: apiKey,
      },
      timeout: 5000,
    })
    const results = response.data.results || []
    const best =
      results.find((r: any) => r.types?.includes('locality')) ?? results[0]
    return best?.place_id || ''
  } catch (err) {
    console.error('getCityIdFromGooglePlace textSearch failed:', err)
    return ''
  }
}

export async function getPlaceDetails(placeId: string) {
  const config = useRuntimeConfig()
  if (!config.googleMapsServerApiKey)
    throw new Error('Missing Google Maps server key')

  try {
    const resp = await mapsClient.placeDetails({
      params: {
        place_id: placeId,
        key: config.googleMapsServerApiKey,
        fields: [
          'place_id',
          'name',
          'formatted_address',
          'types',
          'website',
          'international_phone_number',
          'url',
          'geometry/location',
          'address_components',
        ],
      },
      timeout: 5000,
    })
    return resp.data.result
  } catch (error) {
    console.error('getPlaceDetails failed for placeId:', placeId, error)
    return null
  }
}
