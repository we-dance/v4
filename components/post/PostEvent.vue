<script setup lang="ts">
import type { EventContent } from '~/schemas/post'
import type { AnyEvent } from '~/schemas/event'
import PostEventUpdate from './postEventUpdate.vue'

const props = defineProps<{
  content: EventContent
}>()

// Transform PostEvent content into AnyEvent format
const eventData = computed<AnyEvent>(() => ({
  id: crypto.randomUUID(),
  type: 'party',
  status: 'upcoming', // You might want to compute this based on date
  name: props.content.title,
  description: props.content.description,
  image: props.content.image,
  date: {
    start: props.content.date,
    end: props.content.date, // Adjust if you have end date
  },
  location: {
    name: props.content.location,
    city: '', // Add if available in your content
    country: '', // Required by schema
  },
  price: props.content.price,
  tags: props.content.tags || [],
  artists: [], // Required by schema
  organizer: {
    id: '', // Required by schema
    name: 'Unknown Organizer',
    image: '',
    points: 0,
  },
  schedule: [], // Required by schema
}))
</script>

<template>
  <div class="flex-1 flex flex-col">
    <PostEventUpdate />
    <div class="px-4">
      <p class="text-muted-foreground">{{ content.description }}</p>
    </div>
    <EventCard :event="eventData" class="m-4" />
  </div>
</template>
