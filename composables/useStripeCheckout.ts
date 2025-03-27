import { useAppAuth } from './useAppAuth'
import { ref } from 'vue'
import { trpc } from '~/composables/trpc'

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
  }) {
    if (!isLoggedIn.value) {
      error.value = 'You must be logged in to subscribe'
      return
    }

    isLoading.value = true
    loadingStripeCourseId.value = params.courseId
    error.value = null

    try {
      // Create checkout session
      const result = await trpc.subscriptions.createCheckoutSession.mutate({
        courseId: params.courseId,
        offeringId: params.courseId,
        successUrl: `${window.location.origin}/courses/${params.courseId}/success`,
        cancelUrl: `${window.location.origin}/courses/${params.courseId}`,
      })

      // Redirect to checkout
      if (result?.url) {
        window.location.href = result.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      error.value = 'An error occurred during checkout. Please try again.'
    } finally {
      isLoading.value = false
      loadingStripeCourseId.value = null
    }
  }

  /**
   * Cancels an active Stripe subscription
   */
  async function cancelSubscription(subscriptionId: string) {
    if (!isLoggedIn.value) {
      error.value = 'You must be logged in to cancel a subscription'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      await trpc.subscriptions.cancelStripeSubscription.mutate({
        subscriptionId,
      })
      return true
    } catch (err) {
      console.error('Cancellation error:', err)
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
