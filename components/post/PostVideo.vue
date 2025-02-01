<script setup lang="ts">
import type { VideoContent } from '~/schemas/post'

defineProps<{
  content: VideoContent
}>()
</script>

<template>
  <div class="px-4 pb-4 space-y-4">
    <p class="text-muted-foreground">{{ content.description }}</p>

    <div class="relative aspect-video mb-4">
      <NuxtImg
        :src="content.video.thumbnail"
        :alt="content.title"
        class="w-full h-full object-cover rounded-lg"
      />
      <Icon
        name="heroicons:play-solid"
        size="64"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-background"
      />
      <div
        class="absolute bottom-2 right-2 bg-foreground/75 text-background px-2 py-1 text-sm rounded"
      >
        {{ content.video.duration }}
      </div>
    </div>
  </div>
</template>
