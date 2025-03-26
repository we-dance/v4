<script setup lang="ts">
import { ref } from 'vue'
import type { CourseMaterial } from '~/schemas/courseMaterial'

const emit = defineEmits<{
  (e: 'upload-complete', material: CourseMaterial): void
  (e: 'upload-error', error: Error): void
}>()

const isUploading = ref(false)
const uploadProgress = ref(0)
const isDragging = ref(false)

const handleDragEnter = (e: DragEvent) => {
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
  if (!files?.length) return
  
  await handleFiles(files)
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  await handleFiles(input.files)
}

const handleFiles = async (files: FileList) => {
  isUploading.value = true
  uploadProgress.value = 0

  try {
    for (const file of files) {
      // Get upload URL from your backend
      const { uploadUrl, fileId } = await fetch('/api/upload-url', {
        method: 'POST',
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type
        })
      }).then(res => res.json())

      // Upload file
      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          uploadProgress.value = Math.round((e.loaded * 100) / e.total)
        }
      })

      await new Promise((resolve, reject) => {
        xhr.open('PUT', uploadUrl)
        xhr.onload = resolve
        xhr.onerror = reject
        xhr.send(formData)
      })

      // Create material object
      const material: CourseMaterial = {
        id: fileId,
        name: file.name,
        description: '',
        fileUrl: uploadUrl,
        fileType: file.type,
        fileSize: file.size,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      emit('upload-complete', material)
    }
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
    <!-- Upload Area -->
    <div
      class="relative"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Zone -->
      <div
        :class="[
          'border-2 border-dashed rounded-lg p-8 transition-colors text-center',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        ]"
      >
        <input
          type="file"
          multiple
          class="hidden"
          @change="handleFileSelect"
          id="material-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
        />

        <div v-if="!isUploading">
          <div class="i-heroicons-cloud-arrow-up h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-sm font-medium">Upload Supplementary Materials</h3>
          <p class="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
            Drag and drop your files here, or click to browse
          </p>
          <label
            for="material-upload"
            class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            <div class="i-heroicons-folder-open h-5 w-5" />
            Browse Files
          </label>
          <p class="mt-2 text-xs text-muted-foreground">
            Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG
          </p>
        </div>

        <!-- Upload Progress -->
        <div v-else class="space-y-4">
          <div class="animate-spin i-heroicons-arrow-path h-8 w-8 mx-auto text-primary" />
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span>Uploading...</span>
              <span>{{ uploadProgress }}%</span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-300"
                :style="{ width: uploadProgress + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 