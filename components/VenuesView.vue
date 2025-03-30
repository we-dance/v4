<script setup lang="ts">
import { mockVenues } from '~/data/mockVenues'
const venues = mockVenues

// View type state
type ViewType = 'grid' | 'list' | 'map'
const viewType = ref<ViewType>('grid')

// Filter sheets state
const showStylesSheet = ref(false)
const showPriceSheet = ref(false)
const showCapacitySheet = ref(false)
const showFilters = ref(false)
const showLocationFilter = ref(false)

const search = ref('')
const selectedLocation = ref<string | null>(null)
const selectedStyles = ref<string[]>([])
const selectedFeatures = ref<string[]>([])
const selectedPriceRange = ref<[number, number]>([0, 200])
const selectedCapacityRange = ref<[number, number]>([0, 200])

// Add ref for map toggle
const showMap = ref(false)

// Add ref for mobile view state
const showMobileMap = ref(false)

// Add dummy coordinates for map pins (just for visual demonstration)
const dummyPins = [
  { top: '20%', left: '30%' },
  { top: '40%', left: '50%' },
  { top: '60%', left: '25%' },
  { top: '35%', left: '70%' },
  { top: '70%', left: '60%' }
]

const allStyles = computed(() =>
  Array.from(new Set(venues.flatMap((venue) => venue.styles)))
)

const allFeatures = computed(() =>
  Array.from(new Set(venues.flatMap((venue) => venue.features)))
)

const activeFiltersCount = computed(() => {
  let count = 0
  if (search.value) count++
  if (selectedLocation.value) count++
  if (selectedStyles.value.length) count++
  if (selectedFeatures.value.length) count++
  if (selectedPriceRange.value[0] > 0 || selectedPriceRange.value[1] < 200) count++
  if (selectedCapacityRange.value[0] > 0 || selectedCapacityRange.value[1] < 200) count++
  return count
})

const updateLocation = (location: string | null) => {
  selectedLocation.value = location
  showLocationFilter.value = false
}

const filteredVenues = computed(() => {
  return venues.filter((venue) => {
    const matchesSearch =
      search.value === '' ||
      venue.name.toLowerCase().includes(search.value.toLowerCase()) ||
      venue.description.toLowerCase().includes(search.value.toLowerCase())

    const matchesLocation =
      !selectedLocation.value ||
      venue.address.toLowerCase().includes(selectedLocation.value.toLowerCase())

    const matchesStyles =
      selectedStyles.value.length === 0 ||
      venue.styles.some((style) => selectedStyles.value.includes(style))

    const matchesFeatures =
      selectedFeatures.value.length === 0 ||
      venue.features.some((feature) => selectedFeatures.value.includes(feature))

    const minPrice = Math.min(...venue.areas.map((area) => area.pricePerHour))
    const maxPrice = Math.max(...venue.areas.map((area) => area.pricePerHour))
    const totalCapacity = venue.areas.reduce(
      (sum, area) => sum + area.capacity,
      0
    )

    const matchesPrice =
      maxPrice >= selectedPriceRange.value[0] &&
      minPrice <= selectedPriceRange.value[1]

    const matchesCapacity =
      totalCapacity >= selectedCapacityRange.value[0] &&
      totalCapacity <= selectedCapacityRange.value[1]

    return (
      matchesSearch &&
      matchesLocation &&
      matchesStyles &&
      matchesFeatures &&
      matchesPrice &&
      matchesCapacity
    )
  })
})

const clearLocationFilter = () => {
  selectedLocation.value = null
  showLocationFilter.value = false
}

const clearAllFilters = () => {
  search.value = ''
  selectedLocation.value = null
  selectedStyles.value = []
  selectedFeatures.value = []
  selectedPriceRange.value = [0, 200]
  selectedCapacityRange.value = [0, 200]
  showFilters.value = false
}

// Add ref for hovered venue
const hoveredVenueId = ref<number | null>(null)

