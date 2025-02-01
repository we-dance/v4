<script setup lang="ts">
const posts = ref([
  {
    title: 'Welcome to WeDance',
    date: '2024-03-20',
    excerpt: 'Discover how WeDance is transforming the dance community...',
    slug: 'welcome-to-wedance',
  },
  // More posts will be added dynamically
])
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-4">Blog</h1>
    <p class="text-xl text-muted-foreground mb-16">
      Latest news, updates, and stories from the WeDance community
    </p>

    <div class="space-y-12">
      <article v-for="post in posts" :key="post.slug" class="group">
        <NuxtLink :to="`/blog/${post.slug}`">
          <div class="space-y-3">
            <time class="text-sm text-muted-foreground">{{ post.date }}</time>
            <h2 class="text-2xl font-semibold group-hover:text-primary">
              {{ post.title }}
            </h2>
            <p class="text-muted-foreground">{{ post.excerpt }}</p>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
