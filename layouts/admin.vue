<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const defaultOpen = useCookie<boolean>('sidebar_state', {
  default: () => true,
})

const items = [
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
</script>

<template>
  <NuxtLayout name="default">
    <SidebarProvider :defaultOpen="defaultOpen">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
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
      <main class="flex-1">
        <SidebarTrigger />
        <slot />
      </main>
    </SidebarProvider>
  </NuxtLayout>
</template>
