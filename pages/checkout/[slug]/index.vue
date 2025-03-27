<script setup lang="ts">
import { mockEvents } from '@/data/mockEvents'
import { mockCourses } from '@/data/mockCourses'
import { mockOrganizers } from '@/data/mockOrganizers'
import type { AnyEvent, Price } from '~/schemas/event'
import { formatDate } from '~/utils/format'
import { useRegistration } from '~/composables/useRegistration'
// import StripePaymentDialog from '~/components/dialog/StripePaymentDialog.vue'
import { useStripeCheckout } from '~/composables/useStripePayment'
const { mockUsers } = useRegistration()
const { handleStripeCheckout } = useStripeCheckout()

interface CoursePrice {
  amount: number
  currency: string
  interval?: string
  description?: string
}

interface Course {
  id: string
  name: string
  image?: string
  description?: string
  instructor: {
    name: string
    image?: string
  }
  pricing: {
    regular: {
      monthly: CoursePrice
      annual: CoursePrice
    }
    premium: {
      monthly: CoursePrice
      annual: CoursePrice
    }
    trial?: {
      duration: number
    }
  }
}

interface CheckoutItem {
  id: string
  name: string
  image?: string
  description?: string
  instructor?: {
    id?: string
    name: string
    image?: string
  }
  pricing?: {
    regular: {
      monthly: CoursePrice
      annual: CoursePrice
    }
    premium: {
      monthly: CoursePrice
      annual: CoursePrice
    }
    trial?: {
      duration: number
    }
  }
  privateClass?: {
    amount: number
    currency: string
    duration: number
  }
  date?: {
    start: string
    end: string
  }
  location?: {
    name: string
    city: string
  }
  prices?: Price[]
}

const route = useRoute()
const type = route.query.type || 'event'

const stripeDialog = ref(false)
const stripeUrl = ref<string>('')
const uid = ref<string>('')
const orgId = ref<string>('')
// different stripe display options
const isInternalPayment = ref(false)
const currentPricingTableId = ref<string>('')
const currentPublishableKey = ref<string>('')

// Get item details based on type
const item = computed<CheckoutItem | null>(() => {
  if (type === 'event') {
    const event = mockEvents.find(
      (e) => String(e.id) === String(route.params.slug)
    )
    if (event) {
      return {
        id: String(event.id),
        name: event.name,
        date: event.date,
        location: event.location,
        prices: event.prices,
        image: event.image,
      }
    }
  }
  if (type === 'course') {
    const course = mockCourses.find(
      (c) => String(c.identifier) === String(route.params.slug)
    )
    if (course) {
      const monthlyRegularOffer = course.offers.find(
        (offer) => offer.duration === 'P1M' && offer.name === 'regular'
      )
      const annualRegularOffer = course.offers.find(
        (offer) => offer.duration === 'P1Y' && offer.name === 'regular'
      )
      const monthlyPremiumOffer = course.offers.find(
        (offer) => offer.duration === 'P1M' && offer.name === 'premium'
      )
      const annualPremiumOffer = course.offers.find(
        (offer) => offer.duration === 'P1Y' && offer.name === 'premium'
      )
      return {
        id: course.identifier,
        name: course.name,
        image: course.instructor.image,
        instructor: {
          name: course.instructor.name,
          image: course.instructor.image,
        },
        pricing: {
          regular: {
            monthly: monthlyRegularOffer
              ? {
                  amount: monthlyRegularOffer.price,
                  currency: monthlyRegularOffer.priceCurrency,
                  interval: 'monthly',
                }
              : {
                  amount: 0,
                  currency: 'EUR',
                  interval: 'monthly',
                },
            annual: annualRegularOffer
              ? {
                  amount: annualRegularOffer.price,
                  currency: annualRegularOffer.priceCurrency,
                  interval: 'annual',
                }
              : {
                  amount: 0,
                  currency: 'EUR',
                  interval: 'annual',
                },
          },
          premium: {
            monthly: monthlyPremiumOffer
              ? {
                  amount: monthlyPremiumOffer.price,
                  currency: monthlyPremiumOffer.priceCurrency,
                  interval: 'monthly',
                }
              : {
                  amount: 0,
                  currency: 'EUR',
                  interval: 'monthly',
                },
            annual: annualPremiumOffer
              ? {
                  amount: annualPremiumOffer.price,
                  currency: annualPremiumOffer.priceCurrency,
                  interval: 'annual',
                }
              : {
                  amount: 0,
                  currency: 'EUR',
                  interval: 'annual',
                },
          },
          trial: course.subscriptionControl?.showTrial
            ? {
                duration: 7,
              }
            : undefined,
        },
        description: course.description,
      }
    }
  }
  if (type === 'private') {
    const course = mockCourses.find(
      (c) => String(c.identifier) === String(route.params.slug)
    )
    const privateOffer = course?.instructor.availableService?.offers[0]
    if (course && privateOffer) {
      return {
        id: course.identifier,
        name: 'Private Class',
        image: course.instructor.image,
        instructor: {
          id: course.instructor.identifier,
          name: course.instructor.name,
          image: course.instructor.image,
        },
        privateClass: {
          amount: privateOffer.price,
          currency: privateOffer.priceCurrency,
          duration: Number(
            privateOffer.duration?.replace('PT', '').replace('M', '') || 60
          ),
        },
        description: `Private ${privateOffer.duration?.replace('PT', '').replace('M', '') || 60}-minute lesson with ${course.instructor.name}`,
      }
    }
  }
  return null
})

