<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  slug: z.string(),
})

const { $client } = useNuxtApp()
const route = useRoute()

const { slug } = schema.parse(route.params)

const course = await $client.courses.view.query({ slug })
</script>

<template>
  <div class="min-h-screen bg-muted">
    <CourseHeader :course="course" />
  </div>
</template>
