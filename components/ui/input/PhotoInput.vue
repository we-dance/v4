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
  // Cloudinary specific options
  cropping: {
    type: Boolean,
    default: false,
  },
  folder: {
    type: String,
    default: '',
  },
  multipleFiles: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const runtimeConfig = useRuntimeConfig()

const isLoading = ref(false)

const cloudName = computed(() => runtimeConfig.public.cloudinaryCloudName)
const uploadPreset = computed(() => runtimeConfig.public.cloudinaryUploadPreset)

const imageStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  maxWidth: '100%',
}))

const handleUploadSuccess = (result: any) => {
  if (result && result.event === 'success') {
    const url = result.info.secure_url
    modelValue.value = url
    toast.success('Image uploaded successfully')
  }
}

const handleResult = (result: any) => {
  if (result && result.event === 'success') {
    handleUploadSuccess(result)
  }
}

const handleError = (error: any) => {
  console.error('Upload error:', error)
  toast.error('Failed to upload image')
}

const clearImage = () => {
  modelValue.value = ''
}
</script>

<template>
  <div class="relative flex flex-col items-center justify-center">
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
          <CldUploadWidget
            v-if="cloudName && uploadPreset"
            v-slot="{ open }"
            :uploadPreset="uploadPreset"
            :config="{ cloud: { cloudName } }"
            :options="{
              folder,
              multiple: multipleFiles,
              tags,
              cropping,
              resourceType: 'image',
            }"
            :onSuccess="handleUploadSuccess"
            :onError="handleError"
            :onResult="handleResult"
          >
            <Button variant="secondary" size="sm" @click="open">
              <Icon name="ph:arrow-clockwise" class="h-4 w-4" />
              Replace
            </Button>
          </CldUploadWidget>
        </div>
      </div>
    </div>

    <!-- Upload area with CldUploadWidget -->
    <div v-else>
      <CldUploadWidget
        v-if="cloudName && uploadPreset"
        v-slot="{ open }"
        :uploadPreset="uploadPreset"
        :config="{ cloud: { cloudName } }"
        :options="{
          folder,
          multiple: multipleFiles,
          tags,
          cropping,
          maxFiles: 1,
          maxFileSize: maxSize * 1024 * 1024,
          sources: [
            'local',
            'url',
            'camera',
            'google_drive',
            'dropbox',
            'unsplash',
          ],
          resourceType: 'image',
        }"
        :onSuccess="handleUploadSuccess"
        :onError="handleError"
        :onResult="handleResult"
      >
        <div
          class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center transition-all hover:border-primary"
          :style="imageStyles"
          @click="open"
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
            <span class="text-sm">Click to select</span>
            <span class="text-xs text-muted-foreground">
              Supported formats: {{ acceptedFileTypes.join(', ') }}
            </span>
            <span class="text-xs text-muted-foreground">
              Max size: {{ maxSize }}MB
            </span>
          </div>
        </div>
      </CldUploadWidget>

      <!-- Fallback message when Cloudinary is not configured -->
      <div
        v-else
        class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center"
        :style="imageStyles"
      >
        <div class="flex flex-col items-center gap-2 text-amber-500">
          <Icon name="ph:warning-circle" class="h-12 w-12" />
          <span class="text-lg font-medium">Cloudinary not configured</span>
          <span class="text-sm max-w-md">
            Please ensure Cloudinary is properly configured in your .env file.
            Check the documentation for setup instructions.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
