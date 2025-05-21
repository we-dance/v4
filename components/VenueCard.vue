<script setup lang="ts">
const props = defineProps({
  profile: {
    type: Object as PropType<any>,
    required: true,
  },
})
</script>
<template>
  <div class="border border-border rounded-xl overflow-hidden">
    <div class="aspect-video relative overflow-hidden">
      <Avatar :profile="profile" class="w-full h-full object-cover" />
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-lg text-foreground">
          {{ profile.name }}
        </h3>
        <div
          v-if="profile.rating"
          class="flex items-center gap-1 text-amber-500"
        >
          <Icon name="ph:star-fill" class="w-4 h-4" />
          <span class="text-sm">{{ profile.rating }}</span>
        </div>
      </div>
      <p class="text-muted-foreground text-sm mb-2">
        {{ profile.formattedAddress }}
      </p>
      <!-- TODO: Add price per hour and capacity -->
      <p v-if="profile.bio" class="text-foreground mb-4 line-clamp-2">
        {{ profile.bio }}
      </p>
    </div>
  </div>
</template>
