<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const message = computed(() => {
  if (props.error?.statusMessage) {
    return props.error.statusMessage
  }

  if (props.error?.statusCode === 404) {
    return "Looks like this dance floor doesn't exist. Let's get you back to the rhythm!"
  }

  return "Something went wrong while we were dancing. Let's try again!"
})
</script>

<template>
  <ErrorMessage v-if="error" :message="message" />
</template>
