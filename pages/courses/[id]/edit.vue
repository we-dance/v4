<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/course'

const router = useRouter()
const route = useRoute()

// Mock data - in real app this would come from API
const initialData = {
  title: 'Salsa Fundamentals',
  description: 'Learn the basics of Cuban Salsa',
  educationalLevel: 'Beginner',
  courseMode: 'hybrid',
  price: 99,
  priceCurrency: 'USD',
  inLanguage: ['English'],
  timeRequired: '6 weeks'
}

const handleSubmit = async (data: CourseFormData) => {
  try {
    // Mock successful update
    toast.success('Course updated successfully')
    router.push('/courses')
  } catch (error) {
    toast.error('Failed to update course')
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <Button variant="ghost" as="nuxt-link" to="/courses">
          <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <h1 class="text-2xl font-bold">
          Edit Course
        </h1>
      </div>
      
      <CourseForm 
        :initial-data="initialData"
        @submit="handleSubmit" 
      />
    </div>
  </div>
</template> 