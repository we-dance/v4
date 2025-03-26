<script setup lang="ts">
import type { CourseFormData } from '~/schemas/courseForm'
import { useRouter, useRoute } from '#app'
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const route = useRoute()

const isEditMode = computed(() => route.query.id !== undefined)
const courseId = computed(() => route.query.id as string)

// TODO: Fetch course data using the ID from route.query.id
const courseData = ref<Partial<CourseFormData>>({
  name: '',
  description: '',
  instructorName: '',
  price: 0
})

const handleSubmit = (data: CourseFormData) => {
  // TODO: Implement course creation/update logic
  if (isEditMode.value) {
    console.log('Updating course:', courseId.value, data)
  } else {
    console.log('Creating course:', data)
  }
  router.push('/admin/courses')
}

const handleCancel = () => {
  router.push('/admin/courses')
}
</script>

<template>
  <div class="container py-6">
    <div class="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="icon" @click="handleCancel">
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
      </Button>
      <div>
        <h1 class="text-3xl font-bold">{{ isEditMode ? 'Edit Course' : 'Create New Course' }}</h1>
        <p class="text-muted-foreground mt-1">
          {{ isEditMode ? 'Update your course details' : 'Add a new course to your catalog' }}
        </p>
      </div>
    </div>

    <Card class="p-6">
      <CourseBuilder
        :mode="isEditMode ? 'edit' : 'create'"
        :initial-data="courseData"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </Card>
  </div>
</template> 