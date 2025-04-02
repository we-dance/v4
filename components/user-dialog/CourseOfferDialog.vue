<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const props = defineProps<{
  offer?: {
    id?: string
    name: string
    price: number
    currency: string
    duration: string
  }
  onSuccess?: (values: any) => void
}>()

const dialog = useDialog()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  currency: z.string().min(1, 'Currency is required'),
  duration: z.string().min(1, 'Duration is required'),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.offer || {
    name: '',
    price: 0,
    currency: 'EUR',
    duration: '1 month',
  },
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onSubmit = form.handleSubmit(
  async (values) => {
    try {
      props.onSuccess?.(values)
      emit('close')
    } catch (error) {
      toast.error((error as Error).message)
    }
  },
  (e) => {
    toast.error('Please fix the errors in the form.')
  }
)
</script>

<template>
  <DialogHeader>
    <DialogTitle>{{ props.offer ? 'Edit' : 'Add' }} Course Offer</DialogTitle>
    <DialogDescription>
      {{ props.offer ? 'Edit existing' : 'Create a new' }} offer for your course
    </DialogDescription>
  </DialogHeader>

  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="e.g. Basic Plan" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-3 gap-4">
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="currency">
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="duration">
        <FormItem>
          <FormLabel>Duration</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </form>
</template>
