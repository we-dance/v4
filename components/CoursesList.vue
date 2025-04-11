<script setup lang="ts">
import { getMinPrice } from '~/utils/format'

const { $client } = useNuxtApp()
const { courses } = await $client.courses.list.query({ limit: 10 })
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <NuxtLink
        v-for="course in courses"
        :key="course.slug"
        :to="`/courses/${course.slug}`"
      >
        <CourseCard :course="course" />
      </NuxtLink>
    </div>

    <EmptyState v-if="courses.length === 0" variant="no-results" />
  </div>
</template>
