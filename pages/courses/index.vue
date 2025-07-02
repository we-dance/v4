<script setup lang="ts">
const { $client } = useNuxtApp()

const { data, isLoading } = useQuery<any>({
  queryKey: ['courses.list'],
  queryFn: () => $client.courses.list.query({ limit: 10 }),
  retry: false,
  staleTime: 1000 * 60 * 5, // 5 min cache
})
</script>

<template>
  <PageSimple
    title="Dance Courses"
    description="Learn dance online with world-class instructors"
  >
    <Loader v-if="isLoading" />
    <CoursesGrid
      v-else
      :courses="data?.courses"
      :link="(course) => `/courses/${course.slug}`"
    />
  </PageSimple>
</template>
