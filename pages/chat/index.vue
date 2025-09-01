<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { $client } = useNuxtApp()

const showNewConversationModal = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const selectedUser = ref<any>(null)
const isSearching = ref(false)
const isCreating = ref(false)

// Search users with debounce
let searchTimeout: NodeJS.Timeout | null = null
function searchUsers() {
  if (searchTimeout) clearTimeout(searchTimeout)

  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isSearching.value = true

  searchTimeout = setTimeout(async () => {
    try {
      // Replace with your actual API call to search users
      const results = await $client.profiles.search.query({
        query: searchQuery.value.trim(),
      })

      searchResults.value = results
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      isSearching.value = false
    }
  }, 300)
}

function selectUser(user: any) {
  selectedUser.value = user
  searchQuery.value = user.name
  searchResults.value = []
}

async function createConversation() {
  if (!selectedUser.value || isCreating.value) return

  try {
    isCreating.value = true

    const conversation = await $client.chat.createConversation.mutate({
      participantIds: [selectedUser.value.id],
    })

    showNewConversationModal.value = false
    router.push(`/chat/${conversation.id}`)
  } catch (error) {
    console.error('Error creating conversation:', error)
  } finally {
    isCreating.value = false
  }
}

// Get initials from name
function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Messages</h1>

      <div class="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <div
          class="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center"
        >
          <h2 class="text-lg font-medium">Conversations</h2>
          <button
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            @click="showNewConversationModal = true"
          >
            New Message
          </button>
        </div>

        <div class="min-h-[400px]">
          <ChatList />
        </div>
      </div>

      <!-- New Conversation Modal -->
      <div
        v-if="showNewConversationModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">New Conversation</h3>
            <button
              @click="showNewConversationModal = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Select a user</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                @input="searchUsers"
              />
              <div v-if="isSearching" class="absolute right-3 top-2.5">
                <div
                  class="animate-spin h-5 w-5 border-2 border-primary rounded-full border-t-transparent"
                ></div>
              </div>
            </div>

            <div
              v-if="searchResults.length > 0"
              class="mt-2 max-h-60 overflow-y-auto border rounded-lg dark:border-gray-700"
            >
              <div
                v-for="user in searchResults"
                :key="user.id"
                class="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center"
                @click="selectUser(user)"
              >
                <div class="flex-shrink-0">
                  <img
                    v-if="user.photo"
                    :src="user.photo"
                    alt="Profile"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div
                    v-else
                    class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                  >
                    <span class="text-gray-500 dark:text-gray-400">{{
                      getInitials(user.name)
                    }}</span>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    @{{ user.username }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else-if="searchQuery && !isSearching"
              class="mt-2 p-3 text-center text-gray-500 border rounded-lg dark:border-gray-700"
            >
              No users found
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              @click="showNewConversationModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              @click="createConversation"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              :disabled="!selectedUser || isCreating"
            >
              <span v-if="isCreating">
                <div
                  class="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"
                ></div>
              </span>
              <span v-else>Start Conversation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
