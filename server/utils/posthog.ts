import { PostHog } from 'posthog-node'

const posthog = new PostHog(useRuntimeConfig().posthogApiKey, {
  host: useRuntimeConfig().posthogApiHost,
})

export default posthog
