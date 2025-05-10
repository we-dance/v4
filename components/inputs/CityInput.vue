<script setup lang="ts">
import { ref, watch } from 'vue'
import { loadGoogleMapsApi } from '~/lib/googleMapsApi'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  placeholder: {
    type: String,
    default: 'City',
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel<{ id: string; name: string } | null>()

const open = ref(false)
const query = ref('')
const results = ref<Array<{ id: string; name: string }>>([])

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
          id: prediction.place_id,
          name: prediction.description,
        }))
      }
    )
  })
}

const onSelect = (city: { id: string; name: string }) => {
  model.value = city
  open.value = false
  query.value = ''
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
        v-bind="$attrs"
        role="combobox"
        :aria-expanded="open"
        class="gap-2"
      >
        <Icon
          v-if="!noIcon"
          name="heroicons:map-pin"
          class="h-4 w-4 shrink-0 opacity-50"
        />
        <div class="flex-1 text-left">
          <template v-if="model?.name">
            {{ model.name }}
          </template>
          <template v-else>
            <span class="text-muted-foreground">{{ props.placeholder }}</span>
          </template>
        </div>
        <Icon
          name="heroicons:chevron-down"
          class="h-4 w-4 shrink-0 opacity-50"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[300px] p-0">
      <SearchableDropdown
        :items="results"
        v-model="model"
        v-model:searchQuery="query"
        placeholder="Search city..."
        itemKey="id"
        itemLabel="name"
        @select="onSelect"
      />
    </PopoverContent>
  </Popover>
</template>
