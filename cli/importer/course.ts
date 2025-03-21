/**
 * Course Importer
 * 
 * This module imports courses from YAML files into the database.
 * It handles all related entities (modules, lessons, offerings, reviews, resources).
 */
import { readFileSync, readdirSync } from 'fs'
import { PrismaClient } from '@prisma/client'
import { parse } from 'yaml'
import { join } from 'path'
import { courseSchema, type Course } from '../../schemas/course'

// Initialize Prisma client
const prisma = new PrismaClient()
const BATCH_SIZE = 10

/**
 * Reads and parses a YAML file
 * @param filePath Path to the YAML file
 * @returns Parsed YAML content
 */
function readYamlFile(filePath: string): unknown {
  try {
    const fullPath = join(process.cwd(), filePath)
    const fileContent = readFileSync(fullPath, 'utf8')
    return parse(fileContent)
  } catch (error) {
    console.error(`Failed to read YAML file: ${filePath}`)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = String(error)
    }
    console.error(errorMessage)
    throw new Error(`YAML reading error: ${errorMessage}`)
  }
}

/**
 * Validates course data against schema
 * @param data Raw course data
 * @returns Validated course data
 */
function validateCourseData(data: unknown): Course {
  try {
    return courseSchema.parse(data)
  } catch (error) {
    console.error('Course validation error:')
    console.error(error)
    throw new Error('Failed to validate course data against schema')
  }
}

/**
 * Finds or resolves instructor profile
 * @param course Course data containing instructor information
 * @returns Instructor profile ID or null
 */
async function findInstructorId(course: Course): Promise<string | null> {
  if (!course.instructor.artirstid) {
    return null
  }
  
  try {
    const profile = await prisma.profile.findFirst({
      where: { id: String(course.instructor.artirstid) }
    })
    
    if (profile && profile.id) {
      return profile.id
    } else {
      return null
    }
  } catch {
    return null
  }
}

/**
 * Creates or updates a course record
 * @param course Course data
 * @param instructorId Related instructor profile ID or null
 * @returns Created/updated course ID
 */
async function saveCourseData(course: Course, instructorId: string | null): Promise<string> {
  const courseData = prepareCourseData(course, instructorId)
  
  try {
    const result = await prisma.course.upsert({
      where: { id: course['@id'] },
      update: courseData,
      create: { ...courseData, id: course['@id'] }
    })
    
    return result.id
  } catch (error) {
    console.error('Failed to create/update course:', course.name)
    console.error(error)
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    throw new Error(`Database error: ${errorMessage}`)
  }
}

