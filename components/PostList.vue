<script setup lang="ts">
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
  pinnedFirst: {
    type: Boolean,
    default: false,
  },
  posts: {
    type: Array as PropType<any[]>,
    default: [],
  },
})
</script>

<template>
  <div class="space-y-4">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :show-pinned="pinnedFirst"
    />

    <EmptyState v-if="!posts.length" variant="no-posts" />
  </div>
</template>
