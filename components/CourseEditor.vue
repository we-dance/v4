<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CourseFormData } from '~/schemas/courseForm'
import type { CourseModule } from '~/schemas/courseModule'
import type { CourseMaterial } from '~/schemas/courseMaterial'
import { toast } from 'vue-sonner'
import { Icon } from '#components'

const props = defineProps<{
  courseId: string
}>()

const emit = defineEmits<{
  (e: 'save', data: CourseFormData): void
  (e: 'cancel'): void
}>()

const isLoading = ref(true)
const courseData = ref<Partial<CourseFormData>>({})
const modules = ref<CourseModule[]>([])
const materials = ref<CourseMaterial[]>([])

// Load course data when component mounts
onMounted(async () => {
  try {
    // TODO: Replace with actual API call
    // Mock data for now
    courseData.value = {
      name: 'Sample Course',
      description: 'Sample description',
      instructorName: 'John Doe',
      price: 49.99,
    }

    modules.value = [
      {
        id: '1',
        title: 'Module 1',
        description: 'Introduction',
        order: 0,
        videos: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    materials.value = [
      {
        id: '1',
        name: 'Course Handbook',
        description: 'Comprehensive guide',
        fileUrl: 'https://example.com/handbook.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    isLoading.value = false
  } catch (error) {
    toast.error('Failed to load course data')
    console.error(error)
  }
})

const handleSave = (data: CourseFormData) => {
  emit('save', {
    ...data,
    modules: modules.value,
    materials: materials.value
  })
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-[calc(100vh-4rem)]">
    <div class="animate-spin h-8 w-8 text-primary">
      <Icon name="heroicons:arrow-path" class="h-8 w-8" />
    </div>
  </div>
  <CourseBuilder
    v-else
    mode="edit"
    :initial-data="courseData"
    :initial-modules="modules"
    :initial-materials="materials"
    @submit="handleSave"
    @cancel="$emit('cancel')"
  >
    <template #header>
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="heroicons:clock" class="h-4 w-4" />
        <span>Last edited {{ new Date(courseData.updatedAt || Date.now()).toLocaleString() }}</span>
      </div>
    </template>
  </CourseBuilder>
</template> 