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
  const set = channels.get(channel)!
  set.add(sink)
  const cleanup = () => {
    set.delete(sink)
    if (set.size === 0) channels.delete(channel)
  }
  // Best-effort cleanup
  sink.on?.('close', cleanup)
  //ts-expect-error
  sink.on?.('error', cleanup)
  return cleanup
}

export function publish(channel: ChatChannel, evt: ChatEvent) {
  const sinks = channels.get(channel)
  if (!sinks) {
    return 0
  }
  const payload = `data: ${JSON.stringify(evt)}\n\n`
  let delivered = 0
  for (const s of Array.from(sinks)) {
    try {
      s.write(payload)
      delivered++
    } catch {
      sinks.delete(s)
    }
  }
  if (sinks.size === 0) channels.delete(channel)
  return delivered
}
