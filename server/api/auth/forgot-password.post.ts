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

  const appUrl = useRuntimeConfig().appUrl
  const resetLink = `${appUrl}/reset-password?token=${token}`
  await sendEmail('forgot-password', { email: user.email, resetLink })

  return { success: true }
})
