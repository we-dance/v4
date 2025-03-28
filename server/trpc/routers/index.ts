import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { usersRouter } from './users'
import { coursesRouter } from './courses'
import { subscriptionsRouter } from './subscriptions'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  users: usersRouter,
  courses: coursesRouter,
  subscriptions: subscriptionsRouter,
})

export type AppRouter = typeof appRouter
