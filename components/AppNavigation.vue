<script setup>
const route = useRoute()
const dialog = useDialog()
const isMobileMenuOpen = ref(false)

const { auth, isLoggedIn, signOut, data } = useAppAuth()

const navigationItems = [
  { to: '/feed', label: 'Feed', icon: 'lucide:home' },
  { to: '/courses', label: 'Courses', icon: 'lucide:book-open' },
  { to: '/events', label: 'Events', icon: 'lucide:calendar' },
  { to: '/groups', label: 'Groups', icon: 'lucide:users-2' },
  { to: '/artists', label: 'Artists', icon: 'lucide:users' },
  { to: '/venues', label: 'Venues', icon: 'lucide:map-pin' },
  { to: '/chat', label: 'Messages', icon: 'lucide:message-square' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSearch = () => {
  dialog.open({
    component: 'SearchDialog',
  })
}

const handleSignOut = async () => {
  await signOut()
  // Optionally redirect to home or login page
  navigateTo('/')
}

watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false
  }
)
</script>

<template>
  <nav
    class="bg-background/80 backdrop-blur-sm shadow-sm fixed w-full z-50 border-b border-border"
  >
    <div class="max-w-[87%] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" id="logo">
              <WeDanceLogo class="h-10" />
            </NuxtLink>
          </div>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden sm:ml-6 mr-20 sm:flex sm:items-center gap-2">
          <Button
            as-child
            variant="ghost"
            v-for="item in navigationItems"
            :class="{ 'text-accent bg-accent/10': route.path === item.to }"
            :key="item.to"
          >
            <NuxtLink :to="item.to">
              <Icon :name="item.icon" class="h-4 w-4" />
              {{ item.label }}
            </NuxtLink>
          </Button>
          <Button variant="ghost" @click="handleSearch">
            <Icon name="lucide:search" class="h-4 w-4" />
          </Button>
          <template v-if="isLoggedIn">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <Icon name="lucide:user" class="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem as-child>
                  <NuxtLink :to="`/${data?.username}`">
                    <Icon name="lucide:user" class="mr-2 h-4 w-4" />
                    {{ data?.username }}
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <NuxtLink to="/settings">
                    <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
                    Settings
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                  <NuxtLink to="/admin/">
                    <Icon name="lucide:shield" class="mr-2 h-4 w-4" />
                    Admin Area
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleSignOut">
                  <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
          <template v-else>
            <Button as-child>
              <NuxtLink to="/login">Sign In</NuxtLink>
            </Button>
          </template>
        </div>
        <!-- Mobile menu button -->
        <div class="flex justify-end items-center sm:hidden">
          <Button variant="ghost" @click="handleSearch">
            <Icon name="lucide:search" class="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            @click="toggleMobileMenu"
            class="hover:bg-accent/10 transition-colors"
          >
            <Icon
              :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="h-6 w-6"
            />
          </Button>
        </div>
      </div>
    </div>
    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="sm:hidden bg-background shadow-lg border-t border-border"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all"
            :class="[
              route.path === item.to
                ? 'text-accent bg-accent/10'
                : 'text-muted-foreground hover:text-accent hover:bg-accent/10',
            ]"
          >
            <Icon :name="item.icon" class="h-5 w-5" />
            {{ item.label }}
          </NuxtLink>
          <template v-if="isLoggedIn">
            <NuxtLink
              :to="`/${data?.username}`"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all text-muted-foreground hover:text-accent hover:bg-accent/10"
            >
              <Icon name="lucide:user" class="h-5 w-5" />
              {{ data?.username }}
            </NuxtLink>
            <NuxtLink
              to="/settings"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all text-muted-foreground hover:text-accent hover:bg-accent/10"
            >
              <Icon name="lucide:settings" class="h-5 w-5" />
              Settings
            </NuxtLink>
            <NuxtLink
              to="/admin/"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all text-muted-foreground hover:text-accent hover:bg-accent/10"
            >
              <Icon name="lucide:shield" class="h-5 w-5" />
              Admin Area
            </NuxtLink>
            <div class="my-2 border-t border-border"></div>
            <Button
              variant="ghost"
              @click="handleSignOut"
              class="w-full justify-start px-3 hover:text-accent transition-colors"
            >
              <Icon name="lucide:log-out" class="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </template>
          <template v-else>
            <Button
              variant="default"
              class="w-full mt-4 hover:bg-accent transition-colors"
              as-child
            >
              <NuxtLink to="/login">Sign In</NuxtLink>
            </Button>
          </template>
        </div>
      </div>
    </transition>
  </nav>
  <div class="h-16 bg-background"></div>
</template>
