<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { BaseEventSchema } from '~/schemas/event'
import { toast } from 'vue-sonner'

const props = defineProps<{
  initialValues?: any
  isEdit?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
  (e: 'cancel'): void
}>()

const eventTypes = [
  { label: 'Party', value: 'party' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Concert', value: 'concert' },
  { label: 'Festival', value: 'festival' },
]

const { handleSubmit, values, errors } = useForm({
  validationSchema: toTypedSchema(BaseEventSchema),
  initialValues: props.initialValues || {
    name: '',
    type: 'party',
    date: {
      start: '',
      end: '',
    },
    location: {
      name: '',
      city: '',
      country: '',
      address: '',
    },
    description: '',
    image: '',
    prices: [],
    tags: [],
    status: 'upcoming',
    artists: [],
    organizer: {
      name: '',
      image: '',
    },
    schedule: [],
  },
})

const onSubmit = handleSubmit((values) => {
  try {
    emit('submit', values)
    toast.success(
      props.isEdit ? 'Event updated successfully' : 'Event created successfully'
    )
  } catch (error) {
    toast.error('Something went wrong. Please try again.')
  }
})

const addPrice = () => {
  values.prices = [
    ...(values.prices || []),
    {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      amount: 0,
      currency: 'EUR',
    },
  ]
}

const removePrice = (index: number) => {
  values.prices = values.prices.filter((_: any, i: number) => i !== index)
}

const addScheduleItem = () => {
  values.schedule = [
    ...(values.schedule || []),
    { time: '', activity: '', description: '' },
  ]
}

const removeScheduleItem = (index: number) => {
  values.schedule = values.schedule.filter((_: any, i: number) => i !== index)
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-8">
    <Card>
      <CardHeader>
        <CardTitle>{{ isEdit ? 'Edit Event' : 'Create New Event' }}</CardTitle>
        <CardDescription>
          Fill in the details below to {{ isEdit ? 'update' : 'create' }} your
          event
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Basic Information</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label for="name">Event Name</Label>
              <Input
                id="name"
                v-model="values.name"
                placeholder="Enter event name"
                :error="errors.name"
              />
            </div>
            <div class="space-y-2">
              <Label for="type">Event Type</Label>
              <Select v-model="values.type" :error="errors.type">
                <option
                  v-for="type in eventTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </Select>
            </div>
          </div>
        </div>

        <!-- Date and Time -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Date and Time</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <Label for="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                v-model="values.date.start"
                :error="errors['date.start']"
              />
            </div>
            <div class="space-y-2">
              <Label for="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                v-model="values.date.end"
                :error="errors['date.end']"
              />
            </div>
          </div>
        </div>

        <!-- Location -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Location</h3>
          <div class="grid gap-4">
            <div class="space-y-2">
              <Label for="venueName">Venue Name</Label>
              <Input
                id="venueName"
                v-model="values.location.name"
                placeholder="Enter venue name"
                :error="errors['location.name']"
              />
            </div>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="space-y-2">
                <Label for="city">City</Label>
                <Input
                  id="city"
                  v-model="values.location.city"
                  placeholder="Enter city"
                  :error="errors['location.city']"
                />
              </div>
              <div class="space-y-2">
                <Label for="country">Country</Label>
                <Input
                  id="country"
                  v-model="values.location.country"
                  placeholder="Enter country"
                  :error="errors['location.country']"
                />
              </div>
              <div class="space-y-2">
                <Label for="address">Address</Label>
                <Input
                  id="address"
                  v-model="values.location.address"
                  placeholder="Enter address"
                  :error="errors['location.address']"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Description</h3>
          <div class="space-y-2">
            <Label for="description">Event Description</Label>
            <Textarea
              id="description"
              v-model="values.description"
              placeholder="Describe your event..."
              rows="4"
              :error="errors.description"
            />
          </div>
        </div>

        <!-- Prices -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Prices</h3>
            <Button type="button" variant="outline" @click="addPrice">
              Add Price
            </Button>
          </div>
          <div v-if="values.prices?.length" class="space-y-4">
            <div
              v-for="(price, index) in values.prices"
              :key="price.id"
              class="grid gap-4 p-4 border rounded-lg"
            >
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <Label :for="'price-name-' + index">Name</Label>
                  <Input
                    :id="'price-name-' + index"
                    v-model="price.name"
                    placeholder="e.g., Early Bird, Regular"
                    :error="errors[`prices.${index}.name`]"
                  />
                </div>
                <div class="space-y-2">
                  <Label :for="'price-description-' + index">Description</Label>
                  <Input
                    :id="'price-description-' + index"
                    v-model="price.description"
                    placeholder="Price description"
                    :error="errors[`prices.${index}.description`]"
                  />
                </div>
              </div>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="space-y-2">
                  <Label :for="'price-amount-' + index">Amount</Label>
                  <Input
                    :id="'price-amount-' + index"
                    type="number"
                    v-model="price.amount"
                    :error="errors[`prices.${index}.amount`]"
                  />
                </div>
                <div class="space-y-2">
                  <Label :for="'price-currency-' + index">Currency</Label>
                  <Input
                    :id="'price-currency-' + index"
                    v-model="price.currency"
                    placeholder="EUR"
                    :error="errors[`prices.${index}.currency`]"
                  />
                </div>
                <div class="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    @click="removePrice(index)"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">Schedule</h3>
            <Button type="button" variant="outline" @click="addScheduleItem">
              Add Schedule Item
            </Button>
          </div>
          <div v-if="values.schedule?.length" class="space-y-4">
            <div
              v-for="(item, index) in values.schedule"
              :key="index"
              class="grid gap-4 p-4 border rounded-lg"
            >
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <Label :for="'schedule-time-' + index">Time</Label>
                  <Input
                    :id="'schedule-time-' + index"
                    type="time"
                    v-model="item.time"
                    :error="errors[`schedule.${index}.time`]"
                  />
                </div>
                <div class="space-y-2">
                  <Label :for="'schedule-activity-' + index">Activity</Label>
                  <Input
                    :id="'schedule-activity-' + index"
                    v-model="item.activity"
                    placeholder="e.g., Registration, Workshop"
                    :error="errors[`schedule.${index}.activity`]"
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  @click="removeScheduleItem(index)"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Tags</h3>
          <div class="space-y-2">
            <Label for="tags">Event Tags</Label>
            <Input
              id="tags"
              v-model="values.tags"
              placeholder="Enter tags separated by commas"
              :error="errors.tags"
            />
          </div>
        </div>

        <!-- Image Upload -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Event Image</h3>
          <div class="space-y-2">
            <Label for="image">Image URL</Label>
            <Input
              id="image"
              v-model="values.image"
              placeholder="Enter image URL"
              :error="errors.image"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end space-x-4">
        <Button type="button" variant="outline" @click="$emit('cancel')">
          Cancel
        </Button>
        <Button type="submit">
          {{ isEdit ? 'Update Event' : 'Create Event' }}
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>
