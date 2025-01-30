<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});
</script>

<template>
    <section
        class="pt-32 pb-24 relative overflow-hidden"
    >
        <GradientBackground />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
            <h1
            class="text-4xl md:text-6xl font-bold text-primary mb-6"
            >
            {{ title }}
            </h1>
            <p class="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
            {{ description }}
            </p>
        </div>
        </div>
    </section>
</template>