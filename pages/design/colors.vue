<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

/* Safelist:
bg-background bg-foreground text-background text-foreground
bg-primary bg-primary-foreground text-primary text-primary-foreground
bg-secondary bg-secondary-foreground text-secondary text-secondary-foreground
bg-accent bg-accent-foreground text-accent text-accent-foreground
bg-muted bg-muted-foreground text-muted text-muted-foreground
bg-destructive bg-destructive-foreground text-destructive text-destructive-foreground
bg-success bg-success-foreground text-success text-success-foreground
bg-warning bg-warning-foreground text-warning text-warning-foreground
bg-info bg-info-foreground text-info text-info-foreground
bg-card bg-card-foreground text-card text-card-foreground
bg-popover bg-popover-foreground text-popover text-popover-foreground
bg-border bg-input bg-ring text-border text-input text-ring
bg-gradient-base bg-gradient-1 bg-gradient-2 bg-gradient-3
*/

const colorGroups = [
  {
    name: 'Base',
    colors: [
      {
        name: 'background',
        description: 'Default page background',
      },
      {
        name: 'foreground',
        description: 'Default text color',
      },
    ],
  },
  {
    name: 'Components',
    colors: [
      {
        name: 'primary',
        description: 'Primary brand color for key elements',
      },
      {
        name: 'primary-foreground',
        description: 'Text color on primary background',
      },
      {
        name: 'secondary',
        description: 'Secondary color for less prominent elements',
      },
      {
        name: 'secondary-foreground',
        description: 'Text color on secondary background',
      },
      {
        name: 'accent',
        description: 'Accent color for highlights and emphasis',
      },
      {
        name: 'accent-foreground',
        description: 'Text color on accent background',
      },
      {
        name: 'muted',
        description: 'Muted color for subtle backgrounds',
      },
      {
        name: 'muted-foreground',
        description: 'Text color on muted background',
      },
    ],
  },
  {
    name: 'Status',
    colors: [
      {
        name: 'destructive',
        description: 'Color for error states and destructive actions',
      },
      {
        name: 'destructive-foreground',
        description: 'Text color on destructive background',
      },
      {
        name: 'success',
        description: 'Color for success states and confirmations',
      },
      {
        name: 'success-foreground',
        description: 'Text color on success background',
      },
      {
        name: 'warning',
        description: 'Color for warning states and alerts',
      },
      {
        name: 'warning-foreground',
        description: 'Text color on warning background',
      },
      {
        name: 'info',
        description: 'Color for informational messages',
      },
      {
        name: 'info-foreground',
        description: 'Text color on info background',
      },
    ],
  },
  {
    name: 'UI Elements',
    colors: [
      {
        name: 'card',
        description: 'Background color for card components',
      },
      {
        name: 'card-foreground',
        description: 'Text color on card background',
      },
      {
        name: 'popover',
        description: 'Background color for popovers and dropdowns',
      },
      {
        name: 'popover-foreground',
        description: 'Text color on popover background',
      },
    ],
  },
  {
    name: 'Utility',
    colors: [
      {
        name: 'border',
        description: 'Color for borders and dividers',
      },
      {
        name: 'input',
        description: 'Background color for input fields',
      },
      {
        name: 'ring',
        description: 'Color for focus rings and outlines',
      },
    ],
  },
  {
    name: 'Gradients',
    colors: [
      {
        name: 'gradient-base',
        description: 'Base gradient color',
      },
      {
        name: 'gradient-1',
        description: 'First accent gradient color',
      },
      {
        name: 'gradient-2',
        description: 'Second accent gradient color',
      },
      {
        name: 'gradient-3',
        description: 'Third accent gradient color',
      },
    ],
  },
]
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
          <ColorSwatch
            v-for="color in group.colors"
            :key="color.name"
            :name="color.name"
            :description="color.description"
          />
        </div>
      </section>
    </div>
  </div>
</template>
