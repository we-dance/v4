<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">About the Course</h3>
    </div>
    <div class="p-4">
      {{ course.description }}
    </div>
  </div>
</template>
