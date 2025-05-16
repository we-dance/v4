<script setup lang="ts">
import GradientBackground from '~/components/common/GradientBackground.vue'
import { format, parseISO } from 'date-fns'
import { getDate } from '~/utils'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

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

const dateRangeDisplay = computed(() => {
  if (!props.event) return ''

  const startFormatted = formatDate(props.event.startDate)
  const endFormatted = formatDate(props.event.endDate)

  // Add time if available
  const startTime = formatTime(props.event.startDate)
  const endTime = formatTime(props.event.endDate)

  const startDisplay = startTime
    ? `${startFormatted} at ${startTime}`
    : startFormatted
  const endDisplay = endTime ? `${endFormatted} at ${endTime}` : endFormatted

  return startFormatted === endFormatted
    ? startDisplay
    : `${startDisplay} - ${endDisplay}`
})

const availability = computed(() => {
  if (!props.event) return null
  const capacity = props.event.capacity || 100 // Default capacity if not specified
  const guestsCount = props.event.guests?.length || 0

  if (guestsCount >= capacity) return 'sold-out'
  if (guestsCount >= capacity * 0.8) return 'few-left'
  return 'available'
})

const { $client } = useNuxtApp()
const rsvp = (status: 'registered' | 'interested' | 'cancelled') => {
  $client.events.rsvp.mutate({
    eventId: props.event.id,
    status,
  })
}
const { session } = useAppAuth()
const rsvpStatus = computed(() => {
  return props.event.guests?.find(
    (guest) => guest.profileId === session.value?.profile?.id
  )?.status
})

const navigation = computed(() => [
  {
    label: 'About',
    to: `/events/${props.event?.id}`,
    icon: 'ph:info',
  },
  {
    label: 'Feed',
    to: `/events/${props.event?.id}/feed`,
    icon: 'ph:newspaper',
  },
])
</script>

<template>
  <!-- Loading State -->
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-background text-foreground"
  >
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
  <div v-else-if="event" class="min-h-screen">
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
              <div class="text-center md:text-left text-muted-foreground">
                <Badge>{{ event.type }}</Badge>

                <div
                  class="mt-4 flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-4"
                >
                  <span class="text-sm md:text-base">{{
                    getDate(event.startDate)
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
                    <span class="text-sm md:text-base">{{
                      event.venue.name
                    }}</span>
                  </div>

                  <div v-if="event.price" class="flex items-center gap-2">
                    <Icon name="ph:ticket" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.price }}</span>
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
                <div class="mb-8">
                  <template v-if="rsvpStatus === 'registered'">
                    <div class="text-sm text-muted-foreground mb-2">
                      You are going to this event
                    </div>
                    <Button variant="destructive" @click="rsvp('cancelled')">
                      I can't go
                    </Button>
                  </template>
                  <template v-else>
                    <div class="flex justify-center md:justify-start gap-4">
                      <Button
                        variant="primary"
                        size="lg"
                        @click="rsvp('registered')"
                      >
                        Going
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        @click="rsvp('interested')"
                      >
                        Interested
                      </Button>
                    </div>
                  </template>
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
                v-if="event.cover"
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  :src="event.cover"
                  :alt="event.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-muted">
      <div class="flex space-x-8 overflow-x-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
          :class="[
            $route.path === item.to.split('#')[0]
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          ]"
        >
          <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
    <!-- Main Content -->
    <div
      class="bg-background text-foreground max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        class="flex flex-col lg:flex-row justify-center gap-8 max-w-7xl mx-auto"
      >
        <!-- Left Column: Details -->
        <div class="lg:w-2/3">
          <slot>
            <!-- Description -->
            <div class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">About this event</h2>
              <TPreview :content="event.description" />
            </div>

            <!-- Schedule -->
            <div v-if="event.startDate" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Schedule</h2>
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
            <div v-if="event.styles?.length" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Dance Styles</h2>
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
            <div v-if="event.organizer || event.creator" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Organizers</h2>
              <div class="space-y-4">
                <ProfileCard
                  v-if="event.organizer"
                  :profile="event.organizer"
                />

                <div class="flex items-center gap-4">
                  <div>
                    <div class="text-sm">
                      Added
                      <template v-if="event.creator">
                        by
                        <NuxtLink
                          :to="`/@${event.creator.username}`"
                          class="font-bold"
                          >{{ event.creator.name }}</NuxtLink
                        >
                      </template>
                      on {{ formatDate(event.createdAt) }}
                    </div>
                    <div class="text-sm">
                      Last updated on {{ formatDate(event.updatedAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6 lg:w-1/3">
          <!-- Guests section -->
          <div class="rounded-xl shadow-sm p-6">
            <h3 class="text-xs uppercase font-bold mb-4">Who's going?</h3>

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
                  <div class="text-sm text-gray-500">
                    {{ guest.status }}
                  </div>
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
          <div v-if="event.venue" class="rounded-xl shadow-sm p-6">
            <h3 class="text-xs uppercase font-bold mb-4">Location</h3>
            <div class="space-y-4">
              <a :href="event.venue.mapUrl" target="_blank">
                <div class="flex items-start gap-3">
                  <Icon
                    name="ph:map-pin"
                    class="w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
                  />
                  <div>
                    <div class="font-medium">{{ event.venue.name }}</div>
                    <div class="text-gray-500">
                      {{ event.venue.formattedAddress }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
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
