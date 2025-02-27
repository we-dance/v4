import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '~/server/trpc/routers'
import superjson from 'superjson'

export default defineNuxtPlugin(() => {
  // Get the base URL for API requests
  const config = useRuntimeConfig()
  const baseUrl = import.meta.server
    ? `http://${config.public.apiHost || 'localhost:3000'}`
    : ''

  /**
   * Create tRPC client with properly formed URL
   */
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${baseUrl}/api/trpc`,
      }),
    ],
    transformer: superjson,
  })

  return {
    provide: {
      client,
    },
  }
})
