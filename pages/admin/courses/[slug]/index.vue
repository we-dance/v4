<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()

const course = ref<any>(null)
const loading = ref(true)

const loadCourse = async () => {
  try {
    loading.value = true
    const result = await $client.courses.view.query({
      slug: route.params.slug as string,
    })
    course.value = result
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    loading.value = false
  }
}

await loadCourse()
</script>

<template>
  <CourseEditor :course="course" @load="loadCourse" />
</template>
