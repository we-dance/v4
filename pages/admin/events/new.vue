<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Sepetator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <NuxtLink to="/admin/events"> Manage Events </NuxtLink>
        </BreadcrumbItem>
        <BreadcrumbSeperator />
        <BreadcrumbItem>
          <BreadcrumbPage>Add New Event</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>
  <div class="min-h-screen flex items-center justify-center ml-8 mr-8">
    <AddEventForm />
  </div>
</template>
