<script setup lang="ts">
import { ref } from 'vue'
import type { CourseVideo, CourseVideoUpload } from '~/schemas/courseVideo'
import { useFileDialog } from '@vueuse/core'
import { useToast } from 'vue-sonner'

const props = defineProps<{
  courseId: string
}>()

const emit = defineEmits<{
  (e: 'upload-complete', video: CourseVideo): void
}>()

const { toast } = useToast()
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)

const { open, reset } = useFileDialog({
  accept: 'video/*',
  multiple: false,
})

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  const files = e.dataTransfer?.files
  if (!files || files.length === 0) return
  
  const file = files[0]
  if (!file.type.startsWith('video/')) {
    toast.error('Please upload a video file')
    return
  }
  
  await uploadVideo(file)
}

const handleFileSelect = async () => {
  try {
    await open()
    // File selection is handled by the useFileDialog hook
  } catch (error) {
    console.error('File selection error:', error)
  }
}

const uploadVideo = async (file: File) => {
  try {
    isUploading.value = true
    uploadProgress.value = 0
    
    // TODO: Implement Mux direct upload
    // 1. Get upload URL from your backend
    // 2. Upload file to Mux with progress tracking
    // 3. Get asset details and emit upload-complete event
    
    toast.success('Video uploaded successfully')
  } catch (error) {
    console.error('Upload error:', error)
    toast.error('Failed to upload video')
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}
</script>

<template>
  <div
    class="relative"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <div
      class="text-center p-8 border-2 border-dashed rounded-lg transition-colors"
      :class="{
        'border-primary bg-primary/5': isDragging,
        'border-border': !isDragging
      }"
    >
      <div v-if="!isUploading">
        <div class="i-heroicons-cloud-arrow-up mx-auto h-12 w-12 text-muted-foreground" />
        <div class="mt-4">
          <Button @click="handleFileSelect">Upload Videos</Button>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">
          Or drag and drop video files
        </p>
        <p class="mt-1 text-xs text-muted-foreground">
          Powered by Mux
        </p>
      </div>
      
      <div v-else class="space-y-4">
        <div class="i-heroicons-arrow-path-rounded-square mx-auto h-12 w-12 text-primary animate-spin" />
        <div class="space-y-2">
          <div class="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              class="h-full bg-primary transition-all duration-300"
              :style="{ width: `${uploadProgress}%` }"
            />
          </div>
          <p class="text-sm text-muted-foreground">
            Uploading... {{ uploadProgress }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template> 