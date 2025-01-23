<template>
  <div class="min-h-screen flex flex-col">
    <AppNavigation />
    <main class="flex-1">
      <slot />
    </main>
    <LandingFooter />
    <PrototypeBanner />
    <DialogProvider />
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import PrototypeBanner from "@/components/PrototypeBanner.vue";
import DialogProvider from "~/components/dialog/DialogProvider.vue";
import CookieConsent from "~/components/CookieConsent.vue";
</script>
