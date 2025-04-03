<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import ArtistCard from '@/components/ArtistCard.vue'
import { trpc } from '~/composables/trpc'
import { toast } from 'vue-sonner'

const result = ref(null)
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)

const limit = ref(9)
const page = ref(1)
const hasMore = ref(false)

async function fetchArtists() {
  loading.value = true
  error.value = null
  try {
    const queryParams = {
      limit: limit.value,
      page: 1,
      role: selectedRole.value ? selectedRole.value : undefined,
      location:
        selectedLocation.value !== 'all' ? selectedLocation.value : undefined,
      language:
        selectedLanguage.value !== 'all' ? selectedLanguage.value : undefined,
      query: searchQuery.value || undefined,
    }

    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key]
    )

    console.log('Fetching artists with params:', queryParams)

    const response = await trpc.profiles.artists.query(queryParams)

    result.value = response.artists
    hasMore.value = response.hasMore

    console.log(
      'Received artists:',
      response.artists.length,
      'hasMore:',
      response.hasMore
    )
  } catch (e) {
    console.error('API error:', e)
    toast.error(`Failed to fetch artists: ${e?.message || 'Unknown error'}`)
    error.value = e?.message || 'Failed to fetch artists'
    result.value = null
    hasMore.value = false
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (loadingMore.value) return

  loadingMore.value = true
  page.value++

  try {
    const queryParams = {
      limit: limit.value,
      page: page.value,
      role: selectedRole.value ? selectedRole.value : undefined,
      location:
        selectedLocation.value !== 'all' ? selectedLocation.value : undefined,
      language:
        selectedLanguage.value !== 'all' ? selectedLanguage.value : undefined,
      query: searchQuery.value || undefined,
    }

    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key]
    )

    console.log('Loading more with params:', queryParams)

    const nextPageResponse = await trpc.profiles.artists.query(queryParams)

    console.log(
      'Received more artists:',
      nextPageResponse.artists.length,
      'hasMore:',
      nextPageResponse.hasMore
    )

    if (nextPageResponse && nextPageResponse.artists.length > 0) {
      result.value = [...(result.value || []), ...nextPageResponse.artists]
      hasMore.value = nextPageResponse.hasMore
    } else {
      hasMore.value = false
    }
  } catch (e) {
    console.error('Error loading more artists:', e)
    toast.error(`Failed to load more artists: ${e?.message || 'Unknown error'}`)
    error.value = `Error loading more results: ${e?.message || 'Unknown error'}`
  } finally {
    loadingMore.value = false
  }
}

onMounted(() => {
  fetchArtists()
  fetchLocations()
  fetchLanguages()
})

const artists = computed(() => result.value || [])

const searchQuery = ref('')
const selectedRole = ref('')
const selectedLocation = ref('all')
const selectedLanguage = ref('all')

watch([selectedRole, selectedLocation, selectedLanguage], () => {
  page.value = 1
  console.log('Filter changed:', {
    role: selectedRole.value,
    location: selectedLocation.value,
    language: selectedLanguage.value,
  })
  fetchArtists()
})

let searchTimeout = null
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    page.value = 1
    fetchArtists()
  }, 300)
})

const selectedLevel = ref('all')
const selectedSpecialty = ref('all')
const showAvailable = ref(false)

const selectedTeachingLevel = ref('all')
const selectedEquipment = ref('all')
const selectedInstruments = ref('all')
const selectedServices = ref([])

const roleOptions = [
  { value: 'instructor', label: 'Instructors' },
  { value: 'performer', label: 'Performers' },
  { value: 'choreographer', label: 'Choreographers' },
  { value: 'musician', label: 'Musicians' },
  { value: 'dj', label: 'DJs' },
  { value: 'videographer', label: 'Videographers' },
]

const levelOptions = [
  { value: 'all', label: 'All Experience' },
  { value: 'master', label: 'Master' },
  { value: 'advanced', label: 'Advanced' },
]

const teachingLevelOptions = [
  { value: 'all', label: 'All Class Levels' },
  { value: 'beginner', label: 'Beginner Classes' },
  { value: 'intermediate', label: 'Intermediate Classes' },
  { value: 'advanced', label: 'Advanced Classes' },
]

const serviceOptions = computed(() => {
  switch (selectedRole.value) {
    case 'instructor':
      return [
        { value: 'privateClasses', label: 'Private Classes' },
        { value: 'workshops', label: 'Workshops' },
      ]
    case 'videographer':
      return [
        { value: 'eventCoverage', label: 'Event Coverage' },
        { value: 'promotional', label: 'Promotional Content' },
      ]
    default:
      return []
  }
})

const specialtiesOptions = computed(() => {
  const roleSpecificSpecialties = artists.value
    .filter(
      (artist) =>
        !selectedRole.value || artist.roles?.includes(selectedRole.value)
    )
    .flatMap((artist) => artist.specialties || [])

  const specialties = new Set(roleSpecificSpecialties)
  return [
    { value: 'all', label: 'All Specialties' },
    ...Array.from(specialties).map((s) => ({ value: s, label: s })),
  ]
})

