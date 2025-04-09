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

const cities = ref<
  Array<{
    name: string
    displayName: string
    country: string | null
    countryCode: string | null
    count: string
    type: string
  }>
>([])

const fetchLocations = async () => {
  loadingCities.value = true

  try {
    const venueLocations = await trpc.profiles.venueLocations.query()
    cities.value = venueLocations.cities.map((city) => ({
      name: city.name,
      displayName: city.displayName || city.name,
      country: city.country || null,
      countryCode: city.countryCode || null,
      count: `${city.count}`,
      type: city.type || 'address',
    }))
  } catch (error) {
    console.error('Error fetching venue locations:', error)
    cities.value = []
  } finally {
    loadingCities.value = false
  }
}

const filteredCities = computed(() => {
  const search = locationSearch.value.toLowerCase()
  return cities.value.filter(
    (city) =>
      city.displayName.toLowerCase().includes(search) ||
      (city.country && city.country.toLowerCase().includes(search))
  )
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
        Cities
        <span v-if="loadingCities" class="text-xs text-muted-foreground">
          <Icon name="ph:spinner-gap" class="w-3 h-3 animate-spin" />
        </span>
      </div>

      <div
        v-if="!loadingCities && filteredCities.length === 0"
        class="text-sm text-muted-foreground py-2 px-3"
      >
        No cities found
      </div>

      <div class="flex flex-col w-full">
        <Button
          v-for="city in filteredCities"
          :key="city.name"
          variant="ghost"
          class="justify-start w-full"
          :class="{ 'bg-accent': props.location === city.name }"
          @click="emit('update:location', city.name)"
        >
          {{ city.displayName }}
          <span class="ml-auto text-sm text-muted-foreground">{{
            city.count
          }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>
