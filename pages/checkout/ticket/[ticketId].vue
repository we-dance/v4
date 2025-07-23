<script setup lang="ts">
import { z } from 'zod'

const { isLoggedIn } = useAppAuth()

const { $client } = useNuxtApp()
const route = useRoute()
const ticketId = z.string().parse(route.params.ticketId)
const ticket = await $client.checkout.viewTicket.query({ ticketId })
</script>

<template>
  <div
    v-if="ticket"
    class="min-h-screen bg-muted py-12 flex items-center justify-center"
  >
    <TicketPaymentForm v-if="isLoggedIn" :ticket="ticket" />
    <div
      v-else
      class="bg-background rounded-xl border p-6 space-y-2 text-center items-center justify-center"
    >
      <p>Please login to continue</p>
      <Button as-child>
        <NuxtLink :to="`/login?redirect=/checkout/ticket/${ticketId}`"
          >Login</NuxtLink
        >
      </Button>
    </div>
  </div>

  <EmptyState v-else variant="no-results" />
</template>
