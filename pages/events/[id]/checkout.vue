<script setup lang="ts">
import { z } from 'zod'
import { getDateTime } from '~/utils'

const { $client } = useNuxtApp()
const route = useRoute()

const eventId = z.string().parse(route.params.id)

const {
  data: event,
  isLoading,
  isError,
  error,
} = useQuery<any>({
  queryKey: ['events.byId', eventId],
  queryFn: () => $client.events.byId.query(eventId),
  retry: false,
})
</script>

<template>
  <div class="min-h-screen bg-background-secondary py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center">
        <Loader />
      </div>

      <!-- Error State -->
      <ErrorMessage v-else-if="isError" :message="error?.message" />

      <!-- Content -->
      <div v-else-if="event" class="space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-4">Choose Your Ticket</h1>
          <p class="text-muted-foreground text-lg">
            Select a ticket type for {{ event.name }}
            {{ getDateTime(event.startDate) }}
          </p>
        </div>

        <div class="max-w-md mx-auto">
          <TicketOptions :event="event" />
        </div>
      </div>

      <!-- Not Found -->
      <EmptyState v-else variant="no-results" />
    </div>
  </div>
</template>
