<script setup lang="ts">
import { getDateTime } from '~/utils'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()

const {
  data: event,
  refetch,
  isLoading,
  isError,
  error,
} = useQuery<any>({
  queryKey: ['events.byId', route.params.id],
  queryFn: () => $client.events.guests.query(route.params.id as string),
  retry: false,
})

const columns = [
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const guest = row.original
      return getDateTime(guest.createdAt)
    },
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Username',
    accessorKey: 'profile.username',
  },
  {
    header: 'First Name',
    accessorKey: 'profile.user.firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'profile.user.lastName',
  },
]
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
      <NuxtLink :to="`/admin/events/${event?.id}/edit`">
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit
      </NuxtLink>
    </Button>
  </header>

  <Loader v-if="isLoading" />
  <ErrorMessage v-else-if="isError" :message="error?.message" />
  <div v-else class="container py-6 space-y-6">
    <AdminTable :data="event?.guests" :columns="columns" />
  </div>
</template>
