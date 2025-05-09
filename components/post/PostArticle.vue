<script setup lang="ts">
import type { ArticleContent } from '~/schemas/post'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({})
const html = (content: string) => {
  return md.render(content)
}

defineProps<{
  content: ArticleContent
}>()
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div v-if="content.cover" class="relative aspect-video">
      <img
        :src="content.cover"
        :alt="content.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-4 space-y-4">
      <PostTitle :title="content.title" />
      <p class="text-muted-foreground">{{ content.description }}</p>
      <div
        v-if="content.html"
        class="prose prose-neutral max-w-none line-clamp-3"
        v-html="html(content.html)"
      />
    </div>
  </div>
</template>
