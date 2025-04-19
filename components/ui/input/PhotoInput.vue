<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 1024,
  },
  height: {
    type: Number,
    default: 1024,
  },
  placeholder: {
    type: String,
    default: 'Upload photo',
  },
  maxSize: {
    type: Number,
    default: 5,
  },
  acceptedFileTypes: {
    type: Array as () => string[],
    default: () => ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  },
  testMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const runtimeConfig = useRuntimeConfig()

const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const dragOver = ref(false)

const acceptFileTypes = computed(() => props.acceptedFileTypes.join(','))

const imageStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  maxWidth: '100%',
}))

const generateTestImage = async (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
}

const uploadToCloudinary = async (file: File) => {
  try {
    isLoading.value = true

    if (props.testMode) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return await generateTestImage(file)
    }

    const cloudName = runtimeConfig.public.cloudinaryCloudName
    const uploadPreset = runtimeConfig.public.cloudinaryUploadPreset

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  } finally {
    isLoading.value = false
  }
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  const file = files[0]
  await handleUpload(file)

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = false

  if (!event.dataTransfer?.files || event.dataTransfer.files.length === 0)
    return

  const file = event.dataTransfer.files[0]
  await handleUpload(file)
}

const handleUpload = async (file: File) => {
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
  if (!props.acceptedFileTypes.includes(fileExtension)) {
    toast.error(
      `Invalid file type. Allowed types: ${props.acceptedFileTypes.join(', ')}`
    )
    return
  }

  const maxSizeInBytes = props.maxSize * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    toast.error(`File is too large. Maximum size is ${props.maxSize}MB.`)
    return
  }

  try {
    const url = await uploadToCloudinary(file)
    modelValue.value = url
    toast.success('Image uploaded successfully')
  } catch (error) {
    toast.error('Failed to upload image')
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const clearImage = () => {
  modelValue.value = ''
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center"
    :class="{ 'border-2 border-dashed border-primary': dragOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Image preview -->
    <div
      v-if="modelValue"
      class="relative overflow-hidden bg-muted"
      :style="imageStyles"
    >
      <img
        :src="modelValue"
        :alt="placeholder"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100"
      >
        <div class="flex gap-2">
          <Button variant="destructive" size="sm" @click="clearImage">
            <Icon name="ph:trash" class="h-4 w-4" />
            Remove
          </Button>
          <Button variant="secondary" size="sm" @click="triggerFileInput">
            <Icon name="ph:arrow-clockwise" class="h-4 w-4" />
            Replace
          </Button>
        </div>
      </div>
    </div>

    <!-- Upload area -->
    <div
      v-else
      class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center transition-all hover:border-primary"
      :style="imageStyles"
      @click="triggerFileInput"
    >
      <div
        v-if="isLoading"
        class="flex flex-col items-center gap-2 text-foreground"
      >
        <Icon name="ph:spinner" class="h-12 w-12 animate-spin" />
        <span>Uploading...</span>
      </div>
      <div
        v-else
        class="flex flex-col items-center gap-2 text-muted-foreground"
      >
        <Icon name="ph:cloud-arrow-up" class="h-12 w-12" />
        <span class="text-lg font-medium">{{ placeholder }}</span>
        <span class="text-sm"> Drag and drop or click to select </span>
        <span class="text-xs text-muted-foreground">
          Supported formats: {{ props.acceptedFileTypes.join(', ') }}
        </span>
        <span class="text-xs text-muted-foreground">
          Max size: {{ props.maxSize }}MB
        </span>
      </div>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :accept="acceptFileTypes"
      @change="handleFileChange"
    />
  </div>
</template>
