<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useDialog } from '~/composables/useDialog'

const router = useRouter()
const dialog = useDialog()

// Mock data - replace with actual course store/data
const course = ref({
  title: 'Introduction to Web Development',
  description: 'Learn the fundamentals of web development',
  level: 'Beginner',
  category: 'Programming',
  price: 49.99,
  thumbnail: '/path/to/thumbnail.jpg'
})

const modules = ref([
  {
    id: '1',
    title: 'HTML Basics',
    description: 'Learn HTML fundamentals',
    videos: [
      { id: '1', title: 'Introduction to HTML' }
    ]
  }
])

const materials = ref([
  {
    id: '1',
    name: 'HTML Cheatsheet.pdf',
    fileType: 'application/pdf'
  }
])

// Validation checks
const isCourseInfoComplete = computed(() => {
  return course.value.title &&
    course.value.description &&
    course.value.level &&
    course.value.category &&
    course.value.price &&
    course.value.thumbnail
})

const isModulesComplete = computed(() => {
  return modules.value.length > 0 && modules.value.every(m => m.videos.length > 0)
})

const isMaterialsComplete = computed(() => {
  return materials.value.length > 0
})

const navigateToStep = (step: string) => {
  router.push(`/admin/courses/create/${step}`)
}

const handlePublish = () => {
  dialog.open({
    title: 'Publish Course',
    description: 'Are you sure you want to publish this course? Once published, it will be visible to all students.',
    confirmText: 'Publish',
    cancelText: 'Cancel',
    onConfirm: () => {
      // Add your publish logic here
      toast.success('Course published successfully!')
    }
  })
}

const getStatusIcon = (isComplete: boolean) => {
  return isComplete ? '✓' : '⚠️'
}

const getStatusClass = (isComplete: boolean) => {
  return isComplete ? 'text-success' : 'text-warning'
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Review Course</h1>
      <Button @click="handlePublish" variant="default">Publish Course</Button>
    </div>

    <!-- Course Info Section -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <div class="space-y-1">
          <CardTitle>
            Course Info
            <span
              :class="['ml-2', getStatusClass(isCourseInfoComplete)]"
              v-text="getStatusIcon(isCourseInfoComplete)"
            ></span>
          </CardTitle>
          <CardDescription>Basic information about your course</CardDescription>
        </div>
        <Button variant="ghost" @click="navigateToStep('info')">
          <div class="i-heroicons-pencil-square h-4 w-4 mr-2"></div>
          Edit
        </Button>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-muted-foreground">Title</p>
            <p>{{ course.title }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Category</p>
            <p>{{ course.category }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Level</p>
            <p>{{ course.level }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Price</p>
            <p>{{ course.price }}</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-muted-foreground">Description</p>
          <p class="mt-1">{{ course.description }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- Modules Section -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <div class="space-y-1">
          <CardTitle>
            Modules
            <span
              :class="['ml-2', getStatusClass(isModulesComplete)]"
              v-text="getStatusIcon(isModulesComplete)"
            ></span>
          </CardTitle>
          <CardDescription>Course content and videos</CardDescription>
        </div>
        <Button variant="ghost" @click="navigateToStep('modules')">
          <div class="i-heroicons-pencil-square h-4 w-4 mr-2"></div>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div v-if="modules.length > 0" class="space-y-4">
          <div
            v-for="module in modules"
            :key="module.id"
            class="border rounded-lg p-4"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-medium">{{ module.title }}</h3>
              <Badge variant="secondary">
                {{ module.videos.length }} videos
              </Badge>
            </div>
            <p class="text-sm text-muted-foreground mt-1">{{ module.description }}</p>
          </div>
        </div>
        <div v-else class="text-center py-8 text-muted-foreground">
          No modules added yet
        </div>
      </CardContent>
    </Card>

    <!-- Materials Section -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between space-y-0">
        <div class="space-y-1">
          <CardTitle>
            Materials
            <span
              :class="['ml-2', getStatusClass(isMaterialsComplete)]"
              v-text="getStatusIcon(isMaterialsComplete)"
            ></span>
          </CardTitle>
          <CardDescription>Supplementary course materials</CardDescription>
        </div>
        <Button variant="ghost" @click="navigateToStep('materials')">
          <div class="i-heroicons-pencil-square h-4 w-4 mr-2"></div>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div v-if="materials.length > 0" class="space-y-2">
          <div
            v-for="material in materials"
            :key="material.id"
            class="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
          >
            <div
              :class="[
                material.fileType.includes('pdf') ? 'i-heroicons-document-text' : 'i-heroicons-document',
                'h-5 w-5 text-muted-foreground'
              ]"
            ></div>
            <span class="text-sm">{{ material.name }}</span>
          </div>
        </div>
        <div v-else class="text-center py-8 text-muted-foreground">
          No materials added yet
        </div>
      </CardContent>
    </Card>
  </div>
</template> 