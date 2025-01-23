<script setup lang="ts">
import { mockVenues } from "~/data/mockVenues";

const route = useRoute();
const venue = computed(() =>
  mockVenues.find((v) => v.id === Number(route.params.id))
);

const dialog = useDialog();

const totalCapacity = computed(
  () => venue.value?.areas.reduce((sum, area) => sum + area.capacity, 0) || 0
);

const minPrice = computed(
  () =>
    venue.value?.areas.reduce(
      (min, area) => Math.min(min, area.pricePerHour),
      Infinity
    ) || 0
);

const maxPrice = computed(
  () =>
    venue.value?.areas.reduce(
      (max, area) => Math.max(max, area.pricePerHour),
      0
    ) || 0
);

const handleBook = () => {
  if (!venue.value) return;
  dialog.open({
    component: "VenueBookingDialog",
    props: {
      venue: venue.value,
      onBook: (date: string, areaId: number) => {
        // Handle booking logic
        console.log("Booking venue for date:", date, "area:", areaId);
      },
    },
  });
};

const handleExploreAreas = () => {
  const areasSection = document.getElementById("areas-section");
  if (areasSection) {
    areasSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div v-if="venue">
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
                <h1
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4"
                >
                  {{ venue.name }}
                </h1>
                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-primary-foreground/80 mb-6"
                >
                  <div class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{
                      venue.address
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ph:users" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base"
                      >{{ totalCapacity }} people total</span
                    >
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon
                      name="ph:currency-eur"
                      class="w-4 h-4 md:w-5 md:h-5"
                    />
                    <span class="text-sm md:text-base"
                      >{{ minPrice }}-{{ maxPrice }}€/hour</span
                    >
                  </div>
                </div>

                <!-- Rating -->
                <div
                  class="flex items-center justify-center md:justify-start gap-2 text-primary-foreground mb-8"
                >
                  <div class="flex items-center gap-1">
                    <Icon name="ph:star-fill" class="w-5 h-5 text-warning" />
                    <span class="font-medium">{{ venue.rating }}</span>
                  </div>
                  <span class="text-primary-foreground/60"
                    >({{ venue.reviewCount }} reviews)</span
                  >
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-center md:justify-start gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    @click="handleExploreAreas"
                  >
                    <Icon name="ph:squares-four" class="w-5 h-5 mr-2" />
                    Explore Spaces
                  </Button>
                </div>
              </div>

              <!-- Right: Image -->
              <div
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  :src="venue.image"
                  :alt="venue.name"
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
          <div class="bg-card rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">About this Venue</h3>
            <p class="text-muted-foreground">{{ venue.description }}</p>
          </div>

          <!-- Areas -->
          <div
            id="areas-section"
            class="bg-card rounded-xl border p-6 scroll-mt-8"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold">Available Areas</h3>
              <Button variant="ghost" size="sm" @click="handleBook">
                View All Availability
              </Button>
            </div>
            <div class="grid sm:grid-cols-2 gap-6">
              <VenueAreaCard
                v-for="area in venue.areas"
                :key="area.id"
                :area="area"
                :venue="venue"
                :is-popular="area.pricePerHour === maxPrice"
              />
            </div>
          </div>

          <!-- Features -->
          <div class="bg-card rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Features</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="feature in venue.features"
                :key="feature"
                class="flex items-center gap-2"
              >
                <Icon name="ph:check-circle" class="w-5 h-5 text-success" />
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Dance Styles -->
          <div class="bg-card rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Dance Styles</h3>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="style in venue.styles"
                :key="style"
                variant="secondary"
              >
                {{ style }}
              </Badge>
            </div>
          </div>

          <!-- Location -->
          <div class="bg-card rounded-xl border p-6">
            <h3 class="text-lg font-bold mb-4">Location</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <Icon
                  name="ph:map-pin"
                  class="w-5 h-5 text-primary flex-shrink-0 mt-1"
                />
                <div>
                  <div class="font-medium">{{ venue.name }}</div>
                  <div class="text-muted-foreground">{{ venue.address }}</div>
                </div>
              </div>
              <!-- Map placeholder -->
              <div class="aspect-[4/3] bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Booking & Additional Info -->
        <div class="w-full md:w-96 space-y-8">
          <!-- Booking Card -->
          <div class="bg-card rounded-xl border p-6 sticky top-8">
            <h3 class="text-lg font-bold mb-4">Book this Venue</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Price range</span>
                <span class="font-medium"
                  >{{ minPrice }}-{{ maxPrice }}€/hour</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-muted-foreground">Total capacity</span>
                <span class="font-medium">{{ totalCapacity }} people</span>
              </div>
              <div class="text-sm text-muted-foreground">
                * Prices and capacity vary by area. Select an area when booking.
              </div>
              <Button class="w-full" size="lg" @click="handleBook">
                <Icon name="ph:calendar-check" class="w-5 h-5 mr-2" />
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
