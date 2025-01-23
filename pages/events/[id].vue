<script setup lang="ts">
import { mockEvents } from "@/data/mockEvents";
import { mockArtists } from "@/data/mockArtists";
import type { AnyEvent, Price } from "~/schemas/event";
import GradientBackground from "~/components/common/GradientBackground.vue";
import { formatDate } from "~/utils/format";
import UserPoints from "~/components/common/UserPoints.vue";
import Post from "~/components/post/Post.vue";
import { eventToFeedPost } from "~/schemas/event";

const route = useRoute();
const event = computed(
  () =>
    mockEvents.find((e) => String(e.id) === String(route.params.id)) as
      | AnyEvent
      | undefined
);

// Computed properties for UI
const formattedDate = computed(() => {
  if (!event.value) return "";
  const start = formatDate(event.value.date.start);
  const end = formatDate(event.value.date.end);
  return start === end ? start : `${start} - ${end}`;
});

const getPrice = (event: AnyEvent) => {
  if (!event.prices || event.prices.length === 0) {
    return "Unknown price";
  }

  if (event.prices?.length === 1) {
    if (event.prices[0].amount === 0) {
      return "Free";
    }

    return `${event.prices[0].amount} ${event.prices[0].currency}`;
  }

  const lowestPrice = event.prices.reduce(
    (min, p) => (p.amount < min.amount ? p : min),
    event.prices[0]
  );
  return `From ${lowestPrice.amount} ${lowestPrice.currency}`;
};

// Related events
const relatedEvents = computed(() => {
  if (!event.value) return [];

  return mockEvents
    .filter(
      (e) =>
        e.id !== event.value?.id &&
        (e.type === event.value?.type ||
          e.tags.some((t) => event.value?.tags.includes(t)))
    )
    .map((e): AnyEvent => {
      // Base event properties are already correct
      const base = {
        ...e,
        schedule: e.schedule || [],
      };

      // Return type-specific event
      switch (base.type) {
        case "workshop":
          return {
            ...base,
            type: "workshop",
            level: base.level || "all",
            prices: base.prices || [],
          };
        case "concert":
          return {
            ...base,
            type: "concert",
            venue: base.venue || { capacity: 0, seating: false },
          };
        case "festival":
          return {
            ...base,
            type: "festival",
            prices: base.prices || [],
          };
        case "party":
          return {
            ...base,
            type: "party",
          };
        default:
          throw new Error(`Unknown event type: ${base.type}`);
      }
    })
    .slice(0, 2);
});

// Event availability status
const availability = computed(() => {
  if (!event.value) return null;
  const capacity = 100; // This should come from the event data
  const interested = event.value.stats?.interested || 0;
  if (interested >= capacity) return "sold-out";
  if (interested >= capacity * 0.8) return "few-left";
  return "available";
});

// Going state
const isGoing = ref(false);

// Actions
const handleShare = () => {
  if (!event.value) return;
  console.log("Share event:", event.value.name);
};

const handleBookmark = () => {
  if (!event.value) return;
  console.log("Bookmark event:", event.value.name);
};

const handleGoing = () => {
  if (!event.value) return;
  isGoing.value = !isGoing.value;
  console.log(
    isGoing.value ? "Going to event" : "Not going to event",
    event.value.name
  );
};

const dialog = useDialog();

const handleBook = () => {
  if (!event.value) return;

  const prices = event.value.prices;

  if (!prices || prices.length === 0) {
    navigateTo(`/checkout/${event.value.id}`);
    return;
  }

  if (prices.length === 1) {
    navigateTo(`/checkout/${event.value.id}?priceId=${prices[0].id}`);
    return;
  }

  dialog.open({
    component: "PricingOptionsDialog",
    props: {
      prices: prices,
      onSelect: (selectedPrice: Price) => {
        // Navigate to checkout with selected price
        navigateTo(`/checkout/${event.value?.id}?priceId=${selectedPrice.id}`);
      },
    },
  });
};

interface Artist {
  id: number;
  name: string;
  roles: string[];
  image: string;
}

