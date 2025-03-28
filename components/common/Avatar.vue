<script setup lang="ts">
const props = defineProps<{
  profile: any
}>()

const avatarUrl = computed(() => {
  if (props?.profile?.photo) {
    return props.profile.photo
  }

  if (props?.profile?.id) {
    return 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + props.profile.id
  }

  return null
})
</script>

<template>
  <img :src="avatarUrl" alt="profile avatar" class="bg-white" />
</template>
