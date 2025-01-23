<script setup lang="ts">
interface Style {
  name: string;
  image: string;
  to: string;
  members: number;
}

defineProps<{
  style: Style;
}>();
</script>

<template>
  <NuxtLink
    :to="style.to"
    class="group relative aspect-[4/3] overflow-hidden rounded-xl bg-background/10 hover:bg-background/20 backdrop-blur-sm transition"
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
      <div v-if="style.members > 0" class="text-sm text-white/80">
        <p class="flex items-center gap-1">{{ style.members }} members</p>
      </div>
    </div>
  </NuxtLink>
</template>
