<script setup lang="ts">
import { toast } from 'vue-sonner'
const { profile } = defineProps<{
  profile: any
}>()
const { $client } = useNuxtApp()
const { session } = useAppAuth()
const currentUser = computed(() => session.value?.profile)

const handleContact = async () => {
  if (!profile.claimed) {
    console.error('This profile is not clalimed')
    toast.error(`You can't message this profile yet.`)
    return
  }

  // Check if a user is logged in
  if (!currentUser.value) {
    return navigateTo('/login')
  }

  // Check if the user is trying to message themself
  if (currentUser.value.id === profile.id) {
    console.error("You can't message yourself.")
    return
  }

  //else start a conversation
  try {
    const conversation = await $client.chat.createConversation.mutate({
      participantIds: [profile.id],
    })
    if (conversation?.id) {
      navigateTo(`/chat/${conversation.id}`)
    }
  } catch (error) {
    console.error('Failed to create or get conversation', error)
  }
}
</script>

<template>
  <div class="flex items-start gap-4">
    <NuxtLink
      :to="`/@${profile.username}`"
      class="hover:text-accent flex-shrink-0"
    >
      <Avatar :profile="profile" class="w-24 h-24 rounded-lg" />
    </NuxtLink>
    <div>
      <h4 class="font-semibold text-lg">
        <NuxtLink :to="`/@${profile.username}`" class="hover:text-accent">
          {{ profile.name }}
        </NuxtLink>
      </h4>
      <p class="text-sm text-muted-foreground mb-2">
        {{ profile.bio }}
      </p>
      <div
        v-if="profile.aggregateRating"
        class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
      >
        <Icon name="ph:star-fill" class="w-4 h-4 text-warning" />
        {{ profile.aggregateRating?.ratingValue }} ({{
          profile.aggregateRating?.reviewCount
        }}
        reviews)
      </div>
      <div class="flex justify-center md:justify-start gap-2">
        <Button variant="primary">Subscribe</Button>
        <Button variant="secondary" @click="handleContact">Send Message</Button>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-4 mt-4" v-if="profile.instagram">
          <a
            v-if="profile.instagram"
            :href="profile.instagram"
            target="_blank"
            class="text-muted-foreground hover:text-accent"
          >
            <Icon name="ph:instagram-logo" class="w-6 h-6" />
          </a>
          <a
            v-if="profile.youtube"
            :href="profile.youtube"
            target="_blank"
            class="text-muted-foreground hover:text-destructive"
          >
            <Icon name="ph:youtube-logo" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
