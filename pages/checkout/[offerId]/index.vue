<script setup lang="ts">
import { z } from 'zod'
import { formatCurrencyCents, formatSubscriptionDuration } from '~/utils/format'

const { $client } = useNuxtApp()
const route = useRoute()
const offerId = z.string().parse(route.params.offerId)
const offer = await $client.offers.view.query({ offerId })

const getItems = (offer: any) => {
  return offer.items.split('\n')
}
</script>

<template>
  <div v-if="offer" class="min-h-screen bg-muted py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold">Checkout</h1>
          <p class="text-muted-foreground mt-2">Complete your booking</p>
        </div>

        <!-- Item Summary -->
        <div class="bg-background rounded-xl border p-6">
          <div class="flex gap-6">
            <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="offer.course.coverUrl || '/images/placeholder.jpg'"
                :alt="offer.course.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-xl font-bold">{{ offer.course.name }}</h2>
              <div v-if="offer.course.instructor">
                with {{ offer.course.instructor.name }}
              </div>
              <div
                v-if="offer.course.description"
                class="mt-2 text-muted-foreground"
              >
                {{ offer.course.description }}
              </div>
            </div>
          </div>

          <!-- Price Summary -->
          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between items-start text-lg">
              <div>
                <div class="font-medium">
                  {{ offer.name }}
                </div>
                <ul class="mt-2 space-y-1">
                  <li
                    v-for="(item, index) in getItems(offer)"
                    :key="index"
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon
                      name="ph:check"
                      class="w-3.5 h-3.5 text-accent flex-shrink-0"
                    />
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="font-bold">
                {{ formatCurrencyCents(offer.price, offer.currency) }}
                <span class="text-sm font-normal text-muted-foreground">
                  /{{ formatSubscriptionDuration(offer.duration) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <CheckoutForm :offer="offer" />
      </div>
    </div>
  </div>

  <EmptyState v-else variant="no-results" />
</template>
