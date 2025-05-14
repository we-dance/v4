<script setup lang="ts">
import { getDateTime } from '~/utils'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const { $client } = useNuxtApp()

const events = ref<any[]>([])
const searchQuery = ref('')

const getEvents = async () => {
  const result = await $client.events.myList.query({
    query: searchQuery.value,
  })
  events.value = result.events
}

await getEvents()

watch(searchQuery, getEvents)

const dialog = useDialog()
const handleCreateEvent = () => {
  dialog.open({
    component: 'EventCreateDialog',
    props: {
      onSuccess: async () => {
        await getEvents()
      },
    },
  })
}
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
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-2">
      <Input v-model="searchQuery" placeholder="Search events..." />
      <Button @click="handleCreateEvent"> Create Event </Button>
    </div>

    <div class="relative w-full overflow-auto">
      <Table class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead> Date </TableHead>
            <TableHead> Name </TableHead>
            <TableHead> Venue </TableHead>
            <TableHead> Status </TableHead>
            <TableHead> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="event in events"
            :key="event.id"
            class="hover:bg-muted"
          >
            <TableCell> {{ getDateTime(event.startDate) }} </TableCell>
            <TableCell class="font-medium"> {{ event.name }} </TableCell>
            <TableCell> {{ event.venue?.name }} </TableCell>
            <TableCell> {{ event.status }} </TableCell>
            <TableCell class="text-right flex gap-2">
              <Button variant="outline" size="icon" as-child>
                <NuxtLink :to="`/events/${event.id}`">
                  <Icon name="ph:eye" />
                </NuxtLink>
              </Button>
              <Button variant="outline" size="icon" as-child>
                <NuxtLink :to="`/admin/events/${event.id}/edit`">
                  <Icon name="ph:pencil" />
                </NuxtLink>
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="ph:trash" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
