<script setup lang="ts">
import { onMounted } from 'vue'

const { offer } = defineProps<{
  offer: any
}>()

const { $client } = useNuxtApp()

const redirectUrl = ref('')
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const { url } = await $client.checkout.createCheckoutSession.mutate({
    offerId: offer.id,
  })

  redirectUrl.value = url
  loading.value = false
  window.location.href = redirectUrl.value
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
</template>
