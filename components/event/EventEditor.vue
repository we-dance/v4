<script setup lang="ts">
import type { Event } from '@prisma/client'

const { event } = defineProps<{
  event: Event
}>()

const emit = defineEmits(['load'])
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink as-child>
            <NuxtLink to="/admin/events"> Manage Events </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ event?.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex-1" />
    <Button variant="ghost" as-child>
      <NuxtLink :to="`/events/${event?.id}`">
        <Icon name="lucide:eye" class="w-4 h-4" />
        Preview
      </NuxtLink>
    </Button>
  </header>

  <ResizablePanelGroup direction="horizontal" class="h-full items-stretch">
    <ResizablePanel :default-size="30" :min-size="20">
      <div class="space-y-4 p-4">
        <AdminBlock title="Basic Information" is-open>
          <EventAboutEditor :event="event" @load="emit('load')" />
        </AdminBlock>
        <AdminBlock title="Tickets" is-open>
          <EventTicketEditor :event="event" @load="emit('load')" />
        </AdminBlock>
        <AdminBlock title="External Tickets" is-open>
          <EventPriceEditor :event="event" @load="emit('load')" />
        </AdminBlock>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="70">
      <EventView :event="event" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