// Add method to handle venue hover
const handleVenueHover = (id: number | null) => {
  hoveredVenueId.value = id
  if (id) {
    // Find the venue card element
    const venueCard = document.querySelector(`[data-venue-id="${id}"]`)
    if (venueCard) {
      // Scroll the card into view with smooth behavior
      venueCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}

// Add method to handle pin hover
const handlePinHover = (id: number | null) => {
  hoveredVenueId.value = id
  if (id) {
    // Find the venue card element
    const venueCard = document.querySelector(`[data-venue-id="${id}"]`)
    if (venueCard) {
      // Scroll the card into view with smooth behavior
      venueCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}

// Add favorite functionality
const favoriteVenues = ref(new Set<number>())
const toggleFavorite = (id: number) => {
  if (favoriteVenues.value.has(id)) {
    favoriteVenues.value.delete(id)
  } else {
    favoriteVenues.value.add(id)
  }
}

// View toggle methods
const setViewType = (type: ViewType) => {
  viewType.value = type
  if (type === 'map') {
    showMap.value = true
  } else {
    showMap.value = false
  }
}

// Add computed property for map pins
const mapPins = computed(() => {
  return filteredVenues.value.map((venue, index) => {
    // Calculate position based on index to spread pins across the map
    const totalVenues = filteredVenues.value.length
    const row = Math.floor(index / 3)
    const col = index % 3
    
    return {
      venue,
      position: {
        top: `${20 + (row * 25)}%`,
        left: `${20 + (col * 25)}%`
      }
    }
  })
})

// Add method to toggle mobile view
const toggleMobileView = () => {
  showMobileMap.value = !showMobileMap.value
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Filter Bar -->
    <div class="sticky top-0 z-20 bg-background border-b border-border">
      <!-- Mobile Search and View Toggle -->
      <div class="lg:hidden">
        <div class="px-4 py-3 border-b border-border">
      <div class="flex gap-4 items-center">
        <div class="relative flex-1">
          <Input
            v-model="search"
            type="search"
            placeholder="Find dance venues..."
            class="w-full pl-9 h-11"
          />
          <Icon
            name="ph:magnifying-glass"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
        </div>
        <div class="flex gap-2">
          <!-- View Toggle Buttons -->
          <Button 
            variant="outline" 
            size="icon"
            class="h-11 w-11"
            :class="{ 'bg-accent': viewType === 'grid' }"
            @click="setViewType('grid')"
          >
            <Icon name="ph:squares-four" class="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            class="h-11 w-11"
            :class="{ 'bg-accent': viewType === 'list' }"
            @click="setViewType('list')"
          >
            <Icon name="ph:list" class="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            class="h-11 w-11"
            :class="{ 'bg-accent': viewType === 'map' }"
            @click="setViewType('map')"
          >
            <Icon name="ph:map" class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>

        <!-- Mobile Filter Toggle -->
        <div class="px-4 py-2 border-b border-border">
          <Button
            variant="outline"
            class="w-full justify-between"
            @click="showFilters = true"
          >
            <div class="flex items-center gap-2">
              <Icon name="ph:sliders" class="w-4 h-4" />
              <span>Filters</span>
              <Badge v-if="activeFiltersCount" variant="secondary" class="ml-1">
                {{ activeFiltersCount }}
              </Badge>
            </div>
            <Icon name="ph:caret-right" class="w-4 h-4" />
          </Button>
        </div>
      </div>

      <!-- Desktop Search and Filters -->
      <div class="hidden lg:block">
        <!-- Search and Results Count -->
        <div class="flex items-center justify-between py-4 border-b border-border px-4">
          <div class="relative flex-1 max-w-md">
            <Input
              v-model="search"
              type="search"
              placeholder="Find dance venues..."
              class="w-full pl-9"
            />
            <Icon
              name="ph:magnifying-glass"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
          </div>
          <div class="flex items-center gap-4">
          <p class="text-muted-foreground">
            {{ filteredVenues.length }} venues found
          </p>
            <Button
              v-if="activeFiltersCount"
              variant="ghost"
              size="sm"
              @click="clearAllFilters"
            >
              Clear all
            </Button>
          </div>
        </div>

        <!-- Filter Pills -->
        <div class="overflow-x-auto scrollbar-none py-2 px-4 whitespace-nowrap">
          <div class="flex items-center gap-2 min-w-max">
            <!-- Location Filter -->
            <Button
              variant="outline"
              class="rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
              :class="{ 'bg-accent': selectedLocation }"
              @click="showLocationFilter = true"
            >
              <Icon name="ph:map-pin" class="w-4 h-4" />
              {{ selectedLocation || 'Location' }}
              <Icon v-if="selectedLocation" name="ph:x" class="w-3.5 h-3.5 ml-1" @click.stop="clearLocationFilter" />
            </Button>

            <!-- Dance Styles Filter -->
            <Button
              variant="outline"
              class="rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
              :class="{ 'bg-accent': selectedStyles.length }"
              @click="showStylesSheet = true"
            >
              <Icon name="ph:music-notes" class="w-4 h-4" />
              Dance Styles
              <Badge v-if="selectedStyles.length" variant="secondary" class="ml-1">
                {{ selectedStyles.length }}
              </Badge>
            </Button>

            <!-- Price Range Filter -->
            <Button
              variant="outline"
              class="rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
              :class="{ 'bg-accent': selectedPriceRange[0] > 0 || selectedPriceRange[1] < 200 }"
              @click="showPriceSheet = true"
            >
              <Icon name="ph:currency-eur" class="w-4 h-4" />
              Price
              <Badge 
                v-if="selectedPriceRange[0] > 0 || selectedPriceRange[1] < 200" 
                variant="secondary" 
                class="ml-1"
              >
                €{{ selectedPriceRange[0] }}-{{ selectedPriceRange[1] }}
              </Badge>
            </Button>

            <!-- Capacity Filter -->
            <Button
              variant="outline"
              class="rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
              :class="{ 'bg-accent': selectedCapacityRange[0] > 0 || selectedCapacityRange[1] < 200 }"
              @click="showCapacitySheet = true"
            >
              <Icon name="ph:users" class="w-4 h-4" />
              Capacity
              <Badge 
                v-if="selectedCapacityRange[0] > 0 || selectedCapacityRange[1] < 200" 
                variant="secondary" 
                class="ml-1"
              >
                {{ selectedCapacityRange[0] }}-{{ selectedCapacityRange[1] }}
              </Badge>
            </Button>

            <!-- More Filters Button -->
            <Button
              variant="outline"
              class="rounded-full px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2"
              :class="{ 'bg-accent': selectedFeatures.length }"
              @click="showFilters = true"
            >
              <Icon name="ph:sliders" class="w-4 h-4" />
              More filters
              <Badge v-if="selectedFeatures.length" variant="secondary" class="ml-1">
                {{ selectedFeatures.length }}
              </Badge>
            </Button>
          </div>
        </div>

        <!-- View Toggle Bar -->
        <div class="flex items-center justify-between py-4 px-4 border-t border-border">
          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              :class="[
                viewType === 'grid'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
              @click="setViewType('grid')"
            >
              <Icon name="ph:squares-four" class="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant="outline"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              :class="[
                viewType === 'list'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
              @click="setViewType('list')"
            >
              <Icon name="ph:list" class="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant="outline"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              :class="[
                viewType === 'map'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
              @click="setViewType('map')"
            >
              <Icon name="ph:map" class="w-4 h-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <!-- Desktop Layout -->
      <div class="hidden lg:block">
        <!-- Split View Layout -->
        <div v-if="viewType === 'map'" class="grid grid-cols-2 gap-4 h-[calc(100vh-180px)]">
          <!-- Left Column: Venue List -->
          <div class="overflow-y-auto pr-2">
            <div class="space-y-4">
              <NuxtLink
                v-for="venue in filteredVenues"
                :key="venue.id"
                :to="`/venues/${venue.id}`"
                :data-venue-id="venue.id"
                class="group flex gap-4 bg-background rounded-xl overflow-hidden transition-all duration-300 p-4 shadow-sm hover:shadow-md"
                :class="{
                  'ring-2 ring-primary ring-offset-2': hoveredVenueId === venue.id
                }"
                @mouseenter="handleVenueHover(venue.id)"
                @mouseleave="handleVenueHover(null)"
              >
                <!-- Image Container -->
                <div class="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
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
                <div class="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 class="font-bold text-lg leading-tight line-clamp-1">{{ venue.name }}</h3>
                    <div class="flex items-center gap-1.5 text-muted-foreground mt-1">
                      <Icon name="ph:map-pin" class="w-3.5 h-3.5 flex-shrink-0" />
                      <p class="text-sm line-clamp-1">
                        {{ venue.address.split(',').pop()?.trim() || venue.address }}
                      </p>
                    </div>
                    <p v-if="venue.description" 
                       class="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {{ venue.description }}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-2 mt-4">
                    <Badge
                      v-for="style in venue.styles.slice(0, 2)"
                      :key="style"
                      variant="secondary"
                      class="text-xs"
                    >
                      {{ style }}
                    </Badge>
                    <Badge
                      v-for="feature in venue.features.slice(0, 1)"
                      :key="feature"
                      variant="outline"
                      class="text-xs"
                    >
                      {{ feature }}
                    </Badge>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Right Column: Map -->
          <div class="relative rounded-xl shadow-md overflow-hidden">
            <!-- Static Map -->
            <img
              src="https://tile.openstreetmap.org/7/63/42.png"
              alt="Map"
              class="w-full h-full object-cover"
            />
            <!-- Map Pins -->
            <div
              v-for="pin in mapPins"
              :key="pin.venue.id"
              class="absolute w-6 h-6 -ml-3 -mt-3 transition-all duration-300"
              :class="{
                'hover:z-10': true,
                'z-20 scale-125': hoveredVenueId === pin.venue.id
              }"
              :style="{ top: pin.position.top, left: pin.position.left }"
              @mouseenter="handlePinHover(pin.venue.id)"
              @mouseleave="handlePinHover(null)"
            >
              <div class="relative group">
                <div 
                  class="w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-medium cursor-pointer transform transition-all duration-300"
                  :class="{
                    'bg-primary': !hoveredVenueId || hoveredVenueId !== pin.venue.id,
                    'bg-primary-600 scale-110 ring-4 ring-primary/20': hoveredVenueId === pin.venue.id
                  }"
                >
                  <Icon name="ph:map-pin-fill" class="w-4 h-4" />
                </div>
                <!-- Venue Info on Hover -->
                <div
                  v-if="hoveredVenueId === pin.venue.id"
                  class="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-background rounded-lg shadow-lg p-2 z-30"
                >
                  <h4 class="font-semibold text-sm truncate">
                    {{ pin.venue.name }}
                  </h4>
                  <p class="text-xs text-muted-foreground line-clamp-1">
                    {{ pin.venue.address }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid/List View Layout -->
        <div v-else class="space-y-6">
          <!-- Grid View -->
          <div v-if="viewType === 'grid' && filteredVenues.length > 0" 
               class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <VenueCardGrid
              v-for="venue in filteredVenues"
              :key="venue.id"
              :venue="venue"
              class="w-full h-full"
            />
          </div>

          <!-- List View -->
          <div v-if="viewType === 'list' && filteredVenues.length > 0" 
               class="space-y-4">
            <NuxtLink
              v-for="venue in filteredVenues"
              :key="venue.id"
              :to="`/venues/${venue.id}`"
              class="group flex flex-col sm:flex-row gap-4 bg-background rounded-xl overflow-hidden transition-all duration-300 p-4 shadow-sm hover:shadow-md"
            >
              <!-- Image Container -->
              <div class="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
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
              <div class="flex flex-col justify-between flex-1 min-w-0 p-2 sm:p-0">
                <div>
                  <h3 class="font-bold text-xl leading-tight line-clamp-1">{{ venue.name }}</h3>
                  <div class="flex items-center gap-1.5 text-muted-foreground mt-1">
                    <Icon name="ph:map-pin" class="w-3.5 h-3.5 flex-shrink-0" />
                    <p class="text-sm line-clamp-1">
                  {{ venue.address.split(',').pop()?.trim() || venue.address }}
                </p>
                  </div>
                  <p v-if="venue.description" 
                     class="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {{ venue.description }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  <Badge
                    v-for="style in venue.styles.slice(0, 3)"
                    :key="style"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ style }}
                  </Badge>
                  <Badge
                    v-for="feature in venue.features.slice(0, 2)"
                    :key="feature"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ feature }}
                  </Badge>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredVenues.length === 0" class="text-center py-12">
            <Icon
              name="ph:magnifying-glass"
              class="w-12 h-12 mx-auto text-muted-foreground mb-4"
            />
            <h3 class="text-lg font-medium text-foreground mb-2">No venues found</h3>
            <p class="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
          </div>
        </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden">
        <!-- Mobile Toggle Bar -->
        <div class="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
          <div class="container mx-auto px-4 py-3 flex items-center justify-between">
            <h2 class="text-lg font-semibold">
              {{ showMobileMap ? 'Venue Map' : 'Venue List' }}
            </h2>
            <Button
              variant="outline"
              size="sm"
              class="gap-2"
              @click="toggleMobileView"
            >
              <Icon :name="showMobileMap ? 'ph:list' : 'ph:map'" class="w-4 h-4" />
              {{ showMobileMap ? 'Show List' : 'Show Map' }}
            </Button>
          </div>
        </div>

        <!-- Mobile Map View -->
        <div 
          v-if="showMobileMap" 
          class="fixed inset-0 z-10 bg-background transition-all duration-300"
          :class="{ 'translate-y-0 opacity-100': showMobileMap, 'translate-y-full opacity-0': !showMobileMap }"
        >
          <div class="w-full h-full pt-[60px]">
          <div class="relative w-full h-full">
            <!-- Static Map -->
            <img
              src="https://tile.openstreetmap.org/7/63/42.png"
              alt="Map"
              class="w-full h-full object-cover"
            />
            <!-- Map Pins -->
            <div
                v-for="pin in mapPins"
                :key="pin.venue.id"
              class="absolute w-6 h-6 -ml-3 -mt-3 transition-all duration-300"
              :class="{
                'hover:z-10': true,
                  'z-20 scale-125': hoveredVenueId === pin.venue.id
              }"
                :style="{ top: pin.position.top, left: pin.position.left }"
                @mouseenter="handlePinHover(pin.venue.id)"
              @mouseleave="handlePinHover(null)"
            >
              <div class="relative group">
                <div 
                  class="w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-medium cursor-pointer transform transition-all duration-300"
                  :class="{
                      'bg-primary': !hoveredVenueId || hoveredVenueId !== pin.venue.id,
                      'bg-primary-600 scale-110 ring-4 ring-primary/20': hoveredVenueId === pin.venue.id
                  }"
                >
                    <Icon name="ph:map-pin-fill" class="w-4 h-4" />
                </div>
                  <!-- Venue Info on Hover -->
                  <div
                    v-if="hoveredVenueId === pin.venue.id"
                    class="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-background rounded-lg shadow-lg p-2 z-30"
                  >
                    <h4 class="font-semibold text-sm truncate">
                      {{ pin.venue.name }}
                    </h4>
                    <p class="text-xs text-muted-foreground line-clamp-1">
                      {{ pin.venue.address }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile List View -->
        <div 
          v-else
          class="transition-all duration-300"
          :class="{ 'translate-y-0 opacity-100': !showMobileMap, 'translate-y-full opacity-0': showMobileMap }"
        >
          <!-- Grid View -->
          <div v-if="viewType === 'grid' && filteredVenues.length > 0" 
               class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <VenueCardGrid
              v-for="venue in filteredVenues"
              :key="venue.id"
              :venue="venue"
              class="w-full h-full"
            />
          </div>

          <!-- List View -->
          <div v-if="viewType === 'list' && filteredVenues.length > 0" 
               class="space-y-4">
            <NuxtLink
              v-for="venue in filteredVenues"
              :key="venue.id"
              :to="`/venues/${venue.id}`"
              class="group flex flex-col sm:flex-row gap-4 bg-background rounded-xl overflow-hidden transition-all duration-300 p-4 shadow-sm hover:shadow-md"
            >
              <!-- Image Container -->
              <div class="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
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
              <div class="flex flex-col justify-between flex-1 min-w-0 p-2 sm:p-0">
                <div>
                  <h3 class="font-bold text-xl leading-tight line-clamp-1">{{ venue.name }}</h3>
                  <div class="flex items-center gap-1.5 text-muted-foreground mt-1">
                    <Icon name="ph:map-pin" class="w-3.5 h-3.5 flex-shrink-0" />
                    <p class="text-sm line-clamp-1">
                      {{ venue.address.split(',').pop()?.trim() || venue.address }}
                    </p>
                  </div>
                  <p v-if="venue.description" 
                     class="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {{ venue.description }}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  <Badge
                    v-for="style in venue.styles.slice(0, 3)"
                    :key="style"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ style }}
                  </Badge>
                  <Badge
                    v-for="feature in venue.features.slice(0, 2)"
                    :key="feature"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ feature }}
                  </Badge>
              </div>
            </div>
            </NuxtLink>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredVenues.length === 0" class="text-center py-12">
            <Icon
              name="ph:magnifying-glass"
              class="w-12 h-12 mx-auto text-muted-foreground mb-4"
            />
            <h3 class="text-lg font-medium text-foreground mb-2">No venues found</h3>
            <p class="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Sheets -->
    <!-- Styles Sheet -->
    <Sheet :open="showStylesSheet" @update:open="showStylesSheet = false">
      <SheetContent side="bottom" class="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Dance Styles</SheetTitle>
        </SheetHeader>
        <div class="mt-4">
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="style in allStyles"
              :key="style"
              variant="outline"
              size="sm"
              :class="[
                selectedStyles.includes(style)
                  ? 'bg-primary text-primary-foreground'
                  : '',
              ]"
              @click="
                selectedStyles.includes(style)
                  ? (selectedStyles = selectedStyles.filter((s) => s !== style))
                  : selectedStyles.push(style)
              "
            >
              {{ style }}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Price Sheet -->
    <Sheet :open="showPriceSheet" @update:open="showPriceSheet = false">
      <SheetContent side="bottom" class="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Price Range</SheetTitle>
        </SheetHeader>
        <div class="mt-4">
          <div class="flex items-center gap-4">
            <Input
              v-model="selectedPriceRange[0]"
              type="number"
              placeholder="Min"
              class="w-24"
            />
            <span>to</span>
            <Input
              v-model="selectedPriceRange[1]"
              type="number"
              placeholder="Max"
              class="w-24"
            />
            <span>€</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Capacity Sheet -->
    <Sheet :open="showCapacitySheet" @update:open="showCapacitySheet = false">
      <SheetContent side="bottom" class="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Capacity Range</SheetTitle>
        </SheetHeader>
        <div class="mt-4">
          <div class="flex items-center gap-4">
            <Input
              v-model="selectedCapacityRange[0]"
              type="number"
              placeholder="Min"
              class="w-24"
            />
            <span>to</span>
            <Input
              v-model="selectedCapacityRange[1]"
              type="number"
              placeholder="Max"
              class="w-24"
            />
            <span>people</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Mobile Filter Sheet -->
    <Sheet :open="showFilters" @update:open="showFilters = false">
      <SheetContent side="right" class="w-full sm:max-w-md">
        <SheetHeader class="mb-6">
          <SheetTitle>Filters</SheetTitle>
          <Button v-if="activeFiltersCount" variant="ghost" size="sm" @click="clearAllFilters">
            Clear all
          </Button>
        </SheetHeader>
        <div class="space-y-6">
          <!-- Mobile Filter Content - Same as desktop but in a sheet -->
          <!-- Location Filter -->
          <div>
            <h3 class="font-medium mb-3">Location</h3>
            <Button
              variant="outline"
              class="w-full justify-between"
              @click="showLocationFilter = true"
            >
              <span>{{ selectedLocation || 'Choose location' }}</span>
              <Icon name="ph:map-pin" class="w-4 h-4" />
            </Button>
          </div>

          <!-- Dance Styles -->
          <div>
            <h3 class="font-medium mb-3">Dance Styles</h3>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="style in allStyles"
                :key="style"
                variant="outline"
                size="sm"
                :class="[
                  selectedStyles.includes(style)
                    ? 'bg-primary text-primary-foreground'
                    : '',
                ]"
                @click="
                  selectedStyles.includes(style)
                    ? (selectedStyles = selectedStyles.filter((s) => s !== style))
                    : selectedStyles.push(style)
                "
              >
                {{ style }}
              </Button>
            </div>
          </div>

          <!-- Features -->
          <div>
            <h3 class="font-medium mb-3">Features</h3>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="feature in allFeatures"
                :key="feature"
                variant="outline"
                size="sm"
                :class="[
                  selectedFeatures.includes(feature)
                    ? 'bg-primary text-primary-foreground'
                    : '',
                ]"
                @click="
                  selectedFeatures.includes(feature)
                    ? (selectedFeatures = selectedFeatures.filter(
                        (f) => f !== feature
                      ))
                    : selectedFeatures.push(feature)
                "
              >
                {{ feature }}
              </Button>
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <h3 class="font-medium mb-3">Price per Hour</h3>
            <div class="flex items-center gap-4">
              <Input
                v-model="selectedPriceRange[0]"
                type="number"
                placeholder="Min"
                class="w-24"
              />
              <span>to</span>
              <Input
                v-model="selectedPriceRange[1]"
                type="number"
                placeholder="Max"
                class="w-24"
              />
              <span>€</span>
            </div>
          </div>

          <!-- Capacity -->
          <div>
            <h3 class="font-medium mb-3">Capacity</h3>
            <div class="flex items-center gap-4">
              <Input
                v-model="selectedCapacityRange[0]"
                type="number"
                placeholder="Min"
                class="w-24"
              />
              <span>to</span>
              <Input
                v-model="selectedCapacityRange[1]"
                type="number"
                placeholder="Max"
                class="w-24"
              />
              <span>people</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Location Sheet -->
    <Sheet :open="showLocationFilter" @update:open="showLocationFilter = false">
      <SheetContent side="bottom" class="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter by Location</SheetTitle>
        </SheetHeader>
        <div class="mt-4">
          <LocationPanel
            :location="selectedLocation"
            @update:location="updateLocation"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<style scoped>
