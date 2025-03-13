<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Courses</h1>
      <Button asChild>
        <NuxtLink to="/admin/courses/create">Create Course</NuxtLink>
      </Button>
    </div>

    <div class="flex items-center gap-2">
      <Input placeholder="Search courses..." class="max-w-sm" />
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="dance">Dance</SelectItem>
          <SelectItem value="music">Music</SelectItem>
          <SelectItem value="art">Art</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colspan="6"
              class="text-center py-6 text-muted-foreground"
            >
              No courses found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
