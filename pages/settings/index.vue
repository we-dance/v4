<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})

const { data } = useAppAuth()
</script>

<template>
  <AccountInformation :data="data" />
  <PasswordSettings />
  <DangerZone />
</template>
