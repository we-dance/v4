<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { AnyEvent } from '~/schemas/event'
import EventCard from '~/components/event/EventCard.vue'
import { trpc } from '~/composables/trpc'
import { format, parseISO } from 'date-fns'

// Reactive state for API data
const result = ref<any>(null) // Replace 'any' with your event response type if available
const loading = ref(true) // Initially true to show loading state
const loadingMore = ref(false)
const error = ref<string | null>(null)

// Query parameters
const status = ref('upcoming')
const type = ref('')
const limit = ref(10)

// Date formatting utility
function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A'
  try {
    return format(parseISO(dateString), 'PP')
  } catch (e) {
    return 'Invalid date'
  }
}

// Fetch initial events
async function fetchEvents() {
  loading.value = true
  error.value = null
  try {
    const params: any = { limit: limit.value }
    if (status.value) params.status = status.value
    if (type.value) params.type = type.value
    console.log('Fetching events with params:', params)
    result.value = await trpc.events.getAll.query(params)
    console.log('API result:', result.value)
    // Validate response structure
    if (!result.value || !Array.isArray(result.value.items)) {
      throw new Error('Invalid response format')
    }
  } catch (e) {
    console.error('API error:', e)
    error.value = (e as Error)?.message || 'Unknown error'
    result.value = null
  } finally {
    loading.value = false
  }
}

// Load more events for pagination
async function loadMore() {
  if (!result.value?.nextCursor) return
  loadingMore.value = true
  try {
    const params: any = {
      limit: limit.value,
      cursor: result.value.nextCursor,
    }
    if (status.value) params.status = status.value
    if (type.value) params.type = type.value
    const nextPage = await trpc.events.getAll.query(params)
    if (nextPage?.items) {
      result.value = {
        items: [...result.value.items, ...nextPage.items],
        nextCursor: nextPage.nextCursor,
      }
    }
  } catch (e) {
    error.value = `Error loading more results: ${(e as Error)?.message || 'Unknown error'}`
  } finally {
    loadingMore.value = false
  }
}

// Fetch events when component mounts
onMounted(() => {
  fetchEvents()
})

// Safely access events from result
const safeEvents = computed(() => result.value?.items || [])

// Filter states
const searchQuery = ref('')
const selectedType = ref('all')
const selectedStatus = ref('upcoming')
const selectedLocation = ref('all')
const selectedMonth = ref('all') // Placeholder if you add month filtering
const selectedPriceRange = ref('all')
const sortBy = ref('date')

// Filter options
const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'party', label: 'Social Party' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'concert', label: 'Concert' },
  { value: 'festival', label: 'Festival' },
]

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Happening Now' },
  { value: 'past', label: 'Past Events' },
]

const priceRangeOptions = [
  { value: 'all', label: 'Any Price' },
  { value: 'free', label: 'Free' },
  { value: '0-20', label: 'Under 20€' },
  { value: '20-50', label: '20-50€' },
  { value: '50+', label: '50€+' },
]

const locationOptions = computed(() => {
  // If safeEvents is not available or empty, return just the "All Locations" option
  return [
    { value: 'all', label: 'All Locations' },
    // Add more locations dynamically if needed
  ]
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    selectedType.value !== 'all' ||
    selectedStatus.value !== 'upcoming' ||
    selectedLocation.value !== 'all' ||
    selectedMonth.value !== 'all' ||
    selectedPriceRange.value !== 'all' ||
    searchQuery.value !== '' ||
    sortBy.value !== 'date'
  )
})

// Clear all filters
function clearFilters() {
  selectedType.value = 'all'
  selectedStatus.value = 'upcoming'
  // selectedLocation.value = 'all'
  selectedMonth.value = 'all'
  selectedPriceRange.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'date'
}

// Filter events based on user input
const filteredEvents = computed(() => {
  let filtered = safeEvents.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (event: AnyEvent) =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        // event.location.city.toLowerCase().includes(query) ||
        event.organizer.name.toLowerCase().includes(query)
    )
  }

  // Type filter
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(
      (event: AnyEvent) => event.type === selectedType.value
    )
  }

  // Status filter
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(
      (event: AnyEvent) => event.status === selectedStatus.value
    )
  }

  // Location filter
  // if (selectedLocation.value !== 'all') {
  //   filtered = filtered.filter(
  //     (event: AnyEvent) => event.location.city === selectedLocation.value
  //   )
  // }

  // Price range filter
  if (selectedPriceRange.value !== 'all') {
    filtered = filtered.filter((event: AnyEvent) => {
      const price = getMinPrice(event)
      const priceInEUR = convertToEUR(price)

      switch (selectedPriceRange.value) {
        case 'free':
          return priceInEUR === 0
        case '0-20':
          return priceInEUR > 0 && priceInEUR <= 20
        case '20-50':
          return priceInEUR > 20 && priceInEUR <= 50
        case '50+':
          return priceInEUR > 50
        default:
          return true
      }
    })
  }

  return filtered
})

