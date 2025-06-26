import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import Handlebars from 'handlebars'

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

function compileTemplate(
  template: string,
  params: Record<string, any>
): string {
  const compiledTemplate = Handlebars.compile(template)
  return compiledTemplate(params)
}

export async function sendEmail(template: string, params: Record<string, any>) {
  const templateConfig = templates[template]
  if (!templateConfig) {
    throw new Error(`Email template '${template}' not found`)
  }

  const toAddress = params.name
    ? `${params.name} <${params.email}>`
    : params.email

  await mg.messages.create(useRuntimeConfig().mailgunDomain, {
    from: templateConfig.from,
    to: toAddress,
    subject: compileTemplate(templateConfig.subject, params),
    html: compileTemplate(templateConfig.body, params),
  })
}
