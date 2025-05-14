<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()

const event = ref<any>(null)
const loading = ref(true)

const loadEvent = async () => {
  try {
    loading.value = true
    const result = await $client.events.byId.query(route.params.id as string)
    event.value = result
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    loading.value = false
  }
}

await loadEvent()
</script>

<template>
  <EventEditor :event="event" @load="loadEvent" />
</template>
