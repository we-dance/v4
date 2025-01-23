<script setup>
import { ref, computed } from "vue";
import ArtistCard from "@/components/ArtistCard.vue";
import { mockArtists } from "@/data/mockArtists";

const artists = mockArtists;

// Primary filter states
const searchQuery = ref("");
const selectedRole = ref("all");
const selectedLocation = ref("all");
const selectedLanguage = ref("all");

// Secondary filter states
const selectedLevel = ref("all");
const selectedSpecialty = ref("all");
const showAvailable = ref(false);

// Role-specific filter states
const selectedTeachingLevel = ref("all");
const selectedEquipment = ref("all");
const selectedInstruments = ref("all");
const selectedServices = ref([]);

// Filter options
const roleOptions = [
  { value: "all", label: "All" },
  { value: "instructor", label: "Instructors" },
  { value: "performer", label: "Performers" },
  { value: "choreographer", label: "Choreographers" },
  { value: "musician", label: "Musicians" },
  { value: "dj", label: "DJs" },
  { value: "videographer", label: "Videographers" },
];

const levelOptions = [
  { value: "all", label: "All Experience" },
  { value: "master", label: "Master" },
  { value: "advanced", label: "Advanced" },
];

const teachingLevelOptions = [
  { value: "all", label: "All Class Levels" },
  { value: "beginner", label: "Beginner Classes" },
  { value: "intermediate", label: "Intermediate Classes" },
  { value: "advanced", label: "Advanced Classes" },
];

// Dynamic filter options based on role
const serviceOptions = computed(() => {
  switch (selectedRole.value) {
    case "instructor":
      return [
        { value: "privateClasses", label: "Private Classes" },
        { value: "workshops", label: "Workshops" },
      ];
    case "videographer":
      return [
        { value: "eventCoverage", label: "Event Coverage" },
        { value: "promotional", label: "Promotional Content" },
      ];
    default:
      return [];
  }
});

const specialtiesOptions = computed(() => {
  const roleSpecificSpecialties = artists
    .filter(
      (artist) =>
        selectedRole.value === "all" ||
        artist.roles.includes(selectedRole.value)
    )
    .flatMap((artist) => artist.specialties || []);

  const specialties = new Set(roleSpecificSpecialties);
  return [
    { value: "all", label: "All Specialties" },
    ...Array.from(specialties).map((s) => ({ value: s, label: s })),
  ];
});

const equipmentOptions = computed(() => {
  const equipment = new Set(
    artists
      .filter(
        (artist) =>
          artist.roles.includes("dj") || artist.roles.includes("videographer")
      )
      .flatMap((artist) => artist.equipment || [])
  );
  return [
    { value: "all", label: "All Equipment" },
    ...Array.from(equipment).map((e) => ({ value: e, label: e })),
  ];
});

const instrumentOptions = computed(() => {
  const instruments = new Set(
    artists
      .filter((artist) => artist.roles.includes("musician"))
      .flatMap((artist) => artist.instruments || [])
  );
  return [
    { value: "all", label: "All Instruments" },
    ...Array.from(instruments).map((i) => ({ value: i, label: i })),
  ];
});

// Show filters based on role
const showTeachingLevels = computed(() => selectedRole.value === "instructor");
const showEquipment = computed(() =>
  ["dj", "videographer"].includes(selectedRole.value)
);
const showInstruments = computed(() => selectedRole.value === "musician");
const showServices = computed(() =>
  ["instructor", "videographer"].includes(selectedRole.value)
);

// Get unique locations from artists
const locationOptions = computed(() => {
  const locations = new Set(
    artists.map(
      (artist) => artist.availability?.currentLocation || artist.location
    )
  );
  return [
    { value: "all", label: "All Locations" },
    ...Array.from(locations).map((loc) => ({ value: loc, label: loc })),
  ];
});

// Get unique languages from artists
const languageOptions = computed(() => {
  const languages = new Set(
    artists.flatMap((artist) => artist.languages || [])
  );
  return [
    { value: "all", label: "All Languages" },
    ...Array.from(languages).map((lang) => ({ value: lang, label: lang })),
  ];
});

const filteredResults = computed(() => {
  let filtered = artists;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        artist.roles.some((role) =>
          role.includes(searchQuery.value.toLowerCase())
        ) ||
        artist.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedRole.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.roles.includes(selectedRole.value)
    );
  }

  // Level filter
  if (selectedLevel.value !== "all") {
    filtered = filtered.filter(
      (artist) => artist.level === selectedLevel.value
    );
  }

  // Location filter
  if (selectedLocation.value !== "all") {
    filtered = filtered.filter(
      (artist) =>
        (artist.availability?.currentLocation || artist.location) ===
        selectedLocation.value
    );
  }

  // Language filter
  if (selectedLanguage.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.languages?.includes(selectedLanguage.value)
    );
  }

  // Availability filter
  if (showAvailable.value) {
    filtered = filtered.filter(
      (artist) =>
        (artist.availability?.privateClasses ||
          artist.availability?.workshops) &&
        (!artist.availability?.touring || artist.availability?.currentLocation)
    );
  }

  // Teaching Level filter
  if (selectedTeachingLevel.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.experience?.teachingLevels?.includes(selectedTeachingLevel.value)
    );
  }

  // Specialty filter
  if (selectedSpecialty.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.specialties?.includes(selectedSpecialty.value)
    );
  }

  // Services filter
  if (selectedServices.value.length > 0) {
    filtered = filtered.filter((artist) =>
      selectedServices.value.some((service) => artist.availability?.[service])
    );
  }

  // Equipment filter (for DJs and Videographers)
  if (selectedEquipment.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.equipment?.includes(selectedEquipment.value)
    );
  }

  // Instruments filter (for Musicians)
  if (selectedInstruments.value !== "all") {
    filtered = filtered.filter((artist) =>
      artist.instruments?.includes(selectedInstruments.value)
    );
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return (
    selectedRole.value !== "all" ||
    selectedLocation.value !== "all" ||
    selectedLanguage.value !== "all" ||
    selectedServices.value.length > 0 ||
    selectedTeachingLevel.value !== "all" ||
    selectedSpecialty.value !== "all" ||
    selectedEquipment.value !== "all" ||
    selectedInstruments.value !== "all" ||
    showAvailable.value ||
    searchQuery.value !== "" ||
    sortBy.value !== "relevance"
  );
});

