<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
const { $client } = useNuxtApp()

const venues = ref<any[]>([])
const showFilters = ref(false)
const showLocationFilter = ref(false)
const search = ref('')
const selectedLocation = ref<string | null>(null)
const selectedStyles = ref<string[]>([])
const styleSearch = ref('')
const showStyleDropdown = ref(false)

const page = ref(1)
const limit = ref(9)
const totalCount = ref(0)
const hasMore = ref(false)
const isLoading = ref(false)
const loadingMore = ref(false)
const loadingTimes = ref<number[]>([])

const allDanceStyles = ref<string[]>([])
const loadingStyles = ref(false)

// For SearchableDropdown component
const selectedDanceStyle = ref<string | null>(null)
const danceStyleSearchQuery = ref('')

// Format dance styles for SearchableDropdown
const formattedDropdownStyles = computed(() => {
  if (!allDanceStyles.value.length) return []

  return allDanceStyles.value.map((style) => ({
    id: style,
    name: style,
  }))
})

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
    const result = await $client.profiles.venues.query({
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

  loadingStyles.value = true
  try {
    const styles = await $client.profiles.allVenuesStyles.query()
    allDanceStyles.value = styles
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

watch([search], () => {
  debouncedReset()
})

const toggleStyle = (style: string) => {
  if (selectedStyles.value.includes(style)) {
    selectedStyles.value = selectedStyles.value.filter((s) => s !== style)
  } else {
    selectedStyles.value.push(style)
  }
  resetSearch()
}

const onSelectStyle = (style: any) => {
  // Add the style to multi-select
  if (!selectedStyles.value.includes(style.id)) {
    selectedStyles.value.push(style.id)
  } else {
    // Remove it if already selected (toggle behavior)
    selectedStyles.value = selectedStyles.value.filter((s) => s !== style.id)
  }
  resetSearch()
  // Keep dropdown open for more selections
  showStyleDropdown.value = true
}

const clearAllStyles = () => {
  selectedStyles.value = []
  resetSearch()
}

onMounted(async () => {
  await fetchVenues()
})

const getDescription = (venue: any) => {
  return venue.bio || venue.description || ''
}

const getAddress = (venue: any) => {
  return venue.formattedAddress || (venue.city ? venue.city.name : '') || ''
}

const currentStylesWithCount = computed(() => {
  const styleCount = new Map<string, number>()

  venues.value.forEach((venue) => {
    if (venue.danceStyles && venue.danceStyles.length) {
      venue.danceStyles.forEach((style: string) => {
        styleCount.set(style, (styleCount.get(style) || 0) + 1)
      })
    }
  })

  return Array.from(styleCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([style, count]) => ({ style, count }))
})

const formattedDanceStyles = computed(() => {
  if (allDanceStyles.value.length > 0) {
    const countMap = new Map(
      currentStylesWithCount.value.map((item) => [item.style, item.count])
    )

    return allDanceStyles.value.map((style) => ({
      style,
      count: countMap.get(style) || 0,
    }))
  }

  return currentStylesWithCount.value
})

const filteredDanceStyles = computed(() => {
  if (!styleSearch.value) {
    return formattedDanceStyles.value
  }

  const query = styleSearch.value.toLowerCase()
  return formattedDanceStyles.value.filter((item) =>
    item.style.toLowerCase().includes(query)
  )
})

const removeStyle = (style: string) => {
  selectedStyles.value = selectedStyles.value.filter((s) => s !== style)
  resetSearch()
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
    </div>
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
      :to="`/@${venue.username}`"
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
        <!-- TODO: Add price per hour and capacity -->
        <p v-if="venue.bio" class="text-foreground mb-4 line-clamp-2">
          {{ venue.bio }}
        </p>
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
      <span v-if="selectedStyles.length > 0">
        No venues found with events offering
        <strong>{{ selectedStyles.join(', ') }}</strong> dance styles.
      </span>
      <span v-else> Try adjusting your filters or search terms </span>
    </p>
  </div>

  <!-- Location Sheet -->
  <Sheet :open="showLocationFilter" @update:open="showLocationFilter = false">
    <SheetContent side="bottom" class="h-[80vh] flex flex-col">
      <SheetHeader>
        <SheetTitle>Filter by Location</SheetTitle>
      </SheetHeader>
      <div class="mt-4 overflow-y-auto flex-1 pb-6">
        <LocationPanel
          :location="selectedLocation"
          @update:location="updateLocation($event)"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
