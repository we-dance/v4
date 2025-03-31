<script setup lang="ts">
import type { LatLng } from 'leaflet'
import L from 'leaflet'
import { useRouter } from 'vue-router'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useDebounceFn } from '@vueuse/core'

interface Venue {
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
}

const searchQuery = ref('')
const venues = ref<Venue[]>([
  {
    id: '1',
    name: 'TanzStudio',
    location: 'Hauptstraße 1, Munich',
    coordinates: new L.LatLng(48.1351, 11.5820), // Munich coordinates
    rating: 4.8,
    description: 'Premier dance studio with 3 halls and professional sound system',
    priceRange: '35-50/hour',
    capacity: '65 people',
    amenities: ['Sprung Floor', 'Mirrors', 'Sound System'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format' // Dance studio with mirrors
  },
  {
    id: '2',
    name: 'Dance Factory',
    location: 'Karlsplatz 5, Munich',
    coordinates: new L.LatLng(48.1392, 11.5656), // Karlsplatz coordinates
    rating: 4.6,
    description: 'Modern dance space perfect for classes and social events',
    priceRange: '45-75/hour',
    capacity: '70 people',
    amenities: ['Air Conditioning', 'Bar', 'Stage'],
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800&auto=format' // Modern dance space
  },
  {
    id: '3',
    name: 'Havana Club',
    location: 'Schwabing West, Munich',
    coordinates: new L.LatLng(48.1662, 11.5762), // Schwabing West coordinates
    rating: 4.9,
    description: 'Authentic Latin club with live music every weekend',
    priceRange: '60-100/hour',
    capacity: '180 people',
    amenities: ['Live Music', 'Dance Floor', 'Bar'],
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format' // Latin dance club atmosphere
  },
  {
    id: '4',
    name: 'Tango Loft Berlin',
    location: 'Kreuzberg, Berlin',
    coordinates: new L.LatLng(52.4938, 13.4243),
    rating: 4.9,
    description: 'Historic ballroom specialized in Argentine Tango with authentic wooden floors',
    priceRange: '40-60/hour',
    capacity: '120 people',
    amenities: ['Wooden Floor', 'Bar', 'Live Music', 'Air Conditioning'],
    image: 'https://images.unsplash.com/photo-1547435607-0455b8d4d86f?q=80&w=800&auto=format'
  },
  {
    id: '5',
    name: 'Urban Dance Factory',
    location: 'Prenzlauer Berg, Berlin',
    coordinates: new L.LatLng(52.5423, 13.4147),
    rating: 4.7,
    description: 'Modern studio complex with multiple rooms for all urban dance styles',
    priceRange: '30-45/hour',
    capacity: '80 people',
    amenities: ['Multiple Studios', 'Sound System', 'Lockers', 'Practice Area'],
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=800&auto=format'
  },
  {
    id: '6',
    name: 'Wiener Tanzpalast',
    location: 'Innere Stadt, Vienna',
    coordinates: new L.LatLng(48.2082, 16.3738),
    rating: 4.9,
    description: 'Classical Viennese ballroom with ornate decoration and grand chandeliers',
    priceRange: '55-85/hour',
    capacity: '200 people',
    amenities: ['Grand Ballroom', 'Historical Building', 'Piano', 'Changing Rooms'],
    image: 'https://images.unsplash.com/photo-1542628682-88321d2a4828?q=80&w=800&auto=format'
  },
  {
    id: '7',
    name: 'Dance House Vienna',
    location: 'Leopoldstadt, Vienna',
    coordinates: new L.LatLng(48.2173, 16.3977),
    rating: 4.6,
    description: 'Contemporary dance center offering various styles and workshops',
    priceRange: '35-55/hour',
    capacity: '90 people',
    amenities: ['Sprung Floor', 'Mirrors', 'Workshop Space', 'Cafe'],
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800&auto=format'
  },
  {
    id: '8',
    name: 'Frankfurt Dance Center',
    location: 'Innenstadt, Frankfurt',
    coordinates: new L.LatLng(50.1109, 8.6821),
    rating: 4.7,
    description: 'Professional dance facility in the heart of Frankfurt',
    priceRange: '45-70/hour',
    capacity: '100 people',
    amenities: ['Professional Sound', 'Air Conditioning', 'Changing Rooms', 'Parking'],
    image: 'https://images.unsplash.com/photo-1594225513388-399f78249aae?q=80&w=800&auto=format'
  },
  {
    id: '9',
    name: 'Tanzraum Linz',
    location: 'Hauptplatz, Linz',
    coordinates: new L.LatLng(48.3069, 14.2858),
    rating: 4.5,
    description: 'Modern dance studio with beautiful Danube river views',
    priceRange: '30-45/hour',
    capacity: '70 people',
    amenities: ['River View', 'Sound System', 'Mirrors', 'Water Dispenser'],
    image: 'https://images.unsplash.com/photo-1576777647209-e8733d7b851d?q=80&w=800&auto=format'
  },
  {
    id: '10',
    name: 'Tanzzentrum Graz',
    location: 'Innere Stadt, Graz',
    coordinates: new L.LatLng(47.0707, 15.4395),
    rating: 4.8,
    description: 'Historic dance center in the heart of Graz with modern amenities',
    priceRange: '35-50/hour',
    capacity: '85 people',
    amenities: ['Historical Building', 'Modern Equipment', 'Cafe', 'Practice Rooms'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format'
  }
])

const router = useRouter()

// Add search handler if needed
const handleSearch = (query: string) => {
  // Implement search logic
}

// Add sort state
const sortBy = ref('relevance')

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating: High → Low' },
  { value: 'priceLow', label: 'Price: Low → High' },
  { value: 'capacity', label: 'Capacity' },
]

// Update ViewMode type to remove list
type ViewMode = 'grid' | 'map'
const currentView = ref<ViewMode>('grid')

const highlightedVenueId = ref('')

// Add state for mobile filters modal
const isFilterModalOpen = ref(false)

// Update filters with correct Lucide icon names
const filters = [
  { id: 'location', icon: 'lucide:map-pin', label: 'Location' },
  { id: 'price', icon: 'lucide:wallet', label: 'Price' },
  { id: 'capacity', icon: 'lucide:users', label: 'Capacity' },
  { id: 'rating', icon: 'lucide:star', label: 'Rating' },
  { id: 'amenities', icon: 'lucide:list-checks', label: 'Amenities' },
  { id: 'dateTime', icon: 'lucide:calendar', label: 'Date & Time' },
]

// Add computed properties for filtering
const priceRanges = computed(() => [
  '35-50/hour',
  '45-75/hour',
  '60-100/hour'
])

const amenityOptions = computed(() => [
  'Sprung Floor',
  'Mirrors',
  'Sound System',
  'Air Conditioning',
  'Bar',
  'Stage',
  'Live Music',
  'Dance Floor'
])

const capacityRanges = computed(() => [
  'Up to 70 people',
  '70-150 people',
  '150+ people'
])

// Update price range state with wider range
const priceRange: PriceRange = {
  min: 0,
  max: 500
}

// Update price presets with wider ranges
const pricePresets = [
  { label: 'Under €100', value: [0, 100] as [number, number] },
  { label: '€100 - €250', value: [100, 250] as [number, number] },
  { label: '€250 - €500', value: [250, 500] as [number, number] }
] as const

// Add capacity range interface and state
interface RangeConfig {
  min: number
  max: number
}

const capacityRange: RangeConfig = {
  min: 5,
  max: 1000
}

// Update the venue features configuration in the script section
const mainFeatures = [
  { id: 'mirrors', label: 'Mirrors', icon: 'lucide:square' },
  { id: 'sprungFloor', label: 'Sprung Floor', icon: 'lucide:waves' },
  { id: 'airConditioning', label: 'Air Conditioning', icon: 'lucide:fan' },
  { id: 'parking', label: 'Parking', icon: 'lucide:parking' }
] as const

const additionalFeatures = [
  { id: 'soundSystem', label: 'Music System', icon: 'lucide:volume-2' },
  { id: 'dj', label: 'DJ Available', icon: 'lucide:headphones' },
  { id: 'bar', label: 'Bar Included', icon: 'lucide:glass' },
  { id: 'garderobe', label: 'Garderobe Included', icon: 'lucide:hanger' }
] as const

// Remove the old venueFeatures array and use these instead
const venueFeatures = [...mainFeatures, ...additionalFeatures]

// Add to script setup, after the existing interfaces
interface DateTimeFilter {
  date: Date | undefined
  timeSlot: string | undefined
}

// Add to the activeFilters ref
const activeFilters = ref({
  location: '',
  priceRange: [priceRange.min, priceRange.max] as [number, number],
  capacity: capacityRange.min,
  rating: 0,
  amenities: [] as string[],
  features: [] as string[],
  dateTime: {
    date: undefined,
    timeSlot: undefined
  } as DateTimeFilter
})

// Add time slot options
const timeSlots = [
  { label: 'Morning (8:00 - 12:00)', value: 'morning' },
  { label: 'Afternoon (12:00 - 17:00)', value: 'afternoon' },
  { label: 'Evening (17:00 - 22:00)', value: 'evening' }
] as const

// Update filteredVenues computed for new capacity filter
const filteredVenues = computed(() => {
  return venues.value.filter(venue => {
    // Search query filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch = 
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query) ||
        venue.description.toLowerCase().includes(query)
      
      if (!matchesSearch) return false
    }

    // Location filter
    if (activeFilters.value.location && 
        !venue.location.toLowerCase().includes(activeFilters.value.location.toLowerCase())) {
      return false
    }

    // Price range filter
    const [venueMin] = venue.priceRange.split('-')[0].match(/\d+/) || []
    const [venueMax] = venue.priceRange.split('-')[1].match(/\d+/) || []
    const minPrice = Number(venueMin)
    const maxPrice = Number(venueMax)
    
    if (minPrice < activeFilters.value.priceRange[0] || 
        maxPrice > activeFilters.value.priceRange[1]) {
      return false
    }

    // Capacity filter - now using "at least X people"
    if (activeFilters.value.capacity > capacityRange.min) {
      const venueCapacity = parseInt(venue.capacity)
      if (venueCapacity < activeFilters.value.capacity) return false
    }

    // Rating filter
    if (activeFilters.value.rating && venue.rating < activeFilters.value.rating) {
      return false
    }

    // Amenities filter
    if (activeFilters.value.amenities.length > 0) {
      const hasAllAmenities = activeFilters.value.amenities.every(
        amenity => venue.amenities.includes(amenity)
      )
      if (!hasAllAmenities) return false
    }

    // Features filter
    if (activeFilters.value.features.length > 0) {
      const hasAllFeatures = activeFilters.value.features.every(
        feature => venue.amenities.includes(feature)
      )
      if (!hasAllFeatures) return false
    }

    return true
  })
})

