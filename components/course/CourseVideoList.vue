<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CourseVideo } from '~/schemas/courseVideo'
import { toast } from 'vue-sonner'
import { useSortable } from '@vueuse/core'

const props = defineProps<{
  videos: CourseVideo[]
}>()

const emit = defineEmits<{
  (e: 'update:videos', videos: CourseVideo[]): void
  (e: 'delete', video: CourseVideo): void
}>()

const containerRef = ref<HTMLElement>()
const videoList = ref(props.videos)

// Initialize sortable
useSortable(containerRef, videoList, {
  animation: 150,
  handle: '.video-drag-handle',
  ghostClass: 'opacity-50',
  onEnd: () => {
    // Update order numbers
    const updatedVideos = videoList.value.map((video, index) => ({
      ...video,
      order: index
    }))
    emit('update:videos', updatedVideos)
  }
})

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const getStatusColor = (status: CourseVideo['status']) => {
  switch (status) {
    case 'uploading':
      return 'text-primary'
    case 'processing':
      return 'text-warning'
    case 'ready':
      return 'text-success'
    case 'error':
      return 'text-destructive'
    default:
      return 'text-muted-foreground'
  }
}

const handleDelete = (video: CourseVideo) => {
  emit('delete', video)
}
</script>

<template>
  <div ref="containerRef" class="space-y-4">
    <div
      v-for="video in videoList"
      :key="video.id"
      class="flex items-center gap-4 p-4 bg-card rounded-lg border group"
    >
      <div class="video-drag-handle cursor-move text-muted-foreground hover:text-foreground">
        <div class="i-lucide-grip-vertical h-5 w-5" />
      </div>

      <div class="relative aspect-video w-40 rounded-md overflow-hidden bg-muted">
        <img
          :src="video.thumbnailUrl"
          :alt="video.title"
          class="w-full h-full object-cover"
        />
        <div
          v-if="video.status === 'ready'"
          class="absolute bottom-1 right-1 bg-background/75 px-1.5 py-0.5 text-xs rounded"
        >
          {{ formatDuration(video.duration) }}
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <Input
              v-model="video.title"
              class="font-medium border-none px-0 h-auto text-base hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-0"
              :placeholder="'Untitled Video'"
            />
            <Input
              v-if="video.description"
              v-model="video.description"
              class="text-sm text-muted-foreground border-none px-0 h-auto hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-0"
              :placeholder="'Add a description...'"
            />
          </div>

          <div class="flex items-center gap-2">
            <Badge :class="getStatusColor(video.status)">
              {{ video.status }}
            </Badge>
            <Button
              v-if="video.status === 'ready'"
              variant="ghost"
              size="icon"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
              @click="handleDelete(video)"
            >
              <div class="i-lucide-trash-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sortable-ghost {
  opacity: 0.5;
}

.sortable-chosen {
  background-color: var(--color-background);
}
</style> 