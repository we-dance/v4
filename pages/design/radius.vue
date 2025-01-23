<script setup lang="ts">
definePageMeta({
  layout: "design",
});

const radius = {
  none: "rounded-none",
  sm: "rounded-sm",
  DEFAULT: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Border Radius</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(value, name) in radius"
        :key="name"
        class="p-4 rounded-lg border"
      >
        <div class="bg-primary h-16 mb-2" :class="value"></div>
        <div class="font-medium">{{ name }}</div>
        <div class="text-sm text-muted-foreground">{{ value }}</div>
      </div>
    </div>
  </div>
</template>
