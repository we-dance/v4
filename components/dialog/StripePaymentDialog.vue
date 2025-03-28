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
      class="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <!-- background overlay -->
      <div
        class="fixed inset-0 bg-black/80 z-30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        @click="handleClose"
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
            <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
            <button
              v-if="!noClose"
              class="rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary p-0.5 transition-colors"
              @click="emit('close')"
            >
              <Icon name="ph:x" class="w-4 h-4" />
              <span class="sr-only">Close</span>
            </button>
          </div>

          <!-- Stripe Pricing Table container -->
          <div class="flex-1 w-full p-6 space-y-4 overflow-auto">
            <!-- <stripe-pricing-table
              :pricing-table-id="pricingTableId"
              :publishable-key="publishableKey"
            /> -->
            <p class="text-base text-muted-foreground mb-6">
              Here will implemnt Stripe Pricing Table while backend is ready
            </p>
            <Button
              variant="primary"
              size="lg"
              class="w-full mt-2"
              @click="handleClose"
              >Continue</Button
            >
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
