<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

const fontSizes = [
  { name: 'text-xs', size: '0.75rem', example: 'Extra small text' },
  { name: 'text-sm', size: '0.875rem', example: 'Small text' },
  { name: 'text-base', size: '1rem', example: 'Base text size' },
  { name: 'text-lg', size: '1.125rem', example: 'Large text' },
  { name: 'text-xl', size: '1.25rem', example: 'Extra large text' },
  { name: 'text-2xl', size: '1.5rem', example: 'Heading level 2' },
  { name: 'text-3xl', size: '1.875rem', example: 'Heading level 1' },
  { name: 'text-4xl', size: '2.25rem', example: 'Display text' },
]

const fontWeights = [
  { name: 'font-light', weight: '300', example: 'Light weight' },
  { name: 'font-normal', weight: '400', example: 'Normal weight' },
  { name: 'font-medium', weight: '500', example: 'Medium weight' },
  { name: 'font-semibold', weight: '600', example: 'Semibold weight' },
  { name: 'font-bold', weight: '700', example: 'Bold weight' },
]

const lineHeights = [
  { name: 'leading-none', height: '1', example: 'No line height' },
  { name: 'leading-tight', height: '1.25', example: 'Tight line height' },
  { name: 'leading-snug', height: '1.375', example: 'Snug line height' },
  { name: 'leading-normal', height: '1.5', example: 'Normal line height' },
  { name: 'leading-relaxed', height: '1.625', example: 'Relaxed line height' },
  { name: 'leading-loose', height: '2', example: 'Loose line height' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Typography</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Our typography system uses Noto Sans as the primary font family, with a
        consistent scale for sizes, weights, and line heights.
      </p>
    </section>

    <!-- Font Sizes -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Font Sizes</h2>
      <div class="space-y-8">
        <div
          v-for="size in fontSizes"
          :key="size.name"
          class="grid grid-cols-3 items-center gap-4"
        >
          <div class="text-sm font-medium">{{ size.name }}</div>
          <div class="text-sm text-muted-foreground">{{ size.size }}</div>
          <div :class="[size.name]">{{ size.example }}</div>
        </div>
      </div>
    </section>

    <!-- Font Weights -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Font Weights</h2>
      <div class="space-y-8">
        <div
          v-for="weight in fontWeights"
          :key="weight.name"
          class="grid grid-cols-3 items-center gap-4"
        >
          <div class="text-sm font-medium">{{ weight.name }}</div>
          <div class="text-sm text-muted-foreground">{{ weight.weight }}</div>
          <div :class="[weight.name, 'text-xl']">{{ weight.example }}</div>
        </div>
      </div>
    </section>

    <!-- Line Heights -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Line Heights</h2>
      <div class="space-y-8">
        <div
          v-for="height in lineHeights"
          :key="height.name"
          class="grid grid-cols-3 items-center gap-4"
        >
          <div class="text-sm font-medium">{{ height.name }}</div>
          <div class="text-sm text-muted-foreground">{{ height.height }}</div>
          <div :class="[height.name, 'text-lg']">
            This is an example of text with {{ height.example.toLowerCase() }}.
            See how it affects multiple lines of content in a paragraph.
          </div>
        </div>
      </div>
    </section>

    <!-- Font Features -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Font Features</h2>
      <div class="space-y-8">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-medium mb-4">Tracking (Letter Spacing)</h3>
            <div class="space-y-4">
              <div class="tracking-tight">Tight tracking</div>
              <div class="tracking-normal">Normal tracking</div>
              <div class="tracking-wide">Wide tracking</div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-4">Text Transforms</h3>
            <div class="space-y-4">
              <div class="uppercase">Uppercase text</div>
              <div class="lowercase">Lowercase text</div>
              <div class="capitalize">Capitalized text</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
