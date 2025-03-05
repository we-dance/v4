<script setup>
import { ref, watch } from 'vue'
import ChatWindow from './chat/ChatWindow.vue'

const props = defineProps({
  showChat: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:showChat'])

const chatMessages = ref([{ text: 'Hello!', isUser: false }])

const handleSendMessage = (message) => {
  // Add user message
  chatMessages.value.push({ text: message, isUser: true })

  // Simulate response after a delay
  setTimeout(() => {
    chatMessages.value.push({
      text: 'Thanks for your message! ',
      isUser: false,
    })
  }, 1000)
}

const isDialogOpen = ref(false)

// Watch for showChat changes to open dialog when needed
watch(
  () => props.showChat,
  (newValue) => {
    if (newValue) isDialogOpen.value = true
  }
)

// When dialog closes, update showChat
const handleDialogChange = (open) => {
  isDialogOpen.value = open
  if (!open) emit('update:showChat', false)
}
</script>

<template>
  <div
    class="flex items-center justify-between bg-primary/10 p-2 px-4 rounded-lg"
  >
    <div class="text-sm text-primary font-medium">Share your dance journey</div>
    <Dialog :open="isDialogOpen" @update:open="handleDialogChange">
      <DialogTrigger asChild>
        <Button variant="primary" class="flex items-center gap-2">
          <Icon name="ph:plus" class="w-5 h-5" />
          Post
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ showChat ? 'Messages' : 'Message Now' }}</DialogTitle>
          <DialogDescription>
            {{
              showChat
                ? 'Connect with other dancers'
                : 'Join other dancers in making the dance community even better'
            }}
          </DialogDescription>
        </DialogHeader>
        <div
          v-if="!showChat"
          class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          <!-- Share -->
          <div>
            <div class="text-primary mb-4">
              <Icon name="ph:pencil-line" class="w-8 h-8" />
            </div>
            <h3 class="font-bold text-lg mb-2 text-foreground">Share</h3>
            <p class="text-muted-foreground mb-4">
              Start conversations, share knowledge, and inspire others with your
              dance journey
            </p>
            <div class="space-y-2">
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:note" class="w-5 h-5 text-primary mr-2" />
                <span>Message</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon
                  name="ph:article-medium"
                  class="w-5 h-5 text-primary mr-2"
                />
                <span class="flex-1">Article</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon
                  name="ph:youtube-logo"
                  class="w-5 h-5 text-primary mr-2"
                />
                <span>Video</span>
              </button>
            </div>
          </div>

          <!-- Organize -->
          <div>
            <div class="text-primary mb-4">
              <Icon name="ph:calendar-plus" class="w-8 h-8" />
            </div>
            <h3 class="font-bold text-lg mb-2 text-foreground">Organize</h3>
            <p class="text-muted-foreground mb-4">
              Create events, connect with dancers, and share opportunities
            </p>
            <div class="space-y-2">
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon
                  name="ph:calendar-plus"
                  class="w-5 h-5 text-primary mr-2"
                />
                <span>Event</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:users" class="w-5 h-5 text-primary mr-2" />
                <span>Meet</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:briefcase" class="w-5 h-5 text-primary mr-2" />
                <span>Gig</span>
              </button>
            </div>
          </div>

          <!-- Support -->
          <div>
            <div class="text-primary mb-4">
              <Icon name="ph:handshake" class="w-8 h-8" />
            </div>
            <h3 class="font-bold text-lg mb-2 text-foreground">Support</h3>
            <p class="text-muted-foreground mb-4">
              Help others discover the local scene and dance community
            </p>
            <div class="space-y-2">
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:star" class="w-5 h-5 text-primary mr-2" />
                <span>Review</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:info" class="w-5 h-5 text-primary mr-2" />
                <span>Ask Locals</span>
              </button>
              <button
                class="w-full text-left px-3 py-2 hover:bg-muted rounded-lg flex items-center text-foreground"
              >
                <Icon name="ph:storefront" class="w-5 h-5 text-primary mr-2" />
                <span>Ad</span>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <ChatWindow
            :messages="chatMessages"
            @send="handleSendMessage"
            @close="emit('update:showChat', false)"
          />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
