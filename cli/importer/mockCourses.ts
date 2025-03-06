/**
 * Упрощенная версия mockCourses.ts для использования в CLI
 */

// Экспорт массива mocks для импорта в базу данных
export const mockCourses = [
  {
    "@type": "Course",
    "@id": "https://zensual.art/courses/101",
    "identifier": "101",
    "name": "Salsa Fundamentals",
    "description": "Master the basics of Cuban salsa with this comprehensive beginner's course. Perfect for complete beginners or those looking to solidify their foundation.",
    "provider": {
      "@type": "Organization",
      "name": "Zensual Academy",
      "description": "Online platform for dance learning",
      "url": "https://zensual.art",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zensual.art/logo.png"
      }
    },
    "instructor": {
      "@type": "Person",
      "identifier": "1", 
      "name": "Maykel Fonts",
      "artistId": "1",
      "image": "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fmaykel_fonts.png?generation=1655231303310013&alt=media",
      "jobTitle": "Professional Cuban Dancer",
      "teachingLevel": "master",
      "location": "Cuba",
      "knowsLanguage": ["Spanish", "English", "Italian"],
      "knowsAbout": ["casino", "rueda", "son", "afro-cuban"],
      "experience": {
        "years": 25,
        "achievements": [
          "World Salsa Champion 2018",
          "Best Casino Instructor 2019"
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "ratingCount": 128,
        "reviewCount": 128
      },
      "availableService": {
        "@type": "Service",
        "offers": [
          {
            "@type": "PriceSpecification",
            "price": 80,
            "priceCurrency": "EUR",
            "duration": "PT60M"
          }
        ]
      },
      "socialMedia": {
        "instagram": "@maykelfontssalsa",
        "youtube": "@maykelfontscuba"
      }
    },
    "educationalLevel": "Beginner",
    "teaches": [
      {
        "@type": "DefinedTerm",
        "termCode": "cuban-salsa", 
        "name": "Cuban Salsa",
        "description": "Traditional Cuban dance style with its roots in Son",
        "inDefinedTermSet": "DanceStyles"
      }
    ],
    "timeRequired": "PT10H",
    "numberOfLessons": 20,
    "hasPart": [
      {
        "@type": "Chapter",
        "identifier": 1,
        "name": "Getting Started",
        "learningResourceType": "Module",
        "hasPart": [
          {
            "@type": "LearningResource",
            "identifier": 1,
            "name": "Introduction to Salsa",
            "timeRequired": "PT15M",
            "completed": true,
            "video": {
              "@type": "VideoObject",
              "identifier": "qnQPfKCY-EQ",
              "provider": "youtube",
              "duration": "PT15M"
            },
            "locked": false
          },
          {
            "@type": "LearningResource",
            "identifier": 2,
            "name": "Basic Rhythm and Timing",
            "timeRequired": "PT20M",
            "completed": true,
            "video": {
              "@type": "VideoObject",
              "identifier": "vRQAG1POQ-g",
              "provider": "youtube",
              "duration": "PT20M"
            },
            "locked": false
          }
        ]
      },
      {
        "@type": "Chapter",
        "identifier": 2,
        "name": "Basic Steps",
        "learningResourceType": "Module",
        "hasPart": [
          {
            "@type": "LearningResource",
            "identifier": 3,
            "name": "Basic Step: Forward and Back",
            "timeRequired": "PT30M",
            "completed": true,
            "video": {
              "@type": "VideoObject",
              "identifier": "1234abcd",
              "provider": "youtube",
              "duration": "PT30M"
            },
            "locked": false
          },
          {
            "@type": "LearningResource",
            "identifier": 4,
            "name": "Side Steps and Weight Shifts",
            "timeRequired": "PT25M",
            "completed": false,
            "video": {
              "@type": "VideoObject",
              "identifier": "5678efgh",
              "provider": "youtube",
              "duration": "PT25M"
            },
            "locked": true
          }
        ]
      }
    ],
    "learningResources": [
      {
        "@type": "LearningResource",
        "id": "resource-1",
        "name": "Salsa Music Guide.pdf",
        "learningResourceType": "pdf",
        "contentSize": "2.5 MB",
        "icon": "ph:file-pdf",
        "url": "https://zensual.art/resources/salsa-music-guide.pdf"
      },
      {
        "@type": "LearningResource",
        "id": "resource-2",
        "name": "Footwork Practice.mp4",
        "learningResourceType": "video",
        "contentSize": "18 MB",
        "icon": "ph:video",
        "url": "https://zensual.art/resources/footwork-practice.mp4"
      }
    ],
    "image": {
      "@type": "ImageObject",
      "url": "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fmaykel_fonts.png?generation=1655231303310013&alt=media"
    },
    "video": {
      "@type": "VideoObject",
      "url": "https://zensual.art/videos/salsa-preview",
      "duration": "PT2M10S",
      "thumbnailUrl": "https://zensual.art/images/courses/salsa-thumb.jpg"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "ratingCount": 45,
      "reviewCount": 45
    },
    "review": [
      {
        "@type": "Review",
        "identifier": 1,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": "John Smith"
        },
        "reviewBody": "This course transformed my dancing! Maykel is an excellent instructor who breaks everything down clearly.",
        "datePublished": "2023-11-05"
      },
      {
        "@type": "Review",
        "identifier": 2,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 4,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": "Lisa Johnson"
        },
        "reviewBody": "Great course for beginners. I wish there were more practice combinations, but overall very helpful.",
        "datePublished": "2023-10-22"
      }
    ],
    "inLanguage": ["English", "Spanish"],
    "dateCreated": "2023-01-01T00:00:00Z",
    "dateModified": "2023-12-15T00:00:00Z",
    "offers": [
      {
        "@type": "Offer",
        "identifier": "monthly",
        "name": "Monthly Access",
        "price": 15,
        "priceCurrency": "EUR",
        "availability": "InStock",
        "duration": "P1M",
        "validFrom": "2023-01-01T00:00:00Z"
      },
      {
        "@type": "Offer",
        "identifier": "yearly",
        "name": "Annual Access",
        "price": 120,
        "priceCurrency": "EUR",
        "availability": "InStock",
        "duration": "P1Y",
        "validFrom": "2023-01-01T00:00:00Z"
      }
    ],
    "subscriptionControl": {
      "showTrial": true,
      "showMonthlyAnnualToggle": true,
      "plans": ["regular", "premium"]
    },
    "subscriptionPlans": {
      "regular": {
        "name": "Regular",
        "features": ["Full course access", "Community forum", "Practice music"]
      },
      "premium": {
        "name": "Premium",
        "features": [
          "Everything in Regular",
          "Private instructor feedback",
          "Live monthly Q&A sessions",
          "Additional practice videos"
        ]
      },
      "trial": {
        "name": "Free Trial",
        "features": ["First chapter access", "Limited forum access"],
        "duration": "P14D"
      }
    },
    "stats": {
      "enrolled": 587,
      "completed": 342
    },
    "community": {
      "discussions": 128,
      "activeStudents": 234,
      "nextLiveQ_A": "2024-01-15T18:00:00Z"
    }
  },
  {
    "@type": "Course",
    "@id": "https://zensual.art/courses/102",
    "identifier": "102",
    "name": "Cuban Lady Styling",
    "description": "Develop your unique feminine style and elegance in Cuban dance. This course focuses on body movement, arm styling, and authentic expressions for female dancers.",
    "provider": {
      "@type": "Organization",
      "name": "Zensual Academy",
      "description": "Online dance education platform",
      "url": "https://zensual.art",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zensual.art/logo.png"
      }
    },
    "instructor": {
      "@type": "Person",
      "identifier": "2",
      "name": "Yarima Rodríguez",
      "artistId": "17",
      "image": "https://storage.googleapis.com/download/storage/v1/b/wedance-4abe3.appspot.com/o/share%2Fzensual.art.png?generation=1715599448194649&alt=media",
      "jobTitle": "Professional Cuban Dancer",
      "teachingLevel": "Advanced",
      "location": "Cuba",
      "knowsLanguage": ["Spanish", "English"],
      "knowsAbout": ["Salsa Cubana", "Lady Styling", "Son Cubano"],
      "experience": {
        "years": 15,
        "achievements": [
          "Professional Cuban Dancer",
          "International Dance Instructor"
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5.0,
        "ratingCount": 1,
        "reviewCount": 1
      },
      "availableService": {
        "@type": "Service",
        "offers": [
          {
            "@type": "PriceSpecification",
            "price": 80,
            "priceCurrency": "EUR",
            "duration": "PT60M"
          }
        ]
      },
      "socialMedia": {
        "instagram": "/zensual.art/",
        "youtube": "yarimaofficial"
      }
    },
    "educationalLevel": "Intermediate",
    "teaches": [
      {
        "@type": "DefinedTerm",
        "termCode": "lady-styling",
        "name": "Lady Styling",
        "description": "Feminine expressions and movements in Cuban dance",
        "inDefinedTermSet": "DanceStyles"
      },
      {
        "@type": "DefinedTerm",
        "termCode": "cuban-salsa",
        "name": "Cuban Salsa",
        "description": "Traditional Cuban dance style",
        "inDefinedTermSet": "DanceStyles"
      }
    ],
    "timeRequired": "PT12H",
    "numberOfLessons": 24,
    "hasPart": [
      {
        "@type": "Chapter",
        "identifier": 1,
        "name": "Foundations of Feminine Movement",
        "learningResourceType": "Module",
        "hasPart": [
          {
            "@type": "LearningResource",
            "identifier": 1,
            "name": "Introduction to Lady Styling",
            "timeRequired": "PT20M",
            "completed": false,
            "video": {
              "@type": "VideoObject",
              "identifier": "abcd1234",
              "provider": "youtube",
              "duration": "PT20M"
            },
            "locked": false
          },
          {
            "@type": "LearningResource",
            "identifier": 2,
            "name": "Body Posture and Balance",
            "timeRequired": "PT25M",
            "completed": false,
            "video": {
              "@type": "VideoObject",
              "identifier": "efgh5678",
              "provider": "youtube",
              "duration": "PT25M"
            },
            "locked": false
          }
        ]
      },
      {
        "@type": "Chapter",
        "identifier": 2,
        "name": "Arm Styling Techniques",
        "learningResourceType": "Module",
        "hasPart": [
          {
            "@type": "LearningResource",
            "identifier": 3,
            "name": "Basic Arm Patterns",
            "timeRequired": "PT30M",
            "completed": false,
            "video": {
              "@type": "VideoObject",
              "identifier": "ijkl9012",
              "provider": "youtube",
              "duration": "PT30M"
            },
            "locked": true
          },
          {
            "@type": "LearningResource",
            "identifier": 4,
            "name": "Advanced Arm Flow",
            "timeRequired": "PT25M",
            "completed": false,
            "video": {
              "@type": "VideoObject",
              "identifier": "mnop3456",
              "provider": "youtube",
              "duration": "PT25M"
            },
            "locked": true
          }
        ]
      }
    ],
    "learningResources": [
      {
        "@type": "LearningResource",
        "id": "resource-3",
        "name": "Lady Styling Reference Guide.pdf",
        "learningResourceType": "pdf",
        "contentSize": "3.2 MB",
        "icon": "ph:file-pdf",
        "url": "https://zensual.art/resources/lady-styling-guide.pdf"
      },
      {
        "@type": "LearningResource",
        "id": "resource-4",
        "name": "Practice Routines.mp4",
        "learningResourceType": "video",
        "contentSize": "22 MB",
        "icon": "ph:video",
        "url": "https://zensual.art/resources/practice-routines.mp4"
      }
    ],
    "image": {
      "@type": "ImageObject",
      "url": "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2Fc3bfb7be-1dfb-4e71-b486-30754d0ddfa2?alt=media&token=f45dcae4-b2f4-4ea1-9bee-db41c89654f0"
    },
    "video": {
      "@type": "VideoObject",
      "url": "https://zensual.art/videos/lady-styling-preview",
      "duration": "PT2M30S",
      "thumbnailUrl": "https://zensual.art/images/courses/lady-styling-thumb.jpg"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 5.0,
      "ratingCount": 1,
      "reviewCount": 1
    },
    "review": [
      {
        "@type": "Review",
        "identifier": 1,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": "Sofia Martinez"
        },
        "reviewBody": "Yarima's class completely transformed my styling. Her techniques are clear and easy to incorporate into my dancing.",
        "datePublished": "2023-09-15"
      },
      {
        "@type": "Review",
        "identifier": 2,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 4,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": "Emily Wang"
        },
        "reviewBody": "Beautiful course with lots of details on feminine movement. Some parts might be challenging for true beginners.",
        "datePublished": "2023-08-22"
      }
    ],
    "inLanguage": ["English", "Spanish"],
    "dateCreated": "2023-02-01T00:00:00Z",
    "dateModified": "2023-12-10T00:00:00Z",
    offers: [
      {
        '@type': 'PriceSpecification',
        price: 60,
        priceCurrency: 'EUR',
        duration: 'P1M',
        name: 'regular',
      },
      {
        '@type': 'PriceSpecification',
        price: 160,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'regular',
      },
      {
        '@type': 'PriceSpecification',
        price: 160,
        priceCurrency: 'EUR',
        duration: 'P1M',
        name: 'premium',
      },
      {
        '@type': 'PriceSpecification',
        price: 600,
        priceCurrency: 'EUR',
        duration: 'P1Y',
        name: 'premium',
      },
    ],
    "subscriptionControl": {
      "showTrial": false,
      "showMonthlyAnnualToggle": true,
      "plans": ["regular", "premium"]
    },
    "subscriptionPlans": {
      "regular": {
        "name": "Regular",
        "features": ["Full course access", "Community forum", "Practice music"]
      },
      "premium": {
        "name": "Premium", 
        "features": [
          "Everything in Regular",
          "Private instructor feedback",
          "Live monthly Q&A sessions",
          "Additional styling exercises"
        ]
      },
      "trial": {
        "name": "Free Trial",
        "features": ["First chapter access", "Limited forum access"],
        "duration": "P14D"
      }
    },
    "stats": {
      "enrolled": 432,
      "completed": 215
    },
    "community": {
      "discussions": 95,
      "activeStudents": 180,
      "nextLiveQ_A": "2024-02-01T18:00:00Z"
    }
  }
];