<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const eventId = '123' // Replace with dynamic event ID
const content = ref('')
const errorMessage = ref('')

const schema = z.object({
  content: z.string().min(150, 'Update must be at least 150 characters long'),
})

const postUpdate = async () => {
  errorMessage.value = ''

  const validation = schema.safeParse({ content: content.value })

  if (!validation.success) {
    errorMessage.value = validation.error.issues[0].message
    return
  }

  try {
    const response = await fetch('/api/event-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, content: content.value }),
    })

    if (!response.ok) throw new Error('Failed to post update')

    content.value = ''
    alert('Event update posted successfully!')
  } catch (error) {
    errorMessage.value = 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between bg-primary/10 p-2 px-4 rounded-lg"
  >
    <div class="text-sm text-primary font-medium">Share updates to event</div>

    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

    <Button variant="primary" class="flex items-center gap-2">
      <Icon name="ph:plus" class="w-5 h-5" />
      Post an update
    </Button>
  </div>
</template>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
