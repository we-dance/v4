<script setup lang="ts">
import { mockArtists } from '@/data/mockArtists'

defineProps({
  title: {
    type: String,
    default: 'Dance Artists',
  },
  description: {
    type: String,
    default: 'Connect with talented dance artists and instructors',
  },
})

const featuredArtists = computed(() => mockArtists.slice(0, 3))
</script>

<template>
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-6 mb-12">
        <div>
          <h2 class="text-3xl font-bold text-foreground">{{ title }}</h2>
          <p class="text-muted-foreground mt-2">{{ description }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <Input
              type="search"
              placeholder="Search artists..."
              class="w-full pl-9"
            />
            <Icon
              name="ph:magnifying-glass"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
          </div>
          <div class="flex gap-3">
            <Button
              variant="secondary"
              class="gap-2 flex-1 sm:flex-initial flex items-center justify-center"
            >
              <Icon name="ph:map-pin" class="w-4 h-4" />
              Near me
            </Button>
            <Button variant="secondary" as-child class="flex-1 sm:flex-initial">
              <NuxtLink
                to="/artists"
                class="flex items-center justify-center gap-2"
              >
                Browse All
                <Icon name="ph:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ArtistCard
          v-for="artist in featuredArtists"
          :key="artist.id"
          :artist="artist"
        />
      </div>
    </div>
  </section>
</template>
