import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function addCourse(course: any) {
  const existingCourse = await prisma.course.findFirst({
    where: { id: course.id },
  })

  if (existingCourse) {
    return {
      state: 'ignored',
      id: existingCourse.id,
    }
  }

  if (!course.name) {
    return {
      state: 'failed',
      error: 'no_name',
      id: course.id,
    }
  }

  const instructor = await prisma.profile.findFirst({
    where: { firebaseUsername: course.instructor },
  })

  if (!instructor) {
    return {
      state: 'failed',
      error: 'instructor_not_found',
      id: course.id,
      ref: course.instructor,
    }
  }

  const instructorId = instructor.id

  const data: Prisma.CourseCreateInput = {
    slug: course.slug,
    name: course.name,
    description: course.description,
    subheader: course.subheader,
    coverUrl: course.coverUrl,
    instructor: {
      connect: {
        id: instructorId,
      },
    },
    offers: {
      create: course.offers.map((offer: any) => ({
        name: offer.name,
        price: offer.price,
        currency: offer.currency,
        duration: offer.duration,
        items: offer.items,
      })),
    },
    modules: {
      create: course.modules.map((module: any) => ({
        name: module.name,
        order: module.order || 0,
        description: module.description,
        lessons: {
          create: module.lessons.map((lesson: any) => ({
            name: lesson.name,
            duration: lesson.duration,
            videoId: lesson.videoId,
            locked: lesson.locked || false,
          })),
        },
      })),
    },
    resources: {
      create: course.resources.map((resource: any) => ({
        name: resource.name,
        description: resource.description,
        url: resource.url,
        locked: resource.locked || false,
      })),
    },
  }

  try {
    const result = await prisma.course.create({
      data,
    })

    return {
      state: 'created',
      id: result.id,
    }
  } catch (exception) {
    return {
      state: 'failed',
      error: 'invalid_prisma_course_create',
      id: course.id,
      exception,
    }
  }
}
