<script setup lang="ts">
const { profile } = await useProfile()
</script>

<template>
  <ArtistLayout v-if="profile" :profile="profile">
    <NotImplemented />
  </ArtistLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
