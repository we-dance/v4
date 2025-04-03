<script setup>
import { ref } from 'vue'

const course = defineModel()
const dialog = useDialog()

const emit = defineEmits(['save'])

const deletedOfferIds = ref([])

const deleteOffer = (id) => {
  if (id) {
    deletedOfferIds.value.push(id)
  }
  const newOffers = [...(course.value.offers || [])].filter(
    (offer) => offer.id !== id
  )
  course.value.offers = newOffers
  emit('save', { ...course.value, deletedOfferIds: deletedOfferIds.value })
}

const handleAddOffer = (values) => {
  const newOffers = [...(course.value.offers || []), values]
  course.value.offers = newOffers
  emit('save', { ...course.value, deletedOfferIds: deletedOfferIds.value })
}

const handleEditOffer = (index, values) => {
  const newOffers = [...(course.value.offers || [])]
  newOffers[index] = { ...newOffers[index], ...values }
  course.value.offers = newOffers
  emit('save', { ...course.value, deletedOfferIds: deletedOfferIds.value })
}

const openAddOfferDialog = () => {
  dialog.open({
    component: 'CourseOfferDialog',
    props: {
      onSuccess: handleAddOffer,
    },
  })
}

const openEditOfferDialog = (offer, index) => {
  dialog.open({
    component: 'CourseOfferDialog',
    props: {
      offer,
      onSuccess: (values) => handleEditOffer(index, values),
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
              {{ offer.price }} {{ offer.currency }} - {{ offer.duration }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button size="sm" @click="deleteOffer(offer.id)">Delete</Button>
            <Button size="sm" @click="openEditOfferDialog(offer, index)">
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-muted-foreground">
        No offers added yet
      </div>
      <div class="mt-4">
        <Button variant="outline" @click="openAddOfferDialog">Add Offer</Button>
      </div>
    </CardContent>
  </Card>
</template>
