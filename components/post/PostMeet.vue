<script setup lang="ts">
import type { MeetContent } from "~/schemas/post";

const DETAIL_ICONS = {
  type: "ph:users",
  format: "ph:layout",
  gender: "ph:gender-intersex",
  when: "ph:calendar",
  where: "ph:map-pin",
  level: "ph:chart-line",
  style: "ph:music-notes",
  seats: "ph:car",
  contribution: "ph:money",
} as const;

defineProps<{
  content: MeetContent;
}>();
</script>

<template>
  <div class="px-4 pb-4 flex-1">
    <div class="space-y-4">
      <PostTitle :title="content.title" />
      <p class="text-muted-foreground whitespace-pre-wrap">
        {{ content.text }}
      </p>
      <div class="bg-primary/10 rounded-lg p-4 space-y-2">
        <div
          v-for="(value, key) in content.details"
          :key="key"
          class="flex items-center gap-2"
        >
          <Icon
            :name="DETAIL_ICONS[key as keyof typeof DETAIL_ICONS]"
            class="w-4 h-4 text-primary"
          />
          <span class="capitalize text-muted-foreground">{{ key }}:</span>
          <span class="text-primary">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
