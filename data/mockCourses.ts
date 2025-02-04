import { mockArtists } from '~/data/mockArtists'
import { type Course, validateCourse } from '~/schemas/course'

const instructor = mockArtists.find((artist) => artist.id === 1)!
if (!instructor) {
  throw new Error('Instructor not found')
}

const mockCoursesData = [
  {
    // Core Schema.org fields
    '@type': 'Course',
    '@id': 'course-1',
    identifier: '1',
    name: 'Cuban Casino Fundamentals',
    description:
      'Master the authentic Cuban Casino style with world champion Maykel Fonts. From basic steps to advanced turn patterns, this comprehensive course will give you a solid foundation in Cuban dance.',
    provider: {
      '@type': 'Organization',
      name: 'WeDance Academy',
      description: 'Premier Online Dance Education Platform',
      url: 'https://wedance.vip/academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wedance.vip/logo.png',
      },
    },
    instructor: {
      '@type': 'Person',
      identifier: String(instructor.id),
      name: instructor.name,
      image: instructor.image,
      jobTitle: instructor.experience.achievements?.[0],
      knowsAbout: instructor.specialties,
      knowsLanguage: instructor.languages,
      teachingLevel: instructor.level,
      location: instructor.location,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: instructor.rating || 0,
        reviewCount: instructor.reviewCount || 0,
      },
      availableService: instructor.availability ? {
        '@type': 'Service',
        offers: [
          {
            '@type': 'PriceSpecification',
            price: instructor.availability.pricing?.privateClass?.amount || 0,
            priceCurrency: instructor.availability.pricing?.privateClass?.currency || 'EUR',
            duration: 'PT60M',
          },
        ],
      } : undefined,
    },

    // Educational details
    educationalLevel: 'Beginner',
    teaches: [
      {
        '@type': 'DefinedTerm',
        termCode: 'fundamentals',
        name: 'Basic Steps',
        description: 'Foundation of Cuban Casino dance style',
      },
      {
        '@type': 'DefinedTerm',
        termCode: 'turns',
        name: 'Turn Patterns',
        description: 'Essential Casino turn patterns and combinations',
      },
    ],
    timeRequired: 'P2M', // 2 months
    numberOfLessons: 8,

    // Course structure
    hasPart: [
      {
        '@type': 'Chapter',
        identifier: 1,
        name: 'Introduction to Casino',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 1,
            name: 'Understanding Cuban Dance Culture',
            timeRequired: 'PT15M',
            video: {
              '@type': 'VideoObject',
              identifier: 'abc123',
              duration: 'PT15M',
            },
            completed: true,
          },
          {
            '@type': 'LearningResource',
            identifier: 2,
            name: 'Basic Steps & Rhythm',
            timeRequired: 'PT20M',
            video: {
              '@type': 'VideoObject',
              identifier: 'def456',
              duration: 'PT20M',
            },
            completed: false,
          },
          {
            '@type': 'LearningResource',
            identifier: 3,
            name: 'Basic Partner Connection',
            timeRequired: 'PT18M',
            video: {
              '@type': 'VideoObject',
              identifier: 'ghi789',
              duration: 'PT18M',
            },
            completed: false,
          },
        ],
      },
      {
        '@type': 'Chapter',
        identifier: 2,
        name: 'Essential Turn Patterns',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 4,
            name: 'Dile Que No',
            timeRequired: 'PT25M',
            video: {
              '@type': 'VideoObject',
              identifier: 'jkl012',
              duration: 'PT25M',
            },
            completed: false,
          },
          {
            '@type': 'LearningResource',
            identifier: 5,
            name: 'Vacilala',
            timeRequired: 'PT22M',
            video: {
              '@type': 'VideoObject',
              identifier: 'mno345',
              duration: 'PT22M',
            },
            completed: false,
          },
          {
            '@type': 'LearningResource',
            identifier: 6,
            name: 'Setenta',
            timeRequired: 'PT28M',
            video: {
              '@type': 'VideoObject',
              identifier: 'pqr678',
              duration: 'PT28M',
            },
            completed: false,
          },
        ],
      },
    ],

    // Course instances
    courseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        startDate: '2024-04-01T00:00:00Z',
        endDate: '2024-05-31T23:59:59Z',
        location: {
          '@type': 'Place',
          name: 'WeDance Online Platform',
        },
        offers: [
          {
            '@type': 'PriceSpecification',
            price: 15,
            priceCurrency: 'EUR',
            duration: 'P1M',
            validFrom: '2024-04-01T00:00:00Z',
            validThrough: '2024-04-30T23:59:59Z',
          },
        ],
      },
    ],

    // Materials and content
    learningResources: [
      {
        '@type': 'LearningResource',
        id: 1,
        name: 'Basic Steps Practice Guide',
        learningResourceType: 'pdf',
        contentSize: '2.4 MB',
        icon: 'ph:file-pdf',
      },
      {
        '@type': 'LearningResource',
        id: 2,
        name: 'Timba Music Playlist',
        learningResourceType: 'playlist',
        contentSize: '20 songs',
        icon: 'ph:music-notes',
      },
      {
        '@type': 'LearningResource',
        id: 3,
        name: 'Practice Drills',
        learningResourceType: 'video',
        contentSize: '15 min',
        icon: 'ph:video',
      },
    ],

    // Pricing and offers
    offers: [
      {
        '@type': 'PriceSpecification',
        price: 15,
        priceCurrency: 'EUR',
        duration: 'P1M',
      },
      {
        '@type': 'PriceSpecification',
        price: 150,
        priceCurrency: 'EUR',
        duration: 'P1Y',
      },
    ],

    // Ratings and reviews
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 45,
      ratingCount: 50,
    },
    review: [
      {
        '@type': 'Review',
        identifier: 1,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          '@type': 'Person',
          name: 'John D.',
        },
        reviewBody: "Excellent course! Maykel's teaching style is clear and engaging.",
        datePublished: '2024-03-15',
      },
      {
        '@type': 'Review',
        identifier: 2,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          '@type': 'Person',
          name: 'Maria S.',
        },
        reviewBody: "The best online Cuban salsa course I've taken. Great progression and explanations.",
        datePublished: '2024-03-10',
      },
      {
        '@type': 'Review',
        identifier: 3,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 4,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          '@type': 'Person',
          name: 'David R.',
        },
        reviewBody: 'Very comprehensive. The practice materials are super helpful.',
        datePublished: '2024-03-05',
      },
    ],

    // Metadata
    inLanguage: ['en', 'es'],
    dateCreated: '2024-01-01T00:00:00Z',
    dateModified: '2024-03-20T00:00:00Z',
    image: {
      '@type': 'ImageObject',
      url: 'https://wedance.vip/courses/cuban-casino-fundamentals/cover.jpg',
    },
    video: {
      '@type': 'VideoObject',
      url: 'https://wedance.vip/courses/cuban-casino-fundamentals/preview.mp4',
      duration: 'PT5M',
      thumbnailUrl: 'https://wedance.vip/courses/cuban-casino-fundamentals/preview-thumb.jpg',
    },

    // Additional WeDance fields
    stats: {
      enrolled: 234,
      completed: 156,
    },
    community: {
      discussions: 15,
      activeStudents: 89,
      nextLiveQ_A: '2024-03-25T18:00:00Z',
    },
  },
]

export const mockCourses: Course[] = mockCoursesData.map((course) =>
  validateCourse(course)
)
