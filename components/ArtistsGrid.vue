<script setup>
import { useIntersectionObserver } from '@vueuse/core'
const { $client } = useNuxtApp()

const searchQuery = ref('')
const city = ref(null)
const community = ref(null)

const { isFetching, isError, data, error, fetchNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: ['artists', searchQuery, city, community],
    queryFn: ({ pageParam = 1 }) =>
      $client.profiles.grid.query({
        query: searchQuery.value,
        city: city.value?.id,
        community: community.value?.id,
        page: pageParam,
        type: 'Artist',
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  })

const artists = computed(
  () => data.value?.pages.flatMap((page) => page.profiles) ?? []
)

const loadMoreButton = useTemplateRef('load-more')

useIntersectionObserver(loadMoreButton, ([entry], observerElement) => {
  if (entry?.isIntersecting && hasNextPage.value && !isError.value) {
    fetchNextPage()
  }
})
</script>

<template>
  <div class="flex gap-2">
    <Input
      ref="searchInput"
      v-model="searchQuery"
      placeholder="Search by name..."
      type="search"
      class="w-full"
    />
    <CityInput v-model="city" />
    <CommunityInput
      v-model="community"
      variant="outline"
      class="w-auto"
      placeholder="Dance Style"
    />
  </div>

  <ErrorMessage v-if="isError" :message="error" />

  <div
    v-else-if="artists.length > 0"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <NuxtLink
      v-for="artist in artists"
      :key="artist.id"
      :to="`/@${artist.username}`"
    >
      <ArtistCard :profile="artist" />
    </NuxtLink>
  </div>

  <div
    v-else-if="isFetching"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <Skeleton v-for="i in 9" :key="i" class="aspect-square w-full" />
  </div>

  <EmptyState v-else-if="artists.length === 0" variant="no-results" />

  <div ref="load-more" class="text-center py-8">
    <Button v-if="hasNextPage" @click="fetchNextPage" :disabled="isFetching">
      <Icon
        v-if="isFetching"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="isFetching">Loading...</span>
      <span v-else>Load More</span>
    </Button>
  </div>
</template>
