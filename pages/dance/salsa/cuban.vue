<script setup lang="ts">
import { ref } from "vue";
import { getMockCommunities } from "~/data/mockCommunities";
import { mockEvents } from "~/data/mockEvents";
import { mockPosts } from "~/data/mockPosts";
import type { Post } from "~/schemas/post";
import type { AnyEvent } from "~/schemas/event";
import CommunityCard from "~/components/community/CommunityCard.vue";

const communities = ref(
  getMockCommunities().filter((c) => c.style === "Cuban")
);

// Filter events and ensure they match the AnyEvent type
const events = ref(
  mockEvents.filter((e) => {
    const tags = e.tags || [];
    return tags.includes("cuban-salsa") || tags.includes("casino");
  })
);

// Filter for article posts only
const learningPosts = ref(
  mockPosts.filter((p) => {
    if (p.type !== "article") return false;
    const tags = p.content.tags || [];
    return tags.some((tag: string) =>
      ["cuban-salsa", "basics", "tutorial", "casino", "rueda"].includes(tag)
    );
  }).filter((p): p is Extract<Post, { type: "article" }> => p.type === "article")
);

const culturePosts = ref(
  mockPosts.filter((p) => {
    if (p.type !== "article") return false;
    const tags = p.content.tags || [];
    return tags.some((tag: string) =>
      ["cuban-culture", "history", "music", "timba"].includes(tag)
    );
  }).filter((p): p is Extract<Post, { type: "article" }> => p.type === "article")
);

const musicStyles = [
  {
    name: "Timba",
    description: "Modern Cuban dance music with complex rhythms",
    examples: ["Los Van Van", "Havana D'Primera", "Pupy y Los Que Son Son"],
  },
  {
    name: "Casino Music",
    description: "Traditional Cuban dance music",
    examples: ["Son Cubano", "Rumba", "Guaguancó"],
  },
];

const characteristics = [
  "Circular dance style",
  "Strong Afro-Cuban influence",
  "Complex turn patterns (ruedas)",
  "Emphasis on musicality and improvisation",
  "Social dance focus",
];

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = "none";
  }
};

// Helper function to get price display
const getEventPrice = (event: AnyEvent) => {
  if (!event.prices?.length) return "Free";
  const price = event.prices[0];
  return `${price.amount}${price.currency}`;
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Cuban Style Salsa (Casino)</h1>
      <p class="text-xl text-gray-600">
        Experience the vibrant, circular style of Cuban salsa with its rich
        Afro-Cuban roots
      </p>
    </div>

    <!-- Style Overview -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">About Cuban Style</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Key Characteristics</h3>
          <ul class="space-y-2">
            <li
              v-for="(char, index) in characteristics"
              :key="index"
              class="flex items-center"
            >
              <span class="mr-2">•</span>
              {{ char }}
            </li>
          </ul>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Music Styles</h3>
          <div class="space-y-4">
            <div v-for="style in musicStyles" :key="style.name">
              <h4 class="font-medium">{{ style.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ style.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="example in style.examples"
                  :key="example"
                  class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {{ example }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Communities Section -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Communities</h2>
        <NuxtLink
          to="/communities?style=cuban-salsa"
          class="text-purple-600 hover:text-purple-700"
        >
          View All
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <CommunityCard
          v-for="community in communities"
          :key="community.id"
          :community="community"
        />
      </div>
    </section>

    <!-- Events Section -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Upcoming Events</h2>
        <NuxtLink
          to="/events?style=cuban-salsa"
          class="text-purple-600 hover:text-purple-700"
        >
          View All
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="aspect-video rounded-t-lg overflow-hidden bg-gray-100">
            <NuxtImg
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-lg">{{ event.name }}</h3>
              <span
                class="text-sm bg-purple-50 text-purple-600 px-2 py-1 rounded-full"
              >
                {{ event.tags[0] }}
              </span>
            </div>
            <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center text-gray-500">
                <span class="w-20">When:</span>
                <span>{{
                  new Date(event.date.start).toLocaleDateString()
                }}</span>
                <span
                  >{{ event.date.start.split("T")[1].slice(0, 5) }} -
                  {{ event.date.end.split("T")[1].slice(0, 5) }}</span
                >
              </div>
              <div class="flex items-center text-gray-500">
                <span class="w-20">Where:</span>
                <span
                  >{{ event.location.name }}, {{ event.location.city }}</span
                >
              </div>
              <div class="flex items-center text-gray-500">
                <span class="w-20">Price:</span>
                <span>{{ getEventPrice(event) }}</span>
              </div>
              <div class="flex items-center text-gray-500">
                <span class="w-20">By:</span>
                <span>{{ event.organizer.name }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Learn Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Learn Cuban Style</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Getting Started</h3>
          <div class="space-y-4">
            <NuxtLink
              v-for="post in learningPosts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="group block"
            >
              <div class="flex gap-4">
                <div class="w-24 h-16 rounded overflow-hidden bg-gray-100">
                  <NuxtImg
                    :src="post.content.cover"
                    :alt="post.content.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium group-hover:text-purple-600">
                    {{ post.content.title }}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-1">
                    {{ post.content.description }}
                  </p>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ post.author.name }} •
                    {{ new Date(post.timestamp).toLocaleDateString() }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">Music & Culture</h3>
          <div class="space-y-4">
            <NuxtLink
              v-for="post in culturePosts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="group block"
            >
              <div class="flex gap-4">
                <div class="w-24 h-16 rounded overflow-hidden bg-gray-100">
                  <NuxtImg
                    :src="post.content.cover"
                    :alt="post.content.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium group-hover:text-purple-600">
                    {{ post.content.title }}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-1">
                    {{ post.content.description }}
                  </p>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ post.author.name }} •
                    {{ new Date(post.timestamp).toLocaleDateString() }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
