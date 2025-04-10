<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const defaultOpen = useCookie<boolean>('sidebar_state', {
  default: () => true,
})

const items = [
  {
    to: '/admin/courses',
    label: 'Courses',
    icon: 'lucide:book-open',
  },
]
</script>

<template>
  <NuxtLayout name="default">
    <SidebarProvider :defaultOpen="defaultOpen">
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
        <div class="flex flex-1 flex-col gap-4">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </NuxtLayout>
</template>
