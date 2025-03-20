import { ref } from 'vue'

// for iframe payment (internal payment activated)
const TEST_PRICING_TABLE_ID = 'prctbl_1R3LL3RojAg5mGqyGtxLA3NP'
const TEST_PUBLISHABLE_KEY =
  'pk_test_51R1DkqRojAg5mGqyRskrl6TRdByz4BzlBCrVxqzQlnzBpoap6dzYy2j75UrJioo37yoIAn9RJNAjOk4EbC92kr3E00loSlCweT'

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
    handleStripeCheckout,
  }
}
