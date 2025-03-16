export default defineNuxtPlugin(() => {
  const script = document.createElement('script')
  script.src = 'https://js.stripe.com/v3/pricing-table.js'
  script.async = true
  document.head.appendChild(script)
})

declare namespace JSX {
  interface IntrinsicElements {
    'stripe-pricing-table': {
      'pricing-table-id': string
      'publishable-key': string
    }
  }
}