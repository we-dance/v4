<script setup lang="ts">
import { mockVenues } from "~/data/mockVenues";
import type { Area, Package, Service, Venue } from "@/types";
import type { DialogArea, DialogVenue } from "@/types/dialog";

const route = useRoute();
const dialog = useDialog();

const venue = computed<Venue | undefined>(() => {
  const found = mockVenues.find((v) => v.id === Number(route.params.id));
  if (!found) return undefined;

  return {
    ...found,
    services: found.services?.map((s) => ({
      ...s,
      type: s.type as "per_hour" | "per_event",
    })) as Service[],
  };
});

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

const toDialogArea = (area: Area) => {
  const { pricing, ...rest } = area;
  return {
    ...rest,
    pricePerHour: pricing.hourly,
  } as DialogArea;
};

const toDialogVenue = (v: Venue): DialogVenue => ({
  id: v.id,
  name: v.name,
  areas: v.areas.map(toDialogArea),
});

const openAreaDetails = (area: Area) => {
  if (!venue.value) return;
  dialog.open({
    component: "VenueAreaDetailsDialog",
    props: {
      area,
      venue: {
        id: venue.value.id,
        name: venue.value.name,
        areas: venue.value.areas,
      },
    },
  });
};

const openBooking = (target?: Area | Package) => {
  if (!venue.value) return;
  dialog.open({
    component: "VenueBookingDialog",
    props: {
      venue: {
        id: venue.value.id,
        name: venue.value.name,
        areas: venue.value.areas,
      },
      selectedAreaId: target && "pricing" in target ? target.id : undefined,
      onBook: (date: string, areaId: number) => {
        console.log("Booking:", { date, areaId });
      },
    },
  });
};
</script>

<template>
  <div v-if="venue" class="space-y-8">
    <!-- Hero Section -->
    <div class="relative h-[400px] w-full overflow-hidden rounded-lg">
      <img
        :src="venue.image"
        :alt="venue.name"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
      />
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h1 class="text-3xl font-bold">{{ venue.name }}</h1>
        <p class="mt-2 flex items-center gap-2">
          <span class="flex items-center">
            {{ venue.rating }}
            <Icon name="star" class="ml-1 h-4 w-4" />
          </span>
          <span>({{ venue.reviewCount }} reviews)</span>
          <span>•</span>
          <span>{{ venue.address }}</span>
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Left Column: Details -->
      <div class="lg:col-span-2 space-y-6">
        <div>
          <h2 class="text-2xl font-semibold">About</h2>
          <p class="mt-2 text-muted-foreground">{{ venue.description }}</p>
        </div>

        <div>
          <h2 class="text-2xl font-semibold">Features</h2>
          <ul class="mt-2 flex flex-wrap gap-2">
            <li
              v-for="feature in venue.features"
              :key="feature"
              class="rounded-full bg-muted px-3 py-1 text-sm"
            >
              {{ feature }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-2xl font-semibold">Dance Styles</h2>
          <ul class="mt-2 flex flex-wrap gap-2">
            <li
              v-for="style in venue.styles"
              :key="style"
              class="rounded-full bg-muted px-3 py-1 text-sm"
            >
              {{ style }}
            </li>
          </ul>
        </div>

        <!-- Areas -->
        <div>
          <h2 class="text-2xl font-semibold">Areas</h2>
          <div class="mt-4 space-y-4">
            <Card v-for="area in venue.areas" :key="area.id">
              <CardHeader>
                <CardTitle>{{ area.name }}</CardTitle>
                <CardDescription>{{ area.description }}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 class="font-medium">Details</h4>
                    <ul class="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Capacity: {{ area.capacity }} people</li>
                      <li>
                        Size: {{ area.size.width }}x{{ area.size.length }}x{{
                          area.size.height
                        }}{{ area.size.unit }}
                      </li>
                      <li>Floor: {{ area.floorType }}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 class="font-medium">Pricing</h4>
                    <ul class="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>Hourly: €{{ area.pricing.hourly }}</li>
                      <li>Daily: €{{ area.pricing.daily }}</li>
                      <li>Weekly: €{{ area.pricing.weekly }}</li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4">
                  <h4 class="font-medium">Amenities</h4>
                  <ul class="mt-2 flex flex-wrap gap-2">
                    <li
                      v-for="amenity in area.amenities"
                      :key="amenity"
                      class="rounded-full bg-muted px-3 py-1 text-xs"
                    >
                      {{ amenity }}
                    </li>
                  </ul>
                </div>

                <div class="mt-4 flex gap-2">
                  <Button @click="openAreaDetails(area)">View Details</Button>
                  <Button variant="default" @click="openBooking(area)"
                    >Book Now</Button
                  >
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Packages -->
        <div v-if="venue.packages?.length">
          <h2 class="text-2xl font-semibold">Packages</h2>
          <div class="mt-4 space-y-4">
            <Card v-for="pkg in venue.packages" :key="pkg.id">
              <CardHeader>
                <CardTitle>{{ pkg.name }}</CardTitle>
                <CardDescription>{{ pkg.description }}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <ul class="space-y-1 text-sm text-muted-foreground">
                      <li>Duration: {{ pkg.duration }}</li>
                      <li>Price: €{{ pkg.price }}</li>
                      <li>Minimum bookings: {{ pkg.minimumBookings }}</li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4">
                  <Button variant="default" @click="openBooking(pkg)"
                    >Book Package</Button
                  >
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <!-- Right Column: Booking Card -->
      <div class="lg:col-span-1">
        <Card class="sticky top-4">
          <CardHeader>
            <CardTitle>Book this venue</CardTitle>
            <CardDescription>
              Choose from various booking options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium">Full Venue Pricing</h4>
                <ul class="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Hourly: €{{ venue.fullVenuePricing.hourly }}</li>
                  <li>Daily: €{{ venue.fullVenuePricing.daily }}</li>
                  <li>Weekly: €{{ venue.fullVenuePricing.weekly }}</li>
                </ul>
              </div>

              <div v-if="venue.services?.length">
                <h4 class="font-medium">Available Services</h4>
                <ul class="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li v-for="service in venue.services" :key="service.id">
                    {{ service.name }} - €{{ service.price }}/{{
                      service.type === "per_hour" ? "hour" : "event"
                    }}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full" @click="openBooking()"
              >Book Full Venue</Button
            >
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="text-muted-foreground">Venue not found</p>
  </div>
</template>
