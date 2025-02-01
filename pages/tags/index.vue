<script setup lang="ts">
import { mockPosts } from '~/data/mockPosts'

interface TagCount {
  name: string
  count: number
}

const tagCounts = computed(() => {
  const counts = new Map<string, number>()

  mockPosts.forEach((post) => {
    if ('tags' in post.content && post.content.tags) {
      post.content.tags.forEach((tag) => {
        const normalizedTag = tag.toLowerCase()
        counts.set(normalizedTag, (counts.get(normalizedTag) || 0) + 1)
      })
    }
  })

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})
</script>

<template>
  <div class="container max-w-xl py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Tags</h1>
      <p class="text-muted-foreground">
        {{ tagCounts.length }} tags used across all posts
      </p>
    </header>

    <div class="grid gap-4">
      <NuxtLink
        v-for="tag in tagCounts"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="flex items-center justify-between p-4 bg-card hover:bg-accent rounded-lg transition-colors"
      >
        <div class="flex items-center gap-2">
          <Icon name="ph:hash" class="w-5 h-5 text-primary" />
          <span class="font-medium">{{ tag.name }}</span>
        </div>
        <span class="text-sm text-muted-foreground">{{ tag.count }} posts</span>
      </NuxtLink>
    </div>

    <div v-if="tagCounts.length === 0" class="text-center py-12">
      <div class="text-4xl mb-4">🏷️</div>
      <h2 class="text-xl font-semibold mb-2">No tags found</h2>
      <p class="text-muted-foreground">
        There are no tags used in any posts yet.
      </p>
    </div>
  </div>
</template>