function prepareCourseData(course: Course, instructorId: string | null) {
  // Handle languages array
  let languages = ''
  if (Array.isArray(course.inLanguage)) {
    languages = course.inLanguage.join(',')
  }
  
  // Handle plans
  let availablePlans = ''
  if (course.subscriptionControl && course.subscriptionControl.plans) {
    availablePlans = course.subscriptionControl.plans.join(',')
  }
  
  // Handle teaches data
  let teachesData: string | undefined
  try {
    if (course.teaches) {
      teachesData = JSON.stringify(course.teaches)
    } else {
      teachesData = undefined
    }
  } catch {
    // Silently handle stringify failure
  }
  
  // Handle subscription features
  let subscriptionFeatures: string | undefined
  try {
    if (course.subscriptionControl) {
      subscriptionFeatures = JSON.stringify(course.subscriptionControl)
    } else {
      subscriptionFeatures = undefined
    }
  } catch {
    // Silently handle stringify failure
  }

  // Educational level
  let educationalLevel = course.educationalLevel

  // Number of lessons
  let numberOfLessons = course.numberOfLessons


  // Provider details
  let providerName = course.provider.name

  let providerDescription = course.provider.description

  let providerUrl = course.provider.url

  let providerLogoUrl = undefined;
  if (course.provider && course.provider.logo) {
    providerLogoUrl = course.provider.logo.url;
  }

  // Media
  let imageUrl = course.image.url

  let videoUrl = course.video.url

  let videoDuration = course.video.duration

  let videoThumbnailUrl = course.video.thumbnailUrl

  // Stats
  let enrolledCount = course.stats.enrolled

  let completedCount = course.stats.completed

  let discussionsCount = course.community.discussions

  let activeStudents = course.community.activeStudents

  let nextLiveQA = course.community.nextLiveQ_A
  
  // Subscription
  let showTrial = false;
  if (course.subscriptionControl) {
    showTrial = course.subscriptionControl.showTrial;
  }


  let showMonthlyAnnualToggle = false
  if (course.subscriptionControl && course.subscriptionControl.showMonthlyAnnualToggle) {
    showMonthlyAnnualToggle = Boolean(course.subscriptionControl.showMonthlyAnnualToggle)
  }

  // Dates
  let dateCreated = ''
  if (course.dateCreated) {
    dateCreated = course.dateCreated
  }

  let dateModified = ''
  if (course.dateModified) {
    dateModified = course.dateModified
  }

  // Ratings
  let averageRating = 0
  if (course.aggregateRating && course.aggregateRating.ratingValue) {
    averageRating = course.aggregateRating.ratingValue
  }

  let reviewCount = 0
  if (course.aggregateRating && course.aggregateRating.reviewCount) {
    reviewCount = course.aggregateRating.reviewCount
  }

  let ratingCount = 0
  if (course.aggregateRating && course.aggregateRating.ratingCount) {
    ratingCount = course.aggregateRating.ratingCount
  }

  return {
    slug: course['@id'],
    name: course.name,
    description: course.description,
    educationalLevel,
    timeRequired: course.timeRequired,
    numberOfLessons,
    instructorId,
    originalInstructorId: course.instructor.identifier,
    
    // Provider details
    providerName,
    providerDescription,
    providerUrl,
    providerLogoUrl,
    
    // Media
    imageUrl,
    videoUrl,
    videoDuration,
    videoThumbnailUrl,
    
    // Stats
    enrolledCount,
    completedCount,
    discussionsCount,
    activeStudents,
    nextLiveQA,
    
    // Subscription
    showTrial,
    showMonthlyAnnualToggle,
    availablePlans,
    
    // Metadata
    languages,
    dateCreated,
    dateModified,
    
    // Ratings
    averageRating,
    reviewCount,
    ratingCount,
    
    // Serialized data
    teachesData,
    subscriptionFeatures
  } as any
}

/**
 * Imports course modules and their lessons
 * @param courseId Parent course ID
 * @param course Course data containing modules and lessons
 */
async function saveModulesAndLessons(courseId: string, course: Course): Promise<void> {
  if (!course.hasPart || !course.hasPart.length) {
    return
  }
  
  for (const module of course.hasPart) {
    try {
      const moduleId = `${courseId}-module-${module.identifier}`
      const moduleData = prepareModuleData(module, courseId)
      
      const createdModule = await prisma.courseModule.upsert({
        where: { id: moduleId },
        update: moduleData,
        create: { ...moduleData, id: moduleId }
      })
      
      if (!module.hasPart || !module.hasPart.length) {
        continue
      }
      
      await saveLessonsInBatches(module.hasPart, createdModule.id, courseId)
    } catch (error) {
      console.error(`Module save failed: ${module.name}`)
    }
  }
}

function prepareModuleData(module: any, courseId: string) {
  let learningResourceType = module['@type']
  if (module['@type'] === 'Chapter') {
    learningResourceType = 'Module'
  }

  let description = ''
  if (module.description) {
    description = module.description
  }

  return {
    name: module.name,
    identifier: module.identifier,
    order: module.identifier,
    learningResourceType,
    description,
    courseId
  } as any
}

async function saveLessonsInBatches(lessons: any[], moduleId: string, courseId: string): Promise<void> {
  for (let i = 0; i < lessons.length; i += BATCH_SIZE) {
    const batch = lessons.slice(i, i + BATCH_SIZE)
    
    await Promise.all(batch.map(async (lesson) => {
      try {
        const lessonId = `${courseId}-lesson-${lesson.identifier}`
        const lessonData = prepareLessonData(lesson, moduleId)
        
        await prisma.courseLesson.upsert({
          where: { id: lessonId },
          update: lessonData,
          create: { ...lessonData, id: lessonId }
        })
      } catch {
        console.error(`Lesson save failed: ${lesson.name}`)
      }
    }))
  }
}

