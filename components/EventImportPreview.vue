<template>
  <div class="flex border-b px-6 py-4 gap-6">
    <div class="w-12 flex-shrink-0 text-center">
      <div v-if="showDate" class="font-bold text-sm leading-none">
        <div class="text-xl font-bold leading-none text-primary">
          {{ formatDate(item.startDate, 'd') }}
        </div>
        <div>{{ formatDate(item.startDate, 'MMM') }}</div>
        <div class="text-xs">{{ formatDate(item.startDate, 'yyyy') }}</div>
      </div>
      <div v-else class="font-bold text-sm leading-none">
        {{ formatDate(item.startDate, 'HH:mm') }}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="font-bold text-sm leading-none">
        {{ item.name }}
      </div>
      <div>
        <div class="text-xs pt-1 leading-none">
          <template v-if="item.role">{{ item.role }} · </template>
          {{ item.org ? item.org.username : '' }}
          <template v-if="item.online === 'Yes'"> · Online </template>
          <template v-if="item.venue"> · {{ item.venue.name }}</template>
          <template v-if="item.location">{{ item.location }}</template>
        </div>
      </div>
      <div v-if="item.eventType" class="text-xs text-gray-700 pt-1">
        <span class="text-primary">{{
          getEventTypeLabel(item.eventType)
        }}</span>
        ·
        {{
          getStyles(item.styles, 0, false, 3)
            .map((s) => s.name)
            .join(' · ')
        }}
      </div>

      <div class="relative pl-3 pr-4">
        <Expand>
          <div class="pt-2 text-xs whitespace-pre-wrap break-words leading-5">
            {{ item.description }}
          </div>
        </Expand>
      </div>

      <div class="mt-2 flex gap-4 items-center">
        <Button
          size="sm"
          :class="item.approved ? 'bg-green-500' : 'bg-red-500'"
        >
          {{ item.approved ? 'Approved' : 'Rejected' }}
        </Button>
        <Button v-if="item.eventId" as-child size="sm">
          <NuxtLink :to="`/events/${item.eventId}`" target="_blank">
            View Event
          </NuxtLink>
        </Button>
        <span
          v-if="item.isNew"
          class="p-1 rounded text-xs bg-green-500 text-white"
          >New</span
        >
      </div>
    </div>
    <div>
      <img
        v-if="item.cover"
        class="w-20 rounded"
        :src="item.cover"
        :alt="`${item.name} cover`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

type StyleObj = {
  id?: string | number
  name?: string | null
  hashtag?: string | null
}

interface Item {
  id?: string
  name?: string | null
  description?: string | null
  startDate?: string | Date | null
  endDate?: string | Date | null
  eventType?: string | null
  styles?: Record<string, any> | StyleObj[] | null
  eventId?: string | null
  approved?: boolean | null
  isNew?: boolean | null
  role?: string | null
  location?: string | null
  venue?: { name?: string | null } | null
  org?: { username?: string | null } | null
  online?: 'Yes' | 'No' | null
  cover?: string | null
}

interface Props {
  item: Item
  isEmbed?: boolean
  showDate?: boolean
}

withDefaults(defineProps<Props>(), {
  isEmbed: false,
  showDate: false,
})

function formatDate(date: string | Date | null | undefined, fmt: string) {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, fmt)
}

const eventTypeLabels: Record<string, string> = {
  Party: 'Party',
  Workshop: 'Workshop',
  Course: 'Course',
  Weekender: 'Weekender',
  Festival: 'Festival',
  Congress: 'Congress',
  Concert: 'Concert',
  Show: 'Show',
  Other: 'Other',
}
function getEventTypeLabel(t?: string | null) {
  if (!t) return ''
  return eventTypeLabels[t] || t
}

function getStyles(
  styles: Props['item']['styles'],
  start = 0,
  _highlighted = false,
  limit = 0
): Array<{ name: string }> {
  if (!styles) return []
  let arr: Array<{ name: string }> = []

  if (Array.isArray(styles)) {
    arr = styles.map((s) => ({ name: (s?.name ?? s?.hashtag ?? '') as string }))
  } else {
    arr = Object.keys(styles).map((key) => ({ name: key }))
  }

  const sliced = limit ? arr.slice(start, start + limit) : arr.slice(start)
  return sliced.filter((s) => s.name)
}
</script>
