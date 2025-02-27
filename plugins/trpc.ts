import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '~/server/trpc/routers'
import superjson from 'superjson'

export default defineNuxtPlugin(() => {
  /**
   * Create tRPC client for use in Vue components
   */
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
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