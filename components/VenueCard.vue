<script setup lang="ts">
interface VenueCardProps {
  name: string
  location: string
  rating: number
  description: string
  priceRange: string
  capacity: string
  amenities: string[]
  image?: string
}

defineProps<VenueCardProps>()

// Add fallback image
const fallbackImage = 'https://images.unsplash.com/photo-1566137147-aab0b01d5dc9?q=80&w=800&auto=format'
</script>

<template>
  <div
    class="group relative bg-white rounded-lg overflow-hidden border border-border transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/3]">
      <img
        :src="image || fallbackImage"
        :alt="name"
        class="w-full h-full object-cover"
        loading="lazy"
        @error="$event.target.src = fallbackImage"
      />
      
      <!-- Rating Badge -->
      <div
        class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm"
      >
        <span class="text-yellow-500">⭐</span>
        {{ rating.toFixed(1) }}
      </div>

      <!-- Price Badge -->
      <div
        class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium shadow-sm"
      >
        {{ priceRange }}
      </div>

      <!-- Favorite Button - Always visible -->
      <button
        type="button"
        class="absolute top-3 left-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
      >
        <span class="text-muted-foreground hover:text-primary">❤️</span>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <div>
        <h3 class="font-semibold text-lg">{{ name }}</h3>
        <p class="text-sm text-muted-foreground">{{ location }}</p>
      </div>

      <p class="text-sm text-muted-foreground">
        {{ description }}
      </p>

      <!-- Capacity -->
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="users" class="h-4 w-4" />
        {{ capacity }}
      </div>

      <!-- Amenities -->
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="amenity in amenities"
          :key="amenity"
          variant="secondary"
          class="text-xs"
        >
          {{ amenity }}
        </Badge>
      </div>
    </div>
  </div>
</template> 