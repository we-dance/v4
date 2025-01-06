<script setup lang="ts">
import type { DanceStyle } from "~/data/mockStyles";

defineProps<{
  style: DanceStyle;
}>();
</script>

<template>
  <NuxtLink
    :to="style.to"
    class="group relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
  >
    <NuxtImg
      :src="style.image"
      :alt="style.name"
      fit="cover"
      class="absolute inset-0 w-full h-full object-cover scale-[1.5] opacity-50 group-hover:opacity-70 transition"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
    ></div>
    <div class="relative h-full p-4 flex flex-col justify-end text-left">
      <h3 class="font-bold text-xl text-white">{{ style.name }}</h3>
      <div v-if="style.stats" class="text-sm text-white/80">
        <p v-if="style.stats.members" class="flex items-center gap-1">
          <Icon name="ph:users" class="w-4 h-4" />
          {{ style.stats.members }} dancers
        </p>
        <p v-else-if="style.stats.communities" class="flex items-center gap-1">
          <Icon name="ph:buildings" class="w-4 h-4" />
          {{ style.stats.communities }} communities
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
