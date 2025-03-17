<script setup lang="ts">
defineProps<{
  profile: any
}>()
</script>

<template>
  <img
    :src="
      profile.photo ||
      'https://api.dicebear.com/7.x/avataaars/svg?seed=' + profile.id
    "
    :alt="profile.name"
    class="bg-white"
  />
</template>
