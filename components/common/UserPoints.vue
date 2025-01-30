<script setup lang="ts">
defineProps<{
  points?: number | string;
}>();

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num;
};
</script>

<template>
  <span v-if="points" class="text-sm text-warning flex items-center gap-0.5">
    <Icon name="heroicons:fire" class="w-4 h-4" />
    <template v-if="typeof points === 'number'">
      {{ formatNumber(points) }}
    </template>
    <template v-else>
      {{ points }}
    </template>
  </span>
</template>
