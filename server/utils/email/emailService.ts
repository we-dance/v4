import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(options: EmailOptions) {
  const { to, subject, html, text } = options

  try {
    await transporter.verify()
  } catch (error) {
    console.error('SMTP connection error:', error)
    throw new Error('Failed to connect to email server')
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'WeDance <noreply@wedance.vip>',
      to,
      subject,
      html,
      text,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('Failed to send email')
  }
} 