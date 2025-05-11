<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)
const hasError = ref(false)

onErrorCaptured((err) => {
  console.error('Error details:', err)
  error.value = err as Error
  hasError.value = true
  return false
})
</script>

<template>
  <template v-if="!hasError">
    <slot />
  </template>
  <div v-else class="p-4">
    <div class="flex items-center gap-2 text-warning">
      <div class="i-ph-warning-circle text-xl" />
      <div class="font-medium">This content is not available</div>
    </div>
  </div>
</template>