// Get selected price for workshops or courses
const selectedPrice = computed(() => {
  if (!item.value) return null

  if (type === 'event') {
    const priceId = route.query.priceId as string
    return item.value.prices?.find((p: Price) => p.id === priceId)
  }

  if (type === 'course' && item.value.pricing) {
    const plan = route.query.plan as 'regular' | 'premium' | 'trial'
    const interval = route.query.interval as 'monthly' | 'annual'

    if (plan === 'trial') {
      return {
        type: 'trial',
        amount: 0,
        currency: 'EUR',
        name: 'Free Trial',
        description: `${item.value.pricing.trial?.duration || 7} days free trial`,
        interval: 'trial',
      }
    }

    const price = item.value.pricing[plan]?.[interval]
    if (price) {
      return {
        type: 'subscription',
        ...price,
        name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        description:
          interval === 'annual' ? 'Billed annually' : 'Billed monthly',
        interval,
      }
    }
  }

  if (type === 'private' && item.value.privateClass) {
    return {
      type: 'one-time',
      amount: item.value.privateClass.amount,
      currency: item.value.privateClass.currency,
      name: 'Private Class',
      description: `${item.value.privateClass.duration} minutes with ${item.value.instructor?.name}`,
    }
  }

  return null
})

// Update template to handle subscription interval display
const displayInterval = computed(() => {
  if (!selectedPrice.value || !('interval' in selectedPrice.value)) return null
  if (selectedPrice.value.interval === 'trial') return null
  return selectedPrice.value.interval === 'annual' ? 'year' : ''
})

// Get final price for checkout
const checkoutPrice = computed(() => {
  if (selectedPrice.value) {
    return {
      ...selectedPrice.value,
      type:
        selectedPrice.value.type ||
        (type === 'event' ? 'one-time' : 'subscription'),
    }
  }

  throw new Error('Unknown price checkout logic not implemented yet')
})

// Checkout state management
const checkoutState = ref('email') // email, login, or register

const { checkEmail, createAccount, login, isLoading, error } = useRegistration()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  userType: 'dancer',
  terms: false,
})

const handleEmailCheck = async () => {
  if (!formData.email) return

  const exists = await checkEmail(formData.email)
  checkoutState.value = exists ? 'login' : 'register'
}

// after subscription, redirect to success page, meanwhile change lesson status to locked: true
const handleSubmit = async () => {
  if (!item.value) return
  try {
    let success = false

    if (checkoutState.value === 'login') {
      success = await login(formData.email, formData.password)
    } else {
      success = await createAccount(formData)
    }
    if (success) {
      onMounted(() => {
        // handle request.auth?.uid and request.data.orgId
        uid.value =
          mockUsers.find(
            (user) => user.email.toLowerCase() === formData.email.toLowerCase()
          )?.uid || String(mockUsers.length + 1)
        const providerName = mockCourses.find(
          (course) => course.identifier === route.params.slug
        )?.provider.name
        orgId.value =
          mockOrganizers.find(
            (org) => org.name.toLowerCase() === providerName?.toLowerCase()
          )?.id || String(mockOrganizers.length + 1)
        // check if orgId is a valid organizer id
        console.log({
          uid: uid,
          orgId: orgId,
        })
      })
      // Need to receive an object {usl: accountLink.url} from backend as stripe link
      if (!isInternalPayment.value) {
        // Pass the course ID to the handleStripeCheckout function
        const stripeData = await handleStripeCheckout(
          uid.value,
          orgId.value,
          item.value.id // Make sure to pass the course ID
        )

        if (stripeData && stripeData.url) {
          stripeUrl.value = stripeData.url
          stripeDialog.value = true
          // to stripe checkout page (test page)
          console.log('Redirecting to stripe checkout')
          // await new Promise((resolve) => setTimeout(resolve, 5000))
          // window.location.href = stripeData.url
        } else {
          console.error('Stripe payment URL not found')
        }
      }
    }
  } catch (e) {
    console.error('Checkout failed:', e)
  }
}

// Handle stripe dialog close
const handleStripeDialogClose = () => {
  console.log('Stripe dialog closed')
  stripeDialog.value = false
  stripeUrl.value = ''
  const baseUrl = window.location.origin
  const successUrl = `${baseUrl}/checkout/${item.value?.id}/success`
  window.location.href = successUrl
}

// Add at the top of the script
const isEventItem = (
  item: CheckoutItem | null
): item is CheckoutItem & {
  date: { start: string }
  location: { name: string; city: string }
} => {
  return item !== null && 'date' in item && 'location' in item
}
</script>