function prepareLessonData(lesson: any, moduleId: string) {
  let playbackId = null
  if (lesson.video.playbackId) {
    playbackId = lesson.video.playbackId
  }

  let videoType = 'VideoObject'
  if (lesson.video['@type']) {
    videoType = lesson.video['@type']
  }

  return {
    name: lesson.name,
    identifier: lesson.identifier,
    timeRequired: lesson.timeRequired,
    videoId: lesson.video.identifier,
    videoProvider: lesson.video.provider,
    videoDuration: lesson.video.duration,
    playbackId,
    videoType,
    completed: Boolean(lesson.completed),
    order: lesson.identifier,
    locked: Boolean(lesson.locked),
    moduleId
  } as any
}

/**
 * Imports course learning resources
 * @param courseId Parent course ID
 * @param course Course data containing resources
 */
async function saveResources(courseId: string, course: Course): Promise<void> {
  if (!course.learningResources || !course.learningResources.length) {
    return
  }
  
  for (let i = 0; i < course.learningResources.length; i += BATCH_SIZE) {
    const batch = course.learningResources.slice(i, i + BATCH_SIZE)
    
    await Promise.all(batch.map(async (resource) => {
      try {
        const resourceId = `${courseId}-resource-${resource.id}`
        const resourceUrl = determineResourceUrl(resource, courseId)
        const resourceData = prepareResourceData(resource, resourceUrl, courseId)
        
        await prisma.courseResource.upsert({
          where: { id: resourceId },
          update: resourceData,
          create: { ...resourceData, id: resourceId }
        })
      } catch {
        console.error(`Resource save failed: ${resource.name}`)
      }
    }))
  }
}

function determineResourceUrl(resource: any, courseId: string): string {
  if ('url' in resource && typeof resource.url === 'string') {
    return resource.url
  }
  
  const type = resource.learningResourceType
  const slug = resource.name.toLowerCase().replace(/\s+/g, '-')
  
  switch (type) {
    case 'pdf':
      return `/resources/${courseId}/documents/${slug}.pdf`
    case 'playlist':
      return `/resources/${courseId}/playlists/${slug}`
    case 'video':
      return `/resources/${courseId}/videos/${slug}`
    default:
      return `/resources/${courseId}/${type}/${slug}`
  }
}

function prepareResourceData(resource: any, url: string, courseId: string) {
  let resourceType = 'LearningResource'
  if (resource['@type']) {
    resourceType = resource['@type']
  }

  return {
    name: resource.name,
    type: resource.learningResourceType,
    contentSize: resource.contentSize,
    icon: resource.icon,
    url,
    resourceType,
    courseId
  } as any
}

/**
 * Imports course reviews
 * @param courseId Parent course ID
 * @param course Course data containing reviews
 */
async function saveReviews(courseId: string, course: Course): Promise<void> {
  if (!course.review || !course.review.length) {
    return
  }
  
  await Promise.all(course.review.map(async (review) => {
    try {
      const reviewId = `${courseId}-review-${review.identifier}`
      const reviewData = prepareReviewData(review, courseId)
      
      await prisma.courseReview.upsert({
        where: { id: reviewId },
        update: reviewData,
        create: { ...reviewData, id: reviewId }
      })
    } catch {
      console.error(`Review save failed: ${review.author.name}`)
    }
  }))
}

function prepareReviewData(review: any, courseId: string) {
  let bestRating = 5
  if (review.reviewRating.bestRating) {
    bestRating = review.reviewRating.bestRating
  }

  let worstRating = 1
  if (review.reviewRating.worstRating) {
    worstRating = review.reviewRating.worstRating
  }

  return {
    rating: review.reviewRating.ratingValue,
    content: review.reviewBody,
    authorName: review.author.name,
    publishedAt: review.datePublished,
    bestRating,
    worstRating,
    courseId
  } as any
}

/**
 * Imports course offerings
 * @param courseId Parent course ID
 * @param course Course data containing offerings
 */
async function saveOfferings(courseId: string, course: Course): Promise<void> {
  if (!course.offers || !course.offers.length) {
    return
  }
  
  await Promise.all(course.offers.map(async (offer) => {
    try {
      let offerName = 'regular'
      if (offer.name) {
        offerName = offer.name
      }

      let duration = 'P1M'
      if (offer.duration) {
        duration = offer.duration
      }
      
      const offeringId = `${courseId}-offer-${offerName}-${duration}`
      
      const { validFrom, validThrough } = parseDates(offer)
      const offeringData = prepareOfferingData(offer, validFrom, validThrough, duration, courseId)
      
      await prisma.courseOffering.upsert({
        where: { id: offeringId },
        update: offeringData,
        create: { ...offeringData, id: offeringId }
      })
    } catch (error) {
      let displayName = 'regular'
      if (offer.name) {
        displayName = offer.name
      }
      console.error(`Offering save failed: ${displayName}`)
    }
  }))
}

