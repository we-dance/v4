import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'

interface CloudinaryInterface {
  createUploadWidget: (
    options: any,
    callback: (error: any, result: any) => void
  ) => CloudinaryWidget
}

interface CloudinaryWidget {
  open: () => void
}

interface CloudinaryResult {
  event: string
  info: {
    secure_url: string
    [key: string]: any
  }
  [key: string]: any
}

declare global {
  interface Window {
    cloudinary?: CloudinaryInterface
  }
}

interface CloudinaryUploadOptions {
  folder?: string
  multipleFiles?: boolean
  tags?: string[]
  cropping?: boolean
  maxFileSize?: number
  sources?: string[]
  resourceType?: string
}

interface UseCloudinaryUploadReturn {
  isLoading: Ref<boolean>
  isInitialized: Ref<boolean>
  cloudinaryWidget: Ref<CloudinaryWidget | null>
  initCloudinaryWidget: (options?: CloudinaryUploadOptions) => void
  openWidget: () => void
  isValidUrl: (url: string) => boolean
}

export function useCloudinaryUpload(
  onSuccess?: (url: string) => void
): UseCloudinaryUploadReturn {
  const runtimeConfig = useRuntimeConfig()
  const isLoading = ref(false)
  const isInitialized = ref(false)
  const cloudinaryWidget = ref<CloudinaryWidget | null>(null)

  const cloudName = computed(() => runtimeConfig.public.cloudinaryCloudName)
  const uploadPreset = computed(
    () => runtimeConfig.public.cloudinaryUploadPreset
  )

  useHead({
    script: [
      {
        src: 'https://upload-widget.cloudinary.com/latest/global/all.js',
        type: 'text/javascript',
      },
    ],
  })

  function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const initCloudinaryWidget = (options: CloudinaryUploadOptions = {}) => {
    if (cloudinaryWidget.value) return

    if (!window.cloudinary) {
      toast.error('Cloudinary widget not loaded')
      return
    }

    const defaultOptions: CloudinaryUploadOptions = {
      folder: '',
      multipleFiles: false,
      tags: [],
      cropping: false,
      maxFileSize: 5 * 1024 * 1024,
      sources: [
        'local',
        'url',
        'camera',
        'google_drive',
        'dropbox',
        'unsplash',
      ],
      resourceType: 'image',
    }

    const mergedOptions = { ...defaultOptions, ...options }

    cloudinaryWidget.value = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName.value,
        uploadPreset: uploadPreset.value,
        folder: mergedOptions.folder,
        multiple: mergedOptions.multipleFiles,
        tags: mergedOptions.tags,
        cropping: mergedOptions.cropping,
        maxFileSize: mergedOptions.maxFileSize,
        sources: mergedOptions.sources,
        resourceType: mergedOptions.resourceType,
      },
      (error: any, result: CloudinaryResult) => {
        isLoading.value = false

        if (error) {
          toast.error('Failed to upload image')
          console.error('Upload error:', error)
          return
        }

        if (result && result.event === 'success' && result.info.secure_url) {
          if (isValidUrl(result.info.secure_url)) {
            if (onSuccess) {
              onSuccess(result.info.secure_url)
            }
            toast.success('Image uploaded successfully')
          } else {
            toast.error('Received invalid image URL from server')
          }
        }
      }
    )

    isInitialized.value = true
  }

  const openWidget = () => {
    isLoading.value = true

    if (!cloudinaryWidget.value) {
      initCloudinaryWidget()
    }

    if (cloudinaryWidget.value) {
      cloudinaryWidget.value.open()
    } else {
      isLoading.value = false
      toast.error('Failed to initialize upload widget')
    }
  }

  return {
    isLoading,
    isInitialized,
    cloudinaryWidget,
    initCloudinaryWidget,
    openWidget,
    isValidUrl,
  }
}
