<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const route = useRoute()
const courseId = route.query.id as string

// TODO: Replace with actual course data fetching
const course = ref({
  title: 'Introduction to Salsa',
  instructor: 'John Doe',
  price: 99.99,
  duration: '6 weeks',
  level: 'Beginner',
  description: 'A comprehensive introduction to Salsa dancing covering basic steps, rhythm, and partner work.',
  modules: [
    {
      id: '1',
      title: 'Getting Started with Salsa',
      description: 'Learn the basic steps and rhythm of Salsa.',
      videos: [
        {
          id: '1',
          title: 'Basic Steps',
          duration: '15:00',
          thumbnail: '/placeholder.jpg'
        }
      ],
      materials: [
        {
          id: '1',
          filename: 'Salsa-Basic-Steps.pdf'
        }
      ]
    }
  ]
})

const handlePublish = () => {
  // TODO: Implement course publishing logic
}

const handleSaveDraft = () => {
  // TODO: Implement draft saving logic
}
</script>

<template>
  <div>
    <div class="container py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Review & Publish Course</h1>
      </div>
      
      <CourseReviewAndPublish
        :course="course"
        @publish="handlePublish"
        @save-draft="handleSaveDraft"
      />
    </div>
  </div>
</template> 