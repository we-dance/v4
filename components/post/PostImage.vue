<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  width?: number
  height?: number
}>()
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width || 800"
    :height="height || 400"
    class="w-full h-full object-cover"
    loading="lazy"
    placeholder
    sizes="sm:100vw md:800px"
    format="webp"
    quality="80"
  />
</template>
