<script setup lang="ts">
interface Step {
  number: number
  icon: string
  title: string
  description: string
  class: string
}

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  steps: {
    type: Array as PropType<Step[]>,
  },
})
</script>

<template>
  <section class="py-24 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 text-foreground">
          {{ title }}
        </h2>
        <p class="text-xl text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div class="relative">
        <!-- Connection Line (Desktop) -->
        <div
          class="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20"
        ></div>

        <div
          v-if="steps"
          class="grid grid-cols-1 gap-12 lg:gap-8 relative"
          :class="steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'"
        >
          <div v-for="step in steps" :key="step.number" class="relative">
            <div class="flex flex-col items-center">
              <div
                :class="step.class"
                class="w-20 h-20 shadow-lg flex items-center justify-center mb-6 transform transition-all hover:scale-110 bg-gradient-to-br"
              >
                <Icon :name="step.icon" class="w-10 h-10 text-white" />
              </div>
              <div class="text-center">
                <div class="text-accent font-medium mb-2">
                  Step {{ step.number }}
                </div>
                <h3 class="text-xl font-bold mb-3 text-foreground">
                  {{ step.title }}
                </h3>
                <p class="text-muted-foreground">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
