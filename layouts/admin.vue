<template>
  <div class="min-h-screen">
    <header class="border-b">
      <div class="container flex h-16 items-center px-4">
        <NuxtLink to="/admin" class="flex items-center gap-2 font-bold">
          <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
          Admin
        </NuxtLink>
        <nav class="flex items-center space-x-4 lg:space-x-6 mx-6">
          <NuxtLink
            to="/admin"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/events"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Events
          </NuxtLink>
          <NuxtLink
            to="/admin/bookings"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Bookings
          </NuxtLink>
          <NuxtLink
            to="/admin/calendar"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Calendar
          </NuxtLink>
        </nav>
        <div class="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Icon name="lucide:bell" class="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="lucide:settings" class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>
