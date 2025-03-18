import type { Course } from '~/schemas/course'

interface CourseFeedbackEmailData {
  firstName: string
  courseName: string
  instructorName: string
  classDate: string
  classTime: string
  feedbackUrl: string
  unsubscribeUrl: string
  similarClasses: Array<{
    name: string
    url: string
    date: string
  }>
}

export function generateCourseFeedbackEmail(data: CourseFeedbackEmailData) {
  return {
    subject: `Great Job! How Was Your ${data.courseName}?`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Class Feedback Request</title>
          <style>
            body {
              font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              background-color: #0070f3;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .header img {
              max-width: 150px;
              margin-bottom: 15px;
            }
            .header h1 {
              color: white;
              margin: 0;
            }
            .content {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 0 0 8px 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .class-summary {
              background-color: #f5f5f5;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #0070f3;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .similar-classes {
              margin-top: 30px;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            .class-card {
              padding: 15px;
              border: 1px solid #eee;
              border-radius: 6px;
              margin-bottom: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            .support-info {
              margin-top: 20px;
              text-align: center;
            }
            .unsubscribe {
              color: #666;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://wedance.vip/logo-white.png" alt="WeDance Logo" />
              <h1>How was your class?</h1>
            </div>
            <div class="content">
              <p>Hi ${data.firstName},</p>
              
              <p>We hope you had a great time at your dance class! We'd love to hear about your experience.</p>
              
              <div class="class-summary">
                <h3>${data.courseName}</h3>
                <p><strong>Date:</strong> ${data.classDate}</p>
                <p><strong>Time:</strong> ${data.classTime}</p>
                <p><strong>Instructor:</strong> ${data.instructorName}</p>
              </div>

              <div style="text-align: center;">
                <a href="${data.feedbackUrl}" class="button">Share Your Feedback</a>
              </div>

              <div class="similar-classes">
                <h3>Classes You Might Like</h3>
                ${data.similarClasses.map(cls => `
                  <div class="class-card">
                    <h4>${cls.name}</h4>
                    <p>${cls.date}</p>
                    <a href="${cls.url}">Learn More</a>
                  </div>
                `).join('')}
              </div>

              <div class="support-info">
                <h4>Need Help?</h4>
                <p>Contact our support team at <a href="mailto:support@wedance.vip">support@wedance.vip</a></p>
                <p>Or visit our <a href="https://wedance.vip/help">Help Center</a></p>
              </div>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} WeDance. All rights reserved.</p>
              <p>You received this email because you attended a class on WeDance.</p>
              <p><a href="${data.unsubscribeUrl}" class="unsubscribe">Unsubscribe from these emails</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${data.firstName},

We hope you had a great time at your dance class! We'd love to hear about your experience.

CLASS DETAILS
------------
${data.courseName}
Date: ${data.classDate}
Time: ${data.classTime}
Instructor: ${data.instructorName}

Share your feedback here: ${data.feedbackUrl}

CLASSES YOU MIGHT LIKE
---------------------
${data.similarClasses.map(cls => `
${cls.name}
${cls.date}
Learn more: ${cls.url}
`).join('\n')}

NEED HELP?
----------
Contact our support team at support@wedance.vip
Or visit our Help Center: https://wedance.vip/help

© ${new Date().getFullYear()} WeDance. All rights reserved.
You received this email because you attended a class on WeDance.

Unsubscribe: ${data.unsubscribeUrl}
    `.trim(),
  }
} 