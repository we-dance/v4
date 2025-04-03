<template>
  <div
    class="min-h-screen flex flex-col dark:bg-[hsl(var(--dark))] dark:text-white"
  >
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
