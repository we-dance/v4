import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createContext(event: H3Event) {
  return {
    prisma,
    event
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
