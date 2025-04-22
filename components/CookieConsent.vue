<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
const hasConsented = ref(false)

const acceptAll = () => {
  hasConsented.value = true
  isVisible.value = false
  localStorage.setItem('cookie-consent', 'true')
}

const acceptEssential = () => {
  hasConsented.value = true
  isVisible.value = false
  localStorage.setItem('cookie-consent', 'essential')
}

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (consent) {
    isVisible.value = false
    hasConsented.value = true
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg animate-in slide-in-from-bottom-4"
  >
    <div class="container max-w-7xl mx-auto">
      <div
        class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div class="space-y-2 flex-1">
          <h3 class="font-semibold">🍪 Cookie Notice</h3>
          <p class="text-sm text-muted-foreground">
            We use cookies to enhance your experience. By continuing to visit
            this site you agree to our use of cookies.
            <NuxtLink to="/cookies" class="text-primary hover:underline"
              >Learn more</NuxtLink
            >
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 shrink-0">
          <Button variant="secondary" size="sm" @click="acceptEssential">
            Essential Only
          </Button>
          <Button size="sm" @click="acceptAll"> Accept All </Button>
        </div>
      </div>
    </div>
  </div>
</template>
