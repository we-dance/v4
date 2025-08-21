import { setResponseHeaders, type H3Event } from 'h3'
import type { ChatChannel, ChatEvent } from '~/schemas/chat'

type Sink = NodeJS.WritableStream
const channels = new Map<ChatChannel, Set<Sink>>()

export function setupSSE(event: H3Event) {
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  return event.node.res
}

export function subscribe(channel: ChatChannel, sink: Sink) {
  if (!channels.has(channel)) channels.set(channel, new Set())
  channels.get(channel)!.add(sink)
  return () => channels.get(channel)?.delete(sink)
}

export function publish(channel: ChatChannel, evt: ChatEvent) {
  const sinks = channels.get(channel)
  if (!sinks) {
    return 0
  }

  const payload = `data: ${JSON.stringify(evt)}\n\n`
  console.log(`Publishing to ${channel}:`, payload)
  for (const s of sinks) s.write(payload)
  return sinks.size
}
