<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'
import OrganizerCard from '~/components/OrganizerCard.vue'
import { trpc } from '~/composables/trpc'

// Mock data for styles and event types
const danceStyles = [
  { value: 'salsa', label: 'Salsa' },
  { value: 'bachata', label: 'Bachata' },
  { value: 'kizomba', label: 'Kizomba' },
  { value: 'zouk', label: 'Brazilian Zouk' },
]

const eventTypes = [
  { value: 'party', label: 'Party' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'festival', label: 'Festival' },
  { value: 'class', label: 'Class' },
]

const search = ref('')
const showFilters = ref(false)
const isGridView = ref(true)
const showLocationFilter = ref(false)
const organizers = ref<any[]>([])
const isLoading = ref(false)
const loadingMore = ref(false)

const page = ref(1)
const limit = ref(9)
const totalCount = ref(0)
const hasMore = ref(false)

interface Filters {
  styles: string[]
  location: string
  eventTypes: string[]
}

const filters = ref<Filters>({
  styles: ['any'],
  location: '',
  eventTypes: ['any'],
})

watch(
  () => filters.value.styles,
  (newStyles) => {
    if (!Array.isArray(newStyles)) {
      filters.value.styles = ['any']
    }
  },
  { deep: true }
)

watch(
  () => filters.value.eventTypes,
  (newTypes) => {
    if (!Array.isArray(newTypes)) {
      filters.value.eventTypes = ['any']
    }
  },
  { deep: true }
)

// Helper function to get style label
function getStyleLabel(value: string) {
  return danceStyles.find((style) => style.value === value)?.label || value
}

function toggleView() {
  isGridView.value = !isGridView.value
}

function getStylesLabel(selectedStyles: string[]) {
  if (selectedStyles.includes('any')) return 'Any Style'
  if (selectedStyles.length === 1) {
    return getStyleLabel(selectedStyles[0])
  }
  return `${selectedStyles.length} styles selected`
}

function getEventTypesLabel(selectedTypes: string[]) {
  if (selectedTypes.includes('any')) return 'Any Event Type'
  if (selectedTypes.length === 1) {
    return (
      eventTypes.find((type) => type.value === selectedTypes[0])?.label ||
      selectedTypes[0]
    )
  }
  return `${selectedTypes.length} types selected`
}

async function fetchOrganizers(isLoadMore = false) {
  if (isLoading.value || loadingMore.value) return

  if (isLoadMore) {
    loadingMore.value = true
  } else {
    isLoading.value = true
    organizers.value = []
    page.value = 1
  }

  try {
    const data = await trpc.profiles.organisers.query({
      limit: limit.value,
      page: page.value,
    })

    if (data) {
      if (isLoadMore) {
        organizers.value = [...organizers.value, ...data.organizers]
      } else {
        organizers.value = data.organizers
      }
      totalCount.value = data.totalCount
      hasMore.value = data.hasMore
    }
  } catch (error) {
    console.error('Error fetching organizers:', error)
  } finally {
    if (isLoadMore) {
      loadingMore.value = false
    } else {
      isLoading.value = false
    }
  }
}

function loadMore() {
  if (hasMore.value) {
    page.value++
    fetchOrganizers(true)
  }
}

onMounted(() => {
  fetchOrganizers()
})
</script>

<template>
  <div>
    <!-- Controls -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <Button variant="primary" as-child class="w-full sm:w-auto">
        <NuxtLink to="/register" class="flex items-center justify-center gap-2">
          <Icon name="ph:plus-circle" class="w-5 h-5" />
          Add Your City's Groups
        </NuxtLink>
      </Button>
    </div>

    <!-- Results Grid View -->
    <div v-if="isGridView" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <OrganizerCard
        v-for="organizer in organizers"
        :key="organizer.id"
        :organizer="organizer"
        view="grid"
      />
    </div>

    <!-- Results List View -->
    <div v-else class="space-y-4">
      <OrganizerCard
        v-for="organizer in organizers"
        :key="organizer.id"
        :organizer="organizer"
        view="list"
      />
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
        <span v-else>Load More Organizers</span>
      </Button>
    </div>

    <!-- Loading More Indicator -->
    <div v-if="loadingMore" class="mt-8 flex justify-center">
      <div
        class="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"
      ></div>
    </div>

    <!-- Empty State -->
    <div v-if="!organizers.length" class="text-center">
      <div class="max-w-md mx-auto">
        <EmptyState variant="no-results" />
        <p class="mt-4 text-muted-foreground">
          Don't see your city? Help grow the community by
          <Button variant="link" class="px-1" as-child>
            <NuxtLink to="/register">adding your local dance groups</NuxtLink>
          </Button>
        </p>
      </div>
    </div>

    <!-- Location Sheet -->
    <Sheet :open="showLocationFilter" @update:open="showLocationFilter = false">
      <SheetContent side="bottom" class="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter by Location</SheetTitle>
        </SheetHeader>
        <div class="mt-4">
          <LocationPanel
            :location="filters.location"
            @update:location="filters.location = $event || ''"
          />
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
