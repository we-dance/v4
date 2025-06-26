import Mailgun from 'mailgun.js'
import FormData from 'form-data'

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
  username: 'api',
  key: useRuntimeConfig().mailgunApiKey,
  url: useRuntimeConfig().mailgunHost || 'https://api.mailgun.net',
})

const templates: Record<string, any> = {
  'forgot-password': {
    subject: 'Reset Password',
    body: 'Click this link to reset your password: {{resetLink}}',
    from: 'WeDance <noreply@wedance.vip>',
  },
}

export async function sendEmail(template: string, params: Record<string, any>) {
  await mg.messages.create(useRuntimeConfig().mailgunDomain, {
    from: templates[template].from,
    to: `${params.name} <${params.email}>`,
    subject: templates[template].subject,
    html: templates[template].body,
  })
}
