import { defineEventHandler, getQuery, setResponseStatus } from '#imports'
import { getServerSession } from '#auth'
import type { ChatChannel } from '~/schemas/chat'
import { setupSSE, subscribe } from '#imports'

export default defineEventHandler(async (event) => {
  console.log('SSE Connection started')
  const res = setupSSE(event)
  const q = getQuery(event)
  const session = await getServerSession(event)
  const profileId = session?.profile?.id
  console.log('👤 Profile ID:', profileId)
  console.log('📝 Query:', q)

  const convId =
    typeof q.conversationId === 'string' ? q.conversationId : undefined
  const channel: ChatChannel | undefined = convId
    ? (`conversation:${convId}` as const)
    : profileId
      ? (`inbox:${profileId}` as const)
      : undefined
  console.log('Channel:', channel)

  if (!channel) {
    console.log('No channel, returning 401')
    setResponseStatus(event, 401)
    res.end()
    return
  }

  const unsubscribe = subscribe(channel, res)
  console.log('Subscribed to channel:', channel)
  const close = () => {
    unsubscribe()
    res.end()
  }
  event.node.req.on('close', close)
  event.node.req.on('aborted', close)
  const hb = setInterval(() => res.write(':hb\n\n'), 25000)
  event.node.req.on('close', () => clearInterval(hb))
  return new Promise(() => {})
})
