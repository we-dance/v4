<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { ref, computed } from 'vue'
import type { Course } from '~/schemas/course'

const props = defineProps<{
  course: {
    identifier: string
    name: string
    offers: Array<{
      '@type': 'PriceSpecification'
      price: number
      priceCurrency: string
      duration: string
      name: string
    }>
    subscriptionControl: {
      showTrial: boolean
      showMonthlyAnnualToggle: boolean
      plans: string[]
    }
  }
  onSelect: (plan: { type: string; interval?: string }) => void
}>()

const dialog = useDialog()
const isAnnual = ref(false)

const prices = computed(() => {
  const regularMonthly = props.course.offers.find(
    (offer) => offer.duration === 'P1M' && offer.name === 'regular'
  )
  const regularAnnual = props.course.offers.find(
    (offer) => offer.duration === 'P1Y' && offer.name === 'regular'
  )
  const premiumMonthly = props.course.offers.find(
    (offer) => offer.duration === 'P1M' && offer.name === 'premium'
  )
  const premiumAnnual = props.course.offers.find(
    (offer) => offer.duration === 'P1Y' && offer.name === 'premium'
  )

  return {
    regular: {
      monthly: regularMonthly?.price || 0,
      annual: regularAnnual?.price || 0,
      currency: regularMonthly?.priceCurrency || 'EUR',
    },
    premium: {
      monthly: premiumMonthly?.price || 0,
      annual: premiumAnnual?.price || 0,
      currency: premiumMonthly?.priceCurrency || 'EUR',
    },
  }
})

const savings = computed(() => {
  const regularSavings =
    prices.value.regular.monthly * 12 - prices.value.regular.annual
  const premiumSavings =
    prices.value.premium.monthly * 12 - prices.value.premium.annual

  const regularPercent = Math.round(
    (regularSavings / (prices.value.regular.monthly * 12)) * 100
  )
  const premiumPercent = Math.round(
    (premiumSavings / (prices.value.premium.monthly * 12)) * 100
  )

  return Math.max(regularPercent, premiumPercent)
})

const handleSelect = async (plan: { type: string; interval?: string }) => {
  await props.onSelect(plan)
  dialog.close()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Plan</DialogTitle>
    <DialogDescription>
      Select a subscription plan that best suits your learning goals
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <!-- Interval Toggle -->
    <div
      v-if="course.subscriptionControl?.showMonthlyAnnualToggle"
      class="flex justify-center gap-4 items-center mb-6"
    >
      <span :class="{ 'text-primary font-medium': !isAnnual }">Monthly</span>
      <Switch
        :checked="isAnnual"
        @update:checked="isAnnual = $event"
        class="data-[state=checked]:bg-primary"
      />
      <span :class="{ 'text-primary font-medium': isAnnual }">
        Annual
        <span v-if="savings" class="text-sm text-accent ml-1"
          >Save up to {{ savings }}%</span
        >
      </span>
    </div>

    <!-- Trial Plan -->
    <Button
      v-if="course.subscriptionControl.showTrial"
      variant="outline"
      class="w-full justify-between h-auto py-4 hover:border-accent"
      @click="handleSelect({ type: 'trial' })"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon name="ph:sparkle" class="w-4 h-4 text-primary" />
        </div>
        <div class="text-left">
          <div class="font-medium">Free Trial</div>
          <div class="text-sm text-muted-foreground">Try for 7 days</div>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold text-primary">Free</div>
        <div class="text-sm text-muted-foreground">No credit card</div>
      </div>
    </Button>

    <!-- Regular Plan -->
    <Button
      v-if="course.subscriptionControl.plans.includes('regular')"
      variant="outline"
      class="w-full justify-between h-auto py-4 hover:border-accent"
      @click="
        handleSelect({
          type: 'regular',
          interval: isAnnual ? 'annual' : 'monthly',
        })
      "
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon name="ph:star" class="w-4 h-4 text-primary" />
        </div>
        <div class="text-left flex-1">
          <div class="font-medium">Regular Plan</div>
          <!-- <div class="text-sm text-muted-foreground">For dedicated Learners</div> -->
          <ul class="mt-2 space-y-1">
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Lifetime access to videos
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Practice materials
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold">
          {{ isAnnual ? prices.regular.annual : prices.regular.monthly }}
          {{ prices.regular.currency }}
        </div>
        <div class="text-sm text-muted-foreground">
          one {{ isAnnual ? 'year' : 'time' }}
        </div>
      </div>
    </Button>

    <!-- Premium Plan -->
    <Button
      v-if="course.subscriptionControl?.plans.includes('premium')"
      variant="outline"
      class="w-full justify-between h-auto py-4 border-2 border-accent hover:bg-accent/10"
      @click="
        handleSelect({
          type: 'premium',
          interval: isAnnual ? 'annual' : 'monthly',
        })
      "
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon name="ph:crown" class="w-4 h-4 text-primary" />
        </div>
        <div class="text-left flex-1">
          <div class="font-medium">Premium Plan</div>
          <div class="text-sm text-muted-foreground">
            only available 15 April-15 May
          </div>
          <ul class="mt-2 space-y-1">
            <li
              class="flex items-center flex-wrap gap-2 text-sm text-muted-foreground"
            >
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Lifetime access to Videos
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Practice materials
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              4x90min Live Zoom Sessions for Q&A
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Feedback & Corrections
            </li>
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Access to Community Channel
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold">
          {{ isAnnual ? prices.premium.annual : prices.premium.monthly }}
          {{ prices.premium.currency }}
        </div>
        <div class="text-sm text-muted-foreground">
          one {{ isAnnual ? 'year' : 'time' }}
        </div>
      </div>
    </Button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      All plans include 24-hours money-back guarantee. Cancel anytime.
    </p>
  </div>
</template>
