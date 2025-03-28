<script lang="ts" setup>
import BasePhoneInput from 'base-vue-phone-input'
import { useFocus } from '@vueuse/core'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, onMounted, defineProps, defineEmits } from 'vue'

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
const internalValue = ref(props.modelValue)

// Track if user has interacted with the component
const userInteracted = ref(false)

// Track if the component has been initialized
const initialized = ref(false)

onMounted(() => {
  // Delay initialization to allow auto-country selection without triggering validation
  setTimeout(() => {
    initialized.value = true
  }, 300)
})

// Only emit changes after user interaction and initialization
const handleValueChange = (value: string) => {
  internalValue.value = value

  if (initialized.value && userInteracted.value) {
    emit('update:modelValue', value)
  }
}

// Mark component as interacted with
const markAsInteracted = () => {
  userInteracted.value = true

  // If we already have a value, emit it now that user has interacted
  if (internalValue.value && initialized.value) {
    emit('update:modelValue', internalValue.value)
  }
}
</script>

<template>
  <BasePhoneInput
    fetchCountry
    class="flex"
    country-locale="en-EN"
    :model-value="internalValue"
    @update:model-value="handleValueChange"
    :disabled="disabled"
  >
    <template #selector="{ inputValue, updateInputValue, countries }">
      <Popover v-model:open="open">
        <PopoverTrigger>
          <Button
            variant="outline"
            class="flex gap-1 rounded-e-none rounded-s-lg px-3"
            @click="markAsInteracted"
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
      />
    </template>
  </BasePhoneInput>
</template>
