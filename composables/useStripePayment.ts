import { ref } from 'vue'
import { trpc } from '~/composables/trpc'

const stripeUrl = ref<string>('')

// for external payment
const handleStripeCheckout = async (
  userId: string,
  offeringId: string,
  courseId: string
) => {
  // Get the base URL for constructing absolute URLs
  const baseUrl = window.location.origin

  try {
    // Create checkout session
    const result = await trpc.subscriptions.createCheckoutSession.mutate({
      courseId,
      offeringId: offeringId, // Adjust this if needed
      successUrl: `${baseUrl}/checkout/${courseId}/success`,
      cancelUrl: `${baseUrl}/checkout/${courseId}`,
    })

    return result
  } catch (err) {
    console.error('Stripe checkout error:', err)
    throw err
  }
}

export const useStripePayment = () => {
  return {
    stripeUrl,
    handleStripeCheckout,
  }
}
