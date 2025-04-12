<script setup>
const { $client } = useNuxtApp()

const searchQuery = ref('')

const { isLoading, isError, data, error, fetchNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: ['artists', searchQuery.value, page.value],
    queryFn: ({ pageParam }) =>
      $client.profiles.artists.query({
        query: searchQuery.value,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  })

const artists = computed(() => data.value?.data ?? [])
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
    <Loader v-if="isLoading" />

    <Alert v-if="isError" variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <div
      v-if="artists.length > 0"
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
  </div>

  <div v-if="hasNextPage" class="text-center py-8">
    <Button @click="fetchNextPage" :disabled="isLoading">
      <Icon
        v-if="isLoading"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="isLoading">Loading...</span>
      <span v-else>Load More Artists</span>
    </Button>
  </div>
</template>
