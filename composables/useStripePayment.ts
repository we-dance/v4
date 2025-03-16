import { ref } from 'vue'

// for iframe payment
const TEST_PRICING_TABLE_ID = 'prctbl_1QxRDVIGsr0sxheBPN2CufA9'
const TEST_PUBLISHABLE_KEY = 'pk_live_51Qv4EPIGsr0sxheBeNMKXcbfEqY4yql9VVxb7Ms3xue5itVdHBL9b9k2SiyMsYa6ZNeFy6C4YlKirrKRiMmblonk00uWDONLmA'

// for external payment
const TEST_STRIPE_URL = 'https://buy.stripe.com/test_7sIaGYcSndFRbuMbII'

const pricingTableId = ref<string>(TEST_PRICING_TABLE_ID)
const publishableKey = ref<string>(TEST_PUBLISHABLE_KEY)
const stripeUrl = ref<string>('')

// for external payment
const handleStripeCheckout = async (uid: string, orgId: string) => {
  console.log('simulate stripe checkout:', { uid, orgId })

  const mockStripeLink = TEST_STRIPE_URL

  stripeUrl.value = mockStripeLink

  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log('Stripe checkout url:', stripeUrl.value)
  // align with backend stripe checkout structure (instafest)
  return { url: stripeUrl.value }
}

export const useStripeCheckout = () => {
  return {
    pricingTableId,
    publishableKey,
    stripeUrl,
    handleStripeCheckout
  }
}

