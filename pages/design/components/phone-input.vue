<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

const phoneNumber = ref('')
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-16">Phone Input</h1>

    <!-- Introduction -->
    <section class="mb-16">
      <p class="text-lg text-muted-foreground">
        The Phone Input component is used to allow users to input and select a
        phone number with international format support. It includes a country
        selector and automatically formats the phone number according to the
        selected country.
      </p>
    </section>

    <!-- Usage -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Usage</h2>
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Import and use the Phone Input component:
        </p>
        <pre class="p-4 rounded-lg bg-muted font-mono text-sm">
&lt;PhoneInput 
  v-model="phoneNumber"
/&gt;</pre
        >
      </div>
    </section>

    <!-- Variants -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Variants</h2>
      <div class="grid gap-8">
        <PhoneInput v-model="phoneNumber" />
        <pre>{{ phoneNumber }}</pre>
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
          <div class="font-mono text-sm">value</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">undefined</div>
          <div class="text-muted-foreground">
            The phone number in E.164 format (e.g., +12345678901)
          </div>
        </div>
      </div>
    </section>

    <!-- Events -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Events</h2>
      <div class="border rounded-lg">
        <div class="grid grid-cols-3 gap-4 p-4 border-b font-medium">
          <div>Name</div>
          <div>Payload</div>
          <div>Description</div>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4 border-b">
          <div class="font-mono text-sm">change</div>
          <div class="text-muted-foreground">string</div>
          <div class="text-muted-foreground">
            Emitted when the phone number changes, with the new value in E.164
            format
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 p-4">
          <div class="font-mono text-sm">blur</div>
          <div class="text-muted-foreground">FocusEvent</div>
          <div class="text-muted-foreground">
            Emitted when the input loses focus
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Features</h2>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>Country selection with flag icons</li>
        <li>Automatic phone number formatting based on country</li>
        <li>Searchable country dropdown</li>
        <li>Delayed validation to prevent errors on initial load</li>
        <li>Proper handling of external value changes (v-model support)</li>
        <li>Accessible keyboard navigation</li>
      </ul>
    </section>

    <!-- Implementation Notes -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-8">Implementation Notes</h2>
      <div class="space-y-4 text-muted-foreground">
        <p>
          The PhoneInput component is built on top of the base-vue-phone-input
          library and integrates with our design system components. It includes
          special handling to prevent validation errors on initial load and
          properly manages the state between external value changes and internal
          updates.
        </p>
        <p>
          The component uses a 100ms delay on initialization to prevent
          validation errors when the component first loads, ensuring a better
          user experience.
        </p>
      </div>
    </section>
  </div>
</template>
