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
    class="container max-w-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
  >
    <h2 class="text-lg ml-4 font-semibold mb-2">Share updates to event</h2>
    <textarea
      v-model="content"
      class="w-full p-2 border-2 border-white-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
      placeholder="Write your update..."
    ></textarea>
    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

    <div class="flex justify-end py-3 mt-[-15px]">
      <button
        @click="postUpdate"
        class="mt-2 px-2 py-2 bg-black text-white rounded mr-7 hover:bg-primary"
      >
        Post an update
      </button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
