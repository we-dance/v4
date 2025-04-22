<script setup lang="ts">
import { toast } from 'vue-sonner'
import { formatCurrencyCents, formatSubscriptionDuration } from '~/utils/format'

const { course } = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()
const { session } = useAppAuth()

const offers = computed(() =>
  course.offers.sort((a: any, b: any) => a.price - b.price)
)

const updateOffer = async (offerId: string, values: any) => {
  const promise = $client.courses.updateOffer.mutate({
    courseId: course.id,
    offerId,
    ...values,
  })

  toast.promise(promise, {
    loading: 'Updating offer...',
    success: 'Offer updated successfully',
    error: 'Error updating offer',
  })

  promise.then(() => {
    emit('load')
  })
}

const deleteOffer = async (offerId: string) => {
  const promise = $client.courses.deleteOffer.mutate({
    offerId,
  })

  toast.promise(promise, {
    loading: 'Deleting offer...',
    success: 'Offer deleted successfully',
    error: 'Error deleting offer',
  })

  promise.then(() => {
    emit('load')
  })
}

const router = useRouter()

const openOfferDialog = (offer: any = null) => {
  if (!session?.value?.user?.stripeAccountId) {
    toast.error('Stripe not connected', {
      description: 'Please connect your Stripe account to create offers',
      action: {
        label: 'Connect Stripe',
        onClick: () => {
          router.push('/admin/integrations')
        },
      },
    })
    return
  }

  dialog.open({
    component: 'CourseOfferDialog',
    props: {
      offer,
      onSuccess: (values: any) => {
        const offerId = offer ? offer.id : null
        updateOffer(offerId, values)
      },
    },
  })
}
</script>

<template>
  <Button variant="secondary" @click="openOfferDialog()" class="mb-4"
    ><Icon name="lucide:plus" class="h-4 w-4" />Add Price</Button
  >
  <div v-if="offers?.length" class="space-y-4">
    <div
      v-for="offer in offers"
      :key="offer.id"
      class="flex items-center justify-between"
    >
      <div>
        <h4 class="font-medium">
          {{ offer.name }}
          <Icon
            v-if="offer.stripeProductId && offer.stripePriceId"
            name="lucide:check"
            class="h-4 w-4 text-green-500"
          />
          <Icon
            v-else
            name="lucide:loader"
            class="h-4 w-4 text-muted-foreground"
          />
        </h4>
        <p class="text-sm text-muted-foreground">
          {{ formatCurrencyCents(offer.price, offer.currency) }} /
          {{ formatSubscriptionDuration(offer.duration) }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          class="w-7 h-7"
          variant="ghost"
          size="icon"
          @click="openOfferDialog(offer)"
        >
          <Icon name="lucide:pencil" class="h-4 w-4" />
          <span class="sr-only">Edit Resource</span>
        </Button>
        <Button
          @click="deleteOffer(offer.id)"
          variant="ghost"
          size="icon"
          class="h-7 w-7 text-destructive hover:text-destructive"
          ><Icon name="lucide:trash" class="h-4 w-4" />
          <span class="sr-only">Delete Resource</span></Button
        >
      </div>
    </div>
  </div>
  <div v-else class="text-center py-4 text-muted-foreground">
    No offers added yet
  </div>
</template>
