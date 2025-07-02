<script setup lang="ts">
import '@mux/mux-player'

const { $client } = useNuxtApp()
const model = defineModel<string>({ required: true })

const { data, isLoading, isError, error } = useQuery<Array<any>>({
  queryKey: ['media.videos'],
  queryFn: () => $client.media.videos.query({ query: '' }),
  refetchInterval: 1000,
})

const handleSelect = (video: any) => {
  model.value = video.playbackId
  isSelecting.value = false
}

const isSelecting = ref(false)
</script>

<template>
  <div class="relative">
    <mux-player v-if="model" :playback-id="model" class="w-full h-auto" />
    <div v-else class="w-full h-auto bg-muted rounded-md" />
    <Button type="button" @click="isSelecting = true">Select Video</Button>

    <Dialog v-model:open="isSelecting">
      <DialogScrollContent>
        <DialogHeader>
          <DialogTitle>Select Video</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div class="flex flex-col gap-2">
            <Loader v-if="isLoading" />
            <ErrorMessage v-if="isError" :message="error?.message" />
            <div v-else class="grid grid-cols-2 gap-4">
              <VideoUploader />
              <MuxVideoEditor
                v-for="video in data"
                :key="video.id"
                :video="video"
                :selected="model === video.playbackId"
              >
                <div class="flex items-center justify-center p-2">
                  <Button @click="handleSelect(video)">Select</Button>
                </div>
              </MuxVideoEditor>
            </div>
          </div>
        </DialogDescription>
      </DialogScrollContent>
    </Dialog>
  </div>
</template>
