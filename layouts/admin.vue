<script setup lang="ts">
const items = [
  {
    to: '/admin/events',
    label: 'Events',
    icon: 'lucide:calendar',
  },
  {
    to: '/admin/media',
    label: 'Media',
    icon: 'lucide:image',
  },
  {
    to: '/admin/courses',
    label: 'Courses',
    icon: 'lucide:book-open',
  },
  {
    to: '/admin/integrations',
    label: 'Integrations',
    icon: 'lucide:plug',
  },
]

const isOpen = ref(false)

watch(
  () => useRouter().currentRoute.value.path,
  () => {
    isOpen.value = items.some(
      (item) => item.to === useRouter().currentRoute.value.path
    )
  }
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavigation />
    <main class="flex-1 bg-background text-foreground">
      <SidebarProvider :open="isOpen" @update:open="isOpen = $event">
        <Sidebar class="md:pt-16">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Area</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in items" :key="item.to">
                    <SidebarMenuButton asChild>
                      <NuxtLink :to="item.to">
                        <Icon :name="item.icon" />
                        <span>{{ item.label }}</span>
                      </NuxtLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div class="flex flex-1 flex-col">
            <slot />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  </div>
</template>
