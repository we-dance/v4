<script setup lang="ts">
import type { City } from '@prisma/client'

const props = defineProps<{
  city: City
}>()

const stats = computed(() => {
  return [
    { label: 'Posts', value: props.city._count.posts },
    { label: 'Subscribers', value: props.city.subscribersCount },
    { label: 'Members', value: props.city.membersCount },
  ]
})
</script>

<template>
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
                {{ city.name }}
              </h1>
              <p
                class="text-xl text-muted-foreground mb-8 max-w-2xl md:max-w-none mx-auto"
              >
                {{ city.description }}
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
            <div v-if="city.video" class="space-y-4 py-4">
              <div
                class="aspect-video rounded-xl overflow-hidden shadow-xl bg-background/20 backdrop-blur"
              >
                <WYoutube :url="city.video" class="rounded-xl" />
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

  <div class="relative bg-background">
    <div id="content" class="scroll-mt-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </div>
  </div>

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
