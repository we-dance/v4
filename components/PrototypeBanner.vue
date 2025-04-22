<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

const hide = () => {
  isVisible.value = false
  localStorage.setItem('early-preview-banner', 'hidden')
}

onMounted(() => {
  const hidden = localStorage.getItem('early-preview-banner')
  if (hidden) {
    isVisible.value = false
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 max-w-sm bg-background rounded-lg shadow-lg border border-border p-4 animate-fade-in z-50"
  >
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="font-medium text-foreground">✨ Early Preview</div>
        <p class="text-sm text-muted-foreground mt-1">
          Be among the first to shape the future of dance community
        </p>
        <NuxtLink
          to="/status"
          class="inline-flex items-center gap-1 text-primary hover:text-primary/90 text-sm mt-2"
        >
          See What's Coming
          <Icon name="ph:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
      <button
        @click="hide"
        class="text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <Icon name="ph:x" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
