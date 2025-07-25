<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const props = defineProps<{
  ticket?: {
    id?: string
    name: string
    price: number
    currency: string
    items: string
  }
  onSuccess?: (values: any) => void
}>()

const dialog = useDialog()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  currency: z.string().min(1, 'Currency is required'),
  items: z.string().optional(),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: props.ticket || {
    name: '',
    price: 0,
    currency: 'EUR',
    items: '',
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
    <DialogTitle>{{ props.ticket ? 'Edit' : 'Add' }} Event Ticket</DialogTitle>
    <DialogDescription>
      {{ props.ticket ? 'Edit existing' : 'Create a new' }} ticket for your
      event
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
          <FormLabel>Price (cents)</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="number"
              min="0"
              placeholder="0"
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
    </div>

    <FormField v-slot="{ componentField }" name="items">
      <FormItem>
        <FormLabel>Items</FormLabel>
        <FormDescription>
          List the features or items included in this offer (one per line)
        </FormDescription>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Example: Access to all basic courses&#10;Weekly group sessions&#10;Email support"
            rows="5"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="button" variant="ghost" @click="dialog.close">
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </DialogFooter>
  </form>
</template>
