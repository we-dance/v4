<script setup lang="ts">
const getYoutubeId = (input: string) => {
  const url = input.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0]
}

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
})

const src = computed(() => {
  if (!props.url) {
    return ''
  }

  const videoId = getYoutubeId(props.url)

  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    props.autoplay ? 1 : 0
  }&vq=hd720`
})
</script>

<template>
  <iframe
    :src="src"
    frameborder="0"
    allowfullscreen
    allow="autoplay"
    class="w-full aspect-video max-h-[90vh] my-4"
  ></iframe>
</template>
