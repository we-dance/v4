import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profileRouter } from './profile'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profileRouter,
})

export type AppRouter = typeof appRouter
