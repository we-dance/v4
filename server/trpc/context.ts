import type { H3Event } from 'h3'

export function createContext(event: H3Event) {
  return {
    event,
  }
}
