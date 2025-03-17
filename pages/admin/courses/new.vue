<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/course'

const router = useRouter()
const { auth } = useAppAuth()

const handleSubmit = async (data: CourseFormData) => {
  try {
    toast.success('Course created successfully')
    router.push('/admin/courses')
  } catch (error) {
    toast.error('Failed to create course')
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <Button variant="ghost" as="nuxt-link" to="/admin/courses">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <h1 class="text-2xl font-bold">
          Create New Course
        </h1>
      </div>
      
      <CourseForm @submit="handleSubmit" />
    </div>
  </div>
</template> 