<script setup>
import { ref, computed } from 'vue'
const { $client } = useNuxtApp()
import GradientBackground from '~/components/common/GradientBackground.vue'
import { format, parseISO } from 'date-fns'

const route = useRoute()
const event = ref(null)
const loading = ref(true)
const error = ref(null)
const isGoing = ref(false)

// Format date function
const formatDate = (dateString) => {
  try {
    if (!dateString) return 'Date not available'

    // Handle both string and Date object
    if (typeof dateString === 'string') {
      return format(parseISO(dateString), 'MMMM d, yyyy')
    } else if (dateString instanceof Date) {
      return format(dateString, 'MMMM d, yyyy')
    }

    return 'Invalid date'
  } catch (e) {
    console.error('Date formatting error:', e)
    return 'Invalid date'
  }
}

// Format time function
const formatTime = (dateString) => {
  try {
    if (!dateString) return ''

    // Handle both string and Date object
    if (typeof dateString === 'string') {
      return format(parseISO(dateString), 'h:mm a')
    } else if (dateString instanceof Date) {
      return format(dateString, 'h:mm a')
    }

    return ''
  } catch (e) {
    return ''
  }
}

// Display date range
const dateRangeDisplay = computed(() => {
  if (!event.value) return ''

  const startFormatted = formatDate(event.value.startDate)
  const endFormatted = formatDate(event.value.endDate)

  // Add time if available
  const startTime = formatTime(event.value.startDate)
  const endTime = formatTime(event.value.endDate)

  const startDisplay = startTime
    ? `${startFormatted} at ${startTime}`
    : startFormatted
  const endDisplay = endTime ? `${endFormatted} at ${endTime}` : endFormatted

  return startFormatted === endFormatted
    ? startDisplay
    : `${startDisplay} - ${endDisplay}`
})

// Get venue display
const venueDisplay = computed(() => {
  if (!event.value?.venue) return 'Location not specified'
  return event.value.venue.name
})

// Get availability status
const availability = computed(() => {
  if (!event.value) return null
  const capacity = event.value.capacity || 100 // Default capacity if not specified
  const guestsCount = event.value.guests?.length || 0

  if (guestsCount >= capacity) return 'sold-out'
  if (guestsCount >= capacity * 0.8) return 'few-left'
  return 'available'
})

// Action handlers
const handleGoing = () => {
  isGoing.value = !isGoing.value
  // Add your logic to update the guest list
}

const handleBook = () => {
  // Add your booking logic here
  // For now, just log the action
  console.log('Booking event:', event.value?.name)
}

const fetchEvent = async () => {
  loading.value = true
  error.value = null

  try {
    const id = route.params.id
    const response = await $client.events.byId.query(id)
    console.log('Event details:', response)
    event.value = response
  } catch (e) {
    console.error('API error:', e)
    error.value = e?.message || 'Failed to load event'
  } finally {
    loading.value = false
  }
}

// Markdown renderer for description
const renderedDescription = computed(() => {
  if (!event.value?.description) return ''

  // Very basic markdown rendering for demonstration
  // In a real app, you'd use a proper markdown library
  return event.value.description
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
})

