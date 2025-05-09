<script setup lang="ts">
const { profile } = defineProps<{
  profile: any
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b">
      <h3 class="font-semibold">About the Instructor</h3>
    </div>
    <div class="p-4">
      <ProfileCard :profile="profile" />
    </div>
  </div>
</template>
