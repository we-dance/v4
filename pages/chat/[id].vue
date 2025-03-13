<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden h-[600px]"
      >
        <ChatConversation :conversation-id="conversationId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const conversationId = route.params.id as string
</script>
