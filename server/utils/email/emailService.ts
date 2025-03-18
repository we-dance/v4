import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

class EmailService {
  private transporter: Transporter

  constructor() {
    // In production, you would use your SMTP credentials
    // For development, we'll use a test account
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'WeDance <noreply@wedance.vip>',
        ...options,
      }

      await this.transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('Failed to verify email connection:', error)
      return false
    }
  }
}

// Create a singleton instance
const emailService = new EmailService()

export default emailService 