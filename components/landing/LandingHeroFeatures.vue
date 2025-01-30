<script setup lang="ts">
interface Feature {
  icon: string
  text: string
}

interface Card {
  icon: string
  title: string
  description: string
}

defineProps({
  badge: {
    type: String,
    required: true
  },
  badgeIcon: {
    type: String,
    default: 'ph:sparkle'
  },
  badgeVariant: {
    type: String,
    default: 'default'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  primaryText: {
    type: String,
    required: true
  },
  primaryLink: {
    type: String,
    required: true
  },
  secondaryText: {
    type: String,
    required: true
  },
  secondaryLink: {
    type: String,
    required: true
  },
  features: {
    type: Array as PropType<Feature[]>,
    default: () => []
  },
  cards: {
    type: Array as PropType<Card[]>,
    required: true
  }
})
</script>

<template>
  <div class="relative min-h-[80vh] flex items-center overflow-hidden">
    <GradientBackground />

    <!-- Content -->
    <div class="relative w-full py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Content -->
          <div class="text-center lg:text-left">
            <div
              class="flex items-center justify-center lg:justify-start gap-2 text-primary-foreground/80 mb-4"
            >
              <Badge :variant="badgeVariant">
                <Icon :name="badgeIcon" class="w-4 h-4 mr-1" />
                {{ badge }}
              </Badge>
            </div>
            <h1
              class="text-4xl lg:text-7xl font-extrabold text-primary tracking-tight mb-6"
            >
              {{ title }}
            </h1>
            <p
              class="text-xl text-primary/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {{ description }}
            </p>
            <div
              class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" variant="primary" as-child>
                <NuxtLink :to="primaryLink">
                  {{ primaryText }}
                  <Icon name="ph:arrow-right" class="w-5 h-5" />
                </NuxtLink>
              </Button>
              <Button size="lg" variant="secondary" as-child>
                <NuxtLink :to="secondaryLink">
                  {{ secondaryText }}
                  <Icon name="ph:play-circle" class="w-5 h-5" />
                </NuxtLink>
              </Button>
            </div>
            <div
              class="mt-8 flex items-center justify-center lg:justify-start gap-8 text-primary/80"
            >
              <div v-for="feature in features" :key="feature.text" class="flex items-center gap-2">
                <Icon :name="feature.icon" class="w-5 h-5 text-success" />
                <span>{{ feature.text }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Value Proposition -->
          <div class="grid grid-cols-2 gap-6">
            <div
              v-for="card in cards"
              :key="card.title"
              class="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20"
            >
              <Icon
                :name="card.icon"
                class="w-8 h-8 text-primary/80 mb-4"
              />
              <div class="text-xl font-bold text-primary mb-2">
                {{ card.title }}
              </div>
              <div class="text-primary/80">
                {{ card.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
