<script setup lang="ts">
import { graphemeCount, chatEventSchema, type ChatEvent } from '~/schemas/chat'
import { toast } from 'vue-sonner'

// Props
const props = defineProps<{
  conversationId: string
}>()

//State Management
type ConversationData = Extract<
  ChatEvent,
  { type: 'conversation.init' }
>['conversation']

const conversation = ref<ConversationData | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)
const newMessage = ref('')
const isSending = ref(false)
const isLoading = ref(true)
const error = ref<Error | null>(null)
const connectionAttempts = ref(0)
const maxAttempts = 50
const reconnectDelay = ref(2000)

let eventSource: EventSource | null = null
let markAsReadTimer: ReturnType<typeof setTimeout> | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

// Composables
const { $client } = useNuxtApp()
const { session } = useAppAuth()

// Computed Properties
const currentUser = computed(() => session.value?.profile)
const charCount = computed(() => graphemeCount(newMessage.value.trim()))
const otherParticipant = computed(() => {
  if (!conversation.value || !currentUser.value) return null

  const conv = conversation.value
  const currentUserId = currentUser.value?.id

  // Return the participant that's not the current user
  return conv.aId === currentUserId ? conv.b : conv.a
})

// Lifecycle Hooks
onMounted(() => {
  subscribeToConversation(props.conversationId)
  markAsRead(props.conversationId)
})

onUnmounted(() => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }

  if (markAsReadTimer) {
    clearTimeout(markAsReadTimer)
    markAsReadTimer = null
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
})

watch(
  () => props.conversationId,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      isLoading.value = true
      conversation.value = null
      error.value = null
      subscribeToConversation(newId)
      markAsRead(newId)
    }
  }
)

// Core Logic Functions
function subscribeToConversation(id: string) {
  eventSource?.close()
  eventSource = new EventSource(
    `/api/chat/stream?conversationId=${encodeURIComponent(id)}`
  )

  eventSource.onmessage = (event) => {
    try {
      // Parse the raw text data
      const rawData = JSON.parse(event.data)
      // Validate the data against the schema
      const parsed = chatEventSchema.safeParse(rawData)
      // If validation fails stop
      if (!parsed.success) {
        console.warn('Received invalid SSE event:', parsed.error)
        return
      }
      // If succeeds use the validated data
      const data = parsed.data

      if (data.type === 'conversation.init') {
        conversation.value = data.conversation
        isLoading.value = false
        error.value = null
        scrollToBottom()
      } else if (
        data.type === 'message.created' &&
        data.conversationId === id &&
        data.message
      ) {
        const messages = conversation.value?.messages
        if (
          Array.isArray(messages) &&
          !messages.some((m) => m.id === data.message.id)
        ) {
          messages.push(data.message)
          scrollToBottom()
          if (data.message.senderId !== currentUser.value?.id) {
            markAsRead(id)
          }
        }
      }
    } catch (err) {
      console.warn('SSE parse error:', err)
      error.value =
        err instanceof Error ? err : new Error('Failed to parse SSE event')
      isLoading.value = false
    }
  }
  eventSource.onopen = () => {
    console.log('SSE Connected')
    connectionAttempts.value = 0
    reconnectDelay.value = 2000
    error.value = null

    if (reconnectTimer) clearTimeout(reconnectTimer)

    reconnectTimer = setTimeout(() => {
      if (eventSource && eventSource.readyState === 1) {
        console.log('Proactive reconnect before timeout')
        eventSource.close()
        subscribeToConversation(props.conversationId)
      }
    }, 8000)
  }

  eventSource.onerror = (err) => {
    console.error('SSE CONNECTION ERROR:', err)

    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    eventSource?.close()
    if (connectionAttempts.value < maxAttempts) {
      connectionAttempts.value++
      const delay = Math.min(reconnectDelay.value, 10000)
      reconnectDelay.value = Math.min(delay * 1.5, 10000)

      console.log(`Reconnecting in ${delay} ms`)
      setTimeout(() => {
        subscribeToConversation(props.conversationId)
      }, delay)
    } else {
      error.value = new Error('Connection to chat server failed.')
      isLoading.value = false
    }
  }
}

async function sendMessage() {
  const content = newMessage.value.trim()
  if (!content || isSending.value) return
  if (charCount.value > 500) {
    toast.error('Message cannot be longer than 500 characters.')
    return
  }
  try {
    isSending.value = true
    await $client.chat.sendMessage.mutate({
      conversationId: props.conversationId,
      content,
    })
    newMessage.value = ''
    // The SSE listener will handle refreshing the conversation data
  } catch (err) {
    console.error('Failed to send message:', err)
  } finally {
    isSending.value = false
  }
}

function markAsRead(id: string) {
  if (markAsReadTimer) clearTimeout(markAsReadTimer)
  markAsReadTimer = setTimeout(async () => {
    try {
      await $client.chat.markAsRead.mutate({ conversationId: id })
    } catch (error) {
      console.error('Failed to mark conversation as read', error)
    }
  }, 2000)
}

// Helper and Utility Functions
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Get initials from name
function getInitials(name: string | null | undefined) {
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
      <div v-if="isLoading" class="flex items-center gap-3 flex-1">
        <div class="space-y-1">
          <Skeleton class="h-4 w-24" />
        </div>
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
            <span class="text-gray-500 dark:text-gray-400">
              {{ getInitials(otherParticipant?.name) }}
            </span>
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
      <div v-if="isLoading" class="space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-end gap-2 max-w-[75%]"
          :class="[i % 2 === 0 ? 'ml-auto flex-row-reverse' : 'mr-auto']"
        >
          <Skeleton
            class="h-14 rounded-lg"
            :class="i === 2 ? 'w-32' : 'w-48'"
          />
        </div>
      </div>
      <div v-else-if="error" class="p-4 text-red-500">
        {{ error?.message || 'Failed to load conversation' }}
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
          :disabled="charCount === 0 || isSending"
        >
          <span v-if="isSending">
            <div
              class="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"
            ></div>
          </span>
          <span v-else>Send</span>
        </button>
      </form>
      <div class="mt-1 text-xs text-gray-500 text-right">
        {{ charCount }}/500
      </div>
    </div>
  </div>
</template>
