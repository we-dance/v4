<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <PrototypeBanner />
      <DialogProvider />
      <CookieConsent />
      <Toaster />
    </ClientOnly>
  </NuxtLayout>
</template>
