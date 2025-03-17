<script setup lang="ts">
const isLoading = ref(true)
const searchQuery = ref('')
const selectedFilter = ref('all')

const courses = ref([
  {
    id: 1,
    title: 'Salsa Fundamentals',
    description: 'Learn the basics of Cuban Salsa with step-by-step instructions and practice routines.',
    educationalLevel: 'Beginner',
    courseMode: 'hybrid',
    price: 99,
    status: 'published',
    studentsCount: 45,
    rating: 4.8,
    image: 'https://placehold.co/600x400/FF6B6B/ffffff?text=Salsa',
    instructor: {
      name: 'John Doe',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  {
    id: 2,
    title: 'Bachata Basics',
    description: 'Master the fundamentals of Bachata with our comprehensive course for beginners.',
    educationalLevel: 'Beginner',
    courseMode: 'onsite',
    price: 129,
    status: 'draft',
    studentsCount: 12,
    rating: 4.5,
    image: 'https://placehold.co/600x400/4ECDC4/ffffff?text=Bachata',
    instructor: {
      name: 'Maria Garcia',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    }
  }
])

const filterOptions = [
  { label: 'All Courses', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'draft' }
]

const filteredCourses = computed(() => {
  return courses.value
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesFilter = selectedFilter.value === 'all' || course.status === selectedFilter.value
      return matchesSearch && matchesFilter
    })
})

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

const getStatusColor = (status: string) => {
  return {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800'
  }[status] || 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold">
          Course Management
        </h1>
        <p class="text-muted-foreground mt-1">
          Manage your dance courses and track their performance
        </p>
      </div>
      <NuxtLink to="/admin/courses/new">
        <Button size="lg">
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </NuxtLink>
    </div>

    <!-- Filters Section -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex-1">
        <div class="relative">
          <Icon 
            name="lucide:search" 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
          />
          <Input
            v-model="searchQuery"
            placeholder="Search courses..."
            class="pl-10"
          />
        </div>
      </div>
      <Select v-model="selectedFilter" :options="filterOptions" />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="n in 3" :key="n" class="overflow-hidden">
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

    <!-- Empty State -->
    <div v-else-if="filteredCourses.length === 0" class="text-center py-12">
      <div class="text-muted-foreground mb-4">
        <Icon name="lucide:book" class="w-12 h-12 mx-auto mb-4" />
        <p class="text-lg font-medium">No courses found</p>
        <p class="text-sm mt-2">
          {{ searchQuery ? 'Try adjusting your search terms' : 'Create your first course to get started' }}
        </p>
      </div>
      <NuxtLink to="/admin/courses/new">
        <Button>Create your first course</Button>
      </NuxtLink>
    </div>

    <!-- Course Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="course in filteredCourses" :key="course.id" class="overflow-hidden group">
        <div class="relative h-48">
          <img
            :src="course.image"
            :alt="course.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <NuxtLink :to="`/admin/courses/${course.id}/edit`">
              <Button variant="secondary">
                <Icon name="lucide:edit" class="w-4 h-4 mr-2" />
                Edit Course
              </Button>
            </NuxtLink>
          </div>
        </div>

        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="line-clamp-1">{{ course.title }}</CardTitle>
            <span :class="['px-2 py-1 rounded-full text-xs font-medium', getStatusColor(course.status)]">
              {{ course.status }}
            </span>
          </div>
          <CardDescription>
            <div class="flex items-center gap-2">
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
          <p class="text-sm text-muted-foreground line-clamp-2 mb-4">
            {{ course.description }}
          </p>
          <div class="flex items-center gap-4 text-sm">
            <div class="flex items-center gap-1">
              <Icon name="lucide:users" class="w-4 h-4" />
              {{ course.studentsCount }} students
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
              {{ course.rating }}
            </div>
          </div>
        </CardContent>

        <CardFooter class="flex justify-between items-center bg-muted/50">
          <p class="text-lg font-bold">${{ course.price }}</p>
          <div class="flex gap-2">
            <Button variant="ghost" size="sm">
              <Icon name="lucide:eye" class="w-4 h-4" />
            </Button>
            <NuxtLink :to="`/admin/courses/${course.id}/edit`">
              <Button variant="outline" size="sm">
                <Icon name="lucide:edit" class="w-4 h-4" />
              </Button>
            </NuxtLink>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template> 