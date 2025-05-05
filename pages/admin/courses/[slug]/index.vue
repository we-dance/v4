<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()

const course = ref<any>(null)
const loading = ref(true)

const loadCourse = async () => {
  try {
    loading.value = true
    const result = await $client.courses.admin.query({
      slug: route.params.slug as string,
    })
    course.value = result
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    loading.value = false
  }
}

await loadCourse()

const data = computed(() => {
  const members = []

  for (const offer of course.value.offers) {
    for (const subscription of offer.subscriptions) {
      members.push({ ...subscription.user, subscription, offer })
    }
  }

  return members
})

const columns: ColumnDef<any>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Username',
    accessorKey: 'profile.username',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Offer',
    accessorKey: 'offer.name',
  },
  {
    header: 'Status',
    accessorKey: 'subscription.status',
  },
  {
    header: 'Created At',
    accessorKey: 'subscription.createdAt',
  },
]

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink as-child>
            <NuxtLink to="/admin/courses"> Manage Courses </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ course?.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex-1" />
    <Button variant="ghost" as-child>
      <NuxtLink :to="`/admin/courses/${course?.slug}/edit`">
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit
      </NuxtLink>
    </Button>
  </header>

  <div class="w-full space-y-6 p-4 mx-auto">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
