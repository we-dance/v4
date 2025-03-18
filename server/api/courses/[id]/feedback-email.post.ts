import { getServerSession } from '#auth'
import { generateCourseFeedbackEmail } from '~/server/utils/email/templates/courseFeedback'
import emailService from '~/server/utils/email/emailService'
import { prisma } from '~/server/utils/prisma'
import type { Course } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    const body = await readBody(event)
    const { 
      studentEmail, 
      firstName,
      courseName, 
      instructorName,
      classDate,
      classTime,
      hoursAfterClass = 24 // Default to 24 hours if not specified
    } = body

    if (!studentEmail || !firstName || !courseName || !instructorName || !classDate || !classTime) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields',
      })
    }

    // Check if enough time has passed since the class ended
    const classEndTime = new Date(classDate + ' ' + classTime)
    const hoursToWait = hoursAfterClass * 60 * 60 * 1000 // Convert hours to milliseconds
    const timeToSend = new Date(classEndTime.getTime() + hoursToWait)

    if (new Date() < timeToSend) {
      throw createError({
        statusCode: 400,
        message: 'Too early to send feedback email',
      })
    }

    const courseId = getRouterParam(event, 'id')
    const feedbackUrl = `${process.env.AUTH_ORIGIN}/courses/${courseId}?feedback=true`
    const unsubscribeUrl = `${process.env.AUTH_ORIGIN}/settings/notifications`

    // Get similar classes (same style or instructor)
    const currentCourse = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        teaches: true, // Get dance styles
      },
    })

    const similarClasses = await prisma.course.findMany({
      where: {
        OR: [
          { instructorId: currentCourse?.instructorId }, // Same instructor
          {
            teaches: {
              some: {
                id: { in: currentCourse?.teaches.map((t: { id: string }) => t.id) }, // Same dance styles
              },
            },
          },
        ],
        id: { not: courseId }, // Exclude current course
      },
      take: 3, // Limit to 3 similar classes
      orderBy: {
        createdAt: 'desc',
      },
    })

    const emailContent = generateCourseFeedbackEmail({
      firstName,
      courseName,
      instructorName,
      classDate,
      classTime,
      feedbackUrl,
      unsubscribeUrl,
      similarClasses: similarClasses.map((cls: Course) => ({
        name: cls.name,
        url: `${process.env.AUTH_ORIGIN}/courses/${cls.id}`,
        date: cls.startDate ? new Date(cls.startDate).toLocaleDateString() : 'Flexible Schedule',
      })),
    })

    const success = await emailService.sendEmail({
      to: studentEmail,
      ...emailContent,
    })

    if (!success) {
      throw createError({
        statusCode: 500,
        message: 'Failed to send feedback email',
      })
    }

    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error',
    })
  }
}) 