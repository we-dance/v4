<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.fullPath" />
    <ClientOnly>
      <PrototypeBanner />
      <DialogProvider />
      <AlertDialogProvider />
      <CookieConsent />
      <Toaster />
    </ClientOnly>
  </NuxtLayout>
</template>
