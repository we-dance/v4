<script setup lang="ts">
import { getDate } from '~/utils'
import {
  CalendarDateTime,
  getLocalTimeZone,
  toZoned,
} from '@internationalized/date'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  minDate: {
    type: String,
    default: undefined,
  },
})

const model = defineModel<string>()

function getCalendarDateTime(dateString: string | undefined) {
  let date = new Date()
  if (dateString) {
    date = new Date(dateString)
  }
  if (isNaN(date.getTime())) {
    date = new Date()
  }

  if (props.minDate) {
    const minDate = new Date(props.minDate)
    if (date < minDate) {
      date = minDate
    }
  }

  return new CalendarDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  )
}

function isDateUnavailable(date: CalendarDateTime) {
  if (props.minDate) {
    const minDate = new Date(props.minDate)
    return date.toDate(getLocalTimeZone()) < minDate
  }

  return false
}

function getDateString(date: CalendarDateTime) {
  const zone = getLocalTimeZone()
  const zoned = toZoned(date, zone)
  return zoned.toAbsoluteString()
}

const internalValue = ref<CalendarDateTime>(getCalendarDateTime(model.value))

watch(model, (val) => {
  internalValue.value = getCalendarDateTime(val)
})

watch(
  internalValue,
  (val) => {
    model.value = getDateString(val)
  },
  { deep: true }
)

const hh = computed({
  get() {
    return internalValue.value.hour.toString().padStart(2, '0')
  },
  set(val: string) {
    internalValue.value = internalValue.value.set({ hour: parseInt(val) })
  },
})

const mm = computed({
  get() {
    return internalValue.value.minute.toString().padStart(2, '0')
  },
  set(val: string) {
    internalValue.value = internalValue.value.set({ minute: parseInt(val) })
  },
})
</script>
<template>
  <div class="flex items-center gap-2">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="secondary">
          <template v-if="internalValue">{{ getDate(internalValue) }}</template>
          <template v-else>Select Date</template>
          <Icon name="ph:caret-down" class="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          v-model="internalValue"
          :is-date-unavailable="isDateUnavailable"
        />
      </PopoverContent>
    </Popover>
    <Input
      v-model="hh"
      type="tel"
      placeholder="HH"
      class="font-mono w-12"
      @focus="(e: any) => (e.target.value = '')"
    />
    <Input
      v-model="mm"
      type="tel"
      placeholder="MM"
      class="font-mono w-12"
      @focus="(e: any) => (e.target.value = '')"
    />
  </div>
</template>
