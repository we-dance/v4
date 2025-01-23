<script setup lang="ts">
import { mockEvents } from "@/data/mockEvents";
import type { AnyEvent } from "~/schemas/event";
import { formatDate } from "~/utils/format";

const route = useRoute();
const event = computed(() =>
  mockEvents.find((e) => String(e.id) === String(route.params.id))
);
</script>

<template>
  <div v-if="event" class="min-h-screen bg-muted py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-green-600" />
        </div>
        <h1 class="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p class="text-gray-600 mb-8">
          Thank you for your booking. We've sent the details to your email.
        </p>
      </div>

      <!-- Event Details -->
      <div class="bg-white rounded-xl border p-6 mb-8">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="event.image || '/images/event-placeholder.jpg'"
              :alt="event.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ event.name }}</h2>
            <div class="text-gray-600 space-y-1 mt-2">
              <div class="flex items-center gap-2">
                <Icon name="ph:calendar" class="w-4 h-4" />
                <span>{{ formatDate(event.date.start) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:map-pin" class="w-4 h-4" />
                <span
                  >{{ event.location.name }}, {{ event.location.city }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <Button as-child variant="outline">
          <NuxtLink to="/events">Browse More Events</NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink :to="`/events/${event.id}`">View Event Details</NuxtLink>
        </Button>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon name="ph:calendar-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
      <p class="text-gray-600 mb-6">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/events">Browse Events</NuxtLink>
      </Button>
    </div>
  </div>
</template>
