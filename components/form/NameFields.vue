<script setup lang="ts">
const props = defineProps<{
  firstName: string;
  lastName: string;
}>();

const emit = defineEmits<{
  (e: "update:firstName", value: string): void;
  (e: "update:lastName", value: string): void;
}>();
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-foreground mb-2"
        >First Name</label
      >
      <Input
        :value="firstName"
        @update:modelValue="emit('update:firstName', $event)"
        type="text"
        required
        class="w-full px-4 py-2 border rounded-lg"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-foreground mb-2"
        >Last Name</label
      >
      <Input
        :value="lastName"
        @update:modelValue="emit('update:lastName', $event)"
        type="text"
        required
        class="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  </div>
</template>
