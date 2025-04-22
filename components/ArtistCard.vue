<script setup lang="ts">
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="group aspect-square bg-muted rounded-lg overflow-hidden relative">
    <Avatar
      :profile="profile"
      class="w-full h-full object-cover transition group-hover:scale-105"
    />
    <div
      class="space-y-2 absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-foreground to-foreground/0 text-background"
    >
      <h3 class="font-semibold text-xl">
        {{ profile.name }}
      </h3>
      <p class="text-sm line-clamp-2">
        {{ profile.bio }}
      </p>
    </div>
  </div>
</template>
