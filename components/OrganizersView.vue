<script setup>
import { useIntersectionObserver } from '@vueuse/core'
const { $client } = useNuxtApp()

const searchQuery = ref('')

const { isFetching, isError, data, error, fetchNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: ['groups', searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      $client.profiles.groups.query({
        query: searchQuery.value,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  })

const groups = computed(
  () => data.value?.pages.flatMap((page) => page.groups) ?? []
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

  <ErrorMessage v-if="isError" :message="error" />

  <div
    v-else-if="groups.length > 0"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <NuxtLink
      v-for="group in groups"
      :key="group.id"
      :to="`/@${group.username}`"
    >
      <OrganizerCard :profile="group" />
    </NuxtLink>
  </div>

  <div
    v-else-if="isFetching"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <Skeleton v-for="i in 9" :key="i" class="aspect-square w-full" />
  </div>

  <EmptyState v-else-if="groups.length === 0" variant="no-results" />

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
