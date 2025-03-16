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
    noClose: false
})

const emit = defineEmits(['close'])

// Watch for changes in isOpen prop to manage body scroll
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        document.body.classList.add('overflow-y-hidden')
    } else {
        document.body.classList.remove('overflow-y-hidden')
    }
})

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
        <div v-if="isOpen" class="fixed w-full h-full top-0 left-0 flex items-end md:items-center justify-center" style="z-index: 100">
            <!-- background overlay -->
            <div class="fixed w-full h-full top-0 left-0 bg-black opacity-50 z-30" @click="handleClose"></div>

            <!-- dialog body -->
            <transition appear name="slide-up">
                <div class="bg-white rounded-lg w-full md:w-[500px] z-40 max-h-[90vh] overflow-hidden">
                    <!-- title bar -->
                    <div class="flex justify-between items-center px-6 py-4 border-b">
                        <h3 class="text-lg font-semibold">{{ title }}</h3>
                        <button v-if="!noClose" class="text-gray-400 hover:text-gray-600" @click="emit('close')">
                            <Icon name="ph:x" class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Stripe Pricing Table container -->
                    <div class="h-[600px] w-full p-4">
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