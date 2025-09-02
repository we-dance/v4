import { defineEventHandler, getQuery, setResponseStatus } from '#imports'
import { getServerSession } from '#auth'
import type { ChatChannel } from '~/schemas/chat'
import { setupSSE, subscribe } from '#imports'
import { prisma } from '~/server/prisma'

async function hasAccessToConversation(
  conversationId: string,
  profileId: string
) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    select: { aId: true, bId: true },
  })
  return (
    !!conversation &&
    (conversation.aId === profileId || conversation.bId === profileId)
  )
}

export default defineEventHandler(async (event) => {
  const res = setupSSE(event)
  const q = getQuery(event)
  const session = await getServerSession(event)
  const profileId = session?.profile?.id

  const convId =
    typeof q.conversationId === 'string' ? q.conversationId : undefined

  if (!session) {
    setResponseStatus(event, 401)
    res.end()
    return
  }

  const channel: ChatChannel | undefined = convId
    ? (`conversation:${convId}` as const)
    : profileId
      ? (`inbox:${profileId}` as const)
      : undefined

  if (!channel) {
    setResponseStatus(event, 400)
    res.end()
    return
  }

  if (convId) {
    const ok = await hasAccessToConversation(convId, profileId!)
    if (!ok) {
      setResponseStatus(event, 403)
      res.end()
      return
    }
  }

  const unsubscribe = subscribe(channel, res)
  const hb = setInterval(() => res.write(':hb\n\n'), 25000)

  let cleaned = false
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    clearInterval(hb)
    try {
      unsubscribe()
    } catch {}
    try {
      res.end()
    } catch {}
  }
  event.node.req.on('close', cleanup)
  event.node.req.on('aborted', cleanup)
  return new Promise(() => {})
})
