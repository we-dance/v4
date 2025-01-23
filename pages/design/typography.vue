<script setup lang="ts">
definePageMeta({
  layout: "design",
});

const typography = {
  font: "Noto Sans",
  weights: ["300", "400", "500", "600", "700"],
  sizes: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  },
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Typography</h1>

    <!-- Font -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Font Family</h3>
      <div class="p-4 rounded-lg border">
        <div class="font-medium">{{ typography.font }}</div>
      </div>
    </div>

    <!-- Font Weights -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Font Weights</h3>
      <div class="space-y-4">
        <div
          v-for="weight in typography.weights"
          :key="weight"
          class="p-4 rounded-lg border"
        >
          <div :style="{ fontWeight: weight }">
            The quick brown fox jumps over the lazy dog
          </div>
          <div class="text-sm text-muted-foreground mt-2">
            Weight: {{ weight }}
          </div>
        </div>
      </div>
    </div>

    <!-- Font Sizes -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Font Sizes</h3>
      <div class="space-y-4">
        <div
          v-for="(value, name) in typography.sizes"
          :key="name"
          class="p-4 rounded-lg border"
        >
          <div :class="value">The quick brown fox jumps over the lazy dog</div>
          <div class="text-sm text-muted-foreground mt-2">
            {{ name }}: {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
