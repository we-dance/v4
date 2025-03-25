<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'

const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.baseUrl
</script>

<template>
  <NuxtLayout>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.dark {
  background-color: #333;
}

.dark .dark h1,
.dark h2,
.dark h3,
.dark div,
.dark svg.lucide,
.dark label {
  color: #fff;
}
</style>
