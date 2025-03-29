<template>
  <div
    class="min-h-screen flex flex-col dark:bg-[hsl(var(--dark))] dark:text-white"
  >
    <main class="flex-1">
      <slot />
    </main>
    <DialogProvider />
  </div>
</template>
