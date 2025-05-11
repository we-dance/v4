<script setup lang="ts">
defineProps({
  pinnedFirst: {
    type: Boolean,
    default: false,
  },
  posts: {
    type: Array as PropType<any[]>,
    default: [],
  },
})

const emit = defineEmits(['load'])
</script>

<template>
  <div class="space-y-4">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :show-pinned="pinnedFirst"
      @load="emit('load')"
    />

    <EmptyState v-if="!posts.length" variant="no-posts" />
  </div>
</template>
