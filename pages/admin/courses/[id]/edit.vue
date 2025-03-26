<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from '#app'
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/courseForm'
import type { CourseModule } from '~/schemas/courseModule'
import type { CourseMaterial } from '~/schemas/courseMaterial'

definePageMeta({
  layout: 'admin',
  validate: (route) => {
    return !isNaN(Number(route.params.id))
  }
})

const router = useRouter()
const route = useRoute()
const courseId = route.params.id as string

// State for active section
const activeSection = ref('info')

// Course data state
const courseData = ref<Partial<CourseFormData>>({
  name: '',
  description: '',
  instructorName: '',
  price: 0,
  duration: '<15 min',
  category: 'Other',
  tags: []
})

const isLoading = ref(true)
const modules = ref<CourseModule[]>([])
const materials = ref<CourseMaterial[]>([])

// Load course data
onMounted(async () => {
  try {
    // TODO: Replace with actual API call
    // For now, using mock data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    courseData.value = {
      name: 'Example Course',
      description: 'Example description',
      instructorName: 'John Doe',
      price: 49.99,
      duration: '30-60 min',
      category: 'Other',
      tags: ['dance', 'beginner']
    }

    modules.value = [
      {
        id: '1',
        name: 'Module 1',
        description: 'Introduction to the course',
        videos: [
          {
            id: '1',
            name: 'Welcome',
            description: 'Welcome to the course',
            url: 'https://example.com/video.mp4',
            thumbnailUrl: 'https://example.com/thumbnail.jpg',
            duration: 300
          }
        ]
      }
    ]

    materials.value = [
      {
        id: '1',
        name: 'Course Workbook.pdf',
        description: 'Supplementary workbook',
        fileUrl: 'https://example.com/workbook.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024, // 1MB
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  } catch (error) {
    toast.error('Failed to load course data')
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const handleSubmit = async (data: CourseFormData) => {
  try {
    // TODO: Implement course update logic
    const courseData = {
      ...data,
      modules: modules.value,
      materials: materials.value
    }
    
    toast.success('Course updated successfully')
    router.push('/admin/courses')
  } catch (error) {
    toast.error('Failed to update course')
    console.error(error)
  }
}

const handleSaveDraft = async () => {
  try {
    // TODO: Implement draft saving logic
    const draftData = {
      ...courseData.value,
      modules: modules.value,
      materials: materials.value,
      status: 'draft'
    }
    
    toast.success('Course saved as draft')
  } catch (error) {
    toast.error('Failed to save draft')
    console.error(error)
  }
}

const handleCancel = () => {
  router.push('/admin/courses')
}

// Handle section changes
const handleSectionChange = (section: string) => {
  activeSection.value = section
}
</script>

<template>
  <div class="container py-6">
    <div class="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" @click="handleCancel">
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
      </Button>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">Edit Course</h1>
        <p class="text-muted-foreground mt-1">
          Update your course content and materials
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" @click="handleSaveDraft">Save Draft</Button>
        <Button variant="primary" @click="handleSubmit">Update Course</Button>
      </div>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin i-heroicons-arrow-path h-8 w-8 text-primary" />
    </div>

    <Card v-else class="p-6">
      <CourseFormLayout
        mode="edit"
        :initial-data="courseData"
        :is-loading="isLoading"
        @submit="handleSubmit"
        @save-draft="handleSaveDraft"
        @cancel="handleCancel"
        @section-change="handleSectionChange"
      >
        <template #info>
          <CourseForm
            :initial-data="courseData"
            submit-label="Save Changes"
            @submit="handleSubmit"
          />
        </template>

        <template #modules>
          <ModuleManager
            :model-value="modules"
            @update:model-value="newModules => modules = newModules"
          />
        </template>

        <template #materials>
          <MaterialManager
            :model-value="materials"
            @update:model-value="newMaterials => materials = newMaterials"
          />
        </template>

        <template #review>
          <CourseReview
            :course-data="courseData"
            :modules="modules"
            :materials="materials"
          />
        </template>
      </CourseFormLayout>
    </Card>
  </div>
</template> 