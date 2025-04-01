import type { H3Event } from 'h3'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(_event: H3Event) {
  return {
    prisma: _event.context.prisma,
    event: _event,
  }
}
