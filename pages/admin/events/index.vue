<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Events</h1>
      <Button asChild>
        <NuxtLink to="/admin/events/create"> Create Event </NuxtLink>
      </Button>
    </div>

    <div class="flex items-center gap-2">
      <Input placeholder="Search events..." class="max-w-sm" />
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="class">Class</SelectItem>
          <SelectItem value="party">Party</SelectItem>
          <SelectItem value="festival">Festival</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colspan="6"
              class="text-center py-6 text-muted-foreground"
            >
              No events found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
