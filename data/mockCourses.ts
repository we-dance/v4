import { mockArtists } from '~/data/mockArtists'
import { type Course, validateCourse } from '~/schemas/course'

const instructor = mockArtists.find((artist) => artist.id === 1)!
if (!instructor) {
  throw new Error('Instructor not found')
}

const mockCoursesData = [
  {
    id: '1',
    title: 'Cuban Casino Fundamentals',
    description:
      'Master the authentic Cuban Casino style with world champion Maykel Fonts. From basic steps to advanced turn patterns, this comprehensive course will give you a solid foundation in Cuban dance.',
    instructor: {
      ...instructor,
      credentials: instructor.experience.achievements?.[0],
    },
    pricing: {
      regular: {
        monthly: {
          amount: 15,
          currency: 'EUR',
          interval: 'month',
        },
        annual: {
          amount: 150,
          currency: 'EUR',
          interval: 'year',
          savings: 'Save 25%',
        },
        features: [
          'Full course access',
          'Downloadable materials',
          'Community forum access',
          'Monthly group Q&A',
        ],
      },
      premium: {
        monthly: {
          amount: 30,
          currency: 'EUR',
          interval: 'month',
        },
        annual: {
          amount: 300,
          currency: 'EUR',
          interval: 'year',
          savings: 'Save 25%',
        },
        features: [
          'Everything in Regular',
          'Weekly live Q&A sessions',
          'Priority support',
          '1-on-1 feedback',
          'Private community access',
        ],
      },
      trial: {
        duration: 7,
        features: [
          'First module access',
          'Community forum preview',
          'No credit card required',
        ],
      },
    },
    stats: {
      enrolled: 234,
      completed: 156,
      avgRating: 4.8,
      reviewCount: 45,
    },
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        comment:
          "Excellent course! Maykel's teaching style is clear and engaging.",
        date: '2024-03-15',
      },
      {
        id: 2,
        user: 'Maria S.',
        rating: 5,
        comment:
          "The best online Cuban salsa course I've taken. Great progression and explanations.",
        date: '2024-03-10',
      },
      {
        id: 3,
        user: 'David R.',
        rating: 4,
        comment:
          'Very comprehensive. The practice materials are super helpful.',
        date: '2024-03-05',
      },
    ],
    preview: {
      videoId: 'xyz789',
      duration: '5:00',
    },
    community: {
      discussions: 15,
      activeStudents: 89,
      nextLiveQ_A: '2024-03-25T18:00:00Z',
    },
    materials: [
      {
        id: 1,
        title: 'Basic Steps Practice Guide',
        type: 'pdf',
        size: '2.4 MB',
        icon: 'ph:file-pdf',
      },
      {
        id: 2,
        title: 'Timba Music Playlist',
        type: 'playlist',
        size: '20 songs',
        icon: 'ph:music-notes',
      },
      {
        id: 3,
        title: 'Practice Drills',
        type: 'video',
        size: '15 min',
        icon: 'ph:video',
      },
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction to Casino',
        lessons: [
          {
            id: 1,
            title: 'Understanding Cuban Dance Culture',
            duration: '15:00',
            videoId: 'abc123',
            completed: true,
          },
          {
            id: 2,
            title: 'Basic Steps & Rhythm',
            duration: '20:00',
            videoId: 'def456',
            completed: false,
          },
          {
            id: 3,
            title: 'Basic Partner Connection',
            duration: '18:00',
            videoId: 'ghi789',
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: 'Essential Turn Patterns',
        lessons: [
          {
            id: 4,
            title: 'Dile Que No',
            duration: '25:00',
            videoId: 'jkl012',
            completed: false,
          },
          {
            id: 5,
            title: 'Vacilala',
            duration: '22:00',
            videoId: 'mno345',
            completed: false,
          },
          {
            id: 6,
            title: 'Setenta',
            duration: '28:00',
            videoId: 'pqr678',
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: 'Musicality & Style',
        lessons: [
          {
            id: 7,
            title: 'Understanding Timba Music',
            duration: '20:00',
            videoId: 'stu901',
            completed: false,
          },
          {
            id: 8,
            title: 'Cuban Body Movement',
            duration: '25:00',
            videoId: 'vwx234',
            completed: false,
          },
        ],
      },
    ],
  },
]

export const mockCourses: Course[] = mockCoursesData.map((course) =>
  validateCourse(course)
)
