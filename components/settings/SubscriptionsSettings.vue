<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog'
import { Badge } from '~/components/ui/badge'
import { toast } from 'vue-sonner'
import { Teleport } from 'vue'

// Define the Subscription type matching our schema
interface Subscription {
  id: string
  userId: string
  name: string
  plan: string
  price: number
  currency: string
  interval: string
  status: 'active' | 'canceled' | 'past_due'
  nextBillingDate: string | null
  canceledAt: string | null
  downgradeToId: string | null
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string
  currentPeriodStart: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  stripePriceId: string | null
  createdAt: string
  updatedAt: string
}

// Define plan structure
interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  isPopular: boolean
}

// Mock subscription data
const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1234',
    userId: 'user_123',
    name: 'Salsa Fundamentals',
    plan: 'Premium',
    price: 29.99,
    currency: 'EUR',
    interval: 'month',
    status: 'active',
    nextBillingDate: '2023-11-15',
    canceledAt: null,
    downgradeToId: null,
    cancelAtPeriodEnd: false,
    currentPeriodEnd: '2023-11-15',
    currentPeriodStart: '2023-10-15',
    stripeCustomerId: 'cus_123',
    stripeSubscriptionId: 'sub_stripe_123',
    stripePriceId: 'price_123',
    createdAt: '2023-10-15',
    updatedAt: '2023-10-15',
  },
  {
    id: 'sub_5678',
    userId: 'user_123',
    name: 'WeDance Pro',
    plan: 'Monthly',
    price: 9.99,
    currency: 'EUR',
    interval: 'month',
    status: 'active',
    nextBillingDate: '2023-10-01',
    canceledAt: null,
    downgradeToId: null,
    cancelAtPeriodEnd: false,
    currentPeriodEnd: '2023-10-01',
    currentPeriodStart: '2023-09-01',
    stripeCustomerId: 'cus_123',
    stripeSubscriptionId: 'sub_stripe_456',
    stripePriceId: 'price_456',
    createdAt: '2023-09-01',
    updatedAt: '2023-09-01',
  },
]

// Mock plans
const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan_basic',
    name: 'Basic',
    description: 'Essential features for casual dancers',
    price: {
      monthly: 4.99,
      yearly: 49.99,
    },
    features: [
      'Full access to communities',
      'Enhanced profile',
      'Event creation (5/month)',
    ],
    isPopular: false,
  },
  {
    id: 'plan_premium',
    name: 'Premium',
    description: 'Advanced features for professionals',
    price: {
      monthly: 29.99,
      yearly: 299.99,
    },
    features: [
      'Premium community access',
      'Featured profile',
      'Unlimited event creation',
      'Analytics',
    ],
    isPopular: true,
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    description: 'For serious dancers',
    price: {
      monthly: 19.99,
      yearly: 199.99,
    },
    features: [
      'Everything in Premium',
      '1-on-1 coaching sessions',
      'Advanced technique workshops',
      'Early access to new content',
    ],
    isPopular: false,
  },
]

// State management
const isLoading = ref(false)
const subscriptions = ref<Subscription[]>(mockSubscriptions)
const confirmDialogOpen = ref(false)
const confirmCancelDialogOpen = ref(false)
const selectedCourseId = ref('')
const termsAccepted = ref(false)
const isUpgrade = ref(false)
const selectedPlanId = ref('')

// Reasons for cancellation
const cancellationReasons = [
  'Too expensive',
  'Not using enough',
  'Found a better alternative',
  'Missing features',
  'Technical issues',
  'Just want to take a break',
  'Other',
]
const selectedReason = ref('')

// Get current subscription for the selected course
const currentSubscription = computed(() =>
  subscriptions.value.find((s) => s.id === selectedCourseId.value)
)

// Get the current plan details
const currentPlan = computed(() => {
  if (!currentSubscription.value) return null
  return mockSubscriptionPlans.find(
    (p) => p.name === currentSubscription.value?.plan
  )
})

// Get the selected plan details
const selectedPlan = computed(() =>
  mockSubscriptionPlans.find((p) => p.id === selectedPlanId.value)
)

const formattedRenewalDate = computed(() => {
  if (!currentSubscription.value) return ''
  const date = new Date(currentSubscription.value.currentPeriodEnd)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
})

// Calculate subscription age in hours
const subscriptionAge = computed(() => {
  if (!currentSubscription.value) return 0
  const now = new Date()
  const startDate = new Date(currentSubscription.value.currentPeriodStart)
  // Return age in hours
  return Math.abs(now.getTime() - startDate.getTime()) / 36e5 // 36e5 is milliseconds in an hour
})

// Check if eligible for money-back guarantee (less than 24 hours old)
const isEligibleForMoneyBack = computed(() => {
  return subscriptionAge.value <= 24
})

