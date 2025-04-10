<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const { $client } = useNuxtApp()

const courses = ref<any[]>([])

const getCourses = async () => {
  const result = await $client.courses.list.query({ limit: 10 })
  courses.value = result.courses
}

await getCourses()

const dialog = useDialog()
const handleCreateCourse = () => {
  dialog.open({
    component: 'CourseCreateDialog',
    props: {
      onSuccess: async () => {
        await getCourses()
      },
    },
  })
}
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Courses</h1>
      <Button @click="handleCreateCourse"> Create Course </Button>
    </div>

    <div class="flex items-center gap-2">
      <Input placeholder="Search courses..." />
    </div>

    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instructor</TableHead>
            <TableHead>Name</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="course in courses" :key="course.id">
            <TableCell>{{ course?.instructor?.name }}</TableCell>
            <TableCell>{{ course.name }}</TableCell>
            <TableCell class="text-right">
              <NuxtLink :to="`/admin/courses/${course.slug}`">
                <Button variant="ghost" size="icon">
                  <Icon name="ph:pencil" />
                </Button>
              </NuxtLink>
            </TableCell>
          </TableRow>
          <TableRow v-if="courses.length === 0">
            <TableCell
              colspan="3"
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