const equipmentOptions = computed(() => {
  const equipment = new Set(
    artists.value
      .filter(
        (artist) =>
          artist.roles?.includes('dj') || artist.roles?.includes('videographer')
      )
      .flatMap((artist) => artist.equipment || [])
  )
  return [
    { value: 'all', label: 'All Equipment' },
    ...Array.from(equipment).map((e) => ({ value: e, label: e })),
  ]
})

const instrumentOptions = computed(() => {
  const instruments = new Set(
    artists.value
      .filter((artist) => artist.roles?.includes('musician'))
      .flatMap((artist) => artist.instruments || [])
  )
  return [
    { value: 'all', label: 'All Instruments' },
    ...Array.from(instruments).map((i) => ({ value: i, label: i })),
  ]
})

const showTeachingLevels = computed(() => selectedRole.value === 'instructor')
const showEquipment = computed(() =>
  ['dj', 'videographer'].includes(selectedRole.value)
)
const showInstruments = computed(() => selectedRole.value === 'musician')
const showServices = computed(() =>
  ['instructor', 'videographer'].includes(selectedRole.value)
)

const allLocations = ref([])
const locationOptions = computed(() => {
  return [
    { value: 'all', label: 'All Locations' },
    ...allLocations.value.map((loc) => ({ value: loc, label: loc })),
  ]
})

const loadingLocations = ref(false)
async function fetchLocations() {
  loadingLocations.value = true
  try {
    const locations = await trpc.profiles.artistLocations.query()
    allLocations.value = locations || []
  } catch (e) {
    console.error('Error fetching locations:', e)
  } finally {
    loadingLocations.value = false
  }
}

const allLanguages = ref([])
const loadingLanguages = ref(false)
const languageOptions = computed(() => {
  return [
    { value: 'all', label: 'All Languages' },
    ...allLanguages.value.map((lang) => ({ value: lang, label: lang })),
  ]
})

async function fetchLanguages() {
  loadingLanguages.value = true
  try {
    const languages = await trpc.profiles.artistLanguages.query()
    allLanguages.value = languages || []
  } catch (e) {
    console.error('Error fetching languages:', e)
  } finally {
    loadingLanguages.value = false
  }
}

const filteredResults = computed(() => artists.value)

const hasActiveFilters = computed(() => {
  return (
    selectedRole.value ||
    selectedLocation.value !== 'all' ||
    selectedLanguage.value !== 'all' ||
    searchQuery.value !== '' ||
    sortBy.value !== 'relevance'
  )
})

function clearFilters() {
  selectedLocation.value = 'all'
  selectedLanguage.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'relevance'

  selectedRole.value = ''

  page.value = 1

  if (showSearch.value) {
    toggleSearch()
  }

  fetchArtists()
}

function toggleService(service) {
  if (selectedServices.value.includes(service)) {
    selectedServices.value = selectedServices.value.filter((s) => s !== service)
  } else {
    selectedServices.value.push(service)
  }
}

const showSearch = ref(false)
const searchInput = ref(null)

function toggleSearch() {
  showSearch.value = !showSearch.value

  if (showSearch.value) {
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })
  } else {
    searchQuery.value = ''
  }
}

const sortBy = ref('relevance')

const sortedArtists = computed(() => filteredResults.value)
</script>

