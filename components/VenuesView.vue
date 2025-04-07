<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const venues = ref<any[]>([])
const showFilters = ref(false)
const showLocationFilter = ref(false)
const search = ref('')
const selectedLocation = ref<string | null>(null)
const selectedStyles = ref<string[]>([])
// const selectedFeatures = ref<string[]>([])
// const selectedPriceRange = ref<[number, number]>([0, 200])
// const selectedCapacityRange = ref<[number, number]>([0, 200])

// Pagination state
const page = ref(1)
const limit = ref(9)
const totalCount = ref(0)
const hasMore = ref(false)
const isLoading = ref(false)
const loadingMore = ref(false)
const loadingTimes = ref<number[]>([])

const allDanceStyles = ref<string[]>([])
const loadingStyles = ref(false)

// Cache configuration
const CACHE_KEY = 'wedance_venue_dance_styles'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Load styles from cache if available
const loadStylesFromCache = () => {
  if (process.client) {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { styles, timestamp } = JSON.parse(cached)
        const now = Date.now()

        // Check if cache is still valid
        if (now - timestamp < CACHE_EXPIRY) {
          allDanceStyles.value = styles
          return true
        }
      }
    } catch (error) {
      console.error('Error loading styles from cache:', error)
    }
  }
  return false
}

