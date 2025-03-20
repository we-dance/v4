import { generateClassFinishedEmail } from '../../utils/email/templates/classFinished'

export default defineEventHandler(async (event) => {
  const sampleData = {
    firstName: 'John',
    className: 'Salsa Fundamentals',
    classDate: new Date().toLocaleDateString(),
    classTime: '19:00 - 20:30',
    instructorName: 'Maria Rodriguez',
    feedbackUrl: `${process.env.BASE_URL}/events/sample-id/feedback?userId=sample-user-id`,
    similarClasses: [
      {
        id: 'class-1',
        name: 'Bachata Basics',
        description: 'Learn the fundamentals of Bachata dancing'
      },
      {
        id: 'class-2',
        name: 'Intermediate Salsa',
        description: 'Take your Salsa skills to the next level'
      }
    ],
    unsubscribeUrl: `${process.env.BASE_URL}/settings/notifications`
  }

  const email = generateClassFinishedEmail(sampleData)
  
  return email.html
}) 