<script setup lang="ts">
import { ref, watch } from 'vue'
import { Trash, Upload, Link, Video } from 'lucide-vue-next'
import type { Lesson } from '~/types/course'

const props = defineProps<{
  modelValue: Lesson
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', lesson: Lesson): void
  (e: 'delete'): void
  (e: 'upload', file: File): void
}>()

const lesson = ref<Lesson>({ ...props.modelValue })
const fileInput = ref<HTMLInputElement | null>(null)
const isUrlMode = ref(false)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  lesson.value = { ...newValue }
}, { deep: true })

// Watch for internal changes
watch(lesson, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    emit('upload', file)
    
    // Create a temporary thumbnail URL
    const thumbnailUrl = URL.createObjectURL(file)
    lesson.value = {
      ...lesson.value,
      thumbnailUrl
    }
  }
}

const toggleUploadMode = () => {
  isUrlMode.value = !isUrlMode.value
  if (!isUrlMode.value) {
    lesson.value.videoUrl = ''
  }
}

const handleDelete = () => {
  emit('delete')
}
</script>

<template>
  <div class="border rounded-lg p-4 space-y-4 bg-card">
    <!-- Title -->
    <div class="space-y-2">
      <Label>Lesson Title</Label>
      <Input
        v-model="lesson.title"
        placeholder="Enter lesson title"
      />
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <Label>Description</Label>
      <Textarea
        v-model="lesson.description"
        placeholder="Enter lesson description"
        class="min-h-[100px]"
      />
    </div>

    <!-- Video Upload/URL Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <Label>Video</Label>
        <Button
          variant="ghost"
          size="sm"
          @click="toggleUploadMode"
          class="gap-2"
        >
          <component :is="isUrlMode ? Upload : Link" class="h-4 w-4" />
          {{ isUrlMode ? 'Switch to Upload' : 'Use Video URL' }}
        </Button>
      </div>

      <!-- URL Input Mode -->
      <div v-if="isUrlMode" class="space-y-2">
        <Input
          v-model="lesson.videoUrl"
          placeholder="Enter MUX video URL"
          type="url"
        />
        <p class="text-xs text-muted-foreground">
          Paste a MUX video URL to use an existing video
        </p>
      </div>

      <!-- File Upload Mode -->
      <div v-else class="space-y-4">
        <div
          class="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
          @click="fileInput?.click()"
        >
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="video/*"
            @change="handleFileChange"
          />
          <div class="flex flex-col items-center gap-2">
            <Video class="h-8 w-8 text-muted-foreground" />
            <div class="space-y-1">
              <p class="text-sm font-medium">
                Upload video
              </p>
              <p class="text-xs text-muted-foreground">
                Click to upload or drag and drop<br>
                MP4, MOV or WebM (max. 2GB)
              </p>
            </div>
          </div>
        </div>

        <!-- Video Preview -->
        <div v-if="lesson.thumbnailUrl" class="aspect-video rounded-lg overflow-hidden bg-muted">
          <img
            :src="lesson.thumbnailUrl"
            :alt="lesson.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Delete Button -->
    <div class="flex justify-end">
      <Button
        variant="destructive"
        size="sm"
        @click="handleDelete"
        class="gap-2"
      >
        <Trash class="h-4 w-4" />
        Delete Lesson
      </Button>
    </div>
  </div>
</template> 