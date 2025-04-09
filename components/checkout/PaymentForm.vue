<script setup lang="ts">
import { onMounted } from 'vue'

const { offer } = defineProps<{
  offer: any
}>()

const { $client } = useNuxtApp()

const redirectUrl = ref('')

onMounted(async () => {
  const { url } = await $client.checkout.createCheckoutSession.mutate({
    offerId: offer.id,
  })
  redirectUrl.value = url
  window.location.href = redirectUrl.value
})
</script>

<template>
  <div v-if="redirectUrl">
    You will be redirected, or you can click
    <a class="text-blue-500 underline" :href="redirectUrl">this link</a>.
  </div>
  <div v-else>
    <p>Waiting for payment...</p>
  </div>
</template>