// Fetch event data on component mount
onMounted(() => {
  fetchEvent()
})
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
      ></div>
      <p class="mt-4 text-gray-600">Loading event details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Error Loading Event</h2>
      <p class="text-gray-500 mb-6">{{ error }}</p>
      <Button @click="fetchEvent">Try Again</Button>
    </div>
  </div>

  <!-- Event Content -->
  <div v-else-if="event" class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative min-h-[50vh]">
      <div
        class="relative flex items-center overflow-hidden min-h-[50vh] py-12"
      >
        <GradientBackground />

        <!-- Content -->
        <div class="relative w-full">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-8 items-center">
              <!-- Left: Content -->
              <div class="text-center md:text-left">
                <div
                  class="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-2 md:mb-4"
                >
                  <Icon name="ph:calendar" class="w-4 h-4 md:w-5 md:h-5" />
                  <span class="text-sm md:text-base">{{
                    dateRangeDisplay
                  }}</span>
                </div>

                <h1
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4"
                >
                  {{ event.name }}
                </h1>

                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-muted-foreground mb-4 md:mb-6"
                >
                  <div v-if="event.venue" class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ venueDisplay }}</span>
                  </div>

                  <div v-if="event.price" class="flex items-center gap-2">
                    <Icon name="ph:ticket" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.price }}</span>
                  </div>

                  <div v-if="event.type" class="flex items-center gap-2">
                    <Icon name="ph:music-notes" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.type }}</span>
                  </div>
                </div>

                <!-- Status & Social Proof -->
                <div class="flex items-center gap-4 text-muted-foreground mb-6">
                  <Badge
                    v-if="availability === 'sold-out'"
                    variant="destructive"
                  >
                    Sold Out
                  </Badge>
                  <Badge
                    v-else-if="availability === 'few-left'"
                    variant="secondary"
                  >
                    Few Spots Left
                  </Badge>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-center md:justify-start gap-4 mb-8">
                  <Button variant="primary" size="lg" @click="handleBook">
                    Book Now
                  </Button>
                </div>

                <!-- Event Stats -->
                <div
                  v-if="event.guests"
                  class="flex justify-center md:justify-start gap-8 text-muted-foreground"
                >
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      {{ event.guests.length }}
                    </div>
                    <div class="text-sm">guests</div>
                  </div>
                </div>
              </div>

              <!-- Right: Image -->
              <div
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  v-if="event.cover"
                  :src="event.cover"
                  :alt="event.name"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-gray-200 flex items-center justify-center"
                >
                  <span class="text-gray-400">No image available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        class="flex flex-col lg:flex-row justify-center gap-8 max-w-7xl mx-auto"
      >
        <!-- Left Column: Details -->
        <div class="space-y-8 lg:w-2/3">
          <postEventUpdate />
          <!-- Description -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-2xl font-bold mb-4">About this event</h2>
            <div class="prose max-w-none" v-html="renderedDescription"></div>
          </div>

          <!-- Schedule -->
          <div v-if="event.startDate" class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-2xl font-bold mb-4">Schedule</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <Icon name="ph:clock" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div class="font-medium">{{ dateRangeDisplay }}</div>
                  <div class="text-muted-foreground">{{ event.name }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dance Styles -->
          <div
            v-if="event.styles?.length"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 class="text-2xl font-bold mb-4">Dance Styles</h2>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="style in event.styles"
                :key="style.id"
                variant="secondary"
                class="px-3 py-1 text-sm"
              >
                {{ style.name }}
              </Badge>
            </div>
          </div>

          <!-- Organizers -->
          <div
            v-if="event.organizer || event.creator"
            class="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 class="text-2xl font-bold mb-4">Organizers</h2>
            <div class="space-y-4">
              <div v-if="event.organizer" class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    v-if="event.organizer.avatarUrl"
                    :src="event.organizer.avatarUrl"
                    :alt="event.organizer.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-bold">{{ event.organizer.name }}</div>
                  <div class="text-sm text-gray-500">Organizer</div>
                </div>
              </div>

              <div
                v-if="event.creator && event.creator.id !== event.organizer?.id"
                class="flex items-center gap-4"
              >
                <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    v-if="event.creator.avatarUrl"
                    :src="event.creator.avatarUrl"
                    :alt="event.creator.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-bold">{{ event.creator.name }}</div>
                  <div class="text-sm text-gray-500">Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6 lg:w-1/3">
          <!-- Guests section -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-bold mb-4">Guests</h3>
            <Button class="w-full mb-6" variant="outline" @click="handleGoing">
              <Icon name="ph:users" class="w-5 h-5 mr-2" />
              {{ isGoing ? 'Leave Guest List' : 'Join Guest List' }}
            </Button>

            <div v-if="event.guests?.length" class="space-y-3">
              <div
                v-for="guest in event.guests.slice(0, 5)"
                :key="guest.id"
                class="flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden"
                >
                  <img
                    :src="
                      guest.profile?.avatarUrl ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${guest.id}`
                    "
                    :alt="guest.profile?.name || 'Guest'"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-medium">
                    {{ guest.profile?.name || 'Guest' }}
                  </div>
                  <div class="text-sm text-gray-500">Going</div>
                </div>
              </div>

              <div
                v-if="event.guests.length > 5"
                class="text-sm text-gray-500 mt-2"
              >
                and {{ event.guests.length - 5 }} more guests
              </div>
            </div>

            <div v-else class="text-center text-gray-500 py-4">
              <p>Be the first to join!</p>
            </div>
          </div>

          <!-- Location -->
          <div v-if="event.venue" class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-bold mb-4">Location</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon
                  name="ph:map-pin"
                  class="w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
                />
                <div>
                  <div class="font-medium">{{ event.venue.name }}</div>
                  <div class="text-gray-500">
                    {{ event.venue.address }}
                    <div v-if="event.venue.city">
                      {{ event.venue.city }}, {{ event.venue.country }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map placeholder -->
              <div class="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  v-if="event.venue.mapUrl"
                  :src="event.venue.mapUrl"
                  alt="Map"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Price Details -->
          <div v-if="event.price" class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="text-lg font-bold mb-4">Pricing</h3>
            <div
              class="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium">Standard Ticket</div>
                <div v-if="event.type" class="text-sm text-gray-500">
                  {{ event.type }}
                </div>
              </div>
              <div class="font-bold text-lg">{{ event.price }}</div>
            </div>

            <Button class="w-full" variant="primary" @click="handleBook">
              <Icon name="ph:ticket" class="w-5 h-5 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon name="ph:calendar-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
      <p class="text-gray-500 mb-6">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/events">Browse Events</NuxtLink>
      </Button>
    </div>
  </div>
</template>

<style>
.prose {
  max-width: 65ch;
  line-height: 1.6;
}

.prose strong {
  font-weight: 600;
  color: #111827;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
</style>