function clearFilters() {
  selectedRole.value = "all";
  selectedLocation.value = "all";
  selectedLanguage.value = "all";
  selectedServices.value = [];
  selectedTeachingLevel.value = "all";
  selectedSpecialty.value = "all";
  showAvailable.value = false;
  searchQuery.value = "";
  selectedEquipment.value = "all";
  selectedInstruments.value = "all";
  sortBy.value = "relevance";
}

function toggleService(service) {
  if (selectedServices.value.includes(service)) {
    selectedServices.value = selectedServices.value.filter(
      (s) => s !== service
    );
  } else {
    selectedServices.value.push(service);
  }
}

const showSearch = ref(false);

const sortBy = ref("relevance");

const sortedArtists = computed(() => {
  let results = filteredResults.value;

  switch (sortBy.value) {
    case "rating":
      return [...results].sort((a, b) => b.rating - a.rating);
    case "near":
      // Fake distances from Munich in km
      const distances = {
        // German cities first
        "Munich, Germany": 0,
        "Berlin, Germany": 584,
        // European cities
        "Amsterdam, Netherlands": 840,
        "Paris, France": 828,
        "London, UK": 1174,
        "Barcelona, Spain": 1352,
        "Madrid, Spain": 1807,
        // Other continents
        "Havana, Cuba": 8158,
        "Miami, USA": 7836,
        "Mexico City, Mexico": 9623,
        "Tokyo, Japan": 9147,
      };

      return [...results].sort((a, b) => {
        const locA = a.availability?.currentLocation || a.location;
        const locB = b.availability?.currentLocation || b.location;
        // If location isn't in our distances map, put it at the end
        const distA = distances[locA];
        const distB = distances[locB];
        if (distA === undefined && distB === undefined) return 0;
        if (distA === undefined) return 1;
        if (distB === undefined) return -1;
        return distA - distB;
      });
    default:
      return results;
  }
});
</script>

<template>
  <!-- Add background to filters -->
  <div class="bg-muted">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- Role Filter with Search -->
      <div class="flex items-center gap-4 overflow-x-auto">
        <div class="flex gap-2 flex-1">
          <Button
            v-for="role in roleOptions"
            :key="role.value"
            :variant="selectedRole === role.value ? 'default' : 'outline'"
            @click="selectedRole = role.value"
            class="whitespace-nowrap"
          >
            {{ role.label }}
          </Button>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            class="text-gray-500"
            @click="showSearch = !showSearch"
          >
            <Icon
              :name="showSearch ? 'ph:x' : 'ph:magnifying-glass'"
              class="h-4 w-4"
            />
          </Button>
          <Input
            v-show="showSearch"
            v-model="searchQuery"
            placeholder="Search by name..."
            type="search"
            class="w-[180px] transition-all duration-200"
          />
        </div>

        <Select v-model="sortBy" class="w-[140px] shrink-0">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="near">Nearest First</SelectItem>
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

        <Select v-model="selectedLanguage">
          <SelectTrigger class="w-[140px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in languageOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="selectedLevel">
          <SelectTrigger class="w-[160px]">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in levelOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>

        <!-- Availability Toggle -->
        <div class="flex items-center gap-2">
          <Switch v-model="showAvailable" />
          <span class="text-sm text-gray-600">Available for Booking</span>
        </div>
      </div>

      <!-- Role-Specific Filters -->
      <div v-if="selectedRole !== 'all'" class="space-y-4 pt-4 border-t">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Teaching Levels -->
          <Select v-if="showTeachingLevels" v-model="selectedTeachingLevel">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Class Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in teachingLevelOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Equipment -->
          <Select v-if="showEquipment" v-model="selectedEquipment">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in equipmentOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Instruments -->
          <Select v-if="showInstruments" v-model="selectedInstruments">
            <SelectTrigger class="w-[160px]">
              <SelectValue placeholder="Instruments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in instrumentOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Specialties -->
          <Select v-model="selectedSpecialty">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in specialtiesOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Services Buttons -->
        <div v-if="showServices" class="flex flex-wrap gap-2">
          <Button
            v-for="service in serviceOptions"
            :key="service.value"
            size="sm"
            :variant="
              selectedServices.includes(service.value) ? 'default' : 'outline'
            "
            @click="toggleService(service.value)"
          >
            {{ service.label }}
          </Button>
        </div>
      </div>
    </div>
  </div>

  <!-- Artists Grid -->
  <div class="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        class="mx-auto h-12 w-12 text-gray-400"
      />
      <h3 class="mt-2 text-sm font-semibold text-gray-900">No artists found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Try adjusting your search terms or clear the search.
      </p>
    </div>
  </div>
</template>
