<script setup lang="ts">
import { onMounted } from 'vue'

const { offer } = defineProps<{
  offer: any
}>()

const { $client } = useNuxtApp()

const redirectUrl = ref('')
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  loading.value = true

  try {
    const { url } = await $client.checkout.createCheckoutSession.mutate({
      offerId: offer.id,
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
    <p>Waiting for payment...</p>
  </div>
  <div v-else-if="redirectUrl">
    You will be redirected, or you can click
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
