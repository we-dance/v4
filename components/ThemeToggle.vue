<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <Switch :checked="isDark" @update:checked="toggleTheme" class="relative">
    <template #thumb>
      <Icon v-if="isDark" name="lucide:moon" size="16" />
      <Icon v-else name="lucide:sun" size="16" />
    </template>
  </Switch>
</template>
