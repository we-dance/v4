<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['sidebase-auth'],
})
</script>

<template>
  <ProfileInformation />
  <SocialLinks />
</template>
