<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import EventActions from '~/components/event/EventActions.vue'
import { getDateTime } from '~/utils'
import { NuxtLink } from '#components'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const { $client } = useNuxtApp()

const searchQuery = ref('')
const { data, refetch, isLoading, isError, error } = useQuery<any>({
  queryKey: ['events.myList', searchQuery],
  queryFn: () => $client.events.myList.query({ query: searchQuery.value }),
  retry: false,
})

const events = computed(() => data.value?.events ?? [])

const columns: ColumnDef<any>[] = [
  {
    header: 'Date',
    accessorKey: 'startDate',
    cell: ({ row }) => {
      const event = row.original
      if (!event?.startDate) return ''
      return getDateTime(event?.startDate)
    },
  },
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      const event = row.original
      return h(
        NuxtLink,
        {
          to: `/admin/events/${event?.id}/edit`,
          class: 'text-blue-500 underline hover:no-underline',
        },
        event?.name
      )
    },
  },
  {
    header: 'Guests',
    accessorKey: '_count.guests',
    cell: ({ row }) => {
      const event = row.original
      return h(
        NuxtLink,
        {
          to: `/admin/events/${event?.id}/`,
          class: 'text-blue-500 underline hover:no-underline',
        },
        event?._count?.guests
      )
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const event = row.original
      return h(EventActions, { event })
    },
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
          <BreadcrumbPage>Manage Events</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>

  <ErrorMessage v-if="isError" :message="error?.message" />
  <Loader v-else-if="isLoading" />
  <div v-else class="container py-6 space-y-6">
    <div class="flex items-center gap-2">
      <Input v-model="searchQuery" placeholder="Search events..." />
      <NuxtLink to="/admin/events/import">
        <Button> Create Event </Button>
      </NuxtLink>
    </div>
    <AdminTable :data="events" :columns="columns" />
  </div>
</template>
