import { PostHog, EventMessage } from 'posthog-node'

export const capture = async (properties: EventMessage) => {
  const posthogApiKey = useRuntimeConfig().public.posthogApiKey
  if (!posthogApiKey) {
    return
  }

  const posthog = new PostHog(posthogApiKey, {
    host: useRuntimeConfig().public.posthogApiHost,
  })

  await posthog.capture(properties)
  await posthog.shutdown()
}

export default posthog
