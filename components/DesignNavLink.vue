<script setup lang="ts">
const route = useRoute()

defineProps<{
  to: string
  label: string
}>()

const isActive = (path: string) => route.path === path
</script>

<template>
  <NuxtLink
    :to="to"
    :class="[
      'group flex w-full items-center rounded-md border border-transparent px-2 py-1',
      isActive(to)
        ? 'bg-primary text-primary-foreground font-medium'
        : 'hover:bg-primary/10',
    ]"
  >
    {{ label }}
  </NuxtLink>
</template>
