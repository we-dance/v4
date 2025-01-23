<script setup lang="ts">
definePageMeta({
  layout: "design",
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Components</h1>
    <div class="space-y-8">
      <!-- Buttons -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Button</h3>
        <div class="p-8 rounded-lg border bg-muted/50">
          <div class="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </div>

      <!-- Badges -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Badge</h3>
        <div class="p-8 rounded-lg border bg-muted/50">
          <div class="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Input</h3>
        <div class="p-8 rounded-lg border bg-muted/50">
          <div class="w-full max-w-sm space-y-4">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
          </div>
        </div>
      </div>

      <!-- Select -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Select</h3>
        <div class="p-8 rounded-lg border bg-muted/50">
          <div class="w-full max-w-sm">
            <Select>
              <option value="">Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