// Handle opening the cancel dialog
const openCancelSubscriptionDialog = (sub: Subscription) => {
  selectedCourseId.value = sub.id

  // Check if eligible for money-back guarantee
  if (isEligibleForMoneyBack.value) {
    confirmMoneyBackDialogOpen.value = true
  } else {
    confirmCancelDialogOpen.value = true
  }
}

// Money back guarantee dialog
const confirmMoneyBackDialogOpen = ref(false)

// Format subscription start date
const subscriptionStartFormatted = computed(() => {
  if (!currentSubscription.value) return ''
  const date = new Date(currentSubscription.value.currentPeriodStart)
  return (
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) +
    ' at ' +
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  )
})

// Select a plan for upgrade/downgrade
const selectPlan = (plan: SubscriptionPlan) => {
  selectedPlanId.value = plan.id

  // Determine if it's an upgrade or downgrade
  if (currentSubscription.value) {
    const currentPlanPrice = currentSubscription.value.price
    isUpgrade.value = plan.price.monthly > currentPlanPrice
  }

  confirmDialogOpen.value = true
}

// Handle plan change submission
const onSubmit = async () => {
  if (!termsAccepted.value) {
    toast.error('Please accept the terms to continue')
    return
  }

  toast.info(`Processing ${isUpgrade.value ? 'upgrade' : 'downgrade'}...`, {
    duration: 2000,
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Update local state
  const index = subscriptions.value.findIndex(
    (s) => s.id === selectedCourseId.value
  )

  if (index !== -1 && selectedPlan.value) {
    if (isUpgrade.value) {
      // Immediate upgrade
      subscriptions.value[index].plan = selectedPlan.value.name
      subscriptions.value[index].price = selectedPlan.value.price.monthly
      subscriptions.value[index].updatedAt = new Date().toISOString()
    } else {
      // Downgrade at period end
      subscriptions.value[index].downgradeToId = selectedPlan.value.id
      subscriptions.value[index].cancelAtPeriodEnd = true
    }
  }

  toast.success(
    `Subscription ${isUpgrade.value ? 'upgraded' : 'downgraded'} successfully`
  )
  confirmDialogOpen.value = false
  termsAccepted.value = false
}

// Cancel a subscription
const cancelSubscription = async () => {
  if (!selectedCourseId.value) return

  toast.info('Processing cancellation request...', {
    duration: 2000,
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Update local state
  const index = subscriptions.value.findIndex(
    (s) => s.id === selectedCourseId.value
  )

  if (index !== -1) {
    subscriptions.value[index].cancelAtPeriodEnd = true
    subscriptions.value[index].status = 'canceled'
    subscriptions.value[index].canceledAt = new Date().toISOString()
  }

  toast.success('Your subscription has been canceled')
  confirmCancelDialogOpen.value = false
  selectedReason.value = ''
}

// Cancel with refund (24-hour money back guarantee)
const cancelWithRefund = async () => {
  if (!selectedCourseId.value) return

  toast.info('Processing cancellation and refund...', {
    duration: 2000,
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Update local state
  const index = subscriptions.value.findIndex(
    (s) => s.id === selectedCourseId.value
  )

  if (index !== -1) {
    subscriptions.value[index].status = 'canceled'
    subscriptions.value[index].cancelAtPeriodEnd = false
    subscriptions.value[index].canceledAt = new Date().toISOString()
  }

  toast.success(
    'Your subscription has been canceled and a refund has been issued'
  )
  confirmMoneyBackDialogOpen.value = false
  selectedReason.value = ''
}

// Cancel a planned downgrade
const cancelDowngrade = (subscription: Subscription) => {
  const index = subscriptions.value.findIndex((s) => s.id === subscription.id)

  if (index !== -1) {
    subscriptions.value[index].downgradeToId = null
    subscriptions.value[index].cancelAtPeriodEnd = false
    toast.success('Plan change canceled')
  }
}

// Format date for display
const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Load subscriptions when the component mounts
onMounted(() => {
  // In a real implementation, you would fetch from API
  isLoading.value = false
})
</script>

<template>
  <!-- Loading state while fetching data -->
  <div v-if="isLoading" class="flex justify-center py-6">
    <div
      class="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <!-- Subscription content -->
  <div v-else class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="ph:credit-card" class="w-5 h-5" />
      Subscription Settings
    </h2>

    <!-- Active subscriptions -->
    <div v-if="subscriptions.length > 0" class="space-y-4">
      <div
        v-for="subscription in subscriptions"
        :key="subscription.id"
        class="border rounded-lg overflow-hidden"
      >
        <!-- Subscription header -->
        <div class="p-4">
          <div class="flex justify-between items-center">
            <h3 class="text-base font-medium">{{ subscription.name }}</h3>
            <Badge
              v-if="subscription.status === 'active'"
              variant="outline"
              class="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
            >
              Active
            </Badge>
            <Badge
              v-else-if="subscription.status === 'canceled'"
              variant="outline"
              class="bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
            >
              Canceled
            </Badge>
          </div>

          <div class="text-sm text-muted-foreground mt-1">
            {{ subscription.plan }} • {{ subscription.price }}
            {{ subscription.currency }}/{{ subscription.interval }}
          </div>

          <div class="text-sm mt-1" v-if="subscription.status === 'active'">
            Next billing date: {{ formatDate(subscription.nextBillingDate) }}
          </div>

          <!-- Cancellation notice -->
          <div
            v-if="subscription.cancelAtPeriodEnd && !subscription.downgradeToId"
            class="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800"
          >
            <div class="flex items-start">
              <Icon name="ph:warning" class="h-5 w-5 mr-2 mt-0.5" />
              <div>
                <div class="font-medium">
                  Your subscription will be cancelled
                </div>
                <p class="text-sm">
                  Your subscription will end on
                  {{ formatDate(subscription.currentPeriodEnd) }}. You'll lose
                  access to this course after this date.
                </p>
                <Button
                  variant="link"
                  class="p-0 h-auto text-sm text-amber-800"
                  @click="cancelDowngrade(subscription)"
                >
                  Keep my subscription
                </Button>
              </div>
            </div>
          </div>

          <!-- Downgrade notice -->
          <div
            v-if="subscription.cancelAtPeriodEnd && subscription.downgradeToId"
            class="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800"
          >
            <div class="flex items-start">
              <Icon name="ph:warning" class="h-5 w-5 mr-2 mt-0.5" />
              <div>
                <div class="font-medium">Your plan will change soon</div>
                <p class="text-sm">
                  On {{ formatDate(subscription.currentPeriodEnd) }}, your plan
                  will change to
                  {{
                    mockSubscriptionPlans.find(
                      (p) => p.id === subscription.downgradeToId
                    )?.name
                  }}.
                </p>
                <Button
                  variant="link"
                  class="p-0 h-auto text-sm text-amber-800"
                  @click="cancelDowngrade(subscription)"
                >
                  Cancel plan change
                </Button>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div
            class="flex justify-end gap-2 mt-4"
            v-if="subscription.status === 'active'"
          >
            <Button
              variant="outline"
              size="sm"
              @click="
                () => {
                  selectedCourseId = subscription.id
                  // Find a different plan to show as an option
                  const currentPlanIndex = mockSubscriptionPlans.findIndex(
                    (p) => p.name === subscription.plan
                  )
                  const differentPlanIndex = currentPlanIndex === 0 ? 1 : 0 // Pick a different plan
                  selectPlan(mockSubscriptionPlans[differentPlanIndex])
                }
              "
            >
              Change Plan
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
              @click="openCancelSubscriptionDialog(subscription)"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <!-- Add New Subscription Button -->
      <Button variant="outline" class="w-full" as-child>
        <NuxtLink to="/courses" class="flex items-center justify-center">
          <Icon name="ph:plus" class="w-4 h-4 mr-2" />
          Add New Subscription
        </NuxtLink>
      </Button>
    </div>

    <!-- No subscription state -->
    <div v-else class="text-center py-6">
      <Icon
        name="ph:credit-card-slash"
        class="w-10 h-10 text-muted-foreground mx-auto mb-2"
      />
      <h3 class="text-base font-medium mb-1">No active subscriptions</h3>
      <p class="text-sm text-muted-foreground mb-4">
        You don't have any active course or membership subscriptions.
      </p>
      <Button variant="primary" size="sm" as-child>
        <NuxtLink to="/courses" class="flex items-center justify-center">
          Browse courses
        </NuxtLink>
      </Button>
    </div>

    <!-- Change Plan Confirmation Dialog -->
    <Dialog v-model:open="confirmDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {{ isUpgrade ? 'Upgrade' : 'Downgrade' }} to
            {{ selectedPlan?.name }}
          </DialogTitle>
          <DialogDescription>
            Review your subscription change for
            {{ currentSubscription?.name }} before confirming.
          </DialogDescription>
        </DialogHeader>

        <div class="py-4">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="border rounded-lg p-4">
              <div class="text-sm text-muted-foreground mb-1">Current Plan</div>
              <div class="font-medium">
                {{ currentSubscription?.plan || 'Premium Plan' }}
              </div>
              <div class="text-2xl font-bold mt-2">
                €{{ currentSubscription?.price.toFixed(2) || '19.99' }}
                <span class="text-sm font-normal">/mo</span>
              </div>
            </div>
            <div class="border rounded-lg p-4 border-primary bg-primary/5">
              <div class="text-sm text-muted-foreground mb-1">New Plan</div>
              <div class="font-medium">
                {{ selectedPlan?.name || 'Regular Plan' }}
              </div>
              <div class="text-2xl font-bold mt-2">
                €{{ selectedPlan?.price.monthly.toFixed(2) || '14.99' }}
                <span class="text-sm font-normal">/mo</span>
              </div>
            </div>
          </div>

          <div class="border rounded-md p-4 text-sm mb-4">
            <h3 class="font-medium mb-2">When will this change take effect?</h3>
            <p>
              <template v-if="isUpgrade">
                Your plan will upgrade immediately. You'll be charged the
                prorated difference for the remainder of your billing period.
              </template>
              <template v-else>
                Your plan will change at the end of your current billing period
                on {{ formattedRenewalDate || 'January 15, 2024' }}. You'll
                continue to have access to your current plan until then.
              </template>
            </p>
          </div>

          <div class="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="confirm-terms"
              v-model="termsAccepted"
              class="rounded"
            />
            <label for="confirm-terms" class="text-sm">
              I understand that this will
              {{
                isUpgrade
                  ? 'upgrade my plan immediately'
                  : 'downgrade my plan at the end of my billing period'
              }}.
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="confirmDialogOpen = false">
            Cancel
          </Button>
          <Button variant="primary" @click="onSubmit">
            Confirm {{ isUpgrade ? 'Upgrade' : 'Downgrade' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Cancel Subscription Dialog -->
    <Dialog v-model:open="confirmCancelDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Cancel Subscription </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your subscription to
            {{ currentSubscription?.name }}?
          </DialogDescription>
        </DialogHeader>

        <div class="py-4">
          <div class="mb-4 bg-amber-50 border border-amber-100 rounded-md p-4">
            <h4 class="font-medium mb-2">Important information</h4>
            <ul class="ml-5 space-y-1 text-sm list-disc">
              <li>
                Your subscription will remain active until the end of your
                current billing period on
                {{
                  formatDate(currentSubscription?.nextBillingDate || '') ||
                  'January 1, 2024'
                }}.
              </li>
              <li>After this date, you'll lose access to this course.</li>
              <li>You can resubscribe at any time.</li>
            </ul>
          </div>

          <div class="mb-4">
            <label class="block text-sm mb-2"
              >Tell us why you're cancelling (optional):</label
            >
            <select
              v-model="selectedReason"
              class="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="" disabled>Select a reason</option>
              <option
                v-for="reason in cancellationReasons"
                :key="reason"
                :value="reason"
              >
                {{ reason }}
              </option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="confirmCancelDialogOpen = false">
            Keep Subscription
          </Button>
          <Button variant="destructive" @click="cancelSubscription">
            Cancel Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Money-Back Guarantee Cancellation Dialog -->
    <Dialog v-model:open="confirmMoneyBackDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Cancel Subscription </DialogTitle>
          <DialogDescription>
            You're eligible for a full refund under our 24-hour money-back
            guarantee.
          </DialogDescription>
        </DialogHeader>

        <div class="py-4">
          <div
            class="flex items-center gap-3 mb-6 bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800"
          >
            <Icon name="ph:clock" class="h-5 w-5 flex-shrink-0" />
            <div>
              <div class="font-medium">
                Your subscription is less than 24 hours old
              </div>
              <p class="text-sm mt-1">
                You subscribed on {{ subscriptionStartFormatted }}. You're
                eligible for a full refund.
              </p>
            </div>
          </div>

          <div class="mb-4 bg-blue-50 border border-blue-100 rounded-md p-4">
            <h4 class="font-medium mb-2">Full refund available</h4>
            <ul class="ml-5 space-y-1 text-sm list-disc">
              <li>
                Your payment of
                <strong
                  >€{{
                    currentSubscription?.price.toFixed(2) || '0.00'
                  }}</strong
                >
                will be refunded to your original payment method.
              </li>
              <li>The refund typically processes within 3-5 business days.</li>
              <li>
                Your access to the course will end immediately after
                cancellation.
              </li>
            </ul>
          </div>

          <div class="mb-4">
            <label class="block text-sm mb-2"
              >Please tell us why you're cancelling:</label
            >
            <select
              v-model="selectedReason"
              class="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="" disabled>Select a reason</option>
              <option value="not-what-expected">Not what I expected</option>
              <option value="content-quality">Content quality issues</option>
              <option value="technical-issues">Technical issues</option>
              <option value="purchased-by-mistake">Purchased by mistake</option>
              <option value="other">Other reason</option>
            </select>
          </div>

          <div class="mt-4">
            <label class="block text-sm mb-2"
              >Additional feedback (optional):</label
            >
            <textarea
              placeholder="Tell us more about your experience"
              class="w-full px-3 py-2 border rounded-md bg-background"
              rows="3"
            ></textarea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="confirmMoneyBackDialogOpen = false">
            Keep Subscription
          </Button>
          <Button variant="destructive" @click="cancelWithRefund">
            Cancel and Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
