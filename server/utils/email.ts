import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import Handlebars from 'handlebars'
import mjml2html from 'mjml'
import { readFile } from 'fs/promises'
import path from 'path'
import { prisma } from '~/server/prisma'
import posthog from '~/server/utils/posthog'

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
  username: 'api',
  key: useRuntimeConfig().mailgunApiKey,
  url: useRuntimeConfig().mailgunHost,
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
    mjmlFile: 'forgot-password',
    from: 'WeDance <noreply@wedance.vip>',
    type: 'mjml',
  },
  welcome: {
    subject: 'Welcome to WeDance!',
    mjmlFile: 'welcome',
    from: 'WeDance <noreply@wedance.vip>',
    type: 'mjml',
  },
  'event-reminder': {
    subject: 'Event Reminder: {{eventName}}',
    mjmlFile: 'event-reminder',
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
    const mjmlContent = await useStorage('assets:emails')
      .getItemRaw(`${mjmlFile}.mjml`)
      .then((content) => new TextDecoder().decode(content))

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

  const subject = compileTemplate(templateConfig.subject, params)

  const result = await mg.messages.create(useRuntimeConfig().mailgunDomain, {
    from: templateConfig.from,
    to: toAddress,
    subject,
    html: htmlContent,
  })

  await prisma.emailSent.create({
    data: {
      userId: params.userId,
      mailgunId: result.id || '',
      type: template,
      subject,
      params,
      status: 'queued',
    },
  })

  posthog.capture({
    distinctId: params.userId,
    event: 'email_sent',
    properties: {
      mailgunId: result.id,
      type: template,
    },
  })
  await posthog.shutdown()
}
