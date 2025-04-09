import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseUrl = import.meta.server
    ? `http://${config.public.apiHost || 'localhost:3000'}`
    : ''

  const client = createTRPCNuxtClient<AppRouter>({
    links: [httpBatchLink({ url: '/api/trpc' })],
  })

  return {
    provide: {
      client,
    },
  }
})
