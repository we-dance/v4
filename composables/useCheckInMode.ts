import { useLocalStorage } from '@vueuse/core'

export const useCheckInMode = () => {
  // Use VueUse's useLocalStorage which handles SSR properly
  const isCheckInMode = useLocalStorage('checkInMode', false)
  const currentEventId = useLocalStorage<string | null>('checkInEventId', null)
  const eventName = useLocalStorage<string | null>('checkInEventName', null)

  const enableCheckInMode = (eventId: string, name: string) => {
    isCheckInMode.value = true
    currentEventId.value = eventId
    eventName.value = name
  }

  const disableCheckInMode = () => {
    isCheckInMode.value = false
    currentEventId.value = null
    eventName.value = null
  }

  const getCheckInContext = () => ({
    isActive: isCheckInMode.value,
    eventId: currentEventId.value,
    eventName: eventName.value,
  })

  return {
    isCheckInMode: readonly(isCheckInMode),
    currentEventId: readonly(currentEventId),
    eventName: readonly(eventName),
    enableCheckInMode,
    disableCheckInMode,
    getCheckInContext,
  }
}
