<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()

const progress = computed(() => {
  return 0
})
</script>

<template>
  <div class="bg-background border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between w-[94%]">
        <div>
          <h1 class="text-2xl font-bold">{{ course.name }}</h1>
          <p class="text-sm text-muted-foreground">
            Instructor: {{ course.instructor.name }}
          </p>
        </div>
        <div class="text-right">
          <div class="text-sm text-muted-foreground">Progress</div>
          <div class="text-lg font-semibold">{{ progress }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
