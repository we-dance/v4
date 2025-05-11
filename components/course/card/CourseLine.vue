<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()
</script>

<template>
  <NuxtLink :to="`/courses/${course.slug}`" class="group block h-full">
    <article
      class="bg-white flex dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm h-full"
    >
      <div class="flex-shrink-0">
        <img
          :src="course.coverUrl"
          :alt="course.name"
          class="w-full h-40 object-cover"
        />
      </div>
      <div class="p-4">
        <h2 class="font-bold text-lg leading-tight line-clamp-2">
          {{ course.name }}
        </h2>
        <div class="text-gray-500">by {{ course.instructor.name }}</div>
        <div class="text-sm text-gray-500">
          {{ course.description }}
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