<template>
  <div class="bg-muted">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div class="flex items-center gap-4 overflow-x-auto">
        <div class="flex gap-2 flex-1">
          <Button
            v-for="role in roleOptions"
            :key="role.value"
            :variant="selectedRole === role.value ? 'default' : 'outline'"
            @click="
              selectedRole = selectedRole === role.value ? '' : role.value
            "
            :disabled="true"
            :class="{ 'opacity-50 cursor-not-allowed': true }"
            class="whitespace-nowrap"
          >
            {{ role.label }}
            <span class="text-xs ml-1 text-muted-foreground"></span>
          </Button>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            class="text-muted-foreground"
            @click="toggleSearch"
          >
            <Icon
              :name="showSearch ? 'ph:x' : 'ph:magnifying-glass'"
              class="h-4 w-4"
            />
          </Button>
          <Transition name="slide" mode="out-in">
            <div v-if="showSearch" class="relative w-[220px] opacity-100">
              <Input
                ref="searchInput"
                v-model="searchQuery"
                placeholder="Search by name..."
                type="search"
                class="w-full"
              >
                <template #prefix>
                  <Icon
                    name="ph:magnifying-glass"
                    class="h-4 w-4 text-muted-foreground"
                  />
                </template>
                <template #suffix v-if="searchQuery">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-4 w-4 p-0"
                    @click="searchQuery = ''"
                  >
                    <Icon name="ph:x" class="h-3 w-3" />
                  </Button>
                </template>
              </Input>
            </div>
          </Transition>
        </div>

        <Select v-model="sortBy" class="w-[140px] shrink-0">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="rating" disabled>Highest Rated </SelectItem>
            <SelectItem value="near" disabled>Nearest First </SelectItem>
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
            <div
              v-if="loadingLocations"
              class="flex items-center justify-center py-2"
            >
              <Icon name="ph:spinner-gap" class="h-4 w-4 animate-spin mr-2" />
              <span class="text-xs">Loading locations...</span>
            </div>
            <SelectItem
              v-else
              v-for="option in locationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedLanguage">
          <SelectTrigger class="w-[140px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <div
              v-if="loadingLanguages"
              class="flex items-center justify-center py-2"
            >
              <Icon name="ph:spinner-gap" class="h-4 w-4 animate-spin mr-2" />
              <span class="text-xs">Loading languages...</span>
            </div>
            <SelectItem
              v-else
              v-for="option in languageOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedLevel" disabled>
          <SelectTrigger class="w-[160px] opacity-50 cursor-not-allowed">
            <SelectValue placeholder="Experience Level" />
            <span class="text-xs ml-1 text-muted-foreground"></span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in levelOptions"
              :key="option.value"
              :value="option.value"
              disabled
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <!-- Availability Toggle -->
        <div class="flex items-center gap-2 opacity-50 cursor-not-allowed">
          <Switch v-model="showAvailable" disabled />
          <span class="text-sm text-muted-foreground"
            >Available for Booking <span class="text-xs"></span
          ></span>
        </div>

        <div class="flex items-center ml-auto">
          <span class="text-xs text-muted-foreground flex items-center gap-1">
            <Icon name="ph:info" class="h-3.5 w-3.5" />
            Other filters coming soon
          </span>
        </div>
      </div>

      <div v-if="selectedRole" class="space-y-4 pt-4 border-t opacity-50">
        <div class="text-xs text-muted-foreground mb-2">
          Additional filters coming soon
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Select
            v-if="showTeachingLevels"
            v-model="selectedTeachingLevel"
            disabled
          >
            <SelectTrigger class="w-[180px] cursor-not-allowed">
              <SelectValue placeholder="Class Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in teachingLevelOptions"
                :key="option.value"
                :value="option.value"
                disabled
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select v-if="showEquipment" v-model="selectedEquipment" disabled>
            <SelectTrigger class="w-[180px] cursor-not-allowed">
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in equipmentOptions"
                :key="option.value"
                :value="option.value"
                disabled
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select v-if="showInstruments" v-model="selectedInstruments" disabled>
            <SelectTrigger class="w-[160px] cursor-not-allowed">
              <SelectValue placeholder="Instruments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in instrumentOptions"
                :key="option.value"
                :value="option.value"
                disabled
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="selectedSpecialty" disabled>
            <SelectTrigger class="w-[180px] cursor-not-allowed">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in specialtiesOptions"
                :key="option.value"
                :value="option.value"
                disabled
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div v-if="showServices" class="flex flex-wrap gap-2">
          <Button
            v-for="service in serviceOptions"
            :key="service.value"
            size="sm"
            :variant="
              selectedServices.includes(service.value) ? 'default' : 'outline'
            "
            disabled
            class="cursor-not-allowed"
          >
            {{ service.label }}
          </Button>
        </div>
      </div>
    </div>
  </div>

  <!-- Artists Grid -->
  <div class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Loading State -->
    <div v-if="loading" class="col-span-full text-center py-12">
      <div class="flex flex-col items-center">
        <Icon
          name="ph:spinner-gap"
          class="h-8 w-8 animate-spin mb-4 text-primary"
        />
        <p class="text-muted-foreground">Loading artists...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500 text-center py-4 col-span-full">
      <Icon name="ph:warning-circle" class="h-8 w-8 mb-2 mx-auto" />
      <p>{{ error }}</p>
      <Button variant="outline" size="sm" class="mt-4" @click="fetchArtists">
        Try Again
      </Button>
    </div>

    <!-- Artists Display -->
    <template v-else>
      <ArtistCard
        v-for="artist in sortedArtists"
        :key="artist.id"
        :artist="artist"
      />

      <!-- Empty State -->
      <div
        v-if="sortedArtists.length === 0"
        class="col-span-full text-center py-12"
      >
        <Icon
          name="ph:user-circle-minus"
          class="mx-auto h-12 w-12 text-muted-foreground"
        />
        <h3 class="mt-2 text-sm font-semibold text-foreground">
          No artists found
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Try adjusting your search terms or clear the search.
        </p>
      </div>
    </template>
  </div>

  <!-- Load More Button -->
  <div v-if="hasMore && !loading && !error" class="text-center py-8">
    <Button @click="loadMore" :disabled="loadingMore">
      <Icon
        v-if="loadingMore"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="loadingMore">Loading more...</span>
      <span v-else>Load More Artists</span>
    </Button>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
  width: 0;
}
</style>
