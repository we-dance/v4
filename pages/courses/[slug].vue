<script setup lang="ts">
import { z } from 'zod'

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)
const course = await $client.courses.view.query({ slug })
</script>

<template>
  <CourseView :course="course" />
</template>
