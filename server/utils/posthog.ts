import { PostHog, EventMessage } from 'posthog-node'

export const capture = async (properties: EventMessage) => {
  const posthogDisabled = useRuntimeConfig().public.posthogDisabled
  if (posthogDisabled) {
    return
  }

  const publicKey = useRuntimeConfig().public.posthog.publicKey
  if (!publicKey) {
    return
  }

  const posthog = new PostHog(publicKey, {
    host: useRuntimeConfig().public.posthog.host,
  })

  await posthog.capture(properties)
  await posthog.shutdown()
}
