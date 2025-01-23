<script setup lang="ts">
defineProps<{
  title: string;
  white?: boolean;
}>();
</script>

<template>
  <h2 class="text-xl font-bold" :class="white ? 'text-foreground' : ''">
    {{ title }}
  </h2>
</template>
