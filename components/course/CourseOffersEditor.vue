<script setup>
const offers = defineModel()
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
          v-for="offer in offers"
          :key="offer.id"
          class="flex items-center justify-between"
        >
          <div>
            <h4 class="font-medium">{{ offer.name }}</h4>
            <p class="text-sm text-muted-foreground">
              {{ offer.price }} {{ offer.currency }} - {{ offer.duration }}
            </p>
          </div>
          <Button variant="ghost" size="sm">Edit Offer</Button>
        </div>
      </div>
      <div v-else class="text-center py-4 text-muted-foreground">
        No offers added yet
      </div>
      <div class="mt-4">
        <Button variant="outline">Add Offer</Button>
      </div>
    </CardContent>
  </Card>
</template>