// Save styles to cache
const saveStylesToCache = (styles: string[]) => {
  if (process.client) {
    try {
      const cacheData = {
        styles,
        timestamp: Date.now(),
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error saving styles to cache:', error)
    }
  }
}

const allStyles = computed(() =>
  Array.from(new Set(venues.value.flatMap((venue) => venue.danceStyles || [])))
)

// const allFeatures = computed(() =>
//   Array.from(new Set(venues.value.flatMap((venue) => venue.features || [])))
// )

const updateLocation = (location: string | null) => {
  selectedLocation.value = location
  showLocationFilter.value = false
  resetSearch()
}

const clearLocationFilter = () => {
  selectedLocation.value = null
  showLocationFilter.value = false
  resetSearch()
}

const resetSearch = () => {
  page.value = 1
  venues.value = []
  fetchVenues()
}

async function fetchVenues() {
  isLoading.value = true
  try {
    // Pass all filters to the server
    const result = await trpc.profiles.venues.query({
      limit: limit.value,
      page: page.value,
      search: search.value,
      location: selectedLocation.value || undefined,
      styles:
        selectedStyles.value.length > 0 ? selectedStyles.value : undefined,
    })

    if (page.value === 1) {
      venues.value = result.venues
    } else {
      venues.value = [...venues.value, ...result.venues]
    }

    totalCount.value = result.totalCount
    hasMore.value = result.hasMore
  } catch (error) {
    console.error('Error fetching venues:', error)
  } finally {
    isLoading.value = false
  }
}

async function loadMore() {
  if (!hasMore.value || isLoading.value) return
  loadingMore.value = true
  page.value++
  try {
    await fetchVenues()
  } finally {
    loadingMore.value = false
  }
}

async function fetchStyles() {
  if (allDanceStyles.value.length > 0) return

  if (loadStylesFromCache()) return

  loadingStyles.value = true
  try {
    const styles = await trpc.profiles.allVenuesStyles.query()
    allDanceStyles.value = styles

    saveStylesToCache(styles)
  } catch (error) {
    console.error('Error fetching dance styles:', error)
  } finally {
    loadingStyles.value = false
  }
}

const toggleFilters = async () => {
  showFilters.value = !showFilters.value

  if (showFilters.value) {
    await fetchStyles()
  }
}

const debouncedReset = useDebounceFn(() => {
  resetSearch()
}, 300)

watch([search, selectedStyles], () => {
  debouncedReset()
})

onMounted(async () => {
  await fetchVenues()

  loadStylesFromCache()
})

const getDescription = (venue: any) => {
  return venue.bio || venue.description || ''
}

const getAddress = (venue: any) => {
  return venue.formattedAddress || (venue.city ? venue.city.name : '') || ''
}
</script>

<template>
  <!-- Search and Filters Row -->
  <div class="flex flex-col sm:flex-row gap-4 mb-4">
    <div class="relative flex-1">
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
    <div class="flex gap-2">
      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          @click="showLocationFilter = true"
          class="flex items-center gap-2"
          :class="{ 'text-primary': selectedLocation }"
        >
          <Icon name="ph:map-pin" class="w-5 h-5" />
          <span>{{ selectedLocation || 'Location' }}</span>
        </Button>
        <Button
          v-if="selectedLocation"
          variant="ghost"
          size="icon"
          @click="clearLocationFilter"
        >
          <Icon name="ph:x" class="w-4 h-4" />
        </Button>
      </div>
      <Button variant="outline" class="gap-2" @click="toggleFilters">
        <Icon name="ph:funnel" class="w-4 h-4" />
        Filters
      </Button>
    </div>
  </div>

  <!-- Filters Section -->
  <div
    v-if="showFilters"
    class="bg-card border border-border rounded-lg p-6 space-y-6 mb-6"
  >
    <!-- Dance Styles -->
    <div>
      <h3 class="font-medium mb-3">Dance Styles</h3>
      <div v-if="loadingStyles" class="flex justify-center py-4">
        <div
          class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
        ></div>
      </div>
      <div v-else class="flex flex-wrap gap-2">
        <Button
          v-for="style in allDanceStyles.length > 0
            ? allDanceStyles
            : allStyles"
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
    <!-- <div>
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
    </div> -->

    <!-- Price Range -->
    <!-- <div>
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
    </div> -->

    <!-- Capacity -->
    <!-- <div>
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
    </div> -->
  </div>

  <!-- Loading State -->
  <div
    v-if="isLoading && venues.length === 0"
    class="py-10 flex justify-center"
  >
    <div
      class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
    ></div>
  </div>

  <!-- Venues Grid -->
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <NuxtLink
      v-for="venue in venues"
      :key="venue.id"
      :to="`/venues/${venue.id}`"
      class="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div class="aspect-video relative overflow-hidden">
        <NuxtImg
          :src="
            venue.photo ||
            'https://placehold.co/400x225/e2e8f0/334155?text=Venue'
          "
          :alt="venue.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width="400"
          height="225"
          loading="lazy"
          format="webp"
          quality="80"
        />
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg text-foreground">
            {{ venue.name }}
          </h3>
          <div
            v-if="venue.rating"
            class="flex items-center gap-1 text-amber-500"
          >
            <Icon name="ph:star-fill" class="w-4 h-4" />
            <span class="text-sm">{{ venue.rating }}</span>
          </div>
        </div>
        <p class="text-muted-foreground text-sm mb-2">
          {{ getAddress(venue) }}
        </p>
        <!-- <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div class="flex items-center gap-1">
            <Icon name="ph:currency-eur" class="w-4 h-4" />
            {{ Math.min(...venue.areas.map((a: any) => a.pricePerHour)) }}-{{
              Math.max(...venue.areas.map((a: any) => a.pricePerHour))
            }}/hour
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:users" class="w-4 h-4" />
            {{ venue.areas.reduce((sum: number, area: any) => sum + area.capacity, 0) }}
            people
          </div>
        </div> -->
        <p
          v-if="getDescription(venue)"
          class="text-foreground mb-4 line-clamp-2"
        >
          {{ getDescription(venue) }}
        </p>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="style in venue.danceStyles?.slice(0, 3) || []"
            :key="style"
            variant="secondary"
          >
            {{ style }}
          </Badge>
        </div>
      </div>
    </NuxtLink>
  </div>

  <!-- Load More Button -->
  <div v-if="hasMore && !isLoading" class="text-center py-8">
    <Button @click="loadMore" :disabled="loadingMore">
      <Icon
        v-if="loadingMore"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="loadingMore">Loading more...</span>
      <span v-else>Load More Venues</span>
    </Button>
  </div>

  <!-- Loading More Indicator -->
  <div
    v-if="isLoading && venues.length > 0 && !loadingMore"
    class="mt-8 flex justify-center"
  >
    <div
      class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
    ></div>
  </div>

  <!-- No Results -->
  <div v-if="venues.length === 0 && !isLoading" class="text-center py-12">
    <Icon
      name="ph:magnifying-glass"
      class="w-12 h-12 mx-auto text-muted-foreground mb-4"
    />
    <h3 class="text-lg font-medium text-foreground mb-2">No venues found</h3>
    <p class="text-muted-foreground">
      Try adjusting your filters or search terms
    </p>
  </div>

  <!-- Location Sheet -->
  <Sheet :open="showLocationFilter" @update:open="showLocationFilter = false">
    <SheetContent side="bottom" class="h-[80vh]">
      <SheetHeader>
        <SheetTitle>Filter by Location</SheetTitle>
      </SheetHeader>
      <div class="mt-4">
        <LocationPanel
          :location="selectedLocation"
          @update:location="updateLocation($event)"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
