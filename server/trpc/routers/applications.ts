import { router, publicProcedure } from '~/server/trpc/init'
import { z } from 'zod'
import { sendEmail } from '~/server/utils/email'
import { capture } from '~/server/utils/posthog'

const applicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  position: z.string().min(1, 'Position is required'),
})

export const applicationsRouter = router({
  submitApplication: publicProcedure
    .input(applicationSchema)
    .mutation(async ({ input }) => {
      const { name, email, message, position } = input

      try {
        // Send confirmation email to the applicant
        await sendEmail('gig-application-received', {
          name,
          email,
          position,
          userId: null,
        })

        // Send notification to careers team
        const careersEmail =
          useRuntimeConfig().careersContactEmail || 'careers@wedance.vip'
        await sendEmail('gig-application-notification', {
          name,
          email,
          message,
          position,
          to: careersEmail,
          userId: null,
        })

        // Capture PostHog event
        capture({
          distinctId: email,
          event: 'gig_cta_click',
          properties: {
            position,
            action: 'application_submitted',
          },
        })

        return {
          success: true,
          message:
            'Thank you for your application! We will review it and get back to you soon.',
        }
      } catch (error) {
        console.error('Error submitting application:', error)
        throw new Error('Failed to submit application. Please try again.')
      }
    }),
})
