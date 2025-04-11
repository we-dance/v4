<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const { $client } = useNuxtApp()

const courses = ref<any[]>([])

const getCourses = async () => {
  const result = await $client.courses.myList.query()
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
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Manage Courses</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-2">
      <Input placeholder="Search courses..." />
      <Button @click="handleCreateCourse"> Create Course </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <NuxtLink
        v-for="course in courses"
        :key="course.slug"
        :to="`/admin/courses/${course.slug}`"
      >
        <CourseCard :course="course" />
      </NuxtLink>
    </div>
  </div>
</template>
