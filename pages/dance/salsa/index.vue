# Create the main salsa page
<script setup lang="ts">
import { ref } from "vue";
import { getMockCommunities } from "~/data/mockCommunities";
import { mockEvents } from "~/data/mockEvents";
import { mockPosts } from "~/data/mockPosts";
import CommunityCard from "~/components/community/CommunityCard.vue";
import type { ArticlePost } from "~/schemas/post";

const styles = [
  {
    id: "cuban",
    name: "Cuban Style (Casino)",
    description:
      "Circular style with Afro-Cuban roots, danced to Son and Timba music",
    aliases: ["Salsa Cubana", "Casino", "Cuban Salsa"],
    image:
      "https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80",
  },
  {
    id: "linear",
    name: "Linear Style",
    description: "Danced in a slot, includes LA Style (On1) and NY Style (On2)",
    aliases: ["LA Style", "NY Style", "On1", "On2"],
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
  },
  {
    id: "colombian",
    name: "Colombian Style",
    description: "Close embrace style with Colombian rhythms and moves",
    aliases: ["Caleña", "Colombiana"],
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  },
];

const communities = ref(getMockCommunities());
const events = ref(mockEvents);

const beginnerPosts = ref(
  mockPosts.filter((p) => {
    if (p.type !== "article") return false;
    const tags = p.content.tags || [];
    return tags.some((tag) =>
      ["beginner-guide", "salsa-basics", "salsa-styles"].includes(tag)
    );
  }) as ArticlePost[]
);

const teacherPosts = ref(
  mockPosts.filter((p) => {
    if (p.type !== "article") return false;
    const tags = p.content.tags || [];
    return tags.some((tag) =>
      ["teaching", "instruction", "methodology"].includes(tag)
    );
  }) as ArticlePost[]
);

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.style.display = "none";
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Salsa Dancing</h1>
      <p class="text-xl text-muted-foreground">
        Discover the vibrant world of salsa dancing - from Cuban rhythms to
        linear precision
      </p>
    </div>

    <!-- Styles Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Styles</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="style in styles"
          :key="style.id"
          :to="`/dance/salsa/${style.id}`"
          class="block bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="aspect-video rounded-t-lg overflow-hidden bg-accent">
            <NuxtImg
              :src="style.image"
              :alt="style.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ style.name }}</h3>
            <p class="text-muted-foreground text-sm mb-2">
              {{ style.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="alias in style.aliases"
                :key="alias"
                class="text-xs bg-accent text-muted-foreground px-2 py-1 rounded-full"
              >
                {{ alias }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Communities Section -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Communities</h2>
        <NuxtLink
          to="/communities?style=salsa"
          class="text-primary hover:text-primary/80"
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
          to="/events?style=salsa"
          class="text-primary hover:text-primary/80"
        >
          View All
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="block bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="aspect-video rounded-t-lg overflow-hidden bg-accent">
            <NuxtImg
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-lg">{{ event.name }}</h3>
              <span
                class="text-sm bg-primary/20 text-primary px-2 py-1 rounded-full"
              >
                {{ event.tags[0] }}
              </span>
            </div>
            <p class="text-muted-foreground text-sm mb-4">
              {{ event.description }}
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center text-muted-foreground">
                <span class="w-20">When:</span>
                <span>
                  {{ new Date(event.date.start).toLocaleDateString() }},
                  {{
                    new Date(event.date.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                  -
                  {{
                    new Date(event.date.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </span>
              </div>
              <div class="flex items-center text-muted-foreground">
                <span class="w-20">Where:</span>
                <span
                  >{{ event.location.name }}, {{ event.location.city }}</span
                >
              </div>
              <div class="flex items-center text-muted-foreground">
                <span class="w-20">Price:</span>
                <span>{{
                  event.prices?.length
                    ? `${event.prices[0].amount}${event.prices[0].currency}`
                    : "Free"
                }}</span>
              </div>
              <div class="flex items-center text-muted-foreground">
                <span class="w-20">By:</span>
                <span>{{ event.organizer.name }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Resources</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-background p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">For Beginners</h3>
          <div class="space-y-4">
            <NuxtLink
              v-for="post in beginnerPosts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="group block"
            >
              <div class="flex gap-4">
                <div class="w-24 h-16 rounded overflow-hidden bg-accent">
                  <NuxtImg
                    :src="post.content.cover"
                    :alt="post.content.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium group-hover:text-primary">
                    {{ post.content.title }}
                  </h4>
                  <p class="text-sm text-muted-foreground line-clamp-1">
                    {{ post.content.description }}
                  </p>
                  <div class="text-xs text-muted-foreground mt-1">
                    {{ post.author.name }} •
                    {{ new Date(post.timestamp).toLocaleDateString() }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="bg-background p-6 rounded-lg shadow-sm">
          <h3 class="font-semibold text-lg mb-4">For Teachers</h3>
          <div class="space-y-4">
            <NuxtLink
              v-for="post in teacherPosts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="group block"
            >
              <div class="flex gap-4">
                <div class="w-24 h-16 rounded overflow-hidden bg-accent">
                  <NuxtImg
                    :src="post.content.cover"
                    :alt="post.content.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium group-hover:text-primary">
                    {{ post.content.title }}
                  </h4>
                  <p class="text-sm text-muted-foreground line-clamp-1">
                    {{ post.content.description }}
                  </p>
                  <div class="text-xs text-muted-foreground mt-1">
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
