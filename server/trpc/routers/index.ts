import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
// Import other routers here...

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  // Add other routers here...
})
// export type definition of API
export type AppRouter = typeof appRouter
