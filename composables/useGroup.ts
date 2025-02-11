import { ref, computed } from 'vue'
import type { Organizer } from '~/schemas/organizers'
import { mockOrganizers } from '~/data/mockOrganizers'

export const useGroup = () => {
  const route = useRoute()
  const groupId = route.params.id as string

  const group = computed(() =>
    mockOrganizers.find((o: Organizer) => o.id === groupId)
  )

  return {
    group,
    groupId,
  }
}
