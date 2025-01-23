<script setup>
import GradientBackground from "~/components/common/GradientBackground.vue";

const navigation = [
  { label: "Feed", to: "/dance/salsa#content", icon: "ph:newspaper" },
  { label: "About", to: "/dance/salsa/about#content", icon: "ph:info" },
  { label: "Artists", to: "/dance/salsa/artists#content", icon: "ph:star" },
  { label: "Events", to: "/dance/salsa/events#content", icon: "ph:calendar" },
];

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    default: () => [
      { label: "Members", value: "1,200" },
      { label: "Posts", value: "500" },
      { label: "Projects", value: "50" },
      { label: "Response Rate", value: "92%" },
    ],
  },
  videoUrl: {
    type: String,
    default: "https://www.youtube.com/embed/R7E9cNydevg",
  },
});
</script>

<template>
  <!-- Hero Section -->
  <div class="relative min-h-[60vh]">
    <div
      class="relative flex items-center overflow-hidden min-h-[60vh] md:h-full py-20 md:py-0"
    >
      <GradientBackground />

      <!-- Content -->
      <div class="relative w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Left: Content -->
            <div class="text-center md:text-left">
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
                {{ title }}
              </h1>
              <p
                class="text-xl text-white/80 mb-8 max-w-2xl md:max-w-none mx-auto"
              >
                {{ description }}
              </p>
              <div class="flex justify-center md:justify-start gap-4">
                <slot name="actions">
                  <Button variant="secondary" size="lg" as-child>
                    <NuxtLink to="/register">Join Community</NuxtLink>
                  </Button>
                </slot>
              </div>

              <div
                class="flex justify-center md:justify-start gap-8 mt-8 text-white/80"
              >
                <div v-for="stat in stats" :key="stat.label">
                  <div class="text-xl font-bold text-white">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm">
                    {{ stat.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Video -->
            <div class="space-y-4">
              <div
                class="aspect-video rounded-xl overflow-hidden shadow-xl bg-black/20 backdrop-blur"
              >
                <iframe
                  class="w-full h-full"
                  :src="videoUrl"
                  :title="`${title} Video`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>

              <slot name="video-extra">
                <!-- Video Game Invitation -->
                <div class="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-white">
                        Help choose the best inspiration
                      </p>
                      <p class="text-xs text-white/80">
                        Vote between pairs of videos
                      </p>
                    </div>
                    <Button variant="secondary" size="sm" as-child>
                      <NuxtLink to="/quiz">Play Video Game</NuxtLink>
                    </Button>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation and Content Wrapper -->
  <div class="relative">
    <!-- Navigation -->
    <div class="sticky top-[64px] bg-white z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="border-b border-gray-200">
          <div class="flex space-x-8 overflow-x-auto">
            <NuxtLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
              :class="[
                $route.path === item.to.split('#')[0] ||
                $route.path.endsWith(item.to.split('#')[0].split('/').pop())
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
            >
              <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
              {{ item.label }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div id="content" class="scroll-mt-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-gray-600">&copy; 2024 WeDance. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
