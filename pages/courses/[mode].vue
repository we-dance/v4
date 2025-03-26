<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { CourseFormData } from '~/schemas/courseForm'

const route = useRoute()
const router = useRouter()

const mode = computed(() => {
  return route.params.mode === 'edit' ? 'edit' : 'create'
})

const courseId = computed(() => route.query.id as string)

// Mock initial data for edit mode - replace with actual API call
const initialData = ref<Partial<CourseFormData>>({})

onMounted(async () => {
  if (mode.value === 'edit' && courseId.value) {
    // TODO: Replace with actual API call
    initialData.value = {
      name: 'Sample Course',
      description: 'Sample description',
      instructorName: 'John Doe',
      price: 49.99,
    }
  }
})

const handleSubmit = async (data: CourseFormData) => {
  try {
    // TODO: Replace with actual API call
    if (mode.value === 'edit') {
      toast.success('Course updated successfully')
    } else {
      toast.success('Course created successfully')
    }
    router.push('/courses')
  } catch (error) {
    toast.error('Something went wrong')
  }
}

const handleCancel = () => {
  router.push('/courses')
}
</script>

<template>
  <CourseBuilder
    :mode="mode"
    :initial-data="initialData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template> 