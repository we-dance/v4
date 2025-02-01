<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="relative w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6 mb-12">
        <div>
          <h1 class="text-4xl font-bold text-foreground">{{ title }}</h1>
          <p class="text-muted-foreground mt-2">{{ description }}</p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
