import { ref, computed } from 'vue'
import type { Group } from '~/schemas/group'
import { organizers } from '~/data/mockOrganizers'

export const useGroup = () => {
  const route = useRoute()
  const groupId = route.params.id as string

  const group = computed(() => organizers.find((o) => o.id === groupId))

  return {
    group,
    groupId,
  }
}
