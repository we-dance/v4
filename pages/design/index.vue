<script setup lang="ts">
import { ref, onMounted } from "vue";

const sections = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Border Radius" },
  { id: "components", label: "Components" },
] as const;

type SectionId = (typeof sections)[number]["id"];
const activeSection = ref<SectionId>("colors");

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id as SectionId;
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
});

definePageMeta({
  layout: "design",
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Design System</h1>
    <p class="text-lg text-muted-foreground mb-8">
      Welcome to the WeDance design system documentation. This system provides a
      comprehensive set of design tokens, components, and guidelines to help
      create consistent and beautiful user interfaces.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink
        to="/design/colors"
        class="block p-6 rounded-lg border hover:border-primary transition-colors"
      >
        <h2 class="text-xl font-semibold mb-2">Colors</h2>
        <p class="text-muted-foreground">
          Semantic color tokens for consistent theming and dark mode support.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/design/typography"
        class="block p-6 rounded-lg border hover:border-primary transition-colors"
      >
        <h2 class="text-xl font-semibold mb-2">Typography</h2>
        <p class="text-muted-foreground">
          Font families, weights, and sizes for clear visual hierarchy.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/design/spacing"
        class="block p-6 rounded-lg border hover:border-primary transition-colors"
      >
        <h2 class="text-xl font-semibold mb-2">Spacing</h2>
        <p class="text-muted-foreground">
          Consistent spacing scale for margins, padding, and layout.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/design/radius"
        class="block p-6 rounded-lg border hover:border-primary transition-colors"
      >
        <h2 class="text-xl font-semibold mb-2">Border Radius</h2>
        <p class="text-muted-foreground">
          Border radius tokens for consistent component shapes.
        </p>
      </NuxtLink>

      <NuxtLink
        to="/design/components"
        class="block p-6 rounded-lg border hover:border-primary transition-colors md:col-span-2"
      >
        <h2 class="text-xl font-semibold mb-2">Components</h2>
        <p class="text-muted-foreground">
          A collection of reusable UI components built with shadcn-vue.
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
