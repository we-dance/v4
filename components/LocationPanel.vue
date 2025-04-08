<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:location', value: string | null): void
}>()

const props = defineProps({
  location: {
    type: String as () => string | null,
    default: null,
  },
})

const locationSearch = ref('')
const loadingCities = ref(false)
const loadingRegions = ref(false)

const cities = ref<Array<{ name: string; count: string; type: string }>>([])
const regions = ref<Array<{ name: string; count: string; type: string }>>([])

const fetchLocations = async () => {
  loadingCities.value = true
  loadingRegions.value = true

  try {
    const venueCities = await trpc.profiles.venueLocations.query()
    cities.value = venueCities.cities.map((city) => ({
      name: city.name,
      count: `${city.count}`,
      type: city.type || 'address',
    }))

    regions.value = venueCities.regions.map((region) => ({
      name: region.name,
      count: `${region.count}`,
      type: region.type || 'region',
    }))
  } catch (error) {
    console.error('Error fetching venue locations:', error)

    cities.value = [
      { name: 'New York', count: '10+', type: 'city' },
      { name: 'London', count: '8+', type: 'city' },
      { name: 'Berlin', count: '5+', type: 'city' },
      { name: 'Madrid', count: '3+', type: 'city' },
    ]

    regions.value = [
      { name: 'Europe', count: '20+', type: 'region' },
      { name: 'North America', count: '15+', type: 'region' },
      { name: 'Asia', count: '5+', type: 'region' },
    ]
  } finally {
    loadingCities.value = false
    loadingRegions.value = false
  }
}

const filteredRegions = computed(() => {
  const search = locationSearch.value.toLowerCase()
  return regions.value.filter((region) =>
    region.name.toLowerCase().includes(search)
  )
})

const filteredCities = computed(() => {
  const search = locationSearch.value.toLowerCase()
  return cities.value.filter((city) => city.name.toLowerCase().includes(search))
})

const citiesOnly = computed(() => {
  return filteredCities.value.filter((location) => location.type === 'city')
})

onMounted(async () => {
  await fetchLocations()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <Input v-model="locationSearch" placeholder="Search location...">
      <template #prefix>
        <Icon
          name="ph:magnifying-glass"
          class="w-4 h-4 text-muted-foreground"
        />
      </template>
    </Input>

    <div class="flex flex-col gap-1">
      <div
        class="font-medium text-sm text-muted-foreground flex items-center justify-between"
      >
        Popular Regions
        <span v-if="loadingRegions" class="text-xs text-muted-foreground">
          <Icon name="ph:spinner-gap" class="w-3 h-3 animate-spin" />
        </span>
      </div>

      <div
        v-if="!loadingRegions && filteredRegions.length === 0"
        class="text-sm text-muted-foreground py-2 px-3"
      >
        No regions found
      </div>

      <Button
        v-for="region in filteredRegions"
        :key="region.name"
        variant="ghost"
        class="justify-start"
        :class="{ 'bg-accent': props.location === region.name }"
        @click="emit('update:location', region.name)"
      >
        {{ region.name }}
        <span class="ml-auto text-sm text-muted-foreground">{{
          region.count
        }}</span>
      </Button>

      <div
        class="font-medium text-sm text-muted-foreground mt-2 flex items-center justify-between"
      >
        Cities
        <span v-if="loadingCities" class="text-xs text-muted-foreground">
          <Icon name="ph:spinner-gap" class="w-3 h-3 animate-spin" />
        </span>
      </div>

      <div
        v-if="!loadingCities && citiesOnly.length === 0"
        class="text-sm text-muted-foreground py-2 px-3"
      >
        No cities found
      </div>

      <div class="flex flex-col w-full">
        <Button
          v-for="city in citiesOnly"
          :key="city.name"
          variant="ghost"
          class="justify-start w-full"
          :class="{ 'bg-accent': props.location === city.name }"
          @click="emit('update:location', city.name)"
        >
          {{ city.name }}
          <span class="ml-auto text-sm text-muted-foreground">{{
            city.count
          }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>
