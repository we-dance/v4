<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { ref, computed } from 'vue'

const props = defineProps<{
  course: {
    id: string
    title: string
    pricing: {
      trial?: {
        duration: number
        features: string[]
      }
      regular: {
        monthly: { amount: number; currency: string; savings?: string }
        annual: { amount: number; currency: string; savings: string }
        features: string[]
      }
      premium: {
        monthly: { amount: number; currency: string; savings?: string }
        annual: { amount: number; currency: string; savings: string }
        features: string[]
      }
    }
  }
  onSelect: (plan: { type: string; interval?: string }) => void
}>()

const dialog = useDialog()
const isAnnual = ref(false)

const maxSavings = computed(() => {
  const regularSavings = props.course.pricing.regular.annual.savings
  const premiumSavings = props.course.pricing.premium.annual.savings

  const extractNumber = (str: string) => {
    const match = str.match(/\d+/)
    return match ? Number(match[0]) : 0
  }

  return Math.max(extractNumber(regularSavings), extractNumber(premiumSavings))
})

const handleSelect = (plan: { type: string; interval?: string }) => {
  props.onSelect(plan)
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
    <div class="flex justify-center gap-4 items-center mb-6">
      <span :class="{ 'text-primary font-medium': !isAnnual }">Monthly</span>
      <Switch
        :checked="isAnnual"
        @update:checked="isAnnual = $event"
        class="data-[state=checked]:bg-primary"
      />
      <span :class="{ 'text-primary font-medium': isAnnual }">
        Annual
        <span class="text-sm text-accent ml-1"
          >Save up to {{ maxSavings }}%</span
        >
      </span>
    </div>

    <!-- Trial Plan -->
    <Button
      v-if="course.pricing.trial"
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
          <div class="text-sm text-muted-foreground">
            Try for {{ course.pricing.trial.duration }} days
          </div>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold text-primary">Free</div>
        <div class="text-sm text-muted-foreground">No credit card</div>
      </div>
    </Button>

    <!-- Regular Plan -->
    <Button
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
          <div class="text-sm text-muted-foreground">Perfect for beginners</div>
          <ul class="mt-2 space-y-1">
            <li
              v-for="feature in course.pricing.regular.features"
              :key="feature"
              class="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold">
          {{
            isAnnual
              ? course.pricing.regular.annual.amount
              : course.pricing.regular.monthly.amount
          }}
          {{
            isAnnual
              ? course.pricing.regular.annual.currency
              : course.pricing.regular.monthly.currency
          }}
        </div>
        <div class="text-sm text-muted-foreground">
          per {{ isAnnual ? 'year' : 'month' }}
        </div>
      </div>
    </Button>

    <!-- Premium Plan -->
    <Button
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
            For dedicated learners
          </div>
          <ul class="mt-2 space-y-1">
            <li class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              Everything in Regular
            </li>
            <li
              v-for="feature in course.pricing.premium.features.filter(
                (f) => f !== 'Everything in Regular'
              )"
              :key="feature"
              class="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold">
          {{
            isAnnual
              ? course.pricing.premium.annual.amount
              : course.pricing.premium.monthly.amount
          }}
          {{
            isAnnual
              ? course.pricing.premium.annual.currency
              : course.pricing.premium.monthly.currency
          }}
        </div>
        <div class="text-sm text-muted-foreground">
          per {{ isAnnual ? 'year' : 'month' }}
        </div>
      </div>
    </Button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      All plans include 14-day money-back guarantee. Cancel anytime.
    </p>
  </div>
</template>
