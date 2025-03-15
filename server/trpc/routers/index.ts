import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { usersRouter } from './users'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
