<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})

const { data } = useAppAuth()
</script>

<template>
  <AccountInformation :initial-email="data?.user?.email || ''" />
  <PasswordSettings />
  <DangerZone />
</template>
