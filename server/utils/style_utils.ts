import { prisma } from '~/server/prisma'

export async function getStyles() {
  const styles = await prisma.danceStyle.findMany()
  return styles
}
