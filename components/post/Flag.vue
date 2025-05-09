<script setup lang="ts">
import 'flag-icons/css/flag-icons.min.css'

defineProps<{
  country: string
}>()
</script>

<template>
  <span :class="`fi fi-${country}`"></span>
</template>
