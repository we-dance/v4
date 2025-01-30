<template>
  <div class="min-h-screen">
    <AppNavigation />
    <div class="flex">
      <!-- Sidebar -->
      <div class="hidden md:flex md:flex-col md:fixed md:inset-y-16 md:w-64 bg-background border-r border-border">
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-4 py-4 space-y-1">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                route.path === item.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
              ]"
            >
              <Icon :name="item.icon" class="h-5 w-5" />
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="md:pl-64 flex flex-col flex-1">
        <!-- Page Content -->
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const auth = useAuthStore();
const dialog = useDialog();

const navigationItems = [
  { to: "/admin", label: "Dashboard", icon: "lucide:home" },
  { to: "/admin/events", label: "Events", icon: "lucide:calendar" },
];

const handleSearch = () => {
  dialog.open({
    component: "SearchDialog",
  });
};

const handleSignOut = async () => {
  await auth.logout();
  navigateTo("/");
};
</script>
