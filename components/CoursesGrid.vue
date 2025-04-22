<script setup lang="ts">
const { courses } = defineProps<{
  courses: any[]
  link: (course: any) => string
}>()
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <NuxtLink v-for="course in courses" :key="course.slug" :to="link(course)">
        <CourseCard :course="course" />
      </NuxtLink>
    </div>

    <EmptyState v-if="courses.length === 0" variant="no-results" />
  </div>
</template>
