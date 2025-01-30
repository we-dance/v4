<script setup lang="ts">
interface PricingPlan {
  title: string;
  price: string;
  unit: string;
  caption: string;
  features?: string[];
  icon: string;
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
  plans: {
    type: Array as PropType<PricingPlan[]>,
    required: true,
  },
  note: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-4">
        {{ title }}
      </h2>
      <p
        class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        {{ description }}
      </p>
      <div
        class="grid gap-8"
        :class="plans.length > 1 ? 'md:grid-cols-3' : 'flex justify-center'"
      >
        <div
          v-for="plan in plans"
          :key="plan.title"
          class="bg-background rounded-xl p-8"
        >
          <Icon :name="plan.icon" class="w-12 h-12 text-accent mb-6" />
          <h3 class="text-xl font-semibold mb-4">{{ plan.title }}</h3>
          <ul v-if="plan.features" class="space-y-3 text-muted-foreground">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-2"
            >
              <Icon
                name="ph:check-circle"
                class="w-5 h-5 text-success mt-1 shrink-0"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
          <div class="mt-6 pt-6 border-muted">
            <div class="text-sm text-muted-foreground">{{ plan.caption }}</div>
            <div class="text-3xl font-bold text-accent">{{ plan.price }}</div>
            <div class="text-sm text-muted-foreground mt-1">
              {{ plan.unit }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="note" class="mt-12 text-center">
        <p class="text-sm text-muted-foreground max-w-2xl mx-auto">
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