// Sort filtered events
const sortedEvents = computed(() => {
  const events = [...filteredEvents.value]

  switch (sortBy.value) {
    case 'date':
      return events.sort(
        (a: AnyEvent, b: AnyEvent) =>
          +new Date(a.date.start) - +new Date(b.date.start)
      )
    case 'price-low':
      return events.sort(
        (a: AnyEvent, b: AnyEvent) =>
          convertToEUR(getMinPrice(a)) - convertToEUR(getMinPrice(b))
      )
    case 'price-high':
      return events.sort(
        (a: AnyEvent, b: AnyEvent) =>
          convertToEUR(getMinPrice(b)) - convertToEUR(getMinPrice(a))
      )
    default:
      return events
  }
})

// Helper functions
const getMinPrice = (event: AnyEvent): { amount: number; currency: string } => {
  if (event.prices?.length) {
    const minPrice = event.prices.reduce(
      (min, p) => (p.amount < min.amount ? p : min),
      event.prices[0]
    )
    return { amount: minPrice.amount, currency: minPrice.currency }
  }
  return { amount: 0, currency: 'EUR' }
}

const currencyRates = {
  EUR: 1,
  GBP: 1.17,
  USD: 0.92,
}

const convertToEUR = (price: { amount: number; currency: string }): number => {
  return (
    price.amount *
    (currencyRates[price.currency as keyof typeof currencyRates] || 1)
  )
}

// Event handlers
const handleShare = (event: AnyEvent) => {
  console.log('Share event:', event.name)
}

const handleBookmark = (event: AnyEvent) => {
  console.log('Bookmark event:', event.name)
}

const handleBook = (event: AnyEvent) => {
  console.log('Book event:', event.name)
}
</script>

<template>
  <!-- Filters Section -->
  <div class="bg-muted">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- Role Filter with Search -->
      <div class="flex items-center gap-4 overflow-x-auto">
        <div class="flex gap-2 flex-1">
          <Button
            v-for="type in typeOptions"
            :key="type.value"
            :variant="selectedType === type.value ? 'secondary' : 'outline'"
            @click="selectedType = type.value"
            class="whitespace-nowrap"
          >
            {{ type.label }}
          </Button>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <Input
            v-model="searchQuery"
            placeholder="Search events..."
            type="search"
            class="w-[180px]"
          />
        </div>

        <Select v-model="sortBy" class="w-[140px] shrink-0">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          @click="clearFilters"
          v-if="hasActiveFilters"
          class="shrink-0"
        >
          Clear all
        </Button>
      </div>

      <!-- Common Filters Row -->
      <div class="flex flex-wrap items-center gap-3">
        <Select v-model="selectedLocation">
          <SelectTrigger class="w-[160px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in locationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedStatus">
          <SelectTrigger class="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedPriceRange">
          <SelectTrigger class="w-[160px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in priceRangeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>

  <!-- Events Section -->
  <div v-if="loading" class="text-center py-12">
    <p>Loading events...</p>
  </div>
  <div v-else-if="error" class="text-red-500 text-center py-4">
    {{ error }}
  </div>
  <div v-else>
    <div
      v-if="result.items.length"
      class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <EventCard
        v-for="event in result.items"
        :key="event.id"
        :event="event"
        @share="handleShare"
        @bookmark="handleBookmark"
        @book="handleBook"
      />
    </div>
    <div v-else class="text-center py-12">
      <Icon
        name="ph:calendar-x"
        class="mx-auto h-12 w-12 text-muted-foreground"
      />
      <h3 class="mt-2 text-sm font-semibold text-foreground">
        No events found
      </h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Try adjusting your search terms or clear the search.
      </p>
    </div>
  </div>

  <div v-if="result?.nextCursor && !loadingMore" class="text-center py-4">
    <Button @click="loadMore">Load More</Button>
  </div>
  <div v-if="loadingMore" class="text-center py-4">
    <p>Loading more events...</p>
  </div>
</template>
