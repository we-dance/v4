<script setup lang="ts">
const { profile, isOwner } = await useProfile()
</script>

<template>
  <ProfileLayout v-if="profile" :profile="profile">
    <div class="max-w-xl mx-auto">
      <Create v-if="isOwner" class="mb-6" />
      <PostList :type="'all'" :limit="3" :author-id="profile.id" />
    </div>
  </ProfileLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
