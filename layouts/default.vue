<template>
  <div class="min-h-screen flex flex-col">
    <AppNavigation />
    <main class="flex-1 bg-background text-foreground">
      <slot />
    </main>
    <LandingFooter />
  </div>
</template>
