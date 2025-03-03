<script setup lang="ts">
import type { AnyEvent } from '~/schemas/event'
import { format, parseISO } from 'date-fns'
import { computed } from 'vue'

const props = defineProps<{
  event: AnyEvent
}>()

// Format date properly
const formattedDate = computed(() => {
  try {
    if (!props.event.startDate) return 'Date not specified'
    return format(parseISO(props.event.startDate.toString()), 'MMM d, yyyy')
  } catch (e) {
    console.error('Date parsing error:', e)
    return 'Date unavailable'
  }
})

// Get event time in readable format
const eventTime = computed(() => {
  try {
    if (!props.event.startDate) return ''
    return format(parseISO(props.event.startDate.toString()), 'h:mm a')
  } catch (e) {
    return ''
  }
})

// Determine event status
const eventStatus = computed(() => {
  try {
    const now = new Date()
    const startDate = props.event.startDate ? new Date(props.event.startDate) : null
    const endDate = props.event.endDate ? new Date(props.event.endDate) : null
    
    if (!startDate) return null
    
    if (startDate > now) {
      return { label: 'Upcoming', color: 'bg-blue-500' }
    } else if (endDate && now > endDate) {
      return { label: 'Ended', color: 'bg-gray-500' }
    } else {
      return { label: 'Happening Now', color: 'bg-green-500' }
    }
  } catch (e) {
    return null
  }
})

// Get price display
const priceDisplay = computed(() => {
  if (props.event.price === '0' || props.event.price === 0) return 'Free'
  
  if (props.event.price) {
    return `${props.event.price} ${props.event.currency || '€'}`
  }
  
  if (props.event.prices?.length) {
    const lowestPrice = props.event.prices.reduce(
      (min, p) => (p.amount < min.amount ? p : min),
      props.event.prices[0]
    )
    
    if (lowestPrice.amount === 0) return 'Free'
    
    // If there is more than one price, show "From"
    const prefix = props.event.prices.length > 1 ? 'From ' : ''
    return `${prefix}${lowestPrice.amount} ${lowestPrice.currency || '€'}`
  }
  
  return 'Paid'
})

// Extract location information
const locationText = computed(() => {
  if (typeof props.event.location === 'string') {
    return props.event.location
  }
  
  if (props.event.location?.name) {
    return props.event.location.name
  }
  
  return 'Location not specified'
})

// Handle image error
const onImageError = (e) => {
  e.target.src = '/images/event-placeholder.jpg'
}
</script>

<template>
  <NuxtLink :to="`/events/${event.id}`" class="group block h-full">
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
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
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
          <div class="flex items-center gap-1.5 text-xs font-medium text-blue-300 mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formattedDate }}
            <span v-if="eventTime">• {{ eventTime }}</span>
          </div>
          <h2 class="font-bold text-lg leading-tight line-clamp-2">{{ event.name }}</h2>
        </div>
      </div>
      
      <!-- Card Body -->
      <div class="p-4 pt-3 flex-grow flex flex-col">
        <!-- Description -->
        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {{ event.description || "No description available" }}
        </p>
        
        <!-- Event Details -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300 mt-auto">
          <!-- Location -->
          <div class="flex items-center gap-1.5 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="truncate">{{ locationText }}</span>
          </div>
          
          <!-- Price -->
          <div class="flex items-center gap-1.5 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span 
              :class="{'text-green-600 dark:text-green-400': priceDisplay === 'Free'}"
              class="truncate font-medium"
            >
              {{ priceDisplay }}
            </span>
          </div>
        </div>
        
        <!-- View Details Button (Only visible on hover) -->
        <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div 
            class="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center justify-end group-hover:translate-x-1 transition-transform"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
/* Optional: Add custom animations or additional styling here */
</style>
