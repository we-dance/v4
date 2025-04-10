<script setup>
import { formatCurrencyCents, formatSubscriptionDuration } from '~/utils/format'
import { toast } from 'vue-sonner'

const course = defineModel()
const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()

const updateOffer = async (offerId, values) => {
  try {
    await $client.courses.updateOffer.mutate({
      courseId: course.value.id,
      offerId,
      ...values,
    })
    toast.success('Offer updated successfully')
    emit('load')
  } catch (error) {
    toast.error(error.message)
  }
}

const deleteOffer = async (offerId) => {
  try {
    await $client.courses.deleteOffer.mutate({
      offerId,
    })
    toast.success('Offer deleted successfully')
    emit('load')
  } catch (error) {
    toast.error(error.message)
  }
}

const openOfferDialog = (offer = null) => {
  dialog.open({
    component: 'CourseOfferDialog',
    props: {
      offer,
      onSuccess: (values) => {
        const offerId = offer ? offer.id : null
        updateOffer(offerId, values)
      },
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Course Offers</CardTitle>
      <CardDescription
        >Manage pricing and offers for your course.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div v-if="course.offers?.length" class="space-y-4">
        <div
          v-for="(offer, index) in course.offers"
          :key="offer.id"
          class="flex items-center justify-between"
        >
          <div>
            <h4 class="font-medium">{{ offer.name }}</h4>
            <p class="text-sm text-muted-foreground">
              {{ formatCurrencyCents(offer.price, offer.currency) }} /
              {{ formatSubscriptionDuration(offer.duration) }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button size="sm" @click="deleteOffer(offer.id)">Delete</Button>
            <Button size="sm" @click="openOfferDialog(offer)"> Edit </Button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-muted-foreground">
        No offers added yet
      </div>
      <div class="mt-4">
        <Button variant="outline" @click="openOfferDialog()">Add Offer</Button>
      </div>
    </CardContent>
  </Card>
</template>
