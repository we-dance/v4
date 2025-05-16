<script setup>
const { $client } = useNuxtApp()
const route = useRoute()
const event = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchEvent = async () => {
  loading.value = true
  error.value = null

  try {
    const id = route.params.id
    const response = await $client.events.byId.query(id)
    event.value = response
  } catch (e) {
    error.value = e?.message || 'Failed to load event'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvent()
})
</script>

<template>
  <EventView :event="event" />
</template>
