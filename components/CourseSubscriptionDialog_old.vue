<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const props = defineProps<{
  course: any
  onSubscribe: (offeringId: string) => Promise<void>
}>()
const emit = defineEmits(['close'])
const isLoading = ref(false)
const loadingOfferingId = ref('')

// Return the dialog to hide it after action
function close() {
  emit('close')
}
</script>

<template>
  <Dialog>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Subscribe to {{ course.name }}</DialogTitle>
        <DialogDescription>
          Choose a subscription plan to unlock all course content
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-6 py-4">
        <div
          v-if="course.offers && course.offers.length > 0"
          class="grid gap-4"
        >
          <div
            v-for="offer in course.offers"
            :key="offer.id"
            class="border rounded-lg p-4 hover:border-primary"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-medium text-lg">{{ offer.name }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ offer.duration }}
                </p>
              </div>
              <div class="text-xl font-bold">
                {{ offer.price }} {{ offer.currency }}
              </div>
            </div>
            <Button
              class="w-full mt-4"
              :disabled="isLoading && loadingOfferingId === course.id"
              @click="onSubscribe(offer.id)"
            >
              <template v-if="isLoading && loadingOfferingId === course.id">
                <Icon name="ph:spinner" class="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </template>
              <template v-else> Subscribe </template>
            </Button>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-muted-foreground">
            No subscription plans available for this course.
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
