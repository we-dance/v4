<script setup lang="ts">
import { computed, watch } from 'vue'

const props = defineProps<{
  password: string
}>()

const { strength, strengthPercent, checkStrength } = usePasswordStrength()

// Update strength whenever password changes
watch(
  () => props.password,
  (newValue) => {
    checkStrength(newValue || '')
  },
  { immediate: true }
)

// Computed properties for UI display
const strengthColor = computed(() => {
  switch (strength.value) {
    case 'weak':
      return 'bg-destructive'
    case 'medium':
      return 'bg-warning'
    case 'strong':
      return 'bg-success'
    default:
      return 'bg-destructive'
  }
})

const strengthTextColor = computed(() => {
  switch (strength.value) {
    case 'weak':
      return 'text-destructive'
    case 'medium':
      return 'text-warning'
    case 'strong':
      return 'text-success'
    default:
      return 'text-destructive'
  }
})

const strengthLabel = computed(() => {
  switch (strength.value) {
    case 'weak':
      return 'Weak'
    case 'medium':
      return 'Medium'
    case 'strong':
      return 'Strong'
    default:
      return 'Weak'
  }
})

// Check if password meets requirements
const hasMinLength = computed(() => (props.password?.length || 0) >= 8)
const passwordLength = computed(() => props.password?.length || 0)

// Check character variety
const hasLowercase = computed(() => /[a-z]/.test(props.password || ''))
const hasUppercase = computed(() => /[A-Z]/.test(props.password || ''))
const hasNumbers = computed(() => /[0-9]/.test(props.password || ''))
const hasSymbols = computed(() => /[^A-Za-z0-9]/.test(props.password || ''))
const characterVariety = computed(() => {
  let count = 0
  if (hasLowercase.value) count++
  if (hasUppercase.value) count++
  if (hasNumbers.value) count++
  if (hasSymbols.value) count++
  return count
})
</script>

<template>
  <div>
    <!-- Password strength indicator -->
    <div class="mt-2 max-w-md">
      <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          class="h-full transition-all duration-300"
          :class="strengthColor"
          :style="{ width: strengthPercent + '%' }"
        ></div>
      </div>
      <p class="text-xs mt-1" :class="strengthTextColor">
        {{ strengthLabel }}
      </p>
    </div>
  </div>
</template>
