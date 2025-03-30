<script setup lang="ts">
interface MapMarker {
  id: number
  top: string
  left: string
  label: string
}

const props = defineProps<{
  image?: string
  markers?: MapMarker[]
}>()

const showMap = ref(false)

// Default map image if none provided
const mapImage = computed(() => props.image || 'https://tile.openstreetmap.org/7/63/42.png')

// Default markers if none provided
const mapMarkers = computed(() => props.markers || [
  { id: 1, top: '20%', left: '30%', label: '1' },
  { id: 2, top: '40%', left: '50%', label: '2' },
  { id: 3, top: '60%', left: '25%', label: '3' },
  { id: 4, top: '35%', left: '70%', label: '4' },
  { id: 5, top: '70%', left: '60%', label: '5' }
])
</script>

<template>
  <!-- Desktop Map -->
  <div class="hidden lg:block">
    <div class="sticky top-[100px] rounded-2xl shadow-md overflow-hidden h-[600px]">
      <div class="relative w-full h-full">
        <!-- Map Image -->
        <img
          :src="mapImage"
          alt="Map"
          class="w-full h-full object-cover"
        />
        <!-- Map Markers -->
        <div
          v-for="marker in mapMarkers"
          :key="marker.id"
          class="absolute w-6 h-6 -ml-3 -mt-3 transition-all duration-300"
          :style="{ top: marker.top, left: marker.left }"
        >
          <div class="relative group">
            <div class="w-6 h-6 bg-primary rounded-full shadow-lg flex items-center justify-center text-white text-sm font-medium">
              {{ marker.label }}
            </div>
            <!-- Hover Card -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block z-30">
              <div class="bg-white rounded-lg shadow-lg p-2 transform transition-all duration-300">
                <div class="text-sm font-medium truncate text-foreground">
                  Venue {{ marker.label }}
                </div>
                <div class="text-sm text-gray-500 line-clamp-1">
                  123 Example Street
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Map Toggle Button -->
  <div class="lg:hidden">
    <Button 
      variant="outline" 
      class="w-full h-11 px-4 active:scale-95 transition-transform"
      @click="showMap = !showMap"
    >
      <Icon :name="showMap ? 'ph:list' : 'ph:map'" class="w-4 h-4 mr-2" />
      {{ showMap ? 'Show List' : 'Show Map' }}
    </Button>
  </div>

  <!-- Mobile Fullscreen Map -->
  <div 
    v-if="showMap" 
    class="lg:hidden fixed inset-0 z-40 bg-background pt-[73px] transition-all duration-300 ease-in-out"
    :class="{ 'opacity-0 translate-y-full': !showMap }"
  >
    <div class="relative w-full h-full">
      <!-- Map Image -->
      <img
        :src="mapImage"
        alt="Map"
        class="w-full h-full object-cover"
      />
      <!-- Map Markers -->
      <div
        v-for="marker in mapMarkers"
        :key="marker.id"
        class="absolute w-6 h-6 -ml-3 -mt-3 transition-all duration-300"
        :style="{ top: marker.top, left: marker.left }"
      >
        <div class="relative group">
          <div class="w-6 h-6 bg-primary rounded-full shadow-lg flex items-center justify-center text-white text-sm font-medium">
            {{ marker.label }}
          </div>
          <!-- Hover Card -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block z-30">
            <div class="bg-white rounded-lg shadow-lg p-2 transform transition-all duration-300">
              <div class="text-sm font-medium truncate text-foreground">
                Venue {{ marker.label }}
              </div>
              <div class="text-sm text-gray-500 line-clamp-1">
                123 Example Street
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Map marker hover effects */
.group:hover .w-6 {
  transform: scale(1.1);
}

/* Hover card animation */
.group:hover .hidden {
  display: block;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Mobile touch interactions */
@media (hover: none) {
  .group:active {
    transform: scale(0.95);
  }
}

/* Performance optimizations */
.absolute {
  contain: layout paint;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style> 