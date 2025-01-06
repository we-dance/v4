# Create the salsa family page
<script setup lang="ts">
import { ref, computed } from "vue";
import { getDanceStyles } from "~/data/mockStyles";
import { mockEvents } from "~/data/mockEvents";
import { mockPosts } from "~/data/mockPosts";
import type { ArticlePost } from "~/schemas/post";

// Get salsa family and its styles
const styles = computed(() => {
  const allStyles = getDanceStyles();
  return {
    family: allStyles.find((s) => s.name === "Salsa"),
    styles: allStyles.filter((s) => s.family === "salsa"),
  };
});

// Get beginner-friendly content
const beginnerContent = computed(
  () =>
    mockPosts.filter((p) => {
      if (p.type !== "article") return false;
      const tags = p.content.tags || [];
      return tags.some((tag) =>
        ["beginner-guide", "salsa-basics", "getting-started"].includes(tag)
      );
    }) as ArticlePost[]
);

// Get upcoming events
const upcomingEvents = computed(() =>
  mockEvents
    .filter((e) => {
      const tags = e.tags || [];
      return tags.some((tag) => tag.includes("salsa"));
    })
    .slice(0, 3)
);
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4">Welcome to Salsa</h1>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Discover different styles of salsa dancing and find your perfect match.
        Each style has its own unique character, music, and community.
      </p>

      <!-- Quick Actions -->
      <div class="flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="default">Find Local Classes</Button>
        <Button size="lg" variant="outline">Compare Styles</Button>
        <Button size="lg" variant="outline">Take Style Quiz</Button>
      </div>
    </section>

    <!-- Style "Train Station" -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Choose Your Style</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <NuxtLink
          v-for="style in styles.styles"
          :key="style.to"
          :to="style.to"
          class="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <!-- Style Image -->
          <div class="aspect-video rounded-t-xl overflow-hidden">
            <img
              :src="style.image"
              :alt="style.name"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Style Info -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ style.name }}</h3>
                <p class="text-gray-600">{{ style.description }}</p>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-purple-600">
                  {{ style.members.toLocaleString() }} dancers
                </div>
              </div>
            </div>

            <!-- Style Characteristics -->
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="alias in style.aliases"
                  :key="alias"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {{ alias }}
                </span>
              </div>

              <ul
                v-if="style.characteristics"
                class="text-sm text-gray-600 space-y-1"
              >
                <li
                  v-for="char in style.characteristics.slice(0, 3)"
                  :key="char"
                  class="flex items-center"
                >
                  <Icon
                    name="ph:check-circle"
                    class="w-4 h-4 text-green-500 mr-2"
                  />
                  {{ char }}
                </li>
              </ul>
            </div>

            <!-- Join CTA -->
            <div class="mt-6">
              <span
                class="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700"
              >
                Join Community
                <Icon name="ph:arrow-right" class="w-4 h-4 ml-2" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Getting Started</h2>

      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in beginnerContent"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
        >
          <div class="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              :src="post.content.cover"
              :alt="post.content.title"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="font-semibold mb-2">{{ post.content.title }}</h3>
          <p class="text-sm text-gray-600">{{ post.content.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="mb-16">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Upcoming Events</h2>
        <NuxtLink
          to="/events?style=salsa"
          class="text-purple-600 hover:text-purple-700"
        >
          View All
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="event in upcomingEvents"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="aspect-video rounded-t-lg overflow-hidden">
            <img
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">{{ event.name }}</h3>
            <div class="text-sm text-gray-600">
              <div class="mb-1">
                {{ new Date(event.date.start).toLocaleDateString() }}
              </div>
              <div>{{ event.location.city }}, {{ event.location.country }}</div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
