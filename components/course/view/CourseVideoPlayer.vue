<script setup lang="ts">
import '@mux/mux-player'
import { formatDuration } from '~/utils/format'

defineProps({
  lesson: {
    type: Object,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="aspect-video">
      <mux-player
        v-if="lesson"
        stream-type="on-demand"
        :playback-id="lesson.videoId"
        :metadata-video-title="lesson.name"
        accent-color="#F1023D"
        :poster="poster"
      />
    </div>
    <div class="p-4">
      <h2 class="text-xl font-semibold">
        {{ lesson?.name }}
      </h2>
      <p v-if="lesson" class="text-sm text-muted-foreground">
        Duration: {{ formatDuration(lesson?.duration) }}
      </p>
    </div>
  </div>
</template>
