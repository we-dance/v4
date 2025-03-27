<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()

const timeRequired = computed(() => {
  return 0
})

const numberOfLessons = computed(() => {
  return 0
})
</script>

<template>
  <div class="bg-background border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col gap-4 w-[97%]">
        <div class="text-sm text-muted-foreground uppercase tracking-wide">
          {{ course.subheader }}
        </div>
        <p class="text-lg">{{ course.description }}</p>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="ph:clock" class="w-4 h-4" />
            {{ timeRequired }}
          </div>
          <div class="flex items-center gap-2">
            <Icon name="ph:book-open" class="w-4 h-4" />
            {{ numberOfLessons }} lessons
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
