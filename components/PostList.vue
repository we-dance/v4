<script setup lang="ts">
import { usePostsList, useUpdateStats } from '~/composables/trpc'
import type { Post } from '~/schemas/post'
import type { PropType } from 'vue'

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

// Query params with ref to make it reactive
const queryParams = ref<{
  type: string
  limit: number
  cursor: number
  authorId?: string
}>({
  type: props.type || 'all',
  limit: props.limit,
  cursor: 0,
  ...(props.authorId ? { authorId: props.authorId } : {}),
})

// Watch for type changes
watch(
  () => [props.type, props.authorId],
  ([newType, newAuthorId]) => {
    queryParams.value = {
      type: newType || 'all',
      limit: props.limit,
      cursor: 0,
      ...(newAuthorId ? { authorId: newAuthorId } : {}),
    }
  }
)

// Query client for cache invalidation
const queryClient = useQueryClient()

// Posts query with infinite loading
const { data, isLoading, error, fetchNextPage, hasNextPage } = usePostsList(
  queryParams.value
)

// Computed posts from all pages
const posts = computed(() => {
  if (!data.value) return [] as Post[]
  return data.value.pages
    .flatMap((page) => {
      if (props.type === 'all') return page.items
      return page.items.filter((item) => item.type === props.type)
    })
    .map((item) => ({
      ...item,
      stats: {
        likes: item.stats?.likes ?? 0,
        shares: item.stats?.shares ?? 0,
        comments: item.stats?.comments ?? 0,
      },
    })) as Post[]
})

// Watch for type changes and refetch
watchEffect(() => {
  if (props.type || props.authorId) {
    // Clear cache and refetch when type or authorId changes
    queryClient.invalidateQueries(['posts.list'])
  }
})

// Load more posts
const loadMore = async () => {
  if (hasNextPage?.value && !isLoading.value && fetchNextPage?.value) {
    queryParams.value.cursor += 1
    await fetchNextPage.value()
  }
}

// Post interactions mutation
const { mutate: updateStats } = useUpdateStats()

const handleLike = (postId: number) => {
  updateStats({ postId, action: 'like' })
}

const handleShare = (postId: number) => {
  updateStats({ postId, action: 'share' })
}

const handleComment = (postId: number) => {
  updateStats({ postId, action: 'comment' })
}

// Computed states
const showLoadMore = computed(
  () => posts.value.length > 0 && hasNextPage?.value
)
</script>

<template>
  <!-- Error state -->
  <div
    v-if="error"
    class="p-4 mb-4 text-destructive bg-destructive/10 rounded-lg"
  >
    {{ (error as Error).message }}
  </div>

  <!-- Loading state -->
  <div v-if="isLoading && !posts.length" class="space-y-4">
    <PostSkeleton v-for="n in 3" :key="n" />
  </div>

  <!-- Posts list -->
  <div v-else class="space-y-4">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="handleLike(post.id)"
      @share="handleShare(post.id)"
      @comment="handleComment(post.id)"
    />

    <EmptyState v-if="!posts.length" variant="no-posts" />
  </div>

  <!-- Load more button -->
  <div v-if="showLoadMore" class="text-center mt-8">
    <Button variant="tertiary" @click="loadMore" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Load More Posts</span>
    </Button>
  </div>
</template>
