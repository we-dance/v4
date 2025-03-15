<script setup lang="ts">
import { ref, watch } from 'vue'
import { debouncedUsernameValidator } from '~/schemas/profile'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const isChecking = ref(false)
const isAvailable = ref(true)
const hasBeenChecked = ref(false)

// Update internal value when prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  }
)

// Emit changes to parent
const updateValue = (value: string) => {
  internalValue.value = value
  emit('update:modelValue', value)

  // Reset validation state when input changes
  if (hasBeenChecked.value) {
    isChecking.value = true
    hasBeenChecked.value = false
  }

  // Only check availability if username is valid length
  if (value.length >= 2) {
    checkAvailability(value)
  } else {
    isChecking.value = false
  }
}

// Check username availability with debounced function
const checkAvailability = async (username: string) => {
  if (!username || username.length < 2) return

  isChecking.value = true

  try {
    isAvailable.value = await debouncedUsernameValidator(username)
    hasBeenChecked.value = true
  } finally {
    isChecking.value = false
  }
}
</script>

<template>
  <div>
    <div class="relative">
      <Input
        :value="internalValue"
        @input="updateValue($event.target.value)"
        :disabled="disabled"
        type="text"
        placeholder="Your unique username"
        class="pr-10"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <Icon
          v-if="isChecking"
          name="heroicons:arrow-path"
          class="w-4 h-4 text-muted-foreground animate-spin"
        />
        <Icon
          v-else-if="hasBeenChecked && isAvailable && internalValue.length >= 2"
          name="heroicons:check-circle"
          class="w-4 h-4 text-success"
        />
        <Icon
          v-else-if="
            hasBeenChecked && !isAvailable && internalValue.length >= 2
          "
          name="heroicons:x-circle"
          class="w-4 h-4 text-destructive"
        />
      </div>
    </div>
    <div
      v-if="hasBeenChecked && !isAvailable && internalValue.length >= 2"
      class="mt-1 text-sm text-destructive"
    >
      Username is already taken
    </div>
    <div
      v-else-if="hasBeenChecked && isAvailable && internalValue.length >= 2"
      class="mt-1 text-sm text-success"
    >
      Username is available
    </div>
  </div>
</template>
