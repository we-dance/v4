<template>
  <div class="chat-list">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div
        class="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"
      ></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-4 text-red-500">
      {{ error }}
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!conversations?.length"
      class="text-center py-8 text-gray-500"
    >
      <p class="mb-2">No conversations yet</p>
      <p class="text-sm">
        Start a new conversation by clicking the "New Message" button above.
      </p>
    </div>

    <!-- Conversations list -->
    <div v-else class="divide-y divide-gray-200 dark:divide-gray-800">
      <NuxtLink
        v-for="conversation in conversations"
        :key="conversation.id"
        :to="`/chat/${conversation.id}`"
        class="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div class="flex items-start">
          <!-- Avatar -->
          <div class="flex-shrink-0 mr-3">
            <img
              v-if="getOtherParticipant(conversation)?.photo"
              :src="getOtherParticipant(conversation)?.photo"
              alt="Profile"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div
              v-else
              class="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <span class="text-gray-500 dark:text-gray-400">
                {{ getInitials(getOtherParticipant(conversation)?.name) }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <h3 class="text-sm font-medium truncate">
                {{ getOtherParticipant(conversation)?.name || 'Unknown User' }}
              </h3>
              <span
                v-if="conversation.lastMessage?.createdAt"
                class="text-xs text-gray-500"
              >
                {{ formatTime(conversation.lastMessage.createdAt) }}
              </span>
            </div>

            <p class="text-sm text-gray-500 truncate mt-1">
              {{ conversation.lastMessage?.content || 'No messages yet' }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const { $client } = useNuxtApp()
const currentUser = computed(() => useAuthStore().user)

// Fetch conversations
const {
  data: conversations,
  isLoading,
  error,
  refresh,
} = useAsyncData('conversations', () => $client.chat.getConversations.query())

// Refresh conversations every minute
onMounted(() => {
  const interval = setInterval(() => {
    refresh()
  }, 60000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Get the other participant in a conversation
function getOtherParticipant(conversation: any) {
  if (!conversation?.participants || !currentUser.value) return null

  return conversation.participants.find(
    (p: any) => p.profileId !== currentUser.value?.id
  )
}

// Get initials from name
function getInitials(name: string | undefined) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Format timestamp
function formatTime(timestamp: string | Date) {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()

  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // If this year, show month and day
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })
  }

  // Otherwise show date
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
