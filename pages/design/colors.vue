<script setup lang="ts">
definePageMeta({
  layout: "design",
});

const colorGroups = [
  {
    name: "Base",
    colors: [
      {
        name: "background",
        description: "Main background color for pages",
      },
      {
        name: "foreground",
        description: "Default text color that works well on background",
      },
    ],
  },
  {
    name: "Components",
    colors: [
      {
        name: "primary",
        description: "Main brand color, used for key actions and emphasis",
      },
      {
        name: "primary-foreground",
        description: "Text color that's readable on primary color",
      },
      {
        name: "secondary",
        description: "Supporting color for less prominent elements",
      },
      {
        name: "secondary-foreground",
        description: "Text color for secondary elements",
      },
      {
        name: "accent",
        description: "Highlights and accents in the interface",
      },
      {
        name: "accent-foreground",
        description: "Text color for accented elements",
      },
      {
        name: "muted",
        description: "Subtle backgrounds and disabled states",
      },
      {
        name: "muted-foreground",
        description: "Text color for subtle elements",
      },
    ],
  },
  {
    name: "Status",
    colors: [
      {
        name: "destructive",
        description: "Error states and delete actions",
      },
      {
        name: "destructive-foreground",
        description: "Text color for error messages",
      },
      {
        name: "success",
        description: "Positive feedback and completion states",
      },
      {
        name: "success-foreground",
        description: "Text color for success messages",
      },
      {
        name: "warning",
        description: "Cautionary messages and alerts",
      },
      {
        name: "warning-foreground",
        description: "Text color for warning messages",
      },
      {
        name: "info",
        description: "Informational messages and help text",
      },
      {
        name: "info-foreground",
        description: "Text color for info messages",
      },
    ],
  },
  {
    name: "UI Elements",
    colors: [
      {
        name: "card",
        description: "Background for cards, modals, and menus",
      },
      {
        name: "card-foreground",
        description: "Text color for cards",
      },
      {
        name: "popover",
        description: "Background for floating elements like tooltips",
      },
      {
        name: "popover-foreground",
        description: "Text color for tooltips",
      },
    ],
  },
  {
    name: "Utility",
    colors: [
      {
        name: "border",
        description: "Border color for UI elements",
      },
      {
        name: "input",
        description: "Border color for form inputs",
      },
      {
        name: "ring",
        description: "Focus ring color for interactive elements",
      },
    ],
  },
  {
    name: "Gradients",
    colors: [
      {
        name: "gradient-base",
        description: "Base gradient color",
      },
      {
        name: "gradient-1",
        description: "First gradient accent color",
      },
      {
        name: "gradient-2",
        description: "Second gradient accent color",
      },
      {
        name: "gradient-3",
        description: "Third gradient accent color",
      },
    ],
  },
];

function getHSL(name: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  );
  return value ? `hsl(${value})` : "";
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Colors</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Our color system is built with semantic tokens that provide consistent
        theming across light and dark modes. Instead of using raw color values,
        we use semantic names that describe the purpose of each color.
      </p>
    </section>

    <!-- Color Groups -->
    <div class="space-y-16">
      <section v-for="group in colorGroups" :key="group.name">
        <h2 class="text-2xl font-semibold mb-8">{{ group.name }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="color in group.colors"
            :key="color.name"
            class="p-4 rounded-lg border"
          >
            <div :class="`bg-${color.name}`" class="h-16 rounded-lg mb-2"></div>
            <div class="font-medium mb-1">{{ color.name }}</div>
            <div class="text-sm text-muted-foreground mb-2">
              {{ getHSL(color.name) }}
            </div>
            <div class="text-sm text-muted-foreground">
              {{ color.description }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
