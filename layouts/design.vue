<script setup lang="ts">
const sections = [
  { id: "colors", label: "Colors", to: "/design/colors" },
  { id: "typography", label: "Typography", to: "/design/typography" },
  { id: "spacing", label: "Spacing", to: "/design/spacing" },
  { id: "radius", label: "Border Radius", to: "/design/radius" },
  { id: "components", label: "Components", to: "/design/components" },
] as const;
</script>

<template>
  <div class="bg-background text-foreground">
    <div class="container mx-auto py-16 px-4 flex gap-8">
      <!-- Navigation -->
      <div class="w-64 shrink-0 hidden lg:block">
        <div class="sticky top-8">
          <h3 class="font-semibold mb-4">Design System</h3>
          <ThemeToggle />

          <nav class="mt-4 space-y-1">
            <NuxtLink
              v-for="section in sections"
              :key="section.id"
              :to="section.to"
              class="block px-3 py-2 rounded-md text-sm transition-colors"
              :class="[
                $route.path === section.to
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted',
              ]"
            >
              {{ section.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 max-w-5xl">
        <slot />
      </div>
    </div>
  </div>
</template>
