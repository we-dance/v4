<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon: string
}

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: Array as PropType<Feature[]>,
    required: true
  }
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
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 bg-background rounded-xl"
        >
          <Icon :name="feature.icon" class="w-8 h-8 text-accent mb-4" />
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-muted-foreground">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
