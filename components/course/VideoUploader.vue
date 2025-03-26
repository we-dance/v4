<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { courseVideoUploadSchema, type CourseVideoUpload, type CourseVideo } from '~/schemas/courseVideo'

const emit = defineEmits<{
  (e: 'upload-complete', video: CourseVideo): void
  (e: 'upload-error', error: Error): void
}>()

const isUploading = ref(false)
const uploadProgress = ref(0)

const { handleSubmit } = useForm<CourseVideoUpload>({
  validationSchema: toTypedSchema(courseVideoUploadSchema)
})

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  isUploading.value = true
  uploadProgress.value = 0

  try {
    // TODO: Replace with actual Mux upload implementation
    // For now, simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      uploadProgress.value = i
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Simulate video processing
    const video: CourseVideo = {
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ''),
      description: '',
      duration: 0,
      url: URL.createObjectURL(file),
      thumbnailUrl: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    emit('upload-complete', video)
  } catch (error) {
    emit('upload-error', error as Error)
  } finally {
    isUploading.value = false
    uploadProgress.value = 0
  }
}
</script>

<template>
  <div>
    <label class="block">
      <div
        class="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
      >
        <Icon
          :name="isUploading ? 'heroicons:arrow-up-circle' : 'heroicons:video-camera'"
          class="h-8 w-8 mb-2 text-muted-foreground"
        />
        <div class="text-sm font-medium mb-1">
          {{ isUploading ? 'Uploading...' : 'Upload Video' }}
        </div>
        <p class="text-sm text-muted-foreground mb-2">
          MP4 or MOV up to 2GB
        </p>
        <input
          type="file"
          accept="video/mp4,video/quicktime"
          class="hidden"
          @change="handleFileSelect"
          :disabled="isUploading"
        />
        <Progress
          v-if="isUploading"
          :value="uploadProgress"
          class="w-48"
        />
      </div>
    </label>
  </div>
</template> 