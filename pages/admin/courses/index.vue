<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#components'

const isLoading = ref(true)
const searchQuery = ref('')
const selectedFilter = ref('all')
const viewMode = ref('grid')
const sortBy = ref('newest')

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
  { label: 'All Courses', value: 'all', icon: 'lucide:layout-grid' },
  { label: 'Published', value: 'published', icon: 'lucide:check-circle' },
  { label: 'Drafts', value: 'draft', icon: 'lucide:file-edit' }
]

const sortOptions = [
  { label: 'Newest First', value: 'newest', icon: 'lucide:clock' },
  { label: 'Oldest First', value: 'oldest', icon: 'lucide:history' },
  { label: 'Most Popular', value: 'popular', icon: 'lucide:trending-up' }
]

const selectedOption = computed(() => filterOptions.find(o => o.value === selectedFilter))
const selectedSortOption = computed(() => sortOptions.find(o => o.value === sortBy))

const filteredAndSortedCourses = computed(() => {
  let result = courses.value.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || course.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  // Sort courses
  switch (sortBy) {
    case 'oldest':
      result = [...result].reverse()
      break
    case 'popular':
      result = [...result].sort((a, b) => b.studentsCount - a.studentsCount)
      break
    default: // newest
      result = [...result]
  }

  return result
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
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
          Create, manage and track your dance courses
        </p>
      </div>
      <NuxtLink to="/admin/courses/new">
        <Button size="lg" class="shadow-sm">
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </NuxtLink>
    </div>

    <!-- Filters Section -->
    <Card class="mb-6">
      <CardContent class="p-4">
        <div class="flex flex-col md:flex-row items-end gap-4">
          <!-- Search -->
          <div class="flex-1">
            <Label class="text-sm font-medium mb-2">Search</Label>
            <div class="relative">
              <Icon 
                name="lucide:search" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
              <Input
                v-model="searchQuery"
                placeholder="Search courses..."
                class="pl-9"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div class="w-[180px]">
            <Label class="text-sm font-medium mb-2">Status</Label>
            <Select v-model:model-value="selectedFilter">
              <SelectTrigger>
                <SelectValue :placeholder="selectedOption?.label || 'Select status'">
                  <div class="flex items-center gap-2">
                    <Icon :name="selectedOption?.icon || 'lucide:filter'" class="w-4 h-4" />
                    {{ selectedOption?.label }}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="option in filterOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    <div class="flex items-center gap-2">
                      <Icon :name="option.icon" class="w-4 h-4" />
                      {{ option.label }}
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Sort Filter -->
          <div class="w-[180px]">
            <Label class="text-sm font-medium mb-2">Sort by</Label>
            <Select v-model:model-value="sortBy">
              <SelectTrigger>
                <SelectValue :placeholder="selectedSortOption?.label || 'Sort by'">
                  <div class="flex items-center gap-2">
                    <Icon :name="selectedSortOption?.icon || 'lucide:arrow-up-down'" class="w-4 h-4" />
                    {{ selectedSortOption?.label }}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="option in sortOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    <div class="flex items-center gap-2">
                      <Icon :name="option.icon" class="w-4 h-4" />
                      {{ option.label }}
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- View Toggle -->
          <div class="flex items-center gap-2 p-1 bg-muted rounded-md h-10">
            <Button
              variant="ghost"
              size="sm"
              class="h-8"
              :class="{ 'bg-background shadow-sm': viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <Icon name="lucide:grid" class="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="h-8"
              :class="{ 'bg-background shadow-sm': viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <Icon name="lucide:list" class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

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
    <Card v-else-if="filteredAndSortedCourses.length === 0" class="py-12">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Icon name="lucide:book" class="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 class="text-lg font-medium mb-2">No courses found</h3>
        <p class="text-sm text-muted-foreground mb-6">
          {{ searchQuery ? 'Try adjusting your search terms or filters' : 'Create your first course to get started' }}
        </p>
        <NuxtLink to="/admin/courses/new">
          <Button>
            <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
            Create your first course
          </Button>
        </NuxtLink>
      </div>
    </Card>

    <!-- Course Grid -->
    <TransitionGroup
      :name="viewMode === 'grid' ? 'course-grid' : 'course-list'"
      tag="div"
      :class="[
        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
      ]"
    >
      <Card
        v-for="course in filteredAndSortedCourses"
        :key="course.id"
        class="group overflow-hidden transition-all duration-200 hover:shadow-md"
        :class="{ 'flex': viewMode === 'list' }"
      >
        <div
          class="relative h-48 bg-muted"
          :class="{ 'w-64 shrink-0': viewMode === 'list' }"
        >
          <img
            :src="course.image"
            :alt="course.title"
            class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            @error="handleImageError"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm" as="a" :href="`/admin/courses/${course.id}`">
              <Icon name="lucide:eye" class="w-4 h-4" />
            </Button>
            <NuxtLink :to="`/admin/courses/${course.id}/edit`">
              <Button variant="secondary" size="sm">
                <Icon name="lucide:edit" class="w-4 h-4" />
              </Button>
            </NuxtLink>
          </div>
        </div>

        <div class="flex-1">
          <CardHeader>
            <div class="flex items-center justify-between gap-4">
              <CardTitle class="line-clamp-1">{{ course.title }}</CardTitle>
              <Badge
                :variant="course.status === 'published' ? 'default' : 'secondary'"
                class="capitalize"
              >
                {{ course.status }}
              </Badge>
            </div>
            <CardDescription>
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full overflow-hidden bg-muted">
                  <img
                    :src="course.instructor.image"
                    :alt="course.instructor.name"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
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
                <Icon name="lucide:users" class="w-4 h-4 text-muted-foreground" />
                {{ course.studentsCount }} students
              </div>
              <div class="flex items-center gap-1">
                <Icon name="lucide:star" class="w-4 h-4 text-yellow-400" />
                {{ course.rating }}
              </div>
            </div>
          </CardContent>

          <CardFooter class="flex justify-between items-center bg-muted/50">
            <p class="text-lg font-semibold">{{ formatPrice(course.price) }}</p>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm" as="a" :href="`/admin/courses/${course.id}`">
                <Icon name="lucide:eye" class="w-4 h-4" />
              </Button>
              <NuxtLink :to="`/admin/courses/${course.id}/edit`">
                <Button variant="outline" size="sm">
                  <Icon name="lucide:edit" class="w-4 h-4" />
                </Button>
              </NuxtLink>
            </div>
          </CardFooter>
        </div>
      </Card>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.course-grid-move,
.course-list-move {
  transition: all 0.5s ease;
}

.course-grid-enter-active,
.course-grid-leave-active,
.course-list-enter-active,
.course-list-leave-active {
  transition: all 0.5s ease;
}

.course-grid-enter-from,
.course-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.course-list-enter-from,
.course-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.course-grid-leave-active,
.course-list-leave-active {
  position: absolute;
}
</style> 