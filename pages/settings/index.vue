<script setup lang="ts">
const navigation = [
  {
    to: '/settings/profile',
    label: 'Profile',
    icon: 'lucide:user',
    description: 'Manage your personal information and preferences'
  },
  {
    to: '/settings/privacy',
    label: 'Privacy',
    icon: 'lucide:shield',
    description: 'Control your privacy and visibility settings'
  },
  {
    to: '/settings/notifications',
    label: 'Notifications',
    icon: 'lucide:bell',
    description: 'Customize your notification preferences'
  },
  {
    to: '/settings/account',
    label: 'Account',
    icon: 'lucide:settings',
    description: 'Manage your account and security settings'
  }
]
</script>

<template>
  <div class="container py-16 max-w-4xl">
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Settings</h1>
        <p class="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div class="grid gap-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <div class="p-2 rounded-md bg-primary/10">
            <Icon :name="item.icon" class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 class="font-semibold">{{ item.label }}</h2>
            <p class="text-sm text-muted-foreground">{{ item.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template> 