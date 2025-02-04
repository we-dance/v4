<script setup lang="ts">
import { mockVenues } from '~/data/mockVenues'
const venues = mockVenues

const showFilters = ref(false)
const showLocationFilter = ref(false)
const search = ref('')
const selectedLocation = ref<string | null>(null)
const selectedStyles = ref<string[]>([])
const selectedFeatures = ref<string[]>([])
const selectedPriceRange = ref<[number, number]>([0, 200])
const selectedCapacityRange = ref<[number, number]>([0, 200])

const allStyles = computed(() =>
  Array.from(new Set(venues.flatMap((venue) => venue.styles)))
)

const allFeatures = computed(() =>
  Array.from(new Set(venues.flatMap((venue) => venue.features)))
)

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
      <Button
        variant="outline"
        class="gap-2"
        @click="showFilters = !showFilters"
      >
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

  <!-- Venues Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <NuxtLink
      v-for="venue in filteredVenues"
      :key="venue.id"
      :to="`/venues/${venue.id}`"
      class="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div class="aspect-video relative overflow-hidden">
        <img
          :src="venue.image"
          :alt="venue.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg text-foreground">
            {{ venue.name }}
          </h3>
          <div class="flex items-center gap-1 text-amber-500">
            <Icon name="ph:star-fill" class="w-4 h-4" />
            <span class="text-sm">{{ venue.rating }}</span>
          </div>
        </div>
        <p class="text-muted-foreground text-sm mb-2">
          {{ venue.address }}
        </p>
        <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div class="flex items-center gap-1">
            <Icon name="ph:currency-eur" class="w-4 h-4" />
            {{ Math.min(...venue.areas.map((a) => a.pricePerHour)) }}-{{
              Math.max(...venue.areas.map((a) => a.pricePerHour))
            }}/hour
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:users" class="w-4 h-4" />
            {{ venue.areas.reduce((sum, area) => sum + area.capacity, 0) }}
            people
          </div>
        </div>
        <p class="text-foreground mb-4 line-clamp-2">{{ venue.description }}</p>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="feature in venue.features.slice(0, 3)"
            :key="feature"
            variant="secondary"
          >
            {{ feature }}
          </Badge>
        </div>
      </div>
    </NuxtLink>
  </div>

  <!-- No Results -->
  <div v-if="filteredVenues.length === 0" class="text-center py-12">
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
          @update:location="{
            selectedLocation = $event;
            showLocationFilter = false;
          }"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
