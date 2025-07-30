import Mailgun from 'mailgun.js'
import FormData from 'form-data'
import Handlebars from 'handlebars'
import mjml2html from 'mjml'
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
  template: string
  from: string
}

const templates: Record<string, EmailTemplate> = {
  'forgot-password': {
    subject: 'Reset Your WeDance Password',
    template: 'forgot-password',
    from: 'WeDance <noreply@wedance.vip>',
  },
  welcome: {
    subject: 'Welcome to WeDance!',
    template: 'welcome',
    from: 'WeDance <noreply@wedance.vip>',
  },
  'event-reminder': {
    subject: 'Event Reminder: {{eventName}}',
    template: 'event-reminder',
    from: 'WeDance <noreply@wedance.vip>',
  },
  'ticket-purchase-confirmation': {
    subject: 'Ticket Confirmed: {{eventName}}',
    template: 'ticket-purchase-confirmation',
    from: 'WeDance <noreply@wedance.vip>',
  },
}

async function compileMjmlTemplate(
  mjmlFile: string,
  params: Record<string, any>
): Promise<string> {
  try {
    const mjmlTemplate = await useStorage('assets:emails')
      .getItemRaw(`${mjmlFile}.mjml`)
      .then((content) => new TextDecoder().decode(content))

    const mjmlContent = Handlebars.compile(mjmlTemplate)(params)

    const { html } = mjml2html(mjmlContent)
    return html
  } catch (error) {
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

  if (templateConfig.template) {
    htmlContent = await compileMjmlTemplate(templateConfig.template, params)
  } else {
    throw new Error(`Template '${template}' has no body or mjmlFile defined`)
  }

  const subject = Handlebars.compile(templateConfig.subject)(params)

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
