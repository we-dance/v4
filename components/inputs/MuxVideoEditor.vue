<script setup lang="ts">
import { getDateTime } from '~/utils'
import '@mux/mux-player'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const { $client } = useNuxtApp()
const queryClient = useQueryClient()

const handleDelete = async () => {
  await $client.media.deleteVideo.mutate({ id: props.video.id })
  await queryClient.invalidateQueries({
    queryKey: ['media.videos'],
  })
}

const title = ref(props.video.title || 'Untitled')
const isEditing = ref(false)
const handleTitleChange = async () => {
  isEditing.value = false
  await $client.media.updateVideo.mutate({
    id: props.video.id,
    title: title.value,
  })
  await queryClient.invalidateQueries({
    queryKey: ['media.videos'],
  })
}
</script>

<template>
  <div class="border rounded overflow-hidden">
    <div
      v-if="video.status !== 'ready'"
      class="w-full aspect-video flex items-center justify-center"
    >
      {{ video.status }}
    </div>
    <mux-player v-else :playback-id="video.playbackId" class="w-full h-auto" />
    <div class="flex items-center justify-between">
      <div class="px-4 py-2 -mt-1 gap-2">
        <p
          v-if="!isEditing"
          class="text-sm font-medium"
          @click="isEditing = true"
        >
          {{ title }}
        </p>
        <Input
          v-else
          v-model="title"
          placeholder="Untitled"
          class="text-sm font-medium"
          @keydown.enter="handleTitleChange"
          @blur="handleTitleChange"
        />
        <p class="text-xs text-muted-foreground">
          {{ getDateTime(video.createdAt) }}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon">
            <Icon name="lucide:ellipsis" class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="handleDelete"> Delete </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <slot />
  </div>
</template>
