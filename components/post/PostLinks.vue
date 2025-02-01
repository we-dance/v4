<script setup lang="ts">
import type { Link } from '~/schemas/post'

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <div class="space-y-2">
    <a
      v-for="link in links"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="block bg-muted p-3 rounded-lg hover:bg-muted/80"
    >
      <div class="flex items-center gap-2">
        <Icon name="ph:link" class="w-4 h-4 text-primary" />
        <span class="text-primary">{{ link.title }}</span>
      </div>
      <p v-if="link.description" class="text-sm text-muted-foreground mt-1">
        {{ link.description }}
      </p>
    </a>
  </div>
</template>
