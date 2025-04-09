<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 bg-background text-foreground">
      <slot />
    </main>
    <DialogProvider />
  </div>
</template>
