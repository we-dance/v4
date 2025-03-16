<script setup lang="ts">
import { z } from 'zod'
import type { ArtistProfile } from '~/schemas/profile'

const schema = z.object({
  username: z.string(),
})

const { $client } = useNuxtApp()
const route = useRoute()

const { username } = schema.parse(route.params)

const data = await $client.profiles.get.query({
  username,
})

const artist = computed(() => {
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
</script>

<template>
  <ArtistLayout v-if="artist" :artist="artist">
    <div class="max-w-xl mx-auto">
      <PostList :type="'all'" :limit="3" :author-id="artist.id" />
    </div>
  </ArtistLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
