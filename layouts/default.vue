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
