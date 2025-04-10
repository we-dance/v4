<script setup lang="ts">
import { formatDuration } from '~/utils/format'

const { course } = defineProps<{
  course: any
}>()

const duration = computed(() => {
  return course.modules.reduce((acc: number, module: any) => {
    return (
      acc +
      module.lessons.reduce((acc: number, lesson: any) => {
        return acc + lesson.duration
      }, 0)
    )
  }, 0)
})

const numberOfLessons = computed(() => {
  return course.modules.reduce((acc: number, module: any) => {
    return acc + module.lessons.length
  }, 0)
})

const reviews = computed(() => {
  return course.reviews.length
})

const averageRating = computed(() => {
  return (
    course.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating
    }, 0) / course.reviews.length
  )
})
</script>

<template>
  <div class="bg-background border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col gap-4 w-[87%]">
        <div class="text-sm text-muted-foreground uppercase tracking-wide">
          {{ course.subheader }}
        </div>
        <p class="text-lg">{{ course.description }}</p>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="ph:clock" class="w-4 h-4" />
            {{ formatDuration(duration) }}
          </div>
          <div class="flex items-center gap-2">
            <Icon name="ph:book-open" class="w-4 h-4" />
            {{ numberOfLessons }} lessons
          </div>
          <div v-if="reviews > 0" class="flex items-center gap-1">
            <Icon name="ph:star-fill" class="w-4 h-4 text-orange-500" />
            {{ averageRating }} ({{ reviews }} reviews)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
