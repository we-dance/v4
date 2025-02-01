<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

const variants = [
  { name: 'default', description: 'Default input style' },
  {
    name: 'error',
    description: 'Input with error state',
    value: '',
    error: 'This field is required',
  },
]

const types = [
  { name: 'text', description: 'Text input', placeholder: 'Enter text' },
  { name: 'email', description: 'Email input', placeholder: 'Enter email' },
  {
    name: 'password',
    description: 'Password input',
    placeholder: 'Enter password',
  },
  { name: 'number', description: 'Number input', placeholder: 'Enter number' },
  { name: 'search', description: 'Search input', placeholder: 'Search...' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Input</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        Input components are used to collect user data through various types of
        form fields.
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">Import and use the Input component:</p>
        <pre class="p-4 rounded-lg bg-muted font-mono text-sm">
&lt;Input
  v-model="value"
  placeholder="Enter text"
  :error="error"
/&gt;</pre
        >
      </div>
    </section>

    <!-- Variants -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Variants</h2>
      <div class="grid gap-8">
        <div v-for="variant in variants" :key="variant.name" class="space-y-4">
          <div>
            <h3 class="font-medium mb-2">{{ variant.name }}</h3>
            <p class="text-sm text-muted-foreground mb-4">
              {{ variant.description }}
            </p>
            <div class="w-full max-w-sm">
              <Input
                :error="variant.error"
                :placeholder="variant.name + ' input'"
              />
              <p v-if="variant.error" class="mt-1 text-sm text-destructive">
                {{ variant.error }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Types</h2>
      <div class="grid gap-8">
        <div v-for="type in types" :key="type.name" class="space-y-4">
          <div>
            <h3 class="font-medium mb-2">{{ type.name }}</h3>
            <p class="text-sm text-muted-foreground mb-4">
              {{ type.description }}
            </p>
            <div class="w-full max-w-sm">
              <Input :type="type.name" :placeholder="type.placeholder" />
            </div>
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
          <div class="font-mono text-sm">modelValue</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">''</div>
          <div class="text-muted-foreground">v-model binding value</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">type</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">'text'</div>
          <div class="text-muted-foreground">Type of input field</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4 border-b">
          <div class="font-mono text-sm">placeholder</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">''</div>
          <div class="text-muted-foreground">Placeholder text</div>
        </div>
        <div class="grid grid-cols-4 gap-4 p-4">
          <div class="font-mono text-sm">error</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">''</div>
          <div class="text-muted-foreground">Error message</div>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Examples</h2>
      <div class="space-y-8">
        <!-- With Label -->
        <div>
          <h3 class="text-lg font-medium mb-4">With Label</h3>
          <div class="w-full max-w-sm space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>

        <!-- With Icon -->
        <div>
          <h3 class="text-lg font-medium mb-4">With Icon</h3>
          <div class="w-full max-w-sm">
            <div class="relative">
              <Icon
                name="search"
                class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input class="pl-9" type="search" placeholder="Search..." />
            </div>
          </div>
        </div>

        <!-- With Description -->
        <div>
          <h3 class="text-lg font-medium mb-4">With Description</h3>
          <div class="w-full max-w-sm space-y-2">
            <Label for="username">Username</Label>
            <Input id="username" placeholder="Enter username" />
            <p class="text-sm text-muted-foreground">
              This will be your public display name.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
