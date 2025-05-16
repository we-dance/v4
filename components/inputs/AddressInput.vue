<script setup>
import { loadGoogleMapsApi } from '~/lib/googleMapsApi'

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search name of the place',
  },
})
const emit = defineEmits(['update:modelValue'])

const autocomplete = ref(null)
const text = ref('')
const autocompleteInstance = ref(null)

const reset = () => {
  text.value = ''
  emit('update:modelValue', '')
}

onMounted(async () => {
  const google = await loadGoogleMapsApi()
  const options = {
    fields: [
      'place_id',
      'formatted_address',
      'address_components',
      'geometry',
      'icon',
      'name',
      'url',
      'website',
      'international_phone_number',
    ],
  }
  autocompleteInstance.value = new google.maps.places.Autocomplete(
    autocomplete.value,
    options
  )
  autocompleteInstance.value.addListener('place_changed', () => {
    const place = autocompleteInstance.value.getPlace()
    emit('update:modelValue', JSON.parse(JSON.stringify(place)))
  })
})
</script>

<template>
  <div>
    <input
      v-show="autocompleteInstance"
      ref="autocomplete"
      v-model="text"
      type="text"
      :placeholder="props.placeholder"
      autocomplete="off"
      class="w-full px-3 py-2 bg-white text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300"
    />
    <div v-if="!autocompleteInstance" class="text-gray-500">Loading...</div>
  </div>
</template>
