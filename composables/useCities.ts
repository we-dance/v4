import { loadGoogleMapsApi } from '~/lib/googleMapsApi'

export const useCities = () => {
  const query = ref('')
  const results = ref<Array<{ id: string; name: string }>>([])

  const getPlacePredictions = () => {
    loadGoogleMapsApi().then((google) => {
      const service = new google.maps.places.AutocompleteService()
      service.getPlacePredictions(
        {
          input: query.value,
          types: ['(cities)'],
        },
        (predictions: any) => {
          results.value = predictions.map((prediction: any) => ({
            id: prediction.place_id,
            name: prediction.description,
            googleMapsPlace: prediction,
          }))
        }
      )
    })
  }

  watch(query, () => {
    if (query.value.length >= 2) {
      getPlacePredictions()
    } else {
      results.value = []
    }
  })

  return {
    cityQuery: query,
    citySearchResults: results,
  }
}
