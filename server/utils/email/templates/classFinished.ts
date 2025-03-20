import type { Event } from '@prisma/client'

export interface ClassFinishedEmailData {
  firstName: string
  className: string
  classDate: string
  classTime: string
  instructorName: string
  feedbackUrl: string
  similarClasses?: Array<{
    id: string
    name: string
    description?: string
  }>
  unsubscribeUrl: string
}

export function generateClassFinishedEmail(data: ClassFinishedEmailData) {
  const {
    firstName,
    className,
    classDate,
    classTime,
    instructorName,
    feedbackUrl,
    similarClasses = [],
    unsubscribeUrl
  } = data

  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://wedance.vip' 
    : 'http://localhost:3000'

  const subject = `How was your ${className} class?`

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="text-align: center; margin-bottom: 32px;">
        <img 
          src="${baseUrl}/logo.svg"
          alt="WeDance Logo" 
          style="height: 32px; margin: 0 auto;"
        />
      </div>

      <h1 style="text-align: center; color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">
        ${subject}
      </h1>

      <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
        Hi ${firstName},
      </p>

      <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
        Thank you for attending ${className} with ${instructorName} on ${classDate} at ${classTime}.
        We'd love to hear your feedback to help improve future classes!
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a
          href="${baseUrl}${feedbackUrl}"
          style="display: inline-block; background-color: #6366f1; color: white; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: 500;"
        >
          Share Your Feedback
        </a>
      </div>

      ${similarClasses.length ? `
        <div style="margin: 32px 0;">
          <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 16px;">
            Similar Upcoming Classes
          </h2>
          <div style="display: grid; gap: 16px;">
            ${similarClasses.map(class_ => `
              <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px;">
                <h3 style="color: #1a1a1a; font-size: 16px; margin: 0 0 8px;">
                  ${class_.name}
                </h3>
                ${class_.description ? `
                  <p style="color: #4a4a4a; font-size: 14px; margin: 0;">
                    ${class_.description}
                  </p>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 32px;">
        <p style="margin-bottom: 8px;">
          Need help? Contact us at support@wedance.vip
        </p>
        <a 
          href="${baseUrl}${unsubscribeUrl}"
          style="color: #6366f1; text-decoration: none;"
        >
          Unsubscribe from notifications
        </a>
      </div>
    </div>
  `

  const text = `
How was your ${className} class?

Hi ${firstName},

Thank you for attending ${className} with ${instructorName} on ${classDate} at ${classTime}.
We'd love to hear your feedback to help improve future classes!

Share your feedback: ${baseUrl}${feedbackUrl}

${similarClasses.length ? `
Similar Upcoming Classes:
${similarClasses.map(class_ => `
- ${class_.name}${class_.description ? `: ${class_.description}` : ''}`).join('\n')}
` : ''}

Need help? Contact us at support@wedance.vip
Unsubscribe: ${baseUrl}${unsubscribeUrl}
`

  return {
    subject,
    html,
    text
  }
} 