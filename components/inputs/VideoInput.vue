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

  const promise = fetch('/api/media/video', {
    method: 'POST',
    body: fileData,
  })

  toast.promise(promise, {
    loading: 'Uploading video...',
    success: 'Video uploaded successfully',
    error: (error: any) => (error as Error).message,
  })

  const response = await promise

  const json = await response.json()

  console.log(json)

  return json.videoId
}

async function onDrop(acceptFiles: File[], rejectReasons: any) {
  if (rejectReasons.length > 0) {
    for (const reason of rejectReasons) {
      toast.error(reason)
    }
    return
  }

  if (acceptFiles.length > 0) {
    const videoId = await uploadFile(acceptFiles[0])
    model.value = videoId
  }
}

const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
  onDrop,
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <mux-player
      v-if="model"
      stream-type="on-demand"
      :playback-id="model"
      accent-color="#F1023D"
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
        Upload video
      </Button>
      <Button type="button" variant="outline" @click="model = null">
        Remove
      </Button>
    </div>
  </div>
</template>
