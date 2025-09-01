import { toast } from 'vue-sonner'
import type { Profile } from '~/schemas/profile'

export function useContact() {
  const { $client } = useNuxtApp()
  const { session } = useAppAuth()
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
      return navigateTo('/login')
    }

    // Check if the user is trying to message themself
    if (currentUser.value.id === profile.id) {
      console.error("You can't message yourself.")
      return
    }

    //else start a conversation
    try {
      pending.value = true
      const conversation = await $client.chat.createConversation.mutate({
        participantIds: [profile.id],
      })
      if (conversation?.id) {
        navigateTo(`/chat/${conversation.id}`)
      }
    } catch (error) {
      console.error('Failed to create or get conversation', error)
    } finally {
      pending.value = false
    }
  }
  return {
    pending,
    startConversation,
  }
}
