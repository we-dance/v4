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
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8">WeDance Design System</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Foundation</h2>
        <ul class="space-y-2">
          <li><NuxtLink to="/design/colors" class="text-primary hover:underline">Colors</NuxtLink></li>
          <li><NuxtLink to="/design/typography" class="text-primary hover:underline">Typography</NuxtLink></li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Components</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-medium mb-2">UI Components</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/design/button" class="text-primary hover:underline">Button</NuxtLink></li>
              <li><NuxtLink to="/design/input" class="text-primary hover:underline">Input</NuxtLink></li>
              <li><NuxtLink to="/design/dialog" class="text-primary hover:underline">Dialog</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-2">Domain Components</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/design/post" class="text-primary hover:underline">Post</NuxtLink></li>
              <li><NuxtLink to="/design/profile" class="text-primary hover:underline">Profile</NuxtLink></li>
              <li><NuxtLink to="/design/event" class="text-primary hover:underline">Event</NuxtLink></li>
              <li><NuxtLink to="/design/venue" class="text-primary hover:underline">Venue</NuxtLink></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Emails</h2>
        <ul class="space-y-2">
          <li><NuxtLink to="/design/email/welcome" class="text-primary hover:underline">Welcome Email</NuxtLink></li>
          <li><NuxtLink to="/design/email/finished-class" class="text-primary hover:underline">Finished Class Email</NuxtLink></li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Patterns</h2>
        <ul class="space-y-2">
          <li><NuxtLink to="/design/forms" class="text-primary hover:underline">Forms</NuxtLink></li>
          <li><NuxtLink to="/design/navigation" class="text-primary hover:underline">Navigation</NuxtLink></li>
          <li><NuxtLink to="/design/loading" class="text-primary hover:underline">Loading States</NuxtLink></li>
        </ul>
      </section>
    </div>
  </div>
</template>
