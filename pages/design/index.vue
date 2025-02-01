<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

import { designConfig } from '~/config/design'

const sections = [
  {
    ...designConfig.foundation,
    links: designConfig.foundation.items,
  },
  {
    ...designConfig.components,
    links: [
      ...designConfig.components.sections.ui.items,
      ...designConfig.components.sections.domain.items,
    ],
  },
  {
    ...designConfig.patterns,
    links: designConfig.patterns.items,
  },
]
</script>

<template>
  <div>
    <div class="mb-16">
      <h1 class="text-4xl font-bold mb-4">Design System</h1>
      <p class="text-xl text-muted-foreground">
        A comprehensive guide to building consistent and accessible interfaces
        for WeDance.
      </p>
    </div>

    <div class="space-y-16">
      <section v-for="section in sections" :key="section.label">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-2">{{ section.label }}</h2>
          <p class="text-muted-foreground">{{ section.description }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="link in section.links"
            :key="link.to"
            :to="link.to"
            class="group relative rounded-lg border p-6 hover:bg-muted"
          >
            <h3 class="font-semibold mb-2 group-hover:underline">
              {{ link.label }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ link.description }}
            </p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
