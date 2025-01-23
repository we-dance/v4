<script setup lang="ts">
definePageMeta({
  layout: "design",
});

const colors = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  background: "bg-background text-foreground",
  card: "bg-card text-card-foreground",
  popover: "bg-popover text-popover-foreground",
};

type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  success: string;
  "success-foreground": string;
  warning: string;
  "warning-foreground": string;
  border: string;
  input: string;
  ring: string;
};

const themeConfig: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(224 71.4% 4.1%)",
    card: "hsl(0 0% 100%)",
    "card-foreground": "hsl(224 71.4% 4.1%)",
    popover: "hsl(0 0% 100%)",
    "popover-foreground": "hsl(224 71.4% 4.1%)",
    primary: "hsl(262.1 83.3% 57.8%)",
    "primary-foreground": "hsl(210 20% 98%)",
    secondary: "hsl(220 14.3% 95.9%)",
    "secondary-foreground": "hsl(220.9 39.3% 11%)",
    muted: "hsl(220 14.3% 95.9%)",
    "muted-foreground": "hsl(220 8.9% 46.1%)",
    accent: "hsl(220 14.3% 95.9%)",
    "accent-foreground": "hsl(220.9 39.3% 11%)",
    destructive: "hsl(0 84.2% 60.2%)",
    "destructive-foreground": "hsl(210 20% 98%)",
    success: "hsl(142.1 76.2% 36.3%)",
    "success-foreground": "hsl(355.7 100% 97.3%)",
    warning: "hsl(47.9 95.8% 53.1%)",
    "warning-foreground": "hsl(26 83.3% 14.1%)",
    border: "hsl(220 13% 91%)",
    input: "hsl(220 13% 91%)",
    ring: "hsl(262.1 83.3% 57.8%)",
  },
  dark: {
    background: "hsl(224 71.4% 4.1%)",
    foreground: "hsl(210 20% 98%)",
    card: "hsl(224 71.4% 4.1%)",
    "card-foreground": "hsl(210 20% 98%)",
    popover: "hsl(224 71.4% 4.1%)",
    "popover-foreground": "hsl(210 20% 98%)",
    primary: "hsl(263.4 70% 50.4%)",
    "primary-foreground": "hsl(210 20% 98%)",
    secondary: "hsl(215 27.9% 16.9%)",
    "secondary-foreground": "hsl(210 20% 98%)",
    muted: "hsl(215 27.9% 16.9%)",
    "muted-foreground": "hsl(217.9 10.6% 64.9%)",
    accent: "hsl(215 27.9% 16.9%)",
    "accent-foreground": "hsl(210 20% 98%)",
    destructive: "hsl(0 62.8% 30.6%)",
    "destructive-foreground": "hsl(210 20% 98%)",
    success: "hsl(142.1 70.6% 45.3%)",
    "success-foreground": "hsl(144.9 80.4% 10%)",
    warning: "hsl(47.9 95.8% 53.1%)",
    "warning-foreground": "hsl(26 83.3% 14.1%)",
    border: "hsl(215 27.9% 16.9%)",
    input: "hsl(215 27.9% 16.9%)",
    ring: "hsl(263.4 70% 50.4%)",
  },
};

const colorGroups = [
  {
    name: "Base",
    colors: ["background", "foreground"] as const,
  },
  {
    name: "Components",
    colors: [
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
    ] as const,
  },
  {
    name: "States",
    colors: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
    ] as const,
  },
  {
    name: "Status",
    colors: [
      "destructive",
      "destructive-foreground",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
    ] as const,
  },
  {
    name: "Utility",
    colors: ["muted", "muted-foreground", "border", "input", "ring"] as const,
  },
] as const;
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Colors</h1>

    <!-- Introduction -->
    <section class="mb-16 prose max-w-none">
      <p class="text-lg text-muted-foreground mb-6">
        Our color system is built with semantic tokens that provide consistent
        theming across light and dark modes. Instead of using raw color values,
        we use semantic names that describe the purpose of each color.
      </p>

      <div class="grid gap-8 md:grid-cols-2 mb-8">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">Semantic Colors</h3>
          <p class="text-muted-foreground">
            Each color has a semantic name (like "primary" or "accent") and a
            purpose (like buttons or alerts). This makes it easier to maintain
            consistency and update themes.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">Foreground Colors</h3>
          <p class="text-muted-foreground">
            Colors with "-foreground" suffix are used for text and icons that
            appear on top of their base color. This ensures proper contrast and
            readability.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">HSL Format</h3>
          <p class="text-muted-foreground">
            Colors are defined in HSL (Hue, Saturation, Lightness) format,
            making it easier to maintain consistency in color relationships and
            create variations.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">Dark Mode Support</h3>
          <p class="text-muted-foreground">
            Each color has light and dark mode variants, automatically switching
            based on the user's theme preference while maintaining proper
            contrast.
          </p>
        </div>
      </div>
    </section>

    <!-- Visual Preview -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Visual Preview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(classes, name) in colors"
          :key="name"
          class="p-4 rounded-lg border"
        >
          <div :class="classes" class="h-16 rounded-lg mb-2"></div>
          <div class="font-medium mb-1">{{ name }}</div>
          <div class="text-sm text-muted-foreground mb-2">{{ classes }}</div>
          <div class="text-sm text-muted-foreground">
            <template v-if="name === 'primary'">
              Main brand color, used for key actions and emphasis
            </template>
            <template v-if="name === 'secondary'">
              Supporting color for less prominent elements
            </template>
            <template v-if="name === 'accent'">
              Highlights and accents in the interface
            </template>
            <template v-if="name === 'muted'">
              Subtle backgrounds and disabled states
            </template>
            <template v-if="name === 'destructive'">
              Error states and delete actions
            </template>
            <template v-if="name === 'success'">
              Positive feedback and completion states
            </template>
            <template v-if="name === 'warning'">
              Cautionary messages and alerts
            </template>
            <template v-if="name === 'background'">
              Main background color for pages
            </template>
            <template v-if="name === 'card'">
              Background for cards, modals, and menus
            </template>
            <template v-if="name === 'popover'">
              Background for floating elements like tooltips
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Theme Configuration -->
    <section>
      <h2 class="text-2xl font-semibold mb-8">Theme Configuration</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Light Theme -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Light Theme</h3>
          <div class="space-y-8">
            <div v-for="group in colorGroups" :key="group.name">
              <h4 class="font-medium mb-4">{{ group.name }}</h4>
              <div class="space-y-4">
                <div
                  v-for="color in group.colors"
                  :key="color"
                  class="flex items-center gap-4 p-4 rounded-lg border"
                >
                  <div
                    class="w-16 h-16 rounded-md"
                    :style="{ background: themeConfig.light[color] }"
                  ></div>
                  <div>
                    <div class="font-medium">{{ color }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ themeConfig.light[color] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dark Theme -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Dark Theme</h3>
          <div class="space-y-8">
            <div v-for="group in colorGroups" :key="group.name">
              <h4 class="font-medium mb-4">{{ group.name }}</h4>
              <div class="space-y-4">
                <div
                  v-for="color in group.colors"
                  :key="color"
                  class="flex items-center gap-4 p-4 rounded-lg border"
                >
                  <div
                    class="w-16 h-16 rounded-md"
                    :style="{ background: themeConfig.dark[color] }"
                  ></div>
                  <div>
                    <div class="font-medium">{{ color }}</div>
                    <div class="text-sm text-muted-foreground">
                      {{ themeConfig.dark[color] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
