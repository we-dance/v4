<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <NuxtLayout name="default">
    <div class="container mx-auto py-8 px-4 max-w-6xl">
      <h1 class="text-3xl font-bold mb-6">Account Settings</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Settings Navigation -->
        <div class="md:col-span-1">
          <div class="bg-card rounded-lg shadow p-4 sticky top-4">
            <nav class="space-y-2" aria-label="Settings navigation">
              <NuxtLink
                to="/settings"
                class="block px-3 py-2 rounded-md transition-colors"
                :class="{
                  'bg-primary text-primary-foreground':
                    route.path === '/settings',
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
        <div class="md:col-span-3">
          <slot />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
