<script setup>
import { ref, watch, toRefs } from 'vue'
import { parseDate, today, getLocalTimeZone } from '@internationalized/date'

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['select'])

const { date } = toRefs(props)

// persist the date value in the calendar
const calendarValue = ref(parseDate(date.value))

watch(date, (newDate) => {
  calendarValue.value = parseDate(newDate)
})

const handleSelect = (val) => {
  emit('select', val.toString())
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" size="icon" class="h-6 w-6">
        <Icon name="ph:caret-down" class="w-4 h-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <Calendar
        mode="single"
        :v-model="parseDate(date)"
        @update:model-value="select"
      />
    </PopoverContent>
  </Popover>
</template>
