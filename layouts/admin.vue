<template>
  <div class="min-h-screen">
    <nav
      class="bg-background/80 backdrop-blur-sm shadow-sm fixed w-full z-50 border-b border-border"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/" class="flex items-center gap-2">
                <WeDanceLogo class="h-10" />
                <span class="font-bold">Admin</span>
              </NuxtLink>
            </div>
            <nav class="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
              <NuxtLink
                v-for="item in navigationItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-2 transition-colors"
                :class="[
                  route.path === item.to
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary',
                ]"
              >
                <Icon :name="item.icon" class="h-4 w-4" />
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Icon name="lucide:bell" class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="lucide:settings" class="h-4 w-4" />
            </Button>
            <Button variant="ghost" @click="handleSignOut"> Sign Out </Button>
          </div>
        </div>
      </div>
    </nav>
    <div class="h-16 bg-background"></div>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const auth = useAuthStore()

const navigationItems = [
  { to: '/admin', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/admin/events', label: 'Events', icon: 'lucide:calendar' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'lucide:ticket' },
  { to: '/admin/calendar', label: 'Calendar', icon: 'lucide:calendar-days' },
  { to: '/admin/courses', label: 'Courses', icon: 'lucide:book-open' },
]

const handleSignOut = async () => {
  await auth.logout()
  navigateTo('/')
}
</script>
