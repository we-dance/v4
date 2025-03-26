<script setup lang="ts">
import { ref } from 'vue'
import type { CourseMaterial } from '~/schemas/courseMaterial'
import { toast } from 'vue-sonner'

const materials = ref<CourseMaterial[]>([])
const isDragging = ref(false)
const isUploading = ref(false)

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

  try {
    for (const file of files) {
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png',
        'image/jpeg'
      ]

      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type ${file.type} is not supported`)
        continue
      }

      // Create material object
      const material: CourseMaterial = {
        id: crypto.randomUUID(),
        name: file.name,
        description: '',
        fileUrl: URL.createObjectURL(file),
        fileType: file.type,
        fileSize: file.size,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      materials.value.push(material)
      toast.success(`${file.name} uploaded successfully`)
    }
  } catch (error) {
    toast.error('Failed to upload file')
    console.error('Upload error:', error)
  } finally {
    isUploading.value = false
  }
}

const getFileIcon = (fileType: string) => {
  if (fileType.includes('pdf')) return 'i-heroicons-document-text'
  if (fileType.includes('word')) return 'i-heroicons-document'
  if (fileType.includes('sheet')) return 'i-heroicons-table-cells'
  if (fileType.includes('image')) return 'i-heroicons-photo'
  return 'i-heroicons-document'
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const deleteMaterial = (materialId: string) => {
  materials.value = materials.value.filter(m => m.id !== materialId)
  toast.success('Material deleted successfully')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-lg font-semibold">Course Materials</h2>
      <p class="text-sm text-muted-foreground">
        These are optional worksheets or references.
      </p>
    </div>

    <!-- Upload Area -->
    <div
      class="relative"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
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
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
        />

        <div v-if="!isUploading">
          <div class="i-heroicons-cloud-arrow-up h-12 w-12 mx-auto text-muted-foreground" />
          <h3 class="mt-4 text-sm font-medium">Upload Course Materials</h3>
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
            Supported formats: PDF, DOCX, XLSX, PNG, JPG
          </p>
        </div>

        <div v-else class="space-y-4">
          <div class="animate-spin i-heroicons-arrow-path h-8 w-8 mx-auto text-primary" />
          <p class="text-sm text-muted-foreground">Uploading...</p>
        </div>
      </div>
    </div>

    <!-- File Previews -->
    <div v-if="materials.length > 0" class="space-y-2">
      <div
        v-for="material in materials"
        :key="material.id"
        class="flex items-center gap-4 p-4 bg-card rounded-lg border group"
      >
        <div :class="[getFileIcon(material.fileType), 'h-8 w-8 text-muted-foreground']" />
        <div class="flex-1 min-w-0">
          <h4 class="font-medium truncate">{{ material.name }}</h4>
          <p class="text-sm text-muted-foreground">{{ formatFileSize(material.fileSize) }}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          @click="deleteMaterial(material.id)"
        >
          <div class="i-heroicons-trash h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template> 