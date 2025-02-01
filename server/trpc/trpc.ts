import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson,
})

/**
 * Create a router
 * @see https://trpc.io/docs/router
 */
export const router = t.router

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/procedures
 **/
export const publicProcedure = t.procedure
