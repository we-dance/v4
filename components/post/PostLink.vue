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
    class="flex gap-4 items-center bg-muted p-3 rounded-lg hover:bg-muted/80"
  >
    <img v-if="link.image" :src="link.image" class="w-8 h-8 rounded-full" />
    <div class="overflow-hidden">
      <div class="flex items-center gap-2">
        <Icon v-if="!link.image" name="ph:link" class="w-4 h-4 text-primary" />
        <span class="text-primary truncate overflow-hidden">{{
          link.title || link.url
        }}</span>
      </div>
      <p
        v-if="link.description"
        class="text-sm text-muted-foreground truncate overflow-hidden"
      >
        {{ link.description }}
      </p>
    </div>
  </a>
</template>
