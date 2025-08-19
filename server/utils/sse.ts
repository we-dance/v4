import type { H3Event } from 'h3'
import type { ChatChannel, ChatEvent } from '~/schemas/chat'

type Sink = NodeJS.WritableStream
const channels = new Map<ChatChannel, Set<Sink>>()

export function setupSSE(event: H3Event) {
  const res = event.node.res
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')

  res.flushHeaders?.()
  return res
}

export function subscribe(channel: ChatChannel, sink: Sink) {
  if (!channels.has(channel)) channels.set(channel, new Set())
  channels.get(channel)!.add(sink)
  return () => channels.get(channel)?.delete(sink)
}

export function publish(channel: ChatChannel, evt: ChatEvent) {
  const sinks = channels.get(channel)
  if (!sinks) return 0
  const payload = `data: ${JSON.stringify(evt)}\n\n`
  for (const s of sinks) s.write(payload)
  return sinks.size
}
