<script setup lang="ts">
defineProps<{
  name: string
  description: string
}>()

const getGradient = (name: string) => {
  switch (name) {
    case 'gradient-base':
      return 'hsl(var(--gradient-base))'
    case 'gradient-1':
      return 'hsl(var(--gradient-1))'
    case 'gradient-2':
      return 'hsl(var(--gradient-2))'
    case 'gradient-3':
      return 'hsl(var(--gradient-3))'
    default:
      return ''
  }
}

const getHSL = (name: string) => {
  if (typeof document === 'undefined') return { light: '', dark: '' }

  // Get light mode value
  const light = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  )

  // Get dark mode value by temporarily adding dark class
  document.documentElement.classList.add('dark')
  const dark = getComputedStyle(document.documentElement).getPropertyValue(
    `--${name}`
  )
  document.documentElement.classList.remove('dark')

  return { light, dark }
}
</script>

<template>
  <div class="p-4 rounded-lg border">
    <div class="h-16 rounded-lg mb-2">
      <div
        v-if="name.includes('gradient')"
        class="w-full h-full rounded-lg"
        :style="{ background: getGradient(name) }"
      />
      <div
        v-else
        :class="[
          'w-full h-full rounded-lg p-4',
          `bg-${name}`,
          name.includes('foreground')
            ? `text-${name.split('-')[0]}`
            : `text-${name}-foreground`,
        ]"
      >
        <span>Aa</span>
      </div>
    </div>
    <div class="font-medium mb-1">{{ name }}</div>
    <div class="text-sm text-muted-foreground space-y-1">
      <div>Light: hsl({{ getHSL(name).light }})</div>
      <div>Dark: hsl({{ getHSL(name).dark }})</div>
    </div>
    <div class="text-sm text-muted-foreground mt-2">{{ description }}</div>
  </div>
</template>