// Add sort functionality
const sortedVenues = computed(() => {
  const venues = [...filteredVenues.value]
  
  switch (sortBy.value) {
    case 'rating':
      return venues.sort((a, b) => b.rating - a.rating)
    case 'priceLow':
      return venues.sort((a, b) => {
        const [aMin] = a.priceRange.split('-')[0].match(/\d+/) || []
        const [bMin] = b.priceRange.split('-')[0].match(/\d+/) || []
        return Number(aMin) - Number(bMin)
      })
    case 'capacity':
      return venues.sort((a, b) => {
        const aCapacity = parseInt(a.capacity)
        const bCapacity = parseInt(b.capacity)
        return bCapacity - aCapacity
      })
    default:
      return venues
  }
})

// Update resetFilters function
const resetFilters = () => {
  activeFilters.value = {
    location: '',
    priceRange: [priceRange.min, priceRange.max],
    capacity: capacityRange.min,
    rating: 0,
    amenities: [],
    features: [],
    dateTime: {
      date: undefined,
      timeSlot: undefined
    }
  }
  searchQuery.value = ''
  sortBy.value = 'relevance'
}

// Simplify view options to just grid and map
const viewOptions = [
  { 
    value: 'grid' as ViewMode, 
    icon: 'lucide:layout-grid', 
    label: 'Grid View',
    description: 'Show venues in a grid layout'
  },
  { 
    value: 'map' as ViewMode, 
    icon: 'lucide:map', 
    label: 'Map View',
    description: 'Show venues with map'
  }
]

// Add state for individual filter dialogs
const openFilter = ref<string | null>(null)

// Function to open specific filter dialog
const openFilterDialog = (filterId: string) => {
  openFilter.value = filterId
}

// Function to close filter dialog
const closeFilterDialog = () => {
  openFilter.value = null
}

