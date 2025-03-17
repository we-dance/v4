<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">
        My Courses
      </h1>
      <Button as="nuxt-link" to="/courses/new">
        <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
        Create New Course
      </Button>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="n in 3" :key="n">
        <div class="animate-pulse">
          <div class="h-48 bg-muted" />
          <CardHeader>
            <div class="h-6 bg-muted rounded w-3/4" />
            <div class="h-4 bg-muted rounded w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <div class="h-4 bg-muted rounded w-full mt-2" />
            <div class="h-4 bg-muted rounded w-3/4 mt-2" />
          </CardContent>
        </div>
      </Card>
    </div>

    <div v-else-if="courses.length === 0" class="text-center py-12">
      <div class="text-muted-foreground mb-4">
        <Icon name="lucide:book" class="w-12 h-12 mx-auto mb-4" />
        <p>No courses yet</p>
      </div>
      <Button as="nuxt-link" to="/courses/new">
        Create your first course
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="course in courses" :key="course.id" class="overflow-hidden">
        <!-- Course Image with fallback -->
        <div class="relative h-48 bg-muted">
          <img
            :src="course.image"
            :alt="course.title"
            class="w-full h-full object-cover"
            @error="$event.target.style.display = 'none'"
          />
        </div>

        <CardHeader>
          <CardTitle>{{ course.title }}</CardTitle>
          <CardDescription>
            <div class="flex items-center gap-2">
              <!-- Instructor Avatar with fallback -->
              <div class="w-6 h-6 rounded-full overflow-hidden bg-primary flex items-center justify-center">
                <img
                  :src="course.instructor.image"
                  :alt="course.instructor.name"
                  class="w-full h-full object-cover"
                  @error="$event.target.style.display = 'none'"
                />
                <span v-if="!course.instructor.image" class="text-xs text-primary-foreground">
                  {{ getInitials(course.instructor.name) }}
                </span>
              </div>
              <span class="text-sm">{{ course.instructor.name }}</span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p class="text-sm text-muted-foreground">
            {{ course.description }}
          </p>
          <div class="flex items-center gap-2 mt-4">
            <Badge>{{ course.educationalLevel }}</Badge>
            <Badge variant="outline">{{ course.courseMode }}</Badge>
          </div>
        </CardContent>

        <CardFooter class="flex justify-between items-center">
          <p class="text-lg font-bold">${{ course.price }}</p>
          <Button as="nuxt-link" :to="`/courses/${course.id}/edit`" variant="outline" size="sm">
            <Icon name="lucide:edit" class="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)
const courses = ref([
  {
    id: 1,
    title: 'Salsa Fundamentals',
    description: 'Learn the basics of Cuban Salsa',
    educationalLevel: 'Beginner',
    courseMode: 'hybrid',
    price: 99,
    // Using a real placeholder image service
    image: 'https://placehold.co/600x400',
    instructor: {
      name: 'John Doe',
      // Using a real avatar placeholder
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  {
    id: 2,
    title: 'Bachata Basics',
    description: 'Master the fundamentals of Bachata',
    educationalLevel: 'Beginner',
    courseMode: 'onsite',
    price: 129,
    image: 'https://placehold.co/600x400',
    instructor: {
      name: 'Maria Garcia',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    }
  }
])

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
</script>
