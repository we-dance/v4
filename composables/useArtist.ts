import { mockArtists } from '@/data/mockArtists'
import type { ArtistProfile } from '~/schemas/profile'
import { adaptArtistToSchema } from '~/utils/adapters'

export const useArtist = () => {
  const route = useRoute()

  // Get artist ID from route
  const artistId = computed(() => {
    const id = route.params.id
    return typeof id === 'string' ? id : Array.isArray(id) ? id[0] : ''
  })

  // Get artist data
  const artist = computed(() => {
    const mockArtist = mockArtists.find((a) => String(a.id) === artistId.value)
    return mockArtist ? adaptArtistToSchema(mockArtist) : null
  })

  return {
    artistId,
    artist,
  }
}
