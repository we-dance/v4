<script setup>
import { useIntersectionObserver } from '@vueuse/core'
const { $client } = useNuxtApp()

const searchQuery = ref('')

const {
  isPending,
  isFetching,
  isError,
  data,
  error,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['artists', searchQuery],
  queryFn: ({ pageParam = 1 }) =>
    $client.profiles.artists.query({
      query: searchQuery.value,
      page: pageParam,
    }),
  getNextPageParam: (lastPage, pages) => lastPage.nextPage,
})

const artists = computed(
  () => data.value?.pages.flatMap((page) => page.artists) ?? []
)

const loadMoreButton = useTemplateRef('load-more')

useIntersectionObserver(loadMoreButton, ([entry], observerElement) => {
  if (entry?.isIntersecting && hasNextPage.value && !isError.value) {
    fetchNextPage()
  }
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

  <ErrorMessage v-if="isError" :error="error" />

  <Loader v-else-if="isPending" />

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

  <EmptyState v-else variant="no-results" />

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
