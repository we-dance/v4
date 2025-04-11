<script setup lang="ts">
const route = useRoute()

const items = [
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
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppNavigation />
    <main class="flex-1 bg-background text-foreground">
      <SidebarProvider :default-open="false">
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
