<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="min-h-[50vh] flex items-center justify-center">
    <div class="text-center">
      <Icon
        name="ph:hammer"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">
        {{ message || 'Not implemented yet' }}
      </h2>
    </div>
  </div>
</template>
