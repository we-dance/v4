<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

// with given pricing table id and publishable key, render the stripe pricing table

interface Props {
  isOpen: boolean
  pricingTableId: string
  publishableKey: string
  title?: string
  noClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: 'Complete Payment',
  noClose: false,
})

const emit = defineEmits(['close'])

// Watch for changes in isOpen prop to manage body scroll
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden')
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }
)

// remove overflow-y-hidden when dialog is closed
onBeforeUnmount(() => {
  document.body.classList.remove('overflow-y-hidden')
})

const handleClose = () => {
  if (!props.noClose) {
    emit('close')
  }
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed w-full h-full top-0 left-0 flex items-end md:items-center justify-center"
      style="z-index: 100"
    >
      <!-- background overlay -->
      <div
        class="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-30"
        @click="handleClose"
      ></div>

      <!-- dialog body -->
      <transition appear name="slide-up">
        <div
          class="bg-background rounded-lg w-full md:w-[550px] z-40 max-h-[90vh] overflow-hidden flex flex-col"
        >
          <!-- title bar -->
          <div class="flex justify-between items-center px-6 py-4 border-b">
            <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
            <button
              v-if="!noClose"
              class="text-muted-foreground hover:text-foreground transition-colors"
              @click="emit('close')"
            >
              <Icon name="ph:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Alert message - moved to top for better visibility -->
          <div class="px-6 py-3 bg-warning/15 border-b border-warning/25">
            <p class="text-warning-foreground text-sm font-medium flex items-center">
              <Icon name="ph:warning-circle" class="w-5 h-5 mr-2 flex-shrink-0" />
              <span>Demo mode: Please don't click anything in the pricing table. You will be redirected to the success page in a few seconds.</span>
            </p>
          </div>

          <!-- Stripe Pricing Table container -->
          <div class="flex-1 w-full p-4 overflow-auto">
            <stripe-pricing-table
              :pricing-table-id="pricingTableId"
              :publishable-key="publishableKey"
            />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
