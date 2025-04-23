<script setup lang="ts">
const { $client } = useNuxtApp()

const props = defineProps({
  type: {
    type: String,
    default: 'all',
  },
  limit: {
    type: Number,
    default: 10,
  },
  authorId: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
})

const {
  isPending,
  isFetching,
  isError,
  data,
  error,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => $client.posts.list.query({}),
  getNextPageParam: (lastPage, pages) => lastPage.nextPage,
})

const posts = computed(
  () => data.value?.pages.flatMap((page) => page.posts) ?? []
)
</script>

<template>
  <div class="space-y-4">
    <Post v-for="post in posts" :key="post.id" :post="post" />

    <EmptyState v-if="!posts.length" variant="no-posts" />
  </div>
</template>
