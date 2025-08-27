<script setup lang="ts">
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const { $client } = useNuxtApp()

const syncingCalendars = reactive(new Set<string>())
const deletingCalendars = reactive(new Set<string>())

const urlSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/^webcals?:\/\//i, 'https://'))
  .pipe(z.string().url())

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      newCalendarUrl: urlSchema,
    })
  ),
})

//fetch existing calendars
const { data: calendars, refresh } = await $client.calendars.getAll.useQuery()

//create calendar mutation
const createCalendarMutation = useMutation({
  mutationFn: async (url: string) => {
    return await $client.calendars.create.mutate({ url })
  },
})

//sync calendar mutation
const syncCalendarMutation = useMutation({
  mutationFn: async (id: string) => {
    return await $client.calendars.sync.mutate({ id })
  },
  onMutate: (id: string) => {
    syncingCalendars.add(id)
  },
  onSettled: (_data, _error, id: string) => {
    syncingCalendars.delete(id)
  },
})

const deleteCalendarMutation = useMutation({
  mutationFn: async (id: string) => {
    return await $client.calendars.delete.mutate({ id })
  },
  onMutate: (id: string) => {
    deletingCalendars.add(id)
  },
  onSettled: (_data, _error, id: string) => {
    deletingCalendars.delete(id)
  },
})

function handleSync(id: string) {
  const promise = syncCalendarMutation.mutateAsync(id)
  toast.promise(promise, {
    loading: 'Syncing Calendar.',
    success: 'Calendar sync started!',
    error: (error: any) => error?.message || 'Failed to sync calendar.',
  })
  promise.finally(() => {
    refresh()
  })
}
function handleDelete(id: string) {
  const promise = deleteCalendarMutation.mutateAsync(id)
  toast.promise(promise, {
    loading: 'Removing Calendar.',
    success: 'Calendar removed successfully!',
    error: (error: any) => error?.message || 'Failed to remove calendar.',
  })
  promise.finally(() => {
    refresh()
  })
}

function formatDate(date: string | Date | null) {
  if (!date) return 'Never'
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? 'Never' : d.toLocaleString()
}

//form submission handler
const handleSubmit = form.handleSubmit((values) => {
  const promise = createCalendarMutation.mutateAsync(values.newCalendarUrl)
  toast.promise(promise, {
    loading: 'Adding Calendar.',
    success: 'Calendar added successfully!',
    error: (error: any) => error?.message || 'Failed to add calendar.',
  })
  promise.then((createdCalendar) => {
    form.resetForm()
    refresh()
    //sync calendar to show events right away,
    const syncPromise = syncCalendarMutation.mutateAsync(createdCalendar.id)
    toast.promise(syncPromise, {
      loading: 'Syncing new calendar.',
      success: 'Calendar sync started!',
      error: (error: any) => error?.message || 'Failed to sync calendar.',
    })
    syncPromise.finally(() => {
      refresh()
    })
  })
})
</script>

<template>
  <div v-if="calendars?.length" class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:calendar-days" class="w-5 h-5" />
      Your Calendars
    </h2>
    <div class="space-y-4">
      <div
        v-for="calendar in calendars"
        :key="calendar.id"
        class="border rounded-lg p-4"
      >
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <!-- Calendar Name -->
            <h3 class="font-medium mb-2">
              <Button
                as-child
                variant="tertiary"
                class="h-auto p-0 font-medium"
              >
                <NuxtLink :to="`/admin/calendar/${calendar.id}`">
                  {{ calendar.name || 'Unnamed Calendar' }}
                </NuxtLink>
              </Button>
            </h3>
            <!-- Status -->
            <div class="flex items-center gap-2 mb-3">
              <Badge
                :variant="
                  calendar.state === 'processed'
                    ? 'default'
                    : calendar.state === 'failed'
                      ? 'destructive'
                      : calendar.state === 'processing'
                        ? 'secondary'
                        : 'outline'
                "
              >
                {{ calendar.state }}
              </Badge>
            </div>

            <!-- Calendar Details -->
            <div class="text-sm text-muted-foreground space-y-1">
              <div class="flex items-center gap-2">
                <Icon name="heroicons:clock" class="w-3 h-3" />
                Last synced: {{ formatDate(calendar.lastSyncedAt) }}
              </div>

              <!-- Stats -->
              <div class="flex items-center gap-4 text-xs mt-2">
                <span>New: {{ calendar.newCount || 0 }}</span>
                <span
                  >Upcoming: {{ calendar.approvedCount || 0 }} of
                  {{ calendar.upcomingCount || 0 }}</span
                >
                <span>Past: {{ calendar.pastCount || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              @click="handleSync(calendar.id)"
              :disabled="
                calendar.state === 'pending' ||
                calendar.state === 'processing' ||
                syncingCalendars.has(calendar.id)
              "
            >
              <Icon
                name="heroicons:arrow-path"
                :class="[
                  'w-4 h-4',
                  {
                    'animate-spin':
                      calendar.state === 'pending' ||
                      calendar.state === 'processing' ||
                      syncingCalendars.has(calendar.id),
                  },
                ]"
              />
              Sync
            </Button>

            <Button
              variant="outline"
              size="sm"
              @click="handleDelete(calendar.id)"
              :disabled="
                deletingCalendars.has(calendar.id) ||
                calendar.state === 'processing' ||
                syncingCalendars.has(calendar.id)
              "
            >
              <Icon name="heroicons:trash" class="w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:link" class="w-5 h-5" />
      New Calendar Url
    </h2>

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-4">
        <FormField v-slot="{ componentField }" name="newCalendarUrl">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                type="url"
                placeholder="https://calendar.google.com/..."
                required
                :disabled="createCalendarMutation.isPending.value"
              />
            </FormControl>
          </FormItem>
        </FormField>
        <p class="text-sm text-muted-foreground">
          You can add your Facebook Calendar, Google Calendar, Teamup calendar,
          or any other calendar that supports ical format.
        </p>
        <div class="flex justify-start pt-4">
          <Button
            type="submit"
            :disabled="
              !form.values.newCalendarUrl ||
              createCalendarMutation.isPending.value
            "
            class="flex items-center gap-2"
          >
            <Icon
              v-if="createCalendarMutation.isPending.value"
              name="heroicons:arrow-path"
              class="w-4 h-4 animate-spin"
            />
            <Icon v-else name="heroicons:check" class="w-4 h-4" />
            Add Calendar
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
