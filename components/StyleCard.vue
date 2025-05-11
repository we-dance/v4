<script setup lang="ts">
defineProps({
  style: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink
    :to="`/dance/${style.hashtag}`"
    class="group relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
  >
    <div class="absolute inset-0 w-full h-full">
      <WYoutubeThumb
        v-if="style.video"
        :url="style.video"
        class="w-full h-full object-cover scale-[1.5] opacity-50 group-hover:opacity-70 transition"
      />
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
    ></div>
    <div class="relative h-full p-4 flex flex-col justify-end text-left">
      <h3 class="font-bold text-xl text-white">{{ style.name }}</h3>
      <div v-if="style.membersCount > 0" class="text-sm text-white/80">
        <p class="flex items-center gap-1">{{ style.membersCount }} members</p>
      </div>
    </div>
  </NuxtLink>
</template>
