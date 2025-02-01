<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'

const { artist, artistId } = useArtist()
</script>

<template>
  <ArtistLayout v-if="artist" :artist="artist">
    <div class="max-w-xl mx-auto">
      <EmptyState variant="no-media" />
    </div>
  </ArtistLayout>

  <EmptyState v-else variant="artist-not-found" />
</template>
