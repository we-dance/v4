<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog'

const props = defineProps<{
  course: any
  onSubmit: (review: { rating: number; reviewBody: string }) => void
}>()

const rating = ref(5)
const reviewBody = ref('')

const handleSubmit = () => {
  props.onSubmit({
    rating: rating.value,
    reviewBody: reviewBody.value,
  })
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Leave a Review</DialogTitle>
      <DialogDescription>
        Share your learning experience for "{{ course.name }}"
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4">
      <!-- Rating Stars -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Rating</label>
        <div class="flex items-center gap-1">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            class="focus:outline-none"
            @click="rating = i"
          >
            <Icon
              :name="i <= rating ? 'ph:star-fill' : 'ph:star'"
              class="w-6 h-6"
              :class="i <= rating ? 'text-warning' : 'text-muted-foreground'"
            />
          </button>
        </div>
      </div>

      <!-- Review Text -->
      <div class="space-y-2">
        <label for="review" class="text-sm font-medium">Your Review</label>
        <Textarea
          id="review"
          v-model="reviewBody"
          placeholder="Share your experience..."
          rows="4"
        />
      </div>
    </div>

    <DialogFooter>
      <Button
        type="button"
        variant="secondary"
        @click="$emit('update:open', false)"
      >
        Cancel
      </Button>
      <Button type="button" @click="handleSubmit">Submit</Button>
    </DialogFooter>
  </DialogContent>
</template>
