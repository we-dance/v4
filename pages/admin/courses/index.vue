<template>
  <div class="container py-8 space-y-8">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold tracking-tight">Courses</h1>
        <p class="text-muted-foreground">Manage your dance courses here.</p>
      </div>
      <div class="flex items-center gap-4">
        <Button variant="outline" size="icon" @click="toggleView">
          <Icon :name="isGridView ? 'lucide:list' : 'lucide:grid'" class="w-4 h-4" />
        </Button>
        <Button 
          @click="router.push('/admin/courses/create')" 
          class="flex items-center"
        >
          <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Courses</CardTitle>
          <Icon name="lucide:book" class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ filteredCourses.length }}</div>
          <p class="text-xs text-muted-foreground">
            {{ courses.length > filteredCourses.length ? `Filtered from ${courses.length} total` : 'Total courses' }}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Videos</CardTitle>
          <Icon name="lucide:video" class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ totalVideos }}</div>
          <p class="text-xs text-muted-foreground">Across all courses</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Total Materials</CardTitle>
          <Icon name="lucide:file" class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ totalMaterials }}</div>
          <p class="text-xs text-muted-foreground">Across all courses</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-sm font-medium">Average Price</CardTitle>
          <Icon name="lucide:dollar-sign" class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">${{ averagePrice.toFixed(2) }}</div>
          <p class="text-xs text-muted-foreground">Per course</p>
        </CardContent>
      </Card>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="Search courses..."
          class="max-w-sm"
        >
          <template #prefix>
            <Icon name="lucide:search" class="w-4 h-4 text-muted-foreground" />
          </template>
        </Input>
      </div>
    </div>

    <!-- Course List -->
    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <div class="space-y-4 text-center">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin" />
        <p class="text-sm text-muted-foreground">Loading courses...</p>
      </div>
    </div>

    <div v-else-if="filteredCourses.length === 0" class="flex items-center justify-center py-8">
      <div class="space-y-4 text-center">
        <div class="p-4 rounded-full bg-muted">
          <Icon name="lucide:book" class="w-8 h-8 text-muted-foreground" />
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-medium">{{ searchQuery ? 'No courses found' : 'No courses yet' }}</h3>
          <p class="text-sm text-muted-foreground">
            {{ searchQuery ? 'Try adjusting your search or filters' : 'Create your first course to get started.' }}
          </p>
        </div>
        <div class="flex justify-center gap-4">
          <Button v-if="searchQuery" variant="outline" @click="resetFilters">Reset Filters</Button>
          <Button v-else @click="router.push('/admin/courses/create')">Create Course</Button>
        </div>
      </div>
    </div>

    <TransitionGroup 
      :name="isGridView ? 'grid' : 'list'"
      tag="div"
      :class="[
        isGridView ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'
      ]"
    >
      <Card
        v-for="course in filteredCourses"
        :key="course.id"
        :class="{ 'flex flex-row items-center': !isGridView }"
      >
        <template v-if="!isGridView">
          <div class="flex-1 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">{{ course.title }}</h3>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold">${{ course.price }}</div>
                <div class="text-sm text-muted-foreground">
                  {{ course.videos?.length || 0 }} videos
                </div>
              </div>
            </div>
          </div>
          <CardFooter class="flex gap-2 p-6 border-l">
            <Button variant="outline" size="sm" @click="editCourse(course)">
              <Icon name="lucide:pencil" class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" @click="duplicateCourse(course)">
              <Icon name="lucide:copy" class="w-4 h-4" />
            </Button>
            <Button variant="destructive" size="sm" @click="confirmDelete(course)">
              <Icon name="lucide:trash" class="w-4 h-4" />
            </Button>
          </CardFooter>
        </template>
        <template v-else>
          <CardHeader>
            <CardTitle>{{ course.title }}</CardTitle>
            <CardDescription class="line-clamp-2">{{ course.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="mt-4 space-y-2">
              <div class="flex items-center text-sm">
                <Icon name="lucide:video" class="w-4 h-4 mr-2 text-muted-foreground" />
                {{ course.videos?.length || 0 }} Videos
              </div>
              <div class="flex items-center text-sm">
                <Icon name="lucide:file" class="w-4 h-4 mr-2 text-muted-foreground" />
                {{ course.materials?.length || 0 }} Materials
              </div>
              <div class="flex items-center text-sm">
                <Icon name="lucide:dollar-sign" class="w-4 h-4 mr-2 text-muted-foreground" />
                {{ course.price }}
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button variant="outline" size="sm" @click="editCourse(course)">
              <Icon name="lucide:pencil" class="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" @click="duplicateCourse(course)">
              <Icon name="lucide:copy" class="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="destructive" size="sm" @click="confirmDelete(course)">
              <Icon name="lucide:trash" class="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </template>
      </Card>
    </TransitionGroup>

    <!-- Confirm Delete Dialog -->
    <Dialog :open="showConfirmDialog" @update:open="showConfirmDialog = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="showConfirmDialog = false">Cancel</Button>
          <Button variant="destructive" @click="handleDelete">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { ref, computed, onMounted } from 'vue'
import type { Course } from '~/composables/useCourses'
import { useRouter } from 'vue-router'
import { useToast } from '~/composables/useToast'

const {
  courses,
  isLoading,
  totalVideos,
  totalMaterials,
  fetchCourses,
  createCourse,
  deleteCourse
} = useCourses()

const { toast } = useToast()
const router = useRouter()

const showConfirmDialog = ref(false)
const selectedCourse = ref<Course | null>(null)
const isGridView = ref(true)
const searchQuery = ref('')

// Fetch courses on page load
onMounted(() => {
  fetchCourses()
})

const averagePrice = computed(() => {
  if (courses.value.length === 0) return 0
  const total = courses.value.reduce((sum, course) => sum + course.price, 0)
  return total / courses.value.length
})

const filteredCourses = computed(() => {
  let result = [...courses.value]
  
  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    )
  }
  
  return result
})

function toggleView() {
  isGridView.value = !isGridView.value
}

function editCourse(course: Course) {
  router.push(`/admin/courses/edit/${course.id}`)
}

async function duplicateCourse(course: Course) {
  try {
    const newCourse = await createCourse({
      ...course,
      title: `${course.title} (Copy)`,
    })
    toast({
      title: 'Course duplicated',
      description: 'The course has been duplicated successfully.'
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to duplicate course. Please try again.',
      variant: 'destructive'
    })
  }
}

function confirmDelete(course: Course) {
  selectedCourse.value = course
  showConfirmDialog.value = true
}

async function handleDelete() {
  if (selectedCourse.value?.id) {
    try {
      await deleteCourse(selectedCourse.value.id)
      showConfirmDialog.value = false
      toast({
        title: 'Course deleted',
        description: 'The course has been deleted successfully.'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete course. Please try again.',
        variant: 'destructive'
      })
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
}
</script>

<style scoped>
.grid-enter-active,
.grid-leave-active,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.grid-move,
.list-move {
  transition: transform 0.3s ease;
}
</style>
