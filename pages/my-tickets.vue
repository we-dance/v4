<script setup lang="ts">
import { formatCurrencyCents } from '~/utils/format'
import { getDateTime } from '~/utils'

definePageMeta({
  middleware: 'auth',
})

const { $client } = useNuxtApp()
const { data: purchases, pending } =
  await $client.ticketPurchases.myPurchases.useQuery()
</script>

<template>
  <div class="min-h-screen bg-muted py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">My Tickets</h1>
        <p class="text-muted-foreground mt-2">
          View your purchased event tickets and upcoming events
        </p>
      </div>

      <div v-if="pending" class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-background rounded-xl border p-6"
        >
          <Skeleton class="h-6 w-1/3 mb-4" />
          <Skeleton class="h-4 w-1/2 mb-2" />
          <Skeleton class="h-4 w-1/4" />
        </div>
      </div>

      <div v-else-if="!purchases?.length" class="text-center py-12">
        <Icon
          name="ph:ticket"
          class="w-16 h-16 text-muted-foreground mx-auto mb-4"
        />
        <h3 class="text-xl font-semibold mb-2">No tickets yet</h3>
        <p class="text-muted-foreground mb-6">
          You haven't purchased any event tickets yet.
        </p>
        <Button as-child>
          <NuxtLink to="/events">Browse Events</NuxtLink>
        </Button>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="purchase in purchases"
          :key="purchase.id"
          class="bg-background rounded-xl border p-6 hover:shadow-sm transition-shadow"
        >
          <div class="flex gap-6">
            <!-- Event Image -->
            <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                v-if="purchase.event.cover"
                :src="purchase.event.cover"
                :alt="purchase.event.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-muted flex items-center justify-center"
              ></div>
            </div>

            <!-- Event Details -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold">
                    <NuxtLink
                      :to="`/events/${purchase.event.id}`"
                      class="hover:text-primary"
                    >
                      {{ purchase.event.name }}
                    </NuxtLink>
                  </h3>

                  <div class="text-sm text-muted-foreground space-y-1 mt-2">
                    <div
                      v-if="purchase.event.startDate"
                      class="flex items-center gap-2"
                    >
                      <Icon name="ph:clock" class="w-4 h-4" />
                      {{ getDateTime(purchase.event.startDate) }}
                    </div>
                    <div
                      v-if="purchase.event.venue"
                      class="flex items-center gap-2"
                    >
                      <Icon name="ph:map-pin" class="w-4 h-4" />
                      {{ purchase.event.venue.name }}
                      <template v-if="purchase.event.venue.city">
                        · {{ purchase.event.venue.city.name }}
                      </template>
                    </div>
                  </div>
                </div>

                <!-- Ticket Info -->
                <div class="text-right">
                  <div class="font-semibold">
                    {{ purchase.quantity }}x {{ purchase.ticket.name }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    {{
                      formatCurrencyCents(
                        purchase.totalAmount,
                        purchase.currency
                      )
                    }}
                  </div>
                  <div class="text-xs text-muted-foreground mt-1">
                    Purchased {{ formatDate(purchase.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