// Add location data
const locations = [
  // Germany
  { city: 'Berlin', country: 'Germany', region: 'Berlin' },
  { city: 'Munich', country: 'Germany', region: 'Bavaria' },
  { city: 'Frankfurt', country: 'Germany', region: 'Hesse' },
  { city: 'Hamburg', country: 'Germany', region: 'Hamburg' },
  { city: 'Cologne', country: 'Germany', region: 'North Rhine-Westphalia' },
  { city: 'Dresden', country: 'Germany', region: 'Saxony' },
  { city: 'Leipzig', country: 'Germany', region: 'Saxony' },
  { city: 'Stuttgart', country: 'Germany', region: 'Baden-Württemberg' },
  
  // Austria
  { city: 'Vienna', country: 'Austria', region: 'Vienna' },
  { city: 'Graz', country: 'Austria', region: 'Styria' },
  { city: 'Linz', country: 'Austria', region: 'Upper Austria' },
  { city: 'Salzburg', country: 'Austria', region: 'Salzburg' },
  { city: 'Innsbruck', country: 'Austria', region: 'Tyrol' },
  { city: 'Klagenfurt', country: 'Austria', region: 'Carinthia' }
]

// Add location search state
const locationSearch = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)

// Function to search locations using OpenStreetMap Nominatim
const searchLocations = async (query: string) => {
  if (!query || query.length < 2) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de,at&limit=10`
    )
    const data = await response.json()
    
    // Filter and format results
    searchResults.value = data.map((item: any) => ({
      city: item.address.city || item.address.town || item.address.village || item.address.municipality,
      region: item.address.state || item.address.county,
      country: item.address.country,
      displayName: item.display_name,
      coordinates: [parseFloat(item.lat), parseFloat(item.lon)]
    })).filter((item: any) => item.city && item.region)
  } catch (error) {
    console.error('Error fetching locations:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

// Debounced search function
const debouncedSearch = useDebounceFn(searchLocations, 300)

// Watch location search input
watch(locationSearch, (newValue) => {
  debouncedSearch(newValue)
})

// Add computed property for selected venue
const selectedVenue = computed(() => 
  venues.value.find(venue => venue.id === highlightedVenueId.value)
)

// Add rating options
const ratingOptions = [
  { label: 'Any', value: 0 },
  { label: '4.0+', value: 4.0 },
  { label: '4.5+', value: 4.5 },
  { label: '5.0 only', value: 5.0 }
] as const
</script>

<template>
  <!-- Update the Filter Bar section -->
  <div class="sticky top-[4rem] z-10 bg-background border-b">
    <!-- Desktop & Mobile Filter Bar -->
    <div class="w-[80vw] max-w-7xl mx-auto">
      <!-- Search Input -->
      <div class="mb-3 py-3">
        <Input
          v-model="searchQuery"
          placeholder="Search venues by name, dance style or city"
          class="w-full rounded-full px-6 py-3 shadow-sm"
        >
          <template #prefix>
            <Icon
              name="lucide:search"
              class="h-5 w-5 text-muted-foreground"
            />
          </template>
        </Input>
      </div>

      <!-- Filter Groups and View Controls -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 pb-3">
        <!-- Filter Groups - Scrollable on mobile -->
        <div class="flex-1 overflow-x-auto">
          <div class="flex flex-col md:flex-row gap-3 min-w-min pb-2 md:pb-0">
            <!-- Location & Date Group -->
            <div class="bg-muted rounded-md shadow-sm px-4 py-2 space-y-1 w-full md:w-auto">
              <Label class="text-xs text-muted-foreground">Location & Date</Label>
              <div class="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none transition-colors hover:bg-primary/5"
                  :class="{ 'bg-primary/10 border-primary': activeFilters.location }"
                  @click="openFilterDialog('location')"
                >
                  <Icon
                    name="lucide:map-pin"
                    class="mr-2 h-4 w-4 text-muted-foreground"
                  />
                  {{ activeFilters.location || 'Location' }}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none transition-colors hover:bg-primary/5"
                  :class="{ 'bg-primary/10 border-primary': activeFilters.dateTime.date }"
                  @click="openFilterDialog('dateTime')"
                >
                  <Icon
                    name="lucide:calendar"
                    class="mr-2 h-4 w-4 text-muted-foreground"
                  />
                  {{ activeFilters.dateTime.date ? format(activeFilters.dateTime.date, 'MMM d') : 'Date' }}
                </Button>
              </div>
            </div>

            <!-- Price & Capacity Group -->
            <div class="bg-muted rounded-md shadow-sm px-4 py-2 space-y-1 w-full md:w-auto">
              <Label class="text-xs text-muted-foreground">Price & Size</Label>
              <div class="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none"
                  :class="{ 'bg-primary/10': activeFilters.priceRange[0] > priceRange.min || activeFilters.priceRange[1] < priceRange.max }"
                  @click="openFilterDialog('price')"
                >
                  <Icon
                    name="lucide:wallet"
                    class="mr-2 h-4 w-4 group-hover:text-primary transition-colors"
                  />
                  {{ activeFilters.priceRange[0] === priceRange.min && activeFilters.priceRange[1] === priceRange.max 
                    ? 'Price' 
                    : `€${activeFilters.priceRange[0]} - €${activeFilters.priceRange[1]}` }}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none"
                  :class="{ 'bg-primary/10': activeFilters.capacity > capacityRange.min }"
                  @click="openFilterDialog('capacity')"
                >
                  <Icon
                    name="lucide:users"
                    class="mr-2 h-4 w-4 group-hover:text-primary transition-colors"
                  />
                  {{ activeFilters.capacity > capacityRange.min ? `${activeFilters.capacity}+ people` : 'Capacity' }}
                </Button>
              </div>
            </div>

            <!-- Features & Rating Group -->
            <div class="bg-muted rounded-md shadow-sm px-4 py-2 space-y-1 w-full md:w-auto">
              <Label class="text-xs text-muted-foreground">Features & Rating</Label>
              <div class="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none"
                  :class="{ 'bg-primary/10': activeFilters.features.length > 0 }"
                  @click="openFilterDialog('amenities')"
                >
                  <Icon
                    name="lucide:list-checks"
                    class="mr-2 h-4 w-4 group-hover:text-primary transition-colors"
                  />
                  {{ activeFilters.features.length ? `${activeFilters.features.length} selected` : 'Features' }}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  class="shrink-0 group flex-1 md:flex-none"
                  :class="{ 'bg-primary/10': activeFilters.rating > 0 }"
                  @click="openFilterDialog('rating')"
                >
                  <Icon
                    name="lucide:star"
                    class="mr-2 h-4 w-4 group-hover:text-primary transition-colors"
                  />
                  {{ activeFilters.rating ? `${activeFilters.rating}+ stars` : 'Rating' }}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- View & Sort Controls -->
        <div class="bg-muted rounded-md shadow-sm px-4 py-2 space-y-1 w-full md:w-auto">
          <Label class="text-sm font-medium text-muted-foreground">View & Sort</Label>
          <div class="flex items-center gap-3">
            <!-- View Toggle -->
            <div class="flex gap-1 p-1 bg-background rounded-lg border">
              <Button
                v-for="view in viewOptions"
                :key="view.value"
                variant="ghost"
                size="sm"
                :class="[
                  'size-10',
                  'flex items-center justify-center',
                  currentView === view.value ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                ]"
                @click="currentView = view.value"
              >
                <Icon
                  :name="view.icon"
                  class="size-5"
                  :class="currentView === view.value ? 'text-primary' : 'text-muted-foreground'"
                />
                <span class="sr-only">{{ view.label }}</span>
              </Button>
            </div>

            <!-- Divider -->
            <Separator orientation="vertical" class="h-8" />

            <!-- Sort Dropdown -->
            <Select
              v-model="sortBy"
              class="w-[160px]"
            >
              <SelectTrigger class="h-8 text-base">
                <span class="truncate font-medium">{{ sortOptions.find(opt => opt.value === sortBy)?.label }}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in sortOptions"
                  :key="option.value"
                  :value="option.value"
                  class="text-base"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- View Content -->
  <div 
    :class="{
      'w-[80vw] max-w-7xl mx-auto': currentView === 'grid',
      'w-[95vw] max-w-[1880px] mx-auto': currentView === 'map'
    }"
  >
    <div
      :class="{
        'grid gap-6 transition-all duration-300': true,
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4': currentView === 'grid',
        'grid-cols-1 md:grid-cols-[30%_70%] h-[calc(100vh-200px)]': currentView === 'map'
      }"
    >
      <!-- Grid View -->
      <template v-if="currentView === 'grid'">
        <div
          v-for="venue in sortedVenues"
          :key="venue.id"
          class="group relative bg-white rounded-xl border transition-all duration-200 hover:shadow-lg"
          @click="router.push(`/venues/${venue.id}`)"
        >
          <!-- Image Container -->
          <div class="relative aspect-[4/3] overflow-hidden rounded-t-xl">
            <img
              :src="venue.image"
              :alt="venue.name"
              class="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
            />
            <!-- Rating Badge - Top Right -->
            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-sm font-medium">
              <Icon name="lucide:star" class="h-4 w-4 text-yellow-400" />
              {{ venue.rating }}
            </div>
            <!-- Price Badge - Bottom Right -->
            <div class="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-medium">
              {{ venue.priceRange }}
            </div>
          </div>

          <!-- Content Container -->
          <div class="p-5 space-y-4">
            <!-- Venue Name and Location -->
            <div class="space-y-1.5">
              <h3 class="font-semibold text-lg line-clamp-1">{{ venue.name }}</h3>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="lucide:map-pin" class="h-4 w-4" />
                <span class="line-clamp-1">{{ venue.location }}</span>
              </div>
            </div>

            <!-- Tags Container -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in venue.amenities.slice(0, 5)"
                :key="tag"
                class="bg-muted text-xs text-muted-foreground rounded-full px-3 py-1 font-medium"
              >
                {{ tag }}
              </span>
              <span
                v-if="venue.amenities.length > 5"
                class="bg-muted text-xs text-muted-foreground rounded-full px-3 py-1 font-medium"
              >
                +{{ venue.amenities.length - 5 }} more
              </span>
            </div>

            <!-- Update Price and Capacity section to only show capacity -->
            <div class="flex items-center justify-between pt-2 border-t">
              <div class="flex items-center gap-2">
                <Icon name="lucide:users" class="h-4 w-4 text-muted-foreground" />
                <span class="text-sm text-muted-foreground">{{ venue.capacity }}</span>
              </div>
            </div>

            <!-- Available Date (if selected) -->
            <div 
              v-if="activeFilters.dateTime.date"
              class="flex items-center gap-1.5 text-sm text-green-600 pt-2 border-t"
            >
              <Icon name="lucide:check-circle" class="h-4 w-4" />
              <span>Available on {{ format(activeFilters.dateTime.date, 'MMM d') }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Map View -->
      <template v-if="currentView === 'map'">
        <!-- Venues List - Only visible on desktop -->
        <div class="hidden md:block h-[calc(100vh-200px)] flex flex-col">
          <!-- Scrollable venue list -->
          <div class="flex-1 overflow-y-auto space-y-4 pr-4">
            <div
              v-for="venue in sortedVenues"
              :key="venue.id"
              class="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              :class="{ 'ring-2 ring-primary': highlightedVenueId === venue.id }"
              @mouseover="highlightedVenueId = venue.id"
              @mouseout="highlightedVenueId = ''"
              @click="router.push(`/venues/${venue.id}`)"
            >
              <!-- Thumbnail -->
              <img
                :src="venue.image"
                :alt="venue.name"
                class="size-24 object-cover rounded-lg"
              />

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-semibold">{{ venue.name }}</h3>
                    <p class="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon 
                        name="lucide:map-pin" 
                        class="h-3 w-3"
                      />
                      {{ venue.location }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1 text-sm">
                      <Icon 
                        name="lucide:star" 
                        class="h-4 w-4 text-yellow-500"
                      />
                      {{ venue.rating.toFixed(1) }}
                    </div>
                    <Badge>{{ venue.priceRange }}</Badge>
                  </div>
                </div>

                <p class="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {{ venue.description }}
                </p>

                <div class="mt-2 flex items-center gap-4">
                  <span class="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon 
                      name="lucide:users" 
                      class="h-4 w-4"
                    />
                    {{ venue.capacity }}
                  </span>
                </div>

                <div class="mt-2 flex flex-wrap gap-1.5">
                  <span
                    v-for="amenity in venue.amenities.slice(0, 5)"
                    :key="amenity"
                    class="bg-muted text-xs text-muted-foreground rounded-full px-3 py-1 font-medium"
                  >
                    {{ amenity }}
                  </span>
                  <span
                    v-if="venue.amenities.length > 5"
                    class="bg-muted text-xs text-muted-foreground rounded-full px-3 py-1 font-medium"
                  >
                    +{{ venue.amenities.length - 5 }} more
                  </span>
                </div>

                <!-- Date & Time Availability -->
                <div 
                  v-if="activeFilters.dateTime.date"
                  class="flex items-center gap-1 text-sm text-muted-foreground mt-2"
                >
                  <Icon name="lucide:check-circle" class="h-4 w-4 text-green-500" />
                  <span>Available on {{ format(activeFilters.dateTime.date, 'MMM d') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map - Full width on mobile -->
        <div 
          :class="{
            'sticky md:top-20 h-[calc(100vh-200px)]': true,
            'col-span-full md:col-span-1': true
          }"
        >
          <VenueMap
            :venues="sortedVenues"
            v-model:highlighted-venue-id="highlightedVenueId"
            class="w-full h-full rounded-lg border"
          />
        </div>

        <!-- Mobile Bottom Sheet for Venue Info -->
        <div
          v-if="highlightedVenueId && currentView === 'map'"
          class="fixed md:hidden bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg p-4 z-50 animate-in slide-in-from-bottom"
        >
          <div
            v-if="selectedVenue"
            class="space-y-3"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold">{{ selectedVenue.name }}</h3>
                <p class="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="lucide:map-pin" class="h-3 w-3" />
                  {{ selectedVenue.location }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 text-sm">
                  <Icon name="lucide:star" class="h-4 w-4 text-yellow-500" />
                  {{ selectedVenue.rating.toFixed(1) }}
                </div>
                <Badge>{{ selectedVenue.priceRange }}</Badge>
              </div>
            </div>

            <Button 
              class="w-full"
              @click="router.push(`/venues/${selectedVenue.id}`)"
            >
              View Details
            </Button>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- Individual Filter Dialogs -->
  <Dialog
    :open="openFilter !== null"
    @update:open="closeFilterDialog"
  >
    <DialogContent 
      class="w-[80vw] max-w-3xl p-6 rounded-xl"
      :class="{
        'md:max-w-[425px]': openFilter === 'location' || openFilter === 'rating'
      }"
    >
      <DialogHeader class="space-y-2">
        <DialogTitle class="text-xl font-semibold">
          {{ filters.find(f => f.id === openFilter)?.label }}
        </DialogTitle>
        <DialogDescription class="text-muted-foreground">
          Refine your venue search
        </DialogDescription>
      </DialogHeader>
      
      <!-- Update the filter content container -->
      <div class="grid gap-6 py-6">
        <!-- Location Filter -->
        <div v-if="openFilter === 'location'" class="grid gap-4">
          <!-- Search Location -->
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Cities & Regions</Label>
            <Command class="border border-muted rounded-md overflow-hidden">
              <CommandInput 
                v-model="locationSearch"
                placeholder="Search cities and regions..." 
                class="border-none"
              />
              <CommandList class="max-h-[200px] overflow-y-auto">
                <CommandEmpty class="p-4 text-sm text-muted-foreground">
                  <div v-if="isSearching" class="flex items-center gap-2">
                    <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
                    Searching locations...
                  </div>
                  <div v-else>
                    No locations found. Try a different search term.
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="location in searchResults"
                    :key="location.displayName"
                    :value="location.displayName"
                    @select="selectLocation(location)"
                    class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-primary/5 transition-colors"
                    :class="{
                      'bg-primary/10': activeFilters.location === `${location.city}, ${location.region}`
                    }"
                  >
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:map-pin" class="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span class="font-medium">{{ location.city }}</span>
                        <span class="text-sm text-muted-foreground ml-1">{{ location.region }}</span>
                      </div>
                    </div>
                    <Icon 
                      v-if="activeFilters.location === `${location.city}, ${location.region}`"
                      name="lucide:check"
                      class="h-4 w-4 text-primary"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <!-- Popular Regions -->
          <div class="mt-6 space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Popular regions</Label>
            <div class="grid grid-cols-2 gap-2">
              <Button
                v-for="region in ['Bavaria', 'Berlin', 'Vienna', 'Upper Austria']"
                :key="region"
                variant="outline"
                size="sm"
                class="w-full border transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 text-primary font-semibold border-primary': 
                    activeFilters.location.includes(region)
                }"
                @click="selectLocation({ city: region, region })"
              >
                <div class="flex items-center justify-between w-full">
                  <span>{{ region }}</span>
                  <Icon 
                    v-if="activeFilters.location.includes(region)"
                    name="lucide:check"
                    class="h-4 w-4"
                  />
                </div>
              </Button>
            </div>
          </div>

          <!-- Selected Location Summary -->
          <div 
            v-if="activeFilters.location" 
            class="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <div class="flex items-center gap-2">
              <Icon name="lucide:check-circle" class="h-4 w-4 text-primary" />
              <span class="text-sm font-medium">{{ activeFilters.location }}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 w-8 p-0"
              @click="activeFilters.location = ''"
            >
              <Icon name="lucide:x" class="h-4 w-4" />
              <span class="sr-only">Clear location</span>
            </Button>
          </div>
        </div>

        <!-- Features Filter -->
        <div v-if="openFilter === 'amenities'" class="grid gap-4">
          <div class="space-y-3">
            <!-- Main Features -->
            <Label class="text-sm font-medium text-muted-foreground">Main Features</Label>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="feature in mainFeatures"
                :key="feature.id"
                class="rounded-md border px-3 py-2 text-sm hover:bg-primary/5 flex items-center gap-2 transition-colors"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.features.includes(feature.label),
                  'text-muted-foreground': !activeFilters.features.includes(feature.label)
                }"
                @click="() => {
                  const index = activeFilters.features.indexOf(feature.label)
                  if (index === -1) {
                    activeFilters.features.push(feature.label)
                  } else {
                    activeFilters.features.splice(index, 1)
                  }
                }"
              >
                <div class="flex items-center gap-2 flex-1">
                  <Icon 
                    :name="feature.icon" 
                    class="h-4 w-4"
                    :class="activeFilters.features.includes(feature.label) ? 'text-primary' : 'text-muted-foreground'"
                  />
                  <span class="font-medium">{{ feature.label }}</span>
                </div>
                <div 
                  class="size-4 rounded border-2 flex items-center justify-center"
                  :class="activeFilters.features.includes(feature.label) 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-muted'"
                >
                  <Icon
                    v-if="activeFilters.features.includes(feature.label)"
                    name="lucide:check"
                    class="h-3 w-3"
                  />
                </div>
              </button>
            </div>

            <!-- Additional Amenities -->
            <p class="text-sm font-medium text-muted-foreground mt-6 mb-2">Additional Amenities</p>
            <div class="grid grid-cols-2 gap-4">
              <button
                v-for="feature in additionalFeatures"
                :key="feature.id"
                class="rounded-md border px-3 py-2 text-sm hover:bg-primary/5 flex items-center gap-2 transition-colors"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.features.includes(feature.label),
                  'text-muted-foreground': !activeFilters.features.includes(feature.label)
                }"
                @click="() => {
                  const index = activeFilters.features.indexOf(feature.label)
                  if (index === -1) {
                    activeFilters.features.push(feature.label)
                  } else {
                    activeFilters.features.splice(index, 1)
                  }
                }"
              >
                <div class="flex items-center gap-2 flex-1">
                  <Icon 
                    :name="feature.icon" 
                    class="h-4 w-4"
                    :class="activeFilters.features.includes(feature.label) ? 'text-primary' : 'text-muted-foreground'"
                  />
                  <span class="font-medium">{{ feature.label }}</span>
                </div>
                <div 
                  class="size-4 rounded border-2 flex items-center justify-center"
                  :class="activeFilters.features.includes(feature.label) 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-muted'"
                >
                  <Icon
                    v-if="activeFilters.features.includes(feature.label)"
                    name="lucide:check"
                    class="h-3 w-3"
                  />
                </div>
              </button>
            </div>
          </div>

          <!-- Selected Features Summary -->
          <div 
            v-if="activeFilters.features.length > 0" 
            class="bg-muted rounded-lg p-3 space-y-2 mt-4"
          >
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="feature in activeFilters.features"
                :key="feature"
                variant="secondary"
                class="flex items-center gap-1"
              >
                {{ feature }}
                <button
                  class="ml-1 hover:text-destructive"
                  @click="activeFilters.features = activeFilters.features.filter(f => f !== feature)"
                >
                  <Icon name="lucide:x" class="h-3 w-3" />
                  <span class="sr-only">Remove {{ feature }}</span>
                </button>
              </Badge>
            </div>
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              {{ sortedVenues.length }} venues with selected features
            </p>
          </div>
        </div>

        <!-- Rating Filter -->
        <div v-if="openFilter === 'rating'" class="grid gap-4">
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Minimum rating</Label>
            <div class="grid grid-cols-2 gap-2">
              <Button
                v-for="option in ratingOptions"
                :key="option.value"
                variant="outline"
                size="sm"
                class="w-full border transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.rating === option.value
                }"
                @click="activeFilters.rating = option.value"
              >
                <div class="flex flex-col items-center gap-1 py-1">
                  <div class="flex items-center gap-1">
                    <template v-if="option.value > 0">
                      <Icon 
                        name="lucide:star" 
                        class="h-4 w-4"
                        :class="option.value === activeFilters.rating ? 'text-yellow-500' : 'text-muted-foreground'"
                      />
                      <span 
                        class="font-medium"
                        :class="option.value === activeFilters.rating ? 'text-primary' : 'text-muted-foreground'"
                      >
                        {{ option.label }}
                      </span>
                    </template>
                    <span 
                      v-else
                      class="font-medium"
                      :class="option.value === activeFilters.rating ? 'text-primary' : 'text-muted-foreground'"
                    >
                      {{ option.label }}
                    </span>
                  </div>
                  <div 
                    v-if="option.value > 0"
                    class="text-xs text-muted-foreground"
                  >
                    {{ sortedVenues.filter(v => v.rating >= option.value).length }} venues
                  </div>
                </div>
              </Button>
            </div>
          </div>

          <!-- Rating Distribution -->
          <div class="space-y-2">
            <Label class="text-sm font-medium text-muted-foreground">Rating distribution</Label>
            <div class="space-y-1.5">
              <div
                v-for="rating in [5, 4.5, 4]"
                :key="rating"
                class="flex items-center gap-2"
              >
                <div class="flex items-center gap-1 w-16">
                  <Icon 
                    name="lucide:star" 
                    class="h-3.5 w-3.5 text-yellow-500"
                  />
                  <span class="text-sm">{{ rating }}+</span>
                </div>
                <div class="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    class="h-full bg-yellow-500/75"
                    :style="{
                      width: `${(venues.filter(v => v.rating >= rating).length / venues.length) * 100}%`
                    }"
                  />
                </div>
                <span class="text-sm text-muted-foreground w-8 text-right">
                  {{ venues.filter(v => v.rating >= rating).length }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date & Time Filter -->
        <div v-if="openFilter === 'dateTime'" class="grid gap-6">
          <!-- Date Selection Section -->
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Pick a date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  class="w-full justify-start text-left font-normal"
                  :class="!activeFilters.dateTime.date && 'text-muted-foreground'"
                >
                  <Icon
                    name="lucide:calendar"
                    class="mr-2 h-4 w-4"
                  />
                  {{ activeFilters.dateTime.date
                    ? format(activeFilters.dateTime.date, 'EEEE, MMMM d, yyyy')
                    : 'Select a date'
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0" align="start">
                <Calendar
                  v-model="activeFilters.dateTime.date"
                  :disabled-dates="{ before: new Date() }"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <!-- Time Slot Selection Section -->
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Select time slot</Label>
            <div class="flex flex-col gap-2">
              <Button
                v-for="slot in timeSlots"
                :key="slot.value"
                variant="outline"
                class="w-full justify-start px-4 py-3 transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.dateTime.timeSlot === slot.value,
                  'border': activeFilters.dateTime.timeSlot !== slot.value
                }"
                @click="activeFilters.dateTime.timeSlot = slot.value"
              >
                <div class="flex items-center gap-2">
                  <div 
                    class="size-4 rounded-full border-2"
                    :class="activeFilters.dateTime.timeSlot === slot.value 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'"
                  />
                  <span>{{ slot.label }}</span>
                </div>
              </Button>
            </div>
          </div>

          <!-- Selected Date & Time Summary -->
          <div 
            v-if="activeFilters.dateTime.date || activeFilters.dateTime.timeSlot"
            class="bg-muted rounded-lg p-3 space-y-2"
          >
            <p class="text-sm font-medium">Selected Availability</p>
            <div class="space-y-1.5">
              <div 
                v-if="activeFilters.dateTime.date"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon name="lucide:calendar" class="h-4 w-4" />
                <span>{{ format(activeFilters.dateTime.date, 'EEEE, MMMM d, yyyy') }}</span>
              </div>
              <div 
                v-if="activeFilters.dateTime.timeSlot"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon name="lucide:clock" class="h-4 w-4" />
                <span>
                  {{ timeSlots.find(s => s.value === activeFilters.dateTime.timeSlot)?.label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Price Filter -->
        <div v-if="openFilter === 'price'" class="grid gap-4">
          <!-- Price Range Header -->
          <div class="grid gap-4">
            <div class="flex items-center justify-between">
              <Label class="text-sm font-medium text-muted-foreground">Price Range (per hour)</Label>
              <div class="flex items-center gap-2">
                <Badge variant="outline" class="bg-background">
                  €{{ activeFilters.priceRange[0] }}
                </Badge>
                <span class="text-muted-foreground">to</span>
                <Badge variant="outline" class="bg-background">
                  €{{ activeFilters.priceRange[1] }}
                </Badge>
              </div>
            </div>
            
            <!-- Range Slider -->
            <div class="px-2">
              <Slider
                v-model="activeFilters.priceRange"
                :min="priceRange.min"
                :max="priceRange.max"
                :step="10"
                class="w-full"
              />
            </div>

            <!-- Price Scale Labels -->
            <div class="flex justify-between text-xs text-muted-foreground px-2">
              <span>€0</span>
              <span>€250</span>
              <span>€500</span>
            </div>
          </div>

          <!-- Quick Select Presets -->
          <div class="grid gap-3">
            <Label class="text-sm font-medium text-muted-foreground">Quick select</Label>
            <div class="grid grid-cols-2 gap-2">
              <Button
                v-for="preset in pricePresets"
                :key="preset.label"
                variant="outline"
                size="sm"
                class="w-full border transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 border-primary': 
                    activeFilters.priceRange[0] === preset.value[0] && 
                    activeFilters.priceRange[1] === preset.value[1]
                }"
                @click="activeFilters.priceRange = [...preset.value]"
              >
                {{ preset.label }}
              </Button>
            </div>
          </div>

          <!-- Results Summary -->
          <div class="bg-muted rounded-lg p-3">
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              {{ sortedVenues.length }} venues in this price range
            </p>
          </div>
        </div>

        <!-- Capacity Filter -->
        <div v-if="openFilter === 'capacity'" class="grid gap-4">
          <!-- Capacity Header -->
          <div class="grid gap-4">
            <div class="flex items-center justify-between">
              <Label class="text-sm font-medium text-muted-foreground">Minimum Capacity</Label>
              <Badge variant="outline" class="bg-background font-mono">
                {{ activeFilters.capacity }}+ people
              </Badge>
            </div>
            
            <!-- Capacity Slider -->
            <div class="px-2">
              <Slider
                v-model="activeFilters.capacity"
                :min="capacityRange.min"
                :max="capacityRange.max"
                :step="5"
                class="w-full"
              />
            </div>

            <!-- Capacity Scale Labels -->
            <div class="flex justify-between text-xs text-muted-foreground px-2">
              <span>{{ capacityRange.min }} people</span>
              <span>500 people</span>
              <span>{{ capacityRange.max }}+ people</span>
            </div>
          </div>

          <!-- Quick Select Presets -->
          <div class="grid gap-3">
            <Label class="text-sm font-medium text-muted-foreground">Quick select</Label>
            <div class="grid grid-cols-2 gap-2">
              <Button
                v-for="preset in [
                  { label: 'Small (20+)', value: 20 },
                  { label: 'Medium (50+)', value: 50 },
                  { label: 'Large (100+)', value: 100 },
                  { label: 'Extra Large (200+)', value: 200 }
                ]"
                :key="preset.label"
                variant="outline"
                size="sm"
                class="w-full border transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.capacity === preset.value
                }"
                @click="activeFilters.capacity = preset.value"
              >
                {{ preset.label }}
              </Button>
            </div>
          </div>

          <!-- Results Summary -->
          <div class="bg-muted rounded-lg p-3">
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              {{ sortedVenues.length }} venues can fit {{ activeFilters.capacity }}+ people
            </p>
          </div>
        </div>
      </div>

      <DialogFooter class="gap-2 pt-2">
        <Button
          variant="outline"
          class="w-full hover:bg-primary/5"
          @click="resetFilters"
        >
          Reset
        </Button>
        <Button 
          class="w-full"
          @click="closeFilterDialog"
        >
          Apply Filters
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Mobile Filters Modal -->
  <Dialog
    :open="isFilterModalOpen"
    @update:open="isFilterModalOpen = false"
  >
    <DialogContent 
      class="w-[80vw] max-w-3xl"
      :class="{
        'md:max-w-[425px]': isFilterModalOpen
      }"
    >
      <DialogHeader>
        <DialogTitle>Filters</DialogTitle>
        <DialogDescription>
          Refine your venue search
        </DialogDescription>
      </DialogHeader>
      
      <div class="space-y-4 py-4">
        <!-- Location Filter -->
        <div class="space-y-2">
          <Label class="flex items-center gap-2">
            <Icon
              name="lucide:map-pin"
              class="h-4 w-4 text-muted-foreground"
            />
            Location
          </Label>
          <Input
            v-model="activeFilters.location"
            placeholder="Enter location..."
            class="w-full"
          />
        </div>

        <!-- Price Range Filter -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <Label class="font-medium">Price Range (per hour)</Label>
            <div class="flex items-center gap-2 text-sm">
              <Badge variant="outline">
                €{{ activeFilters.priceRange[0] }}
              </Badge>
              <span class="text-muted-foreground">to</span>
              <Badge variant="outline">
                €{{ activeFilters.priceRange[1] }}
              </Badge>
            </div>
          </div>
          
          <div class="pt-2 px-2">
            <Slider
              v-model="activeFilters.priceRange"
              :min="priceRange.min"
              :max="priceRange.max"
              :step="10"
              class="w-full"
            />
          </div>

          <!-- Price Scale Labels -->
          <div class="flex justify-between text-xs text-muted-foreground px-2">
            <span>€0</span>
            <span>€250</span>
            <span>€500</span>
          </div>
        </div>

        <!-- Capacity Filter -->
        <div class="space-y-6">
          <!-- Capacity Header -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <Label class="font-medium">Minimum Capacity</Label>
              <Badge variant="outline" class="font-mono">
                {{ activeFilters.capacity }}+ people
              </Badge>
            </div>
            
            <!-- Capacity Slider -->
            <div class="pt-2 px-2">
              <Slider
                v-model="activeFilters.capacity"
                :min="capacityRange.min"
                :max="capacityRange.max"
                :step="5"
                class="w-full"
              />
            </div>

            <!-- Capacity Scale Labels -->
            <div class="flex justify-between text-xs text-muted-foreground px-2">
              <span>{{ capacityRange.min }} people</span>
              <span>500 people</span>
              <span>{{ capacityRange.max }}+ people</span>
            </div>
          </div>

          <!-- Quick Select Presets -->
          <div class="space-y-3">
            <Label class="text-sm">Quick select</Label>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="preset in [
                  { label: 'Small (20+)', value: 20 },
                  { label: 'Medium (50+)', value: 50 },
                  { label: 'Large (100+)', value: 100 },
                  { label: 'Extra Large (200+)', value: 200 }
                ]"
                :key="preset.label"
                variant="outline"
                size="sm"
                :class="{
                  'bg-primary/10': activeFilters.capacity === preset.value
                }"
                @click="activeFilters.capacity = preset.value"
              >
                {{ preset.label }}
              </Button>
            </div>
          </div>

          <!-- Results Summary -->
          <div class="pt-2">
            <p class="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              {{ sortedVenues.length }} venues can fit {{ activeFilters.capacity }}+ people
            </p>
          </div>
        </div>

        <!-- Amenities Filter -->
        <div class="space-y-2">
          <Label class="flex items-center gap-2">
            <Icon
              name="lucide:list-checks"
              class="h-4 w-4 text-muted-foreground"
            />
            Amenities
          </Label>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="amenity in amenityOptions"
              :key="amenity"
              variant="outline"
              class="cursor-pointer"
              :class="{ 'bg-primary/10': activeFilters.amenities.includes(amenity) }"
              @click="activeFilters.amenities.includes(amenity) 
                ? activeFilters.amenities = activeFilters.amenities.filter(a => a !== amenity)
                : activeFilters.amenities.push(amenity)"
            >
              {{ amenity }}
            </Badge>
          </div>
        </div>

        <!-- Date & Time Filter -->
        <div v-if="openFilter === 'dateTime'" class="grid gap-6">
          <!-- Date Selection Section -->
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Pick a date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  class="w-full justify-start text-left font-normal"
                  :class="!activeFilters.dateTime.date && 'text-muted-foreground'"
                >
                  <Icon
                    name="lucide:calendar"
                    class="mr-2 h-4 w-4"
                  />
                  {{ activeFilters.dateTime.date
                    ? format(activeFilters.dateTime.date, 'EEEE, MMMM d, yyyy')
                    : 'Select a date'
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0" align="start">
                <Calendar
                  v-model="activeFilters.dateTime.date"
                  :disabled-dates="{ before: new Date() }"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <!-- Time Slot Selection Section -->
          <div class="space-y-3">
            <Label class="text-sm font-medium text-muted-foreground">Select time slot</Label>
            <div class="flex flex-col gap-2">
              <Button
                v-for="slot in timeSlots"
                :key="slot.value"
                variant="outline"
                class="w-full justify-start px-4 py-3 transition-colors hover:bg-primary/5"
                :class="{
                  'bg-primary/10 border-primary': activeFilters.dateTime.timeSlot === slot.value,
                  'border': activeFilters.dateTime.timeSlot !== slot.value
                }"
                @click="activeFilters.dateTime.timeSlot = slot.value"
              >
                <div class="flex items-center gap-2">
                  <div 
                    class="size-4 rounded-full border-2"
                    :class="activeFilters.dateTime.timeSlot === slot.value 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'"
                  />
                  <span>{{ slot.label }}</span>
                </div>
              </Button>
            </div>
          </div>

          <!-- Selected Date & Time Summary -->
          <div 
            v-if="activeFilters.dateTime.date || activeFilters.dateTime.timeSlot"
            class="bg-muted rounded-lg p-3 space-y-2"
          >
            <p class="text-sm font-medium">Selected Availability</p>
            <div class="space-y-1.5">
              <div 
                v-if="activeFilters.dateTime.date"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon name="lucide:calendar" class="h-4 w-4" />
                <span>{{ format(activeFilters.dateTime.date, 'EEEE, MMMM d, yyyy') }}</span>
              </div>
              <div 
                v-if="activeFilters.dateTime.timeSlot"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon name="lucide:clock" class="h-4 w-4" />
                <span>
                  {{ timeSlots.find(s => s.value === activeFilters.dateTime.timeSlot)?.label }}
                </span>
              </div>
            </div>

            <!-- Results Count -->
            <p class="text-sm text-muted-foreground flex items-center gap-2 pt-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              {{ sortedVenues.length }} venues available at selected time
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          @click="resetFilters"
        >
          Reset
        </Button>
        <Button @click="isFilterModalOpen = false">
          Show Results ({{ sortedVenues.length }})
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
/* Add smooth transitions for view changes */
.grid {
  view-transition-name: venue-grid;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

[v-cloak] {
  display: none;
}

/* Enhanced slider styling */
:deep(.slider) {
  @apply relative flex items-center select-none touch-none w-full h-6;
}

:deep(.slider-track) {
  @apply relative w-full grow h-2 rounded-full bg-secondary;
}

:deep(.slider-range) {
  @apply absolute h-full rounded-full bg-primary;
}

:deep(.slider-thumb) {
  @apply block w-5 h-5 rounded-full border-2 border-primary bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50;
}

:deep(.slider-thumb:hover) {
  @apply bg-primary/10;
}

/* Add styles for Command component */
:deep(.command-input) {
  @apply border-0 focus:ring-0;
}

:deep(.command-item) {
  @apply cursor-pointer px-2 py-1.5 text-sm rounded-md hover:bg-accent;
}

:deep(.command-item[data-selected=true]) {
  @apply bg-accent;
}

/* Add styles for mobile bottom sheet */
.animate-in {
  animation: slideUp 0.2s ease-out;
}

.slide-in-from-bottom {
  transform-origin: bottom;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Ensure proper z-index stacking */
:deep(.leaflet-container) {
  z-index: 0;
}

/* Adjust mobile padding to account for bottom sheet */
@media (max-width: 768px) {
  .map-container {
    padding-bottom: env(safe-area-inset-bottom, 80px);
  }
}

/* Add styles for sticky buttons */
.sticky {
  position: sticky;
  background: linear-gradient(to top, var(--background) 80%, transparent);
  margin-bottom: -1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 10;
}

/* Ensure proper spacing on mobile */
@media (max-width: 768px) {
  .sticky {
    padding-bottom: env(safe-area-inset-bottom, 1rem);
  }
}

.group {
  cursor: pointer;
  will-change: transform, box-shadow;
}

.group:hover {
  transform: translateY(-2px);
}

/* Smooth shadow transition */
.group {
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease-in-out;
}

.group:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Add styles for horizontal scrolling on mobile */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Ensure minimum width for filter groups on mobile */
.min-w-min {
  min-width: min-content;
}

/* Prevent content overflow */
.truncate {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}
</style>