<template>
  <div v-if="item" class="min-h-screen bg-muted py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold">Checkout</h1>
          <p class="text-muted-foreground mt-2">
            {{
              type === 'event'
                ? 'Complete your booking'
                : 'Start your learning journey'
            }}
          </p>
        </div>

        <!-- Item Summary -->
        <div class="bg-background rounded-xl border p-6">
          <div class="flex gap-6">
            <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="item.image || '/images/placeholder.jpg'"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-xl font-bold">{{ item.name }}</h2>
              <div class="text-muted-foreground space-y-1 mt-2">
                <template v-if="type === 'event'">
                  <div class="flex items-center gap-2">
                    <Icon name="ph:calendar" class="w-4 h-4" />
                    <span v-if="isEventItem(item)">{{
                      formatDate(item.date.start)
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4" />
                    <span v-if="isEventItem(item)"
                      >{{ item.location.name }}, {{ item.location.city }}</span
                    >
                  </div>
                </template>
                <template v-else>
                  <div class="flex items-center gap-2">
                    <Icon name="ph:user" class="w-4 h-4" />
                    <span
                      >Instructor: {{ (item as Course).instructor.name }}</span
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Price Summary -->
          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between items-center text-lg">
              <div>
                <div class="font-medium">
                  {{
                    checkoutPrice.type === 'subscription'
                      ? 'One-Time Payment'
                      : checkoutPrice.type === 'trial'
                        ? 'Free Trial'
                        : checkoutPrice.name
                  }}
                </div>
                <div class="text-sm text-muted-foreground">
                  <template v-if="checkoutPrice.type === 'subscription'">
                    {{
                      displayInterval === 'year'
                        ? 'Billed annually'
                        : 'Lifetime Access'
                    }}
                  </template>
                  <template v-else>
                    {{ checkoutPrice.description }}
                  </template>
                </div>
              </div>
              <div class="font-bold">
                <template v-if="checkoutPrice.type === 'trial'">
                  Free
                </template>
                <template v-else>
                  {{ checkoutPrice.amount }} {{ checkoutPrice.currency }}
                  <span
                    v-if="checkoutPrice.type === 'subscription'"
                    class="text-sm font-normal text-muted-foreground"
                  >
                    {{ displayInterval }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Checkout Form -->
        <form
          @submit.prevent="
            checkoutState === 'email' ? handleEmailCheck() : handleSubmit()
          "
          class="bg-background rounded-xl border p-6"
        >
          <div class="space-y-6">
            <!-- Email Step -->
            <div v-if="checkoutState === 'email'">
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your email to continue"
                />
              </div>

              <div class="mt-6">
                <Button type="submit" :disabled="isLoading" class="w-full">
                  <template v-if="isLoading">Checking...</template>
                  <template v-else>Continue</template>
                </Button>
              </div>
            </div>

            <!-- Login Step -->
            <div v-else-if="checkoutState === 'login'" class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Welcome back! Please log in to continue.
              </p>

              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  class="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <Button type="submit" :disabled="isLoading" class="w-full">
                <template v-if="isLoading">Logging in...</template>
                <template v-else>Log in</template>
              </Button>
            </div>

            <!-- Registration Step -->
            <div v-else-if="checkoutState === 'register'" class="space-y-6">
              <p class="text-sm text-muted-foreground">
                Create your account to join our dance community
              </p>

              <!-- User Type -->
              <UserTypeSelect v-model="formData.userType" />

              <!-- Name Fields -->
              <NameFields
                v-model:firstName="formData.firstName"
                v-model:lastName="formData.lastName"
              />

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  v-model="formData.password"
                  type="password"
                  required
                  class="w-full px-4 py-2 border rounded-lg"
                  placeholder="Create a password"
                />
              </div>

              <!-- Terms -->
              <TermsCheckbox v-model="formData.terms" />

              <div v-if="error" class="text-destructive text-sm">
                {{ error }}
              </div>

              <Button type="submit" :disabled="isLoading" class="w-full">
                <template v-if="isLoading">Processing...</template>
                <template v-else>Complete Booking</template>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon
        :name="type === 'event' ? 'ph:calendar-x' : 'ph:video-camera-slash'"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">
        {{ type === 'event' ? 'Event' : 'Course' }} Not Found
      </h2>
      <p class="text-muted-foreground mb-6">
        The {{ type === 'event' ? 'event' : 'course' }} you're looking for
        doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink :to="type === 'event' ? '/events' : '/courses'">
          Browse {{ type === 'event' ? 'Events' : 'Courses' }}
        </NuxtLink>
      </Button>
    </div>
  </div>
  <!-- Stripe popup, internal payment -->
  <StripePaymentDialog
    v-if="isInternalPayment"
    :is-open="stripeDialog"
    :pricing-table-id="currentPricingTableId"
    :publishable-key="currentPublishableKey"
    @close="handleStripeDialogClose"
  />
</template>
