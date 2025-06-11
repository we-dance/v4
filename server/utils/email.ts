import * as mailgun from 'mailgun-js'

const mg = mailgun({
  apiKey: useRuntimeConfig().mailgunApiKey,
  domain: useRuntimeConfig().mailgunDomain,
  host: useRuntimeConfig().mailgunHost,
})

const templates: Record<string, any> = {
  'forgot-password': {
    subject: 'Reset Password',
    body: 'Click this link to reset your password: {{resetLink}}',
    from: 'WeDance <noreply@wedance.vip>',
  },
}

export async function sendEmail(template: string, params: Record<string, any>) {
  await mg.messages().send({
    from: templates[template].from,
    to: `${params.name} <${params.email}>`,
    subject: templates[template].subject,
    html: templates[template].body,
  })
}
