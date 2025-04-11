<script setup>
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()

const searchQuery = ref('')
const loading = ref(true)
const error = ref(null)
const artists = ref([])
const hasMore = ref(true)
const loadingMore = ref(false)
const limit = ref(9)
const page = ref(1)

const fetchArtists = async () => {
  try {
    const response = await $client.profiles.artists.query({
      query: searchQuery.value,
      limit: limit.value,
      page: page.value,
    })

    artists.value = [...artists.value, ...response.artists]
    hasMore.value = response.hasMore
  } catch (e) {
    toast.error('Failed to fetch artists', {
      description: e.message,
    })
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return

  loadingMore.value = true

  try {
    page.value++
    await fetchArtists()
  } finally {
    loadingMore.value = false
  }
}

onMounted(async () => {
  await fetchArtists()
})

watch(searchQuery, async () => {
  page.value = 1
  artists.value = []

  await fetchArtists()
})
</script>

<template>
  <Input
    ref="searchInput"
    v-model="searchQuery"
    placeholder="Search by name..."
    type="search"
    class="w-full"
  />

  <div>
    <div v-if="loading" class="col-span-full text-center py-12">
      <div class="flex flex-col items-center">
        <Icon
          name="ph:spinner-gap"
          class="h-8 w-8 animate-spin mb-4 text-primary"
        />
        <p class="text-muted-foreground">Loading artists...</p>
      </div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-4 col-span-full">
      <Icon name="ph:warning-circle" class="h-8 w-8 mb-2 mx-auto" />
      <p>{{ error }}</p>
      <Button variant="secondary" size="sm" class="mt-4" @click="fetchArtists">
        Try Again
      </Button>
    </div>

    <div
      v-else-if="artists.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ArtistCard v-for="artist in artists" :key="artist.id" :artist="artist" />
    </div>

    <EmptyState v-else variant="no-results" />
  </div>

  <div v-if="hasMore && !loading && !error" class="text-center py-8">
    <Button @click="loadMore" :disabled="loadingMore">
      <Icon
        v-if="loadingMore"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="loadingMore">Loading more...</span>
      <span v-else>Load More Artists</span>
    </Button>
  </div>
</template>
