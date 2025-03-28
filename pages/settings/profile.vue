<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['auth'],
})
</script>

<template>
  <ProfileInformation />
  <SocialLinks />
</template>
