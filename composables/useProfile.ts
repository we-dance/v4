import { z } from 'zod'
import type { ArtistProfile } from '~/schemas/profile'

export const useProfile = async () => {
  const { data: auth } = useAppAuth()

  const schema = z.object({
    username: z.string(),
  })

  const { $client } = useNuxtApp()
  const route = useRoute()

  const { username } = schema.parse(route.params)

  const data = await $client.profiles.get.query({
    username,
  })

  const profile = computed(() => {
    const result = {} as ArtistProfile
    const profile = data?.profile

    if (!profile) return null

    result.id = profile.id
    result.username = profile.username
    result.type = profile.type as 'artist'
    result.name = profile.name
    result.points = 0
    result.stats = {
      events: 0,
      followers: 0,
      following: 0,
      reviews: 0,
    }
    result.styles = []
    result.photo = profile.photo

    return result
  })

  const isOwner = computed(() => {
    return auth?.value?.profile?.id === profile?.value?.id
  })

  return { profile, isOwner }
}
