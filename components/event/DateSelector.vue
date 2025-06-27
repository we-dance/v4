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

const calendarValue = ref(parseDate(props.date))

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
        :modelValue="calendarValue"
        @update:model-value="handleSelect"
      />
    </PopoverContent>
  </Popover>
</template>
