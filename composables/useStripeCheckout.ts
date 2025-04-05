import { useAppAuth } from './useAppAuth'
import { ref } from 'vue'
import { trpc } from '~/composables/trpc'
import { toast } from 'vue-sonner'

export function useStripeCheckout() {
  const { isLoggedIn } = useAppAuth()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const loadingStripeCourseId = ref<string | null>(null)

  /**
   * Redirects the user to the Stripe Checkout page for subscription
   */
  async function redirectToCheckout(params: {
    courseId: string
    courseName: string
    offeringId: string
  }): Promise<string | undefined> {
    let url = ''
    if (!isLoggedIn.value) {
      toast.error('You must be logged in to subscribe')
      error.value = 'You must be logged in to subscribe'
      return url
    }

    isLoading.value = true
    loadingStripeCourseId.value = params.courseId
    error.value = null

    try {
      // Create checkout session
      const result = await trpc.subscriptions.createCheckoutSession.mutate({
        courseId: params.courseId,
        offeringId: params.offeringId,
        successUrl: `${window.location.origin}/checkout/${params.courseName}/success`,
        cancelUrl: `${window.location.origin}/checkout/${params.courseName}`,
      })

      // Redirect to checkout
      if (result?.url) {
        // window.location.href = result.url
        url = result.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      toast.error('An error occurred during checkout. Please try again.')
      error.value = 'An error occurred during checkout. Please try again.'
    } finally {
      isLoading.value = false
      loadingStripeCourseId.value = null
      return url
    }
  }

  /**
   * Cancels an active Stripe subscription
   */
  async function cancelSubscription(subscriptionId: string) {
    if (!isLoggedIn.value) {
      toast.error('You must be logged in to cancel a subscription')
      error.value = 'You must be logged in to cancel a subscription'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      await trpc.subscriptions.cancelStripeSubscription.mutate({
        subscriptionId,
      })
      toast.success('Your subscription has been cancelled')
      return true
    } catch (err) {
      console.error('Cancellation error:', err)
      toast.error('An error occurred while cancelling your subscription.')
      error.value = 'An error occurred while cancelling your subscription.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    redirectToCheckout,
    cancelSubscription,
    isLoading,
    error,
    loadingStripeCourseId,
  }
}
