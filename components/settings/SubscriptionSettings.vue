<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatDate } from '~/utils/format'
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

// Define a type for our subscription
interface Subscription {
  id: string
  name: string
  plan: string
  price: number
  currency: string
  interval: string
  status: 'active' | 'canceled' | 'past_due'
  nextBillingDate?: string
  canceledAt?: string
  createdAt: string
  updatedAt: string
}

// Mock data for subscription
const subscription = ref<Subscription | null>({
  id: 'sub_123456',
  name: 'Salsa Ladies Styling',
  plan: 'Premium',
  price: 60,
  currency: 'EUR',
  interval: 'month',
  status: 'active',
  nextBillingDate: new Date(
    Date.now() + 14 * 24 * 60 * 60 * 1000
  ).toISOString(), // 14 days from now
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  updatedAt: new Date().toISOString(),
})

const isLoading = ref(false)
const cancelError = ref(null)

const hasActiveSubscription = computed(
  () => subscription.value !== null && subscription.value.status === 'active'
)

const showCancelDialog = ref(false)
const subscriptionToCancel = ref<Subscription | null>(null)

const openCancelDialog = (sub: Subscription) => {
  subscriptionToCancel.value = sub
  showCancelDialog.value = true
}

// Mock cancellation functionality
const isCanceling = ref(false)

// Simulate cancellation process
const confirmCancelSubscription = () => {
  if (!subscriptionToCancel.value?.id) return

  isCanceling.value = true

  // Simulate API call with timeout
  setTimeout(() => {
    if (subscription.value) {
      subscription.value.status = 'canceled'
      subscription.value.canceledAt = new Date().toISOString()
    }

    isCanceling.value = false
    showCancelDialog.value = false

    // Show success message
    toast.success('Your subscription has been canceled')
  }, 1500)
}
</script>

<template>
  <!-- Add a loading state -->
  <div v-if="isLoading" class="flex justify-center py-6">
    <div
      class="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <!-- Rest of your template -->
  <div v-else class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="ph:credit-card" class="w-5 h-5" />
      Subscription
    </h2>

    <!-- Active subscription -->
    <div v-if="subscription" class="divide-y">
      <div
        v-for="sub in [subscription]"
        :key="sub?.id"
        class="py-4 first:pt-0 last:pb-0"
      >
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div class="text-sm text-muted-foreground mb-1">
              {{
                sub?.status === 'active'
                  ? 'Active subscription'
                  : sub?.status === 'canceled'
                    ? 'Canceled subscription'
                    : 'Subscription'
              }}
            </div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-medium">{{ sub?.name }}</h3>
              <Badge
                v-if="sub?.status === 'active'"
                variant="default"
                class="bg-green-500"
                >Active</Badge
              >
              <Badge
                v-else-if="sub?.status === 'canceled'"
                variant="destructive"
                >Canceled</Badge
              >
              <Badge
                v-else-if="sub?.status === 'past_due'"
                variant="default"
                class="bg-yellow-500"
                >Past Due</Badge
              >
            </div>
            <div class="text-sm space-y-1 mt-2">
              <p class="text-foreground">
                {{ sub?.plan }} plan • {{ sub?.price }} {{ sub?.currency }}/{{
                  sub?.interval
                }}
              </p>
              <p class="text-muted-foreground" v-if="sub?.nextBillingDate">
                Next billing date:
                {{ formatDate(sub.nextBillingDate) }}
              </p>
              <p class="text-muted-foreground" v-if="sub?.canceledAt">
                Canceled on:
                {{ formatDate(sub.canceledAt) }}
              </p>
            </div>
          </div>
          <div class="flex items-center" v-if="sub?.status === 'active'">
            <Button
              variant="outline"
              size="sm"
              class="text-destructive border-destructive hover:bg-destructive/10"
              @click="openCancelDialog(sub)"
              :disabled="isCanceling"
            >
              {{ isCanceling ? 'Canceling...' : 'Cancel subscription' }}
            </Button>
          </div>
        </div>
      </div>
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
      <Button as-child variant="outline" size="sm">
        <NuxtLink to="/courses"> Browse courses </NuxtLink>
      </Button>
    </div>

    <p v-if="cancelError" class="text-red-500 mt-2">{{ cancelError }}</p>

    <!-- Single dialog for subscription cancellation - Completely custom implementation -->
    <Teleport to="body">
      <div
        v-if="showCancelDialog"
        class="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      >
        <!-- background overlay -->
        <div
          class="fixed inset-0 bg-black/80 z-30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          @click="showCancelDialog = false"
        ></div>

        <!-- dialog body -->
        <transition appear name="slide-up">
          <div
            class="bg-background border border-border rounded-lg w-full md:w-[550px] z-40 max-h-[90vh] overflow-hidden flex flex-col shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            <!-- title bar -->
            <div
              class="flex justify-between items-center px-6 py-4 border-b border-border"
            >
              <h3 class="text-lg font-semibold text-foreground">
                Cancel Subscription
              </h3>
              <button
                class="rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary p-0.5 transition-colors"
                @click="showCancelDialog = false"
              >
                <Icon name="ph:x" class="w-4 h-4" />
                <span class="sr-only">Close</span>
              </button>
            </div>

            <!-- Dialog body -->
            <div class="flex-1 w-full p-6 space-y-4 overflow-auto">
              <p class="text-base text-foreground font-medium mb-2">
                Are you sure you want to cancel your subscription to "{{
                  subscriptionToCancel?.name
                }}"?
              </p>

              <div class="text-sm text-muted-foreground space-y-2 mb-6">
                <p>
                  Your subscription will remain active until the end of the
                  current billing period.
                </p>
                <p
                  v-if="subscriptionToCancel?.nextBillingDate"
                  class="font-medium"
                >
                  Subscription will end on:
                  {{ formatDate(subscriptionToCancel.nextBillingDate) }}
                </p>
              </div>

              <!-- Action buttons with consistent styling -->
              <div class="flex gap-4 mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  class="flex-1"
                  @click="showCancelDialog = false"
                >
                  Keep Subscription
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  class="flex-1"
                  @click="confirmCancelSubscription"
                  :disabled="isCanceling"
                >
                  {{ isCanceling ? 'Canceling...' : 'Cancel Subscription' }}
                </Button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </Teleport>
  </div>
</template>
