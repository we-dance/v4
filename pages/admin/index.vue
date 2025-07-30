<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const adminSections = [
  {
    to: '/admin/events',
    label: 'Events',
    icon: 'lucide:calendar',
    description: 'Manage dance events, workshops, and classes',
    color: 'from-blue-500 to-blue-600',
  },
  {
    to: '/admin/media',
    label: 'Media',
    icon: 'lucide:image',
    description: 'Upload and manage images, videos, and other media',
    color: 'from-green-500 to-green-600',
  },
  {
    to: '/admin/courses',
    label: 'Online Courses',
    icon: 'lucide:book-open',
    description: 'Create and manage dance courses and lessons',
    color: 'from-purple-500 to-purple-600',
  },
  {
    to: '/admin/integrations',
    label: 'Integrations',
    icon: 'lucide:plug',
    description: 'Configure third-party integrations and APIs',
    color: 'from-orange-500 to-orange-600',
  },
]
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>

  <div class="container py-8 space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <p class="text-muted-foreground mt-2">
        Manage your WeDance platform from this central hub
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Card
        v-for="section in adminSections"
        :key="section.to"
        class="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-accent/20"
        @click="navigateTo(section.to)"
      >
        <CardContent class="p-6">
          <div class="flex items-start space-x-4">
            <div
              class="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br text-white"
              :class="section.color"
            >
              <Icon :name="section.icon" class="h-6 w-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="text-lg font-semibold group-hover:text-foreground transition-colors"
              >
                {{ section.label }}
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                {{ section.description }}
              </p>
              <div
                class="flex items-center mt-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
              >
                <span>Manage {{ section.label.toLowerCase() }}</span>
                <Icon
                  name="lucide:arrow-right"
                  class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
