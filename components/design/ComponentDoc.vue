<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  component: Component
  example?: Component
  about?: string
}

const props = defineProps<Props>()

const {
  name,
  props: componentProps,
  events,
} = useComponentDocs(props.component)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">{{ name }}</h1>

    <!-- About -->
    <section v-if="about" class="mb-16">
      <p class="text-lg text-muted-foreground">
        {{ about }}
      </p>
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
            {{ prop.required ? 'required' : prop.default }}
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
  </div>
</template>
