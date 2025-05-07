<script setup lang="ts">
defineProps({
  link: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="block bg-muted p-3 rounded-lg hover:bg-muted/80"
  >
    <div class="flex items-center gap-2">
      <Icon name="ph:link" class="w-4 h-4 text-primary" />
      <span class="text-primary truncate">{{ link.title || link.url }}</span>
    </div>
    <p v-if="link.description" class="text-sm text-muted-foreground mt-1">
      {{ link.description }}
    </p>
  </a>
</template>
