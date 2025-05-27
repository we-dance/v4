<script setup lang="ts">
import '@mux/mux-uploader'

const getUploadUrl = async () => {
  const response = await fetch('/api/media/video', { method: 'POST' })
  const data = await response.json()

  return data.url
}
</script>

<template>
  <div>
    <mux-uploader id="my-uploader" class="hidden" :endpoint="getUploadUrl" />

    <mux-uploader-drop
      mux-uploader="my-uploader"
      class="border border-slate-200 rounded shadow mb-4 h-full"
      overlay
      overlay-text="Let it go"
    >
      <span slot="heading" class="text-slate-600 text-xl mb-2"
        >Drop your video</span
      >
      <span slot="separator" class="text-slate-400 text-sm italic">— or —</span>

      <mux-uploader-file-select mux-uploader="my-uploader" class="mt-4">
        <Button> Select from a folder </Button>
      </mux-uploader-file-select>

      <mux-uploader-progress
        type="percentage"
        mux-uploader="my-uploader"
      ></mux-uploader-progress>
    </mux-uploader-drop>
  </div>
</template>
