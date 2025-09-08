<script setup lang="ts">
import type { DanceStyle } from '@prisma/client'
import { computed, ref, watch, useId } from 'vue'

const { $client } = useNuxtApp()

const { data: allDanceStyles } = await $client.styles.list.useQuery()
const dropdownId = `dance-style-dropdown${useId()}`

const selectedStyles = defineModel<DanceStyle[]>({
  default: () => [] as DanceStyle[],
})

const open = ref(false)
const searchQuery = ref('')

const normalize = (s: string) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

const filteredStyles = computed(() => {
  const items = allDanceStyles.value ?? []
  const q = normalize(searchQuery.value.trim())
  if (!q) return items
  return items.filter((style) => normalize(style.name).includes(q))
})

watch(open, (isOpen) => {
  if (!isOpen) searchQuery.value = ''
})

function toggleStyle(style: DanceStyle) {
  const exists = selectedStyles.value.some((s) => s.id === style.id)
  selectedStyles.value = exists
    ? selectedStyles.value.filter((s) => s.id !== style.id)
    : [...selectedStyles.value, style]
}
</script>

<template>
  <div>
    <div v-if="selectedStyles.length > 0" class="flex flex-wrap gap-2 mb-2">
      <Badge
        v-for="style in selectedStyles"
        :key="style.id"
        variant="secondary"
        class="flex items-center gap-x-1.5"
      >
        {{ style.name }}
        <button
          type="button"
          :aria-label="`Remove ${style.name}`"
          @click="toggleStyle(style)"
        >
          <Icon name="lucide:x" class="h-3 w-3" />
        </button>
      </Badge>
    </div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="secondary"
          role="combobox"
          :aria-expanded="open"
          aria-haspopup="listbox"
          :aria-controls="dropdownId"
          class="font-normal text-left"
        >
          <span class="truncate">
            {{
              selectedStyles.length > 0
                ? `${selectedStyles.length} selected`
                : 'Select dance styles…'
            }}
          </span>
          <Icon
            name="heroicons:chevron-down"
            class="h-4 w-4 shrink-0 ml-2 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent :id="dropdownId" class="p-0">
        <SearchableDropdown
          :items="filteredStyles"
          :selection="selectedStyles"
          v-model:searchQuery="searchQuery"
          placeholder="Search dance styles…"
          itemKey="id"
          itemLabel="name"
          @select="toggleStyle"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
