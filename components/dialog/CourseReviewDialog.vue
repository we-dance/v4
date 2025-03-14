<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Input } from '~/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog'

const props = defineProps<{
  courseName: string
  onSubmit: (review: {
    rating: number
    comment: string
    reviewerName: string
  }) => void
}>()

const rating = ref(5)
const comment = ref('')
const reviewerName = ref('')

const handleSubmit = () => {
  props.onSubmit({
    rating: rating.value,
    comment: comment.value,
    reviewerName: reviewerName.value || 'Anonymous User',
  })
  const dialog = useDialog()
  dialog.close()
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Leave a review</DialogTitle>
      <DialogDescription>
        Share your thoughts about the course "{{ courseName }}"
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4">
      <div class="space-y-2">
        <label for="reviewer-name" class="text-sm font-medium">Your name</label>
        <Input
          id="reviewer-name"
          v-model="reviewerName"
          placeholder="Enter your name"
        />
      </div>

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

      <div class="space-y-2">
        <label for="review" class="text-sm font-medium">Your review</label>
        <Textarea
          id="review"
          v-model="comment"
          placeholder="Share your thoughts..."
          rows="4"
        />
      </div>
    </div>

    <DialogFooter>
      <Button type="button" variant="outline" @click="useDialog().close()">
        Cancel
      </Button>
      <Button type="button" @click="handleSubmit">Submit</Button>
    </DialogFooter>
  </DialogContent>
</template>
