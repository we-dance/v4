<script setup>
const offers = defineModel()
const dialog = useDialog()

const handleAddOffer = (values) => {
  const newOffers = [...(offers.value || []), values]
  offers.value = newOffers
}

const handleEditOffer = (index, values) => {
  const newOffers = [...(offers.value || [])]
  newOffers[index] = { ...newOffers[index], ...values }
  offers.value = newOffers
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
      <div v-if="offers?.length" class="space-y-4">
        <div
          v-for="(offer, index) in offers"
          :key="offer.id"
          class="flex items-center justify-between"
        >
          <div>
            <h4 class="font-medium">{{ offer.name }}</h4>
            <p class="text-sm text-muted-foreground">
              {{ offer.price }} {{ offer.currency }} - {{ offer.duration }}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="openEditOfferDialog(offer, index)"
          >
            Edit Offer
          </Button>
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
