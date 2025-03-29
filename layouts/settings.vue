<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-muted dark:bg-[hsl(var(--dark))] dark:text-white">
      <div class="container mx-auto py-4 md:py-8 px-4 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 justify-center">
          <div class="col-span-1 md:col-span-8 md:col-start-3">
            <h1 class="text-2xl md:text-3xl font-bold">Account Settings</h1>
          </div>

          <!-- Settings Navigation -->
          <div class="col-span-1 md:col-span-3 md:col-start-3">
            <div
              class="bg-card rounded-lg shadow-md p-4 sticky top-4 border border-border"
            >
              <nav class="space-y-2" aria-label="Settings navigation">
                <NuxtLink
                  to="/settings"
                  class="block px-3 py-2 rounded-md transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground':
                      route.path === '/settings',
                    'hover:bg-muted/50 text-foreground/80 hover:text-foreground':
                      route.path !== '/settings',
                  }"
                  aria-current="page"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="heroicons:user-circle" class="w-5 h-5" />
                    Account
                  </span>
                </NuxtLink>
                <NuxtLink
                  to="/settings/profile"
                  class="block px-3 py-2 rounded-md transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground':
                      route.path === '/settings/profile',
                    'hover:bg-muted/50 text-foreground/80 hover:text-foreground':
                      route.path !== '/settings/profile',
                  }"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="heroicons:identification" class="w-5 h-5" />
                    Profile
                  </span>
                </NuxtLink>
                <NuxtLink
                  to="/settings/notifications"
                  class="block px-3 py-2 rounded-md transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground':
                      route.path === '/settings/notifications',
                    'hover:bg-muted/50 text-foreground/80 hover:text-foreground':
                      route.path !== '/settings/notifications',
                  }"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="heroicons:bell" class="w-5 h-5" />
                    Notifications
                  </span>
                </NuxtLink>
                <NuxtLink
                  to="/settings/privacy"
                  class="block px-3 py-2 rounded-md transition-colors"
                  :class="{
                    'bg-primary text-primary-foreground':
                      route.path === '/settings/privacy',
                    'hover:bg-muted/50 text-foreground/80 hover:text-foreground':
                      route.path !== '/settings/privacy',
                  }"
                >
                  <span class="flex items-center gap-2">
                    <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                    Privacy
                  </span>
                </NuxtLink>
              </nav>
            </div>
          </div>

          <!-- Settings Content -->
          <div class="col-span-1 md:col-span-5 mt-6 md:mt-0">
            <div class="max-w-md mx-auto md:mx-0">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
