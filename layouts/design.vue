<script setup lang="ts">
const navigation = {
  foundation: {
    label: "Foundation",
    items: [
      { to: "/design/colors", label: "Colors" },
      { to: "/design/typography", label: "Typography" },
    ],
  },
  components: {
    label: "Components",
    sections: {
      ui: {
        label: "UI Components",
        items: [
          { to: "/design/components/button", label: "Button" },
          { to: "/design/components/input", label: "Input" },
          { to: "/design/components/dialog", label: "Dialog" },
        ],
      },
      domain: {
        label: "Domain Components",
        items: [
          { to: "/design/components/post", label: "Post" },
          { to: "/design/components/profile", label: "Profile" },
          { to: "/design/components/event", label: "Event" },
          { to: "/design/components/venue", label: "Venue" },
        ],
      },
    },
  },
  patterns: {
    label: "Patterns",
    items: [
      { to: "/design/patterns/forms", label: "Forms" },
      { to: "/design/patterns/navigation", label: "Navigation" },
      { to: "/design/patterns/loading", label: "Loading States" },
    ],
  },
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="border-b sticky top-0 bg-background z-50 shadow-sm">
      <div class="container flex h-16 items-center px-4 space-x-2">
        <NuxtLink to="/" class="mr-6 flex items-center">
          <span class="font-bold">WeDance</span>
        </NuxtLink>
        <span class="text-muted-foreground">Design System</span>
        <ThemeToggle />
      </div>
    </div>

    <div
      class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
    >
      <aside
        class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block"
      >
        <div class="py-6 pr-6 lg:py-8">
          <div class="space-y-4">
            <!-- Foundation -->
            <div>
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {{ navigation.foundation.label }}
              </h4>
              <div class="grid grid-flow-row auto-rows-max text-sm">
                <DesignNavLink
                  v-for="item in navigation.foundation.items"
                  :key="item.to"
                  :to="item.to"
                  :label="item.label"
                />
              </div>
            </div>

            <!-- Components -->
            <div>
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {{ navigation.components.label }}
              </h4>
              <div class="grid grid-flow-row auto-rows-max text-sm">
                <template
                  v-for="(section, key) in navigation.components.sections"
                  :key="key"
                >
                  <h5
                    class="mb-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground"
                    :class="{ 'mt-4': key !== 'ui' }"
                  >
                    {{ section.label }}
                  </h5>
                  <DesignNavLink
                    v-for="item in section.items"
                    :key="item.to"
                    :to="item.to"
                    :label="item.label"
                  />
                </template>
              </div>
            </div>

            <!-- Patterns -->
            <div>
              <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {{ navigation.patterns.label }}
              </h4>
              <div class="grid grid-flow-row auto-rows-max text-sm">
                <DesignNavLink
                  v-for="item in navigation.patterns.items"
                  :key="item.to"
                  :to="item.to"
                  :label="item.label"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="relative py-6 lg:gap-10 lg:py-8">
        <div class="mx-auto w-full min-w-0">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
