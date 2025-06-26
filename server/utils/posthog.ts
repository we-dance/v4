import { PostHog } from 'posthog-node'

const posthog = new PostHog(useRuntimeConfig().public.posthogApiKey, {
  host: useRuntimeConfig().public.posthogApiHost,
})

export default posthog