function parseDates(offer: any): { validFrom?: Date, validThrough?: Date } {
  const result = { validFrom: undefined, validThrough: undefined } as any
  
  if (offer.validFrom) {
    try {
      const date = new Date(offer.validFrom)
      if (!isNaN(date.getTime())) {
        result.validFrom = date
      }
    } catch {} // Invalid date handling
  }
  
  if (offer.validThrough) {
    try {
      const date = new Date(offer.validThrough)
      if (!isNaN(date.getTime())) {
        result.validThrough = date
      }
    } catch {} // Invalid date handling
  }
  
  return result
}

function prepareOfferingData(offer: any, validFrom: Date | undefined, validThrough: Date | undefined, duration: string, courseId: string) {
  let name = 'regular'
  if (offer.name) {
    name = offer.name
  }

  let offerType = 'PriceSpecification'
  if (offer['@type']) {
    offerType = offer['@type']
  }

  return {
    name,
    price: offer.price,
    currency: offer.priceCurrency,
    duration,
    validFrom,
    validThrough,
    offerType,
    courseId
  } as any
}

/**
 * Main function to import a course from a YAML file
 * @param filePath Path to the YAML file
 * @returns ID of the imported course
 */
export async function importCourseFromFile(filePath: string): Promise<string> {
  console.log(`Starting to import course from file: ${filePath}`)
  
  try {
    const data = readYamlFile(filePath)
    const course = validateCourseData(data)
    console.log(`Course validation successful for ${course.name}`)
    
    return await prisma.$transaction(async () => {
      const instructorId = await findInstructorId(course)
      
      console.log(`Saving course data for ${course.name}`)
      const courseId = await saveCourseData(course, instructorId)
      
      console.log(`Importing modules and lessons for ${courseId}`)
      await saveModulesAndLessons(courseId, course)
      
      console.log(`Importing offerings for ${courseId}`)
      await saveOfferings(courseId, course)
      
      console.log(`Importing reviews for ${courseId}`)
      await saveReviews(courseId, course)
      
      console.log(`Importing resources for ${courseId}`)
      await saveResources(courseId, course)
      
      console.log(`Successfully completed import for course: ${courseId}`)
      return courseId
    }, { timeout: 120000 })
  } catch (error) {
    console.error(`Failed to import course from file: ${filePath}`)
    let errorMessage = String(error)
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error(`Error details: ${errorMessage}`)
    throw error
  }
}

/**
 * Imports all courses from a directory
 * @param dirPath Path to directory containing YAML files
 * @returns Array of imported course IDs
 */
export async function importCoursesFromDirectory(dirPath: string): Promise<string[]> {
  console.log(`Importing courses from: ${dirPath}`)
  
  try {
    const fullPath = join(process.cwd(), dirPath)
    const files = readdirSync(fullPath).filter(file => 
      file.endsWith('.yaml') || file.endsWith('.yml')
    )
    
    const courseIds = []
    
    for (const file of files) {
      try {
        const filePath = join(dirPath, file)
        const courseId = await importCourseFromFile(filePath)
        courseIds.push(courseId)
        console.log(`Imported course: ${courseId}`)
      } catch (error) {
        console.error(`Failed to import ${file}, skipping`)
      }
    }
    
    return courseIds
  } catch (error) {
    console.error(`Directory read error: ${dirPath}`)
    let errorMessage = String(error)
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error(errorMessage)
    throw error
  }
}

/**
 * CLI handler function - executed when script is run directly
 */
export async function handleCourseImport(): Promise<void> {
  try {
    const args = process.argv.slice(2)
    let dirPath = 'data/courses'
    if (args[0]) {
      dirPath = args[0]
    }
    
    console.log(`Starting import from ${dirPath}...`)
    const courseIds = await importCoursesFromDirectory(dirPath)
    
    console.log(`
===================================
Import Summary:
- Successfully imported ${courseIds.length} courses
- Course IDs: ${courseIds.join(', ')}
===================================
    `)
  } catch (error) {
    console.error('Import failed:')
    let errorMessage = String(error)
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error(errorMessage)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  handleCourseImport()
} 