import { z } from 'zod'
import { artistSchema } from './artist'

// Basic schemas for Schema.org
const monetaryAmountSchema = z.object({
  '@type': z.literal('PriceSpecification'),
  price: z.number(), // replaced 'amount'
  priceCurrency: z.string(), // replaced 'currency'
  validFrom: z.string().optional(),
  validThrough: z.string().optional(),
  duration: z.string().optional(), // ISO 8601 duration format
})

const courseInstanceSchema = z.object({
  '@type': z.literal('CourseInstance'),
  courseMode: z.enum(['online', 'onsite', 'hybrid']),
  startDate: z.string(), // ISO 8601
  endDate: z.string().optional(), // ISO 8601
  location: z.object({
    '@type': z.literal('Place'),
    name: z.string(),
    address: z.string().optional(),
  }),
  offers: z.array(monetaryAmountSchema).optional(),
})

const educationalLevelSchema = z.enum([
  'Beginner',
  'Intermediate',
  'Advanced',
  'AllLevels',
])

// WeDance schemas adapted to Schema.org standards
const learningObjectiveSchema = z.object({
  '@type': z.literal('DefinedTerm'),
  termCode: z.string(), // previously 'category'
  name: z.string(), // skill name
  description: z.string().optional(),
})

const materialSchema = z.object({
  '@type': z.literal('LearningResource'),
  id: z.number(),
  name: z.string(), // previously 'title'
  learningResourceType: z.string(), // previously 'type'
  contentSize: z.string(), // previously 'size'
  icon: z.string(),
})

const lessonSchema = z.object({
  '@type': z.literal('LearningResource'),
  identifier: z.number(), // previously 'id'
  name: z.string(), // previously 'title'
  timeRequired: z.string(), // previously 'duration', now in ISO 8601
  video: z.object({
    '@type': z.literal('VideoObject'),
    identifier: z.string(), // previously 'videoId'
    duration: z.string(), // ISO 8601
  }),
  completed: z.boolean(),
})

const moduleSchema = z.object({
  '@type': z.literal('Chapter'),
  identifier: z.number(), // previously 'id'
  name: z.string(), // previously 'title'
  learningResourceType: z.literal('Module'),
  hasPart: z.array(lessonSchema), // previously 'lessons'
})

const personSchema = z.object({
  '@type': z.literal('Person'),
  identifier: z.string(), // previously 'id'
  name: z.string(),
  image: z.string(),
  jobTitle: z.string().optional(), // for credentials
  knowsAbout: z.array(z.string()).optional(), // for specialties
  knowsLanguage: z.array(z.string()), // previously 'languages'
})

const courseInstructorSchema = personSchema.extend({
  teachingLevel: z.string(), // previously 'level'
  location: z.string(),
  aggregateRating: z.object({
    '@type': z.literal('AggregateRating'),
    ratingValue: z.number(),
    reviewCount: z.number(),
  }).optional(),
  availableService: z.object({
    '@type': z.literal('Service'),
    offers: z.array(monetaryAmountSchema),
  }).optional(),
  // Additional WeDance fields
  socialMedia: z.object({
    instagram: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
  experience: z.object({
    years: z.number(),
    achievements: z.array(z.string()),
  }).optional(),
})

const reviewSchema = z.object({
  '@type': z.literal('Review'),
  identifier: z.number(), // previously 'id'
  reviewRating: z.object({
    '@type': z.literal('Rating'),
    ratingValue: z.number(),
    bestRating: z.number().default(5),
    worstRating: z.number().default(1),
  }),
  author: z.object({
    '@type': z.literal('Person'),
    name: z.string(),
  }),
  reviewBody: z.string(), // previously 'comment'
  datePublished: z.string(), // previously 'date'
})

const providerSchema = z.object({
  '@type': z.literal('Organization'),
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  logo: z.object({
    '@type': z.literal('ImageObject'),
    url: z.string(),
  }).optional(),
})

// Main course schema
export const courseSchema = z.object({
  // Core Schema.org fields
  '@type': z.literal('Course'),
  '@id': z.string(), // previously 'id'
  identifier: z.string(), // additional identifier
  name: z.string(), // previously 'title'
  description: z.string(),
  provider: providerSchema,
  instructor: courseInstructorSchema,

  // Educational details
  educationalLevel: educationalLevelSchema,
  teaches: z.array(learningObjectiveSchema),
  timeRequired: z.string(), // ISO 8601 duration format
  numberOfLessons: z.number(),
  
  // Course structure
  hasPart: z.array(moduleSchema), // previously 'modules'
  courseInstance: z.array(courseInstanceSchema).optional(),
  
  // Materials and content
  learningResources: z.array(materialSchema), // previously 'materials'
  
  // Pricing and offers
  offers: z.array(monetaryAmountSchema),
  
  // Additional WeDance pricing fields
  subscriptionPlans: z.object({
    regular: z.object({
      features: z.array(z.string()),
    }),
    premium: z.object({
      features: z.array(z.string()),
    }).optional(),
    trial: z.object({
      duration: z.number(),
      features: z.array(z.string()),
    }).optional(),
  }).optional(),
  
  // Ratings and reviews
  aggregateRating: z.object({
    '@type': z.literal('AggregateRating'),
    ratingValue: z.number(),
    reviewCount: z.number(),
    ratingCount: z.number(),
  }),
  review: z.array(reviewSchema), // previously 'reviews'

  // Metadata
  inLanguage: z.array(z.string()),
  dateCreated: z.string(),
  dateModified: z.string(),
  image: z.object({
    '@type': z.literal('ImageObject'),
    url: z.string(),
  }),
  video: z.object({
    '@type': z.literal('VideoObject'),
    url: z.string(),
    duration: z.string(), // ISO 8601
    thumbnailUrl: z.string().optional(),
  }),

  // Additional WeDance fields
  stats: z.object({
    enrolled: z.number(),
    completed: z.number(),
  }),
  community: z.object({
    discussions: z.number(),
    activeStudents: z.number(),
    nextLiveQ_A: z.string(),
  }),
})

export type Course = z.infer<typeof courseSchema>

export const validateCourse = (data: unknown): Course => {
  return courseSchema.parse(data)
}

// Helper function to validate array of courses
export const validateCourses = (data: unknown[]): Course[] => {
  return z.array(courseSchema).parse(data)
}
