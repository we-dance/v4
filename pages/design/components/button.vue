<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

const variants: Array<{ name: ButtonVariant; description: string }> = [
  { name: 'primary', description: 'Primary action button' },
  { name: 'secondary', description: 'Secondary action button' },
  { name: 'outline', description: 'Outlined button for less emphasis' },
  { name: 'ghost', description: 'Ghost button for subtle actions' },
  { name: 'link', description: 'Link-styled button' },
  { name: 'destructive', description: 'For destructive actions' },
]

const sizes: Array<{ name: ButtonSize; description: string }> = [
  { name: 'default', description: 'Default size' },
  { name: 'sm', description: 'Small size' },
  { name: 'lg', description: 'Large size' },
  { name: 'icon', description: 'Icon button' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Button</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Buttons trigger actions or navigation when clicked. They communicate
        calls to action and allow users to interact with the interface.
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Import and use the Button component:
        </p>
        <pre class="p-4 rounded-lg bg-muted font-mono text-sm">
&lt;Button variant="default" size="default"&gt;
  Click me
&lt;/Button&gt;</pre
        >
      </div>
    </section>

    <!-- Variants -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Variants</h2>
      <div class="grid gap-8">
        <div v-for="variant in variants" :key="variant.name" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">{{ variant.name }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ variant.description }}
              </p>
            </div>
            <Button :variant="variant.name">Button</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Sizes</h2>
      <div class="grid gap-8">
        <div v-for="size in sizes" :key="size.name" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">{{ size.name }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ size.description }}
              </p>
            </div>
            <Button :size="size.name">Button</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Props -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Props</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-4 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Type</div>
          <div>Default</div>
          <div>Description</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">variant</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">'default'</div>
          <div class="text-muted-foreground">Visual style of the button</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">size</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">'default'</div>
          <div class="text-muted-foreground">Size of the button</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4">
          <div class="font-mono text-sm">disabled</div>
          <div class="text-muted-foreground">boolean</div>
          <div class="text-muted-foreground">false</div>
          <div class="text-muted-foreground">
            Whether the button is disabled
          </div>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Examples</h2>
      <div class="space-y-8">
        <!-- With Icon -->
        <div>
          <h3 class="text-lg font-medium mb-4">With Icon</h3>
          <div class="flex gap-4">
            <Button>
              <Icon name="i-heroicons-plus" class="mr-2 h-4 w-4" />
              Add item
            </Button>
            <Button variant="outline">
              <Icon name="i-heroicons-trash" class="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <!-- Loading State -->
        <div>
          <h3 class="text-lg font-medium mb-4">Loading State</h3>
          <div class="flex gap-4">
            <Button disabled>
              <Icon
                name="i-heroicons-arrow-path"
                class="mr-2 h-4 w-4 animate-spin"
              />
              Please wait
            </Button>
          </div>
        </div>

        <!-- Icon Button -->
        <div>
          <h3 class="text-lg font-medium mb-4">Icon Button</h3>
          <div class="flex gap-4">
            <Button size="icon" variant="outline">
              <Icon name="i-heroicons-heart" class="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Icon name="i-heroicons-plus" class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
