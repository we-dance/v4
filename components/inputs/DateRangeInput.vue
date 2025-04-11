<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getLocalTimeZone, CalendarDate } from '@internationalized/date'
import type { DateRange } from 'radix-vue'
import { cn } from '@/utils'

const { d } = useI18n()

const value = ref<DateRange>({
  start: new CalendarDate(2024, 7, 1),
  end: new CalendarDate(2024, 7, 1).add({ days: 6 }),
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="secondary"
        :class="
          cn(
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <template v-if="value.start">
          <template v-if="value.end">
            {{ d(value.start.toDate(getLocalTimeZone()), 'short') }} -
            {{ d(value.end.toDate(getLocalTimeZone()), 'short') }}
          </template>

          <template v-else>
            {{ d(value.start.toDate(getLocalTimeZone()), 'short') }}
          </template>
        </template>
        <template v-else>
          <span class="text-muted-foreground">When</span>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        :number-of-months="1"
        :week-starts-on="1"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>
