<script setup lang="ts">
import { onMounted } from 'vue'

const { ticket } = defineProps<{
  ticket: any
}>()

const { $client } = useNuxtApp()

const redirectUrl = ref('')
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  loading.value = true

  try {
    const { url } = await $client.checkout.createTicketCheckoutSession.mutate({
      ticketId: ticket.id,
    })

    redirectUrl.value = url
    loading.value = false
    window.location.href = redirectUrl.value
  } catch (e) {
    loading.value = false
    error.value = (e as Error).message
  }
})
</script>

<template>
  <div v-if="loading">
    <p>Preparing your ticket purchase...</p>
  </div>
  <div v-else-if="redirectUrl">
    You will be redirected to complete your payment, or you can click
    <a class="text-blue-500 underline" :href="redirectUrl">this link</a>.
  </div>
  <div v-else>
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>
  </div>
</template>
