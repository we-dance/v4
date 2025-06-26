import { prisma } from '~/server/prisma'
import { readBody } from 'h3'
import { FirebaseScrypt } from 'firebase-scrypt'

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY),
}

export default eventHandler(async (event) => {
  const body = await readBody(event)

  const { token, password } = body
  if (!token || !password) {
    throw createError({ statusCode: 400, message: 'Missing token or password' })
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })
  if (!resetToken || resetToken.expires < new Date()) {
    throw createError({ statusCode: 400, message: 'Invalid or expired token' })
  }

  const salt = Buffer.from(String(Math.random()).slice(7)).toString('base64')
  const scrypt = new FirebaseScrypt(firebaseParameters)
  const hash = await scrypt.hash(password, salt)

  await prisma.user.update({
    where: {
      id: resetToken.userId,
    },
    data: {
      hash,
      salt,
    },
  })

  await prisma.passwordResetToken.delete({ where: { token } })

  return { success: true }
})
