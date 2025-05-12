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
  <article
    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-1"
  >
    <!-- Image Container with Overlay -->
    <div class="relative aspect-[3/2] overflow-hidden">
      <img
        :src="event.cover || '/images/event-placeholder.jpg'"
        :alt="event.name"
        @error="onImageError"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
      ></div>

      <!-- Status Badge -->
      <div
        v-if="eventStatus"
        :class="`absolute top-3 right-3 ${eventStatus.color} text-white text-xs px-2 py-1 rounded-full font-medium shadow-md`"
      >
        {{ eventStatus.label }}
      </div>

      <!-- Type Badge -->
      <div
        v-if="event.type"
        class="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md"
      >
        {{ event.type }}
      </div>

      <!-- Title and Date Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        <div
          class="flex items-center gap-1.5 text-xs font-medium text-blue-300 mb-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {{ formattedDate }}
          <span v-if="eventTime">• {{ eventTime }}</span>
        </div>
        <h2 class="font-bold text-lg leading-tight line-clamp-2">
          {{ event.name }}
        </h2>
      </div>
    </div>

    <!-- Card Body -->
    <div class="p-4 pt-3 flex-grow flex flex-col">
      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
        {{ event.description || 'No description available' }}
      </p>

      <!-- Event Details -->
      <div
        class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300 mt-auto"
      >
        <!-- Location -->
        <div class="flex items-center gap-1.5 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 flex-shrink-0 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span class="truncate">{{ event.venue.name }}</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-1.5 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 flex-shrink-0 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span
            :class="{
              'text-green-600 dark:text-green-400': priceDisplay === 'Free',
            }"
            class="truncate font-medium"
          >
            {{ event.price }}
          </span>
        </div>
      </div>

      <!-- View Details Button (Only visible on hover) -->
      <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div
          class="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center justify-end group-hover:translate-x-1 transition-transform"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>
