<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'

const { artist, artistId } = useArtist()
</script>

<template>
  <ProfileLayout v-if="artist" :artist="artist">
    <div class="max-w-xl mx-auto">
      <PostList :type="'all'" :limit="3" :author-id="artistId" />
    </div>
  </ProfileLayout>

  <EmptyState v-else variant="profile-not-found" />
</template>
