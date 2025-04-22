<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <NotificationsSettings />
</template>
