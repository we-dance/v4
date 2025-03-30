<script setup lang="ts">
import { computed } from 'vue'

interface Venue {
  id: number
  name: string
  address: string
  image?: string
  rating?: number
  description?: string
  features?: string[]
  styles?: string[]
}

const props = defineProps<{
  venue: Venue
}>()

// Extract city and country from address
const location = computed(() => {
  const parts = props.venue.address.split(',')
  return {
    city: parts[parts.length - 2]?.trim() || '',
    country: parts[parts.length - 1]?.trim() || props.venue.address
  }
})
</script>

<template>
  <NuxtLink
    :to="`/venues/${venue.id}`"
    class="group block bg-background rounded-2xl overflow-hidden transition-all duration-300 p-2 shadow-md hover:shadow-xl h-full flex flex-col"
  >
    <!-- Image Container -->
    <div class="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
      <img
        :src="venue.image || '/images/venue-placeholder.jpg'"
        :alt="venue.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <!-- Rating Badge -->
      <div v-if="venue.rating" 
           class="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
        <Icon name="ph:star-fill" class="w-3.5 h-3.5 text-amber-500" />
        <span class="text-xs font-medium">{{ venue.rating }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-3 space-y-2 flex-1 flex flex-col">
      <!-- Title -->
      <h3 class="font-bold text-lg leading-tight line-clamp-1">{{ venue.name }}</h3>

      <!-- Location -->
      <div class="flex items-center gap-1.5 text-muted-foreground">
        <Icon name="ph:map-pin" class="w-3.5 h-3.5 flex-shrink-0" />
        <p class="text-sm line-clamp-1">
          {{ location.city }}{{ location.country ? `, ${location.country}` : '' }}
        </p>
      </div>

      <!-- Description -->
      <p v-if="venue.description" 
         class="text-sm text-muted-foreground line-clamp-2 mt-1">
        {{ venue.description }}
      </p>

      <!-- Features -->
      <div v-if="venue.features?.length" 
           class="flex flex-wrap gap-1.5 mt-2">
        <Badge
          v-for="feature in venue.features.slice(0, 2)"
          :key="feature"
          variant="secondary"
          class="text-xs"
        >
          {{ feature }}
        </Badge>
      </div>

      <!-- Dance Styles -->
      <div v-if="venue.styles?.length" 
           class="flex flex-wrap gap-1.5 mt-auto">
        <Badge
          v-for="style in venue.styles.slice(0, 2)"
          :key="style"
          variant="outline"
          class="text-xs"
        >
          {{ style }}
        </Badge>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
/* Card hover effects */
.group {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 
              0 4px 12px rgba(0, 0, 0, 0.05);
}

.group:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 
              0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Image hover zoom containment */
.group:hover .overflow-hidden img {
  transform: scale(1.05);
}

/* Smooth transitions */
.group,
.group img {
  will-change: transform;
  -webkit-font-smoothing: antialiased;
}

/* Mobile touch interactions */
@media (hover: none) {
  .group:active {
    transform: scale(0.98);
  }
}

/* Badge hover effects */
.badge {
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-1px);
}

/* Rating badge animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.absolute {
  animation: fadeIn 0.3s ease-out;
}
</style> 