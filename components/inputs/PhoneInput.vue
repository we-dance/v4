<script lang="ts" setup>
import BasePhoneInput from 'base-vue-phone-input'
import { useFocus } from '@vueuse/core'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const phoneInput = ref(null)
const { focused } = useFocus(phoneInput)

// Internal value to manage the phone input
const internalValue = ref(props.modelValue || '')

// Track if user has interacted with the component
const userInteracted = ref(false)

// Track if the component has been initialized
const initialized = ref(false)

const selectedCountry = ref('')

onMounted(() => {
  // Delay initialization to allow auto-country selection without triggering validation
  setTimeout(() => {
    initialized.value = true
  }, 300)
})

function extractNationalNumber(phoneWithCode: string): string {
  if (!phoneWithCode) return ''

  if (!phoneWithCode.startsWith('+')) return phoneWithCode

  return phoneWithCode.replace(/^\+\d{1,3}/, '')
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (
      !userInteracted.value ||
      !document.activeElement?.contains(phoneInput.value)
    ) {
      if (newValue) {
        internalValue.value = extractNationalNumber(newValue)
      } else {
        internalValue.value = ''
      }
    }
  },
  { immediate: true }
)

function cleanNationalNumber(number: string): string {
  return number.replace(/^0+/, '')
}

const handleInputChange = (e: Event, updateInputValue: Function) => {
  markAsInteracted()

  const target = e.target as HTMLInputElement
  let value = target.value

  updateInputValue(e)
}

const handleValueChange = (result: any) => {
  if (result && result.countryCode) {
    selectedCountry.value = result.countryCode
  }

  if (initialized.value && userInteracted.value && result) {
    let nationalNumber = result.nationalNumber || ''

    nationalNumber = cleanNationalNumber(nationalNumber)

    if (result.e164) {
      emit('update:modelValue', result.e164)
      return
    }

    if (result.countryCallingCode) {
      const phoneNumber = `+${result.countryCallingCode}${nationalNumber}`
      emit('update:modelValue', phoneNumber)
      return
    }
  }
}

// Mark component as interacted with
const markAsInteracted = () => {
  userInteracted.value = true
}
</script>

<template>
  <BasePhoneInput
    fetchCountry
    class="flex"
    country-locale="en-EN"
    :model-value="internalValue"
    @update="handleValueChange"
    :disabled="disabled"
  >
    <template #selector="{ inputValue, updateInputValue, countries }">
      <Popover v-model:open="open">
        <PopoverTrigger tabindex="-1">
          <Button
            variant="secondary"
            class="flex gap-1 rounded-e-none rounded-s-lg px-3"
            @click="markAsInteracted"
            tabindex="-1"
            :disabled="disabled"
          >
            <FlagComponent :country="inputValue" />
            <ChevronsUpDown class="-mr-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="option in countries"
                  :key="option.iso2"
                  :value="option.name"
                  class="gap-2"
                  @select="
                    () => {
                      updateInputValue(option.iso2)
                      selectedCountry = option.iso2
                      open = false
                      focused = true
                      markAsInteracted()
                    }
                  "
                >
                  <FlagComponent :country="option?.iso2" />
                  <span class="flex-1 text-sm">{{ option.name }}</span>
                  <span class="text-foreground/50 text-sm">{{
                    option.dialCode
                  }}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </template>

    <template #input="{ inputValue, updateInputValue, placeholder }">
      <Input
        ref="phoneInput"
        class="rounded-e-lg rounded-s-none"
        type="text"
        :model-value="inputValue"
        @input="(e: Event) => handleInputChange(e, updateInputValue)"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </template>
  </BasePhoneInput>
</template>
