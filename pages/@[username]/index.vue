<script setup lang="ts">
const { profile, isOwner } = await useProfile()
</script>

<template>
  <ProfileLayout v-if="profile" :profile="profile">
    <div id="content" class="max-w-xl mx-auto">
      <PostEditor v-if="isOwner" class="mb-6" />
      <PostList :author-id="profile.id" pinned-first />
    </div>
  </ProfileLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
