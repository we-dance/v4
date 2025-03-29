<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()

const handleAddReview = () => {
  console.log('handleAddReview')
}
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b flex items-center justify-between">
      <h3 class="font-semibold">Student Reviews</h3>
      <Button @click="handleAddReview">Review</Button>
    </div>
    <div class="divide-y">
      <div v-for="review in course.review" :key="review.identifier" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="flex">
            <Icon
              v-for="i in review.reviewRating.ratingValue"
              :key="i"
              name="ph:star-fill"
              class="w-4 h-4 text-warning"
            />
          </div>
          <span class="text-sm text-muted-foreground">{{
            review.author.name
          }}</span>
          <span class="text-xs text-muted-foreground">
            {{ new Date(review.datePublished).toLocaleDateString() }}
          </span>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ review.reviewBody }}
        </p>
      </div>
    </div>
  </div>
</template>
