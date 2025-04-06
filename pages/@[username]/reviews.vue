<script setup lang="ts">
const { profile } = await useProfile()
</script>

<template>
  <ProfileLayout v-if="profile" :profile="profile">
    <NotImplemented />
  </ProfileLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
