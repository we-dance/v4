<script setup lang="ts">
import { z } from 'zod'
const { style, city: citySlug } = useRoute().params
const { $client } = useNuxtApp()

const styleHashtag = z.string().parse(style)
if (!styleHashtag) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Community not found',
  })
}

const community = await $client.communities.find.query({
  hashtag: styleHashtag,
  citySlug: citySlug as string,
})

const city = community.city

if (!community) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Community not found2',
  })
}
</script>

<template>
  <DanceStyleLayout :community="community" :city="city">
    <Feed :community="community" :city="city" />
  </DanceStyleLayout>
</template>
