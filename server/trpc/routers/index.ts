import { router } from '~/server/trpc/init'
import { postsRouter } from './posts'
import { eventsRouter } from './events'
import { profilesRouter } from './profiles'
import { chatRouter } from './chat'
import { usersRouter } from './users'
import { coursesRouter } from './courses'
import { checkoutRouter } from './checkout'
import { subscriptionsRouter } from './subscriptions'
import { communitiesRouter } from './communities'
export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
  profiles: profilesRouter,
  chat: chatRouter,
  users: usersRouter,
  courses: coursesRouter,
  checkout: checkoutRouter,
  subscriptions: subscriptionsRouter,
  communities: communitiesRouter,
})

export type AppRouter = typeof appRouter
