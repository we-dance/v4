import { toast } from 'vue-sonner'
import type { Profile } from '~/schemas/profile'

export function useContact() {
  const { $client } = useNuxtApp()
  const { session } = useAppAuth()
  const route = useRoute()
  const currentUser = computed(() => session.value?.profile)
  const pending = ref(false)

  const startConversation = async (profile: Profile) => {
    if (pending.value) return
    if (!profile.claimed) {
      toast.error(`You can't message this profile yet.`)
      return
    }

    // Check if a user is logged in
    if (!currentUser.value) {
      await navigateTo({ path: '/login', query: { next: route.fullPath } })
      return
    }

    // Check if the user is trying to message themself
    if (currentUser.value.id === profile.id) {
      toast.info("You can't message yourself.")
      return
    }

    //else start a conversation
    try {
      pending.value = true
      const conversation = await $client.chat.createConversation.mutate({
        participantIds: [profile.id],
      })
      if (conversation?.id) {
        await navigateTo(`/chat/${conversation.id}`)
      } else {
        toast.error('Could not start the conversation. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to start the conversation. Please try again.')
    } finally {
      pending.value = false
    }
  }
  return {
    pending,
    startConversation,
  }
}
