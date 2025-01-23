<script setup lang="ts">
import type { Community } from "~/data/mockCommunities";

defineProps<{
  community: Community;
}>();
</script>

<template>
  <NuxtLink
    :to="`/communities/${community.id}`"
    class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="aspect-video rounded-t-lg overflow-hidden bg-muted">
      <NuxtImg
        :src="community.image"
        :alt="community.name"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold text-lg text-foreground">
          {{ community.name }}
        </h3>
        <span
          v-if="community.style"
          class="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full"
        >
          {{ community.style }}
        </span>
      </div>
      <p class="text-muted-foreground text-sm mb-4">
        {{ community.description }}
      </p>
      <div
        class="flex items-center justify-between text-sm text-muted-foreground"
      >
        <div class="flex items-center">
          <span class="mr-4">{{ community.memberCount }}+ members</span>
        </div>
        <a
          v-if="community.links?.whatsapp"
          :href="community.links.whatsapp"
          target="_blank"
          rel="noopener"
          class="text-success hover:text-success/80"
          @click.stop
        >
          Join WhatsApp
        </a>
      </div>
    </div>
  </NuxtLink>
</template>
