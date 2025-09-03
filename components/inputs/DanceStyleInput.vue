<script setup lang="ts">
import type { DanceStyle } from '@prisma/client'
import { computed, ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import { cn } from '@/utils'

const { $client } = useNuxtApp()

const { data: allDanceStyles } = await $client.styles.list.useQuery()

const props = defineProps<{
  modelValue: DanceStyle[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DanceStyle[]): void
}>()

const open = ref(false)
const searchQuery = ref('')

const filteredStyles = computed(() => {
  if (!searchQuery.value) {
    return allDanceStyles.value ?? []
  }
  return (allDanceStyles.value ?? []).filter((style) =>
    style.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedStyles = computed({
  get: () => props.modelValue || [],
  set: (newValue) => emit('update:modelValue', newValue),
})

function toggleStyle(style: DanceStyle) {
  const index = selectedStyles.value.findIndex((s) => s.id === style.id)
  if (index > -1) {
    const newSelection = [...selectedStyles.value]
    newSelection.splice(index, 1)
    selectedStyles.value = newSelection
  } else {
    selectedStyles.value = [...selectedStyles.value, style]
  }
}
</script>

<template>
  <div>
    <div v-if="selectedStyles.length > 0" class="flex flex-wrap gap-2 mb-2">
      <Badge
        v-for="style in selectedStyles"
        :ket="style.id"
        variant="secondary"
        class="flex items-center gap-x-1.5"
      >
        {{ style.name }}
        <button type="button" @click="toggleStyle(style)">
          <X class="h-3 w-3" />
        </button>
      </Badge>
    </div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="secondary"
          role="combobox"
          :aria-expanded="open"
          class="font-normal text-left"
        >
          <span class="truncate-1">
            {{
              selectedStyles.length > 0
                ? `${selectedStyles.length} selected`
                : 'Select Dance Styles..'
            }}
          </span>
          <Icon
            name="heroicons:chevron-down"
            class="h-4 w-4 shrink-0 ml-2 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0">
        <SearchableDropdown
          :items="filteredStyles"
          :selection="selectedStyles"
          v-model:searchQuery="searchQuery"
          placeholder="Search dance style..."
          itemKey="hashtag"
          itemLabel="name"
          @select="toggleStyle"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
