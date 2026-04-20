<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO, isSameDay, isSameMonth, isSameYear } from 'date-fns'

const props = defineProps<{
  start: string | Date
  end?: string | Date | null
  formatString?: string
}>()

const parse = (date: string | Date) =>
  typeof date === 'string' ? parseISO(date) : date

const startDate = computed(() => parse(props.start))
const endDate = computed(() =>
  props.end != null && props.end !== ''
    ? parse(props.end as string | Date)
    : null
)

const isOpenEnd = computed(() => endDate.value === null)

const formattedRange = computed(() => {
  const s = startDate.value
  const e = endDate.value

  if (e == null) {
    return format(s, props.formatString || 'MMM d, yyyy')
  }
  if (isSameDay(s, e)) {
    return format(s, props.formatString || 'MMM d, yyyy')
  } else if (isSameMonth(s, e)) {
    return `${format(s, 'd')}–${format(e, 'd MMM yyyy')}`
  } else if (isSameYear(s, e)) {
    return `${format(s, 'd MMM')} – ${format(e, 'd MMM yyyy')}`
  } else {
    return `${format(s, 'd MMM yyyy')} – ${format(e, 'd MMM yyyy')}`
  }
})
</script>

<template>
  <span>
    {{ formattedRange }}
    <span v-if="isOpenEnd" class="text-muted-foreground">(open end)</span>
  </span>
</template>
