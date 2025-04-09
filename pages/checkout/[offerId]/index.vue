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
    <div
      v-else
      class="bg-background rounded-xl border p-6 space-y-2 text-center items-center justify-center"
    >
      <p>Please login to continue</p>
      <Button as-child>
        <NuxtLink :to="`/login?redirect=/checkout/${offerId}`">Login</NuxtLink>
      </Button>
    </div>
  </div>

  <EmptyState v-else variant="no-results" />
</template>
