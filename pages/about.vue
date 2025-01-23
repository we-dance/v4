<script setup lang="ts">
const features = [
  {
    icon: "ph:users-three",
    title: "Community First",
    description:
      "Built by dancers for dancers, with focus on genuine connections and shared passion for dance",
  },
  {
    icon: "ph:globe",
    title: "Global Network",
    description:
      "Connect with dancers across 60+ countries while maintaining strong local community ties",
  },
  {
    icon: "ph:calendar",
    title: "Event Discovery",
    description:
      "Find dance events, festivals, and classes that match your interests and location",
  },
  {
    icon: "ph:handshake",
    title: "Partner Finding",
    description:
      "Connect with dance partners for practice, events, and skill development",
  },
  {
    icon: "ph:buildings",
    title: "Local Scenes",
    description:
      "Discover and contribute to your local dance scene with venue guides and community insights",
  },
  {
    icon: "ph:star",
    title: "Artist Platform",
    description:
      "Support dance artists with tools for class management, bookings, and content sharing",
  },
];

const introduction = {
  title: "Introduction",
  description:
    "WeDance is a global platform dedicated to uniting and empowering dance communities by making dance information accessible and supporting community growth. This document outlines our Vision and Mission, providing clear direction and purpose to guide our efforts in creating a more connected and inclusive dance world.",
};

const vision = {
  title: "Our Vision",
  description:
    "To create a world where dance is universally accessible, and communities thrive through connection and shared experiences.",
};

const mission = {
  title: "Our Mission",
  description:
    "We empower dance communities by providing an AI-driven platform that organizes global dance information, simplifies event management, and fosters inclusive participation to support community growth and connection.",
};

const values = [
  {
    title: "Community-Driven",
    description:
      "Democratic structure with community members having voting rights and input in development",
  },
  {
    title: "Transparency",
    description:
      "Open development process and clear communication about our progress and plans",
  },
  {
    title: "Inclusivity",
    description:
      "Creating a welcoming space for dancers of all styles, levels, and backgrounds",
  },
  {
    title: "Sustainability",
    description:
      "Building a platform that supports long-term community growth and artist success",
  },
];
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Hero -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-foreground mb-4">About WeDance</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          A participatory network transforming how dance communities connect,
          organize, and thrive together.
        </p>
      </div>

      <!-- Mission -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-foreground">{{ vision.title }}</h2>
          <p class="text-lg text-muted-foreground mt-2">
            {{ vision.description }}
          </p>
        </div>
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-foreground">
            {{ mission.title }}
          </h2>
          <p class="text-lg text-muted-foreground mt-2">
            {{ mission.description }}
          </p>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-foreground text-center mb-8">
          What We're Building
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white rounded-lg shadow-sm p-6"
          >
            <Icon :name="feature.icon" class="w-8 h-8 text-primary mb-3" />
            <h3 class="font-semibold text-foreground mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground text-sm">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Values -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-foreground text-center mb-8">
          Our Values
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 class="font-semibold text-foreground mb-2">
              {{ value.title }}
            </h3>
            <p class="text-muted-foreground text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>

      <!-- Join -->
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">Join the Movement</h2>
        <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're building the future of dance communities together. Join us in
          making dance more accessible, connected, and vibrant for everyone.
        </p>
        <div class="flex items-center justify-center gap-4">
          <a
            href="https://t.me/WeDancePlatform"
            target="_blank"
            class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="ph:telegram-logo" class="w-5 h-5" />
            Join Community
          </a>
          <a
            href="/status"
            class="inline-flex items-center gap-2 text-primary hover:text-primary/90"
          >
            View Project Status
            <Icon name="ph:arrow-right" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
