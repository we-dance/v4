import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import Handlebars from 'handlebars'
import mjml2html from 'mjml'
import { readFile } from 'fs/promises'
import path from 'path'

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
  username: 'api',
  key: useRuntimeConfig().mailgunApiKey,
  url: useRuntimeConfig().mailgunHost || 'https://api.mailgun.net',
})

interface EmailTemplate {
  subject: string
  body?: string
  mjmlFile?: string
  from: string
  type: 'simple' | 'mjml'
}

const templates: Record<string, EmailTemplate> = {
  'forgot-password': {
    subject: 'Reset Your WeDance Password',
    mjmlFile: 'forgot-password.mjml',
    from: 'WeDance <noreply@wedance.vip>',
    type: 'mjml',
  },
  welcome: {
    subject: 'Welcome to WeDance!',
    mjmlFile: 'welcome.mjml',
    from: 'WeDance <noreply@wedance.vip>',
    type: 'mjml',
  },
  'event-reminder': {
    subject: 'Event Reminder: {{eventName}}',
    mjmlFile: 'event-reminder.mjml',
    from: 'WeDance <noreply@wedance.vip>',
    type: 'mjml',
  },
}

function compileTemplate(
  template: string,
  params: Record<string, any>
): string {
  const compiledTemplate = Handlebars.compile(template)
  return compiledTemplate(params)
}

async function compileMjmlTemplate(
  mjmlFile: string,
  params: Record<string, any>
): Promise<string> {
  try {
    const mjmlPath = path.join(process.cwd(), 'server/templates/mjml', mjmlFile)
    const mjmlContent = await readFile(mjmlPath, 'utf-8')

    const compiledMjml = compileTemplate(mjmlContent, params)

    const { html } = mjml2html(compiledMjml)
    return html
  } catch (error) {
    console.error('Error compiling MJML template:', error)
    throw new Error(`Failed to compile MJML template: ${mjmlFile}`)
  }
}

export async function sendEmail(template: string, params: Record<string, any>) {
  const templateConfig = templates[template]
  if (!templateConfig) {
    throw new Error(`Email template '${template}' not found`)
  }

  const toAddress = params.name
    ? `${params.name} <${params.email}>`
    : params.email

  let htmlContent: string

  if (templateConfig.type === 'mjml' && templateConfig.mjmlFile) {
    htmlContent = await compileMjmlTemplate(templateConfig.mjmlFile, params)
  } else if (templateConfig.body) {
    htmlContent = compileTemplate(templateConfig.body, params)
  } else {
    throw new Error(`Template '${template}' has no body or mjmlFile defined`)
  }

  await mg.messages.create(useRuntimeConfig().mailgunDomain, {
    from: templateConfig.from,
    to: toAddress,
    subject: compileTemplate(templateConfig.subject, params),
    html: htmlContent,
  })
}
