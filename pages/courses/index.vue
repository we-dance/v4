<script setup lang="ts">
const { $client } = useNuxtApp()
const { courses } = await $client.courses.list.query({ limit: 10 })
</script>

<template>
  <PageSimple
    title="Dance Courses"
    description="Learn dance online with world-class instructors"
  >
    <CoursesGrid
      :courses="courses"
      :link="(course) => `/courses/${course.slug}`"
    />
  </PageSimple>
</template>
