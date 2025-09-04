<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
const props = defineProps({
  event: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['load'])

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
  { label: 'Cancelled', value: 'cancelled' },
]

const statusSchema = z
  .enum(['draft', 'published', 'archived', 'cancelled'])
  .default('draft')

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(''),
  cover: z.string().optional().default(''),
  status: statusSchema,
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.string().optional().default('Party'),
  venue: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      formattedAddress: z.string().optional(),
      photo: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  organizer: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    username: z.string().optional(),
    photo: z.string().optional().nullable(),
  }),
  styles: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
})

const validationSchema = toTypedSchema(schema)

const { $client } = useNuxtApp()

const save = async (values: any) => {
  const promise = $client.events.update.mutate({
    id: props.event.id,
    ...values,
  })
  toast.promise(promise, {
    loading: 'Updating event...',
    success: 'Event updated successfully',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    emit('load')
  })
}

const router = useRouter()

const alertDialog = useAlertDialog()

const deleteCourse = () => {
  const promise = $client.events.delete.mutate({
    id: props.event.id,
  })
  toast.promise(promise, {
    loading: 'Deleting event...',
    success: 'Event deleted successfully',
    error: (error: any) => (error as Error).message,
  })
  promise.then(() => {
    router.push('/admin/events')
  })
}

const askToDelete = () => {
  alertDialog.open({
    title: 'Delete Event',
    description: 'Are you sure you want to delete this event?',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm: () => {
      alertDialog.close()
      deleteCourse()
    },
    onCancel: () => {
      alertDialog.close()
    },
  })
}
</script>

<template>
  <Form
    :initial-values="props.event"
    :validation-schema="validationSchema"
    @submit="save"
  >
    <div class="space-y-4">
      <FormField v-slot="{ componentField }" name="status">
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select event status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Congress">Congress</SelectItem>
                <SelectItem value="Concert">Concert</SelectItem>
                <SelectItem value="Party">Party</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Course">Course</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="startDate">
        <FormItem class="flex flex-col justify-start">
          <FormLabel>Start</FormLabel>
          <FormControl>
            <DateInput v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="endDate">
        <FormItem class="flex flex-col justify-start">
          <FormLabel>End</FormLabel>
          <FormControl>
            <DateInput v-bind="componentField" :min-date="event.startDate" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, setValue }" name="styles">
        <FormItem>
          <FormLabel> Dance Styles </FormLabel>
          <FormControl>
            <Suspense>
              <DanceStyleInput
                :model-value="value || event.styles"
                @update:model-value="(v) => setValue(v)"
              />
              <template #fallback>
                <div>Loading Styles...</div>
              </template>
            </Suspense>
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, setValue }" name="venue">
        <FormItem class="flex flex-col justify-start">
          <FormLabel>Venue</FormLabel>
          <FormControl>
            <VenueInput
              :model-value="value || event.venue"
              @update:model-value="(v) => setValue(v)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, setValue }" name="organizer">
        <FormItem class="flex flex-col justify-start">
          <FormLabel>Organizer</FormLabel>
          <FormControl>
            <ProfileInput
              :model-value="value || event.organizer"
              @update:model-value="(v) => setValue(v)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="cover">
        <FormItem>
          <FormLabel>Cover Image URL</FormLabel>
          <FormControl>
            <ImageInput v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-end">
        <Button type="submit" class="rounded-r-none">Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger class="rounded-l-none" as-child>
            <Button class="rounded-l-none">
              <Icon name="heroicons:chevron-down" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="askToDelete()">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </Form>
</template>
