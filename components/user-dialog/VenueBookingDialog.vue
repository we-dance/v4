<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { today, getLocalTimeZone } from '@internationalized/date'

interface Props {
  venue: {
    id: number
    name: string
    areas: {
      id: number
      name: string
      description: string
      pricePerHour: number
      capacity: number
      size: {
        width: number
        length: number
        height: number
        unit: string
      }
      amenities: string[]
      floorType: string
      images: string[]
      availability: Record<string, string>
    }[]
  }
  selectedAreaId?: number
  selectedDateTime?: string
  onBook: (date: string, areaId: number) => void
}

const props = defineProps<Props>()
const dialog = useDialog()

const selectedDate = ref(
  props.selectedDateTime
    ? new Date(props.selectedDateTime)
    : today(getLocalTimeZone())
)

const selectedTimeSlot = ref<string | null>(
  props.selectedDateTime ? props.selectedDateTime.split(' ')[1] : null
)

const selectedArea = ref<number | null>(props.selectedAreaId || null)

const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
]

const formatDate = (date: Date) => {
  return format(date, 'PPP')
}

const handleBook = () => {
  if (!selectedDate.value || !selectedTimeSlot.value || !selectedArea.value)
    return

  const date =
    selectedDate.value instanceof Date
      ? selectedDate.value
      : selectedDate.value.toDate(getLocalTimeZone())

  const bookingDate = format(date, 'yyyy-MM-dd')
  const bookingDateTime = `${bookingDate} ${selectedTimeSlot.value}`

  props.onBook(bookingDateTime, selectedArea.value)
  dialog.close()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Book {{ venue.name }}</DialogTitle>
    <DialogDescription>
      Select an area, date and time slot to book the venue.
    </DialogDescription>
  </DialogHeader>

  <div class="grid gap-4 py-4">
    <!-- Area Selection -->
    <div class="space-y-2">
      <Label>Area</Label>
      <div class="grid grid-cols-1 gap-2">
        <Button
          v-for="area in venue.areas"
          :key="area.id"
          variant="secondary"
          :class="{
            'border-primary': selectedArea === area.id,
            'bg-primary/5': selectedArea === area.id,
          }"
          @click="selectedArea = area.id"
        >
          <div class="flex items-center justify-between w-full gap-4">
            <div class="text-left">
              <div class="font-medium">{{ area.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ area.capacity }} people
              </div>
            </div>
            <Badge variant="secondary">{{ area.pricePerHour }}€/h</Badge>
          </div>
        </Button>
      </div>
    </div>

    <div class="space-y-2">
      <Label>Date</Label>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="secondary" class="w-full justify-start text-left">
            <Icon name="ph:calendar" class="mr-2 h-4 w-4" />
            {{
              selectedDate
                ? formatDate(
                    selectedDate instanceof Date
                      ? selectedDate
                      : selectedDate.toDate(getLocalTimeZone())
                  )
                : 'Pick a date'
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            v-model="selectedDate"
            :disabled-dates="{ before: new Date() }"
            mode="single"
            class="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>

    <div class="space-y-2">
      <Label>Time Slot</Label>
      <div class="grid grid-cols-3 gap-2">
        <Button
          v-for="slot in timeSlots"
          :key="slot"
          variant="secondary"
          :class="[
            selectedTimeSlot === slot
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : '',
          ]"
          @click="selectedTimeSlot = slot"
        >
          {{ slot }}
        </Button>
      </div>
    </div>
  </div>

  <DialogFooter>
    <Button variant="secondary" @click="dialog.close()">Cancel</Button>
    <Button
      :disabled="!selectedDate || !selectedTimeSlot || !selectedArea"
      @click="handleBook"
    >
      Book Now
    </Button>
  </DialogFooter>
</template>
