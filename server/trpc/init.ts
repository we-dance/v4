import { initTRPC } from '@trpc/server'
import type { H3Event } from 'h3'
import { getServerSession } from '#auth'

export const createTRPCContext = async (event: H3Event) => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { event: event }
}

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})

export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware
