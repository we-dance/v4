/**
 * Course importer
 * Imports courses from mockCourses.ts to Prisma database
 */

import { PrismaClient } from '@prisma/client'
import { mockCourses } from './mockCourses'
import { logger } from '../utils/logger'

const prisma = new PrismaClient()
const mockCoursesData = mockCourses

/**
 * Transform course data from mockCourses.ts to Prisma format
 */
async function transformCourseData(course: any) {
  // Extract core course data
  const courseData = {
    id: course['@id'] || '', // Use @id as primary identifier
    name: course.name || '',
    description: course.description || '',
    educationalLevel: course.educationalLevel || 'Beginner',
    timeRequired: course.timeRequired || '',
    numberOfLessons: course.numberOfLessons || 0,
    // Store original instructor data for future reference
    originalInstructorId: course.instructor?.identifier || null,
    // Обогащаем данные инструктора
    instructorData: course.instructor ? {
      ...course.instructor,
      // Сохраняем опыт и достижения в полном объеме
      experience: course.instructor.experience || null,
      // Если у инструктора нет jobTitle, но есть achievements, используем первое достижение
      jobTitle: course.instructor.jobTitle || 
                (course.instructor.experience?.achievements && 
                 course.instructor.experience.achievements.length > 0 ? 
                 course.instructor.experience.achievements[0] : 'Dance Instructor')
    } : null,
    // Store original course data as JSON (including metadata)
    metadata: {
      inLanguage: course.inLanguage || [],
      dateCreated: course.dateCreated || new Date().toISOString(),
      dateModified: course.dateModified || new Date().toISOString(),
      // Extract image URL from correct location
      image: course.image?.url || (course.instructor?.image ? course.instructor.image : ''),
      video: course.video || null,
      stats: course.stats || { enrolled: 0, completed: 0 },
      community: course.community || null,
      provider: course.provider || null,
      subscriptionControl: course.subscriptionControl || null,
      // Сохраняем важные данные для отображения на фронтенде
      aggregateRating: course.aggregateRating || null,
      review: course.review || [],
      offers: course.offers || [],
    },
    // Default published status
    published: true,
    // Create slug from id
    slug: course['@id'] ? course['@id'].split('/').pop() : '',
  }

  return courseData
}

/**
 * Transform module data from course.hasPart
 */
async function transformModuleData(courseId: string, modules: any[]) {
  return modules.map((module, index) => ({
    courseId,
    id: `${courseId}-module-${module.identifier || index + 1}`,
    identifier: module.identifier || index + 1,
    name: module.name || `Module ${index + 1}`,
    description: '',
    order: index + 1,
    // Don't include lessons here, we'll process them separately
  }))
}

/**
 * Transform lesson data from module.hasPart
 */
async function transformLessonData(moduleId: string, lessons: any[]) {
  return lessons.map((lesson, index) => ({
    moduleId,
    id: `${moduleId}-lesson-${lesson.identifier || index + 1}`,
    identifier: lesson.identifier || index + 1,
    name: lesson.name || `Lesson ${index + 1}`,
    timeRequired: lesson.timeRequired || '',
    videoId: lesson.video?.identifier || '',
    videoProvider: lesson.video?.provider || 'youtube',
    videoDuration: lesson.video?.duration || '',
    order: index + 1,
    locked: lesson.locked || false,
  }))
}

/**
 * Transform course offerings data
 */
async function transformOfferingsData(courseId: string, offers: any[]) {
  return offers.map((offer, index) => ({
    courseId,
    id: `${courseId}-offer-${index + 1}`,
    price: offer.price || 0,
    currency: offer.priceCurrency || 'EUR',
    duration: offer.duration || 'P1M',
    name: offer.name || 'regular',
    validFrom: offer.validFrom || null,
    validThrough: offer.validThrough || null,
  }))
}

/**
 * Transform course reviews
 */
async function transformReviewsData(courseId: string, reviews: any[]) {
  return reviews.map((review, index) => ({
    courseId,
    id: `${courseId}-review-${review.identifier || index + 1}`,
    rating: review.reviewRating?.ratingValue || 5,
    content: review.reviewBody || '',
    authorName: review.author?.name || 'Anonymous',
    publishedAt: review.datePublished || new Date().toISOString(),
  }))
}

/**
 * Transform course resources/materials
 */
async function transformResourcesData(courseId: string, resources: any[]) {
  return resources.map((resource, index) => ({
    courseId,
    id: `${courseId}-resource-${resource.id || index + 1}`,
    name: resource.name || `Resource ${index + 1}`,
    type: resource.learningResourceType || 'other',
    contentSize: resource.contentSize || '',
    icon: resource.icon || '',
    url: '',
  }))
}

/**
 * Import all courses from mockCourses.ts to Prisma
 * Note: This function depends on models in schema.prisma:
 * - Course
 * - CourseModule
 * - CourseLesson
 * - CourseOffering
 * - CourseReview
 * - CourseResource
 */
export async function importCourses() {
  logger.info('Starting course import')
  logger.info(`Found ${mockCoursesData.length} courses to import`)

  try {
    // Process each course
    for (const course of mockCoursesData) {
      logger.info(`Processing course: ${course.name}`)
      
      // Transform course data
      const courseData = await transformCourseData(course)
      
      try {
        // Check if course already exists
        const existingCourse = await (prisma as any).course.findUnique({
          where: { id: courseData.id },
        })

        // Create or update course
        const savedCourse = existingCourse
          ? await (prisma as any).course.update({
              where: { id: courseData.id },
              data: courseData,
            })
          : await (prisma as any).course.create({
              data: courseData,
            })

        logger.info(`Course saved: ${savedCourse.name} (${savedCourse.id})`)

        // Process modules and lessons if present
        if (course.hasPart && Array.isArray(course.hasPart)) {
          const modules = await transformModuleData(savedCourse.id, course.hasPart)
          
          for (const moduleData of modules) {
            // Check if module exists
            const existingModule = await (prisma as any).courseModule.findUnique({
              where: { id: moduleData.id },
            })

            // Create or update module
            const savedModule = existingModule
              ? await (prisma as any).courseModule.update({
                  where: { id: moduleData.id },
                  data: moduleData,
                })
              : await (prisma as any).courseModule.create({
                  data: moduleData,
                })

            logger.info(`Module saved: ${savedModule.name} (${savedModule.id})`)

            // Process lessons if present in this module
            const moduleSource = course.hasPart.find(
              (m: any) => m.identifier === moduleData.identifier
            )
            
            if (moduleSource?.hasPart && Array.isArray(moduleSource.hasPart)) {
              const lessons = await transformLessonData(
                savedModule.id,
                moduleSource.hasPart
              )
              
              for (const lessonData of lessons) {
                // Check if lesson exists
                const existingLesson = await (prisma as any).courseLesson.findUnique({
                  where: { id: lessonData.id },
                })

                // Create or update lesson
                const savedLesson = existingLesson
                  ? await (prisma as any).courseLesson.update({
                      where: { id: lessonData.id },
                      data: lessonData,
                    })
                  : await (prisma as any).courseLesson.create({
                      data: lessonData,
                    })

                logger.info(`Lesson saved: ${savedLesson.name} (${savedLesson.id})`)
              }
            }
          }
        }
        
        // Process offerings if present
        if (course.offers && Array.isArray(course.offers)) {
          const offerings = await transformOfferingsData(savedCourse.id, course.offers)
          
          for (const offeringData of offerings) {
            // Check if offering exists
            const existingOffering = await (prisma as any).courseOffering.findUnique({
              where: { id: offeringData.id },
            })

            // Create or update offering
            const savedOffering = existingOffering
              ? await (prisma as any).courseOffering.update({
                  where: { id: offeringData.id },
                  data: offeringData,
                })
              : await (prisma as any).courseOffering.create({
                  data: offeringData,
                })

            logger.info(`Offering saved: ${savedOffering.name} (${savedOffering.id})`)
          }
        }
        
        // Process reviews if present
        if (course.review && Array.isArray(course.review)) {
          const reviews = await transformReviewsData(savedCourse.id, course.review)
          
          for (const reviewData of reviews) {
            // Check if review exists
            const existingReview = await (prisma as any).courseReview.findUnique({
              where: { id: reviewData.id },
            })

            // Create or update review
            const savedReview = existingReview
              ? await (prisma as any).courseReview.update({
                  where: { id: reviewData.id },
                  data: reviewData,
                })
              : await (prisma as any).courseReview.create({
                  data: reviewData,
                })

            logger.info(`Review saved: ${reviewData.authorName} (${savedReview.id})`)
          }
        }
        
        // Process resources if present 
        if (course.learningResources && Array.isArray(course.learningResources)) {
          const resources = await transformResourcesData(savedCourse.id, course.learningResources)
          
          for (const resourceData of resources) {
            // Check if resource exists
            const existingResource = await (prisma as any).courseResource.findUnique({
              where: { id: resourceData.id },
            })

            // Create or update resource
            const savedResource = existingResource
              ? await (prisma as any).courseResource.update({
                  where: { id: resourceData.id },
                  data: resourceData,
                })
              : await (prisma as any).courseResource.create({
                  data: resourceData,
                })

            logger.info(`Resource saved: ${savedResource.name} (${savedResource.id})`)
          }
        }
        
      } catch (error: any) {
        logger.error(`Error processing course ${course.name}: ${error.message}`)
      }
    }
    
    logger.info('Course import completed successfully')
    return { success: true, message: 'All courses imported successfully' }
    
  } catch (error: any) {
    logger.error(`Course import failed: ${error.message}`)
    return { success: false, message: `Import failed: ${error.message}` }
  } finally {
    await prisma.$disconnect()
  }
}

// Run import if this file is executed directly
if (require.main === module) {
  importCourses()
    .then((result) => {
      logger.info(result.message)
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      logger.error('Import failed:', error)
      process.exit(1)
    })
}

export default { importCourses } 