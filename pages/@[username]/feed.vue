<script setup lang="ts">
const { profile, isOwner } = await useProfile()
const { isCheckInMode } = useCheckInMode()
</script>

<template>
  <!-- Show check-in interface if check-in mode is active -->
  <CheckInInterface
    v-if="isCheckInMode && profile?.id"
    :profile-id="profile.id"
  />

  <!-- Regular profile view -->
  <ProfileLayout v-else-if="profile" :profile="profile">
    <div id="content" class="max-w-xl mx-auto">
      <PostEditor v-if="isOwner" class="mb-6" />
      <PostList :author-id="profile.id" pinned-first />
    </div>
  </ProfileLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
