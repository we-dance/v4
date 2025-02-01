<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { today, getLocalTimeZone } from '@internationalized/date'

interface Area {
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
}

interface Props {
  area: Area
  venue: {
    id: number
    name: string
    areas: Area[]
  }
}

const props = defineProps<Props>()
const dialog = useDialog()

const selectedImageIndex = ref(0)

// Get today's availability
const now = new Date()
const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]
const currentDay = days[now.getDay()]
const availabilityToday = props.area.availability[currentDay]

const handleBook = () => {
  dialog.open({
    component: 'VenueBookingDialog',
    props: {
      venue: props.venue,
      selectedAreaId: props.area.id,
      onBook: (date: string, areaId: number) => {
        console.log('Booking area for date:', date, 'area:', areaId)
      },
    },
  })
}
</script>

<template>
  <DialogHeader class="space-y-1.5">
    <DialogTitle>{{ area.name }}</DialogTitle>
    <div class="flex items-center gap-4 text-sm text-muted-foreground">
      <div class="flex items-center gap-1.5">
        <Icon name="ph:users" class="w-4 h-4" />
        {{ area.capacity }} people
      </div>
      <div class="flex items-center gap-1.5">
        <Icon name="ph:ruler" class="w-4 h-4" />
        {{ area.size.width }}x{{ area.size.length }}m
      </div>
      <Badge variant="secondary">{{ area.pricePerHour }}€/h</Badge>
    </div>
  </DialogHeader>

  <div class="py-4 space-y-4">
    <!-- Main Image -->
    <div class="aspect-[16/9] rounded-lg overflow-hidden">
      <img
        :src="area.images[selectedImageIndex]"
        :alt="area.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Image Thumbnails -->
    <div class="flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="(image, index) in area.images"
        :key="index"
        class="relative w-16 aspect-[16/9] rounded-md overflow-hidden"
        :class="selectedImageIndex === index ? 'ring-2 ring-primary' : ''"
        @click="selectedImageIndex = index"
      >
        <img :src="image" :alt="area.name" class="w-full h-full object-cover" />
      </button>
    </div>

    <!-- Description -->
    <p class="text-sm text-muted-foreground">{{ area.description }}</p>

    <!-- Quick Info -->
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div class="font-medium">Floor Type</div>
        <div class="text-muted-foreground">{{ area.floorType }}</div>
      </div>
      <div>
        <div class="font-medium">Today's Hours</div>
        <div class="text-muted-foreground">
          {{ availabilityToday || 'Closed' }}
        </div>
      </div>
    </div>

    <!-- Amenities -->
    <div>
      <div class="font-medium text-sm mb-2">Amenities</div>
      <div class="flex flex-wrap gap-1.5">
        <Badge
          v-for="amenity in area.amenities"
          :key="amenity"
          variant="outline"
          class="text-xs"
        >
          {{ amenity }}
        </Badge>
      </div>
    </div>
  </div>

  <DialogFooter>
    <Button variant="outline" @click="dialog.close()">Close</Button>
    <Button @click="handleBook">
      <Icon name="ph:calendar-check" class="w-4 h-4 mr-2" />
      Check Availability
    </Button>
  </DialogFooter>
</template>
