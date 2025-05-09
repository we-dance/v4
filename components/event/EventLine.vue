<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const formattedDate = computed(() => {
  return format(parseISO(props.event.startDate), 'MMM d, yyyy')
})

const eventStatus = computed(() => {
  if (props.event.status === 'upcoming') {
    return {
      color: 'bg-blue-600',
      label: 'Upcoming',
    }
  } else if (props.event.status === 'past') {
    return {
      color: 'bg-gray-600',
      label: 'Past',
    }
  } else if (props.event.status === 'cancelled') {
    return {
      color: 'bg-red-600',
      label: 'Cancelled',
    }
  }
})

const eventTime = computed(() => {
  return format(parseISO(props.event.startDate), 'h:mm a')
})
</script>

<template>
  <NuxtLink :to="`/events/${event.id}`" class="group block h-full">
    <article
      class="bg-white flex dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm h-full"
    >
      <div>
        <img
          :src="event.cover"
          :alt="event.name"
          class="w-full h-40 object-cover"
        />
      </div>
      <div class="p-4">
        <h2 class="font-bold text-lg leading-tight line-clamp-2">
          {{ event.name }}
        </h2>
        <div class="text-sm text-gray-500">
          {{ event.venue.name }}
        </div>
        <div class="text-sm text-gray-500">
          {{ event.venue.city.name }},
          <span class="uppercase">{{ event.venue.city.countryCode }}</span>
        </div>
        <div class="text-sm text-gray-500">
          {{ formattedDate }}
          <span v-if="eventTime">· {{ eventTime }}</span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
