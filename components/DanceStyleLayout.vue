<script setup lang="ts">
import type { Community } from '~/schemas/communitySchema'
import GradientBackground from '~/components/common/GradientBackground.vue'

const navigation = [
  { label: 'Feed', to: '/dance/salsa#content', icon: 'ph:newspaper' },
  { label: 'About', to: '/dance/salsa/about#content', icon: 'ph:info' },
  { label: 'Artists', to: '/dance/salsa/artists#content', icon: 'ph:star' },
  { label: 'Events', to: '/dance/salsa/events#content', icon: 'ph:calendar' },
]

const props = defineProps({
  community: {
    type: Object as PropType<Community>,
    required: true,
  },
})

const stats = computed(() => {
  return [
    { label: 'Cities', value: props.community.cities.length },
    { label: 'Members', value: props.community.membersCount },
    { label: 'Events', value: props.community.eventsCount },
    { label: 'Posts', value: props.community._count.posts },
  ]
})
</script>

<template>
  <!-- Hero Section -->
  <div class="relative min-h-[60vh]">
    <div
      class="relative flex items-center overflow-hidden min-h-[60vh] md:h-full py-8"
    >
      <GradientBackground />

      <!-- Content -->
      <div class="relative w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Left: Content -->
            <div class="text-center md:text-left">
              <h1
                class="text-4xl md:text-5xl font-bold text-foreground/90 mb-6"
              >
                {{ community.name }}
              </h1>
              <p
                class="text-xl text-muted-foreground mb-8 max-w-2xl md:max-w-none mx-auto"
              >
                {{ community.description }}
              </p>
              <div class="flex justify-center md:justify-start gap-4">
                <slot name="actions">
                  <Button size="lg" as-child>
                    <NuxtLink to="/register">Join Community</NuxtLink>
                  </Button>
                </slot>
              </div>

              <div
                class="flex justify-center md:justify-start gap-8 mt-8 text-muted-foreground"
              >
                <div v-for="stat in stats" :key="stat.label">
                  <div class="text-xl font-bold text-foreground/90">
                    {{ stat.value }}
                  </div>
                  <div class="text-sm">
                    {{ stat.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Video -->
            <div v-if="community.video" class="space-y-4 py-4">
              <div
                class="aspect-video rounded-xl overflow-hidden shadow-xl bg-background/20 backdrop-blur"
              >
                <WYoutube :url="community.video" class="rounded-xl" />
              </div>

              <slot name="video-extra">
                <!-- Video Game Invitation -->
                <div class="bg-background/50 backdrop-blur rounded-lg p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-foreground/90">
                        Help choose the best inspiration
                      </p>
                      <p class="text-xs text-muted-foreground">
                        Vote between pairs of videos
                      </p>
                    </div>
                    <Button size="sm" as-child>
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
  <div class="relative bg-background">
    <!-- Navigation -->
    <div class="sticky top-16 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="border-b">
          <div class="flex space-x-8 overflow-x-auto bg-background">
            <NuxtLink
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
              :class="[
                $route.path === item.to.split('#')[0] ||
                $route.path.endsWith(item.to.split('#')[0].split('/').pop())
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
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
  <div class="py-12 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-muted-foreground">
          &copy; 2025 WeDance. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>
