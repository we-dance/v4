<script setup lang="ts">
const props = defineProps<{
  error: string
}>()
</script>

<template>
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{{ error }}</AlertDescription>
  </Alert>
</template>
