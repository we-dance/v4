<script setup lang="ts">
import { ref, computed } from 'vue'
import GradientBackground from '~/components/common/GradientBackground.vue'

interface QuizVideo {
  style: string
  videoId: string
}

// Quiz state
const currentRound = ref(1)
const totalRounds = 3
const selectedStyles = ref<string[]>([])

// Videos for comparison
const videos: QuizVideo[] = [
  { style: 'Salsa', videoId: 'R7E9cNydevg' },
  { style: 'Bachata', videoId: '4nJfpQ3kCbw' },
  { style: 'Kizomba', videoId: 'jcW7Z9y5twQ' },
]

// Get random pair of videos
const getCurrentPair = computed(() => {
  const available = videos.filter(
    (v) => !selectedStyles.value.includes(v.style)
  )
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2)
})

// Handle video selection
const selectVideo = (style: string) => {
  selectedStyles.value.push(style)

  if (currentRound.value < totalRounds) {
    currentRound.value++
  } else {
    // Navigate to the winning style
    navigateTo(
      `/dance/${selectedStyles.value[selectedStyles.value.length - 1].toLowerCase()}`
    )
  }
}
</script>

<template>
  <div class="min-h-screen relative">
    <GradientBackground />
    <div class="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Find Your Dance Style</h1>
        <p class="text-xl">
          Round {{ currentRound }} of {{ totalRounds }}: Watch and choose the
          style that moves you
        </p>
      </div>

      <!-- Video Comparison -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div
          v-for="video in getCurrentPair"
          :key="video.style"
          class="bg-background rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-200"
        >
          <div class="aspect-video">
            <iframe
              :src="`https://www.youtube.com/embed/${video.videoId}?autoplay=0`"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-foreground mb-2">
              {{ video.style }}
            </h3>
            <Button class="w-full" size="lg" @click="selectVideo(video.style)">
              Choose {{ video.style }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Skip Option -->
      <div class="text-center mt-8">
        <NuxtLink
          to="/feed"
          class="text-background/70 hover:text-background inline-flex items-center gap-1"
        >
          Skip quiz
          <Icon name="ph:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
