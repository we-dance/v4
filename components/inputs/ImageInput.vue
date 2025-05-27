<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone'
import { toast } from 'vue-sonner'

const model = defineModel<string | null>({
  required: false,
})

defineOptions({
  inheritAttrs: false,
})

async function uploadFile(file: File) {
  const fileData = new FormData()
  fileData.append('file', file)

  const promise = fetch('/api/media/image', {
    method: 'POST',
    body: fileData,
  })

  toast.promise(promise, {
    loading: 'Uploading image...',
    success: 'Image uploaded successfully',
    error: (error: any) => (error as Error).message,
  })

  const response = await promise

  const json = await response.json()

  return json.url
}

async function onDrop(acceptFiles: File[], rejectReasons: any) {
  if (rejectReasons.length > 0) {
    for (const reason of rejectReasons) {
      toast.error(reason)
    }
    return
  }

  if (acceptFiles.length > 0) {
    const url = await uploadFile(acceptFiles[0])
    model.value = url
  }
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <NuxtImg
      v-if="model"
      :src="model"
      alt="Image"
      class="w-full h-full aspect-square object-cover rounded-xl"
    />
    <div v-else>
      <div v-bind="getRootProps()">
        <p
          v-if="isDragActive"
          class="cursor-pointer text-center w-full h-full aspect-square rounded-xl bg-muted flex justify-center items-center"
        >
          Drop the file here
        </p>
        <p
          v-else
          class="cursor-pointer text-center w-full h-full aspect-square rounded-xl bg-muted flex justify-center items-center"
        >
          Drop photo here, or click to select a file
        </p>
      </div>
    </div>
    <input v-bind="getInputProps()" />
    <div class="flex items-center justify-center gap-2">
      <Button type="button" variant="outline" @click="open">
        Upload photo
      </Button>
      <Button type="button" variant="outline" @click="model = null">
        Remove
      </Button>
    </div>
  </div>
</template>
