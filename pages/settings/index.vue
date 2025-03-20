<script setup lang="ts">
definePageMeta({
  layout: 'settings',
  middleware: ['auth'],
})

const showCancellationDialog = ref(false)
const selectedSubscription = ref<any>(null)

const handleOpenCancelDialog = (subscription: any) => {
  selectedSubscription.value = subscription
  showCancellationDialog.value = true
}

</script>

<template>
  <AccountInformation />
  <SubscriptionSettings @open-cancel-dialog="handleOpenCancelDialog" />
  <PasswordSettings />
  <DangerZone />

    <!-- Cancellation Dialog -->
  <CancelSubscriptionDialog
    :is-open="showCancellationDialog"
    :subscription="selectedSubscription"
    @close="showCancellationDialog = false"
  />
  <!-- @confirm="/* Cancellation logic will go here */" -->
</template>
