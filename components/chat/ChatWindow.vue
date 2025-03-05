<template>
  <div
    class="chat-container bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh] h-[550px] transition-all"
  >
    <!-- Chat Header - Fixed height -->
    <div
      class="chat-header bg-rose-400 text-white p-4 flex justify-between items-center flex-shrink-0"
    >
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm"
        >
          <Icon name="ph:chats" class="w-4 h-4 text-rose-500" />
        </div>
        <div>
          <h3 class="font-semibold">Chat Online</h3>
          <div class="text-xs opacity-80 flex items-center">
            <span
              class="w-2 h-2 bg-white rounded-full inline-block mr-1"
            ></span>
            Online now
          </div>
        </div>
      </div>
      <button
        @click="$emit('close')"
        class="text-white hover:bg-rose-500 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      >
        <Icon name="ph:x" class="w-5 h-5" />
      </button>
    </div>

    <!-- Chat Messages Area - Flexible height with scroll -->
    <div
      ref="messagesContainer"
      class="chat-messages flex-1 overflow-y-auto p-4 space-y-3"
      :class="{ 'scrolling-touch': isMobile }"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'p-2 rounded-lg max-w-[80%] h-16 shadow-sm transition-all animate-fade-in',
          msg.isUser
            ? 'ml-auto bg-black text-white rounded-br-none'
            : 'bg-gray-100 rounded-bl-none',
        ]"
      >
        <div v-if="!msg.isUser" class="font-medium text-sm mb-1 text-rose-600">
          User
        </div>
        <div :class="{ 'text-gray-800': !msg.isUser }">{{ msg.text }}</div>
        <div
          class="text-xs opacity-70 mt-1 text-right"
          :class="{ 'text-gray-400': !msg.isUser, 'text-gray-300': msg.isUser }"
        >
          {{ formatTime(msg.timestamp || new Date()) }}
        </div>
      </div>

      <!-- Typing indicator -->
      <div
        v-if="isTyping"
        class="p-3 rounded-lg inline-block bg-gray-100 rounded-bl-none animate-pulse"
      >
        <div class="flex space-x-1">
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div
            class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style="animation-delay: 150ms"
          ></div>
          <div
            class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style="animation-delay: 300ms"
          ></div>
        </div>
      </div>

      <!-- Extra space at bottom to ensure last message is visible -->
      <div class="h-4"></div>
    </div>

    <!-- Chat Input Area - Fixed height -->
    <div
      class="chat-input border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0"
    >
      <div class="flex gap-2 items-center">
        <button class="text-gray-500 hover:text-rose-500 transition-colors p-2">
          <Icon name="ph:smiley" class="w-5 h-5" />
        </button>

        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="flex-1 border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
        />

        <button
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          :class="{
            'opacity-50 cursor-not-allowed': !newMessage.trim(),
            'hover:bg-gray-800': newMessage.trim(),
          }"
        >
          <Icon name="ph:paper-plane-right-fill" class="w-5 h-5" />
        </button>
      </div>

      <div class="text-center mt-2 text-xs text-gray-400 hidden md:block">
        Our team usually responds within minutes
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { format } from 'date-fns'

const newMessage = ref('')
const messagesContainer = ref(null)
const isTyping = ref(false)
const isMobile = ref(false)

// Check if device is mobile and resize handler
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

// Check if viewport is short (height)
const isShortScreen = ref(false)
const checkScreenHeight = () => {
  isShortScreen.value = window.innerHeight < 700
}

onMounted(() => {
  handleResize()
  checkScreenHeight()
  window.addEventListener('resize', handleResize)
  window.addEventListener('resize', checkScreenHeight)
  scrollToBottom()

  return () => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('resize', checkScreenHeight)
  }
})

const emit = defineEmits(['send', 'close'])

const props = defineProps({
  messages: {
    type: Array,
    default: () => [
      {
        text: 'Hello',
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
})

const formatTime = (date) => {
  try {
    return format(new Date(date), 'p') // 'p' is the format for 12-hour time
  } catch {
    return ''
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (newMessage.value.trim() === '') return

  // Send message to parent component
  emit('send', newMessage.value)

  // Clear input field
  newMessage.value = ''

  // Show typing indicator
  isTyping.value = true

  // Hide typing indicator after delay (simulates realistic typing)
  setTimeout(() => {
    isTyping.value = false
  }, 2000)
}

// Scroll to bottom when messages change
watch(
  () => props.messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.scrolling-touch {
  -webkit-overflow-scrolling: touch;
}

/* Fix for mobile Safari */
@supports (-webkit-touch-callout: none) {
  .chat-container {
    height: -webkit-fill-available;
  }
}

/* Ensure the chat container is responsive but doesn't exceed screen height */
.chat-container {
  max-height: 80vh; /* 80% of viewport height */
  min-height: 400px; /* Minimum height to ensure it's usable */
}
</style>
