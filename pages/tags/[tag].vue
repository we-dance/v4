<script setup lang="ts">
import type { Post } from '~/schemas/post'
import { mockPosts } from '~/data/mockPosts'

const route = useRoute()
const tag = route.params.tag as string

const filteredPosts = computed(() => {
  return mockPosts.filter(
    (post) =>
      'tags' in post.content &&
      post.content.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  ) as Post[]
})
</script>

<template>
  <div class="container max-w-xl py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2 flex items-center gap-2">
        <Icon name="ph:hash" class="w-6 h-6 text-primary" />
        {{ tag }}
      </h1>
      <p class="text-muted-foreground">{{ filteredPosts.length }} posts</p>
    </header>

    <div class="grid gap-4">
      <Post v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>

    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <div class="text-4xl mb-4">🤔</div>
      <h2 class="text-xl font-semibold mb-2">No posts found</h2>
      <p class="text-muted-foreground">
        There are no posts with the tag "{{ tag }}" yet.
      </p>
    </div>
  </div>
</template>
