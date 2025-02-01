<script setup lang="ts">
interface Competitor {
  title: string
  description: string
  icon: string
  link: string
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<Competitor[]>,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-4">{{ title }}</h2>
      <p
        class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        {{ description }}
      </p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          class="group"
        >
          <div
            class="bg-background rounded-xl p-8 hover:bg-accent/10 transition-colors"
          >
            <div class="flex items-center gap-4 mb-4">
              <Icon :name="item.icon" class="w-8 h-8 text-accent" />
              <h3 class="text-2xl font-semibold">{{ item.title }}</h3>
            </div>
            <p class="text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 text-center">
        <Button variant="outline" as-child>
          <NuxtLink to="/vs" class="flex items-center justify-center gap-2">
            See All Comparisons
            <Icon name="ph:arrow-right" class="w-5 h-5" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
