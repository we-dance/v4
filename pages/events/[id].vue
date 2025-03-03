<script setup>
import { ref, onMounted } from 'vue'
import { trpc } from '~/composables/trpc'
import GradientBackground from '~/components/common/GradientBackground.vue'
import Post from '~/components/post/Post.vue'
import { format, parseISO } from 'date-fns'

const result = ref(null)
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)

// Query parameters
const status = ref('upcoming')
const type = ref('')
const limit = ref(10)

async function fetchEvents() {
  loading.value = true
  error.value = null

  try {
    const params = { limit: limit.value }
    if (status.value) params.status = status.value
    if (type.value) params.type = type.value

    console.log('Fetching events with params:', params)

    const id = useRoute().params.id
    const response = await trpc.events.byId.query(id)
    console.log('API result:', response)

    // Ensure result has expected structure
    result.value =
      response && typeof response === 'object'
        ? response
        : { name: null, type: null, items: [] } // Fallback structure
  } catch (e) {
    console.error('API error:', e)
    error.value = e?.message || 'Unknown error'
    result.value = { name: null, type: null, items: [] } // Fallback on error
  } finally {
    loading.value = false
  }
}

// Auto-fetch on mount
onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <!-- for loading only -->
  <div v-if="loading && !result" class="text-center py-20">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
    ></div>
    <p class="mt-4 text-gray-600">Loading events...</p>
  </div>

  <!-- Results section -->
  <div v-else-if="result && result.items?.length" class="space-y-6">
    <div
      class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
    >
      <div>
        <span class="font-medium text-gray-800"
          >{{ result.items?.length || 0 }} events found</span
        >
        <span v-if="result.nextCursor" class="ml-2 text-sm text-gray-500"
          >(more available)</span
        >
      </div>
    </div>
  </div>

  <div v-if="result && result.name">
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
                  <!-- <span class="text-sm md:text-base">{{ formattedDate(result.startDate) }}</span> -->
                </div>
                <h1
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4"
                >
                  {{ result.name }}
                </h1>
                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-muted-foreground mb-4 md:mb-6"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                    <!-- <span class="text-sm md:text-base"
                      >{{ event.location.name }},
                      {{ event.location.city }}</span -->
                    >
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ph:ticket" class="w-4 h-4 md:w-5 md:h-5" />
                    <!-- <span class="text-sm md:text-base">{{
                      getPrice(result.price)
                    }}</span> -->
                  </div>
                  <!-- <div
                    v-if="result.type === 'workshop'"
                    class="flex items-center gap-2"
                  >
                    <Icon name="ph:chart-line" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.level }}</span>
                  </div> -->
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
                  <Button variant="primary" size="lg"> Book Now </Button>
                </div>

                <!-- Event Stats -->
                <div
                  class="flex justify-center md:justify-start gap-8 text-muted-foreground"
                >
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      <!-- {{ event.stats?.interested || 0 }} -->
                    </div>
                    <div class="text-sm">guests</div>
                  </div>
                  <div>
                    <!-- <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.saves || 0 }}
                    </div> -->
                    <div class="text-sm">saves</div>
                  </div>
                  <div>
                    <!-- <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.views || 20 }}
                    </div> -->
                    <div class="text-sm">views</div>
                  </div>
                  <div>
                    <!-- <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.shares || 1 }}
                    </div> -->
                    <div class="text-sm">shares</div>
                  </div>
                </div>
              </div>

              <!-- Right: Image -->
              <div
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  v-if="result.cover"
                  :src="result.cover || '/images/event-placeholder.jpg'"
                  :alt="result.cover"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        class="flex flex-col md:flex-row justify-center gap-8 max-w-7xl mx-auto"
      >
        <!-- Left Column: Details -->
        <div class="space-y-8 max-w-xl">
          <!-- Description -->

          <!-- for post remembeer it i have to do later -->
          <!-- <Post v-if="result" :post="eventToFeedPost(result)" /> -->

          <!-- Schedule -->
          <div v-if="result.startDate?.length">
            <h2 class="text-2xl font-bold mb-4">Schedule</h2>
            <div class="space-y-4">
              <div
                v-for="(item, index) in result.startDate"
                :key="index"
                class="bg-background rounded-lg border p-4"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="ph:clock" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div class="font-medium">{{ result.startDate }}</div>
                    <div class="text-muted-foreground">{{ result.title }}</div>
                    <p
                      v-if="result.description"
                      class="text-sm text-muted-foreground mt-1"
                    >
                      {{ result.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Artists -->
          <!-- <div v-if="event.artists?.length && eventArtists.length > 0">
            <h2 class="text-2xl font-bold mb-4">Featured Artists</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <div
                v-for="artist in eventArtists"
                :key="artist?.id"
                class="bg-background rounded-lg border p-4 flex items-center gap-4"
              >
                <div
                  class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                >
                  <img
                    :src="artist?.image"
                    :alt="artist?.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-medium">{{ artist?.name }}</div>
                  <div class="text-sm text-muted-foreground">
                    {{ artist?.roles?.join(', ') }}
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- Prerequisites & Policies -->
          <div v-if="result.type === 'workshop'" class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold mb-4">Prerequisites</h2>
              <div class="bg-background rounded-lg border p-4">
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="ph:info" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div class="font-medium">Required Level</div>
                    <p class="text-muted-foreground">
                      This workshop is suitable for {{ result.name }} level
                      dancers. Previous experience with
                      {{ event.tags.join(' or ') }} is recommended.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-2xl font-bold mb-4">Policies</h2>
              <div class="space-y-4">
                <div class="bg-background rounded-lg border p-4">
                  <div class="flex items-start gap-4">
                    <div
                      class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Icon name="ph:scroll" class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div class="font-medium">Cancellation Policy</div>
                      <p class="text-muted-foreground">
                        Full refund up to 7 days before the event. 50% refund up
                        to 48 hours before the event. No refunds within 48 hours
                        of the event.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-background rounded-lg border p-4">
                  <div class="flex items-start gap-4">
                    <div
                      class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                    >
                      <Icon name="ph:users" class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div class="font-medium">Partner Requirements</div>
                      <p class="text-muted-foreground">
                        No partner required. We will rotate partners during the
                        workshop to ensure everyone gets to practice with
                        different dancers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Events -->
          <!-- <div v-if="relatedEvents.length > 0">
            <h2 class="text-2xl font-bold mb-4">Related Events</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <EventCard
                v-for="relatedEvent in relatedEvents"
                :key="relatedEvent.id"
                :event="relatedEvent"
              />
            </div>
          </div> -->
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6">
          <!-- Guests section -->
          <div class="bg-background rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Guests</h3>
            <Button class="w-full mb-6" variant="outline" @click="handleGoing">
              <Icon name="ph:users" class="w-5 h-5 mr-2" />
              {{ isGoing ? 'Leave Guest List' : 'Join Guest List' }}
            </Button>
            <div class="space-y-3">
              <div v-for="i in 5" :key="i" class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full border-2 border-border overflow-hidden"
                >
                  <img
                    :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=guest${i}`"
                    :alt="'Guest ' + i"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div class="font-medium">Guest {{ i }}</div>
                  <div class="text-sm text-muted-foreground">Going</div>
                </div>
              </div>
              <div
                v-if="(result.stats?.interested || 0) > 5"
                class="text-sm text-muted-foreground mt-2"
              >
                and {{ (result.stats?.interested || 0) - 5 }} more guests
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="bg-background rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Location</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon
                  name="ph:map-pin"
                  class="w-5 h-5 text-primary flex-shrink-0 mt-1"
                />
                <div>
                  <div class="font-medium">{{ result.name }}</div>
                  <div class="text-muted-foreground">
                    <!-- {{ event.location.address }} -->
                    <div>
                      <!-- {{ event.location.city }}, {{ event.location.country }} -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- Map placeholder -->
              <div class="aspect-[4/3] bg-accent rounded-lg"></div>
            </div>
          </div>

          <!-- Price Details -->
          <div
            v-if="result.type === 'workshop' && result.prices?.length"
            class="bg-background rounded-xl border p-6"
          >
            <h3 class="text-lg font-bold mb-4">Pricing Options</h3>
            <div class="space-y-4">
              <div
                v-if="result.prices.length === 1"
                :key="result.name"
                class="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div>
                  <div class="font-medium">{{ result.name }}</div>
                  <div class="text-sm text-muted-foreground">
                    {{ result.description }}
                  </div>
                </div>
                <div class="font-bold whitespace-nowrap">
                  {{ result.price }} {{ result.price }}
                </div>
              </div>
            </div>
            <Button class="w-full mt-6" variant="primary" @click="handleBook">
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
      <Icon
        name="ph:calendar-x"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">Event Not Found</h2>
      <p class="text-muted-foreground mb-6">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/events">Browse Events</NuxtLink>
      </Button>
    </div>
  </div>
</template>
