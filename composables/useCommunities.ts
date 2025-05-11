import { ref } from 'vue'
import type { DanceStyle } from '@prisma/client'

export function useCommunities() {
  const communities = useState('communities', () =>
    ref<DanceStyle[] | null>(null)
  )
  const loading = useState('communities-loading', () => ref(false))
  const error = useState('communities-error', () => ref(null))

  const { $client } = useNuxtApp()

  const loadCommunities = async () => {
    if (communities.value !== null || loading.value) return

    loading.value = true
    error.value = null

    try {
      const data = await $client.communities.list.query()
      communities.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  if (communities.value === null && !loading.value) {
    loadCommunities()
  }

  return {
    communities,
    loading,
    error,
    loadCommunities,
  }
}