.grid {
  scroll-margin-top: 2rem;
}

@screen lg {
  .grid {
    scroll-margin-top: 6rem;
  }
}

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
.group img,
.group button {
  will-change: transform;
  -webkit-font-smoothing: antialiased;
}

/* Favorite button hover effect */
.group button:hover {
  transform: scale(1.1);
}

/* Price emphasis */
.font-medium {
  letter-spacing: -0.025em;
}

/* Map pin hover effects */
.group:hover .w-6 {
  transform: scale(1.1);
}

/* Map hover card animation */
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

/* Prevent map pins from being cut off */
.absolute {
  contain: layout paint;
}

/* Enhanced hover effects */
.group {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 
              0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.group:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 
              0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Smooth pin transitions */
.absolute {
  contain: layout paint;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Enhanced hover card animation */
.group-hover\:block {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

/* Hover glow effect */
.ring-primary {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Performance optimizations */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (hover: none) {
  .group:hover {
    transform: none;
  }
  
  .group-hover\:block {
    animation: none;
  }
}

/* Hide scrollbar but keep functionality */
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Smooth scroll behavior */
.overflow-x-auto {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Active filter styles */
.bg-primary\/10 {
  backdrop-filter: saturate(1.2);
}

/* Enhanced mobile touch interactions */
@media (hover: none) {
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  
  .group:active {
    transform: scale(0.98);
  }
}

/* Smooth scroll behavior with momentum */
.overflow-x-auto {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

/* Snap points for filter pills */
.snap-start {
  scroll-snap-align: start;
}

/* Enhanced transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Mobile map view transitions */
.fixed {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Touch-friendly tap targets */
@media (max-width: 640px) {
  button, 
  .button,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Prevent text selection during touch interactions */
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* View toggle button styles */
.bg-accent {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

/* List view specific styles */
.list-view .venue-card {
  display: flex;
  gap: 1rem;
}

.list-view .venue-card img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.75rem;
}

.list-view .venue-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Enhanced hover transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Smooth scroll behavior */
.overflow-y-auto {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Enhanced hover effects */
.group {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Map pin hover effects */
.absolute {
  contain: layout paint;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

/* Hover card animation */
.group-hover\:block {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

/* Active filter styles */
.bg-primary\/10 {
  backdrop-filter: saturate(1.2);
}

/* Enhanced mobile touch interactions */
@media (hover: none) {
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  
  .group:active {
    transform: scale(0.98);
  }
}

/* Prevent text selection during touch interactions */
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Mobile view transitions */
.fixed {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Mobile toggle bar styles */
.sticky {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: hsl(var(--background));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Mobile view animations */
.translate-y-full {
  transform: translateY(100%);
}

.translate-y-0 {
  transform: translateY(0);
}

/* Enhanced mobile transitions */
@media (max-width: 1024px) {
  .transition-all {
    transition-property: transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
}

/* Mobile map view styles */
@media (max-width: 1024px) {
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}

/* Prevent body scroll when map is open */
@media (max-width: 1024px) {
  body.map-open {
    overflow: hidden;
  }
}
</style>
