<script lang="ts" setup>
import BasePhoneInput from 'base-vue-phone-input'
import { useFocus } from '@vueuse/core'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, onMounted, watch, computed, defineProps, defineEmits } from 'vue'

/**
 * Map of country calling codes to ISO country codes for cases
 * where the library fails to recognize them automatically
 */
const countryCodeMap: Record<string, string> = {
  '39': 'IT', // Italy
}

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
const currentResult = ref<any>(null)
const internalValue = ref(props.modelValue)
const userInteracted = ref(false)
const initialized = ref(false)

const getCountryCode = () => {
  if (currentResult.value?.countryCode) {
    return currentResult.value.countryCode
  }

  if (
    currentResult.value?.countryCallingCode &&
    countryCodeMap[currentResult.value.countryCallingCode]
  ) {
    return countryCodeMap[currentResult.value.countryCallingCode]
  }

  // Italy (+39) aren't detected correctly
  if (props.modelValue?.startsWith('+39')) {
    return 'IT'
  }

  return undefined
}

const hasCountryCode = computed(() => !!getCountryCode())

const displayCountryCode = computed(
  () => getCountryCode() || currentResult.value?.countryCode
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== internalValue.value) {
      internalValue.value = newValue
    }
  }
)

onMounted(() => {
  // Delay initialization to allow auto-country selection without triggering validation
  setTimeout(() => {
    initialized.value = true
  }, 300)
})

const handleValueChange = (result: any) => {
  currentResult.value = result

  if (result?.nationalNumber !== undefined) {
    internalValue.value = result.nationalNumber
  }

  if (initialized.value && userInteracted.value && result) {
    if (result.e164) {
      emit('update:modelValue', result.e164)
    } else if (result.countryCallingCode && internalValue.value) {
      const phoneNumber = internalValue.value.startsWith('+')
        ? internalValue.value
        : `+${result.countryCallingCode}${internalValue.value}`
      emit('update:modelValue', phoneNumber)
    } else if (internalValue.value && !result.countryCallingCode) {
      markAsInteracted()
    }
  }
}

const markAsInteracted = () => {
  userInteracted.value = true
}

const showValidationWarning = computed(
  () => internalValue.value && !hasCountryCode.value && userInteracted.value
)
</script>

<template>
  <div class="relative">
    <BasePhoneInput
      fetchCountry
      class="flex"
      country-locale="en-EN"
      :model-value="internalValue"
      @update="handleValueChange"
      :disabled="disabled"
      :default-phone-number="props.modelValue"
      :default-country-code="displayCountryCode"
      auto-format
    >
      <template #selector="{ inputValue, updateInputValue, countries }">
        <Popover v-model:open="open">
          <PopoverTrigger tabindex="-1">
            <Button
              variant="secondary"
              :class="[
                'flex gap-1 rounded-e-none rounded-s-lg px-3 transition-colors',
                {
                  'border-destructive bg-destructive/10 animate-pulse':
                    showValidationWarning,
                  'focus:ring-destructive': showValidationWarning,
                },
              ]"
              @click="markAsInteracted"
              tabindex="-1"
              :disabled="disabled"
            >
              <FlagComponent :country="displayCountryCode || inputValue" />
              <ChevronsUpDown class="-mr-2 h-4 w-4 opacity-50" />
              <span v-if="showValidationWarning" class="ml-1">
                <Icon
                  name="lucide:alert-circle"
                  class="h-4 w-4 text-destructive"
                />
              </span>
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
          @input="
            (e: Event) => {
              markAsInteracted()
              updateInputValue(e)
            }
          "
          :placeholder="placeholder"
          :disabled="disabled"
          :class="{ 'border-destructive': showValidationWarning }"
        />
      </template>
    </BasePhoneInput>

    <!-- Country code missing warning -->
    <div
      v-if="showValidationWarning"
      class="mt-1 text-xs text-destructive font-medium flex items-center gap-1 animate-appear"
    >
      <Icon name="lucide:alert-triangle" class="h-3.5 w-3.5" />
      <span>Please select a country code for your phone number</span>
    </div>
  </div>
</template>
