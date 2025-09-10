import {
  AddressType,
  Client,
  type PlaceData,
} from '@googlemaps/google-maps-services-js'
import { citiesRouter } from '../trpc/routers/cities'

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
  const apiKey = config.googleMapsServerApiKey

  if (!apiKey) {
    throw new Error('Google Maps server API key is missing')
  }
  try {
    const response = await client.textSearch({
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
