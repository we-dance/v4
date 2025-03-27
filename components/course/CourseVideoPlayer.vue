<script setup lang="ts">
import '@mux/mux-player'

const { lesson } = defineProps<{
  lesson: any
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="aspect-video">
      <mux-player
        stream-type="on-demand"
        :playback-id="lesson.videoId"
        :metadata-video-title="lesson.name"
        accent-color="#F1023D"
      />
    </div>
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">
        {{ lesson.name }}
      </h2>
      <p class="text-sm text-muted-foreground">
        Duration: {{ lesson.timeRequired }}
      </p>
    </div>
  </div>
</template>
