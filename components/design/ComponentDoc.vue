<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  /** The component to document */
  component: Component;
  /** Example instance of the component */
  example?: Component;
  /** Additional sections to display after the standard documentation */
  additionalSections?: {
    title: string;
    content: Component;
  }[];
}

const props = defineProps<Props>();

const {
  name,
  introduction,
  examples,
  features,
  props: componentProps,
  events,
} = useComponentDocs(props.component);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">{{ name }}</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        {{ introduction }}
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Import and use the {{ name }} component:
        </p>
        <pre
          v-for="example in examples"
          :key="example.name"
          class="p-4 rounded-lg bg-muted font-mono text-sm"
          >{{ example.code }}</pre
        >
      </div>
    </section>

    <!-- Example -->
    <section v-if="example" class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Example</h2>
      <div class="flex-1 max-w-xl">
        <component :is="example" />
      </div>
    </section>

    <!-- Props -->
    <section v-if="componentProps.length" class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Props</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-4 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Type</div>
          <div>Default</div>
          <div>Description</div>
        </div>
        <div
          v-for="prop in componentProps"
          :key="prop.name"
          class="grid grid-cols-4 gap-4 p-4 border-b"
        >
          <div class="font-mono text-sm">{{ prop.name }}</div>
          <div class="text-muted-foreground">{{ prop.type }}</div>
          <div class="text-muted-foreground">
            {{ prop.required ? "required" : prop.default }}
          </div>
          <div class="text-muted-foreground">{{ prop.description }}</div>
        </div>
      </div>
    </section>

    <!-- Events -->
    <section v-if="events.length" class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Events</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-2 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Description</div>
        </div>
        <div
          v-for="event in events"
          :key="event.name"
          class="grid grid-cols-2 gap-4 p-4 border-b"
        >
          <div class="font-mono text-sm">{{ event.name }}</div>
          <div class="text-muted-foreground">{{ event.description }}</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section v-if="features.length" class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Features</h2>
      <div class="space-y-4">
        <div
          v-for="feature in features"
          :key="feature"
          class="flex gap-4 items-start"
        >
          <div
            class="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0"
          >
            ✓
          </div>
          <div>
            <p class="font-medium">{{ feature.split(" - ")[0] }}</p>
            <p class="text-muted-foreground">
              {{ feature.split(" - ")[1] }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Sections -->
    <template v-if="additionalSections">
      <section
        v-for="section in additionalSections"
        :key="section.title"
        class="mb-16"
      >
        <h2 class="text-2xl font-semibold mb-8">{{ section.title }}</h2>
        <component :is="section.content" />
      </section>
    </template>
  </div>
</template>
