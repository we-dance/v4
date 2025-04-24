<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { useCloudinaryUpload } from '@/composables/useCloudinaryUpload'

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

const handleUploadSuccess = (url: string) => {
  modelValue.value = url
}

const { isLoading, openWidget, initCloudinaryWidget, isValidUrl } =
  useCloudinaryUpload(handleUploadSuccess)

initCloudinaryWidget({
  folder: props.folder,
  multipleFiles: props.multipleFiles,
  tags: props.tags,
  cropping: props.cropping,
  maxFileSize: props.maxSize * 1024 * 1024,
})

const hasValidImageUrl = computed(() => {
  return (
    modelValue.value &&
    modelValue.value.trim() !== '' &&
    isValidUrl(modelValue.value)
  )
})

const imageStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  maxWidth: '100%',
}))

const clearImage = () => {
  modelValue.value = ''
}
</script>

<template>
  <div class="relative flex flex-col items-center justify-center">
    <!-- Image preview -->
    <div
      v-if="hasValidImageUrl"
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
          <Button variant="secondary" size="sm" @click="openWidget">
            <Icon name="ph:arrow-clockwise" class="h-4 w-4" />
            Replace
          </Button>
        </div>
      </div>
    </div>

    <!-- Upload area -->
    <div v-else>
      <div
        class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-muted p-6 text-center transition-all hover:border-primary"
        :style="imageStyles"
        @click="openWidget"
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
    </div>
  </div>
</template>
