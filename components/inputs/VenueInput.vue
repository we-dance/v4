<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Venue',
  },
})

const model = defineModel() as Ref<any>
const address = ref(null) as Ref<any>

const { $client } = useNuxtApp()

function getVenue(address: any) {
  if (!address?.place_id) {
    return null
  }

  return $client.profiles.findVenueOrCreate.mutate({
    placeId: address.place_id,
    googleMapsPlace: address,
  })
}

const { data } = useQuery<any>({
  queryKey: ['venue.byPlaceId', address],
  queryFn: () => getVenue(address.value),
  retry: false,
})

watch(
  data,
  (newData) => {
    model.value = newData
  },
  { deep: true }
)
</script>

<template>
  <Popover v-if="model">
    <PopoverTrigger>
      <div class="flex items-center justify-start gap-4 border p-4 rounded-md">
        <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <Avatar :profile="model" class="w-full h-full object-cover" />
        </div>
        <div class="text-left flex-1">
          <div class="font-bold">{{ model.name }}</div>
          <div class="text-sm text-gray-500">{{ model.formattedAddress }}</div>
        </div>
        <Icon name="heroicons:chevron-down" class="w-4 h-4" />
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <AddressInput v-model="address" />
    </PopoverContent>
  </Popover>

  <template v-else>
    <AddressInput v-model="address" />
  </template>
</template>
