import { defineEventHandler, getQuery, setResponseStatus } from '#imports'
import { getServerSession } from 'next-auth'
import type { ChatChannel } from '~/schemas/chat'
import { setupSSE, subscribe } from '#imports'

export default defineEventHandler(async (event) => {
  const res = setupSSE(event)
  const q = getQuery(event)
  const session = await getServerSession()
  const userId = session?.user?.id

  const convId =
    typeof q.conversationId === 'string' ? q.conversationId : undefined
  const channel: ChatChannel | undefined = convId
    ? (`conversation:${convId}` as const)
    : userId
      ? (`inbox:${userId}` as const)
      : undefined

  if (!channel) {
    setResponseStatus(event, 401)
    res.end()
    return
  }

  const unsubscribe = subscribe(channel, res)
  const close = () => {
    unsubscribe()
    res.end()
  }
  event.node.req.on('close', close)
  event.node.req.on('aborted', close)
  const hb = setInterval(() => res.write(':hb\n\n'), 25000)
  event.node.req.on('close', () => clearInterval(hb))
})
