<script setup lang="ts">
import { z } from 'zod'
import { getDateTime } from '~/utils'

const { $client } = useNuxtApp()
const route = useRoute()
const eventId = z.string().parse(route.params.id)
const event = await $client.events.byId.query(eventId)
</script>

<template>
  <div v-if="event" class="min-h-screen bg-background-secondary py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-success" />
        </div>
        <h1 class="text-3xl font-bold mb-4">Ticket Purchase Successful!</h1>
        <p class="text-muted-foreground mb-8">
          Thank you for your purchase. Your ticket details have been sent to
          your email.
        </p>
      </div>

      <!-- Event Details -->
      <div class="bg-background rounded-xl border p-6 mb-8">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              v-if="event.cover"
              :src="event.cover"
              :alt="event.name"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-muted flex items-center justify-center"
            ></div>
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ event.name }}</h2>
            <div class="text-muted-foreground space-y-1 mt-2">
              <div v-if="event.startDate" class="flex items-center gap-2">
                <Icon name="ph:clock" class="w-4 h-4" />
                {{ getDateTime(event.startDate) }}
              </div>
              <div v-if="event.venue" class="flex items-center gap-2">
                <Icon name="ph:map-pin" class="w-4 h-4" />
                {{ event.venue.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <Button as-child variant="secondary">
          <NuxtLink to="/events">Browse More Events</NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink :to="`/events/${event.id}`">View Event</NuxtLink>
        </Button>
      </div>
    </div>
  </div>

  <EmptyState v-else variant="no-results" />
</template>
