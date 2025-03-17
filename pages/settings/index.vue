<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['auth'],
})
</script>

<template>
  <AccountInformation />
  <PasswordSettings />
  <DangerZone />
</template>
