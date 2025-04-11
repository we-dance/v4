<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">Course Overview</h3>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold">
            {{ course.stats.enrolled }}
          </div>
          <div class="text-sm text-muted-foreground">Students</div>
        </div>
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold">
            {{ course.stats.completed }}
          </div>
          <div class="text-sm text-muted-foreground">Completed</div>
        </div>
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold text-warning">
            {{ course.aggregateRating.ratingValue || '?' }}
          </div>
          <div class="text-sm text-muted-foreground">Avg Rating</div>
        </div>
        <div class="text-center p-3 bg-muted rounded-lg">
          <div class="text-2xl font-bold">
            {{ course.aggregateRating.reviewCount }}
          </div>
          <div class="text-sm text-muted-foreground">Reviews</div>
        </div>
      </div>
    </div>
  </div>
</template>
