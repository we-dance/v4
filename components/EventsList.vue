<script setup lang="ts">
import { ref, computed } from "vue";
import { mockEvents } from "~/data/mockEvents";
import type { AnyEvent } from "~/schemas/event";
import EventCard from "~/components/event/EventCard.vue";

// Get minimum price for an event
const getMinPrice = (event: AnyEvent): { amount: number; currency: string } => {
  // Check prices array
  if (event.prices?.length) {
    const minPrice = event.prices.reduce((min, p) => p.amount < min.amount ? p : min, event.prices[0]);
    return { amount: minPrice.amount, currency: minPrice.currency };
  }

  // If no prices, consider it free
  return { amount: 0, currency: "EUR" };
};

// Currency conversion rates (simplified for example)
const currencyRates = {
  EUR: 1,
  GBP: 1.17, // 1 GBP = 1.17 EUR
  USD: 0.92  // 1 USD = 0.92 EUR
};

// Convert price to EUR for comparison
const convertToEUR = (price: { amount: number; currency: string }): number => {
  return price.amount * (currencyRates[price.currency as keyof typeof currencyRates] || 1);
};

const events = ref(mockEvents);

// Primary filter states
const searchQuery = ref("");
const selectedType = ref("all");
const selectedStatus = ref("upcoming");
const selectedLocation = ref("all");
const selectedMonth = ref("all");
const selectedPriceRange = ref("all");
const sortBy = ref("date");

// Filter options
const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "party", label: "Social Party" },
  { value: "workshop", label: "Workshop" },
  { value: "concert", label: "Concert" },
  { value: "festival", label: "Festival" },
];

const statusOptions = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Happening Now" },
  { value: "past", label: "Past Events" },
];

const priceRangeOptions = [
  { value: "all", label: "Any Price" },
  { value: "free", label: "Free" },
  { value: "0-20", label: "Under 20€" },
  { value: "20-50", label: "20-50€" },
  { value: "50+", label: "50€+" },
];

// Get unique locations from events
const locationOptions = computed(() => {
  const locations = new Set(events.value.map((event) => event.location.city));
  return [
    { value: "all", label: "All Locations" },
    ...Array.from(locations).map((loc) => ({ value: loc, label: loc })),
  ];
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    selectedType.value !== "all" ||
    selectedStatus.value !== "upcoming" ||
    selectedLocation.value !== "all" ||
    selectedMonth.value !== "all" ||
    selectedPriceRange.value !== "all" ||
    searchQuery.value !== "" ||
    sortBy.value !== "date"
  );
});

// Clear all filters
function clearFilters() {
  selectedType.value = "all";
  selectedStatus.value = "upcoming";
  selectedLocation.value = "all";
  selectedMonth.value = "all";
  selectedPriceRange.value = "all";
  searchQuery.value = "";
  sortBy.value = "date";
}

// Filter events
const filteredEvents = computed(() => {
  let filtered = events.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.city.toLowerCase().includes(query) ||
        event.organizer.name.toLowerCase().includes(query)
    );
  }

  // Type filter
  if (selectedType.value !== "all") {
    filtered = filtered.filter((event) => event.type === selectedType.value);
  }

  // Status filter
  if (selectedStatus.value !== "all") {
    filtered = filtered.filter(
      (event) => event.status === selectedStatus.value
    );
  }

  // Location filter
  if (selectedLocation.value !== "all") {
    filtered = filtered.filter(
      (event) => event.location.city === selectedLocation.value
    );
  }

  // Price range filter
  if (selectedPriceRange.value !== "all") {
    filtered = filtered.filter((event) => {
      const price = getMinPrice(event);
      const priceInEUR = convertToEUR(price);

      switch (selectedPriceRange.value) {
        case "free":
          return priceInEUR === 0;
        case "0-20":
          return priceInEUR > 0 && priceInEUR <= 20;
        case "20-50":
          return priceInEUR > 20 && priceInEUR <= 50;
        case "50+":
          return priceInEUR > 50;
        default:
          return true;
      }
    });
  }

  return filtered;
});

// Sort events
const sortedEvents = computed(() => {
  const events = [...filteredEvents.value];

  switch (sortBy.value) {
    case "date":
      return events.sort(
        (a, b) => +new Date(a.date.start) - +new Date(b.date.start)
      );
    case "price-low":
      return events.sort(
        (a, b) => convertToEUR(getMinPrice(a)) - convertToEUR(getMinPrice(b))
      );
    case "price-high":
      return events.sort(
        (a, b) => convertToEUR(getMinPrice(b)) - convertToEUR(getMinPrice(a))
      );
    default:
      return events;
  }
});

// Add these functions after other functions
const handleShare = (event: AnyEvent) => {
  console.log("Share event:", event.name);
};

const handleBookmark = (event: AnyEvent) => {
  console.log("Bookmark event:", event.name);
};

const handleBook = (event: AnyEvent) => {
  console.log("Book event:", event.name);
};
</script>

<template>
  <div class="bg-muted">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- Role Filter with Search -->
      <div class="flex items-center gap-4 overflow-x-auto">
        <div class="flex gap-2 flex-1">
          <Button
            v-for="type in typeOptions"
            :key="type.value"
            :variant="selectedType === type.value ? 'default' : 'outline'"
            @click="selectedType = type.value"
            class="whitespace-nowrap"
          >
            {{ type.label }}
          </Button>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <Input
            v-model="searchQuery"
            placeholder="Search events..."
            type="search"
            class="w-[180px]"
          />
        </div>

        <Select v-model="sortBy" class="w-[140px] shrink-0">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
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
            <SelectItem
              v-for="option in locationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedStatus">
          <SelectTrigger class="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedPriceRange">
          <SelectTrigger class="w-[160px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in priceRangeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>

  <!-- Events Grid -->
  <div class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <EventCard
      v-for="event in sortedEvents"
      :key="event.id"
      :event="event"
      @share="handleShare"
      @bookmark="handleBookmark"
      @book="handleBook"
    />

    <!-- Empty State -->
    <div
      v-if="sortedEvents.length === 0"
      class="col-span-full text-center py-12"
    >
      <Icon
        name="ph:calendar-x"
        class="mx-auto h-12 w-12 text-muted-foreground"
      />
      <h3 class="mt-2 text-sm font-semibold text-foreground">
        No events found
      </h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Try adjusting your search terms or clear the search.
      </p>
    </div>
  </div>
</template>
