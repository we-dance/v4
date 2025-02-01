<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <div class="flex items-start space-x-3">
    <Checkbox
      :checked="modelValue"
      @update:checked="emit('update:modelValue', $event)"
      id="terms"
      required
    />
    <label
      for="terms"
      class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      I agree to the
      <NuxtLink
        to="/terms"
        class="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >Terms of Service</NuxtLink
      >
      and
      <NuxtLink
        to="/privacy"
        class="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
        >Privacy Policy</NuxtLink
      >
    </label>
  </div>
</template>
