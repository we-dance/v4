<script setup lang="ts">
import { z } from 'zod'

const { isLoggedIn } = useAppAuth()

const { $client } = useNuxtApp()
const route = useRoute()
const offerId = z.string().parse(route.params.offerId)
const offer = await $client.checkout.view.query({ offerId })
</script>

<template>
  <div
    v-if="offer"
    class="min-h-screen bg-muted py-12 flex items-center justify-center"
  >
    <PaymentForm v-if="isLoggedIn" :offer="offer" />
    <LoginRedirect v-else :to="`/checkout/${offerId}`" />
  </div>

  <EmptyState v-else variant="no-results" />
</template>
