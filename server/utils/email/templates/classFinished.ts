import type { Event } from '@prisma/client'

interface ClassFinishedEmailData {
  firstName: string
  className: string
  classDate: string
  classTime: string
  instructorName: string
  feedbackUrl: string
  similarClasses: Event[]
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

  const subject = `Great Job! How Was Your ${className}?`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { max-width: 150px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4F46E5; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #eee; 
            font-size: 12px; 
            color: #666; 
          }
          .similar-class {
            padding: 15px;
            margin: 10px 0;
            border: 1px solid #eee;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${process.env.BASE_URL}/logo.png" alt="WeDance" class="logo">
          </div>
          
          <p>Hi ${firstName},</p>
          
          <p>We hope you had a great time at the event! Here's a quick summary:</p>
          
          <ul>
            <li>Event: ${className}</li>
            <li>Date: ${classDate}</li>
            <li>Time: ${classTime}</li>
            <li>Organizer: ${instructorName}</li>
          </ul>
          
          <p>We'd love to hear about your experience! Your feedback helps us improve and helps other dancers find great events.</p>
          
          <div style="text-align: center;">
            <a href="${feedbackUrl}" class="button">Share Your Feedback</a>
          </div>

          <div style="margin-top: 30px;">
            <h3>You Might Also Like:</h3>
            ${similarClasses
              .map(
                (event) => `
              <div class="similar-class">
                <h4>${event.name}</h4>
                <p>${event.description || ''}</p>
                <a href="${process.env.BASE_URL}/events/${event.id}">Learn More</a>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="footer">
            <p>Need help? Contact our support team at support@wedance.vip</p>
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
Hi ${firstName},

We hope you had a great time at the event!

Event Summary:
- Event: ${className}
- Date: ${classDate}
- Time: ${classTime}
- Organizer: ${instructorName}

We'd love to hear about your experience! Your feedback helps us improve and helps other dancers find great events.

Share your feedback here: ${feedbackUrl}

You Might Also Like:
${similarClasses
    .map(
      (event) => `
- ${event.name}
  ${event.description || ''}
  Learn more: ${process.env.BASE_URL}/events/${event.id}
`
    )
    .join('\n')}

Need help? Contact our support team at support@wedance.vip

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