<script setup>
import { getYmd } from '~/utils'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
} from 'date-fns'

const props = defineProps({
  events: {
    type: Array,
    default: () => [],
  },
  currentDate: {
    type: Date,
    default: () => new Date(),
  },
})

const emit = defineEmits(['update:current-date'])

// Current month being displayed
const currentDate = computed({
  get: () => props.currentDate,
  set: (value) => emit('update:current-date', value),
})

// Group events by date
const eventsByDate = computed(() => {
  const result = {}

  for (const event of props.events) {
    const date = getYmd(event.startDate)
    result[date] = result[date] || []
    result[date].push(event)
  }

  return result
})

// Get calendar grid for current month
const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value))
  const end = endOfWeek(endOfMonth(currentDate.value))

  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate.value),
    isToday: isToday(date),
    events: eventsByDate.value[getYmd(date)] || [],
  }))
})

// Navigation
const goToPreviousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const goToNextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const goToToday = () => {
  currentDate.value = new Date()
}

// Week days
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<template>
  <div class="w-full">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold">
          {{ format(currentDate, 'MMMM yyyy') }}
        </h2>
        <Button variant="outline" size="sm" @click="goToToday"> Today </Button>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="icon" @click="goToPreviousMonth">
          <Icon name="ph:caret-left" class="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" @click="goToNextMonth">
          <Icon name="ph:caret-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="border rounded-lg overflow-hidden bg-background">
      <!-- Week days header -->
      <div class="grid grid-cols-7 border-b bg-muted/50">
        <div
          v-for="day in weekDays"
          :key="day"
          class="p-3 text-sm font-medium text-center text-muted-foreground"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar weeks -->
      <div class="grid grid-cols-7">
        <div
          v-for="day in calendarDays"
          :key="day.date.toISOString()"
          :class="[
            'min-h-[120px] border-r border-b p-2 relative overflow-hidden',
            !day.isCurrentMonth && 'bg-muted/20 text-muted-foreground',
            day.isToday && 'bg-primary/5',
          ]"
        >
          <!-- Day number -->
          <div class="flex items-center justify-between mb-1">
            <span
              :class="[
                'text-sm font-medium',
                day.isToday &&
                  'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs',
                !day.isCurrentMonth && 'text-muted-foreground',
              ]"
            >
              {{ day.date.getDate() }}
            </span>
            <span
              v-if="day.events.length > 0"
              class="text-xs text-muted-foreground"
            >
              {{ day.events.length }}
            </span>
          </div>

          <!-- Events for this day -->
          <div class="space-y-1">
            <div
              v-for="(event, index) in day.events.slice(0, 3)"
              :key="event.id"
              :class="[
                'text-xs p-1 rounded bg-primary/10 border-l-2 border-primary truncate cursor-pointer hover:bg-primary/20 transition-colors',
                index === 2 && day.events.length > 3 && 'opacity-50',
              ]"
              :title="event.name"
              @click="$router.push(`/events/${event.id}`)"
            >
              <div class="font-medium truncate">{{ event.name }}</div>
              <div class="text-muted-foreground truncate">
                {{
                  event.startDate
                    ? format(new Date(event.startDate), 'HH:mm')
                    : ''
                }}
              </div>
            </div>

            <!-- Show more indicator -->
            <div
              v-if="day.events.length > 3"
              class="text-xs text-muted-foreground font-medium"
            >
              +{{ day.events.length - 3 }} more
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
