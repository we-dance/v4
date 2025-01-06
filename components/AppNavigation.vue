<script setup>
const route = useRoute();
const auth = useAuthStore();
const isMobileMenuOpen = ref(false);

const navigationItems = [
  { to: "/feed", label: "Feed", icon: "lucide:home" },
  { to: "/events", label: "Events", icon: "lucide:calendar" },
  { to: "/organizers", label: "Orgs", icon: "lucide:building" },
  { to: "/artists", label: "Artists", icon: "lucide:users" },
  { to: "/venues", label: "Venues", icon: "lucide:map-pin" },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleSignOut = async () => {
  await auth.logout();
  // Optionally redirect to home or login page
  navigateTo("/");
};

watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);
</script>

<template>
  <nav
    class="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-50 dark:bg-slate-950/80 dark:border-b dark:border-slate-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink
              to="/"
              class="flex items-center gap-2 text-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="text-primary"
              >
                <path
                  d="
                    M 60,100
                    C 60,80 80,70 100,70
                    C 120,70 140,80 140,100
                    C 140,120 120,130 100,130
                    C 80,130 60,120 60,100
                    Z
                    M 100,50
                    C 70,50 40,70 40,100
                    C 40,130 70,150 100,150
                    C 130,150 160,130 160,100
                    C 160,70 130,50 100,50
                    Z
                  "
                  class="fill-current"
                />
              </svg>
              <span class="text-xl font-bold">WeDance</span>
            </NuxtLink>
          </div>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            active-class="text-purple-600 dark:text-purple-400"
          >
            <Icon :name="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </NuxtLink>
          <ThemeToggle />
          <template v-if="auth.isAuthenticated">
            <Button
              variant="ghost"
              @click="handleSignOut"
              class="hover:text-purple-600 transition-colors"
            >
              Sign Out
            </Button>
          </template>
          <template v-else>
            <Button
              variant="default"
              class="hover:bg-purple-600 transition-colors"
              as-child
            >
              <NuxtLink to="/login">Sign In</NuxtLink>
            </Button>
          </template>
        </div>
        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            @click="toggleMobileMenu"
            class="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
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
        class="sm:hidden bg-white dark:bg-slate-950 shadow-lg border-t dark:border-slate-800"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-purple-900/20 transition-all"
            active-class="text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20"
          >
            <Icon :name="item.icon" class="h-5 w-5" />
            {{ item.label }}
          </NuxtLink>
          <div
            class="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300"
          >
            <ThemeToggle />
            <span class="text-sm text-gray-600 dark:text-gray-400"
              >Toggle theme</span
            >
          </div>
          <template v-if="auth.isAuthenticated">
            <Button
              variant="ghost"
              @click="handleSignOut"
              class="w-full justify-start px-3 hover:text-purple-600 transition-colors"
            >
              <Icon name="lucide:log-out" class="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </template>
          <template v-else>
            <Button
              variant="default"
              class="w-full mt-4 hover:bg-purple-600 transition-colors"
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
