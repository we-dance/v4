<script setup lang="ts">
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
  isPopular?: boolean
}

const props = defineProps<Props>()
const dialog = useDialog()

const showDetails = () => {
  dialog.open({
    component: 'VenueAreaDetailsDialog',
    props: {
      area: props.area,
      venue: props.venue,
    },
  })
}

// Get next available time slot
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
const currentTime = now.getHours().toString().padStart(2, '0') + ':00'
const availabilityToday = props.area.availability[currentDay]
const [start, end] = availabilityToday?.split('-') || []

const nextAvailable = computed(() => {
  if (!availabilityToday) return null
  if (currentTime < start) return start
  if (currentTime > end) return `tomorrow ${start}`
  return currentTime
})
</script>

<template>
  <div
    class="group bg-card rounded-xl border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer relative"
    @click="showDetails"
  >
    <!-- Popular Badge -->
    <div
      v-if="isPopular"
      class="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium shadow-lg"
    >
      Most Popular
    </div>

    <!-- Image -->
    <div class="aspect-[4/3] overflow-hidden relative">
      <img
        :src="area.images[0]"
        :alt="area.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Availability Badge -->
      <div
        class="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium shadow-lg border"
      >
        <span v-if="nextAvailable">
          <Icon name="ph:clock" class="w-4 h-4 inline-block mr-1" />
          Available {{ nextAvailable }}
        </span>
        <span v-else class="text-destructive">
          <Icon name="ph:x-circle" class="w-4 h-4 inline-block mr-1" />
          Unavailable today
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-3">
      <div class="flex justify-between items-start gap-2">
        <div>
          <h3 class="font-medium">{{ area.name }}</h3>
          <p class="text-sm text-muted-foreground line-clamp-2">
            {{ area.description }}
          </p>
        </div>
        <Badge variant="secondary">{{ area.pricePerHour }}€/h</Badge>
      </div>

      <!-- Quick Info -->
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="flex items-center gap-1.5">
          <Icon name="ph:users" class="w-4 h-4 text-muted-foreground" />
          <span>{{ area.capacity }} people</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Icon name="ph:ruler" class="w-4 h-4 text-muted-foreground" />
          <span>{{ area.size.width }}x{{ area.size.length }}m</span>
        </div>
      </div>

      <!-- Amenities Preview -->
      <div class="flex flex-wrap gap-1">
        <Badge
          v-for="amenity in area.amenities.slice(0, 3)"
          :key="amenity"
          variant="secondary"
          class="text-xs"
        >
          {{ amenity }}
        </Badge>
        <Badge
          v-if="area.amenities.length > 3"
          variant="secondary"
          class="text-xs"
        >
          +{{ area.amenities.length - 3 }} more
        </Badge>
      </div>
    </div>
  </div>
</template>
