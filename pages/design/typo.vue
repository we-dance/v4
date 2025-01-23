<script setup lang="ts">
const text = {
  heading1: "Welcome to WeDance",
  heading2: "Dance Community Platform",
  heading3: "Connect with dancers worldwide",
  body: "Experience the joy of dance through our global community. Share your passion, find events, and connect with fellow dancers.",
  caption: "Join thousands of dancers around the world",
};
</script>

<template>
  <div class="space-y-8 py-20 px-4">
    <div class="space-y-4">
      <h1 class="font-heading text-4xl font-bold">{{ text.heading1 }}</h1>
      <h2 class="font-heading text-3xl font-semibold">{{ text.heading2 }}</h2>
      <h3 class="font-heading text-2xl font-medium">{{ text.heading3 }}</h3>
    </div>

    <div class="space-y-4">
      <p class="text-lg">{{ text.body }}</p>
      <p class="text-sm text-muted-foreground">{{ text.caption }}</p>
    </div>

    <div class="space-y-2">
      <div>
        <div class="text-sm text-muted-foreground">Font: Noto Sans</div>
        <div class="space-y-1">
          <p class="font-light">
            Light 300: The quick brown fox jumps over the lazy dog
          </p>
          <p class="font-normal">
            Regular 400: The quick brown fox jumps over the lazy dog
          </p>
          <p class="font-medium">
            Medium 500: The quick brown fox jumps over the lazy dog
          </p>
          <p class="font-semibold">
            Semibold 600: The quick brown fox jumps over the lazy dog
          </p>
          <p class="font-bold">
            Bold 700: The quick brown fox jumps over the lazy dog
          </p>
          <p class="font-extrabold">
            ExtraBold 800: The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
