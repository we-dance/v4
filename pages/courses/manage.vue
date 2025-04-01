<script setup lang="ts">
const { auth, isLoggedIn } = useAppAuth()

const courses = ref([])
const selectedCourse = ref(null)
const showForm = ref(false)

const handleSubmit = async (data: any) => {
  if (selectedCourse.value) {
    // Update existing course
    // TODO: Implement course update logic
    const index = courses.value.findIndex(
      (c) => c.id === selectedCourse.value.id
    )
    courses.value[index] = { ...selectedCourse.value, ...data }
  } else {
    // Create new course
    // TODO: Implement course creation logic
    courses.value.push({
      id: Date.now(),
      ...data,
      instructor: auth.value?.user?.name,
    })
  }
  showForm.value = false
  selectedCourse.value = null
}

const editCourse = (course: any) => {
  selectedCourse.value = course
  showForm.value = true
}

const createNewCourse = () => {
  selectedCourse.value = null
  showForm.value = true
}
</script>

<template>
  <div class="container py-8 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Course Management</h1>
      <Button @click="createNewCourse">Create Course</Button>
    </div>

    <Dialog :open="showForm" @update:open="showForm = $event">
      <DialogContent class="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{{
            selectedCourse ? 'Edit Course' : 'Create New Course'
          }}</DialogTitle>
          <DialogDescription>
            Fill in the course details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CourseForm
          :initial-data="selectedCourse"
          :is-editing="!!selectedCourse"
          @submit="handleSubmit"
        />
      </DialogContent>
    </Dialog>

    <div v-if="courses.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">
        No courses yet. Create your first course!
      </p>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="course in courses" :key="course.id">
        <CardHeader>
          <CardTitle>{{ course.title }}</CardTitle>
          <CardDescription> By {{ course.instructor }} </CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">{{ course.description }}</p>
          <p class="mt-2 font-medium">${{ course.price }}</p>
          <div v-if="course.videos.length" class="mt-2">
            <p class="text-sm font-medium">
              {{ course.videos.length }} video(s)
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" @click="editCourse(course)"
            >Edit Course</Button
          >
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
