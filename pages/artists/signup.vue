<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="container max-w-2xl py-8">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Create Artist Profile</h1>
        <p class="text-muted-foreground">
          Join our community of dance artists and showcase your talent
        </p>
      </div>

      <div class="bg-card rounded-lg border p-6">
        <ArtistSignupForm />
      </div>
    </div>
  </div>
</template> 