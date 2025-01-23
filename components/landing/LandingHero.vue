<script setup lang="ts">
import GradientBackground from "~/components/common/GradientBackground.vue";
import { getDanceStyles } from "@/data/mockStyles";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

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
</script>

<template>
  <div class="relative min-h-[60vh] flex items-center overflow-hidden">
    <GradientBackground />

    <!-- Content -->
    <div class="relative w-full py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1
            class="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight"
          >
            {{ title }}
          </h1>
          <p
            class="text-lg md:text-xl text-muted-foreground mt-4 mb-12 max-w-2xl mx-auto"
          >
            {{ description }}
          </p>

          <!-- Dance Style Selection -->
          <div class="flex flex-col items-center gap-8">
            <div class="w-full max-w-lg">
              <div class="relative group">
                <Input
                  v-model="searchQuery"
                  variant="on-dark"
                  placeholder="Search dance styles..."
                  class="h-14 pl-12 pr-4 text-lg font-medium rounded-2xl"
                />
                <Icon
                  name="ph:magnifying-glass"
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground transition-colors duration-200"
                />
              </div>
              <div class="mt-3 text-center">
                <p class="text-muted-foreground">
                  New to dancing?
                  <NuxtLink
                    to="/quiz"
                    class="text-foreground hover:text-primary font-medium ml-1"
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

            <div class="grid grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
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
