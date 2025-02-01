<script setup lang="ts">
import type { ReviewContent } from '~/schemas/post'

defineProps<{
  content: ReviewContent
}>()
</script>

<template>
  <div class="px-4 pb-4 flex-1">
    <div class="space-y-4">
      <h2 class="text-xl font-bold">{{ content.title }}</h2>
      <div class="flex items-center gap-1">
        <Icon
          v-for="i in 5"
          :key="i"
          :name="i <= content.rating ? 'ph:star-fill' : 'ph:star'"
          class="w-5 h-5"
          :class="
            i <= content.rating ? 'text-warning' : 'text-muted-foreground'
          "
        />
      </div>
      <p class="text-muted-foreground">{{ content.description }}</p>
    </div>
  </div>
</template>
