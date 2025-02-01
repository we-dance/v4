<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <DialogProvider />
  </div>
</template>

<script setup lang="ts">
import DialogProvider from '~/components/dialog/DialogProvider.vue'
</script>
