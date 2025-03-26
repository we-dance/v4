<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/courseForm'
import type { CourseModule } from '~/schemas/courseModule'
import type { CourseMaterial } from '~/schemas/courseMaterial'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()

// Course data state
const courseData = ref<Partial<CourseFormData>>({
  name: '',
  description: '',
  instructorName: '',
  price: 0,
  level: 'Beginner',
  category: 'Other',
  thumbnail: ''
})

const isLoading = ref(false)
const modules = ref<CourseModule[]>([])
const materials = ref<CourseMaterial[]>([])

const handleSubmit = async (data: CourseFormData) => {
  try {
    // TODO: Implement course creation logic
    const courseData = {
      ...data,
      modules: modules.value,
      materials: materials.value
    }
    
    toast.success('Course created successfully')
    router.push('/admin/courses')
  } catch (error) {
    toast.error('Failed to create course')
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

const handleSectionChange = (section: string) => {
  // Handle section change if needed
  console.log('Section changed:', section)
}
</script>

<template>
  <CourseFormLayout
    mode="create"
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
        submit-label="Save and Continue"
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
</template> 