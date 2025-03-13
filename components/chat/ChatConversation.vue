<template>
  <div class="chat-conversation flex flex-col h-full">
    <!-- Header -->
    <div class="border-b p-4 flex items-center">
      <NuxtLink
        to="/chat"
        class="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </NuxtLink>
      <div v-if="isLoading" class="flex-1">
        <div
          class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
      </div>
      <div v-else-if="conversation" class="flex items-center flex-1">
        <div class="flex-shrink-0">
          <img
            v-if="otherParticipant?.photo"
            :src="otherParticipant?.photo"
            alt="Profile"
            class="h-8 w-8 rounded-full object-cover"
          />
          <div
            v-else
            class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <span class="text-gray-500 dark:text-gray-400">{{
              getInitials(otherParticipant?.name)
            }}</span>
          </div>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ otherParticipant?.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
      <div v-if="isLoading" class="flex justify-center">
        <div
          class="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"
        ></div>
      </div>
      <div v-else-if="error" class="p-4 text-red-500">
        {{ error }}
      </div>
      <div
        v-else-if="!conversation?.messages?.length"
        class="text-center text-gray-500 py-8"
      >
        <p>No messages yet.</p>
        <p class="text-sm mt-2">
          Start the conversation by sending a message below.
        </p>
      </div>
      <template v-else>
        <div
          v-for="message in conversation.messages"
          :key="message.id"
          class="flex"
          :class="{ 'justify-end': message.senderId === currentUser?.id }"
        >
          <div
            class="max-w-[75%] rounded-lg px-4 py-2 break-words"
            :class="
              message.senderId === currentUser?.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            "
          >
            <p>{{ message.content }}</p>
            <p class="text-xs opacity-70 text-right mt-1">
              {{ formatTime(message.createdAt) }}
            </p>
          </div>
        </div>
      </template>
    </div>

    <!-- Message Input -->
    <div class="border-t p-4">
      <form @submit.prevent="sendMessage" class="flex">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
          :disabled="isSending"
        />
        <button
          type="submit"
          class="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          :disabled="!newMessage.trim() || isSending"
        >
          <span v-if="isSending">
            <div
              class="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"
            ></div>
          </span>
          <span v-else>Send</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
  conversationId: string
}>()

const route = useRoute()
const messagesContainer = ref<HTMLElement | null>(null)
const newMessage = ref('')
const isSending = ref(false)

const currentUser = computed(() => useAuthStore().user)

const { $client } = useNuxtApp()
const {
  data: conversation,
  isLoading,
  error,
  refresh,
} = useAsyncData(
  () => `conversation-${props.conversationId}`,
  () =>
    $client.chat.getConversation.query({ conversationId: props.conversationId })
)

const otherParticipant = computed(() => {
  if (!conversation.value || !currentUser.value) return null

  return conversation.value.participants.find(
    (p) => p.profileId !== currentUser.value?.id
  )
})

// Scroll to bottom when messages change
watch(
  () => conversation.value?.messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

onMounted(() => {
  scrollToBottom()
})

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
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

async function sendMessage() {
  if (!newMessage.value.trim() || isSending.value) return

  try {
    isSending.value = true

    await $client.chat.sendMessage.mutate({
      conversationId: props.conversationId,
      content: newMessage.value.trim(),
    })

    newMessage.value = ''
    await refresh()
  } catch (err) {
    console.error('Failed to send message:', err)
  } finally {
    isSending.value = false
  }
}
</script>
