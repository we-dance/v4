import { prisma } from '~/server/prisma'
import { sendEmail } from '~/server/utils/email'
import { readBody } from 'h3'
import { randomUUID } from 'crypto'

export default eventHandler(async (event) => {
  const body = await readBody(event)

  const email = body.email
  if (!email) {
    throw createError({ statusCode: 400, message: 'Email required' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }

  const token = randomUUID()
  const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour validity

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expires,
    },
  })

  const appUrl = useRuntimeConfig().public.appUrl
  const resetLink = `${appUrl}/reset-password?token=${token}`

  try {
    await sendEmail('forgot-password', { email: user.email, resetLink })

    return { success: true }
  } catch (error: any) {
    // Re-throw if it's already a proper error
    if (error.statusCode) {
      throw error
    }

    // Log the error for debugging
    console.error('Forgot password error:', error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
