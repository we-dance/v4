<script setup lang="ts">
import GradientBackground from "~/components/common/GradientBackground.vue";
import { getDanceStyles } from "@/data/mockStyles";

// Search state
const searchQuery = ref("");

// Dance styles with filter
const danceStyles = computed(() => {
  const styles = getDanceStyles();
  if (!searchQuery.value) return styles.slice(0, 3);

  const query = searchQuery.value.toLowerCase();
  const filtered = styles.filter((style) =>
    style.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    return [
      {
        name: "Can't find your style?",
        image: "/images/dance-styles/not-found.jpg",
        to: "/contact",
        members: 0,
      },
    ];
  }

  return filtered.slice(0, 3);
});

const searchResults = computed(() => {
  if (!searchQuery.value) return null;

  const query = searchQuery.value.toLowerCase();
  const styles = getDanceStyles();

  // Find exact family match first
  const family = styles.find(
    (s) => !s.family && s.name.toLowerCase() === query
  );

  // Find all styles in the family
  const familyStyles = styles.filter(
    (s) => s.family && s.family.toLowerCase() === query
  );

  // Find styles by name or aliases
  const styleMatches = styles.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.aliases?.some((a) => a.toLowerCase().includes(query))
  );

  if (family || familyStyles.length > 0) {
    // If it's a family search, show family + its styles
    return {
      family,
      styles: familyStyles,
      type: "family",
    };
  }

  if (styleMatches.length > 0) {
    // If it's a style search, show parent family + matching styles
    const firstMatch = styleMatches[0];
    const parentFamily = styles.find(
      (s) => !s.family && s.name.toLowerCase() === firstMatch.family
    );

    return {
      family: parentFamily,
      styles: styleMatches,
      type: "style",
    };
  }

  return null;
});
</script>

<template>
  <div class="relative min-h-[60vh] flex items-center overflow-hidden">
    <GradientBackground />

    <!-- Content -->
    <div class="relative w-full py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1
            class="text-5xl md:text-7xl font-extrabold text-primary-foreground tracking-tight"
          >
            Let's dance?
          </h1>
          <p
            class="text-lg md:text-xl text-primary-foreground/80 mt-4 mb-12 max-w-2xl mx-auto"
          >
            Join a global community of dancers, learn from the best, and
            discover events worldwide
          </p>

          <!-- Search Section -->
          <div class="flex flex-col items-center gap-8">
            <div class="w-full max-w-lg">
              <div class="relative group">
                <Input
                  v-model="searchQuery"
                  variant="on-dark"
                  placeholder="Try 'salsa' or search by style..."
                  class="h-14 pl-12 pr-4 text-lg font-medium rounded-2xl"
                />
                <Icon
                  name="ph:magnifying-glass"
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                />
              </div>
              <div class="mt-3 text-center">
                <p class="text-primary-foreground/70">
                  New to dancing?
                  <NuxtLink
                    to="/quiz"
                    class="text-primary-foreground hover:text-primary font-medium ml-1"
                  >
                    Take our style quiz
                    <Icon
                      name="ph:arrow-right"
                      class="inline-block w-4 h-4 ml-0.5"
                    />
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Search Results -->
            <div v-if="searchResults" class="w-full max-w-3xl">
              <!-- Family Card -->
              <div
                v-if="searchResults.family"
                class="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-xl font-semibold text-white mb-2">
                      {{ searchResults.family.name }}
                    </h3>
                    <p class="text-white/80">
                      {{ searchResults.family.description }}
                    </p>
                  </div>
                  <NuxtLink
                    :to="searchResults.family.to"
                    class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                  >
                    Explore Family
                  </NuxtLink>
                </div>
              </div>

              <!-- Style Cards -->
              <div class="grid md:grid-cols-2 gap-4">
                <NuxtLink
                  v-for="style in searchResults.styles"
                  :key="style.to"
                  :to="style.to"
                  class="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors group"
                >
                  <h4 class="text-lg font-semibold text-white mb-2">
                    {{ style.name }}
                  </h4>
                  <p class="text-white/70 text-sm mb-3">
                    {{ style.description }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="alias in style.aliases"
                      :key="alias"
                      class="px-2 py-1 bg-white/10 text-white/90 text-xs rounded-full"
                    >
                      {{ alias }}
                    </span>
                  </div>
                  <div class="mt-4 text-sm text-white/60">
                    {{ style.members.toLocaleString() }} dancers
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Popular Styles (when no search) -->
            <div
              v-else
              class="grid md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto"
            >
              <StyleCard
                v-for="style in danceStyles"
                :key="style.name"
                :style="style"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
