import type { Event } from '@prisma/client'

interface SimilarClass {
  id: string
  name: string
  description?: string | null
}

interface ClassFinishedEmailData {
  firstName: string
  className: string
  classDate: string
  classTime: string
  instructorName: string
  feedbackUrl: string
  similarClasses: SimilarClass[]
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
    similarClasses,
    unsubscribeUrl,
  } = data

  const subject = `How was your ${className} class?`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            color: #020817;
            background: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 32px 24px;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px;
          }
          .logo { 
            max-width: 120px; 
            margin-bottom: 24px;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 24px 0;
          }
          h2 {
            font-size: 20px;
            font-weight: 600;
            margin: 32px 0 16px 0;
            color: #020817;
          }
          p {
            margin: 0 0 16px 0;
            color: #64748b;
          }
          .summary {
            background: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
          }
          .summary-item {
            display: flex;
            margin-bottom: 12px;
          }
          .summary-label {
            width: 100px;
            color: #64748b;
            font-weight: 500;
          }
          .summary-value {
            color: #020817;
            font-weight: 500;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 8px 0;
          }
          .button-secondary {
            background: #f8fafc;
            color: #020817;
            border: 1px solid #e2e8f0;
          }
          .similar-classes {
            margin: 32px 0;
          }
          .similar-class {
            padding: 20px;
            margin: 16px 0;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
          }
          .similar-class h3 {
            font-size: 16px;
            margin: 0 0 8px 0;
            color: #020817;
          }
          .similar-class p {
            font-size: 14px;
            margin: 0 0 12px 0;
          }
          .similar-class a {
            color: #4F46E5;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
          }
          .footer {
            margin-top: 48px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
            font-size: 14px;
            color: #64748b;
          }
          .footer a {
            color: #4F46E5;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="text-align: center; margin-bottom: 32px;">
              <img 
                src="https://wedance.vip/logo.svg"
                alt="WeDance Logo" 
                style="height: 32px; margin: 0 auto;"
              />
            </div>
            <h1>${subject}</h1>
          </div>
          
          <p>Hi ${firstName},</p>
          
          <p>Thank you for attending the class! We hope you had a great experience and learned something new.</p>
          
          <div class="summary">
            <div class="summary-item">
              <div class="summary-label">Class</div>
              <div class="summary-value">${className}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Date</div>
              <div class="summary-value">${classDate}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Time</div>
              <div class="summary-value">${classTime}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Instructor</div>
              <div class="summary-value">${instructorName}</div>
            </div>
          </div>
          
          <h2>Share Your Experience</h2>
          <p>Your feedback helps us improve and guides other dancers in finding the right classes for them.</p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${feedbackUrl}" class="button">Give Feedback</a>
          </div>

          <h2>Discover More Classes</h2>
          <div class="similar-classes">
            ${similarClasses
              .map(
                (event) => `
              <div class="similar-class">
                <h3>${event.name}</h3>
                <p>${event.description || ''}</p>
                <a href="${process.env.BASE_URL}/events/${event.id}">View Details →</a>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="footer">
            <p>Need help? Our support team is here for you at <a href="mailto:support@wedance.vip">support@wedance.vip</a></p>
            <p>
              WeDance - Your Dance Community<br>
              ${process.env.COMPANY_ADDRESS || ''}<br>
              <a href="${unsubscribeUrl}">Unsubscribe</a> from non-essential emails
            </p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
Great Job! How Was Your ${className}?

Hi ${firstName},

Thank you for attending the class! We hope you had a great experience and learned something new.

Class Details:
- Class: ${className}
- Date: ${classDate}
- Time: ${classTime}
- Instructor: ${instructorName}

Share Your Experience
Your feedback helps us improve and guides other dancers in finding the right classes for them.

Give Feedback: ${feedbackUrl}

Discover More Classes:
${similarClasses
    .map(
      (event) => `
* ${event.name}
  ${event.description || ''}
  View Details: ${process.env.BASE_URL}/events/${event.id}
`
    )
    .join('\n')}

Need help? Our support team is here for you at support@wedance.vip

WeDance - Your Dance Community
${process.env.COMPANY_ADDRESS || ''}

To unsubscribe from non-essential emails, visit: ${unsubscribeUrl}
  `

  return {
    subject,
    html,
    text,
  }
} 