import { router } from '../trpc'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { chatRouter } from './chat'
import { usersRouter } from './users'
import { coursesRouter } from './courses'
import { offersRouter } from './offers'

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  chat: chatRouter,
  users: usersRouter,
  courses: coursesRouter,
  offers: offersRouter,
})

export type AppRouter = typeof appRouter
