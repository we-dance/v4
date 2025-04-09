<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <AccountInformation />
  <PasswordSettings />
  <DangerZone />
</template>
