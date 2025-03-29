import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { chatRouter } from './chat'
import { usersRouter } from './users'
import { coursesRouter } from './courses'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  chat: chatRouter,
  users: usersRouter,
  courses: coursesRouter,
})

export type AppRouter = typeof appRouter
