<script setup lang="ts">
const props = defineProps<{
  profile: any
}>()

const avatarUrl = computed(() => {
  if (props?.profile?.photo) {
    return props.profile.photo
  }

  // if (props?.profile?.id) {
  //   return 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + props.profile.id
  // }

  return null
})
</script>

<template>
  <NuxtImg
    v-if="avatarUrl"
    :src="avatarUrl"
    alt="profile avatar"
    class="bg-white object-cover"
  />
  <div v-else>
    <div class="bg-muted w-full h-full flex items-center justify-center">
      <Icon
        v-if="props.profile.type === 'Venue'"
        name="ph:building-fill"
        class="w-16 h-16 text-muted-foreground"
      />
      <Icon
        v-else
        name="ph:user-circle-fill"
        class="w-16 h-16 text-muted-foreground"
      />
    </div>
  </div>
</template>
