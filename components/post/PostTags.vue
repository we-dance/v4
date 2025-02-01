<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>

<template>
  <div class="px-4 pb-4 flex flex-wrap gap-2">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${tag}`"
      class="inline-flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm px-3 py-1 rounded-full transition-colors"
    >
      <Icon name="ph:hash" class="w-3 h-3" />
      {{ tag }}
    </NuxtLink>
  </div>
</template>
