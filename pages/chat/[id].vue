<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden h-[600px]"
      >
        <ChatConversation
          :conversation-id="conversationId"
          :recipient-id="recipientId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const conversationId = computed(() => {
  const id = route.params.id as string
  // If ID starts with "new-", it's a new conversation
  if (id.startsWith('new-')) {
    return null
  }
  return id
})

const recipientId = computed(() => {
  const id = route.params.id as string
  // Extract recipient ID from "new-{recipientId}" format
  if (id.startsWith('new-')) {
    return id.substring(4) // Remove "new-" prefix
  }
  return null
})
</script>
