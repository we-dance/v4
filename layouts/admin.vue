<script setup>
const route = useRoute()
const { signOut } = useAppAuth()
const isCollapsed = ref(false)
const expandedItems = ref([])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleSubMenu = (itemTo) => {
  const index = expandedItems.value.indexOf(itemTo)
  if (index === -1) {
    expandedItems.value.push(itemTo)
  } else {
    expandedItems.value.splice(index, 1)
  }
}

const isActiveParent = (item) => {
  if (!item.children) return route.path === item.to
  return item.children.some((child) => route.path === child.to)
}

const navigationItems = [
  {
    to: '/admin',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
  },
  {
    to: '/admin/courses',
    label: 'Courses',
    icon: 'lucide:book-open',
  },
  {
    to: '/admin/events',
    label: 'Events',
    icon: 'lucide:calendar',
  },
]

const handleSignOut = async () => {
  await signOut()
  navigateTo('/')
}

// Mock notification count - replace with actual count
const notificationCount = ref(3)
</script>

<template>
  <div class="min-h-screen flex dark:bg-[hsl(var(--dark))] dark:text-white">
    <!-- Sidebar -->
    <aside
      class="min-h-screen bg-background border-r border-border transition-all duration-300"
      :class="[isCollapsed ? 'w-16' : 'w-64']"
    >
      <div
        class="h-16 flex items-center justify-between px-4 border-b border-border"
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <WeDanceLogo class="h-10" />
        </NuxtLink>
        <Button
          variant="ghost"
          size="icon"
          @click="toggleCollapse"
          class="hover:bg-accent/10"
        >
          <Icon
            :name="isCollapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'"
            class="h-4 w-4"
          />
        </Button>
      </div>
      <nav class="p-4">
        <div class="space-y-1">
          <template v-for="item in navigationItems" :key="item.to">
            <!-- Parent menu items with sub-menus -->
            <div v-if="item.children">
              <div
                class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer"
                :class="[
                  isActiveParent(item)
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  isCollapsed ? 'justify-center' : '',
                ]"
                @click="toggleSubMenu(item.to)"
              >
                <Icon :name="item.icon" class="h-4 w-4" />
                <span v-if="!isCollapsed" class="flex-1">{{ item.label }}</span>
                <Icon
                  v-if="!isCollapsed"
                  :name="
                    expandedItems.includes(item.to)
                      ? 'lucide:chevron-down'
                      : 'lucide:chevron-right'
                  "
                  class="h-4 w-4"
                />
              </div>
              <!-- Sub-menu items -->
              <div
                v-if="expandedItems.includes(item.to) && !isCollapsed"
                class="ml-4 mt-1 space-y-1"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
                  :class="[
                    route.path === child.to
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  ]"
                >
                  <Icon :name="child.icon" class="h-4 w-4" />
                  <span class="flex-1">{{ child.label }}</span>
                </NuxtLink>
              </div>
            </div>

            <!-- Single menu items without sub-menus -->
            <NuxtLink
              v-else
              :to="item.to"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
              :class="[
                route.path === item.to
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                isCollapsed ? 'justify-center' : '',
              ]"
            >
              <Icon :name="item.icon" class="h-4 w-4" />
              <span v-if="!isCollapsed" class="flex-1">{{ item.label }}</span>
            </NuxtLink>
          </template>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header
        class="h-16 border-b border-border bg-background/80 backdrop-blur-sm"
      >
        <div class="h-full flex items-center justify-end px-6 gap-4">
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              class="relative"
              aria-label="View notifications"
            >
              <Icon name="lucide:bell" class="h-5 w-5" />
              <span
                v-if="notificationCount > 0"
                class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
              >
                {{ notificationCount }}
              </span>
            </Button>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <div class="max-w-full">
          <slot />
        </div>
      </main>
    </div>
    <DialogProvider />
    <CookieConsent />
  </div>
</template>
