<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import type { LatLng } from 'leaflet'
import { useRouter } from 'vue-router'

const router = useRouter()

interface VenueMapProps {
  venues: Array<{
    id: string
    name: string
    location: string
    coordinates: LatLng
    rating: number
    description: string
    priceRange: string
    capacity: string
    amenities: string[]
    image?: string
  }>
  highlightedVenueId?: string
}

defineProps<VenueMapProps>()

const emit = defineEmits<{
  'update:highlightedVenueId': [id: string]
}>()

const navigateToVenue = (venueId: string) => {
  router.push(`/venues/${venueId}`)
}
</script>

<template>
  <div class="w-full h-full rounded-lg overflow-hidden border">
    <LMap
      :zoom="13"
      :center="venues[0]?.coordinates || { lat: 48.1351, lng: 11.5820 }"
      :use-global-leaflet="false"
      class="h-full z-0"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      <LMarker
        v-for="venue in venues"
        :key="venue.id"
        :lat-lng="venue.coordinates"
        @click="$emit('update:highlightedVenueId', venue.id)"
      >
        <LPopup>
          <div class="w-[280px] p-3 space-y-3">
            <!-- Image -->
            <img
              :src="venue.image"
              :alt="venue.name"
              class="w-full h-[140px] object-cover rounded-lg"
            />
            
            <!-- Content -->
            <div class="space-y-2">
              <!-- Title and Rating -->
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-semibold">{{ venue.name }}</h3>
                <div class="flex items-center gap-1 text-sm">
                  <Icon 
                    name="lucide:star" 
                    class="h-4 w-4 text-yellow-500"
                  />
                  {{ venue.rating }}
                </div>
              </div>

              <!-- Location -->
              <p class="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="lucide:map-pin" class="h-3 w-3" />
                {{ venue.location }}
              </p>

              <!-- Price and Capacity -->
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground flex items-center gap-1">
                  <Icon name="lucide:users" class="h-4 w-4" />
                  {{ venue.capacity }}
                </span>
                <Badge>{{ venue.priceRange }}</Badge>
              </div>

              <!-- View Details Button -->
              <Button 
                class="w-full mt-2"
                @click="navigateToVenue(venue.id)"
              >
                View Details
              </Button>
            </div>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>
:deep(.leaflet-popup-content-wrapper) {
  padding: 0;
  overflow: hidden;
}

:deep(.leaflet-popup-content) {
  margin: 0;
  padding: 12px;
  width: 300px !important;
}

:deep(.leaflet-popup-close-button) {
  color: white;
  margin: 4px;
}

.marker-highlight {
  filter: hue-rotate(180deg);
}
</style> 