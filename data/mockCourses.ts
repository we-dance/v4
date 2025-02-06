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
    subscriptionControl: {
      showTrial: true,
      showMonthlyAnnualToggle: true,
      plans: ['regular', 'premium']
    },
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
        name: 'regular'
      },
      {
        '@type': 'PriceSpecification',
        price: 150,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'regular'
      },
      {
        '@type': 'PriceSpecification',
        price: 30,
        priceCurrency: 'EUR',
        duration: 'P1M',
        name: 'premium'
      },
      {
        '@type': 'PriceSpecification',
        price: 300,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'premium'
      }
    ],
    subscriptionPlans: {
      regular: {
        features: [
          'Full course access',
          'Downloadable materials',
          'Community forum access',
          'Monthly group Q&A'
        ]
      },
      premium: {
        features: [
          'Everything in Regular',
          'Weekly live Q&A sessions',
          'Priority support',
          '1-on-1 feedback',
          'Private community access'
        ]
      },
      trial: {
        duration: 7,
        features: [
          'First module access',
          'Community forum preview',
          'No credit card required'
        ]
      }
    },

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
      url: instructor.image,
    },
    video: {
      '@type': 'VideoObject',
      url: 'https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/courses%2Fcuban-casino-preview.mp4',
      duration: 'PT5M',
      thumbnailUrl: instructor.image,
    },

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
  {
    '@type': 'Course',
    '@id': 'salsa-lady-styling',
    identifier: 'salsa-lady-styling-2024',
    name: 'Salsa Lady Styling',
    subscriptionControl: {
      showTrial: false,
      showMonthlyAnnualToggle: false,
      plans: ['regular', 'premium']
    },
    description: 'Elegance, majesty, expression. Amazing Cuban dancer Yarima Rodríguez shares her secrets for mastering Lady Styling in Son Cubano, helping you enhance your dance technique and unleash your inner grace.',
    provider: {
      '@type': 'Organization',
      name: 'Zensual Art',
      description: 'Online dance education platform',
      url: 'https://zensual.art',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zensual.art/logo.png'
      }
    },
  
    instructor: {
      '@type': 'Person',
      identifier: 'yarima-rodriguez',
      name: 'Yarima Rodríguez',
      image: 'https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fzensual.art.png?generation=1715599448194649&alt=media',
      jobTitle: 'Professional Cuban Dancer',
      knowsAbout: ['Salsa Cubana', 'Son Cubano', 'Lady Styling'],
      knowsLanguage: ['es', 'en'],
      teachingLevel: 'Advanced',
      location: 'Cuba',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.9,
        reviewCount: 150
      },
      experience: {
        years: 15,
        achievements: ['Professional Cuban Dancer', 'International Dance Instructor']
      },
      availableService: {
        '@type': 'Service',
        offers: [
          {
            '@type': 'PriceSpecification',
            price: 80,
            priceCurrency: 'EUR',
            duration: 'PT60M'
          }
        ]
      },
      socialMedia: {
        instagram: '/zensual.art/',
      }
    },
  
    educationalLevel: 'Intermediate',
    teaches: [
      {
        '@type': 'DefinedTerm',
        termCode: 'lady-styling',
        name: 'Core Techniques of Lady Styling',
        description: 'Master the fundamental movements and stylistic nuances specific to Son Cubano'
      },
      {
        '@type': 'DefinedTerm',
        termCode: 'dance-mechanics',
        name: 'Enhanced Dance Mechanics',
        description: 'Improve your body alignment, elegance in hand movements, and precision in footwork'
      },
      {
        '@type': 'DefinedTerm',
        termCode: 'performance',
        name: 'Performance and Expression',
        description: 'Elevate your dance expression, learning to convey stories and emotions seamlessly through your movements'
      }
    ],
  
    timeRequired: 'PT2H',
    numberOfLessons: 12,
  
    hasPart: [
      {
        '@type': 'Chapter',
        identifier: 1,
        name: 'Introduction',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 1,
            name: 'Intro',
            timeRequired: '2:10 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'sMFZnbe01Tf9Idx01roKDhfkRX1CrgCEL2A702vA00uqUNI',
              playbackId: 'sMFZnbe01Tf9Idx01roKDhfkRX1CrgCEL2A702vA00uqUNI',
              duration: '2:10 min',
              provider: 'mux'
            },
            completed: false,
            locked: false
          },
          {
            '@type': 'LearningResource',
            identifier: 2,
            name: 'Real-Time Phrase',
            timeRequired: '0:56 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'sDfd00Ix01fTI1SOUr4KSDlxBa7Y9Znnj01G8beV01o1Oww',
              playbackId: 'sDfd00Ix01fTI1SOUr4KSDlxBa7Y9Znnj01G8beV01o1Oww',
              duration: '0:56 min',
              provider: 'mux'
            },
            completed: false,
            locked: false
          },
        ]
      },
      {
        '@type': 'Chapter',
        identifier: 2,
        name: 'Warm-up',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 3,
            name: 'Warm-up (part 1)',
            timeRequired: '7:04 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'qtayNhaSo1ZK3f9tV4ptW6qytQJvcfjgPARgOwTdC7A',
              playbackId: 'qtayNhaSo1ZK3f9tV4ptW6qytQJvcfjgPARgOwTdC7A',
              duration: '7:04 min',
              provider: 'mux'
            },
            completed: false,
            locked: false
          },
          {
            '@type': 'LearningResource',
            identifier: 4,
            name: 'Warm-up (part 2)',
            timeRequired: '4:37 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'KlVsP028ljS8mCfKAYuZAZaL02svlWvps9wxqNfM6009c4',
              playbackId: 'KlVsP028ljS8mCfKAYuZAZaL02svlWvps9wxqNfM6009c4',
              duration: '4:37 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          }
        ]
      },
      {
        '@type': 'Chapter',
        identifier: 3,
        name: 'Phrase',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 5,
            name: 'Phrase (segment 1)',
            timeRequired: '8:24 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'bXTEloChop02wryBH01llZmFSRAissSaalytIJ7BsV01sw',
              playbackId: 'bXTEloChop02wryBH01llZmFSRAissSaalytIJ7BsV01sw',
              duration: '8:24 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
          {
            '@type': 'LearningResource',
            identifier: 6,
            name: 'Phrase (segment 2)',
            timeRequired: '7:43 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'fClgWWmDfettXAYVyvAKFshhg22BbyeQW01s1zcissX00',
              playbackId: 'fClgWWmDfettXAYVyvAKFshhg22BbyeQW01s1zcissX00',
              duration: '7:43 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
          {
            '@type': 'LearningResource',
            identifier: 7,
            name: 'Phrase (segment 3)',
            timeRequired: '7:34 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'iB02CO2O54L1Ey017MYfSuqAFj35p8AURFRr01CIyAmZvA',
              playbackId: 'iB02CO2O54L1Ey017MYfSuqAFj35p8AURFRr01CIyAmZvA',
              duration: '7:34 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
          {
            '@type': 'LearningResource',
            identifier: 8,
            name: 'Phrase (segment 4)',
            timeRequired: '9:23 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'CS8o1PCs2xFoXFTZ77PuOHRYU8g00f8rXtFCJaerHCpQ',
              playbackId: 'CS8o1PCs2xFoXFTZ77PuOHRYU8g00f8rXtFCJaerHCpQ',
              duration: '9:23 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
          {
            '@type': 'LearningResource',
            identifier: 9,
            name: 'Continued Phrase (without music)',
            timeRequired: '1:35 min',
            video: {
              '@type': 'VideoObject',
              identifier: '8D8uVRdXY52021wWuntp8545bPjAwjv00016P2fsvh6jDg',
              playbackId: '8D8uVRdXY52021wWuntp8545bPjAwjv00016P2fsvh6jDg',
              duration: '1:35 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
        ]
      },
      {
        '@type': 'Chapter',
        identifier: 4,
        name: 'Details',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 10,
            name: 'Details of the arms',
            timeRequired: '4:23 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'cuPptg0000eW13qx84pv02m00IgntaKVQf8aaoKXzyolbFg',
              playbackId: 'cuPptg0000eW13qx84pv02m00IgntaKVQf8aaoKXzyolbFg',
              duration: '4:23 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
          {
            '@type': 'LearningResource',
            identifier: 11,
            name: 'Details of the legs',
            timeRequired: '1:31 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'bn4U1NWEOhNCUeY3lZNUnjFkaY00ueW00qmd6P1UzFmOM',
              playbackId: 'bn4U1NWEOhNCUeY3lZNUnjFkaY00ueW00qmd6P1UzFmOM',
              duration: '1:31 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
        ]
      },
      {
        '@type': 'Chapter',
        identifier: 5,
        name: 'Stretching',
        learningResourceType: 'Module',
        hasPart: [
          {
            '@type': 'LearningResource',
            identifier: 12,
            name: 'Stretching',
            timeRequired: '16:02 min',
            video: {
              '@type': 'VideoObject',
              identifier: 'NA00aQiMyfYAs18A3ppGCogK3Q9hO0029HhYqgd3Ehe4Q',
              playbackId: 'NA00aQiMyfYAs18A3ppGCogK3Q9hO0029HhYqgd3Ehe4Q',
              duration: '16:02 min',
              provider: 'mux'
            },
            completed: false,
            locked: true
          },
        ]
      }
    ],
  
    offers: [
      {
        '@type': 'PriceSpecification',
        price: 60,
        priceCurrency: 'EUR',
        duration: 'P1M',
        name: 'regular'
      },
      {
        '@type': 'PriceSpecification',
        price: 160,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'regular'
      },
      {
        '@type': 'PriceSpecification',
        price: 160,
        priceCurrency: 'EUR',
        duration: 'P1M',
        name: 'premium'
      },
      {
        '@type': 'PriceSpecification',
        price: 600,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'premium'
      }
    ],
    courseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        startDate: '2024-01-01',
        location: {
          '@type': 'Place',
          name: 'Online Platform',
          address: 'https://zensual.art'
        }
      }
    ],
  
    learningResources: [
      {
        '@type': 'LearningResource',
        id: 1,
        name: 'Lady Styling Practice Guide',
        learningResourceType: 'pdf',
        contentSize: '3.0 MB',
        icon: 'ph:file-pdf'
      },
      {
        '@type': 'LearningResource',
        id: 2,
        name: 'Son Cubano Playlist',
        learningResourceType: 'playlist',
        contentSize: '15 songs',
        icon: 'ph:music-notes'
      },
      {
        '@type': 'LearningResource',
        id: 3,
        name: 'Arm and Leg Drills',
        learningResourceType: 'video',
        contentSize: '20 min',
        icon: 'ph:video'
      }
    ],
  
    subscriptionPlans: {
      regular: {
        features: [
          'Full course access',
          'Practice materials'
        ]
      },
      premium: {
        features: [
          'Everything in Regular',
          'Priority support',
          'Live Q&A sessions'
        ]
      }
    },
  
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 10,
      ratingCount: 10
    },
  
    review: [
      {
        '@type': 'Review',
        identifier: 1,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1
        },
        author: {
          '@type': 'Person',
          name: 'Maria G.'
        },
        reviewBody: 'Excellent course! Yarima explains everything in detail and makes it easy to follow along.',
        datePublished: '2024-01-15'
      }
    ],
  
    inLanguage: ['en', 'es'],
    dateCreated: '2024-01-01',
    dateModified: '2024-01-01',
    image: {
      '@type': 'ImageObject',
      url: 'https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2Fc3bfb7be-1dfb-4e71-b486-30754d0ddfa2?alt=media&token=f45dcae4-b2f4-4ea1-9bee-db41c89654f0'
    },
    video: {
      '@type': 'VideoObject',
      url: 'https://zensual.art/videos/lady-styling-preview',
      duration: 'PT2M10S',
      thumbnailUrl: 'https://zensual.art/images/courses/lady-styling-thumb.jpg'
    },
  
    stats: {
      enrolled: 100,
      completed: 50
    },
  
    community: {
      discussions: 25,
      activeStudents: 75,
      nextLiveQ_A: '2024-02-15T18:00:00Z'
    }
  }
  
]

export const mockCourses = mockCoursesData.map((course) => {
  try {
    return validateCourse(course)
  } catch (error) {
    console.error('Invalid course data:', error)
    throw error
  }
})
