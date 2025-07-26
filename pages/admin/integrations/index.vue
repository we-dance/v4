<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

import { toast } from 'vue-sonner'

const { session } = useAppAuth()
const { $client } = useNuxtApp()

const stripeConnected = computed(() => !!session.value?.user?.stripeAccountId)

const connectStripe = async () => {
  const promise = $client.users.connectStripe.mutate()

  toast.promise(promise, {
    loading: 'Connecting Stripe...',
    success: 'Redirecting to Stripe...',
    error: 'Failed to connect Stripe',
  })

  promise.then(({ url }) => {
    window.location.href = url
  })
}

const disconnectStripe = async () => {
  const promise = $client.users.disconnectStripe.mutate()

  toast.promise(promise, {
    loading: 'Disconnecting Stripe...',
    success: 'Stripe disconnected',
  })

  promise.then(() => {
    window.location.reload()
  })
}
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Manage Integrations</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>

  <div class="w-full space-y-6 p-4 mx-auto max-w-xl">
    <div>
      <div class="space-y-4">
        <div
          class="flex flex-row items-center justify-between rounded-lg border p-4"
        >
          <div class="space-y-2">
            <div class="text-base">Stripe</div>
            <div class="text-sm text-muted-foreground">
              Connect your Stripe account to manage your payments.
            </div>
            <div v-if="stripeConnected">
              <Button @click="disconnectStripe()"> Disconnect </Button>
            </div>
            <div v-else>
              <Button @click="connectStripe()">Connect</Button>
            </div>
          </div>
          <div class="flex items-center">
            <div v-if="stripeConnected">
              <Icon
                name="heroicons:check-circle"
                class="h-8 w-8 text-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
