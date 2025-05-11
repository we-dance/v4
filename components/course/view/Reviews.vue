<script setup lang="ts">
import { formatDate } from '~/utils/format'

const dialog = useDialog()

const { isLoggedIn } = useAppAuth()

const { course } = defineProps<{
  course: any
}>()

const handleAddReview = () => {
  dialog.open({
    component: 'ReviewDialog',
    props: {
      course: course,
    },
  })
}
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b flex items-center justify-between">
      <h3 class="font-semibold">Student Reviews</h3>
      <Button v-if="isLoggedIn" variant="secondary" @click="handleAddReview"
        >Write a Review</Button
      >
      <Button v-else as-child variant="secondary">
        <NuxtLink :to="`/login?redirect=/courses/${course.slug}`">
          Sign in to review
        </NuxtLink>
      </Button>
    </div>
    <div class="divide-y">
      <div v-for="review in course.reviews" :key="review.id" class="p-4">
        <div v-if="review.content?.rating" class="flex items-center gap-2 mb-2">
          <div class="flex">
            <Icon
              v-for="i in review.content.rating"
              :key="i"
              name="ph:star-fill"
              class="w-4 h-4 text-warning"
            />
          </div>
          <span class="text-sm text-muted-foreground">{{
            review.author.name
          }}</span>
          <span class="text-xs text-muted-foreground">
            {{ formatDate(review.createdAt) }}
          </span>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ review.summary }}
        </p>
      </div>
    </div>
  </div>
</template>
