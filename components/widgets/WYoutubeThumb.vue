<script setup>
const getYoutubeId = (url) => {
  if (!url) {
    return ''
  }
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0]
}

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  showPlay: {
    type: Boolean,
    default: false,
  },
})

const youtubeId = computed(() => {
  return getYoutubeId(props.url)
})

const imageUrl = computed(() => {
  if (!youtubeId.value) {
    return ''
  }

  return `https://img.youtube.com/vi/${youtubeId.value}/hqdefault.jpg`
})
</script>

<template>
  <div class="w-full aspect-video rounded-md overflow-hidden relative">
    <NuxtImg
      :id="youtubeId.value"
      :src="imageUrl"
      fit="cover"
      class="w-full h-full object-cover"
    />
    <Icon
      v-if="showPlay"
      name="material-symbols:play-circle"
      size="64"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
    />
  </div>
</template>
