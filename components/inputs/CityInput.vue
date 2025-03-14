<script setup lang="ts">
import { ref, watch } from 'vue'
import { loadGoogleMapsApi } from '~/lib/googleMapsApi'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Select city',
  },
})

const model = defineModel<{ placeId: string; label: string } | null>()

const open = ref(false)
const query = ref('')
const results = ref<Array<{ placeId: string; label: string }>>([])

const getPlacePredictions = () => {
  loadGoogleMapsApi().then((google) => {
    const service = new google.maps.places.AutocompleteService()
    service.getPlacePredictions(
      {
        input: query.value,
        types: ['(cities)'],
      },
      (predictions: any) => {
        results.value = predictions.map((prediction: any) => ({
          placeId: prediction.place_id,
          label: prediction.description,
        }))
      }
    )
  })
}

const onSelect = (city: { placeId: string; label: string }) => {
  model.value = city
  open.value = false
}

watch(query, () => {
  if (query.value.length >= 2) {
    getPlacePredictions()
  } else {
    results.value = []
  }
})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between font-normal overflow-ellipsis"
      >
        <Icon
          name="heroicons:map-pin"
          class="mr-2 h-4 w-4 shrink-0 opacity-50"
        />
        <div class="flex-1 text-left">
          <template v-if="model?.label">
            {{ model.label }}
          </template>
          <template v-else>
            <span class="text-muted-foreground">{{ props.placeholder }}</span>
          </template>
        </div>
        <Icon
          name="heroicons:chevron-down"
          class="ml-2 h-4 w-4 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[300px] p-0">
      <SearchableDropdown
        :items="results"
        v-model="model"
        v-model:searchQuery="query"
        placeholder="Search city..."
        itemKey="placeId"
        itemLabel="label"
        @select="onSelect"
      />
    </PopoverContent>
  </Popover>
</template>
