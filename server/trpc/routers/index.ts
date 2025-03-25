import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { usersRouter } from './users'
import { subscriptionsRouter } from './subscriptions'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  users: usersRouter,
  subscriptions: subscriptionsRouter,
})

export type AppRouter = typeof appRouter
