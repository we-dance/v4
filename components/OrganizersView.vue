<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'
import OrganizerCard from '~/components/OrganizerCard.vue'
import { danceStyles, eventTypes, mockOrganizers } from '~/data/mockOrganizers'

const search = ref('')
const showFilters = ref(false)
const isGridView = ref(true)
const showLocationFilter = ref(false)

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

const organizers = ref(mockOrganizers)

// Helper function to get style label
function getStyleLabel(value: string) {
  return danceStyles.find((style) => style.value === value)?.label || value
}

const filteredOrganizers = computed(() => {
  return organizers.value.filter((organizer) => {
    // Search by name or location
    const matchesSearch =
      !search.value ||
      organizer.name.toLowerCase().includes(search.value.toLowerCase()) ||
      organizer.location.toLowerCase().includes(search.value.toLowerCase())

    // Filter by styles
    const matchesStyles =
      filters.value.styles.includes('any') ||
      filters.value.styles.some((style) => organizer.styles.includes(style))

    // Filter by location
    const matchesLocation =
      !filters.value.location ||
      organizer.location
        .toLowerCase()
        .includes(filters.value.location.toLowerCase())

    // Filter by event types
    const matchesEventTypes =
      filters.value.eventTypes.includes('any') ||
      filters.value.eventTypes.some((type) =>
        organizer.eventTypes.includes(type)
      )

    return (
      matchesSearch && matchesStyles && matchesLocation && matchesEventTypes
    )
  })
})

function toggleView() {
  isGridView.value = !isGridView.value
}

// Helper functions to get labels
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

function resetFilters() {
  filters.value = {
    styles: [],
    location: '',
    eventTypes: [],
  }
  search.value = ''
}

const hasActiveFilters = computed(() => {
  return (
    filters.value.styles.length > 0 ||
    filters.value.location.length > 0 ||
    filters.value.eventTypes.length > 0 ||
    search.value.length > 0
  )
})

const selectedStyle = ref('any')
const selectedEventType = ref('any')

watch(selectedStyle, (newValue) => {
  if (newValue === 'any') {
    filters.value.styles = ['any']
  } else {
    const currentStyles = filters.value.styles.filter((s) => s !== 'any')
    if (currentStyles.includes(newValue)) {
      filters.value.styles = currentStyles.filter((s) => s !== newValue)
      if (filters.value.styles.length === 0) {
        filters.value.styles = ['any']
      }
    } else {
      filters.value.styles = [...currentStyles, newValue]
    }
  }
})

watch(selectedEventType, (newValue) => {
  if (newValue === 'any') {
    filters.value.eventTypes = ['any']
  } else {
    const currentTypes = filters.value.eventTypes.filter((t) => t !== 'any')
    if (currentTypes.includes(newValue)) {
      filters.value.eventTypes = currentTypes.filter((t) => t !== newValue)
      if (filters.value.eventTypes.length === 0) {
        filters.value.eventTypes = ['any']
      }
    } else {
      filters.value.eventTypes = [...currentTypes, newValue]
    }
  }
})
</script>

<template>
  <div>
    <!-- Controls -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div class="flex gap-2">
        <Button variant="secondary" @click="showLocationFilter = true">
          <Icon name="ph:map-pin" class="w-4 h-4 mr-2" />
          {{ filters.location || 'Any Location' }}
        </Button>
        <Button variant="secondary" @click="showFilters = !showFilters">
          <Icon name="ph:funnel" class="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button variant="secondary" @click="toggleView">
          <Icon
            :name="isGridView ? 'ph:grid-four' : 'ph:list'"
            class="w-4 h-4"
          />
        </Button>
      </div>

      <Button variant="primary" as-child class="w-full sm:w-auto">
        <NuxtLink to="/register" class="flex items-center justify-center gap-2">
          <Icon name="ph:plus-circle" class="w-5 h-5" />
          Add Your City's Groups
        </NuxtLink>
      </Button>
    </div>

    <!-- Filters -->
    <div v-if="showFilters" class="mb-8 p-4 bg-muted rounded-lg">
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Dance Styles</Label>
          <Select v-model="selectedStyle">
            <SelectTrigger>
              <SelectValue :placeholder="getStylesLabel(filters.styles)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Style</SelectItem>
              <SelectItem
                v-for="style in danceStyles"
                :key="style.value"
                :value="style.value"
              >
                {{ style.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Event Types</Label>
          <Select v-model="selectedEventType">
            <SelectTrigger>
              <SelectValue
                :placeholder="getEventTypesLabel(filters.eventTypes)"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Event Type</SelectItem>
              <SelectItem
                v-for="type in eventTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

    <!-- Results Grid View -->
    <div v-if="isGridView" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <OrganizerCard
        v-for="organizer in filteredOrganizers"
        :key="organizer.id"
        :organizer="organizer"
        view="grid"
      />
    </div>

    <!-- Results List View -->
    <div v-else class="space-y-4">
      <OrganizerCard
        v-for="organizer in filteredOrganizers"
        :key="organizer.id"
        :organizer="organizer"
        view="list"
      />
    </div>

    <!-- Empty State -->
    <div v-if="!filteredOrganizers.length" class="text-center">
      <div class="max-w-md mx-auto">
        <EmptyState variant="no-results" />
        <p class="mt-4 text-muted-foreground">
          Don't see your city? Help grow the community by
          <Button variant="tertiary" class="px-1" as-child>
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