// Get artists for the event
const eventArtists = computed(() => {
  if (!event.value?.artists) return [];
  return event.value.artists
    .map((id) => mockArtists.find((artist) => String(artist.id) === String(id)))
    .filter((artist) => artist !== undefined);
});
</script>

<template>
  <div v-if="event">
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
                  <span class="text-sm md:text-base">{{ formattedDate }}</span>
                </div>
                <h1
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4"
                >
                  {{ event.name }}
                </h1>
                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-muted-foreground mb-4 md:mb-6"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base"
                      >{{ event.location.name }},
                      {{ event.location.city }}</span
                    >
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ph:ticket" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{
                      getPrice(event)
                    }}</span>
                  </div>
                  <div
                    v-if="event.type === 'workshop'"
                    class="flex items-center gap-2"
                  >
                    <Icon name="ph:chart-line" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.level }}</span>
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
                  <Button variant="secondary" size="lg" @click="handleBook">
                    Book Now
                  </Button>
                </div>

                <!-- Event Stats -->
                <div
                  class="flex justify-center md:justify-start gap-8 text-muted-foreground"
                >
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.interested || 0 }}
                    </div>
                    <div class="text-sm">guests</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.saves || 0 }}
                    </div>
                    <div class="text-sm">saves</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.views || 20 }}
                    </div>
                    <div class="text-sm">views</div>
                  </div>
                  <div>
                    <div class="text-xl font-bold text-foreground">
                      {{ event.stats?.shares || 1 }}
                    </div>
                    <div class="text-sm">shares</div>
                  </div>
                </div>
              </div>

              <!-- Right: Image -->
              <div
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  :src="event.image || '/images/event-placeholder.jpg'"
                  :alt="event.name"
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
          <Post v-if="event" :post="eventToFeedPost(event)" />

          <!-- Schedule -->
          <div v-if="event.schedule?.length">
            <h2 class="text-2xl font-bold mb-4">Schedule</h2>
            <div class="space-y-4">
              <div
                v-for="(item, index) in event.schedule"
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
                    <div class="font-medium">{{ item.time }}</div>
                    <div class="text-muted-foreground">{{ item.activity }}</div>
                    <p
                      v-if="item.description"
                      class="text-sm text-muted-foreground mt-1"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Artists -->
          <div v-if="event.artists?.length && eventArtists.length > 0">
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
                  <div class="text-sm text-gray-600">
                    {{ artist?.roles?.join(", ") }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Prerequisites & Policies -->
          <div v-if="event.type === 'workshop'" class="space-y-8">
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
                      This workshop is suitable for {{ event.level }} level
                      dancers. Previous experience with
                      {{ event.tags.join(" or ") }} is recommended.
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
          <div v-if="relatedEvents.length > 0">
            <h2 class="text-2xl font-bold mb-4">Related Events</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              <EventCard
                v-for="relatedEvent in relatedEvents"
                :key="relatedEvent.id"
                :event="relatedEvent"
              />
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6">
          <!-- Guests section -->
          <div class="bg-background rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Guests</h3>
            <Button class="w-full mb-6" variant="outline" @click="handleGoing">
              <Icon name="ph:users" class="w-5 h-5 mr-2" />
              {{ isGoing ? "Leave Guest List" : "Join Guest List" }}
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
                v-if="(event.stats?.interested || 0) > 5"
                class="text-sm text-muted-foreground mt-2"
              >
                and {{ (event.stats?.interested || 0) - 5 }} more guests
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
                  <div class="font-medium">{{ event.location.name }}</div>
                  <div class="text-gray-600">
                    {{ event.location.address }}
                    <div>
                      {{ event.location.city }}, {{ event.location.country }}
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
            v-if="event.type === 'workshop' && event.prices?.length"
            class="bg-background rounded-xl border p-6"
          >
            <h3 class="text-lg font-bold mb-4">Pricing Options</h3>
            <div class="space-y-4">
              <div
                v-for="price in event.prices"
                :key="price.name"
                class="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div>
                  <div class="font-medium">{{ price.name }}</div>
                  <div class="text-sm text-gray-600">
                    {{ price.description }}
                  </div>
                </div>
                <div class="font-bold whitespace-nowrap">
                  {{ price.amount }} {{ price.currency }}
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
