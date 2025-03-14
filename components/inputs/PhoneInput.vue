<script lang="ts" setup>
import BasePhoneInput from 'base-vue-phone-input'
import { useFocus } from '@vueuse/core'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  value?: string
}>()

const emit = defineEmits<{
  change: [value: string]
  blur: [event: FocusEvent]
}>()

const open = ref(false)
const phoneInput = ref(null)
const { focused } = useFocus(phoneInput)
const res = ref()
// Use explicit typing for the refs
const isInternalUpdate = ref<boolean>(false)
const hasInitialized = ref<boolean>(false)

// Handle value changes from the phone input
watch(
  () => res.value,
  (newValue) => {
    if (newValue?.e164 && !isInternalUpdate.value && hasInitialized.value) {
      isInternalUpdate.value = true
      emit('change', newValue.e164)
      isInternalUpdate.value = false
    }
  }
)

// Handle external value changes (from v-model or vee-validate)
watch(
  () => props.value,
  (newValue) => {
    if (
      newValue &&
      newValue.trim() !== '' &&
      !res.value?.e164 &&
      !isInternalUpdate.value
    ) {
      isInternalUpdate.value = true
      res.value = { e164: newValue }
      isInternalUpdate.value = false
    }
  },
  { immediate: false } // Don't run on mount
)

const handleBlur = (event: FocusEvent) => {
  hasInitialized.value = true
  emit('blur', event)
}

const handleInput = (e: Event, updateInputValue: (value: string) => void) => {
  if (!isInternalUpdate.value) {
    hasInitialized.value = true
    const target = e.target as HTMLInputElement
    updateInputValue(target.value)
  }
}

// Initialize with a delay to prevent validation on initial load
onMounted(() => {
  setTimeout(() => {
    hasInitialized.value = true
  }, 100)
})

const handleCountrySelect = (
  iso2: string,
  updateInputValue: (value: string) => void
) => {
  updateInputValue(iso2)
  open.value = false
  focused.value = true
  hasInitialized.value = true
}
</script>

<template>
  <BasePhoneInput fetchCountry class="flex" @update="res = $event">
    <template #selector="{ inputValue, updateInputValue, countries }">
      <Popover v-model:open="open">
        <PopoverTrigger>
          <Button
            variant="outline"
            class="flex gap-1 rounded-e-none rounded-s-lg px-3"
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
                    () => handleCountrySelect(option.iso2, updateInputValue)
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
        @input="(e: Event) => handleInput(e, updateInputValue)"
        @blur="handleBlur"
        :placeholder="placeholder"
      />
    </template>
  </BasePhoneInput>
</template>
